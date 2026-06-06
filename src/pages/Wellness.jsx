import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { EXTRA_TRANSLATIONS } from '../utils/extraTranslations';
import { dbService } from '../utils/firebase';
import { PROFESSIONS, LIFE_STAGES, HEALTH_CONDITIONS } from '../utils/constants';
import { Zap, Clock, Award, Sparkles, User, ShieldAlert } from 'lucide-react';

const FORM_TEXTS = {
  en: {
    profileTitle: "My Wellness Profile Setup",
    profileDesc: "Adjust your details below to instantly customize your habits, routines, and AI insights.",
    professionLabel: "Select Profession",
    ageLabel: "Select Life Stage / Group",
    healthLabel: "Health Condition",
    goalLabel: "Primary Wellness Goal",
    saveProfile: "Save Profile Settings",
    synced: "Profile Synced Globally ✓",
    noneSelected: "None (General Health)"
  },
  am: {
    profileTitle: "የእኔ ጤና መገለጫ ማስተካከያ",
    profileDesc: "ልምዶችዎን፣ የዕለት ተዕለት ተግባራትዎን እና የ-AI ምክሮችን ወዲያውኑ ለማበጀት ዝርዝሮችዎን ከታች ያስተካክሉ።",
    professionLabel: "ሙያ ይምረጡ",
    ageLabel: "የሕይወት ደረጃ ይምረጡ",
    healthLabel: "የጤና ሁኔታ",
    goalLabel: "ዋና የጤና ግብ",
    saveProfile: "የመገለጫ ምርጫዎችን አስቀምጥ",
    synced: "መገለጫዎ ተቀምጧል ✓",
    noneSelected: "ምንም (አጠቃላይ ጤና)"
  },
  om: {
    profileTitle: "Qophii Profile Fayyaa Koo",
    profileDesc: "Amaloota kee, tajaajiloota guyyaa fi gorsa AI dhuunfeessuuf odeeffannoo kee gadii sirreessi.",
    professionLabel: "Hojii Filadhu",
    ageLabel: "Sadarkaa Umrii Filadhu",
    healthLabel: "Haala Fayyaa",
    goalLabel: "Kaayyoo Fayyaa Guddaa",
    saveProfile: "Qophii Profile Ol-kaa'i",
    synced: "Profile Mirkanaa'eera ✓",
    noneSelected: "Hin qabu (Fayyaa Waliigalaa)"
  },
  ti: {
    profileTitle: "ናይ ጥዕና መገለጫይ ምትዕርራይ",
    profileDesc: "ዕለታዊ ልምድታትኩም፣ ናይ ጥዕና መደብኩምን ናይ AI ምኽርታትኩምን ንምድላው ዝርዝርኩም ኣብ ታሕቲ ኣተዓራርዩ።",
    professionLabel: "ሞያ ምረጹ",
    ageLabel: "ዕድመ ምረጹ",
    healthLabel: "ኩነታት ጥዕና",
    goalLabel: "ቀንዲ ናይ ጥዕና ዕላማ",
    saveProfile: "ናይ መገለጫ ምርጫታት ኣዕቅብ",
    synced: "መገለጫ ተዓቂቡ ኣሎ ✓",
    noneSelected: "ምንም (ሓፈሻዊ ጥዕና)"
  }
};

