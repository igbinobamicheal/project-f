import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Layers,
  Sparkles
} from 'lucide-react';
import type { RoomDefinition } from '../data/museumContent';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface NavigationHUDProps {
  currentRoomIndex: number;
  onSelectRoom: (index: number) => void;
  onOpenFloorMap: () => void;
  onOpenCatalog: () => void;
}

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  currentRoomIndex,
  onSelectRoom,
  onOpenFloorMap,
  onOpenCatalog
}) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [showQuickNav, setShowQuickNav] = useState(false);

  const currentRoom: RoomDefinition = MUSEUM_CONFIG.rooms[currentRoomIndex] || MUSEUM_CONFIG.rooms[0];
  const totalRooms = MUSEUM_CONFIG.rooms.length;

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    soundEngine.playChime(660);
  };

  const handlePrev = () => {
    if (currentRoomIndex > 0) {
      soundEngine.playFootstep();
      onSelectRoom(currentRoomIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentRoomIndex < totalRooms - 1) {
      soundEngine.playFootstep();
      onSelectRoom(currentRoomIndex + 1);
    }
  };

  // Check if room is entrance or final room
  const isEntrance = currentRoomIndex === 0;
  const isFinalRoom = currentRoomIndex === totalRooms - 1;
  const isDarkRoom = currentRoom.theme === 'dark';

  return (
    <>
      {/* Top Museum Header Bar */}
      <header className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between pointer-events-none transition-all duration-700 ${
        isDarkRoom 
          ? 'bg-gradient-to-b from-black/80 via-black/30 to-transparent text-[#F7F5F1]'
          : 'bg-gradient-to-b from-[#F7F5F1]/95 via-[#F7F5F1]/60 to-transparent text-[#1C1C1C]'
      } backdrop-blur-[2px]`}>
        
        {/* Left: Museum Inscription */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-[#B89A57] animate-pulse" />
          <div className="flex flex-col">
            <span className="font-display tracking-[0.25em] text-xs sm:text-sm font-bold text-inherit">
              THE MUSEUM OF HER
            </span>
            <span className={`font-mono-spec text-[10px] tracking-widest uppercase ${
              isDarkRoom ? 'text-[#D8C9AA]' : 'text-[#8D7135]'
            }`}>
              EXHIBITION NO. 001 // FOR {MUSEUM_CONFIG.subject.name}
            </span>
          </div>
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Audio Ambience Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono-spec transition-all duration-300 backdrop-blur-md shadow-sm cursor-pointer ${
              isDarkRoom
                ? 'bg-zinc-900/80 border-zinc-700/80 hover:border-[#B89A57] text-zinc-200'
                : 'bg-white/85 border-[#B89A57]/35 hover:border-[#B89A57] text-[#1C1C1C]'
            }`}
            title={isMuted ? "Enable Ambient Sound" : "Mute Sound"}
            aria-label="Sound Toggle"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#B89A57] animate-pulse" />
            )}
            <span className="hidden sm:inline tracking-wider">
              {isMuted ? "SOUND: OFF" : "SOUND: ON"}
            </span>
          </button>

          {/* Exhibition Booklet / Catalog */}
          <button
            onClick={() => {
              soundEngine.playChime(580);
              onOpenCatalog();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono-spec transition-all duration-300 backdrop-blur-md shadow-sm cursor-pointer ${
              isDarkRoom
                ? 'bg-zinc-900/80 border-zinc-700/80 hover:border-[#B89A57] text-zinc-200'
                : 'bg-white/85 border-[#B89A57]/35 hover:border-[#B89A57] text-[#1C1C1C]'
            }`}
            title="Download Exhibition Catalog"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#B89A57]" />
            <span className="tracking-wider font-semibold">CATALOG</span>
          </button>

          {/* Floor Plan Directory */}
          <button
            onClick={() => {
              soundEngine.playChime(520);
              onOpenFloorMap();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono-spec transition-all duration-300 backdrop-blur-md shadow-sm cursor-pointer ${
              isDarkRoom
                ? 'bg-zinc-900/80 border-zinc-700/80 hover:border-[#B89A57] text-zinc-200'
                : 'bg-white/85 border-[#B89A57]/35 hover:border-[#B89A57] text-[#1C1C1C]'
            }`}
            title="Open Museum Floor Plan"
          >
            <Compass className="w-3.5 h-3.5 text-[#B89A57]" />
            <span className="hidden sm:inline tracking-wider">MAP</span>
          </button>
        </div>
      </header>

      {/* Bottom Floating Wayfinding Bar (Hidden on entrance and final quiet room) */}
      {!isEntrance && !isFinalRoom && (
        <nav 
          aria-label="Museum Wayfinding Navigation"
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl pointer-events-auto"
        >
          <div className="bg-[#FFFFFF]/95 border border-[#B89A57]/40 rounded-2xl p-2 sm:p-2.5 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 hover:border-[#B89A57]">
            {/* Prev Room Button */}
            <button
              onClick={handlePrev}
              disabled={currentRoomIndex === 0}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-spec transition-all duration-200 cursor-pointer ${
                currentRoomIndex === 0 
                  ? 'opacity-30 cursor-not-allowed text-zinc-400' 
                  : 'text-[#1C1C1C] hover:bg-[#EFE8DC] active:scale-95'
              }`}
              aria-label="Previous Gallery"
            >
              <ChevronLeft className="w-4 h-4 text-[#8D7135]" />
              <span className="hidden sm:inline tracking-wider font-semibold">PREV</span>
            </button>

            {/* Center Room Indicator & Wayfinding */}
            <div 
              onClick={() => setShowQuickNav(!showQuickNav)}
              className="flex-1 flex flex-col items-center justify-center cursor-pointer px-2 py-1 rounded-lg hover:bg-[#EFE8DC]/70 transition-colors group text-center"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono-spec text-[10px] tracking-widest text-[#8D7135] uppercase font-bold">
                  {currentRoom.code}
                </span>
                <span className="text-[#8D857B] text-xs">•</span>
                <span className="font-mono-spec text-[10px] tracking-widest text-[#8D857B]">
                  {String(currentRoomIndex + 1).padStart(2, '0')} / {String(totalRooms).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xs sm:text-sm text-[#1C1C1C] font-bold tracking-wider group-hover:text-[#8D7135] transition-colors truncate max-w-[180px] sm:max-w-[300px]">
                  {currentRoom.name}
                </span>
                <Layers className="w-3 h-3 text-[#8D857B] group-hover:text-[#8D7135] transition-colors" />
              </div>
            </div>

            {/* Next Room Button */}
            <button
              onClick={handleNext}
              disabled={currentRoomIndex === totalRooms - 1}
              className={`flex items-center gap-1 sm:gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-spec transition-all duration-200 cursor-pointer ${
                currentRoomIndex === totalRooms - 1 
                  ? 'opacity-30 cursor-not-allowed text-zinc-400' 
                  : 'text-[#F7F5F1] bg-[#B89A57] hover:bg-[#8D7135] font-bold shadow-sm active:scale-95'
              }`}
              aria-label="Next Gallery"
            >
              <span className="hidden sm:inline tracking-wider">NEXT</span>
              <ChevronRight className="w-4 h-4 text-[#F7F5F1]" />
            </button>
          </div>

          {/* Quick Jump Dropdown Menu */}
          {showQuickNav && (
            <div className="absolute bottom-full mb-3 left-0 right-0 bg-[#F7F5F1]/95 border border-[#B89A57]/40 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-80 overflow-y-auto z-50">
              <div className="col-span-full pb-1 border-b border-[#B89A57]/20 flex items-center justify-between px-2">
                <span className="font-mono-spec text-[10px] tracking-widest text-[#8D857B] uppercase font-bold">
                  MUSEUM DIRECTORY // QUICK JUMP
                </span>
                <span className="font-mono-spec text-[10px] text-[#8D7135] font-bold">
                  {totalRooms} WINGS
                </span>
              </div>
              {MUSEUM_CONFIG.rooms.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => {
                    soundEngine.playFootstep();
                    onSelectRoom(idx);
                    setShowQuickNav(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    idx === currentRoomIndex
                      ? 'bg-[#B89A57]/20 border border-[#8D7135] text-[#1C1C1C]'
                      : 'hover:bg-[#EFE8DC] text-[#57534E] hover:text-[#1C1C1C] border border-transparent'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-mono-spec text-[10px] text-[#8D7135] tracking-wider font-semibold">
                      {room.code}
                    </span>
                    <span className="font-display text-xs font-bold tracking-wide">
                      {room.name}
                    </span>
                  </div>
                  {idx === currentRoomIndex && (
                    <Sparkles className="w-3.5 h-3.5 text-[#8D7135]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </nav>
      )}
    </>
  );
};
