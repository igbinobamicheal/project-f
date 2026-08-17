import React, { useState, useEffect } from 'react';
import { Eye, RefreshCw, BookOpen } from 'lucide-react';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room10TheFinalRoomProps {
  onRestart: () => void;
  onOpenCatalog: () => void;
}

export const Room10_TheFinalRoom: React.FC<Room10TheFinalRoomProps> = ({
  onRestart,
  onOpenCatalog
}) => {
  const { finalRoom } = MUSEUM_CONFIG;
  const [step, setStep] = useState<number>(0); // 0: Initial Pedestal, 1: Emotional Text Progression
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);

  const handleApproachExhibit = () => {
    soundEngine.playEtherealChord();
    setStep(1);
    setSequenceIndex(0);
  };

  // Timed typography sequence progression with intentional, emotional pauses
  useEffect(() => {
    if (step === 1) {
      if (sequenceIndex === 0) {
        soundEngine.playChime(440);
        const t1 = setTimeout(() => {
          setSequenceIndex(1);
          soundEngine.playChime(554.37);
        }, 4500);
        return () => clearTimeout(t1);
      } else if (sequenceIndex === 1) {
        const t2 = setTimeout(() => {
          setSequenceIndex(2);
          soundEngine.playEtherealChord();
        }, 5000);
        return () => clearTimeout(t2);
      } else if (sequenceIndex === 2) {
        const t3 = setTimeout(() => {
          setSequenceIndex(3);
          soundEngine.playChime(880);
        }, 4500);
        return () => clearTimeout(t3);
      }
    }
  }, [step, sequenceIndex]);

  return (
    <div className="relative w-full min-h-screen bg-[#0D0D0D] text-[#FAF8F5] flex flex-col justify-between py-16 px-6 sm:px-12 md:px-20 overflow-hidden select-none">
      
      {/* Solitary Warm Pinpoint Spotlight Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-[500px] bg-radial-gradient from-[#B89A57]/20 via-transparent to-transparent pointer-events-none filter blur-2xl" />

      {step === 0 ? (
        /* State 0: Solitary Illuminated Fine Art Pedestal */
        <div className="relative z-10 max-w-3xl mx-auto my-auto flex flex-col items-center text-center space-y-6 animate-in fade-in duration-1000">
          
          {/* Framed Final Portrait */}
          <div className="relative p-3.5 bg-[#141416] border border-[#B89A57]/40 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] max-w-sm mx-auto group">
            <img
              src={finalRoom.featuredImage}
              alt="Final Exhibit Object 000"
              className="w-full h-56 sm:h-72 object-cover rounded-lg filter contrast-[1.05] opacity-95 group-hover:opacity-100 transition-opacity"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/museum/final_exhibit.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent pointer-events-none rounded-2xl" />
          </div>

          {/* Museum Placard */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141416]/90 border border-[#B89A57]/30 max-w-sm space-y-2 backdrop-blur-md shadow-xl">
            <span className="font-mono-spec text-[10px] text-[#B89A57] tracking-[0.25em] uppercase font-bold block">
              {finalRoom.objectNumber} // {finalRoom.exhibitTitle}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#FAF8F5]">
              FOR {MUSEUM_CONFIG.subject.name}
            </h2>
            <div className="font-mono-spec text-[10px] text-[#D8C9AA]/70 flex items-center justify-center gap-2.5">
              <span>{finalRoom.medium}</span>
              <span>•</span>
              <span>{finalRoom.year}</span>
            </div>
          </div>

          {/* Approach Exhibit Button */}
          <button
            onClick={handleApproachExhibit}
            className="px-8 py-4 rounded-xl bg-[#B89A57] hover:bg-[#D8C9AA] text-[#0D0D0D] font-display text-xs tracking-widest font-bold shadow-[0_0_30px_rgba(184,154,87,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>APPROACH THE FINAL EXHIBIT</span>
          </button>
        </div>
      ) : (
        /* State 1: Pure Quiet Emotional Sequence (Section 19) */
        <div className="relative z-10 max-w-3xl mx-auto my-auto flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in duration-1000 min-h-[55vh]">
          
          {/* Phase 0: "I DON'T HAVE MUCH RIGHT NOW..." */}
          {sequenceIndex >= 0 && (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-1000">
              <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-light tracking-widest text-[#D8C9AA]">
                I DON'T HAVE MUCH RIGHT NOW...
              </h2>
            </div>
          )}

          {/* Phase 1: "...BUT I WANTED YOU TO HAVE SOMETHING THAT CAME FROM ME." */}
          {sequenceIndex >= 1 && (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-1000">
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#FFFFFF] leading-tight">
                BUT I WANTED YOU TO HAVE<br />
                <span className="text-[#EFE8DC]">SOMETHING THAT CAME FROM ME.</span>
              </h1>
            </div>
          )}

          {/* Phase 2: "HAPPY BIRTHDAY, FAE." */}
          {sequenceIndex >= 2 && (
            <div className="space-y-4 pt-2 animate-in fade-in zoom-in-95 duration-1000">
              <div className="w-20 h-0.5 bg-[#B89A57] mx-auto" />
              <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-widest text-[#B89A57] drop-shadow-[0_0_35px_rgba(184,154,87,0.5)]">
                HAPPY BIRTHDAY,<br />
                {MUSEUM_CONFIG.subject.name}.
              </h1>
            </div>
          )}

          {/* Phase 3: Epigraph & Curatorial Monograph Note */}
          {sequenceIndex >= 3 && (
            <div className="space-y-6 pt-4 animate-in fade-in duration-1000 max-w-lg mx-auto">
              <div className="p-5 rounded-2xl bg-[#141416]/80 border border-[#B89A57]/30 shadow-xl backdrop-blur-md">
                <p className="font-editorial text-lg sm:text-xl italic text-[#D8C9AA] leading-relaxed">
                  "Some exhibitions are temporary.<br />Some people are permanent."
                </p>
              </div>

              {/* End Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    soundEngine.playChime(640);
                    onOpenCatalog();
                  }}
                  className="px-5 py-3 rounded-xl bg-[#B89A57] hover:bg-[#D8C9AA] text-[#0D0D0D] font-display text-xs tracking-widest font-bold shadow-sm transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>EXHIBITION CATALOG</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playFootstep();
                    onRestart();
                  }}
                  className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-[#D8C9AA] border border-zinc-700 font-mono-spec text-xs tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#8D857B]" />
                  <span>REVISIT ENTRANCE</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-zinc-800/80 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-4xl mx-auto w-full">
        <span>THE MUSEUM OF HER // PERMANENT EPILOGUE</span>
        <span className="text-[#B89A57] text-[11px]">MICHEAL & FAE // 2026</span>
      </div>

    </div>
  );
};
