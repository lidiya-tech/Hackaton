import React, { useState, useRef } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { LIFE_STAGES } from '../utils/constants';
import { ArrowLeft, ArrowRight, Sparkles, MessageCircle, Heart, Shield, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Home = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];
  const carouselRef = useRef(null);
  
  // Demo states
  const [demoActive, setDemoActive] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  // Scroll carousel helper
  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 280;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTestimonialClick = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  // Image arrays for rendering
  const stageImages = {
    children: '/images/child.jpg',
    teenagers: '/images/teenagers.jpg',
    young_adults: '/images/young-adult.jpg',
    women: '/images/women.jpg',
    mothers: '/images/mothers.jpg',
    fathers: '/images/fathers.jpg',
    men: '/images/men.jpg',
    elderly: '/images/elderly.jpg'
  };

  // Localized dictionary for Home page elements
  const HOME_T = {
    en: {
      statsCommunities: "Communities",
      statsLanguages: "Languages",
      statsLifeStages: "Life Stages",
      statsScore: "Warka Score",
      seeHowWorks: "See How Warka Works",
      tailoredLifeStages: "Tailored to 8 Life Stages",
      challengesLabel: "Challenges:",
      solutionsLabel: "AI Solutions:",
      everythingTitle: "Everything You Need to Thrive",
      cardCheckinTitle: "AI Check-in",
      cardCheckinDesc: "Talk to Warka AI in your language. Get a personalized wellness score and actionable recommendations every day.",
      cardNutritionTitle: "Nutrition",
      cardNutritionDesc: "Meal plans built around Ethiopian cuisine and your income level. Eat well without spending more.",
      cardNutritionBtn: "View Meal Plans",
      cardCommunityTitle: "Community",
      cardCommunityDesc: "Join circles of people who share your life stage and health journey. You are never alone.",
      cardCommunityBtn: "Join Community",
      cardDiscoverTitle: "Discover & Book",
      cardDiscoverDesc: "Find and book wellness experiences, therapists, yoga classes, and more – near you, at your budget.",
      cardDiscoverBtn: "Explore Now",
      journeyTitle: "Your Wellness Journey with Warka",
      journeySteps: [
        "Share how you feel",
        "Warka AI understands",
        "Get Warka Score",
        "Join community",
        "Book experiences",
        "Feel better daily"
      ],
      financialTiersTitle: "Built for Every Financial Reality",
      financialTiersSub: "Warka adapts to your income — everyone deserves wellness.",
      financialTiers: [
        { id: "struggling", name: "Struggling", range: "0–3,000 ETB / month", badge: "100% Free", badgeStyle: "bg-[#7EDC8B] text-[#022719]", image: "/images/struggling.jpg", bullets: ["Free AI Check-in", "Basic Warka Score", "Free Community Access", "Basic Nutrition Tips"] },
        { id: "low", name: "Low Income", range: "3,000–8,000 ETB / month", badge: "Mostly Free", badgeStyle: "bg-teal-700 text-white", image: "/images/low-income.jpg", bullets: ["Full AI Check-in", "Warka Score + History", "Community Circles", "Subsidized Nutrition Plans"] },
        { id: "middle", name: "Middle Income", range: "8,000–20,000 ETB / month", badge: "Discounted", badgeStyle: "bg-[#F3C06D] text-[#022719]", image: "/images/middle-income.jpg", bullets: ["AI Check-in + Insights", "Full Warka Score", "Guided Communities", "Discounted Bookings"] },
        { id: "comfortable", name: "Comfortable", range: "20,000–50,000 ETB / month", badge: "Premium Access", badgeStyle: "bg-[#F3C06D] text-[#022719]", image: "/images/comfortable.jpg", bullets: ["Priority AI Check-in", "Advanced Warka Score", "Expert-led Communities", "Booking Discounts"] },
        { id: "high", name: "High Income", range: "50,000+ ETB / month", badge: "Full Premium", badgeStyle: "bg-[#022719] text-white", image: "/images/high-income.jpg", bullets: ["Concierge AI Check-in", "Full Suite Warka Score", "VIP Communities", "Full Booking Access"] }
      ],
      lovedBy: "Loved by Ethiopians",
      testimonials: [
        { author: "Endale, 29, Mekelle", quote: "\"Warka helped me understand my blood pressure in Amharic. For the first time, I felt my health was truly in my hands.\"" },
        { author: "Aber, 34, Addis Ababa", quote: "\"The nutrition plans work with injera and shiro – real Ethiopian food, not Western salads. It changed everything for my family.\"" },
        { author: "Samuel, 41, Hawassa", quote: "\"I joined a father's community on Warka. The support I found there helped me through one of the hardest years of my life.\"" }
      ]
    },
    am: {
      statsCommunities: "ማህበረሰቦች",
      statsLanguages: "ቋንቋዎች",
      statsLifeStages: "የህይወት ደረጃዎች",
      statsScore: "የዋርካ ውጤት",
      seeHowWorks: "እንዴት እንደሚሰራ ይመልከቱ",
      tailoredLifeStages: "ለ8 የህይወት ደረጃዎች የተዘጋጀ",
      challengesLabel: "ተግዳሮቶች፦",
      solutionsLabel: "የ-AI መፍትሄዎች፦",
      everythingTitle: "የጤና ጉዞዎን በዋርካ ለማሳካት",
      cardCheckinTitle: "የ-AI ቼክ-ኢን",
      cardCheckinDesc: "በቋንቋዎ ከዋርካ AI ጋር ይወያዩ። በየቀኑ የተበጀ የጤና ውጤት እና ተግባራዊ ምክሮችን ያግኙ።",
      cardNutritionTitle: "ምግብና አመጋገብ",
      cardNutritionDesc: "በኢትዮጵያ ምግቦች እና በእርስዎ ገቢ ላይ የተመሰረቱ የምግብ እቅዶች። ተጨማሪ ወጪ ሳያወጡ በጥሩ ሁኔታ ይመገቡ።",
      cardNutritionBtn: "የምግብ እቅዶችን ይመልከቱ",
      cardCommunityTitle: "ማህበረሰብ",
      cardCommunityDesc: "የእርስዎን የህይወት ደረጃ እና የጤና ጉዞ ከሚጋሩ ሰዎች ጋር ይቀላቀሉ። መቼም ቢሆን ብቻዎን አይደሉም።",
      cardCommunityBtn: "ማህበረሰቡን ይቀላቀሉ",
      cardDiscoverTitle: "አገልግሎቶች ፍለጋና ቦታ ማስያዝ",
      cardDiscoverDesc: "የጤና አገልግሎቶችን፣ አማካሪዎችን፣ የዮጋ ክፍሎችን እና ሌሎችንም ያግኙ እና ያስይዙ - በአቅራቢያዎ እና በገንዘብ አቅምዎ።",
      cardDiscoverBtn: "አሁኑኑ ያስሱ",
      journeyTitle: "የጤና ጉዞዎ በዋርካ",
      journeySteps: [
        "ስሜትዎን ያጋሩ",
        "ዋርካ AI ይረዳል",
        "ውጤትዎን ያግኙ",
        "ማህበረሰብ ይቀላቀሉ",
        "አገልግሎቶችን ይያዙ",
        "የተሻለ ህይወት ይኑሩ"
      ],
      financialTiersTitle: "ለማንኛውም የገንዘብ አቅም የተዘጋጀ",
      financialTiersSub: "ዋርካ ለእርስዎ ገቢ ይመቻቻል - እያንዳንዱ ሰው ጤናማ መሆን ይገባዋል።",
      financialTiers: [
        { id: "struggling", name: "እየተቸገርኩ ነው", range: "በወር ከ0-3,000 ብር", badge: "100% ነፃ", badgeStyle: "bg-[#7EDC8B] text-[#022719]", image: "/images/struggling.jpg", bullets: ["ነጻ የ-AI ቼክ-ኢን", "መሰረታዊ የዋርካ ውጤት", "ነጻ የማህበረሰብ አባልነት", "መሰረታዊ የአመጋገብ ምክሮች"] },
        { id: "low", name: "ዝቅተኛ ገቢ", range: "በወር ከ3,000-8,000 ብር", badge: "በብዛት ነፃ", badgeStyle: "bg-teal-700 text-white", image: "/images/low-income.jpg", bullets: ["ሙሉ የ-AI ቼክ-ኢን", "የዋርካ ውጤት እና ታሪክ", "የማህበረሰብ ክበቦች", "ቅናሽ የተደረገበት የምግብ እቅድ"] },
        { id: "middle", name: "መካከለኛ ገቢ", range: "በወር ከ8,000-20,000 ብር", badge: "ቅናሽ የተደረገበት", badgeStyle: "bg-[#F3C06D] text-[#022719]", image: "/images/middle-income.jpg", bullets: ["የ-AI ቼክ-ኢን እና ትንታኔ", "ሙሉ የዋርካ ውጤት", "የሚመሩ ማህበረሰቦች", "ቅናሽ ያላቸው ቦታ ማስያዣዎች"] },
        { id: "comfortable", name: "ጥሩ ሁኔታ ላይ ያለ", range: "በወር ከ20,000-50,000 ብር", badge: "ፕሪሚየም አባልነት", badgeStyle: "bg-[#F3C06D] text-[#022719]", image: "/images/comfortable.jpg", bullets: ["ቅድሚያ የሚሰጠው የ-AI ቼክ-ኢን", "ከፍተኛ የዋርካ ውጤት", "በባለሙያ የሚመሩ ማህበረሰቦች", "የቦታ ማስያዣ ቅናሾች"] },
        { id: "high", name: "ከፍተኛ ገቢ", range: "በወር 50,000+ ብር", badge: "ሙሉ ፕሪሚየም", badgeStyle: "bg-[#022719] text-white", image: "/images/high-income.jpg", bullets: ["ልዩ የ-AI ቼክ-ኢን", "ሙሉ የዋርካ አገልግሎት", "ልዩ የቪአይፒ ማህበረሰቦች", "ሙሉ የቦታ ማስያዝ መብት"] }
      ],
      lovedBy: "በኢትዮጵያውያን ዘንድ ተወዳጅ",
      testimonials: [
        { author: "እንዳለ፣ 29፣ መቐለ", quote: "\"ዋርካ የደም ግፊቴን በአማርኛ ለመረዳት ረድቶኛል። ለመጀመሪያ ጊዜ የጤናዬ ባለቤት መሆን እንደምችል ተሰማኝ።\"" },
        { author: "አበራሽ፣ 34፣ አዲስ አበባ", quote: "\"የምግብ አመጋገብ እቅዱ ከእንጀራና ከሽሮ ጋር ይሰራል - እውነተኛ የኢትዮጵያ ምግብ እንጂ የውጭ ሰላጣ አይደለም። ለአባወራዬ ትልቅ ለውጥ አመጣ።\"" },
        { author: "ሳሙኤል፣ 41፣ ሐዋሳ", quote: "\"በዋርካ ላይ የአባቶች ማህበረሰብን ተቀላቀልኩ። እዛ ያገኘሁት ድጋፍ በህይወቴ ከባድ የነበረውን አመት እንዳሸንፍ ረድቶኛል።\"" }
      ]
    },
    om: {
      statsCommunities: "Hawaasa",
      statsLanguages: "Afaanota",
      statsLifeStages: "Sadarkaalee Jireenyaa",
      statsScore: "Qabxii Warka",
      seeHowWorks: "Akkaataa Hojii Warka",
      tailoredLifeStages: "Sadarkaa Jireenyaa 8f Kan Qophaa'e",
      challengesLabel: "Rakkinaalee:",
      solutionsLabel: "Furmaata AI:",
      everythingTitle: "Waan Milkaa'uuf Si Barbaachisu Hundumaa",
      cardCheckinTitle: "Cheek-in AI",
      cardCheckinDesc: "Afaan keetiin Warka AI wajjin dubbadhu. Guyyaa guyyaan qabxii fayyaa dhuunfaa fi gorsa argadhu.",
      cardNutritionTitle: "Nyaataa fi Sirna Nyaataa",
      cardNutritionDesc: "Sagantaalee nyaataa nyaata Itiyoophiyaa fi kaffaltii keerratti hundaa'an. Qarshii dabalataa malee sirritti nyaadhu.",
      cardNutritionBtn: "Sagantaa Nyaataa Ilaali",
      cardCommunityTitle: "Hawaasummaa",
      cardCommunityDesc: "Garee namoota sadarkaa jireenyaa fi deemsa fayyaa kee qooddatan makami. Gonkumaa kophaa hin taatu.",
      cardCommunityBtn: "Hawaasa Makami",
      cardDiscoverTitle: "Argachuu & Qabachuu",
      cardDiscoverDesc: "Tajaajiloota fayyaa, ogeeyyii, daree yoogaa fi kkf naannoo keetitti argadhuu fi qabadhu - bajata keetiin.",
      cardDiscoverBtn: "Kallattii Daawwadhu",
      journeyTitle: "Deemsa Fayyaa kee Warka wajjin",
      journeySteps: [
        "Miira kee qoodi",
        "Warkaan AI ni hubata",
        "Qabxii Warka argadhu",
        "Hawaasummaa makami",
        "Bakka qabadhu",
        "Guyyaa guyyaan fooyya'i"
      ],
      financialTiersTitle: "Haala Diinagdee Hundumaaf Ijaarame",
      financialTiersSub: "Warkaan galii keetiin wal-sima - namni hunduu fayyummaa qabaachuu qaba.",
      financialTiers: [
        { id: "struggling", name: "Rakkataa", range: "Ji'atti 0–3,000 ETB", badge: "100% Bilisa", badgeStyle: "bg-[#7EDC8B] text-[#022719]", image: "/images/struggling.jpg", bullets: ["Cheek-in AI Bilisa", "Qabxii Warka Bu'uuraa", "Seensa Hawaasaa Bilisa", "Gorsa Nyaata Bu'uuraa"] },
        { id: "low", name: "Galii Gadi-bu'aa", range: "Ji'atti 3,000–8,000 ETB", badge: "Irra caala Bilisa", badgeStyle: "bg-teal-700 text-white", image: "/images/low-income.jpg", bullets: ["Cheek-in AI Guutuu", "Qabxii + Seenaa Warka", "Koreewwan Hawaasaa", "Sagantaa Nyaata Hirdhifame"] },
        { id: "middle", name: "Galii Giddu-galeessaa", range: "Ji'atti 8,000–20,000 ETB", badge: "Kaffaltii Hirdhifame", badgeStyle: "bg-[#F3C06D] text-[#022719]", image: "/images/middle-income.jpg", bullets: ["Cheek-in AI + Xiinxala", "Qabxii Warka Guutuu", "Hawaasummaa Qajeelfamaa", "Kaffaltii Qabachuu Gadi-bu'aa"] },
        { id: "comfortable", name: "Tasgabbaa'eera", range: "Ji'atti 20,000–50,000 ETB", badge: "Seensa Premium", badgeStyle: "bg-[#F3C06D] text-[#022719]", image: "/images/comfortable.jpg", bullets: ["Dursi Cheek-in AI", "Qabxii Warka Ol'aanaa", "Hawaasa Ogeessaan ogonnamu", "Hirdhisa Qabachuu"] },
        { id: "high", name: "Galii Ol-aanaa", range: "Ji'atti 50,000+ ETB", badge: "Premium Guutuu", badgeStyle: "bg-[#022719] text-white", image: "/images/high-income.jpg", bullets: ["Seensa Addaa Cheek-in AI", "Hoolaa Qabxii Warka", "Hawaasa VIP", "Seensa Guutuu Qabachuu"] }
      ],
      lovedBy: "Jaallatamaa Hawaasa Itiyoophiyaa",
      testimonials: [
        { author: "Endale, 29, Mekelle", quote: "\"Warkaan dhiibbaa dhiigaa koo afaan kootiin akka hubadhu na gargaare. Yeroo jalqabaaf, fayyaan koo harka koo keessa akka jiru natti dhaga'ame.\"" },
        { author: "Aber, 34, Addis Ababa", quote: "\"Sifni nyaataa injeraa fi shiroo wajjin hojjeta – nyaata dhugaa Itiyoophiyaa, salaxaa faranji miti. Kun maatii kootiif waan hundumaa jijjiire.\"" },
        { author: "Samuel, 41, Hawassa", quote: "\"Garee abbootii Warka irratti makame. Deeggarsi ani achitti argadhe waggaa jireenya koo isa rakkisaa keessaa akka darbu na gargaare.\"" }
      ]
    },
    ti: {
      statsCommunities: "ማሕበረሰባት",
      statsLanguages: "ቋንቋታት",
      statsLifeStages: "ናይ ህይወት ደረጃታት",
      statsScore: "ናይ ዋርካ ውጽኢት",
      seeHowWorks: "ከመይ ከምዝሰርሕ ርአ",
      tailoredLifeStages: "ን8 የህይወት ደረጃታት ዝተዳለወ",
      challengesLabel: "ብድሆታት፦",
      solutionsLabel: "ናይ AI መፍትሒታት፦",
      everythingTitle: "ዕላማ ጥዕናኹም ንምውቃዕ",
      cardCheckinTitle: "ናይ AI ቼክ-ኢን",
      cardCheckinDesc: "ብቋንቋኹም ምስ ዋርካ AI ተዘራረቡ። መዓልታዊ ዝተመጣጠነ ናይ ጥዕና ውጽኢትን ተግባራዊ ምኽሪታትን ይረኽቡ።",
      cardNutritionTitle: "መግብን ስነ-መግቢን",
      cardNutritionDesc: "ኣብ ናይ ኢትዮጵያ መግብታትን ኣብ እቶትኩምን ዝተመስረቱ ናይ መግቢ መደባት። ተወሳኺ ወጻኢ ከየውጻእኩም ጽቡቕ ተመገቡ።",
      cardNutritionBtn: "መደብ መግቢ ርአ",
      cardCommunityTitle: "ማሕበረሰብ",
      cardCommunityDesc: "ምስቶም ናይ ህይወት ደረጃኹምን ናይ ጥዕና ጉዕዞኹምን ዝካፈሉ ሰባት ተጸንበሩ። መዓስ እውን በይንኹም ኣይኮንኩምን።",
      cardCommunityBtn: "ማሕበረሰብ ተጸንበሩ",
      cardDiscoverTitle: "ምድላይን ምዝጋብን",
      cardDiscoverDesc: "ናይ ጥዕና ኣገልግሎት፣ መማኸርቲ፣ ናይ ዮጋ ክላሳት ወዘተ ኣብ ከባቢኹምን ብዓቕምኹምን ዳልዩን መዝግቡን።",
      cardDiscoverBtn: "ዳህስሱ",
      journeyTitle: "ናይ ጥዕና ጉዕዞኹም ምስ ዋርካ",
      journeySteps: [
        "ስሜትኩም ኣካፍሉ",
        "ዋርካ AI ይርዳእ",
        "ውጽኢትኩም ርኣዩ",
        "ማሕበረሰብ ተጸንበሩ",
        "ቦታ ምሓዝ",
        "መዓልታዊ ጽቡቕ ይስማዕኩም"
      ],
      financialTiersTitle: "ንኹሉ ናይ ቁጠባ ዓቕሚ ዝተዳለወ",
      financialTiersSub: "ዋርካ ምስ እቶትኩም ይሰማማዕ እዩ - ኩሉ ሰብ ጥዕና ክረክብ ይግባእ።",
      financialTiers: [
        { id: "struggling", name: "ጸገም ዘለዎ", range: "ኣብ ወርሒ 0–3,000 ብር", badge: "100% ነጻ", badgeStyle: "bg-[#7EDC8B] text-[#022719]", image: "/images/struggling.jpg", bullets: ["ነጻ ናይ AI ቼክ-ኢን", "መሰረታዊ ናይ ዋርካ ውጽኢት", "ነጻ ናይ ማሕበረሰብ እታው", "መሰረታዊ ናይ መግቢ ምኽርታት"] },
        { id: "low", name: "ትሑት እቶት", range: "ኣብ ወርሒ 3,000–8,000 ብር", badge: "ብብዝሒ ነጻ", badgeStyle: "bg-teal-700 text-white", image: "/images/low-income.jpg", bullets: ["ምሉእ ናይ AI ቼክ-ኢን", "ናይ ዋርካ ውጽኢትን ታሪኽን", "ናይ ማሕበረሰብ ክቦታት", "ቅናሽ ዝተገብረሉ ናይ መግቢ ፕላን"] },
        { id: "middle", name: "ማእኸላይ እቶት", range: "ኣብ ወርሒ 8,000–20,000 ብር", badge: "ቅናሽ ዝተገብረሉ", badgeStyle: "bg-[#F3C06D] text-[#022719]", image: "/images/middle-income.jpg", bullets: ["ናይ AI ቼክ-ኢን + ሓበሬታ", "ምሉእ ናይ ዋርካ ውጽኢት", "ዝምርሑ ማሕበረሰባት", "ቅናሽ ዘለዎም ምዝገባታት"] },
        { id: "comfortable", name: "ጽቡቕ ኩነታት", range: "ኣብ ወርሒ 20,000–50,000 ብር", badge: "ፕሪሚየም ምእታው", badgeStyle: "bg-[#F3C06D] text-[#022719]", image: "/images/comfortable.jpg", bullets: ["ቅድሚት ዝወሃቦ AI ቼክ-ኢን", "ዝለዓለ ናይ ዋርካ ውጽኢት", "ብክኢላታት ዝምርሑ ማሕበረሰባት", "ናይ ምዝገባታት ቅናሽ"] },
        { id: "high", name: "ልዑል እቶት", range: "ኣብ ወርሒ 50,000+ ብር", badge: "ምሉእ ፕሪሚየም", badgeStyle: "bg-[#022719] text-white", image: "/images/high-income.jpg", bullets: ["ፍሉይ ናይ AI ቼክ-ኢን", "ምሉእ ናይ ዋርካ ኣገልግሎት", "ናይ VIP ማሕበረሰባት", "ምሉእ ናይ ምዝገባታት መሰል"] }
      ],
      lovedBy: "ብኢትዮጵያውያን ዝተፈተወ",
      testimonials: [
        { author: "እንዳለ፣ 29፣ መቐለ", quote: "\"ዋርካ ናይ ጸቕጢ ደመይ ብትግርኛ ክርዳእ ሓጊዙኒ። ንፈለማ እዋን ጥዕናይ ኣብ ኢደይ ከምዘሎ ተሰሚዑኒ።\"" },
        { author: "አበራሽ፣ 34፣ አዲስ አበባ", quote: "\"ናይ መግቢ መደባት ምስ እንጀራን ሽሮን እዩ ዝሰርሕ - ናይ ሓቂ ናይ ዓዲ መግቢ እምበር ናይ ወጻኢ ሰላጣ ኣይኮነን። ንስድራቤተይ ዓብዪ ለውጢ ኣምጺኡ።\"" },
        { author: "ሳሙኤል፣ 41፣ ሓዋሳ", quote: "\"ኣብ ዋርካ ናይ ኣቦታት ማሕበር ተጸንቢረ። ኣብኡ ዝረኸብክዎ ደገፍ ሓደ ካብቶም ኣብ ህይወተይ ዘጋጠሙኒ ከበድቲ ዓመታት ክሓልፎ ሓጊዙኒ።\"" }
      ]
    }
  };

  const ht = HOME_T[currentLang] || HOME_T.en;

  return (
    <div className="space-y-0">
      
      {/* ===== HERO SECTION ===== */}
      <section 
        className="hero-custom py-16 text-left relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/35 z-0" />
        
        <div className="container-custom w-full relative z-10 py-12">
          
          {/* Left-aligned minimized Hero Text & Badges */}
          <div className="max-w-xs sm:max-w-sm text-left space-y-3.5">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold bg-white/10 border border-[#7EDC8B]/30 uppercase tracking-widest text-[#7EDC8B]">
              🌳 {t.brand} — {currentLang === 'en' ? "AI Wellness Ecosystem" : (currentLang === 'am' ? "የ-AI ጤና ሥነ-ምህዳር" : (currentLang === 'om' ? "Ecosystem Fayyaa AI" : "ናይ AI ጥዕና ስነ-ምህዳር"))}
            </span>
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight m-0">
              {currentLang === 'en' && <>Your mind.<br/>Your body.<br/>Your community.</>}
              {currentLang === 'am' && <>አእምሮዎ።<br/>ሰውነትዎ።<br/>ማህበረሰብዎ።</>}
              {currentLang === 'om' && <>Sammuu kee.<br/>Qaama kee.<br/>Hawaasa kee.</>}
              {currentLang === 'ti' && <>ኣእምሮኹም።<br/>ሰብነትኩም።<br/>ማሕበረሰብኩም።</>}
            </h1>
            <p className="text-xs sm:text-sm text-[#C1C3AC] italic font-light m-0 leading-normal">
              {t.heroTagline || (currentLang === 'en' ? "In your language. For your reality." : (currentLang === 'am' ? "በቋንቋዎ። ለእርስዎ እውነታ።" : (currentLang === 'om' ? "Afaan keetiin. Dhugaa keetiif." : "ብቋንቋኹም፡ ንህይወትኩም፡")))}
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1.5">
              <button
                onClick={() => onNavigate('#check-in')}
                className="btn-custom btn-custom--green py-2.5 px-5 text-xs font-semibold rounded-full hover:scale-[1.02] active:scale-95 transition-all"
              >
                {t.startCheckin}
              </button>
              <button
                onClick={() => onNavigate('#how-it-works')}
                className="btn-custom btn-custom--outline-gold py-2.5 px-5 text-xs font-semibold rounded-full hover:scale-[1.02] active:scale-95 transition-all"
              >
                {ht.seeHowWorks}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-[#022719] border-y border-white/8 py-8 text-center">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">🏘️</span>
            <span className="font-heading text-3xl font-bold text-white">68</span>
            <span className="text-xs text-[#A8B5A0] uppercase tracking-wider">{ht.statsCommunities}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">🗣️</span>
            <span className="font-heading text-3xl font-bold text-white">4</span>
            <span className="text-xs text-[#A8B5A0] uppercase tracking-wider">{ht.statsLanguages}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">🧬</span>
            <span className="font-heading text-3xl font-bold text-white">8</span>
            <span className="text-xs text-[#A8B5A0] uppercase tracking-wider">{ht.statsLifeStages}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">📊</span>
            <span className="font-heading text-3xl font-bold text-white">0–100</span>
            <span className="text-xs text-[#A8B5A0] uppercase tracking-wider">{ht.statsScore}</span>
          </div>
        </div>
      </section>

      {/* ===== LIFE STAGES CAROUSEL ===== */}
      <section className="bg-[#C1C3AC] py-16 text-center text-[#022719]">
        <div className="container-custom space-y-8">
          <h2 className="font-heading text-3xl font-bold m-0">
            {ht.tailoredLifeStages}
          </h2>
          
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-full bg-[#022719] text-white hover:bg-[#7EDC8B] hover:text-[#022719] flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
            >
              ←
            </button>
            
            <div
              ref={carouselRef}
              className="flex-1 flex gap-6 overflow-x-auto py-4 scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {LIFE_STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center gap-3 flex-shrink-0 snap-start cursor-pointer w-[130px] group"
                >
                  <div
                    className={`w-24 h-24 rounded-full border-4 border-white shadow-md bg-cover bg-center transition-transform group-hover:scale-105 ${
                      activeStage === idx ? 'ring-4 ring-[#085041]' : ''
                    }`}
                    style={{
                      backgroundImage: `url('${stageImages[stage.id] || '/images/child.jpg'}')`
                    }}
                  />
                  <span className="text-xs font-bold tracking-tight text-center leading-tight">
                    {currentLang === 'am' ? stage.nameAm : (currentLang === 'om' ? stage.nameOm : (currentLang === 'ti' ? stage.nameTi : stage.nameEn))}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-full bg-[#022719] text-white hover:bg-[#7EDC8B] hover:text-[#022719] flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURE CARDS ===== */}
      <section className="bg-[#033520] py-16 text-center">
        <div className="container-custom space-y-12">
          <h2 className="font-heading text-3xl font-bold text-white m-0">
            {ht.everythingTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Card 1: Check-in */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all hover:shadow-lg space-y-4">
              <div className="space-y-3">
                <div className="h-14 flex items-center">
                  <img src="/images/icon-checkin.png" alt="AI Check-in icon" className="h-12 object-contain" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#7EDC8B] m-0">{ht.cardCheckinTitle}</h3>
                <p className="text-xs text-[#A8B5A0] leading-relaxed m-0">
                  {ht.cardCheckinDesc}
                </p>
              </div>
              <button
                onClick={() => onNavigate('#check-in')}
                className="btn-custom btn-custom--green w-full mt-4"
              >
                {t.startCheckin}
              </button>
            </div>

            {/* Card 2: Nutrition */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all hover:shadow-lg space-y-4">
              <div className="space-y-3">
                <div className="h-14 flex items-center">
                  <img src="/images/icon-nutrition.png" alt="Nutrition icon" className="h-12 object-contain" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#F3C06D] m-0">{ht.cardNutritionTitle}</h3>
                <p className="text-xs text-[#A8B5A0] leading-relaxed m-0">
                  {ht.cardNutritionDesc}
                </p>
              </div>
              <button
                onClick={() => onNavigate('#mindfuel')}
                className="btn-custom btn-custom--gold w-full mt-4"
              >
                {ht.cardNutritionBtn}
              </button>
            </div>

            {/* Card 3: Community */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all hover:shadow-lg space-y-4">
              <div className="space-y-3">
                <div className="h-14 flex items-center">
                  <img src="/images/icon-community.png" alt="Community icon" className="h-12 object-contain" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#7EDC8B] m-0">{ht.cardCommunityTitle}</h3>
                <p className="text-xs text-[#A8B5A0] leading-relaxed m-0">
                  {ht.cardCommunityDesc}
                </p>
              </div>
              <button
                onClick={() => onNavigate('#community')}
                className="btn-custom btn-custom--outline-green w-full mt-4"
              >
                {ht.cardCommunityBtn}
              </button>
            </div>

            {/* Card 4: Discover */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all hover:shadow-lg space-y-4">
              <div className="space-y-3">
                <div className="h-14 flex items-center">
                  <img src="/images/icon-discover.png" alt="Discover icon" className="h-12 object-contain" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#F3C06D] m-0">{ht.cardDiscoverTitle}</h3>
                <p className="text-xs text-[#A8B5A0] leading-relaxed m-0">
                  {ht.cardDiscoverDesc}
                </p>
              </div>
              <button
                onClick={() => onNavigate('#discover')}
                className="btn-custom btn-custom--outline-gold w-full mt-4"
              >
                {ht.cardDiscoverBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY TIMELINE ===== */}
      <section className="bg-[#022719] py-16 text-center">
        <div className="container-custom space-y-12">
          <h2 className="font-heading text-3xl font-bold text-white m-0">
            {ht.journeyTitle}
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4">
            {[
              { icon: "💬" },
              { icon: "🧠" },
              { icon: "📊" },
              { icon: "🤝" },
              { icon: "🗺️" },
              { icon: "🌟" }
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center bg-[#033520] border border-[#7EDC8B]/30 p-4 rounded-2xl w-28 text-center hover:bg-[#7EDC8B]/10 transition-colors duration-150">
                  <div className="w-12 h-12 rounded-full bg-[#022719] border border-[#7EDC8B] flex items-center justify-center text-xl mb-2">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-white/90 leading-tight">
                    {ht.journeySteps[idx]}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <span className="hidden md:block text-[#F3C06D] text-lg font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINANCIAL TIERS ===== */}
      <section className="bg-[#C1C3AC] py-16 text-center text-[#022719]">
        <div className="container-custom space-y-4">
          <h2 className="font-heading text-3xl font-bold m-0">
            {ht.financialTiersTitle}
          </h2>
          <p className="text-sm opacity-85 max-w-md mx-auto m-0 leading-normal">
            {ht.financialTiersSub}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-8 text-left">
            {ht.financialTiers.map((tier, idx) => (
              <div key={idx} className="bg-[#C1C3AC] border-2 border-[#022719]/12 rounded-xl overflow-hidden flex flex-col justify-between shadow-xs hover:-translate-y-1 transition-transform duration-150">
                <div>
                  <div 
                    className="h-28 bg-[#a8aa93] bg-cover bg-center"
                    style={{ backgroundImage: `url('${tier.image}')` }}
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="font-heading text-sm text-[#022719] m-0">{tier.name}</h3>
                    <span className="text-[10px] text-gray-600 block m-0">{tier.range}</span>
                    <ul className="space-y-1 text-[11px] text-[#022719] pt-2">
                      {tier.bullets.map((b, i) => (
                        <li key={i} className="flex items-center">
                           <span className="mr-1 font-bold text-[#022719]">✓</span>
                           <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`text-center font-bold text-[10px] py-2 uppercase tracking-wide ${tier.badgeStyle}`}>
                  {tier.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-[#033520] py-16 text-center">
        <div className="container-custom space-y-12">
          <h2 className="font-heading text-3xl font-bold text-white m-0">
            {ht.lovedBy}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {ht.testimonials.map((test, idx) => (
              <div
                key={idx}
                onClick={handleTestimonialClick}
                className="bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all cursor-pointer space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full border-2 border-[#7EDC8B] bg-[#4a6350] bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/user-${idx === 0 ? "endale" : (idx === 1 ? "aber" : "samuel")}.jpg')` }}
                  />
                  <cite className="text-xs text-[#F3C06D] font-semibold not-italic block">
                    {test.author}
                  </cite>
                </div>
                <blockquote className="text-xs text-[#C1C3AC] italic leading-relaxed m-0">
                  {test.quote}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

