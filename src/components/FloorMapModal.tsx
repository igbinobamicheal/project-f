import React from 'react';
import { X, MapPin, Compass, ArrowUpRight, Sparkles } from 'lucide-react';
import type { RoomDefinition } from '../data/museumContent';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface FloorMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoomIndex: number;
  onSelectRoom: (index: number) => void;
}

export const FloorMapModal: React.FC<FloorMapModalProps> = ({
  isOpen,
  onClose,
  currentRoomIndex,
  onSelectRoom
}) => {
  if (!isOpen) return null;

  const currentRoom = MUSEUM_CONFIG.rooms[currentRoomIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0D0D0D]/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#F7F5F1] text-[#1C1C1C] border border-[#B89A57]/40 rounded-3xl p-6 sm:p-8 shadow-[0_35px_90px_rgba(0,0,0,0.85)] overflow-y-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#B89A57]/30 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#EFE8DC] border border-[#B89A57]/40 text-[#8D7135] shadow-sm">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="font-mono-spec text-xs tracking-[0.25em] text-[#8D7135] uppercase font-bold">
                ARCHITECTURAL BLUEPRINT // WAYFINDING
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1C1C1C] tracking-wider">
                MUSEUM FLOOR PLAN & GALLERIES
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playChime(480);
              onClose();
            }}
            className="p-2 rounded-full bg-[#EFE8DC] hover:bg-[#D8C9AA] text-[#1C1C1C] border border-[#B89A57]/30 transition-colors cursor-pointer"
            aria-label="Close Map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Location Badge */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#EFE8DC] border border-[#B89A57]/40">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#B89A57] animate-ping" />
            <div className="flex flex-col">
              <span className="font-mono-spec text-[10px] tracking-widest text-[#8D857B] uppercase">
                CURRENT VISITOR LOCATION
              </span>
              <span className="font-display text-sm font-semibold text-[#1C1C1C]">
                {currentRoom.code} // {currentRoom.name.toUpperCase()}
              </span>
            </div>
          </div>
          <span className="font-mono-spec text-xs text-[#8D7135] font-bold px-3 py-1 rounded-full bg-[#F7F5F1] border border-[#B89A57]/40 hidden sm:inline-block">
            {currentRoom.colorTemp}
          </span>
        </div>

        {/* Interactive Floor Plan Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {MUSEUM_CONFIG.rooms.map((room: RoomDefinition, idx: number) => {
            const isCurrent = idx === currentRoomIndex;
            return (
              <button
                key={room.id}
                onClick={() => {
                  soundEngine.playFootstep();
                  onSelectRoom(idx);
                  onClose();
                }}
                className={`relative group text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[135px] cursor-pointer ${
                  isCurrent
                    ? 'bg-[#B89A57]/20 border-[#8D7135] shadow-[0_0_25px_rgba(184,154,87,0.25)]'
                    : 'bg-[#FFFFFF] border-[#B89A57]/25 hover:border-[#B89A57] hover:shadow-md'
                }`}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-spec text-[11px] font-bold text-[#8D7135]">
                      {room.code}
                    </span>
                    <span className="text-[#8D857B] text-xs">/</span>
                    <span className="font-mono-spec text-[10px] text-[#8D857B]">
                      {room.floor}
                    </span>
                  </div>

                  {isCurrent ? (
                    <div className="flex items-center gap-1 text-[#8D7135] font-mono-spec text-[10px] tracking-wider font-bold">
                      <MapPin className="w-3.5 h-3.5 fill-[#8D7135]" />
                      <span>HERE</span>
                    </div>
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-[#8D857B] group-hover:text-[#1C1C1C] transition-colors" />
                  )}
                </div>

                {/* Room Name & Subtitle */}
                <div className="mt-3">
                  <h3 className="font-display text-sm font-bold text-[#1C1C1C] group-hover:text-[#8D7135] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#57534E] line-clamp-1 mt-0.5 font-light">
                    {room.subtitle}
                  </p>
                </div>

                {/* Ambient Description Footer */}
                <div className="mt-3 pt-2 border-t border-[#B89A57]/20 flex items-center justify-between">
                  <span className="font-mono-spec text-[9px] text-[#8D857B] truncate max-w-[170px]">
                    {room.ambientDescription}
                  </span>
                  {isCurrent && <Sparkles className="w-3 h-3 text-[#8D7135]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Curatorial Note */}
        <div className="border-t border-[#B89A57]/30 pt-4 flex flex-col sm:flex-row items-center justify-between text-[#8D857B] text-xs font-mono-spec gap-2">
          <span>THE MUSEUM OF HER // CURATED BY {MUSEUM_CONFIG.subject.curator}</span>
          <span className="text-[#8D7135] font-semibold">CLICK ANY WING TO ENTER DIRECTLY</span>
        </div>

      </div>
    </div>
  );
};