// Dynamic Routine Content Mapping based on user profile entries
const ROUTINE_MAP = {
  morning: {
    pregnancy: {
      en: "Gentle morning stretching, folic acid intake, and warm linseed (telba) tea for nausea.",
      am: "ቀላል የጧት መወጠር ልምምድ፣ የፎሊክ አሲድ መውሰድ፣ እና የጥዋት ማቅለሽለሽ ለመቀነስ የሞቀ ተልባ ሻይ መጠጣት።",
      om: "Sochii laafaa, asidii foolikii fudhachuu fi shayi telbaa oo'aa dhuguu.",
      ti: "ቀሊል ናይ ንግሆ ምዝርጋሕ፣ ፎሊክ ኣሲድ ምውሳድ፣ ማቅለሽለሽ ንምንካይ ድማ ውዑይ ተልባ ሻሂ ምስታይ።"
    },
    elderly: {
      en: "Gentle chair mobility exercises followed by warm spiced ginger tea to ease joints.",
      am: "በወንበር ላይ የሚሰሩ ቀላል የመገጣጠሚያ እንቅስቃሴዎች፣ በመቀጠል መገጣጠሚያን ለማፍታት የዝንጅብል ሻይ መጠጣት።",
      om: "Sochii qaamaa teessuma irraa fi shayi zinjibilaa oo'aa miseensa qaamaa furan dhuguu.",
      ti: "ኣብ ኮፍ መበሊ ዝግበሩ ቀሊል ምንቅስቓሳት፣ ቀጺሉ መገጣጠሚ ንምፍታሕ ውዑይ ጂንጅብል ሻሂ ምስታይ።"
    },
    diabetes: {
      en: "Check fasting blood sugar. Have a high-protein teff genfo breakfast to avoid glycemic spikes.",
      am: "የስኳር መጠንዎን ይለኩ። የስኳር መጠን ድንገት እንዳይጨምር ከፍተኛ ፕሮቲን ያለው የጠፍ ገንፎ ይመገቡ።",
      om: "Sukkaara kee laali. Ciree genfo xaafii proteena qabu nyaadhu.",
      ti: "መጠን ሽኮርኩም ለክዑ። መጠን ሽኮር ንምቁጽጻር ልዑል ፕሮቲን ዘለዎ ናይ ጣፍ ገንፎ ተመገቡ።"
    },
    labor: {
      en: "Protect your back. Do 5 minutes of dynamic hamstring and lower-back stretches before work.",
      am: "ጀርባዎን ይጠብቁ። ስራ ከመጀመርዎ በፊት የ5 ደቂቃ የጀርባና የእግር መለጠጥ ስፖርት ያድርጉ።",
      om: "Dugda kee eegi. Hojiin dura daqiiqaa 5 sochii stretching dugdaa fi miilaa godhi.",
      ti: "ሕቆኹም ሓልዉ። ስራሕ ቅድሚ ምጅማርኩም ናይ 5 ደቒቕ ናይ ምዝርጋሕ ስፖርት ግበሩ።"
    },
    medical: {
      en: "Perform a 4-minute box-breathing session to ground your nervous system before rounds.",
      am: "ክሊኒካዊ ስራ ከመጀመርዎ በፊት የነርቭ ስርዓትዎን ለማረጋጋት የ4 ደቂቃ የሳጥን ትንፋሽ ልምምድ ያድርጉ።",
      om: "Hojii dura daqiiqaa 4 hargansuu box-breathing gochuun sammuu kee tasgabeessi.",
      ti: "ስራሕ ቅድሚ ምጅማርኩም ናይ 4 ደቒቕ ናይ ምስትንፋስ ልምምድ ብምግባር ኣእምሮኹም ኣረጋግኡ።"
    },
    office: {
      en: "Start with neck rolls and shoulder shrugs to relieve muscle tension before screen time.",
      am: "የኮምፒውተር ስራ ከመጀመርዎ በፊት የአንገትና የትከሻ ጡንቻዎችን ለማፍታት ቀላል ስፖርት ያድርጉ።",
      om: "Iskriiniin dura sochii mormaa fi gateettii gochuun dadhabbi hir'isi.",
      ti: "ስክሪን ቅድሚ ምጅማርኩም ናይ ክሳድን መንኩብን ጭዋዳታት ንምፍታሕ ቀሊል ስፖርት ግበሩ።"
    },
    default: {
      en: "Start your morning with a 10-minute focus meditation and high-fiber teff genfo breakfast.",
      am: "የጧት ቀንን በ10 ደቂቃ ማሰላሰልና ከፍተኛ ፋይበር ባለው የጠፍ ገንፎ ቁርስ ይጀምሩ።",
      om: "Daqiiqaa 10 marii sammuu fi ciree genfo xaafii fayyaa qabuun jalqabi.",
      ti: "ናይ ንግሆ መዓልትኹም ብ10 ደቒቕ ምስትንፋስን ልዑል ጸርጊ ዘለዎ ጣፍ ገንፎን ጀምሩ።"
    }
  },
  afternoon: {
    diabetes: {
      en: "Measure blood sugar post-meal. Combine lunch with red lentils (misir wot) for high fiber.",
      am: "ከምሳ በኋላ የስኳር መጠንዎን ይለኩ። ከፍተኛ ፋይበር ለማግኘት ምሳዎን ከቀይ ምስር ወጥ ጋር ያድርጉ።",
      om: "Nyaata booda sukkaara kee laali. Nyaata misira diimaa dabaladhu.",
      ti: "ድሕሪ ምሳ መጠን ሽኮርኩም ለክዑ። ልዑል ጻዕር ንምርኻብ ምስ ምስር ወጽ ተመገቡ።"
    },
    hypertension: {
      en: "Do 5 minutes of deep slow exhalation to drop pressure. Eat unsalted gomen (collards).",
      am: "የደም ግፊትን ለመቀነስ የ5 ደቂቃ የዝግታ ትንፋሽ ልምምድ ያድርጉ። ጨው የሌለው ጎመን ይመገቡ።",
      om: "Hargansuu gadi-fagoo gochuun dhiibbaa dhiigaa tasgabeessi. Gomen soogidda hin qabne nyaadhu.",
      ti: "ጸቕጢ ደም ንምንካይ ናይ 5 ደቒቕ ምስትንፋስ ልምምድ ግበሩ። ጨው ዘይብሉ ቆስጣ ብልዑ።"
    },
    anemia: {
      en: "Eat iron-rich shiro wot or beef kitfo with squeezed fresh lemon (vitamin C) to boost absorption.",
      am: "የብረት ንጥረ ነገር ለመምጠጥ በብረት የበለፀገውን ሽሮ ወይም ክትፎ ላይ ሎሚ ጨምቀው ይመገቡ።",
      om: "Shiroo fi kitfoo ayireenii qabu irratti lemon coomquun nyaadhu.",
      ti: "ናይ ሓጺን ንጥረ ነገር ንምውሳድ ኣብ ሽሮ ወይ ክትፎ ሎሚ ብምጭማቕ ተመገቡ።"
    },
    obesity: {
      en: "Practice portion control: load half your plate with gomen. Take a brisk 20-minute walk.",
      am: "የምግብ መጠንዎን ይቆጣጠሩ፡ ግማሹን ሳህን በጎመን ይሙሉው። የ20 ደቂቃ ፈጣን የእግር ጉዞ ያድርጉ።",
      om: "Hamma nyaataa hir'isi: walakkaa saahinii kee gomeniin guuti. Daqiiqaa 20 deemi.",
      ti: "መጠን መግብኹም ተቖጻጸሩ፡ ፍርቂ ጻሕሊ ብቆስጣ ምልእዎ። ናይ 20 ደቒቕ ቅልጡፍ እግሪ ጉዞ ግበሩ።"
    },
    office: {
      en: "Apply the 20-20-20 screen rule (look 20 feet away for 20 seconds). Take a walk for shai.",
      am: "የ20-20-20 ህግን ይተግብሩ (በየ20 ደቂቃው ለ20 ሰከንድ 20 ሜትር ርቀት ይመልከቱ)። በእግር ሻይ ለመጠጣት ይሂዱ።",
      om: "Siriisii iskrinii 20-20-20 fayyadami. Deemii shayi dhugi.",
      ti: "ናይ 20-20-20 ስክሪን ሕጊ ተዓጠቑ። ብእግሪ ኬድኩም ሻሂ ስተዩ።"
    },
    labor: {
      en: "Rest in the shade during peak heat. Hydrate with traditional barley water (shalo).",
      am: "ፀሀይ በረታ በሚልበት ሰዓት በጥላ ስር ያርፉ። ባህላዊ የገብስ ውሃ (ሻሎ) በመጠጣት ይበረቱ።",
      om: "Sa'aatii ho'aa gaaddisa jalatti boqadhu. Bishaan garbuu (shalo) dhugi.",
      ti: "ጸሓይ ኣብ ዝበርትዓሉ ሰዓት ኣብ ትሕቲ ጽላል ዕረፉ። ባህላዊ ናይ ገብስ ማይ (ሻሎ) ስተዩ።"
    },
    default: {
      en: "Take a 15-minute walking break after lunch. Hydrate with 1L water to cope with altitude.",
      am: "ከምሳ በኋላ የ15 ደቂቃ የእግር ጉዞ ያድርጉ። 1 ሊትር ውሃ በመጠጣት የሰውነትዎን እርጥበት ይጠብቁ።",
      om: "Daqiiqaa 15 deeminsa miilaa raawwatti. Bishaan litira 1 dhugi.",
      ti: "ድሕሪ ምሳ ን15 ደቒቕ ብእግሪ ተጓዙ። 1 ሊትሮ ማይ ምስታይ ኣይትረስዑ።"
    }
  },
  evening: {
    youth: {
      en: "Turn off all screens by 9:00 PM. Practice a 3-minute balloon-breathing visualization.",
      am: "ማታ 3 ሰዓት ላይ ሁሉንም የስልክ ስክሪኖች ያጥፉ። የ3 ደቂቃ የፊኛ ትንፋሽ ማሰላሰልን ይለማመዱ።",
      om: "Sa'aatii 3tti iskrinii hundumaa dhaamsi. Hargansuu daqiiqaa 3 raawwadhu.",
      ti: "ምሸት ሰዓት 3:00 ስልኪ ኣጥፊእኩም ደቂሱ። ናይ 3 ደቒቕ ናይ ፊኛ ምስትንፋስ ልምምድ ግበሩ።"
    },
    elderly: {
      en: "Connect with family or edir neighbors. Practice slow 4-7-8 breathing to prepare for sleep.",
      am: "ከቤተሰብ ወይም ከእድር ጎረቤቶች ጋር ይገናኙ። ለመተኛት ለመዘጋጀት የ4-7-8 የትንፋሽ ልምምድ ያድርጉ።",
      om: "Maatii fi ollaa kee qunnami. Hargansuu 4-7-8 godhi rafi.",
      ti: "ምስ ቤተሰብ ወይ መዛኑ ተራኸቡ። ንምድቃስ ንምድላው ናይ 4-7-8 ምስትንፋስ ልምምድ ግበሩ።"
    },
    medical: {
      en: "Perform a post-shift warm water foot bath to release tension. Do a quick gratitude check.",
      am: "ከረጅም የስራ ሰዓት በኋላ ውጥረትን ለመቀነስ እግርዎን በሞቀ ውሃ ይዘፍዝፉ። ያደረጉትን መልካም ነገር ያስቡ።",
      om: "Hojii booda miila kee bishaan oo'aan dhiqadhu. Galata galchi.",
      ti: "ድሕሪ ነዊሕ ስራሕ ጸቕጢ ንምንካይ እግርኹም ብውዑይ ማይ ሕጸብዎ። ምስጋና ግበሩ።"
    },
    labor: {
      en: "Apply muscle relaxation stretches on shoulders and back. Sleep on a firm mattress.",
      am: "በትከሻዎና በጀርባዎ ላይ የጡንቻ ማፍታታት ልምምዶችን ያድርጉ። ምቹ በሆነ ፍራሽ ላይ ይተኙ።",
      om: "Sochii dadhabbi qaamaa gateettii fi dugdaa godhi. Matirasii gaariirra rafi.",
      ti: "ኣብ መንኩብኩምን ሕቆኹምን ናይ ጭዋዳታት ምዝርጋሕ ግበሩ። ምቹእ ዝኾነ ዓራት ደቂሱ።"
    },
    default: {
      en: "Review your day in a screen-free environment. Do 5 minutes of abdominal breathing.",
      am: "ስልክና ስክሪኖችን በማጥፋት የዕለት ውሎዎን ይገምግሙ። የ5 ደቂቃ የሆድ ውስጥ ትንፋሽ ልምምድ ያድርጉ።",
      om: "Iskrinii dhaamsi guyyaa kee xiinxali. Daqiiqaa 5 hargansuu garaa gochuun boqadhu.",
      ti: "ስልኪ ኣጥፊእኩም ናይ መዓልቲ ውዕሎኹም ይገምግሙ። ን5 ደቒቕ ናይ ከብዲ ምስትንፋስ ልምምድ ግበሩ።"
    }
  }
};

// Complete Profession Category Mapping
const getProfCategory = (profId) => {
  if (['doctors', 'nurses', 'pharmacists', 'therapists'].includes(profId)) return 'medical';
  if (['engineers', 'lawyers', 'bankers', 'scientists', 'politicians', 'directors'].includes(profId)) return 'office';
  if (['teachers'].includes(profId)) return 'education';
  if (['factory_workers', 'drivers', 'construction', 'domestic_workers'].includes(profId)) return 'labor';
  if (['farmers', 'market_vendors'].includes(profId)) return 'agriculture';
  if (['artists', 'journalists', 'chefs', 'textile_workers'].includes(profId)) return 'creative';
  if (['athletes'].includes(profId)) return 'sports';
  if (['students'].includes(profId)) return 'students';
  return 'general';
};

