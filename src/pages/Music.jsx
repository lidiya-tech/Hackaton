import React, { useState, useEffect } from 'react';
import { Search, Play, Pause, Music as MusicIcon, Clock, Heart } from 'lucide-react';

export const Music = ({ currentLang, musicState, setMusicState }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Default Ethiopian artists for initial load
  const loadDefaultMusic = async () => {
    setIsSearching(true);
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=ethiopian+music&entity=song&limit=15`);
      const data = await res.json();
      setResults(data.results);
    } catch (e) {
      console.error(e);
    }
    setIsSearching(false);
  };

  useEffect(() => {
    loadDefaultMusic();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=song&limit=20`);
      const data = await res.json();
      setResults(data.results);
    } catch (e) {
      console.error(e);
    }
    setIsSearching(false);
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  };

  const playTrack = (track) => {
    setMusicState({
      currentTrack: track,
      playlist: results, // Set the current search results as the playlist so Next/Prev works
      isPlaying: true
    });
  };

  const togglePause = () => {
    setMusicState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white -mt-8 pt-8 pb-32 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Search & Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
            <MusicIcon className="w-8 h-8 mr-3 text-[#1db954]" />
            Spotify <span className="text-[#1db954] ml-2 font-black">Warka</span>
          </h1>

          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any artist, song, or podcast..." 
              className="w-full bg-[#242424] text-white rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </form>
        </div>

        {/* Spotify-like Filter Pills */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">All</button>
          <button className="bg-[#2a2a2a] text-white hover:bg-[#333] px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition">Music</button>
          <button className="bg-[#2a2a2a] text-white hover:bg-[#333] px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition">Podcasts</button>
          <button className="bg-[#2a2a2a] text-white hover:bg-[#333] px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition flex items-center gap-1.5">
            <Heart className="w-4 h-4" /> Favorites
          </button>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-gray-600 border-t-[#1db954] rounded-full animate-spin"></div>
          </div>
        )}

        {/* Results */}
        {!isSearching && results.length > 0 && (
          <div className="space-y-4">
            {/* Top Result Banner with CD and Wave */}
            <div className="bg-gradient-to-b from-[#2a2a2a] to-[#121212] p-6 rounded-xl flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-8 hover:bg-[#2a2a2a] transition cursor-pointer group relative overflow-hidden" onClick={() => playTrack(results[0])}>
              
              {/* Spinning CD Graphic */}
              <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0 z-10">
                <div className={`w-full h-full rounded-full border-[8px] border-black shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden relative ${
                  musicState.currentTrack?.trackId === results[0].trackId && musicState.isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}>
                  <img src={results[0].artworkUrl100.replace('100x100', '300x300')} alt="cover" className="w-full h-full object-cover" />
                  
                  {/* CD Inner Hole Details */}
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-black rounded-full border-[2px] border-gray-800 shadow-inner flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#121212] rounded-full border border-gray-700"></div>
                  </div>
                  {/* CD Shine effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 z-10 w-full text-center md:text-left">
                <span className="uppercase text-xs font-bold text-white/80 tracking-widest bg-black/20 inline-block w-fit px-2 py-1 rounded-md mb-2">Top Result</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white line-clamp-2 leading-tight">{results[0].trackName}</h2>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-[#b3b3b3] mt-2">
                  <img src={results[0].artworkUrl100} className="w-6 h-6 rounded-full shadow-md" alt="artist" />
                  <span className="font-bold text-white hover:underline">{results[0].artistName}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline truncate">{results[0].collectionName}</span>
                </div>
                
                <div className="mt-6 pt-2 flex items-center justify-center md:justify-start space-x-4">
                  <button className="bg-[#1db954] text-black rounded-full p-4 hover:scale-105 transition shadow-xl group-hover:bg-[#1ed760]">
                    {musicState.currentTrack?.trackId === results[0].trackId && musicState.isPlaying ? (
                      <Pause className="w-8 h-8 fill-current ml-0" />
                    ) : (
                      <Play className="w-8 h-8 fill-current ml-1" />
                    )}
                  </button>
                  <button className="p-3 text-[#b3b3b3] hover:text-white transition rounded-full border border-transparent hover:border-white/20">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Audio Wave Visualizer Background */}
              {musicState.currentTrack?.trackId === results[0].trackId && musicState.isPlaying && (
                <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-end justify-end space-x-1.5 opacity-20 pointer-events-none pr-8 pb-4">
                  {[...Array(16)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-4 bg-[#1db954] rounded-t-md" 
                      style={{ 
                        height: `${Math.max(20, Math.random() * 100)}%`, 
                        animation: `bounce ${0.5 + Math.random()}s infinite alternate ease-in-out` 
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Track List */}
            <div className="w-full">
              {/* Header row */}
              <div className="grid grid-cols-12 text-[#b3b3b3] text-sm uppercase font-semibold tracking-wider border-b border-[#282828] pb-2 mb-4 px-4">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-4 hidden md:block">Album</div>
                <div className="col-span-2 text-right flex justify-end"><Clock className="w-4 h-4" /></div>
              </div>

              {/* Tracks */}
              {results.map((track, idx) => {
                const isCurrent = musicState.currentTrack?.previewUrl === track.previewUrl;
                
                return (
                  <div 
                    key={track.trackId} 
                    className={`grid grid-cols-12 items-center px-4 py-2 rounded-md hover:bg-[#2a2a2a] group transition cursor-pointer ${isCurrent ? 'bg-[#2a2a2a]' : ''}`}
                    onClick={() => playTrack(track)}
                  >
                    <div className="col-span-1 flex justify-center text-[#b3b3b3]">
                      {isCurrent && musicState.isPlaying ? (
                        <div className="w-4 h-4 flex items-end space-x-[2px]">
                          <div className="w-1 bg-[#1db954] animate-[bounce_0.5s_infinite]"></div>
                          <div className="w-1 bg-[#1db954] animate-[bounce_0.7s_infinite]"></div>
                          <div className="w-1 bg-[#1db954] animate-[bounce_0.6s_infinite]"></div>
                        </div>
                      ) : (
                        <span className="group-hover:hidden">{idx + 1}</span>
                      )}
                      {!isCurrent && <Play className="w-4 h-4 fill-current text-white hidden group-hover:block" />}
                      {isCurrent && !musicState.isPlaying && <Play className="w-4 h-4 fill-current text-[#1db954] hidden group-hover:block" />}
                      {isCurrent && musicState.isPlaying && <Pause className="w-4 h-4 fill-current text-[#1db954] hidden group-hover:block" />}
                    </div>
                    
                    <div className="col-span-11 md:col-span-5 flex items-center space-x-4">
                      <img src={track.artworkUrl100 || track.artworkUrl60} alt={track.trackName} className="w-10 h-10 rounded" />
                      <div className="flex flex-col truncate">
                        <span className={`text-base font-normal truncate ${isCurrent ? 'text-[#1db954]' : 'text-white'}`}>{track.trackName}</span>
                        <span className="text-[#b3b3b3] text-sm hover:underline truncate">{track.artistName}</span>
                      </div>
                    </div>
                    
                    <div className="col-span-4 hidden md:block text-[#b3b3b3] text-sm truncate hover:text-white transition">
                      {track.collectionName}
                    </div>
                    
                    <div className="col-span-2 hidden md:flex justify-end items-center space-x-4 text-[#b3b3b3] text-sm">
                      <Heart className="w-4 h-4 hover:text-white transition opacity-0 group-hover:opacity-100" />
                      <span>{formatTime(track.trackTimeMillis)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!isSearching && results.length === 0 && (
          <div className="text-center text-[#b3b3b3] py-20">
            <MusicIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-bold text-white mb-2">No results found</h2>
            <p>Please make sure your words are spelled correctly or use less or different keywords.</p>
          </div>
        )}

      </div>
    </div>
  );
};
