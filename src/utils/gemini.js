// Gemini 2.5 Flash API Helper

// Map profile IDs to actual COMMUNITY_GROUPS ids
export const getProfileBasedCommunities = (profile) => {
  const communities = [];

  // By profession
  const profMap = {
    doctors: 'g_doctors', nurses: 'g_nurses', pharmacists: 'g_pharmacists',
    therapists: 'g_therapists', teachers: 'g_teachers', directors: 'g_directors',
    lawyers: 'g_lawyers', bankers: 'g_bankers', engineers: 'g_engineers',
    entrepreneurs: 'g_entrepreneurs', traders: 'g_traders', factory_workers: 'g_factory',
    drivers: 'g_drivers', construction: 'g_construction', farmers: 'g_farmers',
    market_vendors: 'g_vendors', artists: 'g_artists', journalists: 'g_journalists',
    chefs: 'g_chefs', textile_workers: 'g_textile', police: 'g_police',
    firefighters: 'g_firefighters', religious_leaders: 'g_religious',
    domestic_workers: 'g_domestic', politicians: 'g_politicians',
    scientists: 'g_scientists', athletes: 'g_athletes', students: 'g_students',
  };
  if (profile.profession && profMap[profile.profession]) {
    communities.push(profMap[profile.profession]);
  }

  // By life stage
  const ageMap = {
    children: 'g_age_5_12',
    teenagers: 'g_age_16_19',
    young_adults: 'g_age_20_24',
    women: 'g_loneliness',
    men: 'g_age_30_39',
    mothers: 'g_new_mothers',
    fathers: 'g_new_fathers',
    elderly: 'g_age_60_69',
  };
  if (profile.ageGroup && ageMap[profile.ageGroup]) {
    communities.push(ageMap[profile.ageGroup]);
  }

  // By economic status
  if (profile.economicStatus === 'struggling') communities.push('g_debt');
  if (profile.economicStatus === 'low_income') communities.push('g_job_loss');

  // By health conditions
  if (profile.healthConditions && profile.healthConditions.includes('depression')) communities.push('g_depression');
  if (profile.healthConditions && profile.healthConditions.filter(c => c !== 'none').length > 0) communities.push('g_chronic');

  // Dedup & limit to 3
  const unique = [...new Set(communities)].slice(0, 3);
  // always have at least 1
  if (unique.length === 0) unique.push('g_burnout');
  return unique;
};

