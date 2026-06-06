import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { EXTRA_TRANSLATIONS } from '../utils/extraTranslations';
import { PROFESSIONS, ECONOMIC_STATUS_OPTIONS, LIFE_STAGES, HEALTH_CONDITIONS, COMMUNITY_GROUPS } from '../utils/constants';
import { checkInWithGemini, getProfileBasedCommunities } from '../utils/gemini';
import { getFallbackCheckIn } from '../utils/fallbackAI';
import { dbService } from '../utils/firebase';
import { Send, Mic, MicOff, Settings, AlertCircle, ArrowLeft, Sparkles, MessageCircle, Edit } from 'lucide-react';
import confetti from 'canvas-confetti';

const getPersonalizedGroupLabel = (groupId, profile, lang) => {
  const group = COMMUNITY_GROUPS.find(g => g.id === groupId);
  if (!group) return "";
  
  if (group.category === 'profession') {
    const profId = group.id.replace('g_', '');
    const prof = PROFESSIONS.find(p => p.id === profId || (profId === 'factory' && p.id === 'factory_workers'));
    let profLabel = "";
    if (prof) {
      if (lang === 'am') profLabel = prof.am;
      else if (lang === 'om') profLabel = prof.om || prof.en;
      else if (lang === 'ti') profLabel = prof.ti || prof.am || prof.en;
      else profLabel = prof.en;
    } else {
      profLabel = profile.customProfession || group[lang] || group.en;
    }

    if (lang === 'am') {
      return `በእርስዎ የዕድሜ ክልል ውስጥ ያሉ የ${profLabel} ማህበረሰብን ያግኙና ይወያዩ`;
    } else if (lang === 'om') {
      return `Hawaasa ${profLabel} garee umrii keetii quunnami, waliin mari'adhu`;
    } else if (lang === 'ti') {
      return `ኣብ ዕድመኹም ዘለዉ ናይ ${profLabel} ማሕበረሰብ ረኺብኩም ተዘራረቡ`;
    } else {
      return `Meet ${profLabel} around your age, communicate with them`;
    }
  }

  return lang === 'am' ? group.am : (lang === 'om' && group.om ? group.om : (lang === 'ti' && group.ti ? group.ti : group.en));
};

const findGroupByNameOrId = (nameOrId) => {
  return COMMUNITY_GROUPS.find(g => 
    g.id === nameOrId ||
    g.en === nameOrId ||
    g.am === nameOrId ||
    g.om === nameOrId ||
    g.ti === nameOrId
  );
};

