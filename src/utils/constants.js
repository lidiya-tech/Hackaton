// Warka Wellness Platform Constants

export const LIFE_STAGES = [
  {
    id: "children",
    nameEn: "Children (Age 5-12)",
    nameAm: "ልጆች (ከ5-12 ዓመት)",
    nameOm: "Daa'imman (Umrii 5-12)",
    nameTi: "ህጻናት (ዕድመ 5-12)",
    problems: {
      en: ["Academic pressure", "Fear of failure", "Bullying", "Parental conflict", "Lack of play", "Learning difficulties"],
      am: ["የትምህርት ጫና", "የውድቀት ፍርሃት", "ጉልበተኝነት (ትኩስ መደፈር)", "የወላጆች ግጭት", "የጨዋታ እጥረት", "የመማር መቸገር"],
      om: ["Dhiibbaa barumsaa", "Sodaa kufaatii", "Miidhama hiriyootaa", "Walitti bu'iinsa maatii", "Ilaalcha taphaa dhabuu", "Dandeettii barachuu dadhabuu"],
      ti: ["ናይ ትምህርቲ ጸቕጢ", "ፍርሒ ውድቀት", "ምግፋዕ (ቡሊንግ)", "ናይ ወለዲ ግጭት", "ናይ መጻወቲ ሕጽረት", "ናይ ምምሃር ጸገማት"]
    },
    solutions: {
      en: ["Parent-mediated check-in", "Emotion cards", "Homework stress tracker", "Praise coaching for parents"],
      am: ["በወላጅ የሚመራ ክትትል", "የስሜት ካርዶች", "የቤት ስራ ጭንቀት መቆጣጠሪያ", "ለወላጆች የምስጋና ስልጠና"],
      om: ["Hordoffii maatiin gaggeeffamu", "Kaardiiwwan miiraa", "Hordoftuu dhiibbaa hojii manaa", "Leenjii galateeffannaa maatii"],
      ti: ["ብወለዲ ዝምራሕ ክትትል", "ናይ ስሜት ካርታታት", "ናይ ገዛ ስራሕ ጸቕጢ መከታተሊ", "ንወለዲ ናይ ምስጋና ስልጠና"]
    }
  },
  {
    id: "teenagers",
    nameEn: "Teenagers (Age 13-19)",
    nameAm: "ወጣቶች (ከ13-19 ዓመት)",
    nameOm: "Dargaggoota (Umrii 13-19)",
    nameTi: "ነእሽቱ ወጣታት (ዕድመ 13-19)",
    problems: {
      en: ["Exam stress", "Identity crisis", "Social media comparison", "Cyberbullying", "Peer pressure", "Body image", "Sleep deprivation from screens"],
      am: ["የፈተና ጭንቀት", "የማንነት ቀውስ", "የማህበራዊ ሚዲያ ንፅፅር", "የኢንተርኔት ትንኮሳ", "የእኩዮች ጫና", "የሰውነት ገጽታ ጭንቀት", "በስክሪን ምክንያት የእንቅልፍ ማጣት"],
      om: ["Dhiibbaa qormaataa", "Rakkoo eenyummaa", "Madaallii miidiyaa hawaasaa", "Miidhama interneetii", "Dhiibbaa hiriyootaa", "Bifaa fi boca qaamaa", "Hiriiba dhabuu iskriniin"],
      ti: ["ናይ ፈተና ጸቕጢ", "ናይ መንነት ቅልውላው", "ናይ ማሕበራዊ ሚድያ ምንጽጻር", "ናይ ኢንተርኔት ሃዋኽ", "ናይ መዛኑ ጸቕጢ", "ናይ ሰብነት ቅርጺ ጭንቀት", "ምኽንያት ስክሪን ድቃስ ምስኣን"]
    },
    solutions: {
      en: ["Anonymous AI venting", "Sleep coach", "Identity journal", "Teen peer circles"],
      am: ["ስም-አልባ የ-AI የውስጥ መተንፈሻ", "የእንቅልፍ አሰልጣኝ", "የማንነት ማስታወሻ ደብተር", "የወጣቶች የእኩዮች ስብስቦች"],
      om: ["Ilaalcha bilisaa AI", "Leenjisaa hiriibaa", "Galmee eenyummaa", "Garee dargaggootaa"],
      ti: ["ሽም ዘይገልጽ ናይ AI ምስትንፋስ", "ናይ ድቃስ መለማመዲ", "ናይ መንነት ደብተር", "ናይ መዛኑ ክቦታት"]
    }
  },
  {
    id: "young_adults",
    nameEn: "Young Adults (Age 20-30)",
    nameAm: "ጎልማሶች (ከ20-30 ዓመት)",
    nameOm: "Dargaggoota Cichoo (Umrii 20-30)",
    nameTi: "መንእሰያት (ዕድመ 20-30)",
    problems: {
      en: ["Job hunting anxiety", "Financial pressure", "Burnout from hustle culture", "Loneliness", "Impostor syndrome", "Quarter-life crisis", "Toxic workplaces"],
      am: ["የስራ ፍለጋ ስጋት", "የገንዘብ ጫና", "ከላብና ጥረት ባህል የሚመጣ ድካም", "ብቸኝነት", "የአስመሳይነት ስሜት (Impostor)", "የህልውና ቀውስ", "መርዛማ የስራ አካባቢዎች"],
      om: ["Yaaddoo hojii barbaaduu", "Dhiibbaa maallaqaa", "Dadhabbi dhiibbaa fiixee", "Kophaa ta'uu", "Miira sobaa (Impostor)", "Rakkoo jireenyaa 25", "Bakka hojii summaa'aa"],
      ti: ["ናይ ስራሕ ምድላይ ጭንቀት", "ናይ ገንዘብ ጸቕጢ", "ካብ ናይ ስራሕ ውጥረት ዝመጽእ ድካም", "ጽምዋ", "ናይ ምትላል ስሜት", "ናይ መበል 25 ዓመት ቅልውላው", "መርዛም ናይ ስራሕ ከባቢታት"]
    },
    solutions: {
      en: ["Burnout score", "Impostor syndrome coach", "Community circles", "Purpose finder AI"],
      am: ["የድካም (Burnout) ውጤት መቆጣጠሪያ", "የአስመሳይነት ስሜት ማከሚያ AI", "የማህበረሰብ ክቦች", "የህይወት አላማ ፈላጊ AI"],
      om: ["Safartuu dadhabbi", "Leenjisaa miira sobaa", "Koree hawaasaa", "Barbaadduu kaayyoo AI"],
      ti: ["ናይ ድካም መዐቀኒ", "ናይ ምትላል ስሜት መለማመዲ", "ናይ ማሕበረሰብ ክቦታት", "ዕላማ ሓበሬታ AI"]
    }
  },
  {
    id: "women",
    nameEn: "Women (All ages)",
    nameAm: "ሴቶች (በሁሉም እድሜ)",
    nameOm: "Dubartoota (Umrii hundumaa)",
    nameTi: "ደቂ ኣንስትዮ (ኩሉ ዕድመ)",
    problems: {
      en: ["Hormonal stress (PMS, PCOS, menopause)", "Gender discrimination", "Juggling career and home", "Postpartum depression", "Beauty standards", "Emotional labor", "Gender-based violence"],
      am: ["የሆርሞን ጭንቀት (PMS, PCOS, ማረጥ)", "የጾታ አድልዎ", "የስራና የቤት ህይወትን ማጣጣም", "ከወሊድ በኋላ የሚመጣ ድብርት", "የውበት መስፈርቶች ጫና", "የስሜት ጫና (የቤት ውስጥ ስራ)", "ጾታዊ ጥቃት"],
      om: ["Dhiibbaa hormoonii", "Loogii koorniyaa", "Hojii fi manaa wal-qixxeessuu", "Gadda da'umሳ boodaa", "Dhiibbaa ulaagaa baredinaa", "Dadhabbi miiraa", "Miidhama koorniyaa"],
      ti: ["ናይ ሆርሞን ጸቕጢ", "ናይ ጾታ ኣድልዎ", "ስራሕን ገዛን ምምጣን", "ድሕሪ ወሊድ ዝመጽእ ጭንቀት", "ናይ ጽባቐ መዐቀኒታት ጸቕጢ", "ናይ ስሜት ጾር", "ጾታዊ ዓመጽ"]
    },
    solutions: {
      en: ["Cycle-aware AI", "Safety SOS button", "Postpartum support mode", "Emotional labor journal"],
      am: ["የወር አበባ ኡደትን የተረዳ AI", "የደህንነት SOS ቁልፍ", "ከወሊድ በኋላ ድጋፍ ሰጪ ሁኔታ", "የስሜት ጾር ማስታወሻ"],
      om: ["AI marsaa ji'aa beeku", "Furtuu nagaa SOS", "Deeggarsa da'umsa boodaa", "Galmee dadhabbi miiraa"],
      ti: ["ንዝርገት ወርሓዊ ጽግያት ዝፈልጥ AI", "ናይ ድሕነት SOS መልእኽቲ", "ድሕሪ ወሊድ ደገፍ ሞድ", "ናይ ስሜት ጾር መዝገብ"]
    }
  },
  {
    id: "men",
    nameEn: "Men (All ages)",
    nameAm: "ወንዶች (በሁሉም እድሜ)",
    nameOm: "Dhiira (Umrii hundumaa)",
    nameTi: "ደቂ ተባዕትዮ (ኩሉ ዕድመ)",
    problems: {
      en: ["Suppressing emotions", "Financial provider pressure", "Reluctance to seek help", "Loneliness", "Midlife crisis", "Job loss identity", "Relationship breakdown"],
      am: ["ስሜትን አፍኖ መያዝ", "የቤተሰብ መጋቢነት የገንዘብ ጫና", "እርዳታ ለመጠየቅ መሸማቀቅ", "ብቸኝነት", "የመካከለኛ እድሜ ቀውስ", "የስራ ማጣት የማንነት መጥፋት", "የግንኙነት መቋረጥ"],
      om: ["Miira ukkaamsuu", "Dhiibbaa maatii bulchuu", "Gargaarsa gaafachuu sodachuu", "Kophaa ta'uu", "Rakkoo umrii walakkaa", "Hojii dhabuun eenyummaa dhabuu", "Walitti bu'iinsa jaalalaa"],
      ti: ["ስሜት ዓቢጥካ ምሓዝ", "ናይ መናበሪ ጾር ጸቕጢ", "ሓገዝ ንምሕታት ምስካፍ", "ጽምዋ", "ናይ ማእኸላይ ዕድመ ቅልውላው", "ስራሕ ብምስኣን መንነት ምጥፋእ", "ናይ ፍቕሪ ዝምድና ምብታኽ"]
    },
    solutions: {
      en: ["Framed as mental fitness not therapy", "Stress load tracker", "Men-only circles", "Voice-first mode"],
      am: ["ለአእምሮ ብቃት መታነጽ እንጂ እንደ ህክምና አለማቅረብ", "የጭንቀት ሸክም መቆጣጠሪያ", "የወንዶች ብቻ ክቦች", "በድምፅ ላይ ያተኮረ አገልግሎት"],
      om: ["Fayyaa sammuu malee yaala jechuu dhabuu", "Hordoftuu dhiibbaa yaaddoo", "Garee dhiiraa qofa", "Tajaajila sagalee qofaa"],
      ti: ["ከም ናይ ኣእምሮ ብቕዓት እምበር ከም ሕክምና ዘይምቕራብ", "ናይ ጸቕጢ ጾር መከታተሊ", "ደቂ ተባዕትዮ ጥራይ ዝሳተፍዎ ክቦታት", "ብድምጺ ዝሰርሕ ሞድ"]
    }
  },
  {
    id: "mothers",
    nameEn: "Mothers (All ages)",
    nameAm: "እናቶች (በሁሉም እድሜ)",
    nameOm: "Haadhotii (Umrii hundumaa)",
    nameTi: "ዕዴታት (ኩሉ ዕድመ)",
    problems: {
      en: ["Postpartum depression", "Invisible labor", "Loss of identity", "Sleep deprivation", "Guilt", "Lack of community support", "Breastfeeding challenges"],
      am: ["ከወሊድ በኋላ የሚመጣ ድብርት", "የማይታይ የቤት ውስጥ ድካም (Invisible Labor)", "የራስ ማንነት መጥፋት ስሜት", "የእንቅልፍ እጥረት", "የበደለኛነት ስሜት", "የማህበረሰብ ድጋፍ ማጣት", "የጡት ማጥባት ተግዳሮቶች"],
      om: ["Gadda da'umsa boodaa", "Hojii manaa hin mul'anne", "Eenyummaa dhabuu", "Hiriiba dhabuu", "Miira balleessaa", "Deeggarsa hawaasaa dhabuu", "Rakkina harma hoosisuu"],
      ti: ["ድሕሪ ወሊድ ዝመጽእ ጭንቀት", "ዘይርአ ናይ ገዛ ስራሕ ድካም", "ናይ መንነት ምጥፋእ ስሜት", "ናይ ድቃስ ሕጽረት", "ናይ በደለኛነት ስሜት", "ናይ ማሕበረሰብ ደገፍ ምስኣን", "ናይ ምጥባው ጸገማት"]
    },
    solutions: {
      en: ["Invisible labor counter", "Mother circles", "Sleep debt tracker", "Identity restore mode"],
      am: ["የማይታይ የቤት ውስጥ ድካም ቆጣሪ", "የእናቶች ስብስቦች", "የእንቅልፍ እዳ መቆጣጠሪያ", "የማንነት መመለሻ ዘዴ"],
      om: ["Lakkoofsa hojii manaa", "Garee haadhotii", "Hordoftuu hiriiba hir'ate", "Malleen eenyummaa deebisuu"],
      ti: ["ዘይርአ ናይ ገዛ ስራሕ መዐቀኒ", "ናይ ኣዴታት ክቦታት", "ናይ ድቃስ ሕጽረት መከታተሊ", "መንነት መመለሲ ሞድ"]
    }
  },
  {
    id: "fathers",
    nameEn: "Fathers (All ages)",
    nameAm: "አባቶች (በሁሉም እድሜ)",
    nameOm: "Abbootii (Umrii hundumaa)",
    nameTi: "ኣቦታት (ኩሉ ዕድመ)",
    problems: {
      en: ["Provider pressure", "Emotional disconnection", "Job loss fear", "Mental health stigma", "Absent fatherhood"],
      am: ["የገንዘብና አቅርቦት ጫና", "ከቤተሰብ ስሜታዊ መራራቅ", "ስራ የማጣት ፍርሃት", "የአእምሮ ጤና ማህበራዊ መገለል", "አባት አለመገኘት (Absent Fatherhood)"],
      om: ["Dhiibbaa maatii bulchuu", "Fageenya miiraa maatii", "Sodaa hojii dhabuu", "Loogii fayyaa sammuu", "Hirmaannaa abbaa dhabuu"],
      ti: ["ናይ ቀረብ ጸቕጢ", "ስሜታዊ ርሕቀት", "ስራሕ ናይ ምስኣን ፍርሒ", "ናይ ኣእምሮ ጤና ማሕበራዊ መግለል", "ቦታ ኣቦነት ምስኣን"]
    },
    solutions: {
      en: ["Financial stress gauge", "Dad-child connector", "Father story sharing", "Provider vs presence score"],
      am: ["የፋይናንስ ጭንቀት መለኪያ", "የአባትና ልጅ ግንኙነት ማጠናከሪያ", "የአባቶች ታሪክ መጋሪያ", "የአቅርቦትና የአብሮነት ሚዛን ውጤት"],
      om: ["Safartuu dhiibbaa maallaqaa", "Wal-qunnamsiisaa abbaa fi mucaa", "Qoodinsa seenaa abbootii", "Madaallii dhiibbaa fi argama"],
      ti: ["ናይ ገንዘብ ጸቕጢ መዐቀኒ", "ናይ ኣቦን ውሉድን መተሓላለፊ", "ናይ ኣቦታት ዛንታ ምክፋል", "ናይ ቀረብን ህላወን ሚዛን"]
    }
  },
  {
    id: "elderly",
    nameEn: "Elderly (Age 60+)",
    nameAm: "አዛውንት (ዕድሜ 60+)",
    nameOm: "Jaarsolii (Umrii 60+)",
    nameTi: "ኣረጋውያን (ዕድመ 60+)",
    problems: {
      en: ["Loneliness", "Fear of death", "Grief", "Cognitive decline", "Financial insecurity", "Feeling like a burden", "Disconnection from modern world"],
      am: ["ብቸኝነት", "የሞት ፍርሃት", "ሀዘን", "የማስታወስ ችሎታ መቀነስ", "የገንዘብ ዋስትና ማጣት", "ራስን እንደ ሸክም መቁጠር", "ከዘመናዊው ዓለም መገለል"],
      om: ["Kophaa ta'uu", "Sodaa du'aa", "Gadda", "Dandeettii sammuu gadi bu'uu", "Wabi dhabuu maallaqaa", "Akka ba'aatti of lakkaa'uu", "Addunyaa ammayyaa irraa adda ba'uu"],
      ti: ["ጽምዋ", "ፍርሒ ሞት", "ሓዘን", "ናይ ምዝካር ዓቕሚ ምቅናስ", "ናይ ገንዘብ ውሕስነት ምስኣን", "ከም ጾር ጌርካ ርእስኻ ምቑጻር", "ካብዚ ዘመናዊ ዓለም ምርሓቕ"]
    },
    solutions: {
      en: ["Voice-only mode", "Elder circles", "Memory games", "Legacy journal"],
      am: ["ድምፅ ብቻ የሚጠቀምበት ዘዴ", "የአዛውንቶች ስብስቦች", "የማስታወስ ጨዋታዎች", "የውርስና ትዝታ ማስታወሻ ደብተር"],
      om: ["Tajaajila sagalee qofaa", "Koree jaarsolii", "Tapha sammuu", "Galmee seenaa jireenyaa"],
      ti: ["ብድምጺ ጥራይ ዝሰርሕ ሞድ", "ናይ ኣረጋውያን ክቦታት", "ናይ ምዝካር ጸወታታት", "ናይ ታሪኽን ዝኽርን መዝገብ"]
    }
  }
];

