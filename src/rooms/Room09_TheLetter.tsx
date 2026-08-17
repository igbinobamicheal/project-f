import React from 'react';
import { ArrowRight, Feather } from 'lucide-react';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room09TheLetterProps {
  onNext: () => void;
}

export const Room09_TheLetter: React.FC<Room09TheLetterProps> = ({ onNext }) => {
  const { curatorLetter } = MUSEUM_CONFIG;

  return (
    <div className="relative w-full min-h-screen bg-[#EFE8DC] text-[#1C1C1C] py-16 px-6 sm:px-12 md:px-20 overflow-hidden flex flex-col justify-between selection:bg-[#B89A57]/30">
      
      {/* Warm Linen Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-radial-gradient from-[#D8C9AA]/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6 w-full my-auto">
        
        {/* Top Quiet Signage */}
        <div className="text-center space-y-1.5 border-b border-[#B89A57]/30 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#B89A57]/30 text-[10px] font-mono-spec text-[#8D7135] tracking-[0.25em] uppercase font-bold shadow-xs">
            <Feather className="w-3 h-3" />
            <span>PRIVATE SALON // PERSONAL DEDICATION</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-black tracking-wider text-[#1C1C1C] pt-1">
            {curatorLetter.heading}
          </h1>

          <p className="font-mono-spec text-[10px] tracking-widest text-[#8D857B] uppercase">
            FOR {MUSEUM_CONFIG.subject.name} • FROM {MUSEUM_CONFIG.subject.curator}
          </p>
        </div>

        {/* Paper Card with Single Gold Frame Line */}
        <div 
          data-cursor="read"
          className="relative p-6 sm:p-10 md:p-12 rounded-3xl bg-[#FAF8F5] border border-[#B89A57]/45 shadow-[0_20px_50px_-15px_rgba(141,113,53,0.12)] space-y-5"
        >
          {/* Inner Gold Frame Line */}
          <div className="absolute inset-2.5 sm:inset-3 border border-[#B89A57]/25 rounded-2xl pointer-events-none" />

          {/* Salutation */}
          <div className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1C1C]">
            {curatorLetter.recipient}
          </div>

          {/* Letter Body */}
          <div className="space-y-4 font-editorial text-base sm:text-lg md:text-xl text-[#1C1C1C] leading-relaxed font-light">
            {curatorLetter.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-[#B89A57]/20 space-y-0.5 font-editorial">
            <p className="italic text-[#57534E] text-base">
              {curatorLetter.signoff}
            </p>
            <p className="font-display font-black text-xl sm:text-2xl text-[#8D7135] pt-0.5">
              {curatorLetter.curatorName}
            </p>
            <p className="font-mono-spec text-[10px] text-[#8D857B] tracking-wider pt-0.5">
              {curatorLetter.date}
            </p>
          </div>
        </div>

        {/* Step into The Final Room */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              soundEngine.playFootstep();
              onNext();
            }}
            className="px-8 py-4 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-xs transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 cursor-pointer"
          >
            <span>STEP INTO THE FINAL ROOM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-3xl mx-auto w-full">
        <span>PRIVATE SALON // A LETTER FROM THE CURATOR</span>
        <span className="text-[#8D7135] font-semibold text-[11px]">NEXT: THE FINAL ROOM</span>
      </div>

    </div>
  );
};
