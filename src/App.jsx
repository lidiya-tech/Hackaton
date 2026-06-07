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
    return saved ? JSON.parse(saved) : null;
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