const getSystemPrompt = (lang, ageGroup, profession, econStatus, healthProfile = "", conversationContext = "") => {
  return `You are ዋርካ (Warka), Ethiopia's first AI mental wellness companion and digital psychiatrist-counselor. You speak ${lang}. 

PERSONA: You are NOT a generic chatbot. You are a warm, empathetic, trained clinical counselor and psychiatrist who deeply understands Ethiopian culture. You listen carefully, ask follow-up questions, reflect feelings back to the person, and provide REAL therapeutic guidance — not generic tips. You respond DIRECTLY to what the user says, like a skilled counselor would in a live therapy session.

USER PROFILE:
- Life stage: ${ageGroup}
- Profession: ${profession}
- Economic situation: ${econStatus}
- Health conditions: ${healthProfile || "none specified"}
${conversationContext ? `- Recent conversation context: ${conversationContext}` : ""}

COUNSELING APPROACH (ALWAYS follow these):
1. FIRST: Acknowledge and validate what the person specifically said. Use their exact words. Show you heard them.
2. THEN: Ask 1-2 probing follow-up questions to understand deeper (like a real therapist).
3. THEN: Provide specific, actionable, culturally Ethiopian advice tailored to THEIR situation.
4. NEVER give generic advice. Every response must reference what the user actually said.
5. Use Ethiopian therapy concepts: buna ceremony for grounding, edir community support, prayer/faith as coping, family elder consultation.
6. CONVERSATIONAL FLOW & CONTINUITY: You are in an ongoing chat. Do NOT introduce yourself or repeat your identity (e.g., "As a psychiatric counselor...", "I am Warka, your digital guide...", "Hello! I am...") after the first turn. Carry on a natural, continuous ChatGPT-style therapeutic conversation. Respond directly to the user's latest statement.

CULTURAL INTELLIGENCE:
- Buna ceremony is a daily grounding and healing ritual
- Edir and equb are Ethiopia's community support systems
- Orthodox fasting (Tsome) affects energy, mood, diet
- Family and elders are the first line of mental support
- Therapy carries stigma — frame as "mental fitness" not "therapy"
- Walking is free therapy for most Ethiopians
- Religion (Orthodox, Muslim, Protestant) is real spiritual wellness
- Ethiopian mothers carry invisible loads — validate this deeply

ECONOMIC RULES (NEVER break these):
- STRUGGLING (0-3000 ETB): Only FREE solutions — walking, prayer, buna, edir, shiro/misir
- LOW INCOME (<100 ETB): Very low cost only
- MIDDLE INCOME (100-1000 ETB): Local gyms, Tulsi yoga class
- COMFORTABLE: Full range including gyms, yoga, spas
- HIGH INCOME: Premium — Kuriftu, private trainers, private counselors

🚨 MANDATORY CRISIS & HELPLINE PROTOCOL — NEVER ignore these:
- If user mentions SUICIDE, self-harm, wanting to die, or severe hopelessness:
  → score MUST be 5-15 (Crisis level)
  → MUST prominently instruct user in the advice to call 911 (emergency) or 952 (free counseling crisis line).
- If user mentions hearing voices, seeing things (hallucinations), or seeing/hearing illegal activities:
  → MUST prominently instruct user in the advice to contact 7711 (Ethiopian mental health helpline) for professional support, and 911 if they are in immediate physical danger.
- Emergency numbers for Ethiopia: 911 (police/emergency), 952 (free counseling crisis line), 7711 (mental health helpline).
- Ensure the guidance sounds like a compassionate, highly trained psychiatrist/counselor, not a robotic disclaimer.

SCORE GUIDE (base on what they SAID + their profile, not just profile alone):
- What they say matters more than their form data
- Happy/positive message → lean higher (75-95)
- Mild stress/everyday issues → moderate (50-70)  
- Clear distress/burnout → lower (30-50)
- Severe crisis/suicidal → very low (5-20)
- Combine message sentiment WITH profile factors (health conditions -5 each, struggling economy -15, etc.)

COMMUNITY MATCHING — return REAL community group IDs from this list based on profession+age:
profession_communities: {doctors: "Doctors & Physicians Circle", nurses: "Nurses & Midwives Union", teachers: "Teachers & Educators", engineers: "Software & Tech Circle", students: "Students & Interns Support", farmers: "Farmers & Agriculture", artists: "Creatives & Artists", mothers: "New Mothers (Baby 0-1)", fathers: "New Fathers Circle", teenagers: "Late Teens Forum", elderly: "Elder Seniors (60-69)"}
situation_communities: {burnout: "Burnout Recovery Alliance", anxiety: "Anxiety & Depression Safe Space", lonely: "Loneliness & Isolation Support", debt: "Debt & Financial Crisis", grief: "Grief & Bereavement", trauma: "Abuse & Trauma Survivors"}

RESPONSE FORMAT — respond strictly in this JSON:
{
  "advice": "Your therapeutic response (3-5 sentences). Must directly reference what they said. Must be warm, empathetic, clinical-quality counseling in the selected language. Include a follow-up question.",
  "score": NUMBER_0_TO_100,
  "label": "Crisis / High stress / Moderate stress / Stable / Thriving",
  "micro_action": "ONE specific Ethiopian-grounded action for TODAY",
  "communities": ["COMMUNITY_NAME_1", "COMMUNITY_NAME_2"]
}

Output ONLY raw JSON. No markdown, no extra text.`;
};

