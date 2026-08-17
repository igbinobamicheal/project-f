import React from 'react';
import { ArrowRight, BookOpen, Compass, Award, User } from 'lucide-react';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room01LobbyProps {
  onNext: () => void;
  onOpenCatalog: () => void;
  onOpenFloorMap: () => void;
}

export const Room01_Lobby: React.FC<Room01LobbyProps> = ({
  onNext,
  onOpenCatalog,
  onOpenFloorMap
}) => {
  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col justify-between py-16 px-6 sm:px-12 md:px-20 overflow-hidden">
      
      {/* Background Subtle Museum Architecture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply filter blur-[0.5px]"
        style={{ backgroundImage: `url('/assets/museum/lobby.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/80 to-[#FAF8F5]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D8C9AA]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Gallery Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#B89A57]/30 pb-5 gap-4">
        <div>
          <span className="font-mono-spec text-[10px] tracking-[0.25em] text-[#8D7135] uppercase font-bold block mb-1">
            LEVEL 00 // CENTRAL ATRIUM
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-[#1C1C1C]">
            THE ATRIUM & RECEPTION
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              soundEngine.playChime(600);
              onOpenCatalog();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EFE8DC] border border-[#B89A57]/35 text-xs font-mono-spec font-semibold text-[#1C1C1C] transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8D7135]" />
            <span>EXHIBITION CATALOG</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playChime(540);
              onOpenFloorMap();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EFE8DC] border border-[#B89A57]/35 text-xs font-mono-spec font-semibold text-[#1C1C1C] transition-all shadow-xs cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#8D7135]" />
            <span>DIRECTORY</span>
          </button>
        </div>
      </div>

      {/* Main Spacious Lobby Display Wall */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto py-8 w-full space-y-6">
        
        {/* Curatorial Inscription Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#B89A57]/35 shadow-[0_15px_45px_-10px_rgba(28,28,28,0.08)] relative overflow-hidden space-y-6">
          {/* Subtle Corner Accents */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#B89A57]" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#B89A57]" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#B89A57]" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#B89A57]" />

          <div className="flex items-center justify-between border-b border-[#B89A57]/20 pb-3">
            <div className="flex items-center gap-2 font-mono-spec text-xs text-[#8D7135] tracking-[0.25em] uppercase font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>PERMANENT REGISTRY</span>
            </div>
            <span className="font-mono-spec text-[10px] text-[#8D857B] uppercase">
              EXHIBITION NO. {MUSEUM_CONFIG.subject.exhibitionNumber}
            </span>
          </div>

          <div>
            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-wider text-[#1C1C1C] mb-2 leading-tight">
              THE MUSEUM OF HER
            </h1>
            <p className="font-editorial text-xl sm:text-2xl text-[#57534E] italic">
              "A collection of the things that make you, you."
            </p>
          </div>

          {/* Curatorial Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-[#B89A57]/20 font-mono-spec text-xs">
            <div>
              <span className="text-[#8D857B] block text-[10px] uppercase">SUBJECT</span>
              <span className="text-[#1C1C1C] font-bold text-sm">{MUSEUM_CONFIG.subject.name}</span>
            </div>
            <div>
              <span className="text-[#8D857B] block text-[10px] uppercase">CURATOR</span>
              <span className="text-[#8D7135] font-bold text-sm">{MUSEUM_CONFIG.subject.curator}</span>
            </div>
            <div>
              <span className="text-[#8D857B] block text-[10px] uppercase">EDITION</span>
              <span className="text-[#1C1C1C] font-bold text-sm">NO. 001</span>
            </div>
            <div>
              <span className="text-[#8D857B] block text-[10px] uppercase">STATUS</span>
              <span className="text-[#1C1C1C] font-bold text-sm">{MUSEUM_CONFIG.subject.status}</span>
            </div>
          </div>

          {/* Curator Note Box */}
          <div className="p-4 rounded-2xl bg-[#EFE8DC] border border-[#B89A57]/30">
            <span className="font-mono-spec text-[10px] text-[#8D7135] tracking-widest uppercase font-bold block mb-1">
              CURATOR'S NOTE
            </span>
            <p className="font-editorial text-lg sm:text-xl text-[#1C1C1C] italic leading-relaxed">
              "I could have bought you something. Instead, I wanted to build you somewhere."
            </p>
          </div>
        </div>

        {/* Begin Walk Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => {
              soundEngine.playFootstep();
              onNext();
            }}
            className="group px-8 py-4 rounded-2xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-[0_10px_25px_rgba(184,154,87,0.25)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-3 cursor-pointer"
          >
            <User className="w-4 h-4 text-[#FAF8F5]" />
            <span>BEGIN THE EXHIBITION</span>
            <ArrowRight className="w-4 h-4 text-[#FAF8F5] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Footer Info */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-4xl mx-auto w-full">
        <span>THE MUSEUM OF HER // GALLERY 01 AHEAD: HER MIND</span>
        <span className="hidden sm:inline text-[#57534E] text-[11px]">PRESS SPACE OR ARROW RIGHT TO WALK</span>
      </div>

    </div>
  );
};
