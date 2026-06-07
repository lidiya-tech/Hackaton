import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { authService, seedInitialData } from './utils/firebase';
import { Smile, User, Lock, Mail } from 'lucide-react';

// Import Pages
import { Home } from './pages/Home';
import { HowItWorks } from './pages/HowItWorks';
import { Features } from './pages/Features';
import { Community } from './pages/Community';
import { Wellness } from './pages/Wellness';
import { Nutrition } from './pages/Nutrition';
import { Discover } from './pages/Discover';
import { BusinessModel } from './pages/BusinessModel';
import { Pricing } from './pages/Pricing';
import { CheckIn } from './pages/CheckIn';
import { Entertainment } from './pages/Entertainment';
import { Music } from './pages/Music';
import { MusicPlayer } from './components/MusicPlayer';

function App() {
  // Global States
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('warka_lang') || 'en';
  });

  const [route, setRoute] = useState(() => {
    const hash = window.location.hash;
    return hash || '#home';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('warka_profile');
    return saved ? JSON.parse(saved) : {
      ageGroup: '',
      profession: '',
      economicStatus: '',
      healthConditions: [],
      dietaryPractice: '',
      wellnessGoal: ''
    };
  });

  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('warka_gemini_api_key') || '';
  });

  // User Auth State (using sessionStorage to enable multi-user testing in separate tabs)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = sessionStorage.getItem("warka_current_user");
    if (saved) return JSON.parse(saved);
    // Default guest user since login is removed
    const guestUser = { username: 'guest', nickname: 'Guest', email: 'guest@warka.app', profile: {} };
    sessionStorage.setItem("warka_current_user", JSON.stringify(guestUser));
    return guestUser;
  });

  // Auth Form States
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authNickname, setAuthNickname] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authError, setAuthError] = useState("");

  // Music Player Global State
  const [musicState, setMusicState] = useState({
    currentTrack: null,
    playlist: [],
    isPlaying: false
  });

  // Seed DB & load initial configuration
  useEffect(() => {
    seedInitialData();
  }, []);

  // Listen to hash change routing
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#home');
      window.scrollTo(0, 0); // scroll to top on routing
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('warka_lang', lang);
  };

  const handleUpdateProfile = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('warka_profile', JSON.stringify(profile));
    
    if (currentUser) {
      const updatedUser = { ...currentUser, profile };
      setCurrentUser(updatedUser);
      sessionStorage.setItem("warka_current_user", JSON.stringify(updatedUser));
      authService.updateUserProfile(currentUser.username, profile);
    }
  };

  const handleSaveApiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('warka_gemini_api_key', key);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    sessionStorage.setItem("warka_current_user", JSON.stringify(user));
    
    // Sync nickname and check if the user has a saved profile in the database
    if (user.profile) {
      setUserProfile(user.profile);
      localStorage.setItem('warka_profile', JSON.stringify(user.profile));
    } else {
      setUserProfile(prev => {
        const updated = { ...prev, name: user.nickname, ageGroup: prev.ageGroup || 'young_adults', profession: prev.profession || 'students', healthConditions: prev.healthConditions || ['none'] };
        localStorage.setItem('warka_profile', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("warka_current_user");
    setCurrentUser(null);
    window.location.hash = "#home";
  };

  // Nav routing helper
  const navigateTo = (hash) => {
    window.location.hash = hash;
    setRoute(hash);
  };

  // Page switcher
  const renderActivePage = () => {
    const baseRoute = route.split('?')[0];
    switch (baseRoute) {
      case '#home':
        return <Home currentLang={language} onNavigate={navigateTo} />;
      case '#how-it-works':
        return <HowItWorks currentLang={language} />;
      case '#community':
        return <Community currentLang={language} userProfile={userProfile} currentUser={currentUser} onLogout={handleLogout} />;
      case '#mindfuel':
        return (
          <div className="divide-y divide-gray-100">
            <Wellness currentLang={language} userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />
            <Nutrition
              currentLang={language}
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              geminiApiKey={geminiApiKey}
            />
          </div>
        );
      case '#discover':
        return <Discover currentLang={language} userProfile={userProfile} />;
      case '#entertainment':
        return <Entertainment currentLang={language} />;
      case '#music':
        return <Music currentLang={language} musicState={musicState} setMusicState={setMusicState} />;
      case '#pricing':
        return (
          <div className="divide-y divide-gray-100">
            <BusinessModel currentLang={language} />
            <Pricing currentLang={language} />
          </div>
        );
      case '#check-in':
        return (
          <CheckIn
            currentLang={language}
            onChangeLang={handleLanguageChange}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            geminiApiKey={geminiApiKey}
            onSaveApiKey={handleSaveApiKey}
          />
        );
      default:
        return <Home currentLang={language} onNavigate={navigateTo} />;
    }
  };

  // Handle Authentication Gate render
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError("");

    if (authMode === "login") {
      const res = authService.login(authUsername, authPassword);
      if (res.success) {
        handleLoginSuccess(res.user);
        setAuthUsername("");
        setAuthPassword("");
      } else {
        setAuthError(res.message);
      }
    } else {
      const res = authService.register(authUsername, authPassword, authNickname, authEmail);
      if (res.success) {
        handleLoginSuccess(res.user);
        setAuthUsername("");
        setAuthPassword("");
        setAuthNickname("");
        setAuthEmail("");
      } else {
        setAuthError(res.message);
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50/50 py-12">
        <div className="max-w-md w-full space-y-8 bg-white border border-[#9FE1CB]/30 p-8 rounded-3xl shadow-xl transition-all duration-300">
          <div className="text-center space-y-3">
            <span className="text-4xl">🌳</span>
            <h2 className="text-2xl font-light text-[#085041] tracking-tight">
              {language === 'en' ? "Welcome to Warka" : "ወደ ዋርካ እንኳን ደህና መጡ"}
            </h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              {language === 'en'
                ? "Please log in or create an account with a custom nickname and email to access Warka's complete digital health features."
                : "እባክዎ የዋርካን የተሟላ የዲጂታል ጤና አገልግሎቶችን ለመጠቀም ይግቡ ወይም የማሳያ ስም (nickname) እና ኢሜይል በመፍጠር አካውንት ይክፈቱ።"}
            </p>
          </div>

          {/* Auth Tab switcher */}
          <div className="flex border-b border-gray-100 pb-2 gap-4">
            <button
              onClick={() => { setAuthMode("login"); setAuthError(""); }}
              className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                authMode === "login" 
                  ? "border-[#1D9E75] text-[#085041]" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {language === 'en' ? "Log In" : "ግባ"}
            </button>
            <button
              onClick={() => { setAuthMode("register"); setAuthError(""); }}
              className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                authMode === "register" 
                  ? "border-[#1D9E75] text-[#085041]" 
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {language === 'en' ? "Create Account" : "አካውንት ፍጠር"}
            </button>
          </div>

          {authError && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-left font-medium">
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
            {authMode === "register" && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                    {language === 'en' ? "Display Nickname" : "የማሳያ ስም (Nickname)"}
                  </label>
                  <div className="relative">
                    <Smile className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder={language === 'en' ? "e.g., Abebe_Wellness" : "ለምሳሌ፡ አበበ_ሰላም"}
                      value={authNickname}
                      onChange={(e) => setAuthNickname(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1D9E75] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                    {language === 'en' ? "Email Address" : "የኢሜይል አድራሻ"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder={language === 'en' ? "e.g., user@warka.org" : "ለምሳሌ፡ user@warka.org"}
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1D9E75] transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                {authMode === "login" 
                  ? (language === 'en' ? "Username or Email" : "የተጠቃሚ ስም ወይም ኢሜይል")
                  : (language === 'en' ? "Username" : "የተጠቃሚ ስም")}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder={
                    authMode === "login"
                      ? (language === 'en' ? "Enter username or email" : "የተጠቃሚ ስም ወይም ኢሜይል ያስገቡ")
                      : (language === 'en' ? "Enter username" : "የተጠቃሚ ስም ያስገቡ")
                  }
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1D9E75] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                {language === 'en' ? "Password" : "የይለፍ ቃል"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder={language === 'en' ? "••••••••" : "••••••••"}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#1D9E75] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#085041] hover:bg-[#085041]/90 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md transition-all duration-150 mt-4 flex items-center justify-center gap-2"
            >
              {authMode === "login" 
                ? (language === 'en' ? "Log In" : "ግባ")
                : (language === 'en' ? "Register & Enter" : "ተመዝግበህ ግባ")}
            </button>
          </form>
          
          <div className="text-center pt-2 text-[10px] text-gray-400 leading-normal">
            {language === 'en' 
              ? "Tip: Register two accounts (e.g. 'abebe' & 'chala') in two tabs to test live messaging!" 
              : "ምክር፡ ቀጥታ መልእክቶችን ለመሞከር በሁለት ታቦች ውስጥ ሁለት አካውንቶችን ይመዝግቡ!"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always visible */}
      <Navbar
        currentLang={language}
        onChangeLang={handleLanguageChange}
        activeRoute={route}
        onNavigate={navigateTo}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Page Area */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>


      {/* Global Sticky Music Player */}
      <MusicPlayer musicState={musicState} setMusicState={setMusicState} />
    </div>
  );
}

export default App;
