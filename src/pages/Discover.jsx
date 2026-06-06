import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { EXTRA_TRANSLATIONS } from '../utils/extraTranslations';
import { WELLNESS_BUSINESSES } from '../utils/constants';
import { dbService } from '../utils/firebase';
import { Compass, Search, PlusCircle, Check, Sparkles, MapPin, Award, Star, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Discover = ({ currentLang, userProfile }) => {
  const t = TRANSLATIONS[currentLang];
  const ext = EXTRA_TRANSLATIONS[currentLang] || EXTRA_TRANSLATIONS.en;
  
  // States
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState(userProfile.economicStatus || "middle_income");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Small Business Submission
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [bizName, setBizName] = useState("");
  const [bizCategory, setBizCategory] = useState("spa");
  const [bizPrice, setBizPrice] = useState("middle");
  const [bizCostText, setBizCostText] = useState("");
  const [bizLocation, setBizLocation] = useState("");
  const [bizDesc, setBizDesc] = useState("");
  const [bizImage, setBizImage] = useState("");
  const [bizVideo, setBizVideo] = useState("");
  const [customListings, setCustomListings] = useState([]);

  // Payment Gateway Simulator states
  const [paymentFlow, setPaymentFlow] = useState({ active: false, type: null, payload: null, step: "input" });

  // AI Journey Planner states
  const [activePlannerPlan, setActivePlannerPlan] = useState(null);
  const [isPlanning, setIsPlanning] = useState(false);

  useEffect(() => {
    loadCustomListings();
  }, []);

  const loadCustomListings = () => {
    const list = dbService.list("custom_businesses");
    setCustomListings(list);
  };

  const handleBookNow = (bizName) => {
    setPaymentFlow({
      active: true,
      type: "book_service",
      payload: { bizName },
      step: "input"
    });
  };

  const handleCreateBusiness = (e) => {
    e.preventDefault();
    if (!bizName || !bizLocation || !bizDesc) return;

    const newBiz = {
      id: `biz_${Date.now()}`,
      name: bizName,
      category: bizCategory,
      priceRange: bizPrice === "struggling" ? "struggling" : (bizPrice === "low" ? "low" : (bizPrice === "middle" ? "middle" : "high")),
      costText: bizCostText || "Contact for pricing",
      locations: [bizLocation],
      descEn: bizDesc,
      descAm: bizDesc,
      image: bizImage,
      videoUrl: bizVideo,
      rating: 85,
      isVerified: false,
      isCustom: true
    };

    setPaymentFlow({
      active: true,
      type: "list_business",
      payload: newBiz,
      step: "input"
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentFlow(prev => ({ ...prev, step: "processing" }));
    setTimeout(() => {
      setPaymentFlow(prev => ({ ...prev, step: "success" }));
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }, 2500);
  };

  const handlePaymentComplete = () => {
    if (paymentFlow.type === "list_business") {
       const newBiz = paymentFlow.payload;
       dbService.save("custom_businesses", newBiz.id, newBiz);
       loadCustomListings();
       setBizName(""); setBizLocation(""); setBizDesc(""); setBizCostText(""); setBizImage(""); setBizVideo("");
       setShowSubmitModal(false);
    } else if (paymentFlow.type === "book_service") {
       const bookingAlerts = {
         en: `🎉 Booking Confirmed! We have sent your details to ${paymentFlow.payload.bizName}. Expect a call shortly!`,
         am: `🎉 ቦታ መያዙ ተረጋግጧል! መረጃዎ ወደ ${paymentFlow.payload.bizName} ተልኳል።`,
         om: `🎉 Bakki qabachuu kee mirkanaa'eera! ${paymentFlow.payload.bizName} tiif ergameera.`,
         ti: `🎉 ቦታ ምሓዝኩም ተረጋጊጹ ኣሎ! ናብ ${paymentFlow.payload.bizName} ልኢኹ ኣሎ።`
       };
       alert(bookingAlerts[currentLang] || bookingAlerts.en);
    }
    setPaymentFlow({ active: false, type: null, payload: null, step: "input" });
  };

  const generateAIPlan = () => {
    setIsPlanning(true);
    setTimeout(() => {
      let planSteps = [];
      const isLowCost = selectedBudget === "struggling" || selectedBudget === "low_income";
      
      const stepsData = {
        en: isLowCost ? [
          { day: "Day 1", title: "Morning Entoto walk (free) + 10-min slow breathing", cost: "0 ETB" },
          { day: "Day 2", title: "Orthodox fasting meal (shiro & misir) + evening shai quiet time", cost: "0 ETB" },
          { day: "Day 3", title: "Connect with local edir group chat + screen-free walking home", cost: "0 ETB" },
          { day: "Day 4", title: "Sit under local tree 15 mins + slow morning buna ceremony", cost: "0 ETB" },
          { day: "Day 5", title: "10-cycle deep breathing session + local vegetable diet", cost: "0 ETB" },
          { day: "Day 6", title: "Play community football or neighborhood dance (Eskista)", cost: "0 ETB" },
          { day: "Day 7", title: "Check new Warka Score + chat with one trusted elder", cost: "0 ETB" }
        ] : [
          { day: "Day 1", title: "Guided breathing + 20-min walking in Entoto Paths", cost: "0 ETB" },
          { day: "Day 2", title: "Fasting nutrition meal planning + slow morning buna ceremony", cost: "50 ETB" },
          { day: "Day 3", title: "Book Tulsi Yoga class (1st class is free code: WARKA1)", cost: "0 ETB" },
          { day: "Day 4", title: "Rest day: digital detox after 8 PM, screens-off, early sleep", cost: "0 ETB" },
          { day: "Day 5", title: "Rejoin Warka Mothers / Fathers Circle + daily micro-action", cost: "0 ETB" },
          { day: "Day 6", title: "Book mineral spa day massage session", cost: "350 ETB" },
          { day: "Day 7", title: "Verify new wellness score + consult dietitian", cost: "100 ETB" }
        ],
        am: isLowCost ? [
          { day: "ቀን 1", title: "የጠዋት የእንቶጦ ጉዞ (ነጻ) + የ10 ደቂቃ ረጋ ያለ ትንፋሽ", cost: "0 ብር" },
          { day: "ቀን 2", title: "የአጽዋማት ምግብ (ሽሮ እና ምስር) + የምሽት ሻይ ጸጥታ ጊዜ", cost: "0 ብር" },
          { day: "ቀን 3", title: "ከአካባቢው እድር የቡድን ውይይት ጋር መገናኘት + ያለ ስልክ በእግር መጓዝ", cost: "0 ብር" },
          { day: "ቀን 4", title: "ከአካባቢ ዛፍ ስር 15 ደቂቃ መቀመጥ + የጠዋት ረጋ ያለ ቡና ስነ-ስርዓት", cost: "0 ብር" },
          { day: "ቀን 5", title: "የ10 ዙር ጥልቅ የትንፋሽ ልምምድ + የአካባቢ አትክልት አመጋገብ", cost: "0 ብር" },
          { day: "ቀን 6", title: "የሰፈር እግር ኳስ መጫወት ወይም የባህል እስክስታ ጭፈራ", cost: "0 ብር" },
          { day: "ቀን 7", title: "አዲሱን የዋርካ ውጤት መፈተሽ + ከሚታመን አዛውንት ጋር መወያየት", cost: "0 ብር" }
        ] : [
          { day: "ቀን 1", title: "የሚመራ የትንፋሽ ልምምድ + በእንቶጦ መንገዶች 20 ደቂቃ በእግር መጓዝ", cost: "0 ብር" },
          { day: "ቀን 2", title: "የአጽዋማት የተመጣጠነ ምግብ እቅድ + የጠዋት ረጋ ያለ የቡና ስነ-ስርዓት", cost: "50 ብር" },
          { day: "ቀን 3", title: "የቱልሲ ዮጋ ክፍል መመዝገብ (የመጀመሪያው ክፍል ነጻ ኮድ: WARKA1)", cost: "0 ብር" },
          { day: "ቀን 4", title: "የእረፍት ቀን፡ ከምምሹቱ 2 ሰዓት በኋላ ከስልክ መራቅ፣ ቀድሞ መተኛት", cost: "0 ብር" },
          { day: "ቀን 5", title: "ወደ ዋርካ እናቶች/አባቶች ክበብ መመለስ + የእለት ተእለት ተግባር", cost: "0 ብር" },
          { day: "ቀን 6", title: "የማዕድን ስፓ ማሸት ክፍለ ጊዜ መያዝ", cost: "350 ብር" },
          { day: "ቀን 7", title: "አዲሱን የጤና ውጤት ማረጋገጥ + ከአመጋገብ ባለሙያ ጋር መማከር", cost: "100 ብር" }
        ],
        om: isLowCost ? [
          { day: "Guyyaa 1", title: "Deeminsa miilaa ganamaa Anxoxoo (bilisa) + hargansuu daq 10", cost: "0 ETB" },
          { day: "Guyyaa 2", title: "Nyaata soomaa (shiroo & misira) + yeroo callisa shayi galgalaa", cost: "0 ETB" },
          { day: "Guyyaa 3", title: "Garee hawaasaa iddirii wajjin wal qunnamuu + bilbila malee deemuu", cost: "0 ETB" },
          { day: "Guyyaa 4", title: "Muka jala daq 15 taa'uu + sirna buna ganamaa suuta jedhu", cost: "0 ETB" },
          { day: "Guyyaa 5", title: "Shaakallii hargansuu gadi fagoo marsaa 10 + nyaata kuduraa", cost: "0 ETB" },
          { day: "Guyyaa 6", title: "Kubbaa miilaa hawaasaa taphachuu ykn shaggooyyee/dhiichisa", cost: "0 ETB" },
          { day: "Guyyaa 7", title: "Qabxii Warka haaraa ilaaluu + ogeessa maanguddoota wajjin haasa'uu", cost: "0 ETB" }
        ] : [
          { day: "Guyyaa 1", title: "Hargansuu qajeelfamaa + Daandii Anxoxoo keessa daq 20 deemuu", cost: "0 ETB" },
          { day: "Guyyaa 2", title: "Sagantaa nyaata soomaa + sirna buna ganamaa suuta jedhu", cost: "50 ETB" },
          { day: "Guyyaa 3", title: "Dareen Yoogaa Tulsi qabachuu (koodii bilisaa: WARKA1)", cost: "0 ETB" },
          { day: "Guyyaa 4", title: "Guyyaa boqonnaa: sa'aatii 2 booda detoksiin dijiitaalaa", cost: "0 ETB" },
          { day: "Guyyaa 5", title: "Garee Warka Hadhota/Abboota makamuu + gocha guyyaa", cost: "0 ETB" },
          { day: "Guyyaa 6", title: "Tajaajila masaajii isppaa mineralii qabachuu", cost: "350 ETB" },
          { day: "Guyyaa 7", title: "Qabxii fayyaa haaraa mirkaneessuu + diyetishian gorsuu", cost: "100 ETB" }
        ],
        ti: isLowCost ? [
          { day: "መዓልቲ 1", title: "ናይ ንግሆ ጉዕዞ እንቶጦ (ነጻ) + ናይ 10 ደቂቃ ህዱእ ምስትንፋስ", cost: "0 ብር" },
          { day: "መዓልቲ 2", title: "ናይ ጾም መግቢ (ሽሮን ምስርን) + ናይ ምሸት ሻሂ ጽሙዋ ግዜ", cost: "0 ብር" },
          { day: "መዓልቲ 3", title: "ምስ ከባቢያዊ እድር ማሕበረሰብ ምርኻብ + ብዘይ ስልኪ ምኻድ", cost: "0 ብር" },
          { day: "መዓልቲ 4", title: "ካብ ኦም ትሕቲ 15 ደቂቃ ምቕማጥ + ናይ ንግሆ ህዱእ ቡና ስነ-ስርዓት", cost: "0 ብር" },
          { day: "መዓልቲ 5", title: "ናይ 10 ዙር ዓሚቕ ምስትንፋስ ልምምድ + ናይ ከባቢ ኣሕምልቲ መግቢ", cost: "0 ብር" },
          { day: "መዓልቲ 6", title: "ናይ ሰፈር ኩዕሶ እግሪ ምጽዋት ወይ ናይ ባህሊ እስክስታ ምዕሳው", cost: "0 ብር" },
          { day: "መዓልቲ 7", title: "ሓዱሽ ናይ ዋርካ ውጽኢት ምርኣይ + ምስ ዝእመን ዓብዪ ሰብ ምዕላል", cost: "0 ብር" }
        ] : [
          { day: "መዓልቲ 1", title: "ዝምራሕ ምስትንፋስ + ኣብ ጫካ እንቶጦ 20 ደቂቃ ብእግሪ ምኻድ", cost: "0 ብር" },
          { day: "መዓልቲ 2", title: "ናይ ጾም መግቢ መደብ + ናይ ንግሆ ህዱእ ቡና ስነ-ስርዓት", cost: "50 ብር" },
          { day: "መዓልቲ 3", title: "ናይ ቱልሲ ዮጋ ክላስ ምዝጋብ (ቀዳማይ ክላስ ነጻ ኮድ: WARKA1)", cost: "0 ብር" },
          { day: "መዓልቲ 4", title: "ዕለተ ዕረፍቲ፡ ድሕሪ ምሸት 2 ሰዓት ዲጂታላዊ መርዛም ምውጋድ", cost: "0 ብር" },
          { day: "መዓልቲ 5", title: "ናብ ዋርካ ኣዴታት/ኣቦታት ማሕበር ምምላስ + ናይ ዕለት ተግባር", cost: "0 ብር" },
          { day: "መዓልቲ 6", title: "ናይ ማዕድን ስፓ መሳጅ ክፍለ ግዜ ምሓዝ", cost: "350 ብር" },
          { day: "መዓልቲ 7", title: "ሓዱሽ ናይ ጥዕና ውጽኢት ምርግጋጽ + ምስ ክኢላ መግቢ ምኽርታት", cost: "100 ብር" }
        ]
      };
      
      planSteps = stepsData[currentLang] || stepsData.en;
      setActivePlannerPlan(planSteps);
      setIsPlanning(false);
    }, 1200);
  };

  const bookPlannerPlan = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 }
    });
    const plannerAlerts = {
      en: "🎯 Whole Recovery Journey Booked! Partner coupons applied. Total: 450 ETB (instead of 600 ETB). Go to bookings tab for schedules.",
      am: "🎯 የ7-ቀን ማገገሚያ እቅድዎ ሙሉ በሙሉ ተይዟል! ቅናሾች ተደርገዋል። በድምሩ፦ 450 ብር ብቻ። በቦታ ማስያዣዎች ገጽ ላይ ይመልከቱ።",
      om: "🎯 Karoorri bayyanachuu guyyaa 7 guutummaatti qabameera! Kuuponiin hir'ifamee jira. Waliigala: 450 ETB. Gara galmee bookiingii deemi.",
      ti: "🎯 ናይ 7 መዓልቲ ሕክምና ፕላንኩም ሙሉእ ብሙሉእ ተታሒዙ ኣሎ! ቅናሽ ተገይሩ ኣሎ። ጠቕላላ: 450 ብር ጥራይ። ናብ ገጽ ምዝገባታት ኪዱ።"
    };
    alert(plannerAlerts[currentLang] || plannerAlerts.en);
  };

  // Combine standard and custom businesses
  const allListings = [...WELLNESS_BUSINESSES, ...customListings];

  // Filters logic
  const filteredListings = allListings.filter(biz => {
    // 1. Category filter
    if (selectedCategory !== "all" && biz.category !== selectedCategory) return false;

    // 2. Budget filter auto-applied mapped to priceRange
    const priceFilters = {
      lowest_income: ["struggling"],
      low_income: ["struggling", "low"],
      lower_middle: ["low", "middle"],
      middle_class: ["middle"],
      upper_middle: ["middle", "high"],
      wealthy: ["middle", "high"]
    };
    const allowedPrices = priceFilters[selectedBudget] || ["struggling", "low", "middle", "high"];
    if (!allowedPrices.includes(biz.priceRange)) return false;

    // 3. Search text
    const textMatches = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        biz.descEn.toLowerCase().includes(searchQuery.toLowerCase());
    return textMatches;
  });

  const headerTexts = {
    en: {
      market: "Communal Marketplace",
      discover: "Discover Ethiopian Wellness",
      desc: "100% Ethiopian owned and operated wellness options. No imports, no foreign chains. Your spending supports local healers, gyms, spas, and counselors."
    },
    am: {
      market: "የሀገር ውስጥ ጤና አገልግሎቶች ማውጫ",
      discover: "የኢትዮጵያ ጤና ገበያ",
      desc: "100% በሀገር ውስጥ ባለሙያዎች የሚመሩ የጤና አማራጮች። እዚህ የሚያወጡት እያንዳንዱ ብር በኢትዮጵያ ውስጥ ቀርቶ አገር በቀል ፈዋሾችን፣ ጂሞችንና አማካሪዎችን ይደግፋል።"
    },
    om: {
      market: "Gaba Hawaasaa",
      discover: "Fayyaa Itiyoophiyaa Argadhu",
      desc: "Filannoowwan fayyaa dhuunfaa 100% kan Itiyoophiyaa. Faranji irraa kan hin fimidhamne. Kafaltiin kee ogeeyyii fi kellaa fayyaa aadaa gargaara."
    },
    ti: {
      market: "ናይ ማሕበረሰብ ዕዳጋ",
      discover: "ናይ ኢትዮጵያ ጥዕና ፍለጣ",
      desc: "100% ብኢትዮጵያውያን ዝውነኑን ዝመሓደሩን ናይ ጥዕና ምርጫታት። ናይ ወጻኢ ንግዲ የለን። ወጻኢታትኩም ንባህላዊ ፈወስትን ጂምታትን ይድግፍ።"
    }
  };
  const ht = headerTexts[currentLang] || headerTexts.en;

  const noticeTexts = {
    en: " Budget constraints are prioritized to protect you from unaffordable listings.",
    am: " ከአቅም በላይ በሆኑ ክፍያዎች እንዳይቸገሩ ለእርስዎ ተመጣጣኝ የሆኑት ቀድመው ተመርጠዋል።",
    om: " Kaffaltii humnaa ol ta'een akka hin rakkannetti kaffaltiin madaalawaan dursii kennameefi jira.",
    ti: " ካብ ዓቕሚ ንላዕሊ ብዝኾነ ክፍሊት ከይትጽገሙ ክፍሊትኩም ዝተመጣጠነ ኣቐዲሙ ተመሪጹ ኣሎ።"
  };

  const budgetLabels = {
    lowest_income: "Lowest Income (Below 1,000 ETB)",
    low_income: "Low Income (1,000 – 12,000 ETB)",
    lower_middle: "Lower Middle Class (12,000 – 25,000 ETB)",
    middle_class: "Middle Class (25,000 – 60,000 ETB)",
    upper_middle: "Upper Middle Class (60,000 – 150,000 ETB)",
    wealthy: "Wealthy / High Income (150,000+ ETB)"
  };

  const specialDealLabels = {
    en: "Special Deal",
    am: "ልዩ ቅናሽ",
    om: "Kaffaltii Addaa",
    ti: "ፍሉይ ቅናሽ"
  };

  const searchPlaceholders = {
    en: "Search services...",
    am: "አገልግሎቶችን ፈልግ...",
    om: "Tajaajila barbaadi...",
    ti: "ኣገልግሎት ዳልዩ..."
  };

  const getBizDesc = (biz) => {
    if (currentLang === 'am' && biz.descAm) return biz.descAm;
    if (currentLang === 'om' && biz.descOm) return biz.descOm;
    if (currentLang === 'ti' && biz.descTi) return biz.descTi;
    return biz.descEn || biz.name;
  };

  const getCategoryLabel = (catId) => {
    const catMap = {
      spa: ext.spasResorts || "Spas & Resorts",
      yoga: ext.yogaMeditation || "Yoga & Meditation",
      gym: ext.fitnessGyms || "Fitness & Gyms",
      nature: ext.naturalHealing || "Natural Healing",
      therapist: ext.mentalCounselors || "Mental Counselors"
    };
    return catMap[catId] || catId;
  };

  const modalTexts = {
    en: {
      title: "Submit Local Wellness Business",
      name: "Business Name",
      cat: "Category",
      tier: "Economic Tier",
      cost: "Estimated Cost Text",
      loc: "Location Address",
      desc: "Short Description",
      submit: "Submit Listing"
    },
    am: {
      title: "የሀገር ውስጥ የጤና ድርጅት ይመዝግቡ",
      name: "የድርጅት ስም",
      cat: "ምድብ",
      tier: "የኢኮኖሚ ደረጃ",
      cost: "የተገመተ ዋጋ",
      loc: "አድራሻ",
      desc: "አጭር መግለጫ",
      submit: "ድርጅቱን መዝግብ"
    },
    om: {
      title: "Daldala Fayyaa Hawaasaa Galmeessi",
      name: "Maqaa Daldalaa",
      cat: "Garee",
      tier: "Sadarkaa Diinagdee",
      cost: "Gatii Tilmaamame",
      loc: "Kallaqa Teessoo",
      desc: "Ibsa Gabaabaa",
      submit: "Daldala Galchi"
    },
    ti: {
      title: "ትካል ጥዕናኹም መዝግቡ",
      name: "ስም ትካል",
      cat: "ምድብ",
      tier: "ናይ ቊጠባ ኩነታት",
      cost: "ዝተገመተ ዋጋ",
      loc: "አድራሻ",
      desc: "ሓጺር መግለጺ",
      submit: "ትካል መዝግብ"
    }
  };
  const mt = modalTexts[currentLang] || modalTexts.en;

  const noResultsTexts = {
    en: {
      main: "No wellness services fit this filter.",
      sub: "Try changing category or budget filters."
    },
    am: {
      main: "በዚህ አውድ ውስጥ የሚገኝ አገልግሎት የለም።",
      sub: "እባክዎን ምድቡን ወይም የዋጋ ገደቡን ይቀይሩ።"
    },
    om: {
      main: "Tajaajilli fayyaa calalii kanaan walsimu hin jiru.",
      sub: "Garee ykn calalii gatii jijjiiruuf yaali."
    },
    ti: {
      main: "በዚ ጻረይ ዘማልእ ኣገልግሎት የለን።",
      sub: "እባክኹም ምድብ ወይ ናይ ዋጋ ገደብ ቀይሩ።"
    }
  };
  const nr = noResultsTexts[currentLang] || noResultsTexts.en;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-[#185FA5] font-semibold text-label uppercase tracking-widest">
          {ht.market}
        </span>
        <h1 className="text-2xl sm:text-3xl font-light text-[#085041] m-0 flex items-center justify-center">
          <Compass className="mr-2 w-6 h-6 text-[#1D9E75]" />
          {ht.discover}
        </h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
          {ht.desc}
        </p>
      </div>

      {/* Economic Filter Notice */}
      <div className="bg-[#E6F1FB] border border-[#185FA5]/20 p-4 rounded-xl flex items-center justify-between text-xs text-[#185FA5]">
        <div className="flex items-center space-x-2">
          <span>🛡️</span>
          <span>
            <strong>{t.economicFilterApplied} ({budgetLabels[selectedBudget] || selectedBudget})</strong>. 
            {noticeTexts[currentLang] || noticeTexts.en}
          </span>
        </div>
        
        {/* Make Economic Status Selector Larger and Prominent */}
        <div className="flex items-center space-x-2">
          <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Status:</label>
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="bg-white border-2 border-[#185FA5]/30 rounded-lg p-2 text-sm font-bold outline-none text-[#185FA5] shadow-sm hover:border-[#185FA5] cursor-pointer"
          >
            {Object.entries(budgetLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive AI Journey Planner Widget */}
      <div className="bg-gradient-to-r from-[#085041]/10 to-[#1D9E75]/10 border border-[#9FE1CB] p-6 rounded-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-[#1D9E75]" />
              {t.journeyPlanner}
            </h3>
            <p className="text-[11px] text-gray-500 max-w-md leading-normal">
              {currentLang === 'en'
                ? "Let Warka AI construct an interactive 7-day recovery sequence of wellness actions matched to your current stress and financial status."
                : currentLang === 'am'
                ? "የዋርካ AI ከእርስዎ የጭንቀት መጠንና የገንዘብ አቅም ጋር የተዛመደ ባለ 7-ቀን የተሟላ የጤና ማገገሚያ እቅድ በሰከንድ ውስጥ ያዘጋጅልዎት።"
                : currentLang === 'om'
                ? "Warkaan AI yaada dhiphina keetii fi haala qarshii keetiin kan walsimu sagantaa guyyaa 7 siif haa qopheessu."
                : "ዋርካ AI ምስ ናይ ጭንቀት ደረጃኹምን ፋይናንሳዊ ዓቕምኹምን ዝሰማማዕ ናይ 7 መዓልቲ ሕክምና ፕላን የዳልወልኩም።"}
            </p>
          </div>
          <button
            onClick={generateAIPlan}
            disabled={isPlanning}
            className="bg-[#085041] hover:bg-[#085041]/90 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs"
          >
            {isPlanning ? (ext.structuring || "Structuring...") : (ext.generatePlan || "Generate Plan")}
          </button>
        </div>

        {activePlannerPlan && (
          <div className="bg-white border border-[#9FE1CB]/30 rounded-xl p-4 text-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2">
              {activePlannerPlan.map((step, idx) => (
                <div key={idx} className="p-3 bg-gray-50 border rounded-lg text-left space-y-1 flex flex-col justify-between">
                  <span className="font-bold text-[#085041] text-[10px] uppercase block">{step.day}</span>
                  <p className="text-[11px] text-gray-600 m-0 leading-normal">{step.title}</p>
                  <span className="text-[9px] bg-green-100 text-green-800 font-semibold px-1 py-0.5 rounded self-start mt-2">{step.cost}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 border-t mt-4">
              <button
                onClick={bookPlannerPlan}
                className="bg-[#1D9E75] hover:bg-[#1D9E75]/95 text-white text-xs px-6 py-2.5 rounded-lg font-bold shadow-sm"
              >
                {ext.bookWholePlan || "⚡ Book Whole 7-Day Plan"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Catalog Search & Category Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="bg-white border border-[#9FE1CB]/20 p-4 rounded-xl shadow-xs space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholders[currentLang] || searchPlaceholders.en}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 pl-9 pr-4 py-2 rounded-lg text-xs focus:outline-none text-gray-700"
            />
          </div>

          <div className="space-y-1.5 text-xs text-left">
            <span className="font-semibold text-gray-400 block mb-2 uppercase text-[10px] tracking-wider">
              {ext.categories || "Categories"}
            </span>
            {[
              { id: "all", label: { en: "All Services", am: "ሁሉም አገልግሎቶች", om: "Tajaajila Hundumaa", ti: "ኹሉ ኣገልግሎት" } },
              { id: "spa", label: { en: "Spas & Resorts", am: "ሙቅ ውሃና ስፓዎች", om: "Spa fi Resortii", ti: "ስፓታት ሪዞርት" } },
              { id: "yoga", label: { en: "Yoga & Meditation", am: "ዮጋና ማሰላሰል", om: "Yoogaa fi Sammuu", ti: "ዮጋን ምስትንፋስን" } },
              { id: "gym", label: { en: "Fitness & Gyms", am: "ጂሞችና ስፖርቶች", om: "Gym fi Ispoortii", ti: "ጂም ስፖርትን" } },
              { id: "nature", label: { en: "Natural Healing", am: "የተፈጥሮ ፈውስ ቦታዎች", om: "Bakkeewwan Uumamaa", ti: "ተፈጥሮኣዊ ፈውሲ ቦታታት" } },
              { id: "therapist", label: { en: "Mental Counselors", am: "የስነ-ልቦና አማካሪዎች", om: "Gorsitoota Sammuu", ti: "ናይ ኣእምሮ መማኸርቲ" } }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#E1F5EE] text-[#085041] font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat.label[currentLang] || cat.label.en}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="w-full border-2 border-dashed border-[#1D9E75] hover:bg-[#E1F5EE]/30 text-[#085041] text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4 text-[#1D9E75]" />
            <span>{ext.listBusiness || "List Your Business"}</span>
          </button>
        </div>

        {/* Listings Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredListings.map(biz => (
            <div key={biz.id} className="bg-white border border-[#9FE1CB]/20 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              {biz.image && (
                <div className="h-40 w-full bg-gray-100 border-b relative">
                  <img src={biz.image} alt={biz.name} className="w-full h-full object-cover" />
                </div>
              )}
              {biz.videoUrl && !biz.image && (
                <div className="h-40 w-full bg-black border-b">
                  <iframe src={biz.videoUrl} title={biz.name} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              )}
              <div className="p-5 space-y-4 flex-1">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="text-left">
                    <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
                      {biz.name}
                      {biz.isVerified && (
                        <span className="ml-1 text-[#1D9E75] text-[10px] bg-[#E1F5EE] px-1.5 py-0.5 rounded-full font-bold">
                          {ext.verified || "Verified"}
                        </span>
                      )}
                    </h3>
                    <span className="text-[10px] text-gray-400 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-0.5" />
                      {biz.locations.join(", ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#BA7517] block">{biz.costText}</span>
                    <span className="text-[9px] text-gray-400 uppercase font-medium">
                      {getCategoryLabel(biz.category)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed text-left m-0">
                  {getBizDesc(biz)}
                </p>

                {biz.specialPromo && (
                  <div className="bg-amber-50 text-amber-800 text-[10px] p-2.5 rounded-lg border border-amber-200 text-left">
                    🎁 <strong>{specialDealLabels[currentLang] || specialDealLabels.en}:</strong> {biz.specialPromo}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-5 py-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-[#BA7517] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{biz.rating}% {ext.trustScore || "Trust Score"}</span>
                </div>
                <button
                  onClick={() => handleBookNow(biz.name)}
                  className="bg-[#085041] hover:bg-[#085041]/90 text-white px-4 py-1.5 rounded-lg font-semibold shadow-xs"
                >
                  {t.bookNow}
                </button>
              </div>
            </div>
          ))}

          {filteredListings.length === 0 && (
            <div className="col-span-2 py-12 text-center text-gray-400 space-y-1">
              <p>{nr.main}</p>
              <p className="text-[10px] text-gray-400/80">{nr.sub}</p>
            </div>
          )}
        </div>
      </div>

      {/* Business Listing Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateBusiness} className="bg-white rounded-2xl shadow-2xl border max-w-md w-full p-6 text-left space-y-4">
            <div className="flex items-center space-x-2 border-b pb-3 m-0">
              <PlusCircle className="w-5 h-5 text-[#085041]" />
              <h3 className="font-semibold text-sm text-[#085041] m-0">
                {mt.title}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-600 block mb-1">{mt.name}</label>
                <input type="text" value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="E.g. Tulsi Yoga Studio" className="w-full border p-2 rounded-lg focus:outline-none text-gray-700" required />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-600 block mb-1">{mt.cat}</label>
                  <select value={bizCategory} onChange={(e) => setBizCategory(e.target.value)} className="w-full border p-2 rounded-lg text-gray-700 bg-white">
                    <option value="spa">{ext.spasResorts || "Spas & Resorts"}</option>
                    <option value="yoga">{ext.yogaMeditation || "Yoga & Meditation"}</option>
                    <option value="gym">{ext.fitnessGyms || "Fitness & Sports"}</option>
                    <option value="nature">{ext.naturalHealing || "Natural Sites"}</option>
                    <option value="therapist">{ext.mentalCounselors || "Mental Counselor"}</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-gray-600 block mb-1">{mt.tier}</label>
                  <select value={bizPrice} onChange={(e) => setBizPrice(e.target.value)} className="w-full border p-2 rounded-lg text-gray-700 bg-white">
                    <option value="struggling">{ext.strugglingFree || "Struggling (Free)"}</option>
                    <option value="low">{ext.lowIncome || "Low cost (<100 ETB)"}</option>
                    <option value="middle">{ext.middleIncome || "Middle cost (100-1000 ETB)"}</option>
                    <option value="high">{ext.comfortableAll || "High cost (1000+ ETB)"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-600 block mb-1">{mt.cost}</label>
                <input type="text" value={bizCostText} onChange={(e) => setBizCostText(e.target.value)} placeholder="E.g. 200 ETB / class" className="w-full border p-2 rounded-lg focus:outline-none text-gray-700" required />
              </div>

              <div>
                <label className="font-semibold text-gray-600 block mb-1">{mt.loc}</label>
                <input type="text" value={bizLocation} onChange={(e) => setBizLocation(e.target.value)} placeholder="E.g. Bole, Addis Ababa" className="w-full border p-2 rounded-lg focus:outline-none text-gray-700" required />
              </div>

              <div>
                <label className="font-semibold text-gray-600 block mb-1">{mt.desc}</label>
                <textarea value={bizDesc} onChange={(e) => setBizDesc(e.target.value)} placeholder="Describe the wellness services you offer..." className="w-full border p-2 rounded-lg h-20 focus:outline-none text-gray-700" required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-600 block mb-1">Image URL (Optional)</label>
                  <input type="url" value={bizImage} onChange={(e) => setBizImage(e.target.value)} placeholder="https://..." className="w-full border p-2 rounded-lg focus:outline-none text-gray-700" />
                </div>
                <div>
                  <label className="font-semibold text-gray-600 block mb-1">Video Embed URL (Optional)</label>
                  <input type="url" value={bizVideo} onChange={(e) => setBizVideo(e.target.value)} placeholder="https://www.youtube.com/embed/..." className="w-full border p-2 rounded-lg focus:outline-none text-gray-700" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t mt-4">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-xs font-semibold"
              >
                {ext.close || "Cancel"}
              </button>
              <button
                type="submit"
                className="bg-[#085041] hover:bg-[#085041]/90 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-xs"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Realistic Chapa/Telebirr Simulated Payment Gateway */}
      {paymentFlow.active && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden relative">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#219653] to-[#27AE60] p-6 text-white text-center shadow-inner">
              <h2 className="text-xl font-bold tracking-wider">CHAPA PAY</h2>
              <p className="text-[10px] uppercase font-semibold text-green-100 mt-1">Secure Encrypted Gateway</p>
            </div>

            <div className="p-6 space-y-5">
              <div className="text-center space-y-1">
                <span className="text-gray-500 text-xs font-semibold uppercase block">Amount to Pay</span>
                <span className="text-3xl font-black text-gray-800">
                  {paymentFlow.type === "list_business" ? "500.00" : "200.00"} <span className="text-lg text-gray-500">ETB</span>
                </span>
                <p className="text-xs text-gray-500 font-medium">
                  {paymentFlow.type === "list_business" ? "Marketplace Registration Fee" : `Booking Reservation - ${paymentFlow.payload.bizName}`}
                </p>
              </div>

              {paymentFlow.step === "input" && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 block mb-1 uppercase">Email Address</label>
                    <input type="email" placeholder="you@email.com" className="w-full border-2 border-gray-200 p-2.5 rounded-lg text-sm text-black focus:border-[#27AE60] focus:ring-0 outline-none transition-colors" required />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 block mb-1 uppercase">Card or Telebirr Phone</label>
                    <input type="text" placeholder="09XX XXX XXX or 4XXX..." className="w-full border-2 border-gray-200 p-2.5 rounded-lg text-sm text-black focus:border-[#27AE60] focus:ring-0 outline-none transition-colors" required />
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => setPaymentFlow({ active: false, type: null, payload: null, step: "input" })} className="flex-1 py-3 text-xs font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                      CANCEL
                    </button>
                    <button type="submit" className="flex-[2] py-3 text-xs font-bold text-white bg-[#27AE60] hover:bg-[#219653] rounded-xl shadow-lg shadow-green-600/30 transition-colors flex justify-center items-center">
                      PAY NOW
                    </button>
                  </div>
                </form>
              )}

              {paymentFlow.step === "processing" && (
                <div className="py-8 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-gray-100 border-t-[#27AE60] rounded-full animate-spin"></div>
                  <p className="text-sm font-semibold text-gray-600 animate-pulse">Contacting Bank...</p>
                </div>
              )}

              {paymentFlow.step === "success" && (
                <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Payment Successful</h3>
                    <p className="text-xs text-gray-500 mt-1">Transaction Ref: {Math.floor(Math.random() * 1000000000)}</p>
                  </div>
                  <button onClick={handlePaymentComplete} className="w-full py-3 mt-2 text-xs font-bold text-white bg-[#085041] rounded-xl shadow-lg">
                    CONTINUE TO PLATFORM
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center space-x-1 pt-4 opacity-50">
                <span className="text-[10px] font-semibold text-gray-500">Secured by Chapa</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

