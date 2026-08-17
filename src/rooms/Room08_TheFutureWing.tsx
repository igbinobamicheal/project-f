import React, { useState } from 'react';
import { Sparkles, ArrowRight, PlusCircle, Compass, Sun } from 'lucide-react';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room08TheFutureWingProps {
  onNext: () => void;
}

export const Room08_TheFutureWing: React.FC<Room08TheFutureWingProps> = ({ onNext }) => {
  const { futureWing } = MUSEUM_CONFIG;
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [userMilestones, setUserMilestones] = useState<string[]>([
    "The trip to Europe we talked about taking",
    "Your next big project launch that takes the world by storm",
    "The quiet mornings in a home full of sunlight and laughter"
  ]);
  const [newMilestoneInput, setNewMilestoneInput] = useState('');
  const [showInputBox, setShowInputBox] = useState(false);

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneInput.trim()) return;
    soundEngine.playEtherealChord();
    setUserMilestones((prev) => [...prev, newMilestoneInput.trim()]);
    setNewMilestoneInput('');
    setShowInputBox(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F5] text-[#1C1C1C] py-16 px-6 sm:px-12 md:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* Radiant Skylit Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-radial-gradient from-[#FFFFFF] via-[#D8C9AA]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 w-full my-auto">
        
        {/* Top Wing Signage */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#B89A57]/30 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-spec text-[10px] text-[#8D7135] tracking-[0.25em] uppercase font-bold mb-1">
              <Sun className="w-3.5 h-3.5" />
              <span>SKY LEVEL // THE FUTURE WING</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#1C1C1C]">
              THE FUTURE WING
            </h1>
          </div>

          <div className="font-mono-spec text-xs text-[#8D857B] font-light max-w-xs text-left sm:text-right">
            OBJECT 081–084 // THE UNWRITTEN CHAPTERS
          </div>
        </div>

        {/* Monumental Wall Statement */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-4xl font-black tracking-wider text-[#1C1C1C] leading-tight">
            {futureWing.wallTitle}
          </h2>
          <p className="font-editorial text-base sm:text-lg text-[#57534E] italic mt-1.5">
            "There are still so many chapters of you left to see."
          </p>
        </div>

        {/* 4 Sleek Empty Gold Museum Frames */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 py-2">
          {futureWing.emptyFrames.map((frame, idx) => {
            const isSelected = selectedFrameIndex === idx;

            return (
              <div
                key={frame.id}
                onClick={() => {
                  soundEngine.playChime(560 + idx * 40);
                  setSelectedFrameIndex(idx);
                }}
                className={`group relative p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[220px] ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#8D7135] shadow-xs scale-[1.01]'
                    : 'bg-[#FFFFFF]/70 border-[#B89A57]/25 hover:border-[#B89A57]'
                }`}
              >
                {/* Empty Gold Outer Bevel Frame */}
                <div className="relative w-full aspect-[4/3] rounded-lg border-2 border-dashed border-[#B89A57]/35 bg-[#EFE8DC]/50 flex flex-col items-center justify-center p-2 text-center overflow-hidden">
                  <div className="w-8 h-8 rounded-full border border-[#B89A57]/40 flex items-center justify-center bg-[#FAF8F5] text-[#8D7135] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono-spec text-[9px] text-[#8D7135] font-bold uppercase">
                    {frame.objectNumber}
                  </span>
                </div>

                {/* Museum Placard */}
                <div className="mt-2.5 pt-2 border-t border-[#B89A57]/20 space-y-0.5">
                  <h4 className="font-display text-xs font-bold text-[#1C1C1C]">
                    {frame.title}
                  </h4>
                  <p className="text-[10px] text-[#57534E] font-light line-clamp-2">
                    {frame.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Unwritten Memories Card */}
        <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#B89A57]/35 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#B89A57]/20 pb-2">
            <div className="flex items-center gap-2 font-mono-spec text-xs text-[#8D7135] font-bold uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>UNWRITTEN MEMORIES REGISTRY</span>
            </div>

            <button
              onClick={() => setShowInputBox(!showInputBox)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] text-[11px] font-mono-spec text-[#8D7135] border border-[#B89A57]/30 cursor-pointer"
            >
              <PlusCircle className="w-3 h-3" />
              <span>{showInputBox ? "CANCEL" : "INSCRIBE WISH"}</span>
            </button>
          </div>

          {showInputBox && (
            <form onSubmit={handleAddMilestone} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newMilestoneInput}
                onChange={(e) => setNewMilestoneInput(e.target.value)}
                placeholder="Type a future adventure or dream..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#B89A57]/40 text-xs font-mono-spec text-[#1C1C1C] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#B89A57] text-[#FAF8F5] text-xs font-mono-spec font-bold cursor-pointer"
              >
                INSCRIBE
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {userMilestones.map((m, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#FFFFFF] border border-[#B89A57]/20 font-editorial text-sm italic text-[#1C1C1C]"
              >
                " {m} "
              </div>
            ))}
          </div>
        </div>

        {/* Walk to The Letter */}
        <div className="pt-1 flex justify-center">
          <button
            onClick={() => {
              soundEngine.playFootstep();
              onNext();
            }}
            className="px-8 py-4 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-xs transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 cursor-pointer"
          >
            <span>PROCEED TO A LETTER FROM THE CURATOR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-5xl mx-auto w-full">
        <span>SKY LEVEL // THE FUTURE WING — OBJECT 081–084</span>
        <span className="text-[#8D7135] font-semibold text-[11px]">NEXT: A LETTER FROM THE CURATOR</span>
      </div>

    </div>
  );
};
