import React, { useState, useEffect } from 'react';
import { Newspaper, BookOpen, Video, Smile, Film, Globe, TrendingUp, HeartPulse } from 'lucide-react';

export const Entertainment = ({ currentLang }) => {

  const sectionTitles = {
    en: {
      news: "Latest Global & Local News",
      books: "Book Recommendations",
      videos: "Trending Videos",
      facts: "Did You Know?",
      movies: "Latest Movies",
      stress: "Stress Control Tricks & Videos"
    },
    am: {
      news: "አዳዲስ አለም አቀፍ እና የሀገር ውስጥ ዜናዎች",
      books: "የመጽሐፍ ምክሮች",
      videos: "ተወዳጅ ቪዲዮዎች",
      facts: "ይህን ያውቃሉ?",
      movies: "አዳዲስ ፊልሞች",
      stress: "የጭንቀት መቆጣጠሪያ ዘዴዎች እና ቪዲዮዎች"
    },
    om: {
      news: "Oduu Addunyaa fi Biyya Keessaa",
      books: "Kitaabota Filataman",
      videos: "Viidiyoowwan Booddee",
      facts: "Kana Beektuu?",
      movies: "Fiilmiiwwan Haaraa",
      stress: "Tooftaalee fi Viidiyoowwan Dhiphina To'achuuf Gargaaran"
    },
    ti: {
      news: "ሓደስቲ ዜና ዓለምን ውሽጢ ዓድን",
      books: "ናይ መጻሕፍቲ ምኽርታት",
      videos: "ዝተፈተዉ ቪድዮታት",
      facts: "እዚ ትፈልጡ ዶ?",
      movies: "ሓደስቲ ፊልምታት",
      stress: "ናይ ጭንቀት ምቁጽጻር ሜላታትን ቪድዮታትን"
    }
  };

  const st = sectionTitles[currentLang] || sectionTitles.en;

  // Full Master Lists
  const allNews = [
    { id: 1, title: "Ethiopian Athletes Dominate Marathon", source: "Ethiopian Herald", time: "2 mins ago", type: "local", image: "https://images.unsplash.com/photo-1552674605-171ff7ea92cb?auto=format&fit=crop&q=80&w=400", desc: "Local athletes swept the podium in a stunning display of endurance and speed." },
    { id: 2, title: "Global Tech Summit Highlights AI Future", source: "World News Network", time: "5 mins ago", type: "global", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400", desc: "Leaders gathered to discuss the rapid advancements in AI and its implication." },
    { id: 3, title: "New Warka App Transforms Local Wellness", source: "Tech Africa", time: "Just now", type: "local", image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80&w=400", desc: "A revolutionary new app is connecting Ethiopians with localized wellness programs." },
    { id: 4, title: "Space Telescope Captures New Galaxy", source: "Science Daily", time: "1 hour ago", type: "global", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=400", desc: "Astronomers have discovered a massive new galaxy that challenges our understanding of the universe." },
    { id: 5, title: "Coffee Export Reaches Record High", source: "Business Today", time: "15 mins ago", type: "local", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400", desc: "Ethiopian coffee exports have surged, bringing significant economic growth to farming communities." },
    { id: 6, title: "Breakthrough in Renewable Energy", source: "Eco News", time: "30 mins ago", type: "global", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=400", desc: "Scientists have developed a new solar panel that is 50% more efficient." },
    { id: 7, title: "Addis Ababa Light Rail Expansion", source: "City News", time: "3 hours ago", type: "local", image: "https://images.unsplash.com/photo-1614088656113-70d5eb730c44?auto=format&fit=crop&q=80&w=400", desc: "New tracks laid down to connect the southern suburbs with the city center." },
    { id: 8, title: "Mars Rover Finds Signs of Water", source: "Astro Journal", time: "6 hours ago", type: "global", image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=400", desc: "Recent soil samples indicate liquid water may have flowed much more recently than thought." },
    { id: 9, title: "Grand Renaissance Dam Reaches Milestone", source: "Ethiopian Herald", time: "4 hours ago", type: "local", image: "https://images.unsplash.com/photo-1544626154-db2789f250cd?auto=format&fit=crop&q=80&w=400", desc: "The mega-dam project has reached a critical water retention level ahead of schedule." }
  ];

  const allBooks = [
    { id: 1, title: "Fikir Eske Mekabir", author: "Haddis Alemayehu", image: "https://upload.wikimedia.org/wikipedia/am/c/cc/Fekir_Eske_Mekabir.jpg", genre: "Classic" },
    { id: 2, title: "Oromay", author: "Baalu Girma", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300", genre: "Historical" },
    { id: 3, title: "Born a Crime", author: "Trevor Noah", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300", genre: "Autobiography" },
    { id: 4, title: "Atomic Habits", author: "James Clear", image: "https://images.unsplash.com/photo-1589998059171-989d887dda19?auto=format&fit=crop&q=80&w=300", genre: "Self-Help" },
    { id: 5, title: "The Alchemist", author: "Paulo Coelho", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300", genre: "Fiction" },
    { id: 6, title: "Sapiens", author: "Yuval Noah Harari", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300", genre: "History" },
    { id: 7, title: "Sememen", author: "Sisay Nigusu", image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=300", genre: "Fiction" },
    { id: 8, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", image: "https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=300", genre: "Finance" },
    { id: 9, title: "Yertu Emnit", author: "Dagnachew Worku", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300", genre: "Classic" }
  ];

  const allFacts = [
    { id: 1, text: "Ethiopia is the only country in the world with a 13-month calendar!", image: "https://images.unsplash.com/photo-1506462945848-ac8ea6f609cc?auto=format&fit=crop&q=80&w=400" },
    { id: 2, text: "Bananas are curved because they grow towards the sun.", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=400" },
    { id: 3, text: "A day on Venus is longer than a year on Venus.", image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=400" },
    { id: 4, text: "Honey never spoils. Archaeologists found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.", image: "https://images.unsplash.com/photo-1587049352847-81a56d773c16?auto=format&fit=crop&q=80&w=400" },
    { id: 5, text: "Octopuses have three hearts and blue blood.", image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=400" },
    { id: 6, text: "Ethiopia was the first African country to defeat a European power in history at the Battle of Adwa.", image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80&w=400" },
    { id: 7, text: "Wombat poop is cube-shaped, preventing it from rolling away.", image: "https://images.unsplash.com/photo-1525983360072-2ebda0550fd4?auto=format&fit=crop&q=80&w=400" },
    { id: 8, text: "The first mechanical clock in the world was invented in China in 725 AD.", image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80&w=400" }
  ];

  const allMovies = [
    { id: 1, title: "Dune: Part Two", year: "2024", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=300", rating: "9/10" },
    { id: 2, title: "Lamb", year: "2015", image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=300", rating: "8.5/10" },
    { id: 3, title: "Teza", year: "2008", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=300", rating: "9.2/10" },
    { id: 4, title: "Spider-Man", year: "2023", image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=300", rating: "9/10" },
    { id: 5, title: "Oppenheimer", year: "2023", image: "https://images.unsplash.com/photo-1440407876336-62333a6f010c?auto=format&fit=crop&q=80&w=300", rating: "9.5/10" },
    { id: 6, title: "The Boy Who Harnessed the Wind", year: "2019", image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&q=80&w=300", rating: "8.8/10" },
    { id: 7, title: "Top Gun: Maverick", year: "2022", image: "https://images.unsplash.com/photo-1563722271810-7b952c1df077?auto=format&fit=crop&q=80&w=300", rating: "8.3/10" },
    { id: 8, title: "Difret", year: "2014", image: "https://images.unsplash.com/photo-1515668236457-83c3b8764839?auto=format&fit=crop&q=80&w=300", rating: "8.1/10" },
    { id: 9, title: "Interstellar", year: "2014", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=300", rating: "8.7/10" }
  ];

  const allStressTricks = [
    { id: 1, text: "4-7-8 Breathing: Inhale for 4s, hold for 7s, exhale for 8s.", icon: "🌬️" },
    { id: 2, text: "Muscle Relaxation: Tense each muscle group for 5s, then release.", icon: "💪" },
    { id: 3, text: "5-4-3-2-1 Grounding: 5 things you see, 4 you feel, 3 you hear...", icon: "👁️" },
    { id: 4, text: "Cold Splash: Cold water on face triggers the dive reflex to slow heart.", icon: "💦" },
    { id: 5, text: "Bilateral Tapping: Tap your left and right knees alternately for 1 min.", icon: "✋" },
    { id: 6, text: "Box Breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s.", icon: "🔲" },
    { id: 7, text: "Power Posing: Stand like a superhero for 2 minutes to lower cortisol.", icon: "🦸" },
    { id: 8, text: "Thumb Blowing: Blow on your thumb. It stimulates the vagus nerve.", icon: "👍" }
  ];

  const allVideos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    "https://www.youtube.com/embed/9bZkp7q19f0", 
    "https://www.youtube.com/embed/jNQXAC9IVRw",
    "https://www.youtube.com/embed/tPEE9ZwTmy0",
    "https://www.youtube.com/embed/kYx2N2mP7tQ",
    "https://www.youtube.com/embed/Zi_XLOBDo_Y"
  ];

  const allStressVideos = [
    "https://www.youtube.com/embed/inpok4MKVLM", 
    "https://www.youtube.com/embed/ZToicYcHIOU", 
    "https://www.youtube.com/embed/syx3a1_LeFo", 
    "https://www.youtube.com/embed/tEmt1Znux58",
    "https://www.youtube.com/embed/1zyT49IGhI0",
    "https://www.youtube.com/embed/c1Ndym-IsQg"
  ];

  // State for randomized content
  const [displayNews, setDisplayNews] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [displayFacts, setDisplayFacts] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [displayTricks, setDisplayTricks] = useState([]);
  const [displayVideos, setDisplayVideos] = useState([]);
  const [displayStressVideos, setDisplayStressVideos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Filter out currently displayed items to ensure a complete visual swap
      const getNewItems = (fullArray, currentItems, limit) => {
        let pool = fullArray.filter(item => !currentItems.includes(item));
        if (pool.length < limit) pool = fullArray; // Fallback if pool is too small
        return [...pool].sort(() => 0.5 - Math.random()).slice(0, limit);
      };

      setDisplayNews(prev => getNewItems(allNews, prev, 3));
      setDisplayBooks(prev => getNewItems(allBooks, prev, 4));
      setDisplayFacts(prev => getNewItems(allFacts, prev, 3));
      setDisplayMovies(prev => getNewItems(allMovies, prev, 4));
      setDisplayTricks(prev => getNewItems(allStressTricks, prev, 3));
      setDisplayVideos(prev => getNewItems(allVideos, prev, 2));
      setDisplayStressVideos(prev => getNewItems(allStressVideos, prev, 2));
      setIsRefreshing(false);
    }, 600); // Small delay to simulate network fetching
  };

  useEffect(() => {
    refreshFeed();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-10 relative">
        <h1 className="text-3xl font-light text-[#085041] flex items-center justify-center">
          <TrendingUp className="mr-3 text-[#1D9E75]" />
          Warka Entertainment Hub
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">Your daily dose of news, books, videos, and fun facts to keep your mind stimulated and relaxed.</p>
        
        {/* Twitter-like refresh button */}
        <button 
          onClick={refreshFeed}
          disabled={isRefreshing}
          className="mx-auto mt-4 flex items-center px-4 py-2 bg-[#E6F1FB] hover:bg-[#D0E3F5] text-[#185FA5] font-bold text-xs rounded-full shadow-sm transition-all"
        >
          {isRefreshing ? (
             <div className="w-4 h-4 border-2 border-[#185FA5] border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <TrendingUp className="w-4 h-4 mr-2" />
          )}
          {isRefreshing ? "Updating Feed..." : "See New Updates"}
        </button>
      </div>

      <div className={`transition-opacity duration-500 ${isRefreshing ? 'opacity-30' : 'opacity-100'} space-y-12`}>
        
        {/* Stress Control Tricks & Videos (NEW SECTION) */}
        <section className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-6 border-b border-teal-200 pb-2">
            <HeartPulse className="text-teal-600" />
            <h2 className="text-xl font-bold text-teal-900">{st.stress}</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tricks List */}
            <div className="space-y-4 lg:col-span-1">
              {displayTricks.map(trick => (
                <div key={trick.id} className="flex items-start bg-white rounded-xl p-3 shadow-sm border border-teal-50">
                  <span className="text-2xl mr-3">{trick.icon}</span>
                  <p className="text-sm font-medium text-teal-900 leading-snug">{trick.text}</p>
                </div>
              ))}
            </div>
            
            {/* Stress Relief Videos */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayStressVideos.map((vid, idx) => (
                <div key={idx} className="bg-black rounded-xl overflow-hidden aspect-video shadow-md">
                  <iframe className="w-full h-full" src={vid} title={`Stress Video ${idx}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section>
          <div className="flex items-center space-x-2 mb-4 border-b pb-2">
            <Newspaper className="text-[#185FA5]" />
            <h2 className="text-xl font-bold text-gray-800">{st.news}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayNews.map(news => (
              <div key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="flex items-center"><Globe className="w-3 h-3 mr-1"/> {news.source}</span>
                    <span className="text-blue-500 font-semibold">{news.time}</span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-800 leading-snug">{news.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{news.desc}</p>
                  <div className="pt-2">
                    <span className={`text-[10px] px-2 py-1 rounded-full uppercase font-bold ${news.type === 'local' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {news.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section>
          <div className="flex items-center space-x-2 mb-4 border-b pb-2">
            <Video className="text-red-500" />
            <h2 className="text-xl font-bold text-gray-800">{st.videos}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayVideos.map((vid, idx) => (
              <div key={idx} className="bg-black rounded-xl overflow-hidden aspect-video shadow-md">
                <iframe className="w-full h-full" src={vid} title={`Funny Video ${idx}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            ))}
          </div>
        </section>

        {/* Books and Facts Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bookshelf */}
          <section>
            <div className="flex items-center space-x-2 mb-4 border-b pb-2">
              <BookOpen className="text-amber-600" />
              <h2 className="text-xl font-bold text-gray-800">{st.books}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {displayBooks.map(book => (
                <div key={book.id} className="flex bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:bg-gray-50 transition cursor-pointer">
                  <img src={book.image} alt={book.title} className="w-20 h-28 object-cover" />
                  <div className="p-3 flex flex-col justify-center">
                    <h4 className="font-bold text-xs text-gray-800 leading-tight">{book.title}</h4>
                    <p className="text-[10px] text-gray-500 mt-1">{book.author}</p>
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded mt-2 self-start">{book.genre}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fun Facts */}
          <section>
            <div className="flex items-center space-x-2 mb-4 border-b pb-2">
              <Smile className="text-purple-500" />
              <h2 className="text-xl font-bold text-gray-800">{st.facts}</h2>
            </div>
            <div className="space-y-4">
              {displayFacts.map(fact => (
                <div key={fact.id} className="flex items-center bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-100">
                  <img src={fact.image} alt="fact" className="w-16 h-16 rounded-lg object-cover mr-4 shadow-sm" />
                  <p className="text-sm font-medium text-purple-900 leading-snug">{fact.text}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Movies Section */}
        <section>
          <div className="flex items-center space-x-2 mb-4 border-b pb-2">
            <Film className="text-indigo-500" />
            <h2 className="text-xl font-bold text-gray-800">{st.movies}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayMovies.map(movie => (
              <div key={movie.id} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-yellow-400 text-[10px] font-bold">⭐ {movie.rating}</span>
                  <h3 className="font-bold text-white text-sm leading-tight">{movie.title}</h3>
                  <p className="text-[10px] text-gray-300">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