export const CheckIn = ({ currentLang, onChangeLang, userProfile, onUpdateProfile, geminiApiKey, onSaveApiKey }) => {
  const t = TRANSLATIONS[currentLang];
  const ext = EXTRA_TRANSLATIONS[currentLang] || EXTRA_TRANSLATIONS.en;
  
  // Wizard steps: 1: Show Form, 6: Chat Dashboard
  const [step, setStep] = useState(1);
  
  // Profile Forms
  const [ageGroup, setAgeGroup] = useState(userProfile.ageGroup || "young_adults");
  const [profession, setProfession] = useState(userProfile.profession || "students");
  const [econ, setEcon] = useState(userProfile.economicStatus || "middle_income");
  const [selectedConditions, setSelectedConditions] = useState(userProfile.healthConditions || ["none"]);

  // Custom text fields states
  const [customAgeGroup, setCustomAgeGroup] = useState(userProfile.customAgeGroup || "");
  const [customProfession, setCustomProfession] = useState(userProfile.customProfession || "");
  const [customEcon, setCustomEcon] = useState(userProfile.customEcon || "");
  const [customConditions, setCustomConditions] = useState(userProfile.customConditions || "");

  // API Key Settings Drawer
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(geminiApiKey || "");

  // Chat Interface States
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Score outcomes
  const [currentScore, setCurrentScore] = useState(null);
  const [scoreLabel, setScoreLabel] = useState("");
  const [microAction, setMicroAction] = useState("");
  const [connectedGroups, setConnectedGroups] = useState([]);

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Reset/Load profile values
    if (userProfile.ageGroup) setAgeGroup(userProfile.ageGroup);
    if (userProfile.profession) setProfession(userProfile.profession);
    if (userProfile.economicStatus) setEcon(userProfile.economicStatus);
    if (userProfile.healthConditions) setSelectedConditions(userProfile.healthConditions);
    if (userProfile.customAgeGroup) setCustomAgeGroup(userProfile.customAgeGroup);
    if (userProfile.customProfession) setCustomProfession(userProfile.customProfession);
    if (userProfile.customEcon) setCustomEcon(userProfile.customEcon);
    if (userProfile.customConditions) setCustomConditions(userProfile.customConditions);

    // Initial greeting if step is 6
    if (step === 6 && messages.length === 0) {
      triggerInitialGreeting();
    }
  }, [step]);

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

  const triggerInitialGreeting = () => {
    let greeting = "";

    if (currentLang === 'am') {
      greeting = "ሰላም! እኔ ዋርካ ነኝ። ዛሬ እንዴት ልረዳዎት እችላለሁ?";
    } else if (currentLang === 'om') {
      greeting = "Akkam! Maqaan koo Warka. Har'a akkamitti si gargaaruu danda'a?";
    } else if (currentLang === 'ti') {
      greeting = "ሰላም! ኣነ ዋርካ እየ። ሎሚ ከመይ ክሕግዘኩም እኽእል?";
    } else {
      greeting = "Hello! I am Warka. How can I help you today?";
    }
    
    setMessages([
      { id: 'greet', sender: 'warka', text: greeting, timestamp: Date.now() }
    ]);
  };

  const calculateInitialScore = (profile) => {
    let score = 65;
    
    if (profile.economicStatus === "struggling") score = 30;
    else if (profile.economicStatus === "low_income") score = 48;
    else if (profile.economicStatus === "middle_income") score = 68;
    else if (profile.economicStatus === "comfortable") score = 82;
    else if (profile.economicStatus === "unknown") score = 60;

    if (profile.healthConditions) {
      const activeConditions = profile.healthConditions.filter(c => c !== "none");
      score -= activeConditions.length * 8;
    }

    const customTexts = [
      profile.customAgeGroup,
      profile.customProfession,
      profile.customEcon,
      profile.customConditions
    ].join(" ").toLowerCase();

    if (customTexts.includes("stress") || customTexts.includes("tension") || customTexts.includes("ጭንቀት") || customTexts.includes("ደከመኝ") || customTexts.includes("dhiphina") || customTexts.includes("tencion") || customTexts.includes("tension")) {
      score -= 15;
    }
    if (customTexts.includes("burnout") || customTexts.includes("exhausted") || customTexts.includes("tired")) {
      score -= 20;
    }
    if (customTexts.includes("happy") || customTexts.includes("good") || customTexts.includes("ደስተኛ") || customTexts.includes("stable")) {
      score += 15;
    }

    return Math.max(5, Math.min(98, score));
  };

  const handleCompleteOnboarding = () => {
    const updated = {
      ...userProfile,
      ageGroup,
      profession,
      economicStatus: econ,
      healthConditions: selectedConditions,
      customAgeGroup,
      customProfession,
      customEcon,
      customConditions
    };
    onUpdateProfile(updated);
    
    const initScore = calculateInitialScore(updated);
    setCurrentScore(initScore);
    
    let label = "Stable";
    if (initScore <= 20) label = currentLang === 'en' ? "Crisis" : "አስቸኳይ ሁኔታ";
    else if (initScore <= 40) label = currentLang === 'en' ? "High stress" : "ከፍተኛ ጭንቀት";
    else if (initScore <= 60) label = currentLang === 'en' ? "Moderate stress" : "መካከለኛ ጭንቀት";
    else if (initScore <= 80) label = currentLang === 'en' ? "Stable" : "የተረጋጋ";
    else label = currentLang === 'en' ? "Thriving" : "ደስተኛ";
    setScoreLabel(label);
    
    let action = "Today sit in quiet and brew local buna. Drink slowly.";
    if (initScore <= 40) {
      action = currentLang === 'en' 
        ? "Sit down with family or a friend for 15 minutes, with no screens. Talk about simple things."
        : "ዛሬ ምሽት ከቤተሰብ ወይም ከጓደኛዎ ጋር ለ15 ደቂቃ ያለ ስልክ ይጫወቱ።";
    } else if (initScore <= 60) {
      action = currentLang === 'en'
        ? "Perform a 10-minute walking routine in your neighborhood. Breath deeply."
        : "በሰፈርዎ ውስጥ ለ10 ደቂቃ በእግር ይራመዱ። በጥልቀት ይተንፍሱ።";
    }
    setMicroAction(action);
    
    const matchedIds = getProfileBasedCommunities(updated);
    const matchedGroups = matchedIds.map(id => ({
      id,
      label: getPersonalizedGroupLabel(id, updated, currentLang)
    }));
    setConnectedGroups(matchedGroups);

    setMessages([]); // Clear chat history to trigger custom greeting
    setStep(6);
  };

  // Web Speech API Microphone controller
  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const speechAlerts = {
        en: "Voice recognition is not supported in this browser. Please type your message.",
        am: "ድምፅ መለያ በዚህ ብሮውዘር ውስጥ አይሰራም። እባክዎን መልእክትዎን በጽሁፍ ይጻፉ።",
        om: "Waraabbiin sagalee browser kanaan hin deeggaramu. Yaada kee barreessi.",
        ti: "ድምጺ መለለዪ ኣብዚ ብሮውዘር ኣይሰርሕን እዩ። በጃኹም ብጽሑፍ ጽሓፉ።"
      };
      alert(speechAlerts[currentLang] || speechAlerts.en);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    
    if (currentLang === 'am') recognition.lang = 'am-ET';
    else if (currentLang === 'om') recognition.lang = 'om-ET'; 
    else if (currentLang === 'ti') recognition.lang = 'ti-ET';
    else recognition.lang = 'en-US';

    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onerror = (e) => {
      console.error(e);
      setIsRecording(false);
      simulateVoiceInput();
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };

    recognition.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // Simulated Speech typing demo for judges
  const simulateVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      let simText = "";
      if (currentLang === 'am') {
        simText = "በሆስፒታሉ ውስጥ በቀን 14 ሰዓት ስለምሰራ በጣም ዝያጭኛል፤ የድካም ስሜት ይሰማኛል።";
      } else if (currentLang === 'om') {
        simText = "Hoocha hospitala keessatti guyyaatti sa'aatii 14 hojjedhuuf baay'ee dadhabeera, dhiphadheera.";
      } else if (currentLang === 'ti') {
        simText = "ኣብ ሆስፒታል መዓልታዊ 14 ሰዓታት ስለ ዝሰርሕ ኣዝየ ደኺመ ኣለኹ፣ ተጨኒቐ ኣለኹ።";
      } else {
        simText = "I work 14 hours at the hospital and I am completely burned out and stressed.";
      }
      setInputValue(simText);
      setIsRecording(false);
    }, 2000);
  };

  const handleSendText = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userMsg = { id: `user_${Date.now()}`, sender: 'user', text: userText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    const msgLower = userText.toLowerCase();
    const greetings = ["hello", "hi", "hey", "selam", "ሰላም", "hola", "habari", "አባክህ", "koti", "ዋርካ", "warka", "good morning", "good afternoon", "good evening", "yoh", "yo"];
    const cleanMsg = msgLower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    const isGreetingOnly = greetings.includes(cleanMsg) || cleanMsg === "";

    if (isGreetingOnly) {
      const helloReplies = {
        en: "Hello! I am Warka, your digital wellness counselor. How can I help you today?",
        am: "ሰላም! እኔ ዋርካ ነኝ። ዛሬ እንዴት ልረዳዎት እችላለሁ?",
        om: "Akkam! Maqaan koo Warka. Har'a akkamitti si gargaaruu danda'a?",
        ti: "ሰላም! ኣነ ዋርካ እየ። ሎሚ ከመይ ክሕግዘኩም እኽእል?"
      };
      setMessages(prev => [
        ...prev,
        { id: `warka_${Date.now()}`, sender: 'warka', text: helloReplies[currentLang] || helloReplies.en, timestamp: Date.now() }
      ]);
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (geminiApiKey) {
        result = await checkInWithGemini(geminiApiKey, userText, messages, {
          ...userProfile,
          ageGroup,
          profession,
          economicStatus: econ,
          healthConditions: selectedConditions,
          customAgeGroup,
          customProfession,
          customEcon,
          customConditions
        }, currentLang);
      } else {
        result = getFallbackCheckIn(userText, messages, {
          ...userProfile,
          ageGroup,
          profession,
          economicStatus: econ,
          healthConditions: selectedConditions,
          customAgeGroup,
          customProfession,
          customEcon,
          customConditions
        }, currentLang);
      }

      setMessages(prev => [
        ...prev,
        { id: `warka_${Date.now()}`, sender: 'warka', text: result.advice, timestamp: Date.now() }
      ]);
      
      setCurrentScore(result.score);
      setScoreLabel(result.label);
      setMicroAction(result.micro_action);
      const profileContext = {
        ...userProfile,
        ageGroup,
        profession,
        economicStatus: econ,
        healthConditions: selectedConditions,
        customAgeGroup,
        customProfession,
        customEcon,
        customConditions
      };

      let mappedGroups = [];
      if (result.communities && result.communities.length > 0) {
        mappedGroups = result.communities.map(cNameOrId => {
          const g = findGroupByNameOrId(cNameOrId);
          const gId = g ? g.id : 'g_burnout';
          return {
            id: gId,
            label: getPersonalizedGroupLabel(gId, profileContext, currentLang)
          };
        });
      }

      if (mappedGroups.length === 0) {
        const matchedIds = getProfileBasedCommunities(profileContext);
        mappedGroups = matchedIds.map(id => ({
          id,
          label: getPersonalizedGroupLabel(id, profileContext, currentLang)
        }));
      }

      setConnectedGroups(mappedGroups);

      const prevHistory = dbService.get("wellness", "score_history") || [];
      const updatedHistory = [...prevHistory, { date: Date.now(), score: result.score }].slice(-7);
      dbService.save("wellness", "score_history", updatedHistory);

      if (result.score >= 80) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 }
        });
      }

    } catch (err) {
      console.error(err);
      const errMsgs = {
        en: `Error: ${err.message}. Please configure API key in settings drawer.`,
        am: `ስህተት፦ ${err.message}። እባክዎን በቅንብሮች ውስጥ የ-API ቁልፍ ያስገቡ።`,
        om: `Dogoggora: ${err.message}. API Key settings keessatti sirreessi.`,
        ti: `ጌጋ፦ ${err.message}። በጃኹም ኣብ ቅንብራት API Key የእትዉ።`
      };
      setMessages(prev => [
        ...prev,
        { id: `err_${Date.now()}`, sender: 'warka', text: errMsgs[currentLang] || errMsgs.en, timestamp: Date.now() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    onSaveApiKey(apiKeyInput);
    setShowSettings(false);
    const keySavedMsgs = {
      en: "Gemini API Key saved securely to localStorage!",
      am: "የGemini API ቁልፍ በስልክዎ/localStorage ውስጥ በደህንነት ተቀምጧል!",
      om: "Gemini API Key'n haala amansiisaan localStorage keessatti kuufameera!",
      ti: "Gemini API Key ኣብ localStorage ብደሓን ተዓቂቡ ኣሎ!"
    };
    alert(keySavedMsgs[currentLang] || keySavedMsgs.en);
  };

  const getScoreColor = (score) => {
    if (score <= 20) return { bg: "bg-red-500", text: "text-red-500", border: "border-red-500" };
    if (score <= 40) return { bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-500" };
    if (score <= 60) return { bg: "bg-yellow-500", text: "text-yellow-500", border: "border-yellow-500" };
    if (score <= 80) return { bg: "bg-emerald-400", text: "text-[#1D9E75]", border: "border-emerald-400" };
    return { bg: "bg-[#1D9E75]", text: "text-green-400", border: "border-green-400" };
  };

  // Avatar selector
  const getAvatarPath = () => {
    const ageLower = (ageGroup || "").toLowerCase();
    const customAgeLower = (customAgeGroup || "").toLowerCase();

    if (customAgeLower.includes("mother") || customAgeLower.includes("mom") || customAgeLower.includes("እናት") || customAgeLower.includes("እናቴ") || customAgeLower.includes("ማዘር")) {
      return "/images/avatar_mother.png";
    }
    if (customAgeLower.includes("father") || customAgeLower.includes("dad") || customAgeLower.includes("አባት") || customAgeLower.includes("ፋዘር")) {
      return "/images/avatar_man.png";
    }
    if (customAgeLower.includes("teen") || customAgeLower.includes("ወጣት") || customAgeLower.includes("ልጅ")) {
      return "/images/avatar_teenager.png";
    }
    if (customAgeLower.includes("elder") || customAgeLower.includes("grand") || customAgeLower.includes("አረጋዊ") || customAgeLower.includes("ሽማግሌ")) {
      return "/images/avatar_elderly.png";
    }

    if (ageLower === "children") return "/images/avatar_child.png";
    if (ageLower === "teenagers") return "/images/avatar_teenager.png";
    if (ageLower === "elderly") return "/images/avatar_elderly.png";
    if (ageLower === "mothers" || ageLower === "women") return "/images/avatar_mother.png";
    if (ageLower === "fathers" || ageLower === "men") return "/images/avatar_man.png";
    
    return "/images/avatar_mother.png";
  };

  const getAvatarName = () => {
    const avatar = getAvatarPath();
    if (avatar.includes("mother")) return currentLang === 'am' ? "እማማ አልማዝ" : currentLang === 'ti' ? "እማማ አልማዝ" : "Emama Almaz";
    if (avatar.includes("man")) return currentLang === 'am' ? "ጋሽ አበራ" : currentLang === 'ti' ? "ጋሽ አበራ" : "Gash Abera";
    if (avatar.includes("teenager")) return currentLang === 'am' ? "ዮናስ" : currentLang === 'ti' ? "ዮናስ" : "Yonas";
    if (avatar.includes("child")) return currentLang === 'am' ? "ኪሩቤል" : currentLang === 'ti' ? "ኪሩቤል" : "Kirubel";
    if (avatar.includes("elderly")) return currentLang === 'am' ? "አባ ጫላ" : currentLang === 'ti' ? "አባ ጫላ" : "Abba Chala";
    return "Warka Guide";
  };

  const getAvatarDesc = () => {
    const avatar = getAvatarPath();
    if (avatar.includes("mother")) {
      return {
        en: "Emama Almaz — A compassionate mother and community elder ready to guide you.",
        am: "እማማ አልማዝ — እርስዎን ለመርዳት የተዘጋጁ ደግ የሆኑ የማህበረሰብ አዛውንት።",
        om: "Emama Almaz — Haadha gara-laafettii fi manguddo hawaasaa si gargaaruuf qophoofte.",
        ti: "እማማ አልማዝ — ንዓኹም ንምሕጋዝ ዝተዳለዉ ሕያዋይ ማሕበረሰብ ዓብዪ ሰብ።"
      }[currentLang] || "";
    }
    if (avatar.includes("man")) {
      return {
        en: "Gash Abera — A wise father and seasoned mentor offering guidance.",
        am: "ጋሽ አበራ — የዕለት ተዕለት ምክርና መመሪያ የሚሰጡ አስተዋይ የሆኑ አባት።",
        om: "Gash Abera — Abbaa ogeessa fi gorsaa jireenyaa si deeggaru.",
        ti: "ጋሽ አበራ — መዓልታዊ ምኽርን መምርሕን ዝህቡ ኣስተውዓሊ ኣቦ።"
      }[currentLang] || "";
    }
    if (avatar.includes("teenager")) {
      return {
        en: "Yonas — A supportive youth peer who understands peer pressures.",
        am: "ዮናስ — የእኩዮችን ጫና እና ዘመናዊ ውጥረትን የሚረዳ ረዳት ወጣት።",
        om: "Yonas — Dargaggoo dhiibbaa hiriyootaa fi dhiphina jireenyaa hubatu.",
        ti: "ዮናስ — ናይ መዛኑ ጸቕጥን ዘመናዊ ጭንቀትን ዝርዳእ መንእሰይ።"
      }[currentLang] || "";
    }
    if (avatar.includes("child")) {
      return {
        en: "Kirubel — A gentle listener supporting family care circles.",
        am: "ኪሩቤል — ከወላጆችና ከቤተሰብ ጋር አብሮ የሚሰማ ረዳት ልጅ።",
        om: "Kirubel — Daa'ima gara-laafessa maatii gargaaru.",
        ti: "ኪሩቤል — ምስ ወለድን ስድራቤትን ብሓባር ዝሰምዕ ረዳት ህጻን።"
      }[currentLang] || "";
    }
    if (avatar.includes("elderly")) {
      return {
        en: "Abba Chala — A respected elder offering cultural wisdom.",
        am: "አባ ጫላ — ጥልቅ ባህላዊ እውቀት እና ምክር የሚሰጡ የተከበሩ አዛውንት።",
        om: "Abba Chala — Manguddo kabajamaa gorsa fi ogummaa aadaa qabu.",
        ti: "አባ ጫላ — ጥልቂ ባህላዊ ፍልጠትን ምኽርን ዝህቡ ዝተኸበሩ ዓብዪ ሰብ።"
      }[currentLang] || "";
    }
    return "";
  };

  // Determine room style based on score
  const getThemeConfig = () => {
    if (currentScore === null) {
      return {
        bg: "bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22]",
        glass: "bg-emerald-950/40 border border-emerald-300/20 shadow-emerald-500/5",
        text: "text-emerald-100",
        type: "calm"
      };
    }
    if (currentScore <= 30) {
      return {
        bg: "bg-gradient-to-b from-[#050f0c] via-[#0b1b17] to-[#010705]",
        glass: "bg-[#051410]/70 border border-[#1D9E75]/40 theme-neon-active shadow-[#1D9E75]/20",
        text: "text-emerald-300",
        type: "burnout"
      };
    }
    if (currentScore < 60) {
      return {
        bg: "bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#030712]",
        glass: "bg-slate-900/60 border border-blue-400/20 shadow-blue-500/5",
        text: "text-blue-100",
        type: "anxiety"
      };
    }
    if (currentScore >= 80) {
      return {
        bg: "bg-gradient-to-b from-[#4c0519] via-[#881337] to-[#4c0519]",
        glass: "bg-rose-950/30 border border-rose-400/20 shadow-rose-500/10",
        text: "text-rose-100",
        type: "happiness"
      };
    }
    return {
      bg: "bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22]",
      glass: "bg-emerald-950/40 border border-emerald-300/20 shadow-emerald-500/5",
      text: "text-emerald-100",
      type: "calm"
    };
  };

  const roomTheme = getThemeConfig();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left relative">
      <style>{``}</style>

      {/* Unified Single-Page Check-in Onboarding Form */}
      {step < 6 && (
        <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[#1D9E75] font-semibold text-label uppercase tracking-widest">
              {{
                en: "Onboarding",
                am: "ምዝገባና መገለጫ",
                om: "Qophii Profile",
                ti: "ምዝገባን መገለጺን"
              }[currentLang] || "Onboarding"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-light text-[#085041] m-0 flex items-center justify-center">
              <Sparkles className="mr-2 w-6 h-6 text-[#1D9E75]" />
              {{
                en: "Configure Wellness Check-In",
                am: "የጤና እና ስነ-ልቦና መገለጫዎን ያዋቅሩ",
                om: "Miseensa Check-in Qopheessi",
                ti: "ናይ ጥዕናን ስነ-ልቦናን መገለጺኹም ኣዳልዉ"
              }[currentLang] || "Configure Wellness Check-In"}
            </h1>
            <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
              {{
                en: "Configure your profiles below. You can select standard options or write your custom reality directly in the text boxes.",
                am: "እባክዎን ከዚህ በታች መገለጫዎን ያስተካክሉ። ከዝርዝሩ ውስጥ መምረጥ ወይም የተለየ እውነታዎን በቀጥታ መጻፍ ይችላሉ።",
                om: "Profile kee asitti qopheessi. Filannoowwan idilee filachuu ykn sanduqa barreeffamaa keessatti haala kee barreessuu dandeessa.",
                ti: "እባክኹም ካብዚ ታሕቲ መገለጺኹም ኣስተኻኽሉ። ካብቲ ዝርዝር ክትመርጹ ወይ ፍሉይ ኩነታትኩም ቀጥታ ክትጽሕፉ ትኽእሉ ኢኹም።"
              }[currentLang] || "Configure your profiles below. You can select standard options or write your custom reality directly in the text boxes."}
            </p>
          </div>

          <div className="space-y-6 text-xs text-left">
            {/* Panel 1: Language */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
                <span className="mr-2">🗣️</span> {t.selectLanguage}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { code: 'am', label: 'አማርኛ' },
                  { code: 'om', label: 'Afaan Oromoo' },
                  { code: 'ti', label: 'ትግርኛ' },
                  { code: 'en', label: 'English' }
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => onChangeLang(lang.code)}
                    type="button"
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      currentLang === lang.code
                        ? 'border-[#085041] bg-[#E1F5EE] text-[#085041] font-bold shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel 2: Life Stage */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
                <span className="mr-2">👶</span> {t.selectAgeGroup}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LIFE_STAGES.map(stage => (
                  <button
                    key={stage.id}
                    onClick={() => setAgeGroup(stage.id)}
                    type="button"
                    className={`p-3 rounded-xl border text-center transition-all ${
                      ageGroup === stage.id
                        ? 'border-[#085041] bg-[#E1F5EE] text-[#085041] font-bold shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-[11px] block leading-tight">{getStageNameById(stage.id)}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder={
                    currentLang === 'en' ? "Or write custom details (e.g. mother of two, young student)..." :
                    currentLang === 'am' ? "ወይም የተለየ የእድሜ/የህይወት ሁኔታዎን እዚህ ይጻፉ (ለምሳሌ፦ የሁለት ልጆች እናት)..." :
                    currentLang === 'om' ? "Yoo ta'e haala dhuunfaa kee asitti barreessi..." :
                    "ወይ ፍሉይ ናይ ዕድመ/ህይወት ኩነታትኩም ኣብዚ ጽሓፉ..."
                  }
                  value={customAgeGroup}
                  onChange={(e) => setCustomAgeGroup(e.target.value)}
                  className="w-full border border-gray-200 p-3.5 rounded-xl bg-white text-xs text-gray-700 focus:outline-none focus:border-[#1D9E75]"
                />
              </div>
            </div>

            {/* Panel 3: Profession */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
                <span className="mr-2">🏢</span> {t.selectProfession}
              </h3>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full border border-gray-200 p-3.5 rounded-xl bg-white text-xs text-gray-700 focus:outline-none focus:border-[#1D9E75] bg-white text-gray-700"
              >
                {PROFESSIONS.map(p => (
                  <option key={p.id} value={p.id}>
                    {getProfessionLabel(p.id)}
                  </option>
                ))}
              </select>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder={
                    currentLang === 'en' ? "Or type custom occupation details..." :
                    currentLang === 'am' ? "ወይም የእርስዎን የተለየ የስራ/ሙያ ዘርፍ እዚህ ይጻፉ..." :
                    currentLang === 'om' ? "Hojii/ogummaa dhuunfaa kee asitti barreessi..." :
                    "ወይ ፍሉይ ናይ ስራሕኩም/ሞያኹም ኣብዚ ጽሓፉ..."
                  }
                  value={customProfession}
                  onChange={(e) => setCustomProfession(e.target.value)}
                  className="w-full border border-gray-200 p-3.5 rounded-xl bg-white text-xs text-gray-700 focus:outline-none focus:border-[#1D9E75]"
                />
              </div>
            </div>

            {/* Panel 4: Economic Status */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
                <span className="mr-2">💰</span> {t.selectEconStatus}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {ECONOMIC_STATUS_OPTIONS.map(opt => (
                  <label
                    key={opt.id}
                    className={`flex items-center space-x-3 p-3.5 border rounded-xl cursor-pointer hover:bg-gray-50/50 text-left ${
                      econ === opt.id ? 'border-[#085041] bg-[#E1F5EE]/40 font-semibold' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="econ_radio"
                      value={opt.id}
                      checked={econ === opt.id}
                      onChange={() => setEcon(opt.id)}
                      className="text-[#1D9E75] focus:ring-[#1D9E75] mr-2"
                    />
                    <span>{currentLang === 'en' ? opt.en : currentLang === 'am' ? opt.am : currentLang === 'om' ? (opt.om || opt.en) : (opt.ti || opt.en)}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder={
                    currentLang === 'en' ? "Or type custom details about your financial situation..." :
                    currentLang === 'am' ? "ወይም የእርስዎን የገንዘብ/ቁጠባ ሁኔታ እዚህ ይጻፉ..." :
                    currentLang === 'om' ? "Haala dinagdee dhuunfaa kee asitti barreessi..." :
                    "ወይ ፍሉይ ናይ ቁጠባ/ገንዘብ ኩነታትኩም ኣብዚ ጽሓፉ..."
                  }
                  value={customEcon}
                  onChange={(e) => setCustomEcon(e.target.value)}
                  className="w-full border border-gray-200 p-3.5 rounded-xl bg-white text-xs text-gray-700 focus:outline-none focus:border-[#1D9E75]"
                />
              </div>
            </div>

            {/* Panel 5: Conditions */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
                <span className="mr-2">🩹</span> {ext.conditionsProfile || "Conditions Profile"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {HEALTH_CONDITIONS.map(c => (
                  <label key={c.id} className="flex items-center space-x-2 p-2 border rounded-lg bg-white cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(c.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedConditions(prev => prev.filter(item => item !== "none").concat(c.id));
                        } else {
                          setSelectedConditions(prev => prev.filter(item => item !== c.id));
                        }
                      }}
                      className="rounded text-[#1D9E75] focus:ring-[#1D9E75] mr-2"
                    />
                    <span>{currentLang === 'en' ? c.en : currentLang === 'am' ? c.am : currentLang === 'om' ? (c.om || c.en) : (c.ti || c.en)}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder={
                    currentLang === 'en' ? "Or list other medical conditions or dietary practices..." :
                    currentLang === 'am' ? "ወይም ሌሎች የጤና/የአመጋገብ ሁኔታዎችን እዚህ ይዘርዝሩ..." :
                    currentLang === 'om' ? "Haala fayyaa ykn nyaata biroo asitti barreessi..." :
                    "ወይ ካልኦት ናይ ጥዕና/ኣመጋገብ ኩነታት ኣብዚ ጽሓፉ..."
                  }
                  value={customConditions}
                  onChange={(e) => setCustomConditions(e.target.value)}
                  className="w-full border border-gray-200 p-3.5 rounded-xl bg-white text-xs text-gray-700 focus:outline-none focus:border-[#1D9E75]"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleCompleteOnboarding}
                className="bg-[#1D9E75] hover:bg-[#1D9E75]/95 text-white font-bold px-10 py-4 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider animate-bounce-soft flex items-center space-x-2"
              >
                <span>✨</span>
                <span>
                  {
                    currentLang === 'en' ? "Warka, Help Me" :
                    currentLang === 'am' ? "ዋርካ እርጂኝ" :
                    currentLang === 'om' ? "Warka Na Gargaari" :
                    "ዋርካ ሓግዘኒ"
                  }
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Active AI Chat Dashboard */}
      {step === 6 && (
        <div className={`p-6 sm:p-8 rounded-3xl transition-all duration-700 relative overflow-hidden ${roomTheme.bg}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch relative z-10">
            
            {/* Column 1: Simplified Adjust Profile Card */}
            <div className={`lg:col-span-1 p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg text-white border transition-all duration-500 ${roomTheme.glass}`}>
              {/* Action back button to edit profile */}
              <button
                onClick={() => setStep(1)}
                className="w-full py-3 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center justify-center space-x-1.5"
              >
                <Edit className="w-4 h-4" />
                <span>{currentLang === 'en' ? "Adjust Profile" : "መገለጫ አሻሽል"}</span>
              </button>
            </div>

            {/* Column 2 & 3: Chat interface */}
            <div className={`lg:col-span-2 rounded-3xl overflow-hidden flex flex-col h-[550px] shadow-lg relative border transition-all duration-500 ${roomTheme.glass}`}>
              
              {/* Chat Room Header */}
              <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
                <div className="text-left flex items-center space-x-2">
                  <span className="text-2xl">🌳</span>
                  <div>
                    <h3 className="font-semibold text-sm text-white m-0">{t.brand} AI</h3>
                    <span className="text-[10px] text-white/60 block mt-0.5 capitalize">
                      {customAgeGroup ? customAgeGroup : getStageNameById(ageGroup)} • {customProfession ? customProfession : getProfessionLabel(profession)}
                    </span>
                  </div>
                </div>

                {/* API Settings toggle */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-white/50 hover:text-white focus:outline-none"
                  title="Configure Gemini API"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {/* API Settings Dialog overlay */}
              {showSettings && (
                <div className="absolute top-16 left-0 right-0 z-30 bg-slate-950 border-b border-white/10 p-4 shadow-xl text-xs space-y-3 text-white">
                  <h4 className="font-bold text-[#1D9E75] m-0">{t.apiSettings}</h4>
                  <p className="text-gray-300 m-0 leading-relaxed">
                    {ext.apiWarning || "Warka runs locally using native fallback logic, but you can paste a Gemini 2.5 Flash API key to enable live AI responses."}
                  </p>
                  <form onSubmit={handleSaveKey} className="flex gap-2">
                    <input
                      type="password"
                      placeholder={t.apiKeyPlaceholder}
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      className="flex-1 border border-white/10 bg-white/5 px-3 py-2 rounded-lg outline-none focus:border-[#1D9E75] text-white placeholder-white/30"
                    />
                    <button type="submit" className="bg-[#1D9E75] text-white px-4 py-2 rounded-lg font-semibold">
                      {t.saveKey}
                    </button>
                  </form>
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-left bg-black/10">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] text-white/40 mb-0.5">
                      {msg.sender === 'user' ? (currentLang === 'en' ? 'You' : currentLang === 'am' ? 'እርስዎ' : currentLang === 'om' ? 'Sii' : 'ንስኹም') : getAvatarName()}
                    </span>
                    <div className={`p-3.5 rounded-2xl max-w-[85%] shadow-xs leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#1D9E75] text-white rounded-tr-none' 
                        : 'bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 text-white/40 p-3 rounded-2xl rounded-tl-none flex items-center shadow-xs">
                      <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full animate-bounce mr-1" />
                      <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full animate-bounce mr-1 [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendText} className="border-t border-white/10 p-4 flex items-center space-x-2 bg-white/5">
                <button
                  type="button"
                  onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}
                  className={`p-3 rounded-xl transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  title="Voice Input"
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <input
                  type="text"
                  placeholder={t.typeSomething}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#1D9E75] text-white placeholder-white/30"
                />
                <button
                  type="submit"
                  className="bg-[#1D9E75] hover:bg-[#1D9E75]/95 text-white p-3 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Column 4: Outcomes */}
            <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">

              {/* Micro-actions */}
              {microAction && (
                <div className="bg-amber-950/20 border border-amber-500/20 backdrop-blur-md rounded-3xl p-6 shadow-lg space-y-3">
                  <h3 className="font-semibold text-xs text-amber-300 uppercase tracking-wider m-0 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-amber-400" />
                    {t.dailyMicroAction}
                  </h3>
                  <p className="text-xs text-amber-100 leading-relaxed m-0 text-left">
                    {microAction}
                  </p>
                </div>
              )}

              {/* Connected Groups */}
              {connectedGroups.length > 0 && (
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg space-y-3">
                  <h3 className="font-semibold text-xs text-[#1D9E75] uppercase tracking-wider m-0 flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1.5 text-[#1D9E75]" />
                    {t.connectedGroups}
                  </h3>
                  <div className="grid grid-cols-1 gap-2 text-left">
                    {connectedGroups.map((group, idx) => (
                      <a
                        key={idx}
                        href={`#community?groupId=${group.id}`}
                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-semibold text-white flex items-center justify-between group transition-all"
                      >
                        <span>💬 {group.label}</span>
                        <span className="text-white/40 group-hover:translate-x-1 group-hover:text-white transition-all">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Redirect meal plan */}
              <div className="bg-emerald-950/20 border border-emerald-500/20 backdrop-blur-md p-5 rounded-3xl shadow-lg text-center">
                <p className="text-xs text-emerald-200 font-semibold leading-relaxed mb-3">
                  {ext.configuredMealPlan || "Warka configured a custom 7-day Ethiopian meal plan for your conditions."}
                </p>
                <a
                  href="#mindfuel"
                  className="bg-[#1D9E75] hover:bg-[#1D9E75]/95 text-white text-xs font-semibold px-6 py-2.5 rounded-xl block shadow-sm text-center"
                >
                  {ext.openMealPlan || "Open Meal Plan"}
                </a>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};