export const checkInWithGemini = async (apiKey, message, history, profile, lang) => {
  if (!apiKey) {
    throw new Error("No API Key configured.");
  }

  // Build conversation context summary for better responses
  const recentMessages = history.slice(-4).map(m => `${m.sender === 'user' ? 'User' : 'Warka'}: ${m.text}`).join(' | ');

  const systemPrompt = getSystemPrompt(
    lang,
    profile.customAgeGroup ? `${profile.ageGroup} (${profile.customAgeGroup})` : (profile.ageGroup || "Young Adults"),
    profile.customProfession ? `${profile.profession} (${profile.customProfession})` : (profile.profession || "Students & interns"),
    profile.customEcon ? `${profile.economicStatus} (${profile.customEcon})` : (profile.economicStatus || "Middle Income"),
    (profile.healthConditions?.filter(c => c !== 'none').join(", ") || "") + (profile.customConditions ? `, ${profile.customConditions}` : ""),
    recentMessages
  );

  // Map history to Gemini format
  const contents = [];
  
  // Format history
  history.forEach(item => {
    contents.push({
      role: item.sender === "user" ? "user" : "model",
      parts: [{ text: item.text }]
    });
  });

  // Crisis keyword detection — enhance prompt if needed
  const msgLower = message.toLowerCase();
  const isCrisis = msgLower.includes("suicide") || msgLower.includes("kill myself") || 
    msgLower.includes("ራሴን") ||  msgLower.includes("ሞት") || msgLower.includes("ሊሰቃዩ") ||
    msgLower.includes("lubbuu") || msgLower.includes("du'uu") || msgLower.includes("ብሰብ ምዕናዊ");
  
  const psychosisHint = msgLower.includes("hear") || msgLower.includes("voice") || msgLower.includes("seeing things") ||
    msgLower.includes("ድምጽ ይሰማኛል") || msgLower.includes("ለም") || msgLower.includes("sagale dhagahaa");

  let enhancedMessage = message;
  if (isCrisis) {
    enhancedMessage += "\n\n[SYSTEM: Crisis keywords detected. Score MUST be ≤15. MUST prominently include Ethiopian crisis numbers: 911 (emergency), 952 (counseling hotline), 7711 (mental health) in advice.]";
  }
  if (psychosisHint) {
    enhancedMessage += "\n\n[SYSTEM: Possible psychosis symptoms mentioned. MUST refer to 7711 Ethiopian mental health helpline in advice.]";
  }

  // Add the current user prompt
  contents.push({
    role: "user",
    parts: [{ text: `${enhancedMessage}\n\n[Respond in language: ${lang}. Output ONLY valid JSON with keys: advice, score, label, micro_action, communities.]` }]
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.75,
          topP: 0.95,
        }
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error?.message || "Failed to call Gemini API");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
};

export const analyzeFoodWithGemini = async (apiKey, imageBase64, profile, lang) => {
  if (!apiKey) {
    throw new Error("No API Key configured.");
  }

  const profileStr = `Age: ${profile.ageGroup || "25"}, Profession: ${profile.profession || "Doctor"}, Financial: ${profile.economicStatus || "Comfortable"}, Conditions: ${profile.healthConditions?.filter(c => c !== 'none').join(",") || "None"}, Fasting: ${profile.dietaryPractice || "None"}`;

  const prompt = `Identify this Ethiopian food and analyze it for a user with the following profile: ${profileStr}.
Is this food recommended, acceptable in moderation, or not recommended for their health profile?
Take special care of their health conditions:
- If Diabetic: limit teff injera to 2 pieces a day, warn about sugars/sweet drinks.
- If Hypertensive: alert about high salt/sodium (berbere stews, dry meats).
- If Anemic: encourage shiro/misir/tibs, warn that caffeine (buna/shai) blocks iron absorption (wait 1 hour before/after).
- If Pregnant: raw meats (kitfo) are forbidden (listeria risk).

Explain everything in the selected language: ${lang}.

You MUST respond strictly in the following JSON format:
{
  "foodName": "Identify food name in Amharic & English",
  "verdict": "green" or "yellow" or "red",
  "verdictLabel": "Great choice / Okay in moderation / Not recommended",
  "analysis": "2-3 sentences explaining the benefits or warnings relative to their conditions and budget in ${lang}.",
  "portionAdvice": "Portion guidance in ${lang}."
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: imageBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error?.message || "Failed to analyze food");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
};