export const PROFESSIONS = [
  // Medical
  { id: "doctors", en: "Doctors & physicians", am: "ሐኪሞች እና ዶክተሮች", om: "Ogeeyyii Yaalaa fi Doktoroota", ti: "ሓካይምን ዶክተራትን", cat: "Medical" },
  { id: "nurses", en: "Nurses & midwives", am: "ነርሶች እና አዋላጆች", om: "Narsoota fi Hojjettoota Da'umsaa", ti: "ነርስታትን መሕረስትን", cat: "Medical" },
  { id: "pharmacists", en: "Pharmacists", am: "የመድኃኒት ባለሙያዎች", om: "Ogeeyyii Qorichaa", ti: "ሰብ ሞያ ፈውሲ", cat: "Medical" },
  { id: "therapists", en: "Therapists & counselors", am: "የስነ-ልቦና ባለሙያዎችና አማካሪዎች", om: "Ogeeyyii Fayyaa Sammuu", ti: "ናይ ስነ-ሓሳብ ሰብ ሞያን አማከርትን", cat: "Medical" },
  // Education
  { id: "teachers", en: "Teachers & lecturers", am: "መምህራን እና ረዳት ፕሮፌሰሮች", om: "Barsiisota fi Lektaroota", ti: "መምህራንን መምህራን ዩኒቨርሲቲን", cat: "Education" },
  { id: "directors", en: "School directors & principals", am: "የትምህርት ቤት ርዕሰ-መምህራን", om: "Daareክተሮታ Mana Barumsaa", ti: "ርእሰ መምህራን", cat: "Education" },
  // Legal/Finance
  { id: "lawyers", en: "Lawyers & judges", am: "ጠበቆች እና ዳኞች", om: "Abukaatota fi Abbootii Seeraa", ti: "ጠበቓታትን ዳኛታትን", cat: "Finance/Legal" },
  { id: "bankers", en: "Bankers & finance officers", am: "ባንከኞችና የፋይናንስ ባለሙያዎች", om: "Hojjettoota Baankii fi Finaansii", ti: "ሰራሕተኛታት ባንክን ፋይናንስን", cat: "Finance/Legal" },
  // Tech/Business
  { id: "engineers", en: "Software engineers & IT", am: "የሶፍትዌር መሐንዲሶችና አይቲ", om: "Ogeeyyii Piroოგራሚንግ fi IT", ti: "ናይ ሶፍትዌር መሃንድሳትን አይቲን", cat: "Tech/Business" },
  { id: "entrepreneurs", en: "Entrepreneurs", am: "ስራ ፈጣሪዎች", om: "Hundeeffatoota Hojii", ti: "ስራሕ ፈጠርቲ", cat: "Tech/Business" },
  { id: "traders", en: "Business owners & traders", am: "የንግድ ድርጅት ባለቤቶችና ነጋዴዎች", om: "Abbootii Qabeenyaa fi Daldaltoota", ti: "ነጋዶትን ዋናታት ትካላትን", cat: "Tech/Business" },
  // Labor
  { id: "factory_workers", en: "Factory workers", am: "የፋብሪካ ሰራተኞች", om: "Hojjettoota Faabrikaa", ti: "ሰራሕተኛታት ፋብሪካ", cat: "Labor" },
  { id: "drivers", en: "Drivers & logistics workers", am: "አሽከርካሪዎችና የሎጅስቲክስ ሰራተኞች", om: "Konkolaachistoota fi Logistiksii", ti: "awakብትን ሰራሕተኛታት ሎጂስቲክስን", cat: "Labor" },
  { id: "construction", en: "Construction workers", am: "የግንባታ ሰራተኞች", om: "Hojjettoota Gamoo fi Ijaarsaa", ti: "ሰራሕተኛታት ህንጻ", cat: "Labor" },
  // Agriculture
  { id: "farmers", en: "Farmers", am: "አርሶ አደሮች", om: "Qonnaan Bulaa", ti: "ሓረስቶት", cat: "Agriculture" },
  { id: "market_vendors", en: "Market traders & vendors", am: "የገበያ ነጋዴዎችና ቸርቻሪዎች", om: "Daldaltoota Gabaa", ti: "ቸርcharቲ ዱካን", cat: "Agriculture" },
  // Creative
  { id: "artists", en: "Artists & creatives", am: "አርቲስቶችና የፈጠራ ባለሙያዎች", om: "Ogeeyyii Aartii fi Kalaqaa", ti: "ስነ-ጥበበኛታትን ፈጠርትን", cat: "Creative" },
  { id: "journalists", en: "Media & journalists", am: "የሚዲያ እና ጋዜጠኞች", om: "Midiyaa fi Gaazexeessitoota", ti: "ጋዜጠኛታትን ሚድያታትን", cat: "Creative" },
  { id: "chefs", en: "Chefs & food workers", am: "ሼፎችና የምግብ ዝግጅት ሰራተኞች", om: "Kukkiirran fi Hojjettoota Nyaataa", ti: "ክሽነታትን ሰራሕተኛታት መግብን", cat: "Creative" },
  { id: "textile_workers", en: "Textile workers", am: "የጨርቃጨርቅ ሰራተኞች", om: "Hojjettoota Uffataa fi Huccuu", ti: "ሰራሕተኛታት ዓለባ", cat: "Creative" },
  // Public Service / Others
  { id: "police", en: "Police & security", am: "ፖሊስ እና የደህንነት ሰራተኞች", om: "Poolisii fi Nageenya", ti: "ፖሊስን ሓለውቲ ድሕነትን", cat: "Public Service" },
  { id: "firefighters", en: "Firefighters", am: "እሳት አደጋ ሰራተኞች", om: "Hojjettoota Balaa Tasaa", ti: "ሰራሕተኛታት ምክልኻል ሓዊ", cat: "Public Service" },
  { id: "religious_leaders", en: "Religious leaders", am: "የሃይማኖት አባቶችና መሪዎች", om: "Luboota fi Abbootii Amantaa", ti: "መራሕቲ ሃይማኖት", cat: "Public Service" },
  { id: "domestic_workers", en: "Domestic workers", am: "የቤት ውስጥ ሰራተኞች", om: "Hojjettoota Mana Keessaa", ti: "ሰራሕተኛታት ውሽጢ ገዛ", cat: "Public Service" },
  { id: "politicians", en: "Politicians", am: "ፖለቲከኞች", om: "Siyaasessitoota", ti: "ፖለቲከኛታት", cat: "Public Service" },
  { id: "scientists", en: "Scientists & researchers", am: "ሳይንቲስቶችና ተመራማሪዎች", om: "Saayintistoota fi Qorattoota", ti: "ተመራመርትን ሳይንቲስታትን", cat: "Public Service" },
  { id: "athletes", en: "Athletes & coaches", am: "አትሌቶች እና አሰልጣኞች", om: "Atleetota fi Leenjistoota", ti: "አትሌታትን መለማመድትን", cat: "Public Service" },
  { id: "students", en: "Students & interns", am: "ተማሪዎች እና ሰልጣኞች", om: "Barattoota fi Shaakaltoota", ti: "ተምሃሮን ሰልጣኖችን", cat: "Public Service" }
];

