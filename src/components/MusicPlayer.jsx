import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Music, X } from 'lucide-react';

export const MusicPlayer = ({ musicState, setMusicState }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  const { currentTrack, isPlaying, playlist } = musicState;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    setMusicState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleNext = () => {
    if (!playlist.length || !currentTrack) return;
    const currentIndex = playlist.findIndex(t => t.previewUrl === currentTrack.previewUrl);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setMusicState(prev => ({
      ...prev,
      currentTrack: playlist[nextIndex],
      isPlaying: true
    }));
  };

  const handlePrev = () => {
    if (!playlist.length || !currentTrack) return;
    const currentIndex = playlist.findIndex(t => t.previewUrl === currentTrack.previewUrl);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setMusicState(prev => ({
      ...prev,
      currentTrack: playlist[prevIndex],
      isPlaying: true
    }));
  };

  const handleEnded = () => {
    handleNext();
  };

  if (!currentTrack && isMinimized) return null;

  if (isMinimized) {
    return (
      <div 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 bg-[#1db954] text-white p-4 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform flex items-center justify-center animate-bounce-slow"
      >
        <Music className="w-8 h-8" />
        {isPlaying && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
      </div>
    );
  }

  if (!currentTrack) return null; // Don't show full player if nothing is loaded

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#181818] text-white border-t border-[#282828] px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <audio 
        ref={audioRef} 
        src={currentTrack.previewUrl} 
        onEnded={handleEnded} 
      />
      
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Track Info */}
        <div className="flex items-center w-1/3 space-x-4">
          <img 
            src={currentTrack.artworkUrl100 || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=100'} 
            alt={currentTrack.trackName} 
            className="w-14 h-14 rounded-md shadow-lg"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate hover:underline cursor-pointer">{currentTrack.trackName}</span>
            <span className="text-[11px] text-[#b3b3b3] truncate hover:underline cursor-pointer">{currentTrack.artistName}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center w-1/3 space-y-2">
          <div className="flex items-center space-x-6">
            <button onClick={handlePrev} className="text-[#b3b3b3] hover:text-white transition">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={togglePlay} 
              className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>
            <button onClick={handleNext} className="text-[#b3b3b3] hover:text-white transition">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
          {/* Simple progress bar mock */}
          <div className="w-full max-w-md flex items-center space-x-2 text-[10px] text-[#b3b3b3]">
            <span>0:00</span>
            <div className="flex-1 h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
              <div className="h-full bg-white w-1/3 hover:bg-[#1db954] transition-colors rounded-full"></div>
            </div>
            <span>0:30</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-end w-1/3 space-x-4 text-[#b3b3b3]">
          <div className="flex items-center space-x-2 w-24 hidden sm:flex">
            <Volume2 className="w-4 h-4" />
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer" 
            />
          </div>
          <button onClick={() => setIsMinimized(true)} className="hover:text-white transition" title="Minimize to Note">
            <Maximize2 className="w-4 h-4 rotate-180" />
          </button>
          <button onClick={() => setIsMinimized(true)} className="hover:text-white transition" title="Minimize to Note">
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
