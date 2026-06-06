import React, { useState } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { EXTRA_TRANSLATIONS } from '../utils/extraTranslations';
import { TrendingUp, ShieldAlert, Users, Award, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export const BusinessModel = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const ext = EXTRA_TRANSLATIONS[currentLang] || EXTRA_TRANSLATIONS.en;
  const [activeFlywheelNode, setActiveFlywheelNode] = useState(0);

  const localizedData = {
    en: {
      sub: "Pitch Deck & Financials",
      title: "Warka Business Model",
      desc: "Warka is a dual-impact business showing that community wellness and sustainable financial returns can grow in parallel.",
      quote: "\"Warka is a business that proves wellness and social impact are not opposites.\"",
      revTitle: "Four Core Revenue Streams",
      flywheelSub: "Click nodes to see how Warka loops revenue to fund free tiers",
      detailLabel: "Detail Step",
      marketTitle: "Market Size & Addressable Market",
      partnershipsTitle: "Hackathon Partnerships",
      marketItems: [
        { label: "120 Million+ Population", text: "Ethiopia represents East Africa's largest market with rapid smartphone adoption and high cellular growth." },
        { label: "Post-COVID Mental Health Stigma shift", text: "Mental health awareness is surging among young adults and corporate sectors." },
        { label: "First-Mover Advantage", text: "No current localized competitors serving direct native text/voice emotional support in Amharic, Oromoo, and Tigrinya." }
      ],
      partnerItems: [
        { label: "ALX Ethiopia", text: "Community reach and developer platform backing." },
        { label: "Kuriftu Resorts", text: "The premier resort retreat partner, backing mineral spa vouchers and corporate packages." },
        { label: "WeVaSphere", text: "Co-organizer supporting the physical implementation of wellness technology circles." }
      ],
      revenueStreams: [
        {
          title: "1. Premium Subscriptions",
          desc: "Freemium consumer tier with standard access. Premium tier at 199 ETB/month unlocks voice tone analysis, full 7-day nutritional plans, custom daily routines, family dashboards (349 ETB/month for 5 members), and priority offline logs sync.",
          icon: "💳",
          stats: "Projections: 2.5% Premium conversion rate over 1M target users."
        },
        {
          title: "2. B2B Corporate Contracts",
          desc: "Employee wellness dashboards sold to major institutions (banks, software firms, schools, NGOs). HR dashboards view anonymized burnout scoring comparison by department to structure rest policies. Ministry of Health (MOH) dashboards track clinical trends.",
          icon: "🏢",
          stats: "Model: Annual recurring subscription per seat."
        },
        {
          title: "3. Marketplace Commissions",
          desc: "Take 10-15% commission fees on bookings processed through Warka Discover portal (Kuriftu spa retreats, Tulsi yoga sessions, certified private counselors, and nutritionists). Local small businesses pay premium listing fees (500 ETB/mo) for featured AI recommendations.",
          icon: "🛍️",
          stats: "Anchors: Kuriftu African Village, Tulsi Yoga partnerships."
        },
        {
          title: "4. Anonymized Data Insights",
          desc: "Aggregated, fully anonymized population wellness and local food-health correlation reports sold to public health agencies (UNICEF, WHO, MOH Ethiopia), insurance companies (to price risk models), and university research departments.",
          icon: "📊",
          stats: "Privacy: 100% compliant with HIPAA & local privacy regulations."
        }
      ],
      flywheelNodes: [
        { title: "Free Users Fill Circles", desc: "Massive user acquisition through free Amharic/Oromoo/Tigrinya voice mental health check-ins." },
        { title: "Premium Upgrades", desc: "Users pay 199 ETB/mo to unlock full nutrition meal plans, private messages, and voice tone audits." },
        { title: "Discover Bookings", desc: "Premium users book local spa (Kuriftu) and yoga (Tulsi) retreats directly, generating commissions." },
        { title: "B2B Data Monetization", desc: "Anonymized logs sold to corporations and MOH to fund free tiers for struggling populations." },
        { title: "Social Impact Growth", desc: "Funding free tiers recruits vulnerable communities, scaling the network and repeating the loop." }
      ]
    },
    am: {
      sub: "የቢዝነስ መዋቅርና ስትራቴጂ",
      title: "የዋርካ የቢዝነስ ሞዴል",
      desc: "ዋርካ ህብረተሰብን መደገፍና ትርፋማ የንግድ ስራን በጋራ ማሳደግ እንደሚቻል የሚያሳይ ዘመናዊ ስራ ፈጠራ ነው።",
      quote: "\"ዋርካ - ጤናና ማህበራዊ ተፅእኖ ተቃራኒ እንዳልሆኑ የሚያረጋግጥ ድርጅት ነው።\"",
      revTitle: "አራቱ ዋና ዋና የገቢ መንጮች",
      flywheelSub: "ዋርካ ገቢውን እንዴት መልሶ ነጻ አገልግሎቶችን ለመደገፍ እንደሚያውለው ለመመልከት ይጫኑ",
      detailLabel: "ዝርዝር ደረጃ",
      marketTitle: "የገበያ ስፋትና ተደራሽነት",
      partnershipsTitle: "የትብብር አጋሮች",
      marketItems: [
        { label: "120 ሚሊዮን+ የህዝብ ብዛት", text: "ኢትዮጵያ በምስራቅ አፍሪካ ፈጣን የስማርትፎን ስርጭት እና የቴሌኮም እድገት ያለው ትልቁ ገበያ ናት።" },
        { label: "ከኮቪድ በኋላ የአእምሮ ጤና ግንዛቤ መጨመር", text: "በወጣቶች እና በድርጅቶች ዘንድ ስለ አእምሮ ጤና ያለው ግንዛቤ እጅግ እየጨመረ ነው።" },
        { label: "ቀዳሚ ጠቀሜታ (First-Mover)", text: "በአማርኛ፣ በኦሮምኛ እና በትግርኛ በቀጥታ የድምፅ እና የጽሑፍ ስሜታዊ ድጋፍ የሚሰጥ ተወዳዳሪ የለም።" }
      ],
      partnerItems: [
        { label: "አሊኤክስ ኢትዮጵያ (ALX)", text: "ለማህበረሰቡ ተደራሽ መሆን እና የሶፍትዌር ገንቢዎች መድረክ ድጋፍ።" },
        { label: "ኩሪፍቱ ሪዞርቶች", text: "የማዕድን ስፓ ኩፖኖችን እና የድርጅት ፓኬጆችን በመደገፍ ዋናው የሪዞርት አጋር።" },
        { label: "ዌቫስፊር (WeVaSphere)", text: "የጤና ቴክኖሎጂ ክበቦችን በተግባር ለማዋል ድጋፍ የሚሰጥ ተባባሪ አዘጋጅ።" }
      ],
      revenueStreams: [
        {
          title: "1. ፕሪሚየም የደንበኝነት ምዝገባ",
          desc: "ነጻ የፍሪሚየም ደረጃ ከመደበኛ አጠቃቀም ጋር። በወር 199 ብር የሚከፈለው ፕሪሚየም ደረጃ የድምፅ ቃና ትንታኔን፣ የተሟላ የ7-ቀን የምግብ እቅዶችን፣ ለግል የተበጁ ዕለታዊ ልምምዶችን፣ የቤተሰብ መቆጣጠሪያ ሰሌዳዎችን (ለ5 አባላት በወር 349 ብር) እና የቅድሚያ ከመስመር ውጭ ምዝግብ ማመሳሰልን ይከፍታል።",
          icon: "💳",
          stats: "ግምቶች፡ ከ1 ሚሊዮን በላይ ተጠቃሚዎች መካከል 2.5% የፕሪሚየም ግዢ መቀየር።"
        },
        {
          title: "2. የB2B የድርጅት ውሎች",
          desc: "ለትላልቅ ተቋማት (ባንኮች፣ የሶፍትዌር ኩባንያዎች፣ ትምህርት ቤቶች፣ መንግስታዊ ያልሆኑ ድርጅቶች) ሰራተኞች የሚሸጡ የደህንነት ሰሌዳዎች። የሰው ኃይል (HR) አስተዳዳሪዎች የእረፍት ፖሊሲዎችን ለመቅረጽ በተለያዩ ክፍሎች ያሉ የመቃጠል ሁኔታዎችን ስም ሳይገልጹ ማነጻጸር ይችላሉ። የጤና ጥበቃ ሚኒስቴር (MOH) ክሊኒካዊ አዝማሚያዎችን ይከታተላል።",
          icon: "🏢",
          stats: "ሞዴል: ለእያንዳንዱ መቀመጫ ዓመታዊ ተደጋጋሚ የደንበኝነት ምዝገባ።"
        },
        {
          title: "3. የገበያ ቦታ ኮሚሽኖች",
          desc: "በዋርካ ዲስከቨር ፖርታል በኩል ለሚደረጉ ቦታ ማስያዣዎች (የኩሪፍቱ ስፓዎች፣ የቱልሲ ዮጋ ክፍለ-ጊዜዎች፣ የምስክር ወረቀት ያላቸው የግል አማካሪዎች እና የአመጋገብ ባለሙያዎች) ከ10-15% የኮሚሽን ክፍያ መውሰድ። የአካባቢው አነስተኛ ንግዶች ለAI ምክሮች ታዋቂ ዝርዝር ክፍያዎችን (በወር 500 ብር) ይከፍላሉ።",
          icon: "🛍️",
          stats: "አጋሮች: የኩሪፍቱ አፍሪካ ቪሌጅ፣ የቱልሲ ዮጋ አጋርነቶች።"
        },
        {
          title: "4. ማንነታቸው ያልታወቁ የመረጃ ግንዛቤዎች",
          desc: "ለሕዝብ ጤና ኤጀንሲዎች (ዩኒሴፍ፣ የዓለም ጤና ድርጅት፣ የኢትዮጵያ ጤና ጥበቃ ሚኒስቴር)፣ ለኢንሹራንስ ኩባንያዎች (የአደጋ ሞዴሎችን ዋጋ ለመወሰን) እና ለዩኒቨርሲቲ ምርምር ክፍሎች የሚሸጡ ማንነታቸው ያልታወቁ የህዝብ ጤና ሪፖርቶች።",
          icon: "📊",
          stats: "ግላዊነት: 100% ከHIPAA እና ከአካባቢያዊ የግላዊነት ደንቦች ጋር የተጣጣመ።"
        }
      ],
      flywheelNodes: [
        { title: "ነፃ ተጠቃሚዎች ክበቦችን ይሞላሉ", desc: "በአማርኛ፣ በኦሮምኛና በትግርኛ የድምፅ አእምሯዊ ቼክ-ኢን አማካኝነት ከፍተኛ ተጠቃሚዎችን ማግኘት።" },
        { title: "የፕሪሚየም አሻሽል", desc: "ተጠቃሚዎች የተሟላ የአመጋገብ ዕቅድ፣ የግል መልዕክቶችና የድምፅ ቃና ኦዲት ለማግኘት በወር 199 ብር ይከፍላሉ።" },
        { title: "የዲስከቨር ቦታ ማስያዣዎች", desc: "የፕሪሚየም ተጠቃሚዎች የኮሚሽን ገቢዎችን በመፍጠር የኩሪፍቱ ስፓ እና የቱልሲ ዮጋ አገልግሎቶችን በቀጥታ ይይዛሉ።" },
        { title: "የB2B መረጃ ሽያጭ", desc: "ማንነታቸው ያልታወቁ መረጃዎች ለድርጅቶችና ለጤና ጥበቃ ሚኒስቴር በመሸጥ ለተቸገሩ ነፃ ደረጃዎችን መደገፍ።" },
        { title: "የማህበራዊ ተፅእኖ እድገት", desc: "ነፃ ደረጃዎችን መደገፍ ተጋላጭ የሆኑ ማህበረሰቦችን ይስባል፣ መረቡን ያስፋፋል እና ሂደቱን ይደግማል።" }
      ]
    },
    om: {
      sub: "Daldala fi Qarshii",
      title: "Moodeela Daldalaa Warka",
      desc: "Warkaan hojii daldalaa lamaan fayyadamummaa qabudha, kunis fayyummaa hawaasaa fi bu'aa dinagdee itti fufiinsa qabu wal bira qabee kan guddisudha.",
      quote: "\"Warkaan daldala fayyummaa fi dhiibbaa hawaasummaa wal faana deemsisuu danda'udha.\"",
      revTitle: "Mallaqa Galii Afur",
      flywheelSub: "Akkaataa Warkaan tajaajila bilisaa deggeru daawwachuuf cuqaasi",
      detailLabel: "Tarkaanfii",
      marketTitle: "Bal'ina Gabaa & Addressable Market",
      partnershipsTitle: "Michoota Hackathon",
      marketItems: [
        { label: "Hawaasa Miiliyoona 120+", text: "Itiyoophiyaan gabaa baha Afrikaa isa guddaa babal'ina smartphoonii fi qunnamtii saffisaa qabudha." },
        { label: "Qooda Fayyaa Sammuu Post-COVID", text: "Hubannoon fayyaa sammuu dargaggoota fi dhaabbata corporate keessatti garmalee dabalaa jira." },
        { label: "Faayidaa Jalqaba Argamuu", text: "Kompititariin afaan Oromoo, Amhariffa fi Tigriffaan gorsa fayyaa sammuu bilisaan kennu hin jiru." }
      ],
      partnerItems: [
        { label: "ALX Itiyoophiyaa", text: "Daqqabummaa hawaasaa fi deeggarsa developer platform." },
        { label: "Kuriftu Resorts", text: "Hordoffii resortii guddaa, mineral spa fi koopponoota kaffaltii corporate deggeru." },
        { label: "WeVaSphere", text: "Kellaa fayyaa bilisaa hojii irra oolchuuf gargaarsa taasisu." }
      ],
      revenueStreams: [
        {
          title: "1. Abbummaa Premium",
          desc: "Tajaajila idilee bilisaan argachuu. Sadarkaan Premium ji'atti ETB 199 sagalee qaaccessuu, sagantaa nyaata guutuu guyyaa 7, shaakallii guyyaa dhuunfaa fi dashboard maatii (ji'atti ETB 349 miseensota 5f) bana.",
          icon: "💳",
          stats: "Tilmaama: Karoora 2.5% Premium gara gurgurataatti jijjiiruu."
        },
        {
          title: "2. Kontraata Korporeetii B2B",
          desc: "Tajaajila fayyummaa hojjettootaa dhaabbata gurguddaaf (baankii, software, manneen barnootaa, NGO) gurguramu. HR'n dhiphina hojjettootaa wal bira qabee ilaaluun boqonnaa qopheessa. Ministeerri Fayyaa hordoffii tajaajilaa taasisa.",
          icon: "🏢",
          stats: "Moodeela: Ji'aan kaffaltii dhaabbataa ta'e seat per seat."
        },
        {
          title: "3. Komishinii Gabaa",
          desc: "Gabaa Warka Discover kessatti kaffaltii 10-15% fudhachuu (Kuriftu spa, Tulsi yoga, gorsitoota fi dietitians). Daldaltoonni xixiqqoon beeksisa AI'f ji'atti ETB 500 kaffalu.",
          icon: "🛍️",
          stats: "Anchors: Kuriftu African Village, Tulsi Yoga."
        },
        {
          title: "4. Daataa Ibsa Iccitii",
          desc: "Ibsa fayyaa hawaasaa iccitii eeggate dhaabbata fayyaa addunyaa (UNICEF, WHO, Ministeera Fayyaa) fi kaampanii inshuraansiif gurguruu.",
          icon: "📊",
          stats: "Iccitii: 100% eegumsa HIPAA fi seera biyya keessaa wajjin wal simu."
        }
      ],
      flywheelNodes: [
        { title: "Miseensonni Bilisaa Kellaa Guutu", desc: "Check-in sagalee afaan sadiin taasifamuun fayyadamtoota baay'ee argachuu." },
        { title: "Gara Premium Ol-guddisuu", desc: "Fayyadamtoonni sagantaa nyaata guutuu fi ergaa dhuunfaaf ji'atti ETB 199 kaffalu." },
        { title: "Bookiingii Discover", desc: "Miseensonni Premium tajaajila spa (Kuriftu) fi yoogaa (Tulsi) book godhu, kunis komishinii uuma." },
        { title: "B2B Ibsa Daataa", desc: "Daataa iccitii dhaabbatataaf gurguruun tajaajila bilisaa qarshii argamsiisuu." },
        { title: "Guddisa Hawaasummaa", desc: "Kaffaltii tajaajila bilisaa hawaasa rakkateef oolchuun networkii guddisa." }
      ]
    },
    ti: {
      sub: "ናይ ቢዝነስ ስትራቴጂ",
      title: "ናይ ዋርካ ቢዝነስ ሞዴል",
      desc: "ዋርካ ማሕበረሰብ ጥዕናን ዝላተሓለወ ቁጠባዊ እቶትን ጎኒ ንጎኒ ከም ዝዓብዩ ዘረጋግጽ ድርጅት እዩ።",
      quote: "\"ዋርካ - ጥዕናን ማሕበራዊ ጽልዋን ተጻረርቲ ከም ዘይኮኑ ዘረጋግጽ ትካል እዩ።\"",
      revTitle: "አርባዕተ ምንጪ እቶት",
      flywheelSub: "ዋርካ ነጻ አገልግሎት ንምድጋፍ እቶት ከመይ ከም ዝጥቀም ንምርኣይ ጠውቑ",
      detailLabel: "ደረጃ",
      marketTitle: "ናይ ዕዳጋ ስፍሓትን ዓቕምን",
      partnershipsTitle: "ናይ ሃካቶን መሻርኽቲ",
      marketItems: [
        { label: "120 ሚሊዮን+ ህዝቢ", text: "ኢትዮጵያ ኣብ ምብራቕ ኣፍሪቃ ዝለዓለ ስሉጥ ምስፍሕፋሕ ስማርትፎንን ተለኮምን ዘለዋ ዕዳጋ እያ።" },
        { label: "ድሕሪ ኮቪድ ናይ ኣእምሮ ጥዕና ግንዛበ ምውሳኽ", text: "ኣብ መንእሰያትን ኣብ ትካላትን ናይ ኣእምሮ ጥዕና ግንዛበ ኣዝዩ ይዓቢ ኣሎ።" },
        { label: "ቀዳማይ ጠቀሜታ (First-Mover)", text: "ብትግርኛ፣ ኦሮምኛን ኣማርኛን ብቀጥታ ናይ ድምጽን ጽሑፍን ሓገዝ ዝህብ ተወዳዳሪ የለን።" }
      ],
      partnerItems: [
        { label: "ALX ኢትዮጵያ", text: "ናይ ማሕበረሰብ ተበጻሕነትን ደገፍ መድረኽ ሶፍትዌርን።" },
        { label: "ኩሪፍቱ ሪዞርት", text: "ናይ ስፓ ቫውቸራትን ናይ ትካላት ፓኬጃትን ብምድጋፍ ዝለዓለ ናይ ሪዞርት መሻርኽቲ።" },
        { label: "ዌቫስፊር (WeVaSphere)", text: "ናይ ጥዕና ቴክኖሎጂ ክበባት ኣብ ባይታ ንምትግባር ዝድግፍ መዳለዊ።" }
      ],
      revenueStreams: [
        {
          title: "1. ፕሪሚየም ምዝገባ",
          desc: "ነጻ ፍሪሚየም ደረጃ ምስ መደበኛ ኣጠቓቕማ። ፕሪሚየም ደረጃ ብወርሒ 199 ብር ናይ ድምጺ ቃና ትንተና፣ ናይ 7 መዓልቲ መግቢ መደብ፣ ናይ ውልቀ ንጥፈታት፣ ናይ ስድራቤት ዳሽቦርድ (ን5 ኣባላት ብወርሒ 349 ብር) ይኸፍት።",
          icon: "💳",
          stats: "ግምታት፡ ካብ 1 ሚሊዮን ተጠቃሚታት 2.5% ናብ ፕሪሚየም ይቕየሩ።"
        },
        {
          title: "2. ናይ B2B ውዕላት",
          desc: "ናይ ሰራሕተኛታት ጥዕና ዳሽቦርድ ንትካላት (ባንክታት፣ ናይ ሶፍትዌር ኩባንያታት፣ ኣብያተ ትምህርቲ፣ NGOs) ዝሽየጥ። HR ናይ ሰራሕተኛታት ጸገም ኣወዳዲሩ ናይ ዕረፍቲ ፖሊሲ ይነድፍ። ሚኒስቴር ጥዕና ሓበሬታታት ይከታል።",
          icon: "🏢",
          stats: "ሞዴል: ዓመታዊ ናይ ምዝገባ ክፍሊት seat per seat።"
        },
        {
          title: "3. ናይ ዕዳጋ ኮሚሽናት",
          desc: "ብዋርካ ዲስከቨር ዝግበሩ ቦታታት (ኩሪፍቱ፣ ቱልሲ ዮጋ፣ ናይ ጥዕና መማኸርቲ) 10-15% ኮሚሽን ምውሳድ። ናይ ከባቢ ትካላት ንምልላዩ ብወርሒ 500 ብር ይኸፍሉ።",
          icon: "🛍️",
          stats: "መሻርኽቲ: ኩሪፍቱ ኣፍሪካ ቪሌጅ፣ ቱልሲ ዮጋ።"
        },
        {
          title: "4. ምስጢራዊ ሓበሬታታት",
          desc: "ምስጢራዊነቱ ዝሓለወ ናይ ህዝቢ ጥዕና ጸብጻብ ንውድብ ሕቡራት ሃገራት (UNICEF, WHO, ሚኒስቴር ጥዕና)፣ ኢንሹራንስን ምርምርን ትካላት ምሻጥ።",
          icon: "📊",
          stats: "ምስጢራዊነት: 100% ምስ HIPAAን ናይ ዓዲ ሕግታትን ዝሰማማዕ።"
        }
      ],
      flywheelNodes: [
        { title: "ነጻ ተጠቃሚታት ማሕበራት ይመልኡ", desc: "ብትግርኛ፣ ኣማርኛን ኦሮምኛን ብድምጺ ዝግበር ቼክ-ኢን ብዙሓት ተጠቃሚታት ይስሕብ።" },
        { title: "ፕሪሚየም ምውሳኽ", desc: "ተጠቃሚታት መግቢ መደብን ናይ ውልቀ መልእኽትታትን ንምርካብ ብወርሒ 199 ብር ይከፍሉ።" },
        { title: "ናይ ዲስከቨር ምዝገባታት", desc: "ፕሪሚየም ተጠቃሚታት ናይ ስፓ (ኩሪፍቱ) ዮጋ (ቱልሲ) ብቀጥታ ብምዝጋብ ኮሚሽን የርክቡ።" },
        { title: "B2B ሓበሬታታት ምሻጥ", desc: "ምስጢራዊነቱ ዝሓለወ ዳታ ንትካላትን ሚኒስቴር ጥዕናን ብምሻጥ ነቲ ነጻ ኣገልግሎት ምድጋፍ።" },
        { title: "ማሕበራዊ ጽልዋ ምዕባይ", desc: "ነጻ ኣገልግሎታት ተጠቃሚነት ተቓላዕቲ ማሕበረሰባት የዕቢ፣ ዓቕሚ እቲ መርበብ የዕብዮ።" }
      ]
    }
  };

  const currentData = localizedData[currentLang] || localizedData.en;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left animate-fadeIn">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-[#1D9E75] font-semibold text-label uppercase tracking-widest">
          {currentData.sub}
        </span>
        <h1 className="text-2xl sm:text-3xl font-light text-[#085041] m-0 flex items-center justify-center">
          <TrendingUp className="mr-2 w-6 h-6 text-[#1D9E75]" />
          {currentData.title}
        </h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
          {currentData.desc}
        </p>
      </div>

      {/* Hero Quote */}
      <div className="bg-[#E1F5EE] border border-[#9FE1CB] p-6 rounded-2xl text-center">
        <blockquote className="italic text-base font-semibold text-[#085041] m-0">
          {currentData.quote}
        </blockquote>
      </div>

      {/* 4 Revenue Streams Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#085041] border-b pb-2">
          {currentData.revTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentData.revenueStreams.map((rev, idx) => (
            <div key={idx} className="bg-white border border-[#9FE1CB]/20 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-2xl">{rev.icon}</span>
                <h3 className="font-semibold text-sm text-[#085041] m-0">{rev.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed m-0">{rev.desc}</p>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border text-[11px] font-bold text-[#BA7517] mt-3">
                {rev.stats}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flywheel Visualization */}
      <div className="bg-[#FAEEDA] border border-amber-200 p-6 rounded-2xl space-y-6 text-center">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-amber-800 m-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-1 text-[#BA7517] animate-spin" />
            {t.flywheelTitle}
          </h3>
          <p className="text-[11px] text-amber-700">
            {currentData.flywheelSub}
          </p>
        </div>

        {/* Flywheel Diagram Nodes */}
        <div className="flex flex-wrap justify-center gap-2">
          {currentData.flywheelNodes.map((node, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFlywheelNode(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeFlywheelNode === idx
                  ? 'bg-[#BA7517] text-white border-transparent shadow-sm'
                  : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
              }`}
            >
              {node.title}
            </button>
          ))}
        </div>

        {/* Selected Flywheel Info */}
        <div className="bg-white border rounded-xl p-4 max-w-lg mx-auto text-xs text-gray-600 leading-relaxed text-left space-y-1">
          <span className="font-bold text-[#085041] block">{currentData.detailLabel} {activeFlywheelNode + 1}:</span>
          <p className="m-0">{currentData.flywheelNodes[activeFlywheelNode].desc}</p>
        </div>
      </div>

      {/* Market size & Partnerships */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Size */}
        <div className="bg-white border border-[#9FE1CB]/20 p-5 rounded-2xl shadow-xs space-y-4">
          <h3 className="font-semibold text-sm text-[#085041] m-0 border-b pb-2 flex items-center">
            📈 {currentData.marketTitle}
          </h3>
          <div className="space-y-3 text-xs text-gray-500 leading-relaxed">
            {currentData.marketItems.map((item, idx) => (
              <p key={idx} className="m-0">
                <strong>{item.label}:</strong> {item.text}
              </p>
            ))}
          </div>
        </div>

        {/* Social Impact / Partnerships */}
        <div className="bg-white border border-[#9FE1CB]/20 p-5 rounded-2xl shadow-xs space-y-4">
          <h3 className="font-semibold text-sm text-[#1D9E75] m-0 border-b pb-2 flex items-center">
            🤝 {currentData.partnershipsTitle}
          </h3>
          <div className="space-y-3 text-xs text-gray-500 leading-relaxed">
            {currentData.partnerItems.map((item, idx) => (
              <p key={idx} className="m-0">
                <strong>{item.label}:</strong> {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