export const ECONOMIC_STATUS_OPTIONS = [
  { id: "struggling", en: "Things are very difficult right now", am: "ነገሮች አሁን በጣም ከባድ ናቸው (እየተቸገርኩ ነው)", om: "Wanti hunduu baay'ee natti ulfaataa jira", ti: "ነገራት ሐዚ ንዓይ ኣዝዮም ከበድቲ እዮም ዘለዉ" },
  { id: "low_income", en: "I am getting by - money is tight", am: "እየተወጣሁት ነው - ግን ገንዘብ በጣም አጥብቆኛል", om: "Nan danda'a - garuu maallaqa natti xiqqaata", ti: "እየተጸገዕኩ እየ - ግና ገንዘብ ኣዝዩ ጸቢብኒ ኣሎ" },
  { id: "middle_income", en: "I am managing okay", am: "እየተመራሁ ነው - ደህና ነኝ", om: "Haala gaariin jiraachaa jira", ti: "ደሓን እየ ዘለኹ - ይመስገን" },
  { id: "comfortable", en: "I am comfortable financially", am: "በገንዘብ ረገድ በጥሩ ሁኔታ ላይ እገኛለሁ", om: "Qabeenya maallaqaatiin tasgabbaa'eera", ti: "ብገንዘብ ጽቡቕ ሃዋህው ኣለኒ" },
  { id: "unknown", en: "I would rather not say", am: "ባለመናገር እመርጣለሁ", om: "Dubbachuu hin barbaadu", ti: "ክዛረብ ኣይደልይን" }
];

