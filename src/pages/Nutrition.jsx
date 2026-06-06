import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { EXTRA_TRANSLATIONS } from '../utils/extraTranslations';
import { ETHIOPIAN_FOODS, HEALTH_CONDITIONS, DIETARY_PRACTICES, ECONOMIC_STATUS_OPTIONS } from '../utils/constants';
import { analyzeFoodWithGemini } from '../utils/gemini';
import { getFallbackFoodAnalysis } from '../utils/fallbackAI';
import { dbService } from '../utils/firebase';
import { Apple, Camera, Send, Info, Award, HelpCircle, FileText, Check } from 'lucide-react';

export const Nutrition = ({ currentLang, userProfile, onUpdateProfile, geminiApiKey }) => {
  const t = TRANSLATIONS[currentLang];
  const xt = EXTRA_TRANSLATIONS[currentLang] || EXTRA_TRANSLATIONS.en;
  
  // Tabs: meal_plan, scan_food, ask_ai, conditions, food_db
  const [activeTab, setActiveTab] = useState("meal_plan");
  
  // Health Profile State (Onboarding)
  const [showOnboarding, setShowOnboarding] = useState(!userProfile.weight);
  const [age, setAge] = useState(userProfile.age || 30);
  const [weight, setWeight] = useState(userProfile.weight || 70);
  const [height, setHeight] = useState(userProfile.height || 170);
  const [gender, setGender] = useState(userProfile.gender || "female");
  const [selectedConditions, setSelectedConditions] = useState(userProfile.healthConditions || ["none"]);
  const [customCondition, setCustomCondition] = useState("");
  const [dietary, setDietary] = useState(userProfile.dietaryPractice || "none");
  const [goal, setGoal] = useState(userProfile.wellnessGoal || "maintain_health");
  
  // BMI & Calories
  const [bmi, setBmi] = useState(0);
  const [bmiClassKey, setBmiClassKey] = useState("bmiNormal");
  const [caloricNeeds, setCaloricNeeds] = useState(2000);

  // Meal Plan Day selector (Mon-Sun)
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [activeWhyChosen, setActiveWhyChosen] = useState(null);

  // Food Scanner Simulator
  const [scannerActive, setScannerActive] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Ask AI
  const [askQuery, setAskQuery] = useState("");
  const [askChat, setAskChat] = useState([]);
  const [isAsking, setIsAsking] = useState(false);

  useEffect(() => {
    calculateBmiAndCalories();
  }, [weight, height, age, gender]);

  const calculateBmiAndCalories = () => {
    if (!weight || !height) return;
    const hMeter = height / 100;
    const bmiVal = parseFloat((weight / (hMeter * hMeter)).toFixed(1));
    setBmi(bmiVal);

    let bKey = "bmiNormal";
    if (bmiVal < 18.5) bKey = "bmiUnder";
    else if (bmiVal >= 25 && bmiVal < 30) bKey = "bmiOver";
    else if (bmiVal >= 30) bKey = "bmiObese";
    setBmiClassKey(bKey);

    // Calculate BMR (Mifflin-St Jeor)
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setCaloricNeeds(Math.round(bmr * 1.2)); // Sedentary factor
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    let finalConditions = [...selectedConditions];
    if (customCondition.trim() !== "") {
      finalConditions.push(customCondition.trim());
    }
    const updated = {
      ...userProfile,
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
      gender,
      healthConditions: finalConditions,
      dietaryPractice: dietary,
      wellnessGoal: goal
    };
    onUpdateProfile(updated);
    setShowOnboarding(false);
  };

  // 7-day meal plan dynamic generation with 2026 Calendar logic
  const generateMealPlan = (dietary) => {
    const isOrthoAll = dietary === "ortho_fast_all";
    const isOrthoWedFri = dietary === "ortho_fast_wed_fri";
    const isHalal = dietary === "muslim_halal";
    const isVeg = dietary === "vegetarian";

    const plan = {};
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // Helper to check date range
    const isDateInRanges = (date, ranges) => {
      return ranges.some(r => date >= new Date(r.start) && date <= new Date(r.end));
    };

    // Calculate dates for current week
    const current = new Date();
    const dayOfWeek = current.getDay(); // 0 is Sunday, 1 is Monday
    const diffToMonday = current.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(current.getFullYear(), current.getMonth(), diffToMonday);
    
    days.forEach((dayStr, index) => {
      const targetDate = new Date(monday);
      targetDate.setDate(monday.getDate() + index);
      const dayIndex = targetDate.getDay(); // 0 is Sun, 3 is Wed, 5 is Fri

      let isFastingDay = false;

      // Check Orthodox 2026 rules
      if (isOrthoAll || isOrthoWedFri) {
        const isWedFri = (dayIndex === 3 || dayIndex === 5);
        if (isOrthoWedFri) {
          isFastingDay = isWedFri;
        } else if (isOrthoAll) {
          if (isWedFri) {
            isFastingDay = true;
          } else if (targetDate.getFullYear() === 2026) {
            const orthoRanges = [
              { start: "2026-11-25", end: "2027-01-06" },
              { start: "2026-01-06", end: "2026-01-06" },
              { start: "2026-02-04", end: "2026-02-06" },
              { start: "2026-02-16", end: "2026-04-11" },
              { start: "2026-06-08", end: "2026-07-12" },
              { start: "2026-08-07", end: "2026-08-21" },
            ];
            isFastingDay = isDateInRanges(targetDate, orthoRanges);
          }
        }
      }

      // Check Islamic 2026 rules
      if (isHalal) {
         if (dayIndex === 1 || dayIndex === 4) { // Sunnah Mon & Thu
           isFastingDay = true;
         } else if (targetDate.getFullYear() === 2026) {
           const islamicRanges = [
              { start: "2026-02-18", end: "2026-03-19" }, // Ramadan
              { start: "2026-06-25", end: "2026-06-25" }, // Ashura
              { start: "2026-05-26", end: "2026-05-26" }, // Arafah
              { start: "2026-03-20", end: "2026-04-17" }, // Shawwal approx
              { start: "2026-05-18", end: "2026-05-26" }  // Dhul Hijjah
           ];
           if (isDateInRanges(targetDate, islamicRanges)) isFastingDay = true;
         }
      }

      if (isFastingDay && (isOrthoAll || isOrthoWedFri)) {
         plan[dayStr] = { breakfast: "fasting_empty", lunch: "injera_with_shiro", dinner: "injera_with_misir" };
         if (dayIndex === 3) plan[dayStr].dinner = "rice_lentils"; // Wed
      } else if (isFastingDay && isHalal) {
         // Fasting until sunset (Iftar)
         plan[dayStr] = { breakfast: "fasting_empty", lunch: "fasting_empty", dinner: "doro_wot" };
         if (dayIndex === 4) plan[dayStr].dinner = "rice_lentils";
      } else if (isHalal) {
         plan[dayStr] = { breakfast: "oatmeal_banana", lunch: "doro_wot", dinner: "injera_with_misir" };
         if (dayIndex === 5) plan[dayStr].lunch = "rice_lentils";
         if (dayIndex === 0) plan[dayStr].dinner = "injera_with_shiro";
      } else if (isVeg) {
         plan[dayStr] = { breakfast: "oatmeal_banana", lunch: "injera_with_shiro", dinner: "ayib_with_gomen" };
         if (dayIndex === 3) plan[dayStr].dinner = "rice_lentils";
      } else {
         plan[dayStr] = { breakfast: "oatmeal_banana", lunch: "doro_wot", dinner: "injera_with_shiro" };
         if (dayIndex === 6) plan[dayStr].dinner = "ayib_with_gomen";
         if (dayIndex === 0) plan[dayStr].lunch = "injera_with_misir";
      }
    });
    return plan;
  };

  const [mealPlan, setMealPlan] = useState(generateMealPlan(userProfile.dietaryPractice));

  useEffect(() => {
    setMealPlan(generateMealPlan(userProfile.dietaryPractice));
  }, [userProfile.dietaryPractice]);

  const currentDayMeals = mealPlan[selectedDay];

  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [capturedImage, setCapturedImage] = useState(null);
  const [scanCount, setScanCount] = useState(() => parseInt(sessionStorage.getItem('warka_scan_count') || "0"));

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }
      });
      setStream(newStream);
      setCameraActive(true);
      setCapturedImage(null);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Cannot access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const toggleCameraFacingMode = () => {
    setFacingMode(prev => (prev === "environment" ? "user" : "environment"));
    if (cameraActive) {
      setTimeout(startCamera, 100);
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    setCapturedImage(dataUrl);
    stopCamera();
  };

  const scanCapturedImage = () => {
    if (!capturedImage) return;
    setIsScanning(true);
    setScanResult(null);
    
    // Increment scan count
    const newCount = scanCount + 1;
    setScanCount(newCount);
    sessionStorage.setItem('warka_scan_count', newCount.toString());
    
    setTimeout(() => {
      let detectedFood = Math.random() > 0.5 ? "Doro Wot (Chicken Stew) with Injera" : "Shiro Wot (Chickpea Stew) with Injera";
      
      let analysisText = `Detected Food: ${detectedFood}.\n\n`;
      let verdict = "green";
      let verdictLabel = "Good";
      
      const isMeat = detectedFood.includes("Doro Wot");
      const isOrtho = userProfile.dietaryPractice === "ortho_fast_all" || userProfile.dietaryPractice === "ortho_fast_wed_fri";
      const isVeganGoal = userProfile.dietaryPractice === "vegetarian";
      
      if ((isOrtho || isVeganGoal) && isMeat) {
         analysisText += `Since your profile indicates ${isOrtho ? "Orthodox Fasting" : "Vegetarian"}, you MUST NOT eat this meat-based dish. `;
         verdict = "red";
         verdictLabel = "Avoid";
      } else if (userProfile.healthConditions.includes("hypertension") && isMeat) {
         analysisText += `Since you have hypertension, eating heavily spiced and salted meat stews like Doro Wot should be done with care. `;
         verdict = "yellow";
         verdictLabel = "Caution";
      } else if (userProfile.healthConditions.includes("diabetes") && !isMeat) {
         analysisText += `Since you have diabetes, Shiro is okay but you must heavily control your Injera (carb) intake to prevent sugar spikes. `;
         verdict = "yellow";
         verdictLabel = "Caution";
      } else {
         analysisText += `This meal fits your dietary restrictions well. `;
         verdict = "green";
         verdictLabel = "Very Good";
      }
      
      // Goal specific context
      if (userProfile.wellnessGoal === "lose_weight") {
         analysisText += `Regarding your goal to Lose Weight (Current Weight: ${userProfile.weight}kg), this food is calorie-dense. Keep portions small.`;
         if (verdict === "green") verdictLabel = "Good";
      } else if (userProfile.wellnessGoal === "anemia_care") {
         if (isMeat) {
             analysisText += `Regarding your goal for Anemia Care, this is EXCELLENT as meat provides heme iron.`;
             verdictLabel = "Excellent";
         } else {
             analysisText += `Regarding your goal for Anemia Care, add lemon to this plant-based meal to absorb the iron better.`;
         }
      } else {
         analysisText += `This meal aligns perfectly with your wellness goals.`;
      }
      
      setScanResult({
        foodName: "AI Vision Analysis",
        verdict: verdict,
        verdictLabel: verdictLabel,
        analysis: analysisText,
        portionAdvice: `Considering your weight is ${userProfile.weight}kg, a fist-sized portion is recommended.`
      });
      setIsScanning(false);
    }, 2500);
  };

  const handleAskSubmit = async (e) => {
    e.preventDefault();
    if (!askQuery.trim()) return;

    const userMessage = { sender: 'user', text: askQuery };
    setAskChat([...askChat, userMessage]);
    setAskQuery("");
    setIsAsking(true);

    setTimeout(() => {
      const queryLower = askQuery.toLowerCase();
      let answer = "";
      if (queryLower.includes("meat") || queryLower.includes("beef") || queryLower.includes("chicken") || queryLower.includes("ስጋ") || queryLower.includes("foomii")) {
         if (userProfile.dietaryPractice === "ortho_fast_all" || userProfile.dietaryPractice === "ortho_fast_wed_fri") {
            answer = "Since you are following the Orthodox fasting practice, meat is strictly forbidden during your fasting periods. Please consume plant-based meals like Shiro, Misir, or Gomen instead.";
         } else if (userProfile.dietaryPractice === "vegetarian") {
            answer = "You have selected a vegetarian profile, so meat is not recommended. Stick to your plant-based diet.";
         } else if (userProfile.healthConditions.includes("hypertension")) {
            answer = "You can eat meat, but since you have hypertension, it's best to eat lean cuts and avoid heavy butter/salt (like in traditional Kitfo).";
         } else {
            answer = `Yes, you can eat meat. Considering your weight is ${userProfile.weight}kg, lean meats provide excellent protein for your wellness goals.`;
         }
      } else if (queryLower.includes("sugar") || queryLower.includes("sweet") || queryLower.includes("ስኳር")) {
         if (userProfile.healthConditions.includes("diabetes")) {
            answer = "Because you have diabetes, you must strictly avoid added sugars and sweet foods to prevent dangerous blood sugar spikes. Use stevia or natural alternatives if needed.";
         } else {
            answer = "You can consume sweets in moderation, but try to rely on natural sugars from fruits for better health.";
         }
      } else if (queryLower.includes("salt") || queryLower.includes("ጨው")) {
         if (userProfile.healthConditions.includes("hypertension")) {
            answer = "Because you have hypertension, you must strictly reduce your salt intake to manage your blood pressure safely. Use lemon and spices for flavor instead.";
         } else {
            answer = "Salt is okay in moderation, but it's always good for your heart to not over-salt your food.";
         }
      } else if (queryLower.includes("kitfo") || queryLower.includes("ክትፎ") || queryLower.includes("kitfoo")) {
        answer = currentLang === 'en'
          ? "Kitfo is rich in iron, but contains high saturated fats and spices. For hypertension, consume occasionally and ask for less salt/butter. For pregnancy, raw kitfo must be strictly avoided to prevent Listeria food poisoning."
          : (currentLang === 'am'
            ? "ክትፎ በብረትና ፕሮቲን የበለፀገ ቢሆንም ከፍተኛ ቅቤና ጨው ይይዛል። ለደም ግፊት በልኩ መብላት ይመረጣል። እርጉዝ ሴቶች ግን ጥሬ ክትፎን በፍፁም መብላት የለባቸውም።"
            : (currentLang === 'om'
              ? "Kitfoon sibiila qaba, garuu kibbeh fi soogidda baay'ee qaba. Dhiibbaa dhiigaaf eeggadhu. Ulfaaf kitfoo dheedhii gonkumaa hin nyaatin."
              : "ክትፎ ብሓጺንን ፕሮቲንን ዝሃብተመ እኳ እንተኾነ ልዑል ቅቤን ጨውን ዝሓዘ እዩ። ንጸቕጢ ደም ብዓቐን ብልዑ። ንጥንሲ ጥሬ ክትፎ ፈጺምካ ኣይፍቀድን።"));
      } else if (queryLower.includes("injera") || queryLower.includes("እንጀራ") || queryLower.includes("biddeena")) {
        answer = currentLang === 'en'
          ? "Teff injera is highly nutritious with a low glycemic index, making it far better than wheat injera for diabetes. However, portion control is key. Limit to 1/2 or 1 piece per meal, up to 2-3 pieces per day."
          : (currentLang === 'am'
            ? "የጠፍ እንጀራ ዝቅተኛ ግሊሴሚክ ማውጫ ስላለው ከስንዴ እንጀራ ይልቅ ለስኳር ታማሚዎች ይመረጣል። ነገር ግን በአንድ ማዕድ ከግማሽ እስከ አንድ እንጀራ ብቻ በመብላት በቀን ከ2-3 እንጀራ አይለፉ።"
            : (currentLang === 'om'
              ? "Biddeena xaafii sukkaaraaf gaariidhha, hamma isaa eeggachuun murteessaa dha. Guyyaatti hamma injera 2-3 eeggadhu."
              : "ጣፍ እንጀራ ትሑት ግሊሴሚክ ረድኤት ስለዘለዎ ንሕማም ሽኮር ኣዝዩ ጠቓሚ እዩ። ግና ብዓቐን ብልዑ፣ ኣብ መዓልቲ ካብ 2-3 እንጀራ ኣይትሕለፉ።"));
      } else if (queryLower.includes("fasting") || queryLower.includes("ጾም") || queryLower.includes("sooma")) {
        answer = currentLang === 'en'
          ? "Fasting requires care if you have conditions like diabetes. Avoid skipping meals completely; instead, eat smaller portions of vegan stews like misir, shiro, and gomen frequently during non-fasting hours to stabilize blood sugar."
          : (currentLang === 'am'
            ? "በጾም ወቅት የስኳር/የደም ግፊት ካለብዎ ጥንቃቄ ያስፈልጋል። ረጅም ሰዓታት ሳይመገቡ መቆየት ደም ውስጥ ያለውን ስኳር ያዛባዋል። ምስር፣ ሽሮ እና ጎመንን በየመሀሉ በመመገብ የደም ስኳርዎን ይጠብቁ።"
            : (currentLang === 'om'
              ? "Soomni sukkaaraaf eeggannoo barbaada. Nyaata guutumaan guutuutti hin dhiisin; shiroo fi misira yeroo yeroodhaan xiqqeessi nyaadhu."
              : "ኣብ ጾም እዋን ጸገም ሽኮር እንተሃልዩኩም ጥንቃቄ የድሊ። መግቢ ፈጺምኩም ኣይትሕደጉ፤ ምስር፣ ሽሮን ቆስጣን ብውሑድ መጠን ብምምጋብ መጠን ሽኮርኩም ሓልዉ።"));
      } else {
        answer = currentLang === 'en'
          ? "Ethiopian foods like Shiro, Misir, and Gomen are highly therapeutic. Combine stews with lemon juice to maximize plant iron absorption, and avoid drinking buna/shai immediately after meals."
          : (currentLang === 'am'
            ? "እንደ ሽሮ፣ ምስር እና ጎመን ያሉ ምግቦች ከፍተኛ የጤና ጥቅም አላቸው። የብረት ንጥረ ነገር ከሰውነት ጋር እንዲዋሃድ ሎሚ ይጨምቁባቸው፤ ከተመገቡ በኋላ ቡና/ሻይ ወዲያውኑ አይጠጡ።"
            : (currentLang === 'om'
              ? "Shiroo, misira fi gomeni fayyaaf gaariidhha. Nyaatarratti loomii cuunfuun sibiila dhiigaa dabala. Buna daftee dhuguu dhiisi."
              : "ሽሮ፣ ምስርን ቆስጣን ኣዝዮም ጠቐምቲ እዮም። ሓጺን ንምምጣጥ ሎሚ ጨምቑሎም፤ ድሕሪ መግቢ ቀጥታ ሻይ ወይ ቡን ኣይትስተዩ።"));
      }

      setAskChat(prev => [...prev, { sender: 'warka', text: answer }]);
      setIsAsking(false);
    }, 1500);
  };

  const getFoodDetail = (foodId) => {
    return ETHIOPIAN_FOODS.find(f => f.id === foodId) || ETHIOPIAN_FOODS[0];
  };

  const getFoodName = (food) => {
    if (!food) return "";
    const key = `name${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
    return food[key] || food.nameEn;
  };

  // Localized goals
  const goalLabels = {
    lose_weight: { en: "Lose weight healthily", am: "ክብደት በጤናማ መንገድ መቀነስ", om: "Ulfaatina qaamaa hir'isuu", ti: "ክብደት ብጥዕናዊ መንገዲ ምቕናስ" },
    manage_diabetes: { en: "Manage Diabetes with foods", am: "የስኳር በሽታን በምግብ መቆጣጠር", om: "Nyaataan sukkaara to'achuu", ti: "ሕማም ሽኮር ብመግቢ ምቁጻጽ" },
    lower_bp: { en: "Lower blood pressure naturally", am: "የደም ግፊትን በተፈጥሮአዊ መንገድ መቀነስ", om: "Dhiibbaa dhiigaa hir'isuu", ti: "ጸቕጢ ደም ብተፈጥሮኣዊ መንገዲ ምቕናስ" },
    anemia_care: { en: "Increase blood iron levels", am: "የደም ብረት (Iron) መጠን መጨመር", om: "Hamma ayireenii dhiigaa dabaluu", ti: "መጠን ሓጺን ደም ምውሳኽ" },
    maintain_health: { en: "Maintain current health status", am: "አሁን ያለውን ጤና መጠበቅ", om: "Fayyaa jiru eeggachuu", ti: "ዘለዎ ጥዕና ምዕቃብ" }
  };

  // Localized days
  const daysTranslation = {
    Monday: { en: "Monday", am: "ሰኞ", om: "Wiixata", ti: "ሰኑይ" },
    Tuesday: { en: "Tuesday", am: "ማክሰኞ", om: "Kibxata", ti: "ሰሉስ" },
    Wednesday: { en: "Wednesday", am: "ረቡዕ", om: "Roobii", ti: "ረቡዕ" },
    Thursday: { en: "Thursday", am: "ሐሙስ", om: "Kamisa", ti: "ሓሙስ" },
    Friday: { en: "Friday", am: "አርብ", om: "Jimaata", ti: "ዓርቢ" },
    Saturday: { en: "Saturday", am: "ቅዳሜ", om: "Sanbata", ti: "ቀዳም" },
    Sunday: { en: "Sunday", am: "እሁድ", om: "Dilbata", ti: "ሰንበት" }
  };

  // Localized food benefits database for 100% translations
  const foodBenefits = {
    teff_injera: {
      en: "High magnesium reduces cortisol (stress). Lower Glycemic Index helps diabetes. High iron helps anemia.",
      am: "ከፍተኛ ማግኒዥየም ኮርቲሶልን (ጭንቀትን) ይቀንሳል። ዝቅተኛ ግሊሴሚክ ማውጫ ለስኳር በሽታ ይረዳል። ከፍተኛ ብረት ደምን ያበለጽጋል።",
      om: "Magnesium ol'aanaan dhiphina sammuu hir'isa. Sukkaaraafi sibiila dhiigaa dabaluuf gaariidha.",
      ti: "ልዑል ማግኒዥየም ጸቕጢ ኣእምሮ ይንክእ። ትሑት ግሊሴሚክ ረድኤት ንሕማም ሽኮር ይሕግዝ። ልዑል ሓጺን ንሕጽረት ደም ይዓቅብ።"
    },
    misir_wot: {
      en: "Folate in lentils directly supports serotonin production (mood stabilizer). Excellent iron source.",
      am: "በምስር ውስጥ ያለው ፎሌት ሴሮቶኒን እንዲመረት በቀጥታ ይደግፋል (የስሜት ማረጋጊያ)። ግሩም የብረት ምንጭ ነው።",
      om: "Folate misira keessaa moodii keenya tasgabeessa. Sibiila dhiigaa dabala.",
      ti: "ኣብ ብርስን ዘሎ ፎሌት ሴሮቶኒን ክሰርሕ የኽእል (ናይ ስሜት መረጋጊኢ)። ፍጹም ናይ ሓጺን ምንጪ እዩ።"
    },
    shiro_wot: {
      en: "Rich in plant protein and iron. Sustained fiber releases energy slowly, preventing fatigue.",
      am: "በአትክልት ፕሮቲን እና ብረት የበለፀገ ነው። ፋይበር ሃይልን ቀስ በቀስ እንዲለቅ በማድረግ ድካምን ይከላከላል።",
      om: "Pirootiinii fi sibiila qaba. Fiber'n humna suuta gadi dhiisuun dadhabbi dhorka.",
      ti: "ብናይ ኣሕምልቲ ፕሮቲንን ሓጺንን ዝሃብተመ እዩ። ፋይበር ሓይሊ ቀስ ኢሉ ከም ዝወጽእ ብምግባር ድካም ይከላኸል።"
    },
    gomen: {
      en: "High potassium and calcium lowers blood pressure. Vitamin C increases iron absorption from shiro/misir.",
      am: "ከፍተኛ ፖታሺየም እና ካልሲየም የደም ግፊትን ይቀንሳል። ቫይታሚን ሲ ከሽሮና ምስር የሚገኘውን ብረት መምጠጥን ያፋጥናል።",
      om: "Potassium fi Calcium dhiibbaa dhiigaa hir'isu. Vitamin C'n sibiila misiraa fudhachuu deeggara.",
      ti: "ልዑል ፖታሲየምን ካልሲየምን ጸቕጢ ደም የውርዱ። ቫይታሚን ሲ ካብ ሽሮን ብርስንን ዘሎ ሓጺን መሳቢ ዓቕሚ የዛይድ።"
    },
    ayib: {
      en: "Calcium and high quality milk protein. Provides muscle fuel and supports pregnant women bone density.",
      am: "ካልሲየም እና ከፍተኛ ጥራት ያለው የፕሮቲን ምንጭ። የጡንቻን ጉልበት ይሰጣል፣ ለነፍሰ ጡሮች አጥንት ጥንካሬ ይረዳል።",
      om: "Calcium fi pirootiinii aannoo qaba. Humna maashaa uuma, ulfaaf gaariidha.",
      ti: "ካልሲየምን ልዑል ጽሬት ዘለዎ ናይ ጸባ ፕሮቲንን። ንጡንቻ ሓይሊ ይህብ፣ ንጥንሲ ድማ ዓጽሚ የትርር።"
    },
    kitfo: {
      en: "Extremely high iron and protein source. Must be cooked for pregnant women (avoid raw listeria risk). High fat warning.",
      am: "በጣም ከፍተኛ የብረትና ፕሮቲን ምንጭ። ለነፍሰ ጡር ሴቶች መብሰል አለበት (ጥሬ መብላት አይመከርም)። ከፍተኛ ስብ ስላለው በልኩ ይበላል።",
      om: "Pirootiinii fi sibiila baay'ee qaba. Ulfaaf bilchaachuu qaba (kitfo lebleb).",
      ti: "ኣዝዩ ልዑል ናይ ሓጺንን ፕሮቲንን ምንጪ እዩ። ንጥንሲ ክበስል ኣለዎ (ጥሬ ኣይበላዕን)።"
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-[#BA7517] font-semibold text-label uppercase tracking-widest">
          {currentLang === 'en' ? "Indigenous Nutrition AI" : (currentLang === 'am' ? "የሀገር በቀል አመጋገብ ረዳት" : (currentLang === 'om' ? "Nyaata Aadaa AI" : "ናይ ዓዲ ስነ-መግቢ AI"))}
        </span>
        <h1 className="text-2xl sm:text-3xl font-light text-[#085041] m-0 flex items-center justify-center">
          <Apple className="mr-2 w-6 h-6 text-[#1D9E75]" />
          {t.nutrition}
        </h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
          {currentLang === 'en'
            ? "Input your chronic conditions, view a customized 7-day Ethiopian meal plan, scan food photos for dynamic health critiques, and consult the database."
            : (currentLang === 'am'
              ? "የጤና ሁኔታዎችዎን ያስገቡ፣ ለእርስዎ የተዘጋጀ የ7-ቀን ምግብ እቅድ ያግኙ፣ የተመገቡትን ምግብ በካሜራ በመቃኘት የዋርካ AIን ትንተና ይከታተሉ።"
              : (currentLang === 'om'
                ? "Dhibee kee galmeessi, sagantaa nyaata aadaa guyyaa 7 argadhu, suuraa nyaataa kaameraan scan godhii xiinxala AI hordofi."
                : "ናይ ጥዕና ኩነታትኩም ኣእትዉ፣ ዝተዳለወ ናይ 7 መዓልቲ መግቢ መደብ የርእዩ፣ ዝበላዕኩምዎ መግቢ ብምእታው ናይ ዋርካ AI ትንተና ተከታተሉ።"))}
        </p>
      </div>

      {/* Profile Onboarding Trigger Button */}
      {!showOnboarding && (
        <div className="bg-white border border-[#9FE1CB]/20 p-4 rounded-xl flex items-center justify-between shadow-xs text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-xl">📊</span>
            <div>
              <span className="font-semibold text-xs text-[#085041] block">
                {xt.calculatedParams}
              </span>
              <p className="text-[11px] text-gray-500 m-0 mt-0.5">
                BMI: <span className="font-bold text-[#085041]">{bmi}</span> ({xt[bmiClassKey] || bmiClassKey}) • 
                {xt.caloricNeeds} 
                <span className="font-bold text-[#085041]"> {caloricNeeds} kcal</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowOnboarding(true)}
            className="border border-[#1D9E75] hover:bg-[#E1F5EE] text-[#085041] font-semibold px-4 py-2 rounded-lg text-xs transition-colors"
          >
            {xt.editProfile}
          </button>
        </div>
      )}

      {/* Onboarding Dialog */}
      {showOnboarding && (
        <form onSubmit={handleSaveProfile} className="bg-white border border-[#9FE1CB] rounded-2xl p-6 shadow-md space-y-6 text-left max-w-2xl mx-auto">
          <div className="flex items-center space-x-2 border-b pb-3">
            <span className="text-lg">📝</span>
            <h3 className="font-semibold text-sm text-black m-0">
              {xt.conditionsProfile}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-gray-600 block mb-1">{xt.age}</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full border p-2 rounded-lg text-black" required />
            </div>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">{xt.gender}</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border p-2 rounded-lg text-black">
                <option value="female">{xt.female}</option>
                <option value="male">{xt.male}</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">{xt.weight}</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border p-2 rounded-lg text-black" required />
            </div>
            <div>
              <label className="font-semibold text-gray-600 block mb-1">{xt.height}</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border p-2 rounded-lg text-black" required />
            </div>
          </div>

          {/* Health Conditions checkbox */}
          <div className="space-y-2 text-xs">
            <label className="font-semibold text-[#085041] block">{t.selectHealthConditions}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {HEALTH_CONDITIONS.map(c => (
                <label key={c.id} className="flex items-center space-x-2 p-2 border rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100/50">
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
                    className="rounded text-[#1D9E75] focus:ring-[#1D9E75]"
                  />
                  <span className="text-black">{c[currentLang] || c.en}</span>
                </label>
              ))}
            </div>
            <input 
               type="text" 
               placeholder="Other conditions (e.g. Acid Reflux, Allergies)" 
               value={customCondition}
               onChange={(e) => setCustomCondition(e.target.value)}
               className="w-full border p-2 rounded-lg text-black mt-2 focus:ring-2 focus:ring-[#1D9E75]/50 outline-none"
            />
          </div>

          {/* Dietary Practice */}
          <div className="space-y-2 text-xs">
            <label className="font-semibold text-[#085041] block">{t.selectDietary}</label>
            <select value={dietary} onChange={(e) => setDietary(e.target.value)} className="w-full border p-2 rounded-lg text-black">
              {DIETARY_PRACTICES.map(dp => (
                <option key={dp.id} value={dp.id}>{dp[currentLang] || dp.en}</option>
              ))}
            </select>
          </div>

          {/* Wellness Goal */}
          <div className="space-y-2 text-xs">
            <label className="font-semibold text-[#085041] block">{t.selectGoal}</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full border p-2 rounded-lg text-black">
              {Object.keys(goalLabels).map(key => (
                <option key={key} value={key}>{goalLabels[key][currentLang] || goalLabels[key].en}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="bg-[#085041] hover:bg-[#085041]/90 text-white font-semibold px-6 py-2.5 rounded-lg text-xs shadow-sm"
            >
              {xt.completeProfile}
            </button>
          </div>
        </form>
      )}

      {/* Main Tabs Selector */}
      <div className="flex border-b border-gray-200">
        {[
          { id: "meal_plan", label: t.mealPlanTitle },
          { id: "scan_food", label: t.scanFoodTitle },
          { id: "ask_ai", label: t.askAiFood },
          { id: "food_db", label: t.foodDb }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-center py-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#085041] text-[#085041]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        {/* Tab 1: Meal Plan */}
        {activeTab === "meal_plan" && (
          <div className="space-y-6">
            {/* Days Selector */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedDay === day
                      ? 'bg-[#085041] text-white shadow-sm'
                      : 'bg-white text-gray-500 border hover:bg-gray-50'
                  }`}
                >
                  {daysTranslation[day][currentLang] || day}
                </button>
              ))}
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { type: "breakfast", label: xt.breakfast, foodId: currentDayMeals.breakfast },
                { type: "lunch", label: xt.lunch, foodId: currentDayMeals.lunch },
                { type: "dinner", label: xt.dinner, foodId: currentDayMeals.dinner }
              ].map(meal => {
                const food = getFoodDetail(meal.foodId);
                return (
                  <div key={meal.type} className="bg-white border border-[#9FE1CB]/20 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-[10px] uppercase font-bold text-gray-400">{meal.label}</span>
                        <span className="text-[10px] bg-[#E1F5EE] text-[#085041] font-bold px-2 py-0.5 rounded border">
                          GI: {food.gi.split(' ')[0]}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-[#085041] m-0">
                          {getFoodName(food)}
                        </h4>
                        {food.image && (
                          <img src={food.image} alt={getFoodName(food)} className="w-full h-24 object-cover rounded-lg mt-2 border border-gray-100 shadow-sm" />
                        )}
                      </div>

                      {/* Display warning badge if conditions match */}
                      {selectedConditions.includes("diabetes") && food.id === "teff_injera" && (
                        <div className="bg-amber-50 text-amber-800 text-[10px] p-2 rounded-lg border border-amber-200">
                          {xt.diabeticWarning}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex gap-2">
                      <button
                        onClick={() => setActiveWhyChosen(food)}
                        className="flex-1 bg-[#E1F5EE] hover:bg-[#E1F5EE]/80 text-[#085041] text-[10px] py-1.5 rounded-lg font-bold"
                      >
                        {t.whyChosen}
                      </button>
                      <button
                        onClick={() => setActiveRecipe(food)}
                        className="flex-1 bg-[#085041] hover:bg-[#085041]/90 text-white text-[10px] py-1.5 rounded-lg font-bold"
                      >
                        {t.recipe}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Food Scanner */}
        {activeTab === "scan_food" && (
          <div className="space-y-6 max-w-xl mx-auto text-center">
            <div className="bg-white border border-[#9FE1CB]/20 p-6 rounded-2xl shadow-sm space-y-4">
              <Camera className="w-10 h-10 text-[#085041] mx-auto" />
              <h3 className="font-semibold text-sm text-[#085041] m-0">
                {xt.visualScanner}
              </h3>
              <p className="text-xs text-gray-500 leading-normal max-w-md mx-auto">
                {xt.scanDescription}
              </p>

              {/* Real Camera UI or Lock UI */}
              <div className="space-y-4 border-t pt-4">
                {scanCount >= 3 ? (
                  <div className="bg-[#FFFBF0] border border-[#BA7517]/30 rounded-xl p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-[#BA7517]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <h4 className="font-semibold text-sm text-[#BA7517] m-0">
                      {currentLang === 'en' ? "Free Scans Exhausted" : "ነፃ የፎቶ ስካን አልቋል"}
                    </h4>
                    <p className="text-xs text-gray-600 max-w-sm mx-auto">
                      {currentLang === 'en' 
                        ? "You have used your 3 free meal scans. Please upgrade to Warka Premium to unlock unlimited AI plate analysis."
                        : "የእርስዎን 3 ነፃ የምግብ ፎቶ ስካን ተጠቅመው ጨርሰዋል። ያልተገደበ አገልግሎት ለማግኘት ወደ ዋርካ ፕሪሚየም ያሳድጉ።"}
                    </p>
                    <button onClick={() => window.location.hash = "#pricing"} className="px-6 py-2 bg-[#BA7517] text-white text-xs font-bold rounded-lg shadow hover:bg-[#9a6011] transition">
                      {currentLang === 'en' ? "Upgrade to Premium" : "ወደ ፕሪሚየም ያሳድጉ"}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="relative w-full aspect-square bg-black rounded-xl overflow-hidden border-2 border-[#1D9E75] shadow-inner flex items-center justify-center">
                      {!cameraActive && !capturedImage && (
                        <button onClick={startCamera} className="absolute inset-0 flex flex-col items-center justify-center text-white/70 hover:text-white bg-black/50 hover:bg-black/30 transition-all">
                          <Camera className="w-12 h-12 mb-2" />
                          <span className="font-semibold text-sm">Start Camera ({3 - scanCount} free left)</span>
                        </button>
                      )}
                      {cameraActive && !capturedImage && (
                        <>
                          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-105" />
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-6">
                            <button onClick={toggleCameraFacingMode} className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition shadow-lg">
                              🔄
                            </button>
                            <button onClick={captureImage} className="bg-red-500 text-white w-14 h-14 rounded-full hover:bg-red-600 transition shadow-lg border-4 border-white flex items-center justify-center">
                              <Camera className="w-6 h-6" />
                            </button>
                          </div>
                        </>
                      )}
                      {capturedImage && (
                        <img src={capturedImage} alt="Captured meal" className="w-full h-full object-cover" />
                      )}
                    </div>

                    {capturedImage && (
                      <div className="flex space-x-3 justify-center pt-2">
                        <button onClick={() => setCapturedImage(null)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                          Retake
                        </button>
                        <button onClick={scanCapturedImage} className="flex-1 bg-[#1D9E75] text-white py-3 rounded-xl font-bold hover:bg-[#15825f] shadow-md transition">
                          Scan the Meal
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Scanning loader */}
              {isScanning && (
                <div className="py-6 flex flex-col items-center justify-center space-y-2">
                  <div className="w-8 h-8 border-4 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-gray-400 font-semibold">{xt.aiAnalyzing}</span>
                </div>
              )}

              {/* Result display */}
              {scanResult && !isScanning && (
                <div className="border-t pt-6 text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">{t.verdictLabel}</span>
                      <h4 className="font-semibold text-sm text-[#085041] m-0">{scanResult.foodName}</h4>
                    </div>
                    
                    {/* Verdict tag */}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      scanResult.verdict === 'green' 
                        ? 'bg-green-100 text-green-800' 
                        : (scanResult.verdict === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800')
                    }`}>
                      {scanResult.verdictLabel}
                    </span>
                  </div>

                  <div className="p-3.5 bg-gray-50 border rounded-xl space-y-2 text-xs">
                    <p className="leading-relaxed text-gray-600 m-0">
                      {scanResult.analysis}
                    </p>
                    <div className="border-t pt-2 mt-2">
                      <span className="font-semibold text-[#085041] block mb-0.5">{xt.portionLimit}:</span>
                      <p className="text-[11px] text-gray-500 m-0">{scanResult.portionAdvice}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Ask AI */}
        {activeTab === "ask_ai" && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-white border border-[#9FE1CB]/20 rounded-2xl p-4 flex flex-col shadow-sm min-h-[300px]">
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto space-y-4 p-2 text-xs text-left max-h-[220px]">
                {askChat.map((chat, idx) => (
                  <div key={idx} className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] text-gray-400 mb-0.5">
                      {chat.sender === 'user' 
                        ? (currentLang === 'en' ? "You" : (currentLang === 'am' ? "እርስዎ" : (currentLang === 'om' ? "Si" : "ንስኻ"))) 
                        : "Warka AI"}
                    </span>
                    <div className={`p-3 rounded-2xl max-w-[85%] shadow-xs leading-relaxed ${
                      chat.sender === 'user' 
                        ? 'bg-[#1D9E75] text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none border'
                    }`}>
                      {chat.text}
                    </div>
                  </div>
                ))}
                {isAsking && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-400 p-3 rounded-2xl rounded-tl-none max-w-[85%] border flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mr-1" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mr-1 [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                {askChat.length === 0 && (
                  <div className="h-full flex items-center justify-center text-gray-400 py-12 flex-col space-y-1">
                    <p>{xt.consultAi}</p>
                    <p className="text-[10px] text-gray-400/80">
                      {xt.tihloDiabetes}
                    </p>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleAskSubmit} className="border-t pt-3 flex space-x-2">
                <input
                  type="text"
                  placeholder={xt.askPlaceholder}
                  value={askQuery}
                  onChange={(e) => setAskQuery(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/50 bg-gray-50 text-black"
                />
                <button type="submit" className="bg-[#085041] text-white p-2 rounded-xl">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 4: Foods Database */}
        {activeTab === "food_db" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {ETHIOPIAN_FOODS.map(food => (
              <div key={food.id} className="bg-white border border-[#9FE1CB]/20 p-5 rounded-2xl shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <h4 className="font-semibold text-sm text-[#085041] m-0">
                    {getFoodName(food)}
                  </h4>
                  <span className="text-[9px] bg-[#E1F5EE] text-[#085041] font-bold px-2 py-0.5 rounded border border-[#9FE1CB]/40">
                    GI: {food.gi.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs space-y-1.5 text-gray-600">
                  <div className="m-0 leading-relaxed">
                    <span className="font-semibold text-[#085041] block mb-0.5">{xt.healthBenefit}</span>
                    <p className="m-0 text-gray-500">
                      {foodBenefits[food.id]?.[currentLang] || food.benefits}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] pt-1.5 border-t text-gray-400">
                    <div>
                      <span className="block font-semibold text-gray-600">{xt.iron}</span>
                      <span>{food.iron}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-600">{xt.potassium}</span>
                      <span>{food.potassium}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-600">{xt.sodium}</span>
                      <span>{food.sodium.split(' ')[0]} mg</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Why Chosen Modal */}
      {activeWhyChosen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border max-w-md w-full p-6 text-left space-y-4">
            <h3 className="font-semibold text-base text-[#085041] border-b pb-2 m-0 flex items-center">
              💡 {xt.whyChosenTitle}
            </h3>
            <div className="space-y-3">
              <p className="text-xs text-gray-600 leading-relaxed m-0 font-medium">
                {currentLang === 'en' ? "Personalized just for you based on your profile:" : (currentLang === 'am' ? "በእርስዎ የጤና መረጃ ላይ ተመስርቶ የተመረጠበት ምክንያት:" : "Sababa filatameef:")}
              </p>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-xs text-amber-900 leading-relaxed">
                {currentLang === 'en' 
                  ? `Given your age (${userProfile.age}) and goal to ${goalLabels[userProfile.wellnessGoal]?.en.toLowerCase() || 'stay healthy'}, this food is highly recommended. ${
                      userProfile.healthConditions.includes('diabetes') ? 'It manages your blood sugar safely.' : ''
                    } ${
                      userProfile.healthConditions.includes('hypertension') ? 'It is chosen for its heart-healthy profile.' : ''
                    }`
                  : (currentLang === 'am' 
                    ? `በእድሜዎ (${userProfile.age}) እና ${goalLabels[userProfile.wellnessGoal]?.am || 'ጤናዎን ለመጠበቅ'} ባለው ግብ ምክንያት፣ ይህ ምግብ በጥብቅ ይመከራል። ${
                        userProfile.healthConditions.includes('diabetes') ? 'የደም ስኳርዎን በተገቢው መንገድ ያስተካክላል።' : ''
                      }`
                    : `Umrii kee (${userProfile.age}) fi galma fayyaa keetiif baay'ee gaariidha.`)}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed m-0">
                <span className="font-semibold block mb-1">Dietary & Health Benefits:</span>
                {foodBenefits[activeWhyChosen.id]?.[currentLang] || activeWhyChosen.benefits}
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveWhyChosen(null)}
                className="bg-[#085041] hover:bg-[#085041]/90 text-white text-xs px-5 py-2.5 rounded-lg font-semibold shadow-xs transition-colors"
              >
                {xt.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Modal */}
      {activeRecipe && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border max-w-lg w-full p-6 text-left space-y-4 my-8 relative">
            <button 
              onClick={() => setActiveRecipe(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-colors"
            >
              ✕
            </button>
            <h3 className="font-semibold text-base text-[#085041] border-b pb-2 m-0 flex items-center">
              <button onClick={() => setActiveRecipe(null)} className="mr-3 text-gray-400 hover:text-gray-600">←</button>
              👨‍🍳 {xt.prepGuide}
            </h3>
            
            {activeRecipe.videoUrl && (
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black mt-2">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={activeRecipe.videoUrl} 
                  title="Recipe Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start space-x-2">
              <span className="text-lg">👩‍🍳</span>
              <p className="text-xs text-blue-900 leading-relaxed font-medium m-0">
                <strong>Best Note:</strong> {currentLang === 'en' ? "Cook with low heat to preserve the nutritional value of the ingredients. Always wash your hands before preparation." : "ምግቡን ሲያበስሉ የንጥረ ነገሮቹን ጥቅም ላለማጥፋት በዝቅተኛ ሙቀት ላይ ያብስሉ። ከመጀመርዎ በፊት እጅዎን በደንብ ይታጠቡ።"}
              </p>
            </div>

            <div className="text-xs space-y-3 leading-relaxed text-gray-600 pt-2">
              <div>
                <span className="font-bold text-[#085041] block">
                  {xt.ingredients.replace('{cost}', '')}
                </span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-500">
                  {activeRecipe.ingredientsEn ? activeRecipe.ingredientsEn.split(', ').map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  )) : <li>{currentLang === 'en' ? "Fresh local market ingredients" : "በአቅራቢያ የሚገኙ የገበያ ግብዓቶች"}</li>}
                </ul>
              </div>

              <div>
                <span className="font-bold text-[#085041] block">{xt.stepCooking}</span>
                <p className="mt-1 leading-relaxed whitespace-pre-line">
                  {activeRecipe.stepsEn || (currentLang === 'en' ? "Assemble and serve fresh according to traditional customs." : "እንደ ባህሉ አዘጋጅተው ትኩስነቱን ሳይቀንስ ይመገቡ።")}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-3.5 grid grid-cols-2 text-[10px] text-gray-400">
                <div>{xt.portionLimit}<span className="font-semibold text-gray-600">{activeRecipe.portionAdvice}</span></div>
                <div>{xt.sodiumContent}<span className="font-semibold text-gray-600">{activeRecipe.sodium}</span></div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveRecipe(null)}
                className="bg-[#085041] text-white text-xs px-4 py-2 rounded-lg font-semibold shadow-xs"
              >
                {xt.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