// Dynamic Insights Content Mapping based on user profile entries
const PROFESSION_INSIGHTS = {
  medical: {
    title: { en: "🩺 Clinical Burnout Defense", am: "🩺 የክሊኒካዊ ድካም መከላከያ", om: "🩺 Gorsa Dadhabbi Ogeessa Yaalaa", ti: "🩺 ምክልኻል ናይ ክሊኒክ ድካም" },
    text: {
      en: "Long shifts increase clinical stress by 40%. Taking 3-minute box-breathing breaks between patients lowers stress by 25%.",
      am: "ረጅም የፈረቃ ስራዎች ድካምን በ40% ይጨምራሉ። በታካሚዎች መሀል የ3 ደቂቃ የትንፋሽ እረፍት መውሰድ ጭንቀትን በ25% ይቀንሳል።",
      om: "Hojiin dheeraan dadhabbi %40 dabala. Daqiiqaa 3 hargansuun dhiphina %25 hir'isa.",
      ti: "ነዊሕ ሰዓታት ስራሕ ድካም ብ40% ይውስኽ። ኣብ መንጎ ሕሙማት ናይ 3 ደቒቕ ምስትንፋስ ምክልኻል ጸቕጢ ብ25% ይንክዮ።"
    }
  },
  office: {
    title: { en: "💻 Screen-Fatigue & Ergonomic Care", am: "💻 የስክሪን-ድካም እና የሰውነት አቀማመጥ እንክብካቤ", om: "💻 Dhibee Iskrinii fi Qophii Gateettii", ti: "💻 ምክልኻል ድካም ስክሪንን ሓልዮት ኣካላትን" },
    text: {
      en: "Continuous screen usage causes eye strain. Keep the monitor at eye level and use the 20-20-20 rule to reduce fatigue by 30%.",
      am: "ቀጣይነት ያለው የስክሪን አጠቃቀም አይን ያደክማል። ስክሪኑን በአይን ደረጃ በማስተካከል እና የ20-20-20 ህግን በመጠቀም ድካምን በ30% ይቀንሱ።",
      om: "Iskriiniin yeroo dheeraa ija miidha. Siriisii 20-20-20 fayyadamii dadhabbi %30 hir'isi.",
      ti: "ቀጻሊ ስክሪን ምርኣይ ንዓይኒ የድክም እዩ። ንዕረፍቲ ዓይኒ ናይ 20-20-20 ሕጊ ብምጥቃም ድካም ብ30% ቀንሱ።"
    }
  },
  education: {
    title: { en: "🏫 Teacher Stress & Vocal Care", am: "🏫 የድምፅ እንክብካቤ እና የመምህራን ጭንቀት ቁጥጥር", om: "🏫 Hordoffii Sagalee fi Dhiibbaa Barsiisotaa", ti: "🏫 ምክልኻል ጸቕጢ መምህራንን ሓልዮት ድምጽን" },
    text: {
      en: "Teaching requires high voice volume and standing hours. Hydrate constantly with lukewarm water to protect vocal cords and rest your legs.",
      am: "ማስተማር ከፍተኛ ድምፅ እና ረጅም መቆምን ይጠይቃል። የድምፅ አውታርዎን ለመጠበቅ እና እግርዎን ለማሳረፍ ለብ ያለ ውሃ ሁልጊዜ ይጠጡ።",
      om: "Barsiisuun sagalee guddaa fi dhaabbachuu gaafata. Bishaan oo'aa dhuguun sagalee kee eegi.",
      ti: "ምምሃር ልዑል ድምጽን ደው ምባልን ይሓትት። ንምክልኻል ድምጽኹምን ንዕረፍቲ እግርኹምን ለብ ዝበለ ማይ ምስታይ ኣይትረስዑ።"
    }
  },
  labor: {
    title: { en: "🔨 Physical Labor Musculoskeletal Recovery", am: "🔨 የአካላዊ ስራ የጡንቻና አጥንት ማገገሚያ", om: "🔨 Gocha Humnaa fi Deebii Qaamaa", ti: "🔨 ምሕዋይ ጭዋዳታትን ዓጽምን ኣካላዊ ስራሕ" },
    text: {
      en: "Heavy lifting stresses your lower back and joints. Dynamic warm-ups protect your spine. Ensure adequate sleep for muscle tissue repair.",
      am: "ከባድ ዕቃ ማንሳት ወገብንና መገጣጠሚያን ያደክማል። የሰውነት ማፍታታት እንቅስቃሴ ማድረግ አከርካሪዎን ይጠብቃል። ለጡንቻዎች ማገገም በቂ እንቅልፍ ይተኙ።",
      om: "Meeshaa ulfaataa lifts gochuun dugda miidha. Hojiin dura stretching godhi, hiriiba gaarii rafi.",
      ti: "ከበድቲ ኣቕሑ ምልዓል ንሕቆን መገጣጠሚታትን የድክም እዩ። ቅድሚ ስራሕ ምዝርጋሕ ምግባር ሕቆኹም ይከላኸል። ንምሕዋይ ጭዋዳታት ድማ እኹል ድቃስ ይደልዩ።"
    }
  },
  agriculture: {
    title: { en: "🌾 Agriculture Heat Hydration & Joint Care", am: "🌾 የግብርና የፀሐይ እርጥበት እና የመገጣጠሚያ እንክብካቤ", om: "🌾 Gorsa Hojii Qonnaa fi Bishaan Qaamaa", ti: "🌾 ሓልዮት ጸሓይን ማይን ንሓረስቶት" },
    text: {
      en: "Working under direct sunlight requires high fluid intake. Drink traditional shalo water and stretch legs to prevent chronic joint fatigue.",
      am: "በቀጥታ ፀሐይ ስር መስራት ከፍተኛ የፈሳሽ ፍጆታ ይጠይቃል። ባህላዊ የገብስ ውሃ (ሻሎ) ይጠጡ እና መገጣጠሚያዎ እንዳይደክም እግርዎን ያፍቱ።",
      om: "Aduu jala hojjechuun bishaan gaafata. Bishaan garbuu (shalo) dhugi, miila kee stretch godhi.",
      ti: "ኣብ ትሕቲ ጸሓይ ምስራሕ ልዑል ፈሳሺ ምስታይ ይሓትት። ባህላዊ ናይ ገብስ ማይ (ሻሎ) ስተዩ፣ እግርኹም ድማ ዘርጉሕዎ።"
    }
  },
  creative: {
    title: { en: "🎨 Creative Flow & Mind Reset", am: "🎨 የፈጠራ አእምሮ ማደሻ ዘዴ", om: "🎨 Kalaqa Yaadaa fi Boqonnaa Sammuu", ti: "🎨 ኣእምሮ ምሕዳስ ንፈጠርቲ ሰባት" },
    text: {
      en: "Creative jobs consume immense emotional energy. Use 5-minute silent breaks every few hours to prevent mental block and recharge focus.",
      am: "የፈጠራ ስራዎች ከፍተኛ የአእምሮ ኃይል ይወስዳሉ። የአእምሮ መዘጋትን ለመከላከል በየጥቂት ሰዓታት የ5 ደቂቃ የጸጥታ እረፍት ይውሰዱ።",
      om: "Kalaqi humna sammuu guutuu gaafata. Sa'aatii muraasa booda daqiiqaa 5 callisi boqadhu.",
      ti: "ናይ ፈጠራ ስራሓት ልዑል ኣእምሮኣዊ ጸርጊ ይወስዱ። ኣእምሮኹም ንምሕዳስ ኣብ መንጎ ስራሕ ናይ 5 ደቒቕ ናይ ጸጥታ ዕረፍቲ ውሰዱ።"
    }
  },
  sports: {
    title: { en: "🏃 Athlete Muscle Restoration & Mental Grit", am: "🏃 የአትሌት የጡንቻ ማገገሚያ እና የስነ-ልቦና ጥንካሬ", om: "🏃 Gorsa Ispoortii fi Deebii Qaamaa", ti: "🏃 ምሕዋይ ጭዋዳታት ንስፖርተኛታት" },
    text: {
      en: "High physical output requires optimal muscle recovery. Active stretching combined with iron-rich foods helps reduce soreness and improve stamina.",
      am: "ከፍተኛ አካላዊ እንቅስቃሴ ለጡንቻዎች ፈጣን ማገገም ይፈልጋል። የብረት ንጥረ ነገር ያላቸው ምግቦችን መመገብ ድካምን በመቀነስ ጥንካሬን ይጨምራል።",
      om: "Sochii guddaan boqonnaa proteena qabu gaafata. Nyaata ayireenii qabu nyaadhu.",
      ti: "ልዑል ኣካላዊ ምንቅስቓስ ቅልጡፍ ምሕዋይ ጭዋዳታት ይሓትት። ናይ ሓጺን ንጥረ ነገር ዘለዎም ምግቢ ምምጋብ ድማ ድካም ይንክይ።"
    }
  },
  students: {
    title: { en: "📚 Academic Anxiety & Screen Fatigue Defense", am: "📚 የትምህርት ጭንቀት እና የስክሪን ድካም መከላከያ", om: "📚 Yaaddoo Barnootaa fi Iskrinii Ijaa", ti: "📚 ምክልኻል ጸቕጢ ትምህርትን ድካም ዓይንን" },
    text: {
      en: "Exam stress disrupts sleep patterns. Turn off your screen at least 1 hour before sleeping and do box breathing to increase focus.",
      am: "የፈተና ጭንቀት እንቅልፍን ይረብሻል። ከመተኛትዎ ቢያንስ 1 ሰዓት በፊት ስልክዎን ያጥፉ እና ትኩረትዎን ለመጨመር የሳጥን ትንፋሽ ያድርጉ።",
      om: "Yaaddoon qormaataa hiriiba balleessa. Hiriiba dura sa'aatii 1 iskrinii dhaamsi.",
      ti: "ናይ ፈተና ጸቕጢ ድቃስ ይረብሽ እዩ። ቅድሚ ምድቃስኩም 1 ሰዓት ኣቐዲምኩም ስልኪ ኣጥፍኡ፣ ናይ ምስትንፋስ ልምምድ ድማ ግበሩ።"
    }
  },
  general: {
    title: { en: "🏃 Habit Optimization Guide", am: "🏃 የልምድ ማሻሻያ እና የጤና ምክር", om: "🏃 Madaallii Hiriibaa fi Fayyaa", ti: "🏃 መምርሒ ምምሕያሽ ልምдታት" },
    text: {
      en: "Your daily habits are strongly linked to your overall sense of peace. Walk for 15 minutes to reduce daily stress hormones.",
      am: "የዕለት ተዕለት ልምዶችዎ ከውስጣዊ ሰላምዎ ጋር በጥብቅ የተያያዙ ናቸው። የዕለት ተዕለት ጭንቀትን ለመቀነስ በቀን ለ15 ደቂቃ በእግር ይጓዙ።",
      om: "Gocha guyyaa keetii nagaa kee wajjin wal-qabata. Daqiiqaa 15 deemii dhiphina hir'isi.",
      ti: "ዕለታዊ ልምድታትኩም ምስ ናይ ውሽጢ ሰላምኩም ዝተሓሓዝ እዩ። ንጭንቀት ንምንካይ መዓልታዊ ን15 ደቒቕ ብእግሪ ተጓዙ።"
    }
  }
};