export const DIETARY_PRACTICES = [
  { id: "ortho_fast_all", en: "Ethiopian Orthodox Fasting (all fasting periods)", am: "የኢትዮጵያ ኦርቶዶክስ ጾም (ሁሉንም የጾም ቀናት እጾማለሁ)", om: "Sooma Ortodoxii Itiyoophiyaa (guyyoota soomaa hundumaa)", ti: "ኦርቶዶክሳዊ ጾም (ኩሉ እጸውም)" },
  { id: "ortho_fast_wed_fri", en: "Ethiopian Orthodox Fasting (Wednesdays + Fridays only)", am: "የኢትዮጵያ ኦርቶዶክስ ጾም (ረቡዕ እና አርብ ብቻ)", om: "Sooma Ortodoxii Itiyoophiyaa (Roobii fi Jimaata qofa)", ti: "ኦርቶዶክሳዊ ጾም (ረቡዕን ዓርብን ጥራይ)" },
  { id: "muslim_halal", en: "Muslim - Halal only", am: "እስልምና - ሐላል ምግብ ብቻ", om: "Muslima - Nyaata Halaal qofa", ti: "እስልምና - ሓላል መግቢ ጥራይ" },
  { id: "none", en: "No dietary restrictions", am: "ምንም የሃይማኖት/ባህል ገደብ የለኝም", om: "Daangaa nyaataa hin qabu", ti: "ምንም ዓይነት ናይ መግቢ ቀይዲ የብለይን" },
  { id: "vegetarian", en: "Vegetarian", am: "አትክልት ተመጋቢ (የእንስሳት ውጤት አልመገብም)", om: "Nyaata biqiltuu qofa", ti: "ቬጀቴሪያን (አሕምልቲ ጥራይ)" }
];

export const HEALTH_CONDITIONS = [
  { id: "diabetes", en: "Diabetes Type 2", am: "የስኳር በሽታ ዓይነት 2", om: "Infee koo sukkaaraa Gosa 2", ti: "ሕማም ሽኮር ዓይነት 2" },
  { id: "hypertension", en: "Hypertension (high blood pressure)", am: "የደም ግፊት መጨመር", om: "Dhiibbaa dhiigaa ol'aana", ti: "ልዑል ጸቕጢ ደም" },
  { id: "anemia", en: "Anemia (low iron)", am: "የደም ማነስ (የብረት እጥረት)", om: "Hir'ina dhiigaa (Ayireenii)", ti: "ሕጽረት ደም" },
  { id: "obesity", en: "Obesity or overweight", am: "ከመጠን በላይ ውፍረት", om: "Ufata qaamaa ol'aana", ti: "ምልክት ካብ መጠን ንላዕሊ ምውፋር" },
  { id: "pregnancy_1st", en: "Pregnancy (1st Trimester)", am: "እርግዝና (የመጀመሪያዎቹ 3 ወራት)", om: "Ulfa (Tirimestera 1ffaa)", ti: "ጥንሲ (ቀዳማይ ትሪሚስተር)" },
  { id: "pregnancy_2nd", en: "Pregnancy (2nd Trimester)", am: "እርግዝና (ከ4-6 ወራት)", om: "Ulfa (Tirimestera 2ffaa)", ti: "ጥንሲ (ካልኣይ ትሪሚስተር)" },
  { id: "pregnancy_3rd", en: "Pregnancy (3rd Trimester)", am: "እርግዝና (የመጨረሻዎቹ 3 ወራት)", om: "Ulfa (Tirimestera 3ffaa)", ti: "ጥንሲ (ሳልሳይ ትሪሚስተር)" },
  { id: "breastfeeding", en: "Breastfeeding", am: "ጡት ማጥባት", om: "Harma hoosisuu", ti: "ምጥባው" },
  { id: "none", en: "None of the above", am: "ከላይ የተጠቀሱት የሉብኝም", om: "Kanarraa kan hafe hin qabu", ti: "ካብዚኦም ሓደ እኳ የብለይን" }
];

