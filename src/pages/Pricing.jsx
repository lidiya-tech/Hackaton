import React, { useState } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { EXTRA_TRANSLATIONS } from '../utils/extraTranslations';
import { HelpCircle, ChevronDown, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Pricing = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const ext = EXTRA_TRANSLATIONS[currentLang] || EXTRA_TRANSLATIONS.en;
  const [activeFaq, setActiveFaq] = useState(null);

  const plans = [
    {
      name: { en: "Warka Basic", am: "ነፃ ዕቅድ", om: "Karoora Bilisaa", ti: "ነጻ መደብ" },
      price: "0 ETB",
      desc: { 
        en: "Essential wellness for every Ethiopian.", 
        am: "ለእያንዳንዱ ኢትዮጵያዊ መሰረታዊ የጤና ድጋፍ።",
        om: "Deeggarsa fayyaa bu'uuraa Itiyoophiyaa hundumaaf.",
        ti: "ንኹሉ ኢትዮጵያዊ መሰረታዊ ናይ ጥዕና ሓገዝ።"
      },
      features: {
        en: ["Full access to Entertainment & Music", "All 68 community group chats", "Basic AI text check-in", "Standard discover directories"],
        am: ["የመዝናኛ እና የሙዚቃ ሙሉ መዳረሻ", "68ቱንም የማህበረሰብ የጋራ ቻቶች መድረስ", "የዕለት ተዕለት የጽሁፍ AI ቼክ-ኢን", "መሰረታዊ የአገልግሎቶች ፍለጋ ማውጫ"],
        om: ["Bashannana fi Muziqaa guutuu argachuu", "Hawaasa kellaa 68 gabaa dhuunfaa makamuu", "Cheek-in barreeffama guyyaa guyyaa AI", "Tajaajila argachuu idilee"],
        ti: ["ናይ መዘናግዒን ሙዚቃን ምሉእ መእተዊ", "68 ማሕበረሰብ ቻት ግሩፕ ምእታው", "ናይ ጽሑፍ ቼክ-ኢን መዓልታዊ AI", "መሰረታዊ ናይ ኣገልግሎት ማውጫ"]
      },
      cta: { en: "Get Started", am: "ጀምር", om: "Jalqabi", ti: "ጀምር" },
      color: "border-gray-200"
    },
    {
      name: { en: "Warka Pro", am: "ዋርካ ፕሪሚየም", om: "Warka Premium", ti: "ዋርካ ፕሪሚየም" },
      price: "199 ETB/mo",
      desc: { 
        en: "Advanced AI tools for health enthusiasts.", 
        am: "የተሻሻሉ የ-AI መሳሪያዎች ለጤና አፍቃሪዎች።",
        om: "Tajaajila sagalee fi nyaataa guutuu AI.",
        ti: "ምሉእ ናይ AI ሓገዝ ንጥዕና።"
      },
      features: {
        en: ["Vision plate camera scanner", "Full voice check-in (tone analyzer)", "Weekly AI fasting & meal plans", "Private 1-on-1 peer DMs"],
        am: ["የምግብ ፎቶ ካሜራ ስካነር", "የድምፅ ቼክ-ኢን (የድምፅ ቅላጼ መተንተኛ)", "ሳምንታዊ የጾምና የምግብ እቅድ", "ምስጢራዊ የ1-ለ-1 የውስጥ መልእክት"],
        om: ["Scanner kaameraa suuraa nyaataa", "Cheek-in sagalee (qaaccessituu sagalee)", "Torbanitti sagantaa nyaataa fi sooma AI", "Ergaa dhuunfaa iccitii 1-on-1"],
        ti: ["ናይ መግቢ ፎቶ ካሜራ ስካነር", "ናይ ድምጺ ቼክ-ኢን (መተንተኒ ቃና ድምጺ)", "ሳምንታዊ ናይ ጾምን መግቢ መደብ AI", "ምስጢራዊ ናይ 1-ለ-1 መልእክቲ"]
      },
      cta: { en: "Subscribe Pro", am: "ፕሪሚየም ሁን", om: "Premium Kaffali", ti: "ፕሪሚየም ክፈል" },
      color: "border-[#1D9E75] ring-2 ring-[#1D9E75]/30",
      featured: true
    },
    {
      name: { en: "Warka Business", am: "ዋርካ ቢዝነስ (B2B)", om: "Warka Daldala", ti: "ዋርካ ቢዝነስ" },
      price: "500 ETB/mo",
      extraPrice: { en: "+ 10% Booking Commission", am: "+ 10% የኮሚሽን ክፍያ", om: "+ 10% Komishinii", ti: "+ 10% ክፍሊት ኮሚሽን" },
      desc: { 
        en: "For Gyms, Spas, Therapists & Nutritionists.", 
        am: "ለጂም፣ ስፓ፣ እና ስነ-ልቦና ባለሙያዎች።",
        om: "Dhaabbilee fayyaa fi daldala xixxiqqaaf.",
        ti: "ንጂም፣ ስፓን ናይ ስነ-ልቦና ሞያውያንን።"
      },
      features: {
        en: ["List your business in Discover Marketplace", "Upload Video & Image Portfolios", "'Verified' Green Checkmark Badge", "Priority ranking in user searches"],
        am: ["ድርጅትዎን በማውጫው ላይ ያስመዝግቡ", "የቪዲዮ እና የፎቶ ማህደሮችን ይጫኑ", "የተረጋገጠ አረንጓዴ ባጅ", "በፍለጋ ወቅት ቅድሚያ ማግኘት"],
        om: ["Daldala kee Gabaa Discover irratti galmeessi", "Viidiyoo fi Suuraa fe'i", "Mallattoo Mirkanaa'aa Magariisa", "Barbaacha keessatti dursa argachuu"],
        ti: ["ትካልኩም ኣብ ማውጫ መዝግቡ", "ቪድዮን ፎቶን ጽዓኑ", "ዝተረጋገጸ ሓምለዋይ ባጅ", "ኣብ ምድላይ ቅድሚት ምርካብ"]
      },
      cta: { en: "List Business", am: "ድርጅትን አስመዝግብ", om: "Daldala Galmeessi", ti: "ትካል መዝግብ" },
      color: "border-[#BA7517] bg-[#FFFBF0] ring-2 ring-[#BA7517]/30",
      isB2B: true
    }
  ];

  const handleSubscribe = (planName) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 }
    });
    const subscribeAlerts = {
      en: `🎉 Congratulations! You have successfully subscribed to ${planName}. Welcome to Warka Premium!`,
      am: `🎉 እንኳን ደስ አለዎት! በስኬት ለ${planName} ተመዝግበዋል። ወደ ዋርካ ፕሪሚየም እንኳን ደህና መጡ!`,
      om: `🎉 Baga gammaddan! Karoora ${planName} milkaa'inaan galmooftaniittu. Gara Warka Premium baga dhuftan!`,
      ti: `🎉 ዮሃና! ን${planName} ብዓወት ተመዝጊብኩም ኣለኹም። ናብ ዋርካ ፕሪሚየም እንኳዕ ብደሓር መጻእኩም!`
    };
    alert(subscribeAlerts[currentLang] || subscribeAlerts.en);
  };

  const faqs = [
    {
      q: {
        en: "Is my personal check-in data secure?",
        am: "የእኔ የግል ቼክ-ኢን መረጃ ምን ያህል አስተማማኝ ነው?",
        om: "Daataan cheek-in dhuunfaa koo amanamaadha?",
        ti: "ናይ ውልቀይ ቼክ-ኢን ሓበሬታ ውሑስ ድዩ?"
      },
      a: {
        en: "Warka prioritizes your privacy. All your check-in history, profiles, and score trends reside strictly inside your local device storage (localStorage). No identification info is sold to third parties.",
        am: "ዋርካ ለምስጢራዊነትዎ ቅድሚያ ይሰጣል። ሁሉም የእርስዎ ቼክ-ኢን፣ መገለጫዎች እና የውጤት ታሪክ በእርስዎ ስልክ/ኮምፒውተር (localStorage) ውስጥ ብቻ ይቀመጣሉ።",
        om: "Warkaan iccitii keetiif dursa kenna. Seenaan cheek-in keetii hundinuu bilbila kee (localStorage) keessa qofa tiifsama. Dhaabbata biraatiif hin gurguramu.",
        ti: "ዋርካ ንምስጢራዊነትኩም ቀዳምነት ይህብ። ኩሉ ናይ ቼክ-ኢን ታሪኽኩም፣ መገለጺታትን ውጽኢትን ኣብ ስልኪ/ኮምፒተርኩም (localStorage) ጥራይ ይዕቀብ።"
      }
    },
    {
      q: {
        en: "How does the voice tone analysis work?",
        am: "የድምፅ ቅላጼ መተንተኛው እንዴት ነው የሚሰራው?",
        om: "Qaaccessituun sagalee akkamitti hojjeta?",
        ti: "ናይ ድምጺ ቃና መተንተኒ ከመይ ይሰርሕ?"
      },
      a: {
        en: "Using the browser speech recognition interface, Warka records your dialect (Amharic, Oromoo, Tigrinya, or English). The AI evaluates tone speed, pauses, and pitch variations to gauge fatigue, anxiety, or calm.",
        am: "የዌብ ድምፅ መለያን በመጠቀም ዋርካ ድምፅዎን ይመዘግባል። AIው የድምፅዎን ፍጥነት፣ እረፍቶች፣ እና ድምፅ መለዋወጥን በማየት ድካምን ወይም ጭንቀትን ያጠናል።",
        om: "Masaalota bilbilaa fayyadamuun, Warkaan sagalee kee waraaba. AI'n saffisa dubbii, boqonnaa fi jijjiirama sagalee keetii qaaccessuun dhiphina ykn nagaa kee madaala.",
        ti: "ናይ ዌብ ድምጺ መለለዪ ብምጥቃም ዋርካ ድምጽኹም ይመዝግብ። AI ፍጥነት ድምጽኹም፣ ዕረፍትን ናይ ድምጺ መለዋወጥን ብምርኣይ ድካም ወይ ጭንቀት ይትንትን።"
      }
    },
    {
      q: {
        en: "What if I cannot afford paid plans?",
        am: "የሚከፈለውን ፕላን መግዛት ባልችልስ?",
        om: "Kaffaltii karoora kafalamee yoo hin dandeenye maaltu ta'a?",
        ti: "ነቲ ዝኽፈል መደብ ክኸፍል እንተዘይክኢለኸ?"
      },
      a: {
        en: "Warka was built for economic inclusion. If you select 'Struggling' on your profile, Warka filters out all paid options from the Discover page and shows free natural sites (like Entoto forests) and free community edir support systems.",
        am: "ዋርካ የተዘጋጀው ለሁሉም ኢትዮጵያዊ ተደራሽ በሆነ መንገድ ነው። በምዝገባ ወቅት 'እየተቸገርኩ ነው' ካሉ ዋርካ ከክፍያ ነጻ የሆኑ የተፈጥሮ ቦታዎችንና የነጻ ማህበረሰብ ድጋፎችን መጀመሪያ ያሳየዎታል።",
        om: "Warkaan hirmaachisummaa dinagdeetiif ijaarame. Profile keerratti 'Rakkataa' yoo filatte, tajaajiloota kaffaltii qaban hunda calalee si duraa bilesa godha. Kellaa bilisaa fi iddirii qofa argisiisa.",
        ti: "ዋርካ ንኹሉ ክበጽሕ ብዝኽእል መገዲ እዩ ተዳልዩ። ኣብ ምዝገባ 'ጸገም ዘለዎ' እንተኢልኩም ዋርካ ነጻ ዝኾኑ ተፈጥሮኣዊ ቦታታትን ናይ ማሕበረሰብ ደገፋትን ቀዲሙ የርእየኩም።"
      }
    },
    {
      q: {
        en: "Does Warka replace clinical therapy?",
        am: "ዋርካ የሀኪም የስነ-ልቦና ምክርን ይተካል?",
        om: "Warkaan gorsa ogeessa yaalaa ni bakka bu'aa?",
        ti: "ዋርካ ናይ ሓኪም ምኽሪ ይትክእ ድዩ?"
      },
      a: {
        en: "No. Warka is a self-care wellness assistant. If your score falls into crisis (below 20), we automatically direct you to dial the local clinical helpline (952) to consult a certified clinical professional.",
        am: "አይተካም። ዋርካ ራስን መቆጣጠሪያና መርጃ ረዳት ነው። ውጤትዎ በጣም ዝቅተኛ ከሆነ (ከ20 በታች) በቀጥታ ወደ 952 ነጻ የስልክ መስመር ደውለው አማካሪ እንዲያገኙ ይጠቁማል።",
        om: "Lakki. Warkaan gargaaraa fayyaa dhuunfaati. Qabxiin kee gadi bu'aa yoo ta'e (20 gadi), kellaa bilbila bilisaa 952 bilbiltee ogeessa akka haasofsiistu si gorsa.",
        ti: "ኣይትክእን እዩ። ዋርካ ናይ ውልቀ ምክትታል ረዳት እዩ። ውጽኢትኩም ትሑት እንተኾይኑ (ካብ 20 ንታሕቲ) ብቀጥታ ናይ 952 ቴሌፎን ደዊልኩም ምስ ክኢላ ክትማከሩ የዘኻኽረኩም።"
      }
    }
  ];

  const headerTexts = {
    en: {
      sub: "Subscriptions",
      title: "Simple, Fair Pricing",
      desc: "Free wellness tools for every Ethiopian. Support Warka and unlock voice tone filters, vision plate scanners, and weekly meal plan refreshes."
    },
    am: {
      sub: "አባልነቶችና ክፍያዎች",
      title: "ተመጣጣኝ ዋጋዎች",
      desc: "ለሁሉም ኢትዮጵያውያን ነጻ የጤና አገልግሎቶች። ድምፅ መተንተኛና የምግብ ፎቶ ስካነር ለማግኘት ፕሪሚየምን ይመዝገቡ።"
    },
    om: {
      sub: "Kafaltiiwwan",
      title: "Gatiiwwan Madaalawaa",
      desc: "Meesshaa fayyaa bilisaa Itiyoophiyaa hundumaaf. Warkaan beeksisi, qaaccessituu sagalee fi nyaataa banadhu."
    },
    ti: {
      sub: "ክፍሊታትን አባልነትን",
      title: "ተመጣጣኝ ዋጋታት",
      desc: "ንኹሉ ኢትዮጵያዊ ነጻ ናይ ጥዕና ኣገልግሎት። መተንተኒ ቃና ድምጽን ናይ መግቢ ስካነርን ንምርካብ ፕሪሚየም ይመዝገቡ።"
    }
  };
  const ht = headerTexts[currentLang] || headerTexts.en;

  const tableHeaders = {
    feature: { en: "Feature Name", am: "አገልግሎት", om: "Tajaajila", ti: "ኣገልግሎት" },
    free: { en: "Free (0 ETB)", am: "ነጻ (0 ብር)", om: "Bilisa (0 ETB)", ti: "ነጻ (0 ብር)" },
    premium: { en: "Premium (199 ETB)", am: "ፕሪሚየም (199 ብር)", om: "Premium (199 ETB)", ti: "ፕሪሚየም (199 ብር)" },
    family: { en: "Family (349 ETB)", am: "የቤተሰብ (349 ብር)", om: "Maatii (349 ETB)", ti: "ስድራቤት (349 ብር)" }
  };

  const tableRows = [
    {
      name: {
        en: "Daily text AI check-in",
        am: "የዕለት ተዕለት የጽሁፍ AI ቼክ-ኢን",
        om: "Cheek-in barreeffama guyyaa guyyaa AI",
        ti: "መዓልታዊ ናይ ጽሑፍ ቼክ-ኢን AI"
      },
      free: "✓", premium: "✓", family: "✓"
    },
    {
      name: {
        en: "Voice tone emotion analyser",
        am: "የድምፅ ቅላጼ መተንተኛ",
        om: "Qaaccessituu miira sagalee",
        ti: "መተንተኒ ቃና ስምዒት ድምጺ"
      },
      free: "✕", premium: "✓", family: "✓"
    },
    {
      name: {
        en: "7-Day Ethiopian Meal Plan",
        am: "የ7-ቀን የኢትዮጵያ ምግብ እቅድ",
        om: "Sagantaa Nyaata Guyyaa 7",
        ti: "ናይ 7 መዓልቲ መግቢ መደብ"
      },
      free: "✕", premium: "✓", family: "✓"
    },
    {
      name: {
        en: "Food camera scanner",
        am: "የምግብ ፎቶ ካሜራ ስካነር",
        om: "Scanner kaameraa nyaataa",
        ti: "ናይ መግቢ ፎቶ ካሜራ ስካነር"
      },
      free: "✕", premium: "✓", family: "✓"
    },
    {
      name: {
        en: "Private 1-on-1 peer DMs",
        am: "ምስጢራዊ የ1-ለ-1 የውስጥ መልእክት",
        om: "Ergaa dhuunfaa iccitii 1-on-1",
        ti: "ምስጢራዊ ናይ 1-ለ-1 መልእክት"
      },
      free: "✕", premium: "✓", family: "✓"
    },
    {
      name: {
        en: "Family wellness scores dashboard",
        am: "የቤተሰብ ጭንቀት መቆጣጠሪያ ሰሌዳ",
        om: "Dashboard qabxii maatii",
        ti: "ናይ ስድራቤት ጥዕና ዳሽቦርድ"
      },
      free: "✕", premium: "✕", 
      family: { 
        en: "✓ (up to 5 members)", 
        am: "✓ (እስከ 5 አባላት)", 
        om: "✓ (miseensota 5f)", 
        ti: "✓ (ን5 ኣባላት)" 
      }
    }
  ];

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left animate-fadeIn">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-[#085041] font-semibold text-label uppercase tracking-widest">
          {ht.sub}
        </span>
        <h1 className="text-2xl sm:text-3xl font-light text-[#085041] m-0 flex items-center justify-center">
          <ChevronDown className="mr-2 w-6 h-6 text-[#1D9E75]" />
          {ht.title}
        </h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
          {ht.desc}
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div key={idx} className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow relative ${p.color}`}>
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1D9E75] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {ext.popular || "MOST POPULAR"}
              </span>
            )}
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-[#085041] m-0">
                  {p.name[currentLang] || p.name.en}
                </h3>
                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-light text-[#085041]">{p.price}</span>
                  {p.extraPrice && (
                    <span className="block text-[#BA7517] text-xs font-semibold mt-1">
                      {p.extraPrice[currentLang] || p.extraPrice.en}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{p.desc[currentLang] || p.desc.en}</p>
              </div>

              <ul className="space-y-2 text-xs text-gray-600">
                {(p.features[currentLang] || p.features.en).map((feat, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-3.5 h-3.5 text-[#1D9E75] mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe(p.name[currentLang] || p.name.en)}
              className={`w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                p.featured 
                  ? 'bg-[#1D9E75] text-white hover:bg-[#1D9E75]/95 shadow-sm' 
                  : 'bg-[#085041] text-white hover:bg-[#085041]/95'
              }`}
            >
              {p.cta[currentLang] || p.cta.en}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison matrix table */}
      <div className="border-t pt-12 space-y-6">
        <h2 className="text-lg font-semibold text-[#085041] m-0">
          {ext.matrixTitle || "Features Matrix Comparison"}
        </h2>
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-xs text-left bg-white">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 text-gray-500 font-bold">{tableHeaders.feature[currentLang] || tableHeaders.feature.en}</th>
                <th className="p-3 font-semibold">{tableHeaders.free[currentLang] || tableHeaders.free.en}</th>
                <th className="p-3 font-semibold">{tableHeaders.premium[currentLang] || tableHeaders.premium.en}</th>
                <th className="p-3 font-semibold">{tableHeaders.family[currentLang] || tableHeaders.family.en}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {tableRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-medium">{row.name[currentLang] || row.name.en}</td>
                  <td className={`p-3 font-bold ${row.free === '✕' ? 'text-red-500' : 'text-green-600'}`}>{row.free}</td>
                  <td className={`p-3 font-bold ${row.premium === '✕' ? 'text-red-500' : 'text-green-600'}`}>{row.premium}</td>
                  <td className="p-3 font-medium">
                    {typeof row.family === 'object' ? (row.family[currentLang] || row.family.en) : (
                      <span className={row.family === '✕' ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>{row.family}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="border-t pt-12 space-y-6">
        <div className="text-center space-y-1">
          <HelpCircle className="w-8 h-8 text-[#085041] mx-auto animate-pulse" />
          <h2 className="text-lg font-semibold text-[#085041] m-0">
            {currentLang === 'en' ? "Frequently Asked Questions" : 
             currentLang === 'am' ? "ተደጋግመው የሚጠየቁ ጥያቄዎች" : 
             currentLang === 'om' ? "Gaaffiwwan Yeroo Baay'ee Gaafataman" : 
             "ተደጋጋሚ ሕቶታትን መልስታቶምን"}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#9FE1CB]/20 rounded-xl overflow-hidden shadow-xs">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 font-semibold text-xs text-[#085041] flex items-center justify-between focus:outline-none"
              >
                <span>{faq.q[currentLang] || faq.q.en}</span>
                <span className="text-xs transition-transform duration-200" style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-gray-500 leading-relaxed border-t pt-3">
                  {faq.a[currentLang] || faq.a.en}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