const CLINICAL_INSIGHTS = {
  diabetes: {
    title: { en: "🩸 Diabetes Glycemic Balance", am: "🩸 የስኳር በሽታና የአመጋገብ ሚዛን", om: "🩸 Balansii Sukkaara Fayyaa", ti: "🩸 ሕማም ሽኮርን ሚዛን መግብን" },
    text: {
      en: "Teff Injera combined with red lentil stew (misir wot) releases energy slowly and keeps your glycemic spikes low. A post-meal walk drops blood sugar by 12%.",
      am: "የጠፍ እንጀራ ከምስር ወጥ ጋር መመገብ የደም ስኳር መጠንዎን ሳይጨምር ኃይል ይሰጥዎታል። ከተመገቡ በኋላ በእግር መጓዝ የደም ስኳርን በ12% ይቀንሳል።",
      om: "Nyaata xaafii fi misiraa sukkaara hin dabalu. Nyaata booda deemuun sukkaara %12 hir'isa.",
      ti: "ጣፍ እንጀራ ምስ ምስር ወጽ ምምጋብ መጠን ሽኮር ከይወሰኸ ሓይሊ ይህብ። ድሕሪ መግቢ ብእግሪ ምኻድ ድማ ሽኮር ብ12% ይንክዮ።"
    }
  },
  hypertension: {
    title: { en: "🧂 Sodium-Pressure Correlation", am: "🧂 የጨው ይዘትና የደም ግፊት", om: "🧂 Gorsa Dhiibbaa Dhiigaa fi Soogidda", ti: "🧂 መጠን ጨውን ጸቕጢ ደምን" },
    text: {
      en: "Your cardiovascular health improves when sodium intake is low. Enjoy Gomen (collard greens) which contains high potassium that directly counters sodium effects.",
      am: "የጨው ፍጆታን መቀነስ ለልብና ደም ቧንቧ ጤናዎ በጣም ወሳኝ ነው። ከፍተኛ ፖታሺየም የያዘውን ጎመን መመገብ የጨውን ጎጂ ውጤት በቀጥታ ይከላከላል።",
      om: "Soogidda hir'isuun dhiibbaa dhiigaa hir'isa. Gomen potassium qabu nyaadhu soogidda qolachuuf.",
      ti: "ምእላይ ጨው ንልቢ ኣዝዩ ወሳኒ እዩ። ልዑል ፖታሲየም ዘለዎ ቆስጣ ምምጋብ ናይ ጨው ጉድኣት ብቐጥታ ይከላኸል።"
    }
  },
  anemia: {
    title: { en: "🥩 Anemia & Iron Absorption", am: "🥩 የደም ማነስና የብረት ንጥረ ነገር", om: "🥩 Ayireenii fi Hir'ina Dhiigaa", ti: "🥩 ሕጽረት ደምን ናይ ሓጺን ንጥረ ነገርን" },
    text: {
      en: "Maximize plant-based iron from shiro and lentils by squeezing fresh lemon. Avoid drinking coffee or tea within 1 hour of meals, as they block iron absorption.",
      am: "ከሽሮና ከምስር የሚገኘውን የብረት (Iron) ንጥረ ነገር ለመምጠጥ ሎሚ ይጨምቁባቸው። ከተመገቡ በኋላ ከ1 ሰዓት በፊት ቡና ወይም ሻይ አይጠጡ፤ የብረት ንጥረ ነገር መምጠጥን ያግዳልና።",
      om: "Shiroo fi misira irratti lemon coomqi ayireenii argachuuf. Nyaata booda bun ykn shayi hin dhugin.",
      ti: "ካብ ሽሮን ምስርን ዝርከብ ሓጺን ንምውሳድ ሎሚ ጨምቑሉ። ድሕሪ መግቢ ሻሂ ወይ ቡና ኣይትስተዩ፤ ናይ ሓጺን ምስሓብ ይዓግት እዩ።"
    }
  },
  obesity: {
    title: { en: "🥗 Metabolic Portion Management", am: "🥗 የሜታቦሊክ ምግብ መጠን ቁጥጥር", om: "🥗 Bulchiinsa Hamma Nyaataa", ti: "🥗 ምቁጽጻር መጠን መግቢ ንውፍረት" },
    text: {
      en: "Overweight increases cardiac load. Use smaller serving plates. Fill half your plate with fiber-rich gomen to stay full longer without high calories.",
      am: "ከመጠን በላይ ውፍረት የልብ ጫናን ይጨምራል። አነስተኛ ሰሃን ይጠቀሙ። በካሎሪ ሳይሞሉ ረጅም ሰዓት ጠግበው ለመቆየት ግማሽ ሳህንዎን በጎመን ይሙሉው።",
      om: "Ufata qaamaa guddaan onnee miidha. Saahinii xiqqaa fayyadami. Saahinii walakkaa gomeniin guuti.",
      ti: "ምውፋር ጸቕጢ ልቢ ይውስኽ እዩ። ንኣሽቱ ጻሕሊ ተጠቐሙ። ከይጸገብኩም ንነዊሕ ሰዓት ንምጽናሕ ፍርቂ ጻሕልኹም ብቆስጣ ምልእዎ።"
    }
  },
  pregnancy_1st: {
    title: { en: "🤰 Maternal Prenatal Vitality (1st Trimester)", am: "🤰 የነፍሰ ጡር እናቶች የጤና እንክብካቤ (የመጀመሪያው ባለ 3 ወር)", om: "🤰 Ulfa (Tirimestera 1ffaa) Fayyaa Haadhaa", ti: "🤰 ሓልዮት ጥንሲ (ቀዳማይ ትሪሚስተር)" },
    text: {
      en: "Your body is building new life. Folic acid, iron-rich stews (misir, shiro), and adequate calcium from ayib are vital. Keep hydrated and do not stand too long.",
      am: "ሰውነትዎ አዲስ ህይወት እየፈጠረ ነው። ፎሊክ አሲድ፣ በብረት የበለፀጉ ምግቦች (ምስር፣ ሽሮ)፣ እና ካልሲየም ከአይብ በጣም ወሳኝ ናቸው። በቂ ውሃ ይጠጡ እና ብዙ አይቁሙ።",
      om: "Qaama kee jireenya haaraa ijaaraa jira. Asidii foolikii, misira, shiroo fi ayibii nyaadhu. Bishaan dhugi.",
      ti: "ሰብነትኩም ሓድሽ ህይወት ይፈጥር ኣሎ። ፎሊክ ኣሲድ፣ ናይ ሓጺን ምግቢ (ምስር፣ ሽሮ)፣ ካልሲየም ካብ ኣይቢ ኣዝዩ ወሳኒ እዩ። ማይ ስተዩ፣ ብዙሕ ደው ኣይትበሉ።"
    }
  },
  pregnancy_2nd: {
    title: { en: "🤰 Maternal Prenatal Vitality (2nd Trimester)", am: "🤰 የነፍሰ ጡር እናቶች የጤና እንክብካቤ (ሁለተኛው ባለ 3 ወር)", om: "🤰 Ulfa (Tirimestera 2ffaa) Fayyaa Haadhaa", ti: "🤰 ሓልዮት ጥንሲ (ካልኣይ ትሪሚስተር)" },
    text: {
      en: "Your baby is growing fast. Focus on calcium intake to support bone density and consume high protein stews. Continue gentle daily walking to lower blood pressure.",
      am: "ህፃኑ በፍጥነት እያደገ ነው። የአጥንት ጥንካሬን ለመደገፍ በካልሲየም ላይ ያተኩሩ እና ከፍተኛ የፕሮቲን ወጦችን ይመገቡ። የደም ግፊትን ለመቀነስ ቀላል የዕለት ተዕለት የእግር ጉዞ ያድርጉ።",
      om: "Daa'imni kee saffisaan guddachaa jira. Lafee gargaaruuf calcium dabaladhu. Deeminsa miilaa laafaa godhi.",
      ti: "ህጻን ብቕልጡፍ ይዓቢ ኣሎ። ንዓጽሚ ንምድጋፍ ኣብ ካልሲየም ኣተኩሩ፣ ልዑል ፕሮቲን ዘለዎም ወጽ ተመገቡ። ንደም ብዝሒ ንምንካይ ቀሊል እግሪ ጉዞ ግበሩ።"
    }
  },
  pregnancy_3rd: {
    title: { en: "🤰 Maternal Prenatal Vitality (3rd Trimester)", am: "🤰 የነፍሰ ጡር እናቶች የጤና እንክብካቤ (የመጨረሻው ባለ 3 ወር)", om: "🤰 Ulfa (Tirimestera 3ffaa) Fayyaa Haadhaa", ti: "🤰 ሓልዮት ጥንሲ (ሳልሳይ ትሪሚስተር)" },
    text: {
      en: "Prepare for birth. Elevate your feet to reduce swelling. Avoid heavy labor and do 4-4-4-4 box breathing to relieve anxiety and expand lung capacity.",
      am: "ለወሊድ ይዘጋጁ። እብጠትን ለመቀነስ እግርዎን ከፍ አድርገው ያስቀምጡ። ከባድ ስራዎችን ያስወግዱ እና ጭንቀትን ለመቀነስ የሳጥን ትንፋሽ ያድርጉ።",
      om: "Da'umsaaf qophaayi. Miila kee ol-qabi dhiita'uun haa hir'atu. Hojii ulfaataa dhiisi, box hargansuu gochuun yaaddoo hir'isi.",
      ti: "ንድሕሪ ወሊድ ተዳለዉ። እብጠት ንምንካይ እግርኹም ልዕል ኣብልዎ። ከበድቲ ስራሓት ኣወግዱ፣ ንጭንቀት ንምንካይ ድማ ምስትንፋስ ልምምድ ግበሩ።"
    }
  },
  breastfeeding: {
    title: { en: "🤱 Lactation Support & Postnatal Care", am: "🤱 ጡት ማጥባት እና ከወሊድ በኋላ እንክብካቤ", om: "🤱 Gorsa Harma Hoosisuu", ti: "🤱 ሓገዝ ምጥባውን ድሕሪ ወሊድ ሓልዮትን" },
    text: {
      en: "Lactation requires an extra 500 kcal daily. Consume high-calcium milk or ayib, drink plenty of water, and rest whenever the baby sleeps.",
      am: "ጡት ማጥባት በቀን ተጨማሪ 500 ካሎሪዎችን ይፈልጋል። ካልሲየም የበለፀጉ ወተት ወይም አይብ ይመገቡ፣ ብዙ ውሃ ይጠጡ፣ እና ህፃኑ ሲተኛ አብረው ያርፉ።",
      om: "Harma hoosisuun kaalorii 500 dabalata gaafata. Aannan ykn ayibii nyaadhu, bishaan dhugi.",
      ti: "ምጥባው መዓልታዊ ተወሳኺ 500 ካሎሪ ይሓትት። ካልሲየም ዘለዎ ጸባ ወይ ኣይቢ ተመገቡ፣ ብዙሕ ማይ ስተዩ፣ ህጻን ክድቅስ ከሎ ድማ ዕረፉ።"
    }
  },
  none: {
    title: { en: "🧘 Mental & Spiritual Resilience", am: "🧘 የአእምሮና መንፈሳዊ ጥንካሬ", om: "🧘 Cichoomina Ruuxaa fi Sammuu", ti: "🧘 ኣእምሮኣዊን መንፈሳዊን ጽንዓት" },
    text: {
      en: "Practicing traditional slow breathing protects your mind from anxiety. Your daily habits are strongly linked to your overall sense of peace.",
      am: "ባህላዊ የዝግታ ትንፋሽ ልምምድ ማድረግ አእምሮዎን ከጭንቀት ይጠብቃል። የእለት ተእለት ልምዶችዎ ከውስጣዊ ሰላምዎ ጋር በጥብቅ የተያያዙ ናቸው።",
      om: "Hargansuu suuta gochuun dhiphina hambisa. Gochi guyyaa keetii nagaa kee wajjin wal-qabata.",
      ti: "ባህላዊ ናይ ምስትንፋስ ልምምድ ምግባር ካብ ጭንቀት ይከላኸል። ዕለታዊ ልምድታትኩም ምስ ናይ ውሽጢ ሰላምኩም ዝተተሓሓዘ እዩ።"
    }
  }
};