// Seed the 68 Warka Groups
export const COMMUNITY_GROUPS = [
  // CATEGORY A: BY PROFESSION (28 groups)
  { id: "g_doctors", category: "profession", en: "Doctors & Physicians Circle", am: "የሐኪሞች እና ዶክተሮች ስብስብ", om: "Garee Doktoota Yaalaa", ti: "ክቦ ሓካይምን ዶክተራትን" },
  { id: "g_nurses", category: "profession", en: "Nurses & Midwives Union", am: "የነርሶችና አዋላጆች አንድነት", om: "Hawaasa Narsootaa", ti: "ሕብረት ነርስታትን መሕረስትን" },
  { id: "g_pharmacists", category: "profession", en: "Pharmacists Network", am: "የመድኃኒት ባለሙያዎች መረብ", om: "Kore Ogeeyyii Qorichaa", ti: "ክቦ ሰብ ሞያ ፈውሲ" },
  { id: "g_therapists", category: "profession", en: "Counselors & Therapists", am: "የአማካሪዎችና ስነ-ልቦና ባለሙያዎች", om: "Garee Gorsa Sammuu", ti: "ክቦ አማከርትን ስነ-ሓሳብን" },
  { id: "g_teachers", category: "profession", en: "Teachers & Educators", am: "የመምህራንና አስተማሪዎች መድረክ", om: "Garee Barsiisotaa", ti: "መድረኽ መምህራንን መምህራን ዩኒቨርሲቲን" },
  { id: "g_directors", category: "profession", en: "Academic Directors", am: "የትምህርት መሪዎችና ርዕሰ-መምህራን", om: "Daarektaroota Barnootaa", ti: "ክቦ መራሕቲ ትምህርቲ" },
  { id: "g_lawyers", category: "profession", en: "Legal & Judiciary Circle", am: "የህግና ፍትህ ባለሙያዎች ክበብ", om: "Garee Abukaatotaa", ti: "ክቦ ሰብ ሞያ ሕግን ፍትሕን" },
  { id: "g_bankers", category: "profession", en: "Finance & Bankers Hub", am: "የፋይናንስና ባንከኞች ማእከል", om: "Hawaasa Baankii", ti: "ማእከል ሰራሕተኛታት ባንክን ፋይናንስን" },
  { id: "g_engineers", category: "profession", en: "Software & Tech Circle", am: "የሶፍትዌርና ቴክኖሎጂ ስብስብ", om: "Garee Ogeeyyii Tekinoolojii", ti: "ክቦ ሶፍትዌርን አይቲን" },
  { id: "g_entrepreneurs", category: "profession", en: "Ethiopian Entrepreneurs", am: "የኢትዮጵያ ስራ ፈጣሪዎች", om: "Dargaggoota Kalaqa Hojii", ti: "ሰብ ሞያ ስራሕ ፈጠርቲ" },
  { id: "g_traders", category: "profession", en: "Business & Retail Owners", am: "የንግድ ድርጅት ባለቤቶች", om: "Abbootii Qabeenyaa Daldalaa", ti: "ዋናታት ትካላት ንግዲ" },
  { id: "g_factory", category: "profession", en: "Industrial & Factory Guild", am: "የኢንዱስትሪና ፋብሪካ ሰራተኞች", om: "Hojjettoota Faabrikaa", ti: "ማሕበር ሰራሕተኛታት ፋብሪካ" },
  { id: "g_drivers", category: "profession", en: "Transport & Logistics", am: "የአሽከርካሪዎችና ሎጅስቲክስ ክበብ", om: "Garee Konkolaachistootaa", ti: "ክቦ መዘወርትን ሎጂስቲክስን" },
  { id: "g_construction", category: "profession", en: "Builders & Construction", am: "የግንባታና ኢንጂነሪንግ ማህበር", om: "Hojjettoota Ijaarsaa", ti: "ማሕበር ሃነጽቲ" },
  { id: "g_farmers", category: "profession", en: "Farmers & Agriculture", am: "የአርሶ አደሮችና ግብርና ማህበር", om: "Garee Qonnaan Bulaa", ti: "ማሕበር ሓረስቶት" },
  { id: "g_vendors", category: "profession", en: "Market Traders", am: "የገበያ ነጋዴዎችና አዟሪዎች", om: "Daldaltoota Gabaa", ti: "ነጋዶት ዕዳጋታት" },
  { id: "g_artists", category: "profession", en: "Creatives & Artists", am: "የአርቲስቶችና የፈጠራ ባለሙያዎች", om: "Garee Aartii fi Kalaqaa", ti: "ክቦ ስነ-ጥበበኛታትን ፈጠርትን" },
  { id: "g_journalists", category: "profession", en: "Journalists & Media", am: "የጋዜጠኞችና ሚዲያ ባለሙያዎች", om: "Gaazexeessitoota fi Midiyaa", ti: "ክቦ ጋዜጠኛታትን ሚድያታትን" },
  { id: "g_chefs", category: "profession", en: "Culinary & Chefs Guild", am: "የምግብ ባለሙያዎችና ሼፎች", om: "Ogeeyyii Nyaataa", ti: "ክቦ ሰብ ሞያ መግብን ክሽነን" },
  { id: "g_textile", category: "profession", en: "Garment & Textile", am: "የጨርቃጨርቅና አልባሳት ሰራተኞች", om: "Hojjettoota Warshaa Uffataa", ti: "ሰራሕተኛታት ፋብሪካ ዓለባ" },
  { id: "g_police", category: "profession", en: "First Responders & Police", am: "የፖሊስና ደህንነት ሰራተኞች", om: "Hawaasa Nageenyaa", ti: "ሓለውቲ ጸጥታን ፖሊስን" },
  { id: "g_firefighters", category: "profession", en: "Emergency & Firefighters", am: "የድንገተኛ አደጋና እሳት አደጋ", om: "Garee Balaa Tasaa", ti: "ሰራሕተኛታት ሓደጋ ሓዊ" },
  { id: "g_religious", category: "profession", en: "Religious & Spiritual Leaders", am: "የሃይማኖት መሪዎችና አባቶች", om: "Abbootii Amantaa", ti: "መራሕቲ ሃይማኖት" },
  { id: "g_domestic", category: "profession", en: "Domestic Workers Circle", am: "የቤት ውስጥ ረዳቶችና ሰራተኞች", om: "Hojjettoota Manaa", ti: "ሰራሕተኛታት ገዛ" },
  { id: "g_politicians", category: "profession", en: "Public Servants & Leaders", am: "የህዝብ ተወካዮችና መሪዎች", om: "Hooggantoota Siyaasaa", ti: "ፖለቲከኛታትን ህዝባዊ ሰራሕተኛታትን" },
  { id: "g_scientists", category: "profession", en: "Researchers & Academics", am: "የምርምርና ሳይንስ ባለሙያዎች", om: "Qorattoota fi Saayintistoota", ti: "ተመራመርትን ሳይንቲስታትን" },
  { id: "g_athletes", category: "profession", en: "Athletes & Sports Coaches", am: "የአትሌቶችና ስፖርተኞች ማህበረሰብ", om: "Atleetota fi Ispoortii", ti: "ክቦ አትሌታትን ስፖርተኝታትን" },
  { id: "g_students", category: "profession", en: "Students & Interns Support", am: "የተማሪዎችና ሰልጣኞች ድጋፍ", om: "Garee Barattootaa", ti: "ክቦ ተምሃሮን ሰልጣኖችን" },

  // CATEGORY B: BY AGE GROUP (10 groups)
  { id: "g_age_5_12", category: "age", en: "Children (5-12) Parent Corner", am: "የልጆች (5-12) ወላጆች ጥግ", om: "Qubee Daa'immanii", ti: "ክቦ ወለዲ ህጻናት (5-12)" },
  { id: "g_age_13_15", category: "age", en: "Early Teens Circle", am: "የታዳጊ ወጣቶች ክበብ (13-15)", om: "Dargaggoota Kutaalee 13-15", ti: "ክቦ ታደስቲ ወጣታት (13-15)" },
  { id: "g_age_16_19", category: "age", en: "Late Teens Forum", am: "የአፍላ ወጣቶች መድረክ (16-19)", om: "Dargaggoota Kutaalee 16-19", ti: "መድረኽ ኣፍላ ወጣታት (16-19)" },
  { id: "g_age_20_24", category: "age", en: "University & Twenties", am: "የዩኒቨርሲቲና ሃያዎቹ መጀመሪያ", om: "Garee Dargaggoota Yuuniversitii", ti: "ክቦ ተምሃሮ ዩኒቨርሲቲን ዕድመ 20ታት" },
  { id: "g_age_25_29", category: "age", en: "Late Twenties Career Seekers", am: "የሃያዎቹ መጨረሻ ህይወትና ስራ", om: "Dargaggoota Umrii 25-29", ti: "መድረኽ ዕድመ 25-29" },
  { id: "g_age_30_39", category: "age", en: "Thirties Network", am: "የሰላሳዎቹ እድሜ መረብ", om: "Hawaasa Umrii 30-39", ti: "ክቦ ዕድመ 30ታት" },
  { id: "g_age_40_49", category: "age", en: "Forties Leadership Circle", am: "የአርባዎቹ እድሜ መሪነት", om: "Garee Umrii 40-49", ti: "ክቦ ዕድመ 40ታት" },
  { id: "g_age_50_59", category: "age", en: "Fifties Wisdom Circle", am: "የሃምሳዎቹ እድሜ ማህበር", om: "Jaarsolii Umrii 50-59", ti: "ክቦ ዕድመ 50ታት" },
  { id: "g_age_60_69", category: "age", en: "Elder Seniors (60-69)", am: "የቀድሞ ትውልድ አዛውንት (60-69)", om: "Jaarsolii Umrii 60-69", ti: "ክቦ ኣረጋውያን (60-69)" },
  { id: "g_age_70_plus", category: "age", en: "Elderly Elders (70+)", am: "የአረጋውያን ጥግ (70+)", om: "Jaarsolii Umrii 70+", ti: "ክቦ ኣረጋውያን (70+)" },

  // CATEGORY C: BY FAMILY ROLE (14 groups)
  { id: "g_new_mothers", category: "family", en: "New Mothers (Baby 0-1)", am: "የአዲስ እናቶች ክበብ (እስከ 1 ዓመት)", om: "Haadhotii Haaraa", ti: "ክቦ ሓደስቲ ኣዴታት (እስከ 1 ዓመት)" },
  { id: "g_toddler_mothers", category: "family", en: "Mothers with Toddlers", am: "የታዳጊ ህፃናት እናቶች", om: "Haadhotii Daa'immanii", ti: "ኣዴታት ህጻናት" },
  { id: "g_school_mothers", category: "family", en: "Mothers of School-Age Kids", am: "የትምህርት ቤት ልጆች እናቶች", om: "Haadhotii Barattootaa", ti: "ኣዴታት ተምሃሮ" },
  { id: "g_working_mothers", category: "family", en: "Working Mothers Support", am: "የስራና የቤት እናቶች ድጋፍ", om: "Haadhotii Hojjettootaa", ti: "ደገፍ ሰራሕተኛታት ኣዴታት" },
  { id: "g_stay_home_mothers", category: "family", en: "Stay-at-Home Mothers", am: "የቤት እመቤት እናቶች ስብስብ", om: "Haadhotii Mana Oolan", ti: "ክቦ ናይ ገዛ ኣዴታት" },
  { id: "g_new_fathers", category: "family", en: "New Fathers Circle", am: "የአዲስ አባቶች መድረክ", om: "Abbootii Haaraa", ti: "መድረኽ ሓደስቲ ኣቦታት" },
  { id: "g_working_fathers", category: "family", en: "Working Fathers Balance", am: "የስራና አብሮነት አባቶች", om: "Abbootii Hojjettootaa", ti: "ክቦ ሰራሕተኛታት ኣቦታት" },
  { id: "g_single_fathers", category: "family", en: "Single Fathers Hub", am: "የብቸኛ አባቶች ማእከል", om: "Abbootii Kophaa Maatii bulchan", ti: "ማእከል በይንታውያን ኣቦታት" },
  { id: "g_single_parents", category: "family", en: "Single Parents Support", am: "የነጠላ ወላጆች ድጋፍ ማህበር", om: "Maatii Kophaa Bulchuu", ti: "ማሕበር በይንታውያን ወለዲ" },
  { id: "g_coparenting", category: "family", en: "Co-Parents & Divorced", am: "አብረው የሚያሳድጉና የተፋቱ", om: "Maatii Wal-gargaaran", ti: "ክቦ ተፋቲሖም ሓቢሮም ዘዕብዩን" },
  { id: "g_grandparents", category: "family", en: "Grandparents Raising Kids", am: "የልጅ ልጅ የሚያሳድጉ አያቶች", om: "Akkoo fi Akaakayyuu", ti: "ኣያታት ደቂ ደቆም ዘዕብዩ" },
  { id: "g_caregivers", category: "family", en: "Caregivers of Sick Family", am: "የህመምተኛ አስታማሚ ቤተሰቦች", om: "Gargaartota Maatii Dhukkubsatanii", ti: "ኣለይቲ ሕሙማት ቤተሰብ" },
  { id: "g_adult_children", category: "family", en: "Adult Children of Elderly", am: "የአረጋውያን አስታማሚ ልጆች", om: "Ijoollee Jaarsolii deeggaran", ti: "ኣለይቲ ኣረጋውያን ውሉዳት" },
  { id: "g_siblings", category: "family", en: "Siblings Carrying Weight", am: "የቤተሰብ ሸክም የተሸከሙ እህት/ወንድሞች", om: "Obboloota Maatii deeggaran", ti: "ጾር ቤተሰብ ዝተሰከሙ ኣሕዋት" },

  // CATEGORY D: BY LIFE SITUATION (16 groups)
  { id: "g_job_loss", category: "situation", en: "Job Loss & Unemployment", am: "የስራ ማጣትና ስራ ፍለጋ", om: "Hojii Dhabummaa fi Barbaacha", ti: "ምስኣን ስራሕን ስራሕ ምድላይን" },
  { id: "g_business_fail", category: "situation", en: "Business Failure Recovery", am: "የንግድ ኪሳራ ማገገሚያ", om: "Kisaaraa Daldalaa irraa bayyanachuu", ti: "ካብ ኪሳራ ንግዲ ምሕዋይ" },
  { id: "g_divorce", category: "situation", en: "Divorce & Separation Support", am: "የፍቺ እና የመለያየት ድጋፍ", om: "Deeggarsa Wal-hiikkaa", ti: "ደገፍ ፍትሕን ምፍልላይን" },
  { id: "g_grief", category: "situation", en: "Grief & Bereavement", am: "የሀዘንና እረፍት ማስተናገጃ", om: "Deeggarsa Gadda Maatii", ti: "ሓዘንን ምስኣን ስድራን" },
  { id: "g_pregnancy_loss", category: "situation", en: "Pregnancy Loss Support", am: "የፅንስ መቋረጥና መሀንነት ድጋፍ", om: "Miidhama Ulfaa dhabuu", ti: "ደገፍ ምቁራጽ ጥንስን መካንነትን" },
  { id: "g_trauma", category: "situation", en: "Abuse & Trauma Survivors", am: "የጥቃትና የስነ-አእምሮ ቁስል አሸናፊዎች", om: "Baraaramtoota Miidhamaa", ti: "ተዓወቲ ጸገማትን ማህሰይቲን" },
  { id: "g_diaspora", category: "situation", en: "Diaspora & Migrant Support", am: "የዲያስፖራና የውጭ ሀገር ኗሪዎች", om: "Hawaasa Diyaaspooraa", ti: "ደገፍ ዲያስፖራን ስደተኛታትን" },
  { id: "g_idp", category: "situation", en: "Internally Displaced Persons", am: "ከቀዬአቸው የተፈናቀሉ ወገኖች", om: "Namoota Qee'eerraa Baqatan", ti: "ካብ መረበቶም ዝተመዛበሉ ወገናት" },
  { id: "g_chronic", category: "situation", en: "Chronic Illness Circle", am: "የረጅም ጊዜ ህመምተኞች ክበብ", om: "Hawaasa Dhukkuba Yeroo Dheeraa", ti: "ክቦ ናይ ነዊሕ እዋን ሕሙማት" },
  { id: "g_disability", category: "situation", en: "Disability & Caregiving Support", am: "የአካል ጉዳትና ልዩ ድጋፍ ክበብ", om: "Garee አካል ጉዳተኞችን", ti: "ክቦ አካል ጉድኣትን ፍሉይ ደገፍን" },
  { id: "g_debt", category: "situation", en: "Debt & Financial Crisis", am: "የእዳ እና የገንዘብ ቀውስ መውጫ", om: "Rakkina Idhaa fi Mallaqaa", ti: "ካብ ዕዳን ናይ ገንዘብ ቅልውላውን መውጽኢ" },
  { id: "g_housing", category: "situation", en: "Housing Insecurity", am: "የቤትና የመጠለያ ችግር መፍትሄ", om: "Rakkina Mana Jireenyaa", ti: "ጸገም ገዛን መዕቆቢን" },
  { id: "g_loneliness", category: "situation", en: "Loneliness & Isolation Support", am: "የብቸኝነትና መገለል ድጋፍ", om: "Kophaa ta'uu fi Lagatamu", ti: "ደገፍ ጽምዋን ተነጽሎን" },
  { id: "g_sleep", category: "situation", en: "Sleep Disorders Tracker", am: "የእንቅልፍ ማጣት ችግር መከታተያ", om: "Hordoffii Rakkina Hiriibaa", ti: "መከታተሊ ጸገማት ድቃስ" },
  { id: "g_depression", category: "situation", en: "Anxiety & Depression Safe Space", am: "የጭንቀትና ድብርት ደህንነቱ የተጠበቀ ቦታ", om: "Iddoo Nagaa Yaaddoo fi Gaddaa", ti: "ውሑስ ቦታ ጭንቀትን ድብርትን" },
  { id: "g_burnout", category: "situation", en: "Burnout Recovery Alliance", am: "የከፍተኛ ስራ ድካም (Burnout) ማገገሚያ", om: "Dadhabbi Hojjechuu irraa bayyanachuu", ti: "ሕብረት ካብ ናይ ስራሕ ድካም ምሕዋይ" }
];

