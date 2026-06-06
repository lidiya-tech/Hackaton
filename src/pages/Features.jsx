import React, { useState } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { Sparkles, Brain, Apple, Users, Compass, Shield, Languages } from 'lucide-react';

export const Features = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [activeTab, setActiveTab] = useState("mental");

  const categories = [
    { id: "mental", label: { en: "Mental Wellness", am: "አእምሯዊ ጤና", om: "Fayyaa Sammuu", ti: "ኣእምሮኣዊ ጥዕና" }, icon: Brain, color: "bg-[#085041] text-white" },
    { id: "nutrition", label: { en: "Lifestyle & Nutrition", am: "አመጋገብና አኗኗር", om: "Nyaataa & Sirna Nyaataa", ti: "ኣመጋገብን ኣኗኗርን" }, icon: Apple, color: "bg-[#BA7517] text-white" },
    { id: "community", label: { en: "Community Features", am: "ማህበረሰብ", om: "Hawaasummaa", ti: "ማሕበረሰብ" }, icon: Users, color: "bg-[#534AB7] text-white" },
    { id: "discover", label: { en: "Discover Marketplace", am: "አገልግሎቶች ፍለጋ", om: "Bakka Tajaajilaa", ti: "ምድላይ ኣገልግሎት" }, icon: Compass, color: "bg-[#185FA5] text-white" },
    { id: "safety", label: { en: "Safety & Privacy", am: "ደህንነትና ምስጢራዊነት", om: "Nageenya & Ibsa", ti: "ድሕነትን ምስጢራውነትን" }, icon: Shield, color: "bg-[#993C1D] text-white" }
  ];

  const featuresList = {
    mental: [
      {
        name: { en: "Live AI Check-in", am: "የቀጥታ AI ቼክ-ኢን", om: "Cheek-in AI", ti: "ቀጥታ AI ቼክ-ኢን" },
        desc: {
          en: "Text or speak to Warka in 4 languages; receive deep cultural empathy and support.",
          am: "በ4 ቋንቋዎች ለዋርካ ይጻፉ ወይም ይናገሩ፤ ጥልቅ ባህላዊ ግንዛቤ ያለውን ድጋፍ ያግኙ።",
          om: "Afaan 4n Warkatti barreessi ykn dubbadhu; gorsa deeggarsa aadaa argadhu.",
          ti: "ብ4 ቋንቋታት ንዋርካ ጽሓፉ ወይ ተዛረቡ፤ ባህላዊ ምስትንፋስ ዘለዎ ሓገዝ ክህበኩም እዩ።"
        }
      },
      {
        name: { en: "Voice Tone Emotion Analyzer", am: "የድምፅ ቅላጼ ስሜት መተንተኛ", om: "Xiinxala Miira Sagalee", ti: "ናይ ድምጺ ቅላጼ ስሜት መዐቀኒ" },
        desc: {
          en: "AI evaluates speech frequencies to detect anxiety, anger, sadness, fatigue, or calm.",
          am: "AIው የድምፅዎን ፍጥነትና ድምጸት በመገምገም ጭንቀትን፣ ቁጣን፣ ድብርትን ወይም መረጋጋትን ይለያል።",
          om: "AI'n sagalee kee xiinxaluun dhiphina, aari fi boqonnaa adda baasa.",
          ti: "AI ናይ ድምጺ ፍጥነትኩምን ድምጸትኩምን ብምግምጋም ጭንቀት፣ ሓርቖት፣ ድካም ወይ ምርግጋእ ይፈልጥ።"
        }
      },
      {
        name: { en: "0-100 Warka Score", am: "0-100 የዋርካ ውጤት", om: "Qabxii Warka 0-100", ti: "ውጽኢት ዋርካ 0-100" },
        desc: {
          en: "Visual status showing current mental health, styled dynamically: crisis (red) to thriving (green).",
          am: "አሁን ያለውን የአእምሮ ጤና ሁኔታ የሚያሳይ ሰሌዳ፤ በአረንጓዴ (ጥሩ) እና በቀይ (አስቸጋሪ) ይገለጻል።",
          om: "Haala fayyaa sammuu agarsiisa: diimaa (crisis) hanga magariisa (gaarii).",
          ti: "ናይ ኣእምሮ ጥዕናኹም ዘርኢ ሰሌዳ፤ ብቀይሕ (ክብድ ዝበለ) ወይ ብሓምለዋይ (ጽቡቕ) ይገልጽ።"
        }
      },
      {
        name: { en: "Ethiopian Coping Contexts", am: "የሀገር በቀል መቋቋሚያ ዘዴዎች", om: "Malleen Deeggarsa Aadaa", ti: "ባህላዊ መቋቋሚ መንገድታት" },
        desc: {
          en: "Frames advice using Buna ceremonies, Edir, Orthodox/Muslim fasting, and elderly wisdom.",
          am: "ምክሮችን ከቡና ስነስርዓት፣ ከእድር፣ ከኦርቶዶክስ/ሙስሊም የጾም ጊዜያት እና ከአዛውንቶች ምክር ጋር አዛምዶ ያቀርባል።",
          om: "Gorsa bunaa, edirii, sooma fi gorsa maanguddootaan wal-simu kenna.",
          ti: "ምኽሪታት ምስ ናይ ቡን ስርዓት፣ እድር፣ ናይ ጾም እዋናትን ኣረጋውያንን ኣተሓሒዙ የቕርብ።"
        }
      },
      {
        name: { en: "7-Day Historical Score Trend", am: "የ7-ቀን የውጤት ታሪክ", om: "Hordoffii Qabxii Guyyaa 7", ti: "ታሪኽ ውጽኢት 7 መዓልቲ" },
        desc: {
          en: "Track mental fluctuations over the week to observe stressors and rest cycles.",
          am: "የጭንቀት መንስኤዎችን እና የእረፍት ጊዜያትን ለመለየት በሳምንቱ ውስጥ የአእምሮ ለውጦችን ይከታተሉ።",
          om: "Torban keessatti jijjiirama dhiphina keetii hordofuun boqonnaa qopheessi.",
          ti: "ናይ ጭንቀት ምኽንያታትን ናይ ዕረፍቲ እዋናትን ንምፍላጥ ኣብ ውሽጢ ሰሙን ዘሎ ለውጥታት ይከታተል።"
        }
      },
      {
        name: { en: "Daily Micro-Action Cards", am: "የዕለት ተዕለት ጥቃቅን ተግባራት", om: "Gocha Guyyaa Dhuunfaa", ti: "ዕለታዊ ንጥፈታት" },
        desc: {
          en: "Simple, highly actionable tasks tailored to your budget (e.g. 15-min walk, quiet buna brew).",
          am: "ከገንዘብ አቅምዎ ጋር የተጣጣሙ ቀላል ተግባራት (ለምሳሌ በእግር መጓዝ፣ ቡና ማፍላት)።",
          om: "Gocha guyyaa bajata keetiin wal-simu (fkn: deeminsa miilaa, buna dhuguu).",
          ti: "ምስ ቁጠባዊ ዓቕምኹም ዝተመጣጠኑ ቀለልቲ ንጥፈታት (ንኣብነት ብእግሪ ምኻድ፣ ቡን ምፍላሕ)።"
        }
      },
      {
        name: { en: "Counselor Hot-Referrals", am: "ፈጣን የአማካሪዎች ጥቆማ", om: "Gorsa Ogeessaa Saffisaa", ti: "ቀጥታ ናይ መማኸርቲ ጥቆማ" },
        desc: {
          en: "Triggers sliding-scale local therapy directory if score stays low.",
          am: "የዋርካ ውጤትዎ ዝቅተኛ ሆኖ ከቀጠለ በአቅራቢያዎ ያሉ የስነ-ልቦና ባለሙያዎችን በነጻ ወይም በቅናሽ ያገናኝዎታል።",
          om: "Qabxiin kee gadi bu'aa yoo ta'e gorsitoota fayyaa sammuu siif fida.",
          ti: "ውጽኢትኩም ትሑት እንተኾይኑ ኣብ ከባቢኹም ዘለዉ መማኸርቲ ብነጻ ወይ ብሕሱር ዋጋ የላልየኩም።"
        }
      },
      {
        name: { en: "Voice-First Elder Mode", am: "በድምፅ የሚሰራ የአዛውንቶች ስብስብ", om: "Elder Mode Sagalee Qofaa", ti: "ብድምጺ ዝሰርሕ ናይ ኣረጋውያን ሞድ" },
        desc: {
          en: "Simplified interface with giant buttons and voice-only interactions for seniors 60+.",
          am: "ዕድሜያቸው 60+ ለሆኑ አዛውንቶች የተዘጋጀ ትልልቅ ቁልፎችና ድምፅ ብቻ የሚጠቀም ቀለል ያለ ገጽታ።",
          om: "Jaarsolii 60+ ta'aniif guutumaan guutuutti sagaleen kan hojjetu.",
          ti: "ዕድመኦም 60+ ንዝኾኑ ኣረጋውያን ዝተዳለወ ዓበይቲ ቁልፍታትን ብድምጺ ጥራይ ዝሰርሕን ገጽታ።"
        }
      }
    ],
    nutrition: [
      {
        name: { en: "Health Profile Onboarding", am: "የጤና እና አመጋገብ ምዝገባ", om: "Galmee Profile Fayyaa", ti: "ናይ ጥዕናን ኣመጋገብን ምዝገባ" },
        desc: {
          en: "Save age, weight, health conditions (diabetes, blood pressure, anemia), and fasting practices.",
          am: "ዕድሜን፣ ክብደትን፣ የጤና ሁኔታዎችን (ስኳር፣ ደም ግፊት፣ ደም ማነስ) እና የጾም ልምዶችን ያስቀምጡ።",
          om: "Umrii, ulfaatina, dhibee fayyaa (sukkaara, dhiibbaa dhiigaa) fi sooma galmeessi.",
          ti: "ዕድመ፣ ክብደት፣ ናይ ጥዕና ጸገማት (ሽኮር፣ ጸቕጢ ደም) እና ናይ ጾም ልማድ የቐምጡ।"
        }
      },
      {
        name: { en: "7-Day Local Meal Plans", am: "የ7-ቀን የሀገር ውስጥ ምግብ እቅድ", om: "Sagantaa Nyaata Guyyaa 7", ti: "ናይ 7 መዓልቲ መግቢ መደብ" },
        desc: {
          en: "Automatic weekly matrix generated featuring teff injera, misir, shiro, and gomen.",
          am: "ጠፍ እንጀራን፣ ምስር ወጥን፣ ሽሮን እና ጎመንን ያካተተ ሳምንታዊ የምግብ እቅድ በራስ-ሰር ይዘጋጃል።",
          om: "Injeraa xaafii, shiroo, misira fi gomen irratti hundaa'ee sagantaa qopheessa.",
          ti: "ጣፍ እንጀራ፣ ምስር፣ ሽሮን ቆስጣን ዘጠቓለለ ሰሙናዊ መደብ መግቢ የዳልው።"
        }
      },
      {
        name: { en: "Food Scan Camera", am: "የምግብ ፎቶ መተንተኛ ካሜራ", om: "Kaameraa Scan Nyaataa", ti: "መርማሪ መግቢ ካሜራ" },
        desc: {
          en: "Identify and critique local Ethiopian dishes via camera scans or uploaded photos.",
          am: "የኢትዮጵያን ምግቦች በካሜራ በመቃኘት ወይም ፎቶ በመጫን የአመጋገብ ይዘቱን ይመረምራል።",
          om: "Nyaata Itiyoophiyaa suuraa kaameraan kaasuun xiinxala.",
          ti: "ናይ ኢትዮጵያ መግብታት ብካሜራ ብምምርማር ጥዕናዊ ትሕዝቶኡ ይነግር።"
        }
      },
      {
        name: { en: "Diabetic GI Checker", am: "ለስኳር ታማሚዎች የካርቦሃይድሬት ቁጥጥር", om: "Xiinxala Sukkaara Nyaataa", ti: "ናይ ሽኮር ካርቦሃይድሬት ቊጽጽር" },
        desc: {
          en: "Detects glycemic index of teff injera vs wheat injera, restricting daily carb counts.",
          am: "በጠፍ እንጀራና በስንዴ እንጀራ መካከል ያለውን የግሊሴሚክ ልዩነት በማጥናት ዕለታዊ የስኳር መጠንን ይቆጣጠራል።",
          om: "Xaafii fi qamadii gidduu hamma sukkaaraa adda baasuun dhiibbaa xiqqeessa.",
          ti: "ኣብ ጣፍ እንጀራን ስንዴ እንጀራን ዘሎ ናይ ሽኮር ትሕዝቶ ብምፍላጥ ዕለታዊ መጠን ይቆጻጸር።"
        }
      },
      {
        name: { en: "Hypertension Sodium Alert", am: "የደም ግፊት የጨው መቆጣጠሪያ", om: "Hordoffii Sodiyumii Dhiibbaa Dhiigaa", ti: "ናይ ጸቕጢ ደም ሶዲየም መቆጻጸሪ" },
        desc: {
          en: "Monitors estimated salt/sodium levels, warning against kitfo or heavy berbere stews.",
          am: "በምግቦች ውስጥ ያለውን የጨው/ሶዲየም መጠን በመከታተል ለደም ግፊት አስጊ የሆኑ ምግቦችን ያስጠነቅቃል።",
          om: "Nyaata keessatti hamma ashaboo/sodiyumii hordofuun gorsa kenna.",
          ti: "ኣብ መግቢ ዘሎ መጠን ጨው ብምክትታል ንጸቕጢ ደም ዘስግኡ መግብታት የጠንቅቕ።"
        }
      },
      {
        name: { en: "Anemia Iron Absorption Guide", am: "የብረት ንጥረ ነገር መሳቢያ መመሪያ", om: "Gorsa Absorbii Ayireenii", ti: "መምርሒ መሳቢ ሓጺን (Iron)" },
        desc: {
          en: "Encourages iron-rich shiro/misir/tibs combined with vitamin C (lime juice) to double absorption.",
          am: "እንደ ሽሮ/ምስር/ጥብስ ያሉ ምግቦችን ከቫይታሚን ሲ (ሎሚ) ጋር አብሮ በመመገብ የብረት ንጥረ ነገር መሳብን ያፋጥናል።",
          om: "Shiroo fi misira vaayitaamiinii C (lomiin) nyaachuu gorsa.",
          ti: "ምስር፣ ሽሮ ወይ ጥብስ ምስ ቫይታሚን ሲ (ሎሚ) ብምምጋብ ናይ ሓጺን መሳቢ ዓቕሚ ክብ የብል።"
        }
      },
      {
        name: { en: "Pregnancy Nutrition Adjustments", am: "ለነፍሰ ጡር ሴቶች የአመጋገብ ማስተካከያ", om: "Sirna Nyaata Ulfaa", ti: "ንጥንሲ ዝኸውን ኣመጋገብ" },
        desc: {
          en: "Suggests folate, iron, and calcium targets while warning against raw kitfo listeria risk.",
          am: "የፎሌት፣ የብረትና የካልሲየም ፍላጎትን ያመላክታል፤ ጥሬ ክትፎን የመመገብ አደጋን ያስጠነቅቃል።",
          om: "Ulfaaf deeggarsa ashaboo, kalsiyumii fi gorsa nyaata kitfoo dhorkuu.",
          ti: "ንነፍሰ-ጾር ኣዴታት ዘድልዩ ሓጺን፣ ካልሲየምን ፎሌትን የርኢ፤ ጥሬ ክትፎ ከይበልዓ የጠንቅቕ።"
        }
      },
      {
        name: { en: "Orthodox Fasting Integration", am: "የኦርቶዶክስ ጾም ማስተናገጃ", om: "Madaallii Sooma Ortodoxii", ti: "ኦርቶዶክሳዊ ጾም ኣመጋገብ" },
        desc: {
          en: "Instantly shifts meal suggestions to vegan (yesom) stews on Orthodox fasting days.",
          am: "በጾም ቀናት የምግብ እቅድዎን በራስ-ሰር ወደ የጾም ምግቦች (ሽሮ፣ ምስር ወጥ) ይቀይራል።",
          om: "Guyyoota soomaatti nyaata bilisa sassafeessa (yesom).",
          ti: "ኣብ ናይ ጾም መዓልታት የምግብ እቅድኹም ብራስ-ሰር ናብ ናይ ጾም መግብታት ይቕይሮ።"
        }
      },
      {
        name: { en: "Muslim Ramadan Planner", am: "የረመዳን ጾም እቅድ", om: "Karoora Sooma Ramadaanaa", ti: "መደብ ጾም ረመዳን" },
        desc: {
          en: "Provides high-energy Suhoor suggestions and hydrating, easy-digest Iftar meals.",
          am: "በሱሁር ጊዜ ከፍተኛ ጉልበት የሚሰጡ፣ በኢፍጣር ወቅት ደግሞ በቀላሉ የሚፈጩ ምግቦችን ይጠቁማል።",
          om: "Nyaata Suhuura fi Iftaaraa humna kennan qopheessa.",
          ti: "ኣብ እዋን ሱሁርን ኢፍጣርን ዝበልዑ ንጥዕና ዝሰማምዑ መግብታት የርኢ።"
        }
      },
      {
        name: { en: "Local Cost Estimates", am: "የአካባቢ ገበያ ዋጋ ግምት", om: "Tilmaama Gatii Gabaa", ti: "ናይ ከባቢ ዕዳጋ ዋጋ ግምት" },
        desc: {
          en: "Shows approximate cost per portion in Birr (ETB) based on local Addis market price guidelines.",
          am: "በአዲስ አበባ ገበያ ዋጋዎች ላይ በመመስረት የአንድ ጊዜ የምግብ ወጪን በብር ያሳያል።",
          om: "Gatii nyaataa gabaa Finfinneerraa tilmaamuun ETB'n agarsiisa.",
          ti: "ኣብ ናይ ኣዲስ ኣበባ ዕዳጋ ዋጋታት ተመርኲሱ ናይ ሓደ እዋን ወጻኢ መግቢ የርኢ።"
        }
      }
    ],
    community: [
      {
        name: { en: "68 Segmented Circles", am: "68 የተከፋፈሉ ስብስቦች", om: "Koreewwan 68", ti: "68 ዝተኸፋፈሉ ክቦታት" },
        desc: {
          en: "Tailored rooms matching 28 professions, 10 age brackets, 14 family dynamics, and 16 life situations.",
          am: "ከ28 ሙያዎች፣ ከ10 የዕድሜ ክልሎች፣ ከ14 የቤተሰብ ሚናዎች እና ከ16 የህይወት ሁኔታዎች ጋር የሚጣጣሙ ክፍሎች።",
          om: "Ogummaa 28, umrii 10 fi haala jireenyaa 16 gidduutti garee filadhu.",
          ti: "ምስ 28 ሞያታት፣ 10 ዕድመታት፣ 14 ስድራቤትን 16 ኩነታት ህይወትን ዝሰማምዑ ክቦታት።"
        }
      },
      {
        name: { en: "Simultaneous Group Matching", am: "የብዝሃ-ክበብ ትስስር", om: "Wal-qunnamsiisa Garee", ti: "ምስ ብዙሓት ክቦታት ምርኻብ" },
        desc: {
          en: "Belong to multiple rooms (e.g. Doctors Circle + Fathers Circle) based on your dynamic stress profile.",
          am: "በእርስዎ የጭንቀት ሁኔታ ላይ በመመስረት በአንድ ጊዜ በተለያዩ ክበቦች ውስጥ ይሳተፉ (ለምሳሌ ሐኪሞች + አባቶች)።",
          om: "Gareewwan adda addaa dhuunfaan seeni (fkn: garee Abbootii fi Doktootaa).",
          ti: "ብመሰረት ዘለኩም ጭንቀት ኣብ ዝተፈላለዩ ክቦታት ብሓንሳብ ተሳተፉ (ንኣብነት ሓካይም + ኣቦታት)።"
        }
      },
      {
        name: { en: "Group Chat Dashboard", am: "የማህበረሰብ መወያያ ሰሌዳ", om: "Dashboard Chat Garee", ti: "መወያያ ሰሌዳ ክቦ" },
        desc: {
          en: "Communicate with verified peers in real-time, sharing local coping mechanisms.",
          am: "ከተመሳሳይ አባላት ጋር በቀጥታ በመወያየት የሀገር ውስጥ መቋቋሚያ መንገዶችን ይጋሩ።",
          om: "Malleen rakkoo kee ogeeyyii fi hiriyoota wajjin mari'adhu.",
          ti: "ምስ መዛኑኹም ብቐጥታ ብምውያይ ባህላዊ መቋቋሚ መንገድታት ተማሓላለፉ።"
        }
      },
      {
        name: { en: "Private 1-on-1 DM", am: "የግል መልዕክት (DM)", om: "DM Dhuunfaa 1-on-1", ti: "ምስጢራዊ ናይ 1-ለ-1 መልእኽቲ" },
        desc: {
          en: "Direct message any peer in the room for personal support and mutual encouragement.",
          am: "ለማንኛውም የክበቡ አባል የግል መልዕክት በመላክ እርስ በርስ ይደጋገፉ።",
          om: "Hiriyoota garee keessaa dhuunfaan barreessi wal-gargaari.",
          ti: "ንዝኾነ ናይቲ ክቦ አባል ብምስጢር መልእኽቲ ብምስዳድ እርስ በርስ ተደጋገፉ።"
        }
      },
      {
        name: { en: "Anonymous Posting Mode", am: "ስም-አልባ የመወያያ ዘዴ", om: "Post Anonymous", ti: "ሽም ከይገለጽካ ናይ ምጽሓፍ ሞድ" },
        desc: {
          en: "Post to the group chat using a random avatar and nickname to prevent public stigma.",
          am: "ማህበራዊ መገለልን ለመከላከል ስምዎን እና ፎቶዎን ደብቀው ይወያዩ።",
          om: "Maqaa fi suuraa kee dhoksitee garee keessatti barreessi.",
          ti: "ማሕበራዊ መግለል ንምክልኻል ሽምኩምን ፎቶኹምን ከይገለጽኩም ተወያዩ።"
        }
      },
      {
        name: { en: "AI Weekly Digest", am: "ሳምንታዊ የ-AI ማጠቃለያ", om: "AI Digest Torbanii", ti: "ሰሙናዊ ናይ AI ማጠቃለያ" },
        desc: {
          en: "Get summarized highlights of your circles' discussions without reading thousand-long chat logs.",
          am: "ብዙ መልዕክቶችን ማንበብ ሳይጠበቅብዎት የክበብዎን ዋና ዋና ውይይቶች በ-AI የተጠቃለለ ማጠቃለያ ያግኙ።",
          om: "Mari'i garee keessaa gabaabsee AI'n siif fida.",
          ti: "ብዙሕ መልእኽት ምንባብ ከየድለየኩም ናይቲ ክቦ ቀንዲ ርእስታት ብ-AI ዝተዳለወ ማጠቃለያ የርእየኩም።"
        }
      }
    ],
    discover: [
      {
        name: { en: "100% Ethiopian Owned Businesses", am: "100% የኢትዮጵያ ድርጅቶች", om: "Daldala Itiyoophiyaa 100%", ti: "100% ናይ ኢትዮጵያ ትካላት" },
        desc: {
          en: "Ensures every Birr spent stays within the local economy (Kuriftu Resorts, Tulsi Yoga, counselors).",
          am: "የሚያወጡት እያንዳንዱ ብር በአገር ውስጥ እንዲቀር ያደርጋል (ኩሪፍቱ፣ ቱልሲ ዮጋ፣ አማካሪዎች)።",
          om: "Maallaqni kee biyya keessatti akka hafu godha (Kuriftu, Tulsi Yoga).",
          ti: "እትኸፍልዎ ገንዘብ ኣብ ውሽጢ ዓዲ ከም ዝተርፍ ይገብር (ኩሪፍቱ፣ ቱልሲ ዮጋ፣ አማከርቲ)።"
        }
      },
      {
        name: { en: "Automatic Economic Filter", am: "የገንዘብ አቅም ማጣሪያ", om: "Calaltuu Diinagdee", ti: "ናይ ዓቕሚ ቊጠባ መጽረዪ" },
        desc: {
          en: "Struggling profiles see free natural healing sites first (like Entoto forests or Sodere entry days).",
          am: "እየተቸገሩ ያሉ አባላት እንደ እንጦጦ ፓርክ ያሉ ከክፍያ ነጻ የሆኑ ቦታዎችን መጀመሪያ ያያሉ።",
          om: "Namoota qarshii hin qabneef bakkeewwan bilisaa (fkn. Anxoxoo) dura fida.",
          ti: "ጸገም ዘለዎም ተጠቀምቲ ከም እንጦጦ ዝበሉ ነጻ ቦታታት መጀመሪያ ይርእዩ።"
        }
      },
      {
        name: { en: "Partner Discount Codes", am: "የቅናሽ ኩፖኖች", om: "Kupoonii Qusannaa", ti: "ናይ ቅናሽ ኩፖናት" },
        desc: {
          en: "Direct access to Warka client promo codes (15% off Kuriftu retreats, 1st class free at Tulsi Yoga).",
          am: "የዋርካ አባላት ልዩ የቅናሽ ኮዶችን ያገኛሉ (15% ኩሪፍቱ፣ 1ኛ ክፍለ-ጊዜ በነጻ በቱልሲ ዮጋ)።",
          om: "Kupoonii addaa (fkn: 15% Kuriftu, Tulsi Yoga bilisa).",
          ti: "ናይ ዋርካ አባላት ፍሉይ ቅናሽ ይረኽቡ (15% ኩሪፍቱ፣ ቀዳማይ ክፍሊ ብነጻ ኣብ ቱልሲ ዮጋ)።"
        }
      },
      {
        name: { en: "AI Journey Planner", am: "የ-AI የጉዞ እቅድ አውጪ", om: "Plan AI Deeminsaa", ti: "ናይ AI ናይ ጉዕዞ ፕላን" },
        desc: {
          en: "Integrates multiple services into a 7-day recovery itinerary (e.g. Entoto hike + yoga + counselor session).",
          am: "በርካታ አገልግሎቶችን በማጣመር የ7-ቀን የተሟላ ማገገሚያ እቅድ ያዘጋጃል (እንጦጦ + ዮጋ + አማካሪ)።",
          om: "Tajaajila adda addaa guyyaa 7tti deebisa (fkn. deeminsa miilaa + yoogaa).",
          ti: "ብዙሓት ኣገልግሎት ብምውህሃድ ናይ 7 መዓልቲ ናይ ምሕዋይ መደብ የዳልው (እንጦጦ + ዮጋ + መማኸሪ)።"
        }
      },
      {
        name: { en: "Verified Trust Reviews", am: "የታመኑ ማህበረሰባዊ ምስክርነቶች", om: "Yaada Hawaasaa Amanamaa", ti: "እሙናት ናይ ማሕበረሰብ ምስክርነታት" },
        desc: {
          en: "Read honest feedback rated on stars, text comments, and the reviewer's anonymous life stage.",
          am: "በኮከብ ደረጃ፣ በአስተያየቶች እና በአባላቱ የህይወት ደረጃ ላይ የተመሰረቱ እውነተኛ ግምገማዎችን ያንብቡ።",
          om: "Madaallii fi yaada miseensota amanamaa ta'an dubbisi.",
          ti: "ብኮከብ፣ ብጽሑፍን ብዕድመን ዝተገመቱ እሙናት ርእይቶታት የንብቡ።"
        }
      },
      {
        name: { en: "Small Business Listing Portal", am: "የአነስተኛ ንግዶች መመዝገቢያ", om: "Galmee Daldala Xixxiqqaa", ti: "መመዝገቢ ንኣሽቱ ትካላት" },
        desc: {
          en: "Free submission form for neighborhood yoga teachers, massage therapists, and support circles.",
          am: "የሰፈር ዮጋ መምህራን፣ ማሳጆች እና የድጋፍ ሰጪዎች አገልግሎታቸውን በነጻ የሚያስተዋውቁበት መድረክ።",
          om: "Barsiisota yoogaa fi kkf bilisaan kan galmeessu.",
          ti: "ናይ ከባቢ ዮጋ መምህራን፣ ማሳጅን መማኸርትን ኣገልግሎቶም ብነጻ ዘላልይሉ መድረኽ።"
        }
      },
      {
        name: { en: "Counselor Direct Booking", am: "ቀጥታ የአማካሪዎች ቀጠሮ", om: "Qabachuu Gorsitootaa Saffisaa", ti: "ቀጥታ ምስ መማኸርቲ ቀጠሮ ምሓዝ" },
        desc: {
          en: "Schedule appointments with local therapists; shares stress logs with permission to skip onboarding.",
          am: "ከአገር ውስጥ ባለሙያዎች ጋር ቀጠሮ ይያዙ፤ በፈቃድዎ የጭንቀት ሁኔታዎን ያጋሩ።",
          om: "Ogeeyyii fayyaa sammuu wajjin beellama qabadhu.",
          ti: "ምስ ናይ ከባቢ መማኸርቲ ቀጠሮ ይሓዙ፤ ብፍቓድኩም ናይ ጭንቀት መዝገብኩም የካፍሉ።"
        }
      },
      {
        name: { en: "Nutritionist Direct Booking", am: "የአመጋገብ ባለሙያዎች ቀጠሮ", om: "Beellama Ogeeyyii Nyaataa", ti: "ምስ ሰብ ሞያ መግቢ ቀጠሮ ምሓዝ" },
        desc: {
          en: "Connect with certified dietitians specializing in local Ethiopian foods and fasting cycles.",
          am: "በሀገር በቀል ምግቦች እና በጾም ልምዶች ላይ ልዩ እውቀት ካላቸው ባለሙያዎች ጋር ይገናኙ።",
          om: "Ogeeyyii nyaataa aadaa beekan wajjin wal-qunnami.",
          ti: "ኣብ ባህላዊ መግብታትን ጾምን ፍሉይ ፍልጠት ምስ ዘለዎም ሰብ ሞያ መግቢ ይራኸቡ።"
        }
      }
    ],
    safety: [
      {
        name: { en: "952 Hotline Trigger", am: "የ952 የአደጋ ጊዜ መስመር", om: "Bilbila Tasaa 952", ti: "ናይ 952 ህጹጽ መስመር" },
        desc: {
          en: "Instant clinical counselor popup if check-in indicates acute self-harm or deep crisis (score under 20).",
          am: "የዋርካ ውጤትዎ ከ20 በታች ከሆነ የስነ-ልቦና ባለሙያዎችን ለማነጋገር የ952 መስመር በራስ-ሰር ይከከፈታል፤ ተጠቃሚዎች ፈጣን ድጋፍ ያገኛሉ።",
          om: "Qabxiin kee 20 gadi yoo ta'e bilbila 952 off-line siif fida.",
          ti: "ናይ ዋርካ ውጽኢትኩም ትሕቲ 20 እንተኾይኑ ንሓገዝ ዝኸውን ናይ 952 መስመር ብርእሱ ይርአ።"
        }
      },
      {
        name: { en: "Women SOS Emergency Button", am: "የሴቶች የደህንነት SOS ቁልፍ", om: "Furtuu SOS Dubartootaa", ti: "ናይ ደቂ ኣንስትዮ ናይ ድሕነት SOS መልእኽቲ" },
        desc: {
          en: "One-click trigger transmitting user coordinates to trusted contacts and police line.",
          am: "አንድ ጊዜ በመጫን ያሉበትን ቦታ ለታመኑ ሰዎች እና ለፖሊስ ወዲያውኑ የሚያስተላልፍ ቁልፍ።",
          om: "Furtuu takkaan location kee poolisii fi maatiif ergi.",
          ti: "ሓንሳብ ብምጥዋቕ ዘለኹምዎ ቦታ ንቤተሰብን ፖሊስን ቀጥታ ዝሰድድ ፍሉይ ቁልፍ።"
        }
      },
      {
        name: { en: "HIPAA-grade Local Privacy", am: "የመረጃ ምስጢራዊነት ጥበቃ", om: "Eegumsa Ibsa Dhuunfaa", ti: "ናይ ምስጢራውነት ጽኑዕ ሓለዋ" },
        desc: {
          en: "All check-ins and logs reside strictly in your device's localStorage, never sold.",
          am: "ሁሉም ቼክ-ኢን እና መዝገቦች በእርስዎ ስልክ/ኮምፒውተር (localStorage) ውስጥ ብቻ ይቀመጣሉ፤ ለሌላ አካል አይተላለፉም።",
          om: "Ibsi kee hundi bilbila kee keessatti qofa qabama (localStorage).",
          ti: "ኩሎም መዝገባት ኣብ ስልኪኹም (localStorage) ጥራይ ይዕቀቡ፤ ንኻልእ ኣካል ኣይመሓላለፉን።"
        }
      },
      {
        name: { en: "AI Content Moderation", am: "የ-AI ውይይት መቆጣጠሪያ", om: "AI Moderation Yaadaa", ti: "ናይ AI ናይ ዝርርብ መቆጻጸሪ" },
        desc: {
          en: "Scans community chatrooms to flag and restrict toxic, abusive, or self-harming comments.",
          am: "የማህበረሰብ መወያያ ክፍሎችን በመቃኘት አስነዋሪ ወይም ጎጂ መልዕክቶች እንዳይተላለፉ ይከላከላል።",
          om: "Yaada garee keessatti barreeffaman nagaa isaanii AI'n xiinxala.",
          ti: "ናይቲ ክቦ መወያያ ብምምርማር ዘይግቡእ ወይ ጎዳኢ መልእኽትታት ከይመሓላለፉ ይከላኸል።"
        }
      }
    ]
  };

  const languages = [
    {
      name: "Amharic - አማርኛ",
      script: "Ge'ez (Ethiopic)",
      speakers: currentLang === 'en' ? "30M+ Speakers" : (currentLang === 'am' ? "30M+ ተናጋሪዎች" : (currentLang === 'om' ? "Dubbattoota 30M+" : "30M+ ተዛረብቲ")),
      code: "አማ",
      desc: currentLang === 'en' ? "Primary national language. Full UI translation and direct Speech-to-Text translation support." : (currentLang === 'am' ? "ዋናው ብሔራዊ ቋንቋ። ሙሉ የትርጉም እና የድምፅ መለያ ድጋፍ አለው።" : (currentLang === 'om' ? "Afaan hojii federaalaa. Guutummaa tajaajilaa afaan kanaan argattu." : "ቀንዲ ብሄራዊ ቋንቋ። ምሉእ ናይ ትርጉምን ናይ ድምጺ መለላይን ደገፍ ኣለዎ።"))
    },
    {
      name: "Afaan Oromoo",
      script: "Latin (Qubee)",
      speakers: currentLang === 'en' ? "40M+ Speakers" : (currentLang === 'am' ? "40M+ ተናጋሪዎች" : (currentLang === 'om' ? "Dubbattoota 40M+" : "40M+ ተዛረብቲ")),
      code: "Oro",
      desc: currentLang === 'en' ? "Largest language group in Ethiopia. Full UI support and fallback English voice parsing." : (currentLang === 'am' ? "በኢትዮጵያ ውስጥ ትልቁ የቋንቋ ተናጋሪ። ሙሉ የትርጉም ድጋፍ አለው።" : (currentLang === 'om' ? "Afaan Itiyoophiyaa keessatti baay'ee dubbatamu. Guutummaatti deeggarama." : "ኣብ ኢትዮጵያ ዝበዝሐ ተዛራቢ ዘለዎ ቋንቋ። ምሉእ ደገፍ ኣለዎ።"))
    },
    {
      name: "Tigrinya - ትግርኛ",
      script: "Ge'ez (Ethiopic)",
      speakers: currentLang === 'en' ? "7M+ Speakers" : (currentLang === 'am' ? "7M+ ተናጋሪዎች" : (currentLang === 'om' ? "Dubbattoota 7M+" : "7M+ ተዛረብቲ")),
      code: "ትግ",
      desc: currentLang === 'en' ? "Northern language region. Full UI configuration and fallback English voice parsing." : (currentLang === 'am' ? "የሰሜኑ ክልል ቋንቋ። ሙሉ የትርጉም ድጋፍ አለው።" : (currentLang === 'om' ? "Afaan Kaaba Itiyoophiyaa. Qindaa'ina guutuu qaba." : "ቋንቋ ዞባ ሰሜን። ምሉእ ናይ ትርጉምን ቅርጽን ኣለዎ።"))
    },
    {
      name: "English",
      script: "Latin",
      speakers: currentLang === 'en' ? "Global Toggle" : (currentLang === 'am' ? "ዓለም አቀፍ ቋንቋ" : (currentLang === 'om' ? "Duniaa Waliigalaa" : "ዓለም ለኻዊ ቋንቋ")),
      code: "EN",
      desc: currentLang === 'en' ? "Global toggle available to support students, expats, diaspora, and judges." : (currentLang === 'am' ? "ተማሪዎችን፣ የውጭ አገር ዜጎችን እና ዳኞችን ለመደገፍ የቀረበ ቋንቋ።" : (currentLang === 'om' ? "Barattoota, alagaa fi abbootii seeraaf filannoo dhiyaate." : "ንተምሃሮ፣ ወጻእተኛታትን ዳኛታትን ንምድጋፍ ዝቐረበ ቋንቋ።"))
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-[#1D9E75] font-semibold text-label uppercase tracking-widest">
          {currentLang === 'en' ? "Platform Capabilities" : (currentLang === 'am' ? "የመድረኩ አገልግሎቶች" : (currentLang === 'om' ? "Dandeettii Appii" : "ናይቲ መድረኽ ኣገልግሎታት"))}
        </span>
        <h1 className="text-3xl font-light text-[#085041] m-0 flex items-center justify-center">
          <Sparkles className="mr-2 w-6 h-6 text-[#1D9E75]" />
          {currentLang === 'en' ? "Ecosystem Features" : (currentLang === 'am' ? "የዋርካ ሙሉ ባህሪያት" : (currentLang === 'om' ? "Amaloota Guutuu Warka" : "ምሉእ ባህርያት ዋርካ"))}
        </h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? "Warka integrates 36+ features across 5 pillars, localized and custom-designed for the Ethiopian cultural and economic context."
            : (currentLang === 'am'
              ? "ዋርካ ከ36 በላይ ዘመናዊ አገልግሎቶችን በ5 ምሰሶዎች አዋህዶ ለኢትዮጵያ ባህላዊና ኢኮኖሚያዊ ሁኔታ አመቻችቶ ያቀርባል።"
              : (currentLang === 'om'
                ? "Warkaan tajaajiloota 36+ utubbaalee 5 irratti aadaa fi dinagdee Itiyoophiyaan wal-simsiisee fida."
                : "ዋርካ ካብ 36 ንላዕሊ ኣገልግሎታት ኣብ 5 ዓምድታት ኣዋሂዱ ንባህላዊን ቁጠባዊን ኩነታት ኢትዮጵያ ኣማዓራርዩ የቕርብ።"))}
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap justify-center gap-2 border-b pb-4 border-gray-200">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`flex items-center px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === c.id
                  ? `${c.color} shadow-md`
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 mr-1.5" />
              {c.label[currentLang] || c.label.en}
            </button>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {featuresList[activeTab]?.map((f, i) => (
          <div key={i} className="bg-white border border-[#9FE1CB]/20 rounded-2xl p-5 shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform">
            <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
              <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full mr-2" />
              {f.name[currentLang] || f.name.en}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed m-0">
              {f.desc[currentLang] || f.desc.en}
            </p>
          </div>
        ))}
      </div>

      {/* Languages Section */}
      <div className="border-t pt-12 space-y-6">
        <div className="text-center space-y-2">
          <Languages className="w-8 h-8 text-[#085041] mx-auto" />
          <h2 className="text-xl font-semibold text-[#085041] m-0">
            {currentLang === 'en' ? "Inclusive Language Support" : (currentLang === 'am' ? "የቋንቋዎች ተደራሽነት" : (currentLang === 'om' ? "Deeggarsa Afaanii" : "ምዝርጋሕ ቋንቋታት"))}
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            {currentLang === 'en'
              ? "All features, meal plans, and AI responses switch instantly when toggling the buttons in the navbar."
              : (currentLang === 'am'
                ? "የናቭባር ቋንቋ ቁልፎችን ሲጫኑ አጠቃላይ የዌብሳይቱ ገጽታ፣ የምግብ እቅድ እና የ-AI መልሶች በቅጽበት ይቀየራሉ።"
                : (currentLang === 'om'
                  ? "Navbar irratti afaan jijjiiruun sagantaa nyaataa fi deebii AI hunda dafee jijjiira."
                  : "ኣብ ላዕሊ ዘሎ ቋንቋ ክትቀይሩ ከለኹም ኩሉ ትሕዝቶን መልሲ AIን ብኡ ንብኡ ይቕየር።"))}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {languages.map((l) => (
            <div key={l.code} className="bg-white border border-gray-200 p-5 rounded-2xl text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs bg-[#E1F5EE] text-[#085041] px-2 py-0.5 rounded border border-[#9FE1CB]/30">
                  {l.code}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">{l.speakers}</span>
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#085041] m-0">{l.name}</h4>
                <span className="text-[9px] text-gray-400 block mt-0.5">
                  {currentLang === 'en' ? "Script: " : (currentLang === 'am' ? "የፊደል መዋቅር: " : (currentLang === 'om' ? "Qubee: " : "ፊደል: "))} 
                  {l.script}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed m-0">{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
