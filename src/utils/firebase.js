// Firebase Client SDK Integration & Local Storage Sync Fallback

// We define a database service that interfaces with localStorage by default
// so that the app works instantly without any backend setup, but is architected
// for direct Firebase Web SDK drop-in.

const DB_PREFIX = "warka_db_";

export const dbService = {
  // Save a record
  save: (table, key, data) => {
    try {
      const fullKey = `${DB_PREFIX}${table}_${key}`;
      localStorage.setItem(fullKey, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("DB Save Error:", e);
      return false;
    }
  },

  // Get a record
  get: (table, key) => {
    try {
      const fullKey = `${DB_PREFIX}${table}_${key}`;
      const item = localStorage.getItem(fullKey);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("DB Get Error:", e);
      return null;
    }
  },

  // List all records under a table prefix
  list: (table) => {
    try {
      const items = [];
      const prefix = `${DB_PREFIX}${table}_`;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          const val = localStorage.getItem(key);
          if (val) {
            items.push(JSON.parse(val));
          }
        }
      }
      return items;
    } catch (e) {
      console.error("DB List Error:", e);
      return [];
    }
  },

  // Delete a record
  remove: (table, key) => {
    try {
      const fullKey = `${DB_PREFIX}${table}_${key}`;
      localStorage.removeItem(fullKey);
      return true;
    } catch (e) {
      console.error("DB Remove Error:", e);
      return false;
    }
  }
};

// Seed initial profile or test data if empty
export const seedInitialData = () => {
  if (!dbService.get("config", "seeded_v3")) {
    // Seed some mock bookings or community group chats for demo
    const mockChats = [
      {
        id: "chat_doc_1",
        groupId: "g_doctors",
        sender: "Anonymous Doctor",
        textAm: "በሆስፒታሉ ውስጥ ለ12 ሰዓታት ሰርቼ አሁን በጣም ዝያጭኛል፤ የድካም ስሜቴን እንዴት ልቆጣጠረው?",
        textEn: "I worked 12 hours at the hospital and I'm exhausted. How can I manage this fatigue?",
        timestamp: Date.now() - 3600000 * 2
      },
      {
        id: "chat_doc_2",
        groupId: "g_doctors",
        sender: "Dr. Aster",
        textAm: "እባክዎን ከስራ በኋላ ትንሽ እረፍት ያድርጉ። በአቅራቢያዎ ቆም ብለው ሻይ/ቡና ይጠጡ።",
        textEn: "Please take a short rest after work. Have a slow tea or buna near you.",
        timestamp: Date.now() - 3600000
      }
    ];

    mockChats.forEach(chat => {
      dbService.save("group_chats", chat.id, chat);
    });

    // Seed default demo users for the community directory
    const seedUsers = [
      { 
        username: "aster", 
        nickname: "Dr. Aster", 
        password: "123", 
        email: "aster@warka.org",
        profile: { ageGroup: "adults", profession: "doctors", economicStatus: "comfortable", healthConditions: ["stress"], dietaryPractice: "none", wellnessGoal: "stress_management" }
      },
      { 
        username: "chala", 
        nickname: "Chala", 
        password: "123", 
        email: "chala@warka.org",
        profile: { ageGroup: "young_adults", profession: "students", economicStatus: "middle_income", healthConditions: ["none"], dietaryPractice: "vegetarian", wellnessGoal: "mental_focus" }
      },
      { 
        username: "abebe", 
        nickname: "Abebe", 
        password: "123", 
        email: "abebe@warka.org",
        profile: { ageGroup: "young_adults", profession: "farmers", economicStatus: "low_income", healthConditions: ["chronic"], dietaryPractice: "none", wellnessGoal: "physical_health" }
      }
    ];
    seedUsers.forEach(u => {
      dbService.save("users", u.username, u);
    });

    dbService.save("config", "seeded_v3", { seeded: true, date: Date.now() });
  }
};

export const authService = {
  register: (username, password, nickname, email) => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email ? email.trim().toLowerCase() : "";
    if (!cleanUsername || !password || !nickname.trim() || !cleanEmail) {
      return { success: false, message: "All fields are required." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, message: "Please enter a valid email address." };
    }
    const existing = dbService.get("users", cleanUsername);
    if (existing) {
      return { success: false, message: "Username already exists." };
    }
    const allUsers = dbService.list("users");
    const existingEmail = allUsers.find(u => u.email && u.email.trim().toLowerCase() === cleanEmail);
    if (existingEmail) {
      return { success: false, message: "Email is already registered." };
    }
    const userData = { 
      username: cleanUsername, 
      nickname: nickname.trim(), 
      password, 
      email: cleanEmail,
      profile: {
        ageGroup: 'young_adults',
        profession: 'students',
        economicStatus: 'middle_income',
        healthConditions: ['none'],
        dietaryPractice: '',
        wellnessGoal: ''
      }
    };
    dbService.save("users", cleanUsername, userData);
    return { success: true, user: userData };
  },

  login: (usernameOrEmail, password) => {
    const cleanInput = usernameOrEmail.trim().toLowerCase();
    let user = dbService.get("users", cleanInput);
    if (!user) {
      const allUsers = dbService.list("users");
      user = allUsers.find(u => u.email && u.email.trim().toLowerCase() === cleanInput);
    }
    if (!user || user.password !== password) {
      return { success: false, message: "Invalid username/email or password." };
    }
    return { success: true, user };
  },

  updateUserProfile: (username, profileData) => {
    const cleanUsername = username.trim().toLowerCase();
    const user = dbService.get("users", cleanUsername);
    if (!user) return { success: false, message: "User not found." };
    user.profile = profileData;
    dbService.save("users", cleanUsername, user);
    return { success: true, user };
  },

  getUsers: () => {
    return dbService.list("users").map(u => ({ 
      username: u.username, 
      nickname: u.nickname, 
      email: u.email, 
      profile: u.profile 
    }));
  }
};