export const ETHIOPIAN_FOODS = [
  {
    id: "injera_with_shiro",
    nameEn: "Teff Injera with Shiro",
    nameAm: "ጠፍ እንጀራ በሽሮ",
    nameOm: "Biddeena Xaafii Shiroo wajjin",
    nameTi: "ጣፍ እንጀራ ብሽሮ",
    gi: "Low (Glycemic Index 42)",
    benefits: "Combines teff's magnesium (reduces stress) with shiro's sustained plant protein. Perfect for stabilizing blood sugar.",
    benefitsAm: "የጠፍ ማግኒዥየምና የሽሮ ፕሮቲን ውህደት። የደም ስኳርን ለማረጋጋት ፍፁም ነው።",
    sodium: "450mg per serving",
    calories: "320 kcal",
    iron: "8.5mg",
    potassium: "540mg",
    image: "/images/injera_with_shiro_1780691492075.png",
    videoUrl: "https://www.youtube.com/embed/lA0yR9_0LpQ",
    prepTime: "25 mins",
    ingredientsEn: "Shiro powder, Onions, Berbere, Oil & Garlic, Teff Injera",
    stepsEn: "1. Cook chopped onions in a dry pot until golden.\n2. Add oil, berbere, and minced garlic.\n3. Add shiro powder slowly while whisking with water.\n4. Simmer for 15-20 minutes until bubbles pop.\n5. Serve fresh on top of Teff Injera."
  },
  {
    id: "injera_with_misir",
    nameEn: "Teff Injera with Misir Wot",
    nameAm: "ጠፍ እንጀራ በምስር ወጥ",
    nameOm: "Biddeena Xaafii Misira wajjin",
    nameTi: "ጣፍ እንጀራ ብምስር",
    gi: "Low (GI 38)",
    benefits: "Folate in lentils supports mood stabilizers, while teff's iron prevents anemia. A powerful vegan combo.",
    benefitsAm: "በምስር ውስጥ ያለው ፎሌት ለስሜት ማረጋጊያ ሲረዳ የጠፍ ብረት ደግሞ የደም ማነስን ይከላከላል።",
    sodium: "380mg per serving",
    calories: "280 kcal",
    iron: "9.2mg",
    potassium: "630mg",
    image: "/images/injera_with_misir_1780691514397.png",
    videoUrl: "https://www.youtube.com/embed/qFp4pX4Gg4w",
    prepTime: "35 mins",
    ingredientsEn: "Red lentils, Onions, Berbere, Lime, Oil, Teff Injera",
    stepsEn: "1. Boil red lentils separately for 10 minutes.\n2. Cook onions, oil, and berbere to make the wot base.\n3. Combine lentils with wot base and simmer.\n4. Squeeze lime immediately before serving for iron absorption.\n5. Serve over Teff Injera."
  },
  {
    id: "ayib_with_gomen",
    nameEn: "Ayib & Gomen",
    nameAm: "አይብ በጎመን",
    nameOm: "Ayibii fi Gomenii",
    nameTi: "ኣይቢ ብቆስጣ",
    gi: "Very Low (GI 20)",
    benefits: "Calcium from Ayib and Potassium from Gomen perfectly balances blood pressure and supports bone health.",
    benefitsAm: "የአይብ ካልሲየምና የጎመን ፖታሺየም የደም ግፊትን ያስተካክላል፣ ለአጥንት ጤናም ጠቃሚ ነው።",
    sodium: "200mg per serving",
    calories: "180 kcal",
    iron: "2.3mg",
    potassium: "560mg",
    image: "/images/ayib_with_gomen_1780691529231.png",
    videoUrl: "https://www.youtube.com/embed/H7c2nEa9zZg",
    prepTime: "20 mins",
    ingredientsEn: "Collard Greens (Gomen), Cottage Cheese (Ayib), Spiced Butter (Niter Kibbeh)",
    stepsEn: "1. Boil gomen until tender.\n2. Sauté chopped onions and garlic in pan.\n3. Mix the gomen with the sautéed base.\n4. Prepare Ayib by straining cottage cheese.\n5. Plate the gomen and top heavily with Ayib."
  },
  {
    id: "doro_wot",
    nameEn: "Doro Wot (Spicy Chicken Stew)",
    nameAm: "ዶሮ ወጥ",
    nameOm: "Doro Wotii",
    nameTi: "ዶሮ ወጽ",
    gi: "Zero (GI 0)",
    benefits: "Rich in high-quality protein and B-vitamins. Contains spices that boost metabolism and immunity.",
    benefitsAm: "በፕሮቲን እና በቫይታሚን ቢ የበለጸገ ነው። በሽታ የመከላከል አቅምን የሚጨምሩ ቅመሞችን ይዟል።",
    sodium: "450mg per serving",
    calories: "350 kcal",
    iron: "4.5mg",
    potassium: "400mg",
    image: "/images/halal_chicken_stew_1780691551816.png",
    videoUrl: "https://www.youtube.com/embed/5O4oT1_sKqY",
    prepTime: "2 hours",
    ingredientsEn: "Chicken, Red Onions, Berbere, Niter Kibbeh (Spiced Butter), Garlic, Ginger, Hard-boiled Eggs",
    stepsEn: "1. Finely chop onions and cook in a dry pan for 30-45 minutes until reduced.\n2. Add oil/butter and berbere, cooking for another 30 mins.\n3. Add garlic and ginger.\n4. Clean chicken thoroughly and add to the stew, simmering for 45 mins.\n5. Score boiled eggs and add them in the last 10 minutes.\n6. Serve hot."
  },
  {
    id: "oatmeal_banana",
    nameEn: "Oatmeal with Banana",
    nameAm: "አጃ በሙዝ",
    nameOm: "Ajaa fi Muzii",
    nameTi: "ኦትሚል ምስ ባናና",
    gi: "Medium (GI 55)",
    benefits: "Great for quick morning energy. Soluble fiber manages cholesterol. Best alternative for non-fasting mornings.",
    benefitsAm: "ለማለዳ ጉልበት እጅግ ጠቃሚ ነው። ኮሌስትሮልን ለመቆጣጠር ይረዳል።",
    sodium: "10mg per serving",
    calories: "250 kcal",
    iron: "1.5mg",
    potassium: "420mg",
    image: "/images/oatmeal_banana_1780691567128.png",
    videoUrl: "https://www.youtube.com/embed/Q_8gO-W7dFM",
    prepTime: "10 mins",
    ingredientsEn: "Rolled Oats, Water/Milk, Ripe Banana, Honey/Cinnamon",
    stepsEn: "1. Boil water or milk in a pot.\n2. Stir in rolled oats and reduce heat.\n3. Simmer for 5-7 minutes until liquid is absorbed.\n4. Mash half a banana into the oats.\n5. Slice the remaining half on top.\n6. Drizzle with honey and serve."
  },
  {
    id: "rice_lentils",
    nameEn: "Rice with Lentils",
    nameAm: "ሩዝ በምስር",
    nameOm: "Ruza fi Misira",
    nameTi: "ሩዝ ምስ ብርስን",
    gi: "Medium (GI 50)",
    benefits: "A complete protein profile. Easily digestible and provides sustained energy throughout the day.",
    benefitsAm: "ሙሉ የፕሮቲን ምንጭ። በቀላሉ የሚፈጭ እና ቀኑን ሙሉ ሀይል የሚሰጥ።",
    sodium: "250mg per serving",
    calories: "310 kcal",
    iron: "5.5mg",
    potassium: "350mg",
    image: "/images/rice_lentils_1780691589902.png",
    videoUrl: "https://www.youtube.com/embed/wL5N5g_qD8o",
    prepTime: "30 mins",
    ingredientsEn: "White or Brown Rice, Lentils, Olive Oil, Cumin, Onions",
    stepsEn: "1. Rinse rice and lentils thoroughly.\n2. Sauté onions in olive oil until caramelized.\n3. Add cumin and stir briefly.\n4. Add rice, lentils, and water/broth.\n5. Bring to boil, cover, and simmer on low for 20-25 mins.\n6. Fluff with a fork and serve."
  },
  {
    id: "fasting_empty",
    nameEn: "Fasting - No Meal",
    nameAm: "ጾም - ምግብ የለም",
    nameOm: "Sooma - Nyaata Hin Qabu",
    nameTi: "ጾም - መግቢ የለን",
    gi: "Zero (GI 0)",
    benefits: "Intermittent fasting period as per your religious observation. Remember to stay hydrated if allowed.",
    benefitsAm: "የሃይማኖትዎን የጾም ስርአት እየተገበሩ ነው።",
    sodium: "0mg",
    calories: "0 kcal",
    iron: "0mg",
    potassium: "0mg",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
    videoUrl: "",
    prepTime: "0 mins",
    ingredientsEn: "Water, Spiritual Reflection",
    stepsEn: "1. Focus on spiritual mindfulness.\n2. Maintain your fasting calendar discipline.\n3. Break fast at the appointed time."
  }
];

