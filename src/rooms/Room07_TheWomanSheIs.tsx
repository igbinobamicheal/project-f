import React, { useState } from 'react';
import { ArrowRight, Heart, Star } from 'lucide-react';
import { MuseumFrame } from '../components/MuseumFrame';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room07TheWomanSheIsProps {
  onNext: () => void;
  onInspectArtwork?: (item: any) => void;
}

export const Room07_TheWomanSheIs: React.FC<Room07TheWomanSheIsProps> = ({
  onNext,
  onInspectArtwork
}) => {
  const { galleryWoman } = MUSEUM_CONFIG;
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F5] text-[#1C1C1C] py-16 px-6 sm:px-12 md:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* High-Editorial Diffused Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-radial-gradient from-[#D8C9AA]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 w-full my-auto">
        
        {/* Top Wing Signage */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#B89A57]/30 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-spec text-[10px] text-[#8D7135] tracking-[0.25em] uppercase font-bold mb-1">
              <Star className="w-3.5 h-3.5" />
              <span>ROTUNDA // GALLERY 05</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#1C1C1C]">
              THE WOMAN SHE IS
            </h1>
          </div>

          <div className="font-mono-spec text-xs text-[#8D857B] font-light max-w-xs text-left sm:text-right">
            OBJECT 060 // MONUMENTAL ESSAY
          </div>
        </div>

        {/* Minimalist 2-Column Curatorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
          
          {/* Left Column (5 Cols): Centerpiece Portrait */}
          <div className="lg:col-span-5 space-y-3">
            <MuseumFrame
              imageSrc={galleryWoman.image}
              altText="The Woman She Is - Monograph"
              aspectRatio="hero"
              objectCode={galleryWoman.objectNumber}
              title={galleryWoman.title}
              className="w-full max-w-xs mx-auto"
              onClick={() => {
                soundEngine.playChime(640);
                if (onInspectArtwork) {
                  onInspectArtwork({
                    objectNumber: galleryWoman.objectNumber,
                    title: galleryWoman.title,
                    subtitle: galleryWoman.subtitle,
                    medium: galleryWoman.medium,
                    year: galleryWoman.year,
                    image: galleryWoman.image,
                    curatorNotes: galleryWoman.editorialText
                  });
                }
              }}
            />

            <div className="p-3.5 rounded-2xl bg-[#EFE8DC] border border-[#B89A57]/30 text-center max-w-xs mx-auto">
              <p className="font-editorial text-sm sm:text-base text-[#1C1C1C] italic">
                "{galleryWoman.editorialText}"
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Monumental Typographic Words Sequence */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {galleryWoman.monumentalWords.map((item, idx) => {
                const isSelected = activeWordIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      soundEngine.playChime(540 + idx * 30);
                      setActiveWordIndex(idx);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#8D7135] shadow-xs'
                        : 'bg-[#FFFFFF]/70 border-[#B89A57]/20 hover:border-[#B89A57]'
                    }`}
                  >
                    <span className="font-mono-spec text-[9px] text-[#8D7135] font-bold block mb-0.5">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-black text-[#1C1C1C]">
                      {item.word}
                    </h3>
                    <p className="font-editorial text-[11px] italic text-[#57534E] truncate mt-0.5">
                      "{item.subtitle}"
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Note from Micheal */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#B89A57]/30 shadow-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono-spec text-[10px] text-[#8D7135] uppercase tracking-widest font-bold">
                <Heart className="w-3 h-3" />
                <span>CURATOR'S DEDICATION</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1C1C1C] font-light leading-relaxed">
                {galleryWoman.shortLetter}
              </p>
            </div>

            {/* Walk to The Future Wing */}
            <div className="pt-2">
              <button
                onClick={() => {
                  soundEngine.playFootstep();
                  onNext();
                }}
                className="px-6 py-3.5 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-xs transition-all duration-300 hover:scale-[1.02] flex items-center justify-between gap-4 w-full sm:w-auto cursor-pointer"
              >
                <span>PROCEED TO THE FUTURE WING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-5xl mx-auto w-full">
        <span>GALLERY 05 // OBJECT 060 — THE WOMAN SHE IS</span>
        <span className="text-[#8D7135] font-semibold text-[11px]">NEXT: THE FUTURE WING</span>
      </div>

    </div>
  );
};
