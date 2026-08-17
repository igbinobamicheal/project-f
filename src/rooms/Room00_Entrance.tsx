import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room00EntranceProps {
  onEnter: () => void;
}

export const Room00_Entrance: React.FC<Room00EntranceProps> = ({ onEnter }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleStartExhibition = (enableSound: boolean) => {
    if (enableSound) {
      soundEngine.enableAudio();
    }
    soundEngine.playDoorOpen();
    setIsOpening(true);

    setTimeout(() => {
      onEnter();
    }, 1400);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0D0D0D] text-[#FAF8F5] flex flex-col justify-between overflow-hidden selection:bg-[#B89A57]/30">
      
      {/* Background Architectural Facade & Doorway Portico */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1200 ease-out opacity-35 scale-100"
        style={{
          backgroundImage: `url('/assets/museum/facade.jpg')`,
          transform: isOpening ? 'scale(1.12) translateY(-10px)' : 'scale(1.0)'
        }}
      />
      
      {/* Cinematic Golden Light Spill From Within The Doors */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-[#0D0D0D]/90 pointer-events-none transition-opacity duration-1000 ${
          isOpening ? 'opacity-20' : 'opacity-80'
        }`} 
      />
      
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-radial-gradient from-[#B89A57]/20 via-[#B89A57]/5 to-transparent pointer-events-none filter blur-3xl transition-all duration-1200 ${
          isOpening ? 'scale-125 opacity-100' : 'scale-100 opacity-60'
        }`} 
      />

      {/* Top Museum Archival Header */}
      <div className="relative z-10 pt-8 sm:pt-10 px-6 sm:px-12 md:px-16 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="font-mono-spec text-[10px] tracking-[0.35em] text-[#B89A57] uppercase font-bold">
            CONTEMPORARY EXHIBITION MONOGRAPH
          </span>
          <span className="font-mono-spec text-[11px] tracking-widest text-[#D8C9AA]/70">
            CATALOG REF: MOH-2026-001
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1C]/80 border border-[#B89A57]/30 text-[10px] font-mono-spec text-[#EFE8DC] backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-3 h-3 text-[#B89A57]" />
          <span>PERMANENT ARCHIVE</span>
        </div>
      </div>

      {/* Center Monumental Architectural Inscription */}
      <div className={`relative z-10 max-w-3xl mx-auto text-center px-6 py-6 flex flex-col items-center gap-6 my-auto transition-all duration-1000 ${
        isOpening ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        
        {/* Exhibition Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B89A57]/15 border border-[#B89A57]/35 text-[#D8C9AA] text-[11px] font-mono-spec tracking-[0.25em] uppercase backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#B89A57]" />
          <span>A PRIVATE EXHIBITION // EST. {MUSEUM_CONFIG.subject.estYear}</span>
        </div>

        {/* Grand Exhibition Headline */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-[#FFFFFF] leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          THE MUSEUM<br />
          <span className="text-[#EFE8DC]">OF HER</span>
        </h1>

        {/* Metadata Lines (Section 06) */}
        <div className="py-1 flex flex-col items-center gap-1 font-mono-spec text-xs tracking-[0.25em] text-[#D8C9AA]/80 uppercase">
          <span>ONE SUBJECT • ONE CURATOR • COUNTLESS REASONS</span>
        </div>

        {/* Action Entry Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            data-cursor="enter"
            onClick={() => handleStartExhibition(true)}
            disabled={isOpening}
            className="group relative px-7 py-3.5 rounded-xl bg-[#B89A57] hover:bg-[#D8C9AA] text-[#0D0D0D] font-display text-xs tracking-widest font-bold shadow-[0_0_30px_rgba(184,154,87,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-2.5 w-full sm:w-auto justify-center cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-[#0D0D0D] group-hover:scale-110 transition-transform" />
            <span>ENTER EXHIBITION</span>
            <ArrowRight className="w-4 h-4 text-[#0D0D0D] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleStartExhibition(false)}
            disabled={isOpening}
            className="px-5 py-3.5 rounded-xl bg-[#1C1C1C]/80 hover:bg-[#1C1C1C] text-[#D8C9AA] hover:text-[#FFFFFF] border border-[#B89A57]/30 font-mono-spec text-xs tracking-wider transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-sm backdrop-blur-md"
          >
            <VolumeX className="w-4 h-4 text-[#8D857B]" />
            <span>ENTER QUIETLY</span>
          </button>
        </div>

        {isOpening && (
          <div className="mt-2 font-mono-spec text-xs tracking-widest text-[#B89A57] animate-pulse">
            DOORS OPENING... STEPPING INTO THE ATRIUM
          </div>
        )}
      </div>

      {/* Bottom Architectural Inscription */}
      <div className="relative z-10 pb-8 sm:pb-10 px-6 sm:px-12 md:px-16 flex flex-col sm:flex-row items-center justify-between text-[#8D857B] text-xs font-mono-spec border-t border-zinc-800/80 pt-5 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B89A57] animate-pulse" />
          <span>LOCATION: GRAND PORTICO // ADMISSION COMPLIMENTARY</span>
        </div>
        <div className="tracking-widest text-[#D8C9AA]/60 text-[11px]">
          CURATED FOR {MUSEUM_CONFIG.subject.name} // 2026
        </div>
      </div>

    </div>
  );
};