export const WELLNESS_BUSINESSES = [
  {
    id: "kuriftu",
    name: "Kuriftu African Village & Resort",
    category: "spa",
    priceRange: "high",
    costText: "2500+ ETB",
    locations: ["Entoto Adventure Park", "Bishoftu", "Bahir Dar", "Hawassa", "Adama"],
    specialPromo: "Warka Premium: 15% discount code (WARKAKURIFTU15) + Free spa check-in session",
    descEn: "Ethiopia's premier luxury wellness village. Therapeutic thermal baths, massage, and nature meditation.",
    descAm: "የኢትዮጵያ ቀዳሚ የቅንጦት ጤና መንደር። የህክምና ሙቅ ውሃ መታጠቢያዎች፣ ማሸት እና በተፈጥሮ ውስጥ ማሰላሰልን ያካትታል።",
    descOm: "Magaalaa fi resortii fayyaa ol'aana Itiyoophiyaa. Faranji dhagna dhiqachuu fi jireenya uumamaa.",
    descTi: "ናይ ኢትዮጵያ ቀዳማይ መዘናግዕን ጥዕናን መንደር። ናይ ሙቐት ማይ መሐጸቢ፣ ማሸትን ምስ ተፈጥሮ ምውህሃድን ዝሓዘ።",
    rating: 96,
    isVerified: true
  },
  {
    id: "tulsi_yoga",
    name: "Tulsi Yoga Ethiopia",
    category: "yoga",
    priceRange: "middle",
    costText: "200 ETB / class",
    locations: ["Bole, Addis Ababa", "Old Airport, Addis Ababa"],
    specialPromo: "Warka members: First class is absolutely FREE! Book from dashboard.",
    descEn: "Dedicated mindfulness and yoga center offering traditional flow, breathing exercises, and circles.",
    descAm: "ለማህበረሰባዊ ግንኙነት፣ ትንፋሽ ልምምድ እና ዮጋ የተዘጋጀ ማእከል።",
    descOm: "Wiirtuu yoogaa fi yaada bilisaa Bolee fi Airport Moofaa jiru.",
    descTi: "ማእከል ዮጋን ምስትንፋስን ቦለን ኦልድ ኤርፖርትን።",
    rating: 92,
    isVerified: true
  },
  {
    id: "entoto_park",
    name: "Entoto Natural Park Paths",
    category: "nature",
    priceRange: "struggling",
    costText: "FREE (0 ETB)",
    locations: ["Entoto Hills, Addis Ababa"],
    specialPromo: "Free weekly guided community walk every Saturday 7:00 AM.",
    descEn: "Nature therapy forest walking. Oxygen-rich altitude healing that costs absolutely nothing.",
    descAm: "በጫካ ውስጥ ተፈጥሮን በመመልከት መጓዝ። ምንም ክፍያ ሳይጠይቅ ከፍተኛ የኦክስጅን ፈውስ ይሰጣል።",
    descOm: "Daandii deeminsaa uumamaa Tulluu Anxoxoo. Bilaasa kan ta'ee fi qilleensa gaarii.",
    descTi: "ናይ ተፈጥሮ ጉዕዞ ጫካ እንቶጦ። ምንም ክፍሊት ዘይብሉ ናይ ኦክስጅን ፈውሲ።",
    rating: 98,
    isVerified: true
  },
  {
    id: "sodere_springs",
    name: "Sodere Hot Springs",
    category: "nature",
    priceRange: "low",
    costText: "120 ETB entry",
    locations: ["Sodere, near Adama"],
    specialPromo: "Includes free mineral pool bath.",
    descEn: "Traditional mineral volcanic hot springs for arthritis, stress relief, and muscle healing.",
    descAm: "ለአርትራይተስ፣ ለውጥረት እና ለጡንቻ መላላት የሚጠቅም ባህላዊ የሙቅ 温泉 ምንጮች።",
    descOm: "Hora Soderee oo'aa fi fayyaa lafee fi qaamaaf ta'u.",
    descTi: "ባህላዊ ውዑይ ማይ ፈልፋሊ ሶደረ ንውጥረት ሰብነትን ቁርጥማትን።",
    rating: 89,
    isVerified: false
  }
];