export const Wellness = ({ currentLang, userProfile, onUpdateProfile }) => {
  const t = TRANSLATIONS[currentLang];
  const xt = EXTRA_TRANSLATIONS[currentLang] || EXTRA_TRANSLATIONS.en;
  const fTexts = FORM_TEXTS[currentLang] || FORM_TEXTS.en;
  
  // Trackers States
  const [sleepLog, setSleepLog] = useState("6-8hrs");
  const [movementLog, setMovementLog] = useState("Walking");
  const [hydrationLog, setHydrationLog] = useState("1-2L");
  const [loggedToday, setLoggedToday] = useState(false);
  const [streakCount, setStreakCount] = useState(3);
  const [showSyncBadge, setShowSyncBadge] = useState(false);
  
  // Breathing state
  const [breathState, setBreathState] = useState("Inhale"); // Inhale, Hold In, Exhale, Hold Out
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [breathCycle, setBreathCycle] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Helper translations for dropdowns
  const getProfessionLabel = (id) => {
    const p = PROFESSIONS.find(x => x.id === id);
    if (!p) return id;
    if (currentLang === 'am') return p.am;
    if (currentLang === 'om') return p.om || p.en;
    if (currentLang === 'ti') return p.ti || p.am || p.en;
    return p.en;
  };

  const getStageNameById = (id) => {
    const stage = LIFE_STAGES.find(s => s.id === id);
    if (!stage) return id;
    if (currentLang === 'am') return stage.nameAm;
    if (currentLang === 'om') return stage.nameOm;
    if (currentLang === 'ti') return stage.nameTi;
    return stage.nameEn;
  };

  const getConditionLabel = (id) => {
    if (id === 'none') return fTexts.noneSelected;
    const cond = HEALTH_CONDITIONS.find(c => c.id === id);
    if (!cond) return id;
    if (currentLang === 'am') return cond.am;
    if (currentLang === 'om') return cond.om || cond.en;
    if (currentLang === 'ti') return cond.ti || cond.am || cond.en;
    return cond.en;
  };

  // Play audio chime for transition feedback
  const playChime = (freq = 440) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn("Audio Context blocked:", e);
    }
  };

  // Breathing Box Timer: 4s Inhale, 4s Hold In, 4s Exhale, 4s Hold Out
  useEffect(() => {
    let timer;
    if (isBreathingActive) {
      playChime(523.25); // C5
      timer = setInterval(() => {
        setBreathSeconds(prev => {
          if (prev <= 1) {
            setBreathState(current => {
              let nextState;
              let nextFreq;
              if (current === "Inhale") {
                nextState = "Hold In";
                nextFreq = 587.33; // D5
              } else if (current === "Hold In") {
                nextState = "Exhale";
                nextFreq = 440.00; // A4
              } else if (current === "Exhale") {
                nextState = "Hold Out";
                nextFreq = 392.00; // G4
              } else {
                nextState = "Inhale";
                nextFreq = 523.25; // C5
                setBreathCycle(c => c + 1);
              }
              playChime(nextFreq);
              return nextState;
            });
            return 4; // Reset to 4 seconds
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathState("Inhale");
      setBreathSeconds(4);
      setBreathCycle(0);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive]);

  const getScaleAndTransition = () => {
    if (!isBreathingActive) {
      return {
        transform: 'scale(1.0)',
        transition: 'transform 1000ms cubic-bezier(0.4, 0, 0.2, 1), background-color 1000ms ease'
      };
    }
    if (breathState === "Inhale") {
      return {
        transform: 'scale(1.35)',
        transition: 'transform 4000ms linear, background-color 1000ms ease'
      };
    }
    if (breathState === "Hold In") {
      return {
        transform: 'scale(1.35)',
        transition: 'transform 1000ms ease, background-color 1000ms ease'
      };
    }
    if (breathState === "Exhale") {
      return {
        transform: 'scale(0.7)',
        transition: 'transform 4000ms linear, background-color 1000ms ease'
      };
    }
    return {
      transform: 'scale(0.7)',
      transition: 'transform 1000ms ease, background-color 1000ms ease'
    };
  };

  // 1. Dynamic Habit Form: Customized strictly according to active profile selections
  const getCustomHabitForm = () => {
    const habits = [];
    
    // Category 1: Sleep Tracker Customizations
    const profCat = getProfCategory(userProfile.profession);
    if (profCat === 'medical') {
      habits.push({
        id: "shift_sleep",
        label: currentLang === 'en' ? "🩺 Shift Recovery Sleep" : "🩺 የፈረቃ እረፍት እንቅልፍ",
        icon: "🛌",
        key: "sleep",
        options: [
          { value: "Under 6hrs", label: currentLang === 'en' ? "Under 6 hours (High Risk)" : "ከ6 ሰዓት በታች (ከፍተኛ አደጋ)" },
          { value: "6-8hrs", label: currentLang === 'en' ? "6-8 hours (Adequate)" : "ከ6-8 ሰዓት (በቂ)" },
          { value: "Over 8hrs", label: currentLang === 'en' ? "Over 8 hours (Excellent)" : "ከ8 ሰዓት በላይ (በጣም ጥሩ)" }
        ]
      });
    } else if (profCat === 'office') {
      habits.push({
        id: "office_sleep",
        label: currentLang === 'en' ? "💻 Screen-Rest Sleep" : "💻 ከስክሪን ርቆ የመተኛት ቆይታ",
        icon: "🛌",
        key: "sleep",
        options: [
          { value: "Under 6hrs", label: currentLang === 'en' ? "Under 6 hours (High strain)" : "ከ6 ሰዓት በታች (ከፍተኛ ውጥረት)" },
          { value: "6-8hrs", label: currentLang === 'en' ? "6-8 hours (Balanced)" : "ከ6-8 ሰዓት (ሚዛናዊ)" },
          { value: "Over 8hrs", label: currentLang === 'en' ? "Over 8 hours (Ideal)" : "ከ8 ሰዓት በላይ (በጣም ጥሩ)" }
        ]
      });
    } else if (userProfile.ageGroup === 'teenagers' || userProfile.ageGroup === 'students' || userProfile.ageGroup === 'children') {
      habits.push({
        id: "student_sleep",
        label: currentLang === 'en' ? "📚 Screen-Off Sleep" : "📚 ስልክ አጥፍቶ መተኛት",
        icon: "🛌",
        key: "sleep",
        options: [
          { value: "Under 6hrs", label: currentLang === 'en' ? "Under 6 hours (Screen fatigue)" : "ከ6 ሰዓት በታች (የስክሪን ድካም)" },
          { value: "6-8hrs", label: currentLang === 'en' ? "6-8 hours (Normal)" : "ከ6-8 ሰዓት (ደህና)" },
          { value: "Over 8hrs", label: currentLang === 'en' ? "Over 8 hours (Restorative)" : "ከ8 ሰዓት በላይ (እረፍት)" }
        ]
      });
    } else if (userProfile.ageGroup === 'elderly') {
      habits.push({
        id: "senior_sleep",
        label: currentLang === 'en' ? "🧓 Senior Restful Sleep" : "🧓 የአዛውንቶች የሰላም እንቅልፍ",
        icon: "🛌",
        key: "sleep",
        options: [
          { value: "Under 6hrs", label: currentLang === 'en' ? "Under 6 hours (Restless)" : "ከ6 ሰዓት በታች (ድካም)" },
          { value: "6-8hrs", label: currentLang === 'en' ? "6-8 hours (Excellent)" : "ከ6-8 ሰዓት (በቂ)" },
          { value: "Over 8hrs", label: currentLang === 'en' ? "Over 8 hours (Deep Rest)" : "ከ8 ሰዓት በላይ (በጣም ጥሩ)" }
        ]
      });
    } else {
      habits.push({
        id: "general_sleep",
        label: currentLang === 'en' ? "🛌 Sleep Duration" : "🛌 የእንቅልፍ ቆይታ",
        icon: "🛌",
        key: "sleep",
        options: [
          { value: "Under 6hrs", label: currentLang === 'en' ? "Under 6 hours" : "ከ6 ሰዓት በታች" },
          { value: "6-8hrs", label: currentLang === 'en' ? "6-8 hours" : "ከ6-8 ሰዓት" },
          { value: "Over 8hrs", label: currentLang === 'en' ? "Over 8 hours" : "ከ8 ሰዓት በላይ" }
        ]
      });
    }

    // Category 2: Nutrition Tracker Customizations
    const mainCondition = userProfile.healthConditions && userProfile.healthConditions.length > 0 
      ? userProfile.healthConditions[0] 
      : 'none';
      
    if (mainCondition === 'diabetes') {
      habits.push({
        id: "diabetes_diet",
        label: currentLang === 'en' ? "🩸 Sugar Control Log" : "🩸 የስኳር መጠን ቁጥጥር",
        icon: "🥣",
        key: "nutrition",
        options: [
          { value: "Strict Low Sugar", label: currentLang === 'en' ? "Strict Low Sugar Meal" : "ስኳር የሌለው ምግብ ተመግቤያለሁ" },
          { value: "Moderate Sugar", label: currentLang === 'en' ? "Moderate Sugar Meal" : "መካከለኛ የስኳር ይዘት" },
          { value: "High Sugar Logged", label: currentLang === 'en' ? "High Sugar Meal (Caution)" : "ከፍተኛ ስኳር (ጥንቃቄ ያስፈልጋል)" }
        ]
      });
    } else if (mainCondition === 'hypertension') {
      habits.push({
        id: "bp_diet",
        label: currentLang === 'en' ? "🧂 Sodium & BP Monitoring" : "🧂 የጨው መጠንና ግፊት ቁጥጥር",
        icon: "🥗",
        key: "nutrition",
        options: [
          { value: "Low Salt Meals", label: currentLang === 'en' ? "Low Salt Meals Today" : "ዛሬ ጨው የሌለው ምግብ በልቻለሁ" },
          { value: "Moderate Salt", label: currentLang === 'en' ? "Normal Salt Levels" : "መካከለኛ የጨው መጠን" },
          { value: "High Salt Taken", label: currentLang === 'en' ? "High Salt Meal (Alert)" : "ከፍተኛ ጨው የበዛበት ምግብ" }
        ]
      });
    } else if (mainCondition === 'anemia') {
      habits.push({
        id: "anemia_diet",
        label: currentLang === 'en' ? "🥩 Iron-Rich Food Log" : "🥩 የብረት (Iron) ይዘት ያላቸው ምግቦች",
        icon: "🍳",
        key: "nutrition",
        options: [
          { value: "High Iron", label: currentLang === 'en' ? "Shiro + Gomen + Lemon" : "ሽሮ + ጎመን + ሎሚ ተመግቤያለሁ" },
          { value: "Moderate Iron", label: currentLang === 'en' ? "General Ethiopian Stew" : "የተለመደ የሀገር ወጥ" },
          { value: "No Iron Sources", label: currentLang === 'en' ? "No Iron Source Today" : "ዛሬ የብረት ይዘት ያላቸው አልበላሁም" }
        ]
      });
    } else if (mainCondition === 'obesity') {
      habits.push({
        id: "obesity_diet",
        label: currentLang === 'en' ? "🥗 Portion Control Log" : "🥗 የምግብ መጠንና ካሎሪ መቆጣጠሪያ",
        icon: "🥗",
        key: "nutrition",
        options: [
          { value: "Strict Calorie Deficit", label: currentLang === 'en' ? "Portion Controlled (Deficit)" : "ቁጥጥር የተደረገበት መጠን" },
          { value: "Normal Portion", label: currentLang === 'en' ? "Normal Balanced Portion" : "መካከለኛ/የተለመደ መጠን" },
          { value: "Overeating Logged", label: currentLang === 'en' ? "High Calorie / Overeating" : "ከተገቢው በላይ የተመገብኩበት" }
        ]
      });
    } else if (['pregnancy_1st', 'pregnancy_2nd', 'pregnancy_3rd', 'breastfeeding'].includes(mainCondition)) {
      habits.push({
        id: "maternal_diet",
        label: currentLang === 'en' ? "🤰 Maternal Nutrients Log" : "🤰 የእናቶች አልሚ ምግቦች ምዝገባ",
        icon: "🤰",
        key: "nutrition",
        options: [
          { value: "Calcium & Iron Intake", label: currentLang === 'en' ? "Iron + Calcium + Linseed" : "ብረት + ካልሲየም + ተልባ ወስጃለሁ" },
          { value: "Basic Healthy Food", label: currentLang === 'en' ? "Standard Balanced Meal" : "የተለመደ የተመጣጠነ ምግብ" },
          { value: "Deficient Nutrition", label: currentLang === 'en' ? "Missed Nutrients / Skipping" : "የተመጣጠነ ምግብ አልወሰድኩም" }
        ]
      });
    } else {
      habits.push({
        id: "general_hydration",
        label: currentLang === 'en' ? "💧 Water Hydration" : "💧 የውሃ ፍጆታ",
        icon: "💧",
        key: "nutrition",
        options: [
          { value: "Under 1L", label: currentLang === 'en' ? "Under 1 Liter" : "ከ1 ሊትር በታች" },
          { value: "1-2L", label: currentLang === 'en' ? "1-2 Liters" : "ከ1-2 ሊትር" },
          { value: "2-3L", label: currentLang === 'en' ? "2-3 Liters" : "ከ2-3 ሊትር" },
          { value: "Over 3L", label: currentLang === 'en' ? "Over 3 Liters" : "ከ3 ሊትር በላይ" }
        ]
      });
    }

    // Category 3: Activity/Movement Customizations
    if (profCat === 'agriculture' || profCat === 'labor' || profCat === 'sports') {
      habits.push({
        id: "physical_rest",
        label: currentLang === 'en' ? "💪 Joint & Muscle Rest" : "💪 የጡንቻና የመገጣጠሚያ እረፍት",
        icon: "🏃",
        key: "movement",
        options: [
          { value: "Fully Stretched", label: currentLang === 'en' ? "Stretched & Rested" : "ሰውነቴን አፍታትቻለሁ + አርፌያለሁ" },
          { value: "Slight Soreness", label: currentLang === 'en' ? "Moderate physical fatigue" : "መካከለኛ የአካል ድካም" },
          { value: "Exhausted No Rest", label: currentLang === 'en' ? "Exhausted (No stretching)" : "ከፍተኛ የአካል ዝለት" }
        ]
      });
    } else if (profCat === 'office' || profCat === 'education') {
      habits.push({
        id: "screen_breaks",
        label: currentLang === 'en' ? "💻 Screen Pause & Eye Rest" : "💻 የስክሪን እረፍትና የአይን ስፖርት",
        icon: "🏃",
        key: "movement",
        options: [
          { value: "Every Hour", label: currentLang === 'en' ? "Took eye breaks every hour" : "በየሰዓቱ የአይን እረፍት ወስጃለሁ" },
          { value: "Few Breaks", label: currentLang === 'en' ? "Only 1-2 breaks today" : "ዛሬ 1-2 ጊዜ ብቻ እረፍት ወስጃለሁ" },
          { value: "No Breaks", label: currentLang === 'en' ? "No screen breaks (Fatigued)" : "ምንም እረፍት አልወሰድኩም" }
        ]
      });
    } else if (userProfile.ageGroup === 'elderly' || userProfile.ageGroup === 'children') {
      habits.push({
        id: "gentle_steps",
        label: currentLang === 'en' ? "🏃 Gentle Mobility Steps" : "🏃 ቀለል ያሉ እርምጃዎች / ጨዋታ",
        icon: "🏃",
        key: "movement",
        options: [
          { value: "Target Achieved", label: currentLang === 'en' ? "Gentle Walk / Active Play" : "ቀላል ጉዞ / ንቁ ጨዋታ አድርጌያለሁ" },
          { value: "Low Activity", label: currentLang === 'en' ? "Some steps but mostly sitting" : "ዛሬ አብዛኛውን ጊዜ ተቀምጫለሁ" },
          { value: "No Movement", label: currentLang === 'en' ? "Sedentary / Rested Entirely" : "ምንም እንቅስቃሴ አላደረግኩም" }
        ]
      });
    } else {
      habits.push({
        id: "general_movement",
        label: currentLang === 'en' ? "🏃 Physical Movement" : "🏃 የአካል ብቃት እንቅስቃሴ",
        icon: "🏃",
        key: "movement",
        options: [
          { value: "Walking", label: currentLang === 'en' ? "Walking / Commuting" : "እግር ጉዞ / መጓዝ" },
          { value: "Traditional dance", label: currentLang === 'en' ? "Traditional Dance (Eskista)" : "ባህላዊ እስክስታ" },
          { value: "Football", label: currentLang === 'en' ? "Football / Active Sports" : "ኳስ መጫወት / ስፖርት" },
          { value: "Gym", label: currentLang === 'en' ? "Gym Workouts" : "ጂም / የጥንካሬ ልምምድ" },
          { value: "Nothing today", label: currentLang === 'en' ? "Sedentary / Rest Today" : "ዛሬ አልተንቀሳቀስኩም" }
        ]
      });
    }

    return habits;
  };

  // Sync initial habit selectors with dynamic habit form on userProfile changes
  useEffect(() => {
    const customHabits = getCustomHabitForm();
    customHabits.forEach(habit => {
      if (habit.key === 'sleep') {
        setSleepLog(prev => {
          const hasOption = habit.options.some(o => o.value === prev);
          return hasOption ? prev : habit.options[0].value;
        });
      } else if (habit.key === 'nutrition') {
        setHydrationLog(prev => {
          const hasOption = habit.options.some(o => o.value === prev);
          return hasOption ? prev : habit.options[0].value;
        });
      } else if (habit.key === 'movement') {
        setMovementLog(prev => {
          const hasOption = habit.options.some(o => o.value === prev);
          return hasOption ? prev : habit.options[0].value;
        });
      }
    });
  }, [userProfile]);

  const handleLogSubmit = () => {
    setLoggedToday(true);
    setStreakCount(prev => prev + 1);
    dbService.save("wellness_logs", "today", {
      sleep: sleepLog,
      movement: movementLog,
      hydration: hydrationLog,
      date: Date.now()
    });
  };

  const handleProfileChange = (key, value) => {
    let updatedProfile = { ...userProfile };
    if (key === 'healthConditions') {
      updatedProfile.healthConditions = value === 'none' ? ['none'] : [value];
    } else {
      updatedProfile[key] = value;
    }

    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }

    setShowSyncBadge(true);
    setTimeout(() => {
      setShowSyncBadge(false);
    }, 2500);
  };

  // 2. Dynamic Routine Builder: Constructs specific advice for Morning, Afternoon, and Evening
  const getCustomRoutine = () => {
    const p = userProfile;
    const cond = p.healthConditions && p.healthConditions.length > 0 ? p.healthConditions[0] : 'none';
    const profCat = getProfCategory(p.profession);
    
    let morningKey = 'default';
    let afternoonKey = 'default';
    let eveningKey = 'default';

    // Morning routine prioritization
    if (['pregnancy_1st', 'pregnancy_2nd', 'pregnancy_3rd', 'breastfeeding'].includes(cond)) {
      morningKey = 'pregnancy';
    } else if (p.ageGroup === 'elderly') {
      morningKey = 'elderly';
    } else if (cond === 'diabetes') {
      morningKey = 'diabetes';
    } else if (profCat === 'agriculture' || profCat === 'labor') {
      morningKey = 'labor';
    } else if (profCat === 'medical') {
      morningKey = 'medical';
    } else if (profCat === 'office') {
      morningKey = 'office';
    }

    // Afternoon routine prioritization
    if (cond === 'diabetes') {
      afternoonKey = 'diabetes';
    } else if (cond === 'hypertension') {
      afternoonKey = 'hypertension';
    } else if (cond === 'anemia') {
      afternoonKey = 'anemia';
    } else if (cond === 'obesity') {
      afternoonKey = 'obesity';
    } else if (profCat === 'office' || profCat === 'education' || profCat === 'students') {
      afternoonKey = 'office';
    } else if (profCat === 'agriculture' || profCat === 'labor') {
      afternoonKey = 'labor';
    }

    // Evening routine prioritization
    if (p.ageGroup === 'teenagers' || p.ageGroup === 'students' || p.ageGroup === 'children') {
      eveningKey = 'youth';
    } else if (p.ageGroup === 'elderly') {
      eveningKey = 'elderly';
    } else if (profCat === 'medical') {
      eveningKey = 'medical';
    } else if (profCat === 'labor' || profCat === 'agriculture') {
      eveningKey = 'labor';
    }

    return {
      morning: ROUTINE_MAP.morning[morningKey],
      afternoon: ROUTINE_MAP.afternoon[afternoonKey],
      evening: ROUTINE_MAP.evening[eveningKey]
    };
  };

  // 3. Dynamic Insights Builder: Renders advice cards strictly mapped to profession and condition
  const getPersonalizedInsights = () => {
    const p = userProfile;
    const cond = p.healthConditions && p.healthConditions.length > 0 ? p.healthConditions[0] : 'none';
    const profCat = getProfCategory(p.profession);
    
    const insights = [];

    // Profession / Age Insight
    const profInsight = PROFESSION_INSIGHTS[profCat] || PROFESSION_INSIGHTS.general;
    insights.push({
      type: "workplace",
      title: profInsight.title[currentLang] || profInsight.title.en,
      icon: "🔍",
      bgColor: "bg-amber-50/50",
      borderColor: "border-amber-200/50",
      textColor: "text-amber-800",
      text: profInsight.text[currentLang] || profInsight.text.en
    });

    // Health Condition Insight
    const healthInsight = CLINICAL_INSIGHTS[cond] || CLINICAL_INSIGHTS.none;
    insights.push({
      type: "health",
      title: healthInsight.title[currentLang] || healthInsight.title.en,
      icon: "🧘",
      bgColor: "bg-indigo-50/50",
      borderColor: "border-indigo-100",
      textColor: "text-[#534AB7]",
      text: healthInsight.text[currentLang] || healthInsight.text.en
    });

    return insights;
  };

  const routine = getCustomRoutine();
  const activeInsights = getPersonalizedInsights();

  const getBreathingInstruction = () => {
    if (breathState === "Inhale") {
      return currentLang === 'en' ? "Breathe in slowly through your nose..." 
           : currentLang === 'am' ? "በአፍንጫዎ ቀስ ብለው ይተንፍሱ..." 
           : currentLang === 'om' ? "Suuta funyaaniin ol-hargani..." 
           : "ብኣፍንጫኹም ቀስ ኢልኩም ኣስተንፍሱ...";
    }
    if (breathState === "Hold In") {
      return currentLang === 'en' ? "Hold your breath..." 
           : currentLang === 'am' ? "ትንፋሽዎን ይያዙ..." 
           : currentLang === 'om' ? "Hargansuu kee qabadhu..." 
           : "ትንፋስኩም ሓዙ...";
    }
    if (breathState === "Exhale") {
      return currentLang === 'en' ? "Breathe out slowly through your mouth..." 
           : currentLang === 'am' ? "በአፍዎ ቀስ ብለው ይተንፍሱ..." 
           : currentLang === 'om' ? "Suuta afaaniin gadi-baasi..." 
           : "ብኣፍኩም ቀስ ኢልኩም ኣውጽኡ...";
    }
    return currentLang === 'en' ? "Hold empty..." 
         : currentLang === 'am' ? "ሳይተነፍሱ ይቆዩ..." 
         : currentLang === 'om' ? "Gadi-qabadhu..." 
         : "ጽንሑ...";
  };

  const currentConditionValue = userProfile.healthConditions && userProfile.healthConditions.length > 0 
    ? userProfile.healthConditions[0] 
    : 'none';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-[#1D9E75] font-semibold text-label uppercase tracking-widest">
          {currentLang === 'en' ? "Daily Alignment" : (currentLang === 'am' ? "የዕለት ተዕለት የጤና ቁጥጥር" : (currentLang === 'om' ? "Madaallii Guyyaa" : "ዕለታዊ ንጥፈታት"))}
        </span>
        <h1 className="text-2xl sm:text-3xl font-light text-[#085041] m-0 flex items-center justify-center">
          <Zap className="mr-2 w-6 h-6 text-[#1D9E75]" />
          {t.wellness}
        </h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? "Log personalized daily habits, practice box breathing, and view automatically customized wellness routines."
            : (currentLang === 'am'
              ? "የዕለት ተዕለት ጤናማ ልምዶችን ይመዝግቡ፣ ባህላዊ የሳጥን ትንፋሽ ልምምዶችን ይለማመዱ፣ ግላዊነት የተላበሱ የጤና መርሃግብሮችን ያግኙ።"
              : (currentLang === 'om'
                ? "Amaloota guyyaa guyyaa galmeessi, hargansuu aadaa gochuun routine dhuunfaa ilaali."
                : "ዕለታዊ ልምድታትኩም መዝግቡ፣ ምስትንፋስ ተለማመዱ፣ ብውልቂ ዝተዳለወ ናይ ጥዕና መደብ የርእዩ።"))}
        </p>
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Profile Setup & Habits Log */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Dynamic Profile setup Form */}
          <div className="bg-white border border-[#9FE1CB]/25 rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1D9E75]" />
            
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center gap-1.5">
                <User className="w-4.5 h-4.5 text-[#1D9E75]" />
                {fTexts.profileTitle}
              </h3>
              {showSyncBadge && (
                <span className="text-[10px] bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB]/50 px-2 py-0.5 rounded-full font-semibold animate-pulse">
                  {fTexts.synced}
                </span>
              )}
            </div>
            
            <p className="text-xs text-gray-400 mt-1">
              {fTexts.profileDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Profession select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  {fTexts.professionLabel}
                </label>
                <select
                  value={userProfile.profession || 'students'}
                  onChange={(e) => handleProfileChange('profession', e.target.value)}
                  className="w-full text-xs border bg-gray-50/50 rounded-xl p-2.5 focus:outline-none focus:border-[#1D9E75] text-gray-900 font-semibold transition-all"
                >
                  {PROFESSIONS.map(p => (
                    <option key={p.id} value={p.id}>
                      {getProfessionLabel(p.id)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  {fTexts.ageLabel}
                </label>
                <select
                  value={userProfile.ageGroup || 'young_adults'}
                  onChange={(e) => handleProfileChange('ageGroup', e.target.value)}
                  className="w-full text-xs border bg-gray-50/50 rounded-xl p-2.5 focus:outline-none focus:border-[#1D9E75] text-gray-900 font-semibold transition-all"
                >
                  {LIFE_STAGES.map(s => (
                    <option key={s.id} value={s.id}>
                      {getStageNameById(s.id)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Health Condition select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  {fTexts.healthLabel}
                </label>
                <select
                  value={currentConditionValue}
                  onChange={(e) => handleProfileChange('healthConditions', e.target.value)}
                  className="w-full text-xs border bg-gray-50/50 rounded-xl p-2.5 focus:outline-none focus:border-[#1D9E75] text-gray-900 font-semibold transition-all"
                >
                  {HEALTH_CONDITIONS.map(c => (
                    <option key={c.id} value={c.id}>
                      {getConditionLabel(c.id)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Logs Form */}
          <div className="bg-white border border-[#9FE1CB]/20 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
              <Award className="w-4 h-4 mr-1.5 text-[#1D9E75]" />
              {xt.dailyHabitsTitle}
            </h3>

            {/* Dynamic habit forms generated automatically */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-left">
              {getCustomHabitForm().map(habit => {
                const value = habit.key === 'sleep' ? sleepLog 
                            : habit.key === 'nutrition' ? hydrationLog 
                            : movementLog;
                const onChange = habit.key === 'sleep' ? setSleepLog
                               : habit.key === 'nutrition' ? setHydrationLog
                               : setMovementLog;
                return (
                  <div key={habit.id} className="space-y-1.5">
                    <label className="font-semibold text-gray-600 block">{habit.icon} {habit.label}</label>
                    <select
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      disabled={loggedToday}
                      className="w-full border bg-gray-50 rounded-lg p-2.5 focus:outline-none focus:border-[#1D9E75] text-gray-900 font-medium transition-all"
                    >
                      {habit.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-[#BA7517] font-semibold flex items-center">
                🔥 {streakCount} {currentLang === 'en' ? "Days Streak Saved!" : (currentLang === 'am' ? "የቀን ተከታታይ መዝገብ!" : (currentLang === 'om' ? "Guyyaa Galmeeffame!" : "ዕለታዊ ተኸታታሊ ተዓቂቡ ኣሎ!"))}
              </span>
              <button
                onClick={handleLogSubmit}
                disabled={loggedToday}
                className={`px-5 py-2.5 rounded-lg font-semibold text-white transition-all ${
                  loggedToday 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-[#085041] hover:bg-[#085041]/90 active:scale-95'
                }`}
              >
                {loggedToday ? xt.saved : xt.saveLogs}
              </button>
            </div>
            
            {/* AI Correlation alert */}
            {loggedToday && (
              <div className="bg-[#E1F5EE] border border-[#9FE1CB]/50 p-3 rounded-lg text-left text-xs text-[#085041] space-y-1 mt-2">
                <span className="font-bold">🌳 {currentLang === 'en' ? "Warka AI Habit Correlation:" : (currentLang === 'am' ? "የዋርካ AI የልምድ ትስስር ምክር፦" : (currentLang === 'om' ? "Warka AI Gorsa Amalaa:" : "ናይ ዋርካ AI ናይ ልምዲ ምኽሪ፦"))}</span>
                <p>
                  {currentLang === 'en'
                    ? "Based on your active logs, we found that adhering to these tailored habits directly improves your stress indicators. Keep drinking 2L of water to combat high-altitude dehydration."
                    : (currentLang === 'am'
                      ? "የዕለት ተዕለት ልምዶችዎን በመከታተል፣ እነዚህን የተበጁ ተግባራትን መፈጸምዎ የአእምሮ ውጥረትን በቀጥታ እንደሚቀንስ አረጋግጠናል። የሰውነትዎን እርጥበት ለመጠበቅ በቀን 2 ሊትር ውሃ መጠጣትዎን ይቀጥሉ።"
                      : (currentLang === 'om'
                        ? "Amala kee hordofuun dhiphina kee akka salphisu mirkanoofteetti. Bishaan litira 2 dhuguu kee ittufi."
                        : "ዕለታዊ ልምድታትኩም ብምክትታል፣ እዞም ዝተዳለዉ ንጥፈታት ምስላጥኩም ንጭንቀትኩም ብቐጥታ ከም ዝንክዮ ኣረጋጊጽና ኣለና። ማይ ምስታይኩም ቀጽሉዎ።"))}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Breathing Widget */}
        <div className="space-y-6">
          <div className="bg-[#EEEDFE] border border-[#534AB7]/20 rounded-2xl p-6 shadow-sm space-y-6 text-center">
            <div>
              <h3 className="font-semibold text-sm text-[#534AB7] m-0">
                {xt.startSession}
              </h3>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                {currentLang === 'en' ? "Traditional Box Breathing (4s Inhale - 4s Hold - 4s Exhale - 4s Hold)" : "ባህላዊ የሳጥን ትንፋሽ ልምምድ (4ሰኮንድ መተንፈስ - 4ሰኮንድ መያዝ - 4ሰኮንድ ማስወጣት - 4ሰኮንድ መያዝ)"}
              </span>
            </div>

            {/* Visual Breathing Sphere */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <div
                style={getScaleAndTransition()}
                className={`absolute inset-0 rounded-full ${
                  !isBreathingActive 
                    ? 'bg-[#534AB7]/10 border-2 border-dashed border-[#534AB7]/20' 
                    : (breathState === "Inhale" 
                      ? 'bg-indigo-500/30 border-2 border-indigo-400' 
                      : (breathState === "Hold In" 
                        ? 'bg-green-500/35 border-2 border-green-500' 
                        : (breathState === "Exhale" 
                          ? 'bg-amber-500/30 border-2 border-amber-500' 
                          : 'bg-amber-400/20 border-2 border-amber-400 border-dashed')))
                }`}
              />
              <div className="relative z-10 flex flex-col items-center justify-center text-[#534AB7]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#085041]">
                  {isBreathingActive ? (
                    breathState === "Inhale" ? xt.inhale 
                    : (breathState === "Hold In" ? xt.hold 
                    : (breathState === "Exhale" ? xt.exhale : (currentLang === 'en' ? "Hold Empty" : "ሳይተነፍሱ")))
                  ) : xt.inhale}
                </span>
                <span className="text-xl font-bold mt-1 text-[#085041]">
                  {isBreathingActive ? `${breathSeconds}s` : "4-4-4-4"}
                </span>
                {isBreathingActive && (
                  <span className="text-[9px] text-[#534AB7] font-semibold mt-1">
                    {currentLang === 'en' ? `Cycles: ${breathCycle}` : `ዙር: ${breathCycle}`}
                  </span>
                )}
              </div>
            </div>

            {/* Instruction description */}
            <p className="text-[11px] text-gray-500 min-h-[1.5rem] leading-relaxed m-0 font-medium">
              {isBreathingActive ? getBreathingInstruction() : (currentLang === 'en' ? "Click start to begin breathing guidance" : "ለመጀመር ቁልፉን ይጫኑ")}
            </p>

            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className="bg-[#534AB7] hover:bg-[#534AB7]/90 text-white text-xs px-5 py-2.5 rounded-lg font-semibold w-full shadow-sm transition-all"
            >
              {isBreathingActive ? xt.stopSession : xt.startSession}
            </button>
          </div>
        </div>
      </div>

      {/* Routine & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* Daily Routine */}
        <div className="bg-white border border-[#9FE1CB]/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-[#085041] m-0 flex items-center">
            <Clock className="w-4 h-4 mr-1.5 text-[#1D9E75]" />
            {t.routineLabel}
          </h3>
          <p className="text-[11px] text-gray-400">
            {currentLang === 'en' ? "Your custom routine is generated automatically from your form details:" : "የእርስዎ ብጁ የጤና መርሃግብር ከበጀትዎና ከጤናዎ ሁኔታ በመነሳት በራስ-ሰር የተፈጠረ ነው፡"}
          </p>

          <div className="space-y-4 text-xs text-left">
            <div className="border-l-2 border-[#1D9E75] pl-3 space-y-1">
              <span className="font-bold text-[#085041] block">🌅 {xt.morning}</span>
              <p className="text-gray-600">{routine.morning[currentLang] || routine.morning.en}</p>
            </div>
            <div className="border-l-2 border-[#BA7517] pl-3 space-y-1">
              <span className="font-bold text-[#BA7517] block">☀️ {xt.afternoon}</span>
              <p className="text-gray-600">{routine.afternoon[currentLang] || routine.afternoon.en}</p>
            </div>
            <div className="border-l-2 border-[#534AB7] pl-3 space-y-1">
              <span className="font-bold text-[#534AB7] block">🌌 {xt.evening}</span>
              <p className="text-gray-600">{routine.evening[currentLang] || routine.evening.en}</p>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-white border border-[#9FE1CB]/20 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-[#BA7517] m-0 flex items-center">
            <Sparkles className="w-4 h-4 mr-1.5 text-[#BA7517]" />
            {t.insightsLabel}
          </h3>

          <div className="space-y-3 text-xs leading-relaxed text-left">
            {activeInsights.map((insight, idx) => (
              <div key={idx} className={`p-3 rounded-xl border ${insight.bgColor} ${insight.borderColor}`}>
                <p className={`${insight.textColor} font-semibold flex items-center gap-1`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {insight.title}:
                </p>
                <p className="text-[#444441] text-[11px] mt-0.5 leading-relaxed">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
