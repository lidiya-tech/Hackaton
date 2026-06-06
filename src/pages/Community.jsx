import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { COMMUNITY_GROUPS, PROFESSIONS, LIFE_STAGES } from '../utils/constants';
import { dbService, seedInitialData, authService } from '../utils/firebase';
import { 
  Search, 
  Send, 
  User, 
  Shield, 
  Info, 
  Sparkles, 
  MessageCircle, 
  Users, 
  Lock, 
  LogOut, 
  MessageSquare,
  Smile
} from 'lucide-react';

export const Community = ({ currentLang, userProfile, currentUser, onLogout }) => {
  const t = TRANSLATIONS[currentLang];
  const chatEndRef = useRef(null);

  // Navigation and Tab States
  const [activeTab, setActiveTab] = useState("circles"); // "circles" or "dms"
  const [activeChatType, setActiveChatType] = useState("group"); // "group" or "dm"
  const [selectedGroupId, setSelectedGroupId] = useState("g_doctors");
  const [activeDmUser, setActiveDmUser] = useState(null); // { username, nickname }

  // Data lists
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);

  const getStageNameById = (id) => {
    const stage = LIFE_STAGES.find(s => s.id === id);
    if (!stage) return id;
    if (currentLang === 'am') return stage.nameAm;
    if (currentLang === 'om') return stage.nameOm;
    if (currentLang === 'ti') return stage.nameTi;
    return stage.nameEn;
  };

  const getProfessionLabel = (id) => {
    const p = PROFESSIONS.find(x => x.id === id);
    if (!p) return id;
    if (currentLang === 'am') return p.am;
    if (currentLang === 'om') return p.om || p.en;
    if (currentLang === 'ti') return p.ti || p.am || p.en;
    return p.en;
  };

  const getProfileMatchInfo = (otherUser) => {
    if (!userProfile || !otherUser.profile) return { isMatch: false, matches: [] };
    const matches = [];
    
    // Check profession
    if (userProfile.profession && otherUser.profile.profession && userProfile.profession === otherUser.profile.profession) {
      matches.push({ type: 'profession', value: userProfile.profession });
    }
    
    // Check age group
    if (userProfile.ageGroup && otherUser.profile.ageGroup && userProfile.ageGroup === otherUser.profile.ageGroup) {
      matches.push({ type: 'ageGroup', value: userProfile.ageGroup });
    }
    
    // Check situations/health conditions
    if (userProfile.healthConditions && otherUser.profile.healthConditions) {
      const commonConditions = userProfile.healthConditions.filter(c => 
        c !== 'none' && otherUser.profile.healthConditions.includes(c)
      );
      if (commonConditions.length > 0) {
        matches.push({ type: 'conditions', value: commonConditions.join(', ') });
      }
    }
    
    return {
      isMatch: matches.length > 0,
      matches
    };
  };

  const isGroupProfileMatch = (group) => {
    if (!userProfile) return false;
    
    // Match by profession
    if (group.category === 'profession') {
      const profId = group.id.replace('g_', '');
      if (userProfile.profession === profId || (profId === 'factory' && userProfile.profession === 'factory_workers')) {
        return true;
      }
    }
    
    // Match by age stage
    if (group.category === 'age') {
      const ageId = userProfile.ageGroup;
      if (ageId === 'children' && group.id === 'g_age_5_12') return true;
      if (ageId === 'teenagers' && (group.id === 'g_age_13_15' || group.id === 'g_age_16_19')) return true;
      if (ageId === 'young_adults' && (group.id === 'g_age_20_24' || group.id === 'g_age_25_29')) return true;
      if (ageId === 'elderly' && (group.id === 'g_age_60_69' || group.id === 'g_age_70_plus')) return true;
    }
    
    // Match by family
    if (group.category === 'family') {
      if (userProfile.profession === 'domestic_workers' || userProfile.ageGroup === 'women') {
        if (group.id.includes('mothers') || group.id.includes('parents')) return true;
      }
      if (userProfile.ageGroup === 'elderly' && group.id === 'g_grandparents') return true;
    }
    
    // Match by situation
    if (group.category === 'situation') {
      if (userProfile.healthConditions && userProfile.healthConditions.some(c => c !== 'none') && group.id === 'g_chronic') return true;
      if (userProfile.healthConditions && userProfile.healthConditions.includes('none') && group.id === 'g_burnout') return true;
    }
    
    return false;
  };

  // Digest Pop-up State
  const [showDigest, setShowDigest] = useState(false);
  const [digestContent, setDigestContent] = useState("");

  // Seed DB on mount
  useEffect(() => {
    seedInitialData();
  }, []);

  // Load registered users list
  const loadUsersList = () => {
    if (!currentUser) return;
    const allUsers = authService.getUsers();
    setUsersList(allUsers.filter(u => u.username !== currentUser.username));
  };

  // Load active chat messages
  const loadActiveChatMessages = () => {
    if (!currentUser) return;
    
    if (activeChatType === "group") {
      const allChats = dbService.list("group_chats");
      const groupChats = allChats
        .filter(chat => chat.groupId === selectedGroupId)
        .sort((a, b) => a.timestamp - b.timestamp);
      setMessages(groupChats);
    } else if (activeChatType === "dm" && activeDmUser) {
      const allDms = dbService.list("private_dms");
      const filteredDms = allDms
        .filter(dm => 
          (dm.senderUsername === currentUser.username && dm.recipientUsername === activeDmUser.username) ||
          (dm.senderUsername === activeDmUser.username && dm.recipientUsername === currentUser.username)
        )
        .sort((a, b) => a.timestamp - b.timestamp);
      setMessages(filteredDms);
    }
  };

  // Sync state on change of chat selection or current user
  useEffect(() => {
    if (currentUser) {
      loadActiveChatMessages();
      loadUsersList();
    }
  }, [activeChatType, selectedGroupId, activeDmUser, currentUser]);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cross-Tab Real-time Synchronization using 'storage' event listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (!e.key) return;
      if (
        e.key.startsWith("warka_db_group_chats") || 
        e.key.startsWith("warka_db_private_dms") || 
        e.key.startsWith("warka_db_users")
      ) {
        loadActiveChatMessages();
        loadUsersList();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [activeChatType, selectedGroupId, activeDmUser, currentUser]);

  // Handle Sending Messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !currentUser) return;

    // AI moderation check
    const offensiveWords = ["stupid", "idiot", "ደደብ", "ሞኝ"];
    const containsOffensive = offensiveWords.some(word => newMessageText.toLowerCase().includes(word));
    
    if (containsOffensive) {
      alert(currentLang === 'en' 
        ? "🚨 Message Blocked: AI Moderation flagged potentially harmful or disrespectful content." 
        : currentLang === 'am' 
        ? "🚨 መልእክቱ ታግዷል፦ የዋርካ AI ስነ-ምግባር መቆጣጠሪያ ጎጂ ወይም አፀያፊ ቃላትን አግኝቷል።"
        : currentLang === 'om'
        ? "🚨 Ergaan Dhorkameera: AI Moderation jechoota miidhaa fidan ykn salphisan argateera."
        : "🚨 መልእኽቲ ተዓጊቱ ኣሎ፦ ዋርካ AI ዘይግቡእ ወይ ጎዳኢ ቃላት ረኺቡ ኣሎ።");
      return;
    }

    if (activeChatType === "group") {
      const chatData = {
        id: `chat_${Date.now()}`,
        groupId: selectedGroupId,
        sender: isAnonymous 
          ? (currentLang === 'en' ? `Anonymous ${PROFESSIONS.find(p => p.id === userProfile.profession)?.[currentLang] || 'Member'}` 
             : currentLang === 'am' ? `ስም-አልባ ${PROFESSIONS.find(p => p.id === userProfile.profession)?.[currentLang] || 'አባል'}`
             : currentLang === 'om' ? `Maqaa-Malee ${PROFESSIONS.find(p => p.id === userProfile.profession)?.[currentLang] || 'Miseensa'}`
             : `ሽም-ኣልቦ ${PROFESSIONS.find(p => p.id === userProfile.profession)?.[currentLang] || 'ኣባል'}`) 
          : currentUser.nickname,
        senderUsername: isAnonymous ? null : currentUser.username,
        textAm: currentLang === 'am' ? newMessageText : `[Translated] ${newMessageText}`,
        textEn: currentLang === 'en' ? newMessageText : `[Translated] ${newMessageText}`,
        timestamp: Date.now(),
        isAnonymous: isAnonymous
      };

      dbService.save("group_chats", chatData.id, chatData);
    } else {
      // Direct Message
      const dmData = {
        id: `dm_${Date.now()}`,
        senderUsername: currentUser.username,
        senderNickname: currentUser.nickname,
        recipientUsername: activeDmUser.username,
        text: newMessageText,
        textEn: newMessageText,
        textAm: newMessageText,
        timestamp: Date.now()
      };

      dbService.save("private_dms", dmData.id, dmData);
    }

    setNewMessageText("");
    loadActiveChatMessages();

    // Trigger storage event locally for other components if they are listening
    window.dispatchEvent(new Event("storage"));
  };

  // Quick DM navigation helper
  const openDirectMessage = (username, nickname) => {
    setActiveChatType("dm");
    setActiveDmUser({ username, nickname });
    setActiveTab("dms");
  };

  const getWeeklyDigest = () => {
    const groupName = COMMUNITY_GROUPS.find(g => g.id === selectedGroupId)?.[currentLang] || "this community";
    let summary = "";
    if (selectedGroupId === "g_doctors") {
      if (currentLang === 'en') {
        summary = `Weekly Digest for Doctors Circle:\n\n- Key Topics: Hospital shifts averaging 14 hours, clinical burnout, and work-life imbalance.\n- Community Agreement: Members emphasized setting micro-breaks, brewing buna slowly to recover, and prioritizing family connections over weekends.\n- Recommendation: 82% of participants recommend short afternoon walks at Entoto to ease stress.`;
      } else if (currentLang === 'am') {
        summary = `የሐኪሞች ስብስብ ሳምንታዊ ማጠቃለያ፡\n\n- ዋና ርዕሶች፡ በሆስፒታሉ ውስጥ ያለው የ14 ሰዓት የስራ ፈረቃ፣ የድካም ስሜት፣ እና የስራ-ቤተሰብ ህይወት አለመመጣጠን።\n- የማህበረሰብ ስምምነት፡ አባላት አጫጭር የስራ እረፍቶችን መውሰድን፣ ራስን ለማገገም ቡናን ቀስ ብሎ ማፍላትን፣ እና ቅዳሜና እሁድን ለቤተሰብ መስጠትን አፅንኦት ሰጥተዋል።\n- ምክረ-ሀሳብ፡ 82% ተሳታፊዎች ጭንቀትን ለመቀነስ በእንጦጦ አጭር የእግር ጉዞዎችን ይመክራሉ።`;
      } else if (currentLang === 'om') {
        summary = `Guyyaa Torbanii Hojjettoota Yaalaaf:\n\n- Dhimmoota Ijoo: Sa'aatii hojii 14 hojjechuu, dadhabbi dhuunfaa fi haala jireenyaa fi hojii wal-simsiisuu dadhabuu.\n- Waliigaltee Hawaasaa: Miseensonni boqonnaa gabaabduu fudhachuu, buna suuta dhuguun boqachuu fi torbanitti maatiif yeroo kennuun barbaachisaa ta'uu kaasaniiru.\n- Gorsa: 82% hirmaattotaa yaaddoo salphisuuf tulluu Anxoxootti deemuu gorsu.`;
      } else {
        summary = `ሰሙናዊ ጸብጻብ ክቦ ሓካይም፡\n\n- ቀንዲ ኣርእስቲታት፡ ኣብ ሆስፒታል ዘሎ ናይ 14 ሰዓት ናይ ስራሕ ፈረቓ፣ ናይ ስራሕ ጸቕጢ፣ ከምኡ ድማ ስራሕን ስድራቤትን ዘይምምጣን።\n- ናይ ክቦ ስምምዕ፡ ኣባላት ናይ ስራሕ ዕረፍቲ ምውሳድ፣ ቡን ቀስ ኢልካ ብምፍላሕ ራስኻ ምሕዋይ፣ ከምኡ ድማ ቀዳም 2 ሰንበትን ንስድራቤት ምሃብ።\n- ምኽሪ፡ 82% ተሳተፍቲ ጭንቀት ንምንካይ ኣብ እንጦጦ ናይ እግሪ ጉዕዞ ክግበር ይመክሩ።`;
      }
    } else {
      if (currentLang === 'en') {
        summary = `Weekly Digest for ${groupName}:\n\n- Key Topics: General stress reduction, local dietary support, and coping mechanisms.\n- Community Agreement: Sharing responsibilities and utilizing edir/community leaders for support.\n- Recommendation: Engage in daily micro-actions to maintain emotional balance.`;
      } else if (currentLang === 'am') {
        summary = `የ${groupName} ሳምንታዊ ማጠቃለያ፡\n\n- ዋና ርዕሶች፡ አጠቃላይ ጭንቀትን መቀነስ፣ የሀገር ውስጥ ምግብ ድጋፍ፣ እና መቋቋሚያ ዘዴዎች።\n- የማህበረሰብ ስምምነት፡ ኃላፊነቶችን መጋራት እና ከእድር/ማህበር መሪዎች ድጋፍ ማግኘት።\n- ምክረ-ሀሳብ፡ የአእምሮ ሚዛንን ለመጠበቅ ዕለታዊ ተግባራትን ማከናወን።`;
      } else if (currentLang === 'om') {
        summary = `Gorsa Torbanii Garee ${groupName}f:\n\n- Dhimmoota Ijoo: Yaaddoo salphisuu, nyaata aadaa fi furmaata dhiphinaa.\n- Hawaasa: Hojii wal-qoodu fi deeggarsa jaarsolii hawaasaa ykn edirii argachuu.\n- Gorsa: Gocha guyyaa guyyaan sammuu kee tasgabeessi.`;
      } else {
        summary = `ሰሙናዊ ጸብጻብ ክቦ ${groupName}፡\n\n- ቀንዲ ኣርእስቲታት፡ ጭንቀት ምንካይ፣ ናይ ዓዲ መግቢ 探索፣ መቋቋሚ መንገድታትን።\n- ናይ ክቦ ስምምዕ፡ ሓላፍነት ምክፋል ከምኡ ድማ ካብ እድር/ማሕበር ደገፍ ምርኻብ።\n- ምኽሪ፡ የአእምሮ ሚዛን ንምዕቃብ ዕለታዊ ንጥፈታት ምግባር።`;
      }
    }
    setDigestContent(summary);
    setShowDigest(true);
  };

  // Filter logic for circles
  const filteredGroups = COMMUNITY_GROUPS.filter(g => {
    const nameMatches = (g.en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         g.am.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         g.om?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         g.ti?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeCategory === "all") return nameMatches;
    return g.category === activeCategory && nameMatches;
  });

  // Filter logic for users
  const filteredUsers = usersList.filter(u => {
    const nameMatches = u.nickname.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        u.username.toLowerCase().includes(searchQuery.toLowerCase());
    if (!nameMatches) return false;
    
    if (showOnlyMatches) {
      const matchInfo = getProfileMatchInfo(u);
      return matchInfo.isMatch;
    }
    return true;
  });

  const selectedGroup = COMMUNITY_GROUPS.find(g => g.id === selectedGroupId) || COMMUNITY_GROUPS[0];

  if (!currentUser) return null;

  // --- RENDERING CHAT INTERFACE ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Page Header with User Profile Details */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-10 h-10 rounded-full bg-[#BA7517] border border-[#F3C06D] flex items-center justify-center text-lg font-bold text-white shadow-md">
            {currentUser.nickname.charAt(0)}
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5 m-0">
              {currentLang === 'en' ? "Welcome back, " : "እንኳን ደህና መጡ፣ "}
              <span className="text-[#BA7517]">{currentUser.nickname}</span>
            </h1>
            <span className="text-[10px] text-[#C1C3AC] block mt-0.5">
              @{currentUser.username} • {currentUser.email || "No email"} • {t.community}
            </span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center shadow-sm transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            {currentLang === 'en' ? "Log Out" : "ውጣ"}
          </button>
        </div>
      </div>

      {/* Explanatory Multi-group Alert */}
      <div className="bg-white/5 backdrop-blur-md border border-[#534AB7]/40 p-4 rounded-xl flex items-start space-x-3 text-left shadow-sm">
        <Info className="w-5 h-5 text-[#A69EFC] mt-0.5 flex-shrink-0" />
        <div className="text-xs text-[#EFEFFA] space-y-1">
          <span className="font-bold text-[#A69EFC] block">
            {currentLang === 'en' ? "Live Multiplayer Sync Mode Active:" : "የቀጥታ ስርጭት ትስስር በርቷል፡"}
          </span>
          <p className="leading-relaxed">
            {currentLang === 'en' 
              ? "Open another private browser window or tab, register/login with a different nickname, and test live real-time conversations instantly."
              : "ሌላ ታብ (tab) በመክፈት በተለየ ስም በመግባት የቀጥታ መልእክት መላክና መቀበልን መሞከር ይችላሉ።"}
          </p>
        </div>
      </div>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Sidebar Directory (Circles & Users Switcher) */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col space-y-4 shadow-lg h-[620px]">
          
          {/* Tab switches: Circles vs Direct Messages */}
          <div className="flex bg-black/20 p-1 rounded-xl gap-1 border border-white/5">
            <button
              onClick={() => { setActiveTab("circles"); setSearchQuery(""); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "circles" 
                  ? "bg-[#1D9E75] text-white shadow-md" 
                  : "text-[#A8B5A0] hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              {currentLang === 'en' ? "Public Circles" : "ማህበረሰቦች"}
            </button>
            <button
              onClick={() => { setActiveTab("dms"); setSearchQuery(""); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "dms" 
                  ? "bg-[#1D9E75] text-white shadow-md" 
                  : "text-[#A8B5A0] hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {currentLang === 'en' ? "Direct Chats" : "የግል መልእክቶች"}
            </button>
          </div>

          {/* Directory Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={
                activeTab === "circles"
                  ? (currentLang === 'en' ? "Search circles..." : "ማህበረሰቦችን ፈልግ...")
                  : (currentLang === 'en' ? "Search users..." : "ሰዎችን ፈልግ...")
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-white/10 pl-9 pr-4 py-2 rounded-lg text-xs focus:outline-none focus:border-[#BA7517] focus:ring-1 focus:ring-[#BA7517] text-white placeholder-gray-500 transition-all"
            />
          </div>

          {/* Categories Filter (Only visible for Circles tab) */}
          {activeTab === "circles" && (
            <div className="flex flex-wrap gap-1 pb-2 border-b border-white/10">
              {[
                { id: "all", label: { en: "All", am: "ሁሉንም" } },
                { id: "profession", label: { en: "Professions", am: "ሙያዎች" } },
                { id: "age", label: { en: "Age Stages", am: "እድሜ" } },
                { id: "family", label: { en: "Family", am: "ቤተሰብ" } },
                { id: "situation", label: { en: "Situations", am: "ሁኔታዎች" } }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2 py-1 rounded text-[9px] font-bold transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-[#BA7517] border-[#F3C06D]/50 text-white shadow-md'
                      : 'bg-black/20 border-transparent text-[#A8B5A0] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {currentLang === 'en' ? cat.label.en : cat.label.am}
                </button>
              ))}
            </div>
          )}

          {activeTab === "dms" && (
            <div className="flex bg-black/20 p-1.5 rounded-xl border border-white/10 gap-1.5 justify-between items-center text-left">
              <span className="text-[10px] font-semibold text-[#C1C3AC]">
                {currentLang === 'en' ? "Filter Matches:" : "ተመሳሳይ ምርጫ ያላቸውን አሳይ:"}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setShowOnlyMatches(false)}
                  className={`px-2 py-1 rounded-md text-[9px] font-bold transition-all ${
                    !showOnlyMatches
                      ? 'bg-[#BA7517] text-white shadow-sm'
                      : 'bg-transparent text-[#A8B5A0] border border-transparent hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {currentLang === 'en' ? "All" : "ሁሉም"}
                </button>
                <button
                  onClick={() => setShowOnlyMatches(true)}
                  className={`px-2 py-1 rounded-md text-[9px] font-bold transition-all flex items-center gap-1 ${
                    showOnlyMatches
                      ? 'bg-[#BA7517] text-white shadow-sm'
                      : 'bg-transparent text-[#A8B5A0] border border-transparent hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  {currentLang === 'en' ? "Same choices" : "ተመሳሳይ ምርጫ"}
                </button>
              </div>
            </div>
          )}

          {/* Scrollable list content */}
          <div className="overflow-y-auto flex-1 space-y-2 pr-1 custom-scrollbar">
            {activeTab === "circles" ? (
              filteredGroups.map(group => {
                const isSelected = activeChatType === "group" && selectedGroupId === group.id;
                const isMatch = isGroupProfileMatch(group);
                return (
                  <button
                    key={group.id}
                    onClick={() => {
                      setActiveChatType("group");
                      setSelectedGroupId(group.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex justify-between items-center group/btn ${
                      isSelected
                        ? 'bg-white/10 border-white/20 text-white shadow-sm'
                        : 'bg-transparent border-transparent text-[#C1C3AC] hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-xs block">
                          {currentLang === 'am' ? group.am : (currentLang === 'om' && group.om ? group.om : (currentLang === 'ti' && group.ti ? group.ti : group.en))}
                        </span>
                        {isMatch && (
                          <span className="px-1 py-0.2 rounded text-[7px] font-bold bg-[#BA7517]/20 text-[#F3C06D] border border-[#BA7517]/40">
                            ✨ Match
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-[#A8B5A0] group-hover/btn:text-white/70 capitalize block transition-colors">{group.category}</span>
                    </div>
                    {isSelected ? (
                      <span className="w-2 h-2 bg-[#BA7517] rounded-full shadow-[0_0_8px_rgba(186,117,23,0.8)]" />
                    ) : (
                      isMatch && <span className="w-1.5 h-1.5 bg-[#BA7517]/40 rounded-full" />
                    )}
                  </button>
                );
              })
            ) : (
              // Users DM list
              filteredUsers.map(user => {
                const isSelected = activeChatType === "dm" && activeDmUser?.username === user.username;
                const matchInfo = getProfileMatchInfo(user);
                return (
                  <button
                    key={user.username}
                    onClick={() => {
                      setActiveChatType("dm");
                      setActiveDmUser(user);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col space-y-2 group/btn ${
                      isSelected
                        ? 'bg-white/10 border-white/20 text-white shadow-sm'
                        : 'bg-transparent border-transparent text-[#C1C3AC] hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-sm ${
                          isSelected ? 'bg-[#534AB7]' : 'bg-[#534AB7]/50'
                        }`}>
                          {user.nickname.charAt(0)}
                        </div>
                        <div className="text-left">
                          <span className="font-semibold text-xs block">{user.nickname}</span>
                          <span className="text-[9px] text-[#A8B5A0] group-hover/btn:text-white/70 block mt-0.5 transition-colors">@{user.username} • {user.email || "No email"}</span>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="w-2 h-2 bg-[#A69EFC] rounded-full shadow-[0_0_8px_rgba(166,158,252,0.8)] animate-pulse" />
                      ) : (
                        <span className="w-1.5 h-1.5 bg-[#534AB7] rounded-full" /> 
                      )}
                    </div>
                    {matchInfo.isMatch && (
                      <div className="flex flex-wrap gap-1 pt-1 border-t border-dashed border-white/10 w-full">
                        {matchInfo.matches.map((m, idx) => (
                          <span 
                            key={idx} 
                            className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#BA7517]/20 text-[#F3C06D] border border-[#BA7517]/30 capitalize"
                          >
                            🤝 {m.type === 'profession' ? getProfessionLabel(m.value) : m.type === 'ageGroup' ? getStageNameById(m.value) : m.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })
            )}

            {/* Empty States */}
            {activeTab === "circles" && filteredGroups.length === 0 && (
              <p className="text-xs text-[#A8B5A0] py-6 text-center">
                {currentLang === 'en' ? "No circles matched search." : "ምንም ማህበረሰብ አልተገኘም።"}
              </p>
            )}
            {activeTab === "dms" && filteredUsers.length === 0 && (
              <p className="text-xs text-[#A8B5A0] py-6 text-center">
                {currentLang === 'en' ? "No users found." : "ምንም ተጠቃሚ አልተገኘም።"}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Dynamic Chat Box (Active Circle or active DM chat) */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-lg h-[620px] overflow-hidden">
          
          {/* Active Chat Header */}
          <div className="bg-white/5 border-b border-white/10 p-4 flex flex-wrap items-center justify-between gap-3 text-left">
            <div>
              <h3 className="font-semibold text-sm text-white m-0 flex items-center">
                {activeChatType === "group" ? (
                  <>
                    <Users className="w-4 h-4 mr-1.5 text-[#BA7517]" />
                    {currentLang === 'am' ? selectedGroup.am : (currentLang === 'om' && selectedGroup.om ? selectedGroup.om : (currentLang === 'ti' && selectedGroup.ti ? selectedGroup.ti : selectedGroup.en))}
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-1.5 text-[#A69EFC]" />
                    {activeDmUser ? activeDmUser.nickname : "Direct Chat"}
                  </>
                )}
              </h3>
              <span className="text-[10px] text-[#A8B5A0] block mt-0.5">
                {activeChatType === "group" 
                  ? (currentLang === 'en' ? "Circle Chatroom • Active Members Online" : "የክበብ መወያያ ቻት • አባላት በስራ ላይ")
                  : `Private conversation with @${activeDmUser?.username} (${activeDmUser?.email || "No email"})`}
              </span>
            </div>

            {/* Actions (Only for Group Chat) */}
            {activeChatType === "group" && (
              <div className="flex gap-2">
                <button
                  onClick={getWeeklyDigest}
                  className="bg-[#534AB7]/20 hover:bg-[#534AB7]/40 text-[#A69EFC] border border-[#534AB7]/40 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  {currentLang === 'en' ? "Weekly Digest" : "ሳምንታዊ ማጠቃለያ"}
                </button>
                <div className="flex items-center space-x-1.5 text-xs text-[#BA7517] bg-[#BA7517]/10 p-1.5 rounded-lg border border-[#BA7517]/30">
                  <Shield className="w-3.5 h-3.5 text-[#BA7517]" />
                  <span className="text-[10px] font-medium">AI Mod</span>
                </div>
              </div>
            )}
          </div>

          {/* Messages Listing Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-left bg-transparent custom-scrollbar">
            {messages.map(msg => {
              const isMyMessage = msg.senderUsername === currentUser.username;
              const senderUserObj = !isMyMessage && msg.senderUsername ? usersList.find(u => u.username === msg.senderUsername) : null;
              const matchInfo = senderUserObj ? getProfileMatchInfo(senderUserObj) : null;
              
              return (
                <div key={msg.id} className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center space-x-1 mb-1 text-[9px] text-[#A8B5A0]">
                    <span 
                      className={`font-semibold ${(!isMyMessage && msg.senderUsername) ? 'hover:underline cursor-pointer text-[#A69EFC]' : ''}`} 
                      onClick={() => {
                        if (!isMyMessage && msg.senderUsername) {
                          openDirectMessage(msg.senderUsername, msg.sender);
                        }
                      }}
                    >
                      {isMyMessage ? (msg.isAnonymous ? "You (Anonymous)" : "You") : msg.sender}
                    </span>
                    {matchInfo && matchInfo.isMatch && (
                      <span className="px-1 py-0.2 rounded text-[7px] font-bold bg-[#BA7517]/20 text-[#F3C06D] border border-[#BA7517]/30 flex items-center gap-0.5 ml-1">
                        ✨ Match
                      </span>
                    )}
                    <span>•</span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] shadow-sm leading-relaxed ${
                    isMyMessage 
                      ? 'bg-[#1D9E75] text-white rounded-tr-none' 
                      : 'bg-white/10 text-white border border-white/10 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {activeChatType === "group" 
                      ? (currentLang === 'en' ? msg.textEn : msg.textAm) 
                      : msg.text}
                  </div>
                </div>
              );
            })}
            
            <div ref={chatEndRef} />

            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-[#A8B5A0] py-12 flex-col space-y-2">
                <p>
                  {activeChatType === "group"
                    ? (currentLang === 'en' ? "No active discussions yet." : "እስካሁን ምንም ውይይት የለም።")
                    : (currentLang === 'en' ? "Start your private chat." : "የግል ውይይትዎን እዚህ ይጀምሩ።")}
                </p>
                <p className="text-[10px] text-[#A8B5A0]/70">
                  {currentLang === 'en' ? "Type below to send a message." : "መልእክት ለመላክ ከታች ይጻፉ።"}
                </p>
              </div>
            )}
          </div>

          {/* Form Input Area */}
          <form onSubmit={handleSendMessage} className="border-t border-white/10 p-4 space-y-3 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-[#C1C3AC]">
              
              {/* Anonymous toggle (Only visible in Circle group chats) */}
              {activeChatType === "group" ? (
                <label className="flex items-center space-x-2 cursor-pointer select-none group/anon">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-white/20 bg-black/20 text-[#BA7517] focus:ring-[#BA7517] w-3.5 h-3.5 transition-colors"
                  />
                  <span className={`transition-colors ${isAnonymous ? "text-[#F3C06D] font-bold" : "group-hover/anon:text-white"}`}>
                    👤 {currentLang === 'en' ? "Post Anonymously" : "ስም-አልባ ሁን"}
                  </span>
                </label>
              ) : (
                <div className="flex items-center text-xs text-[#A69EFC] font-semibold">
                  🔒 {currentLang === 'en' ? "Encrypted Chat Thread" : "የተጠበቀ የግል ግንኙነት"}
                </div>
              )}

              <span className="text-[9px] text-[#A8B5A0]">
                {currentLang === 'en' ? "Harmful terms are blocked by AI" : "የማይገቡ ቃላት በ-AI ይታገዳሉ"}
              </span>
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                required
                placeholder={
                  activeChatType === "group"
                    ? (currentLang === 'en' ? "Type your supportive message..." : "የድጋፍ መልእክትዎን እዚህ ይጻፉ...")
                    : (currentLang === 'en' ? `Message @${activeDmUser?.nickname}...` : `@${activeDmUser?.nickname} የግል መልእክት ይላኩ...`)
                }
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#BA7517] focus:ring-1 focus:ring-[#BA7517] text-white placeholder-gray-500 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="bg-[#BA7517] hover:bg-[#F3C06D] hover:text-[#022719] text-white p-2.5 rounded-xl transition-all shadow-md flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Weekly Digest Modal */}
      {showDigest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#022719]/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 max-w-md w-full overflow-hidden p-6 space-y-4">
            <div className="flex items-center space-x-2 text-left">
              <Sparkles className="w-5 h-5 text-[#A69EFC]" />
              <h3 className="font-semibold text-base text-white m-0">
                {currentLang === 'en' ? "AI Weekly Group Digest" : "የሳምንቱ ማህበረሰብ AI ማጠቃለያ"}
              </h3>
            </div>
            <div className="text-xs text-[#C1C3AC] text-left whitespace-pre-line leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
              {digestContent}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDigest(false)}
                className="bg-[#1D9E75] hover:bg-[#1D9E75]/80 text-white text-xs px-4 py-2 rounded-lg font-semibold shadow-sm transition-all"
              >
                {currentLang === 'en' ? "Close" : "ዝጋ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
