import React, { useState } from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { MuseumFrame } from '../components/MuseumFrame';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room06TheLittleThingsProps {
  onNext: () => void;
  onInspectArtwork?: (item: any) => void;
}

export const Room06_TheLittleThings: React.FC<Room06TheLittleThingsProps> = ({
  onNext,
  onInspectArtwork
}) => {
  const { galleryLittleThings } = MUSEUM_CONFIG;
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(0);

  const activeLabel = galleryLittleThings.placards[selectedLabelIndex];

  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F5] text-[#1C1C1C] py-16 px-6 sm:px-12 md:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* Sanctuary Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-radial-gradient from-[#D8C9AA]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 w-full my-auto">
        
        {/* Top Wing Signage */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#B89A57]/30 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-spec text-[10px] text-[#8D7135] tracking-[0.25em] uppercase font-bold mb-1">
              <Bookmark className="w-3.5 h-3.5" />
              <span>SANCTUARY // GALLERY 04</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#1C1C1C]">
              THE LITTLE THINGS
            </h1>
          </div>

          <div className="font-mono-spec text-xs text-[#8D857B] font-light max-w-xs text-left sm:text-right">
            OBJECT 040 // MICRO-OBSERVATIONAL FIELD STUDIES
          </div>
        </div>

        {/* Minimalist 2-Column Curatorial Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
          
          {/* Left Column (5 Cols): Centerpiece Portrait */}
          <div className="lg:col-span-5 space-y-3">
            <MuseumFrame
              imageSrc={activeLabel.image || galleryLittleThings.image}
              altText="The Little Things - Field Study Portrait"
              aspectRatio="portrait"
              objectCode={galleryLittleThings.objectNumber}
              title={activeLabel.label}
              className="w-full max-w-xs mx-auto"
              onClick={() => {
                soundEngine.playChime(640);
                if (onInspectArtwork) {
                  onInspectArtwork({
                    objectNumber: galleryLittleThings.objectNumber,
                    title: activeLabel.label,
                    subtitle: "A Micro-Observational Field Study",
                    medium: "Pedestal Studies & Fine Art Framing",
                    year: "2026",
                    image: activeLabel.image || galleryLittleThings.image,
                    curatorNotes: activeLabel.observation
                  });
                }
              }}
            />

            <div className="p-3.5 rounded-2xl bg-[#EFE8DC] border border-[#B89A57]/30 text-center max-w-xs mx-auto">
              <p className="font-editorial text-base sm:text-lg text-[#1C1C1C] italic">
                "{galleryLittleThings.shortLetter}"
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Discrete Interactive Museum Labels */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              {galleryLittleThings.placards.map((item, idx) => {
                const isSelected = selectedLabelIndex === idx;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEngine.playChime(540 + idx * 40);
                      setSelectedLabelIndex(idx);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#8D7135] shadow-xs'
                        : 'bg-[#FFFFFF]/70 border-[#B89A57]/20 hover:border-[#B89A57]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono-spec font-bold shrink-0 ${
                        isSelected
                          ? 'bg-[#B89A57] text-[#FAF8F5]'
                          : 'bg-[#EFE8DC] text-[#8D7135]'
                      }`}>
                        0{idx + 1}
                      </div>
                      <h4 className="font-display text-xs sm:text-sm font-bold text-[#1C1C1C]">
                        {item.label}
                      </h4>
                    </div>

                    <span className="font-mono-spec text-[10px] text-[#8D7135] font-semibold shrink-0">
                      {isSelected ? "REVEALED" : "VIEW"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Revealed Observation Card */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#B89A57]/35 shadow-xs space-y-2">
              <span className="font-mono-spec text-[10px] font-bold text-[#8D7135] uppercase block">
                CURATORIAL STUDY 0{selectedLabelIndex + 1} // {activeLabel.label}
              </span>
              <p className="font-editorial text-lg sm:text-xl text-[#1C1C1C] italic leading-relaxed">
                "{activeLabel.observation}"
              </p>
            </div>

            {/* Walk to Gallery V */}
            <div className="pt-2">
              <button
                onClick={() => {
                  soundEngine.playFootstep();
                  onNext();
                }}
                className="px-6 py-3.5 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-xs transition-all duration-300 hover:scale-[1.02] flex items-center justify-between gap-4 w-full sm:w-auto cursor-pointer"
              >
                <span>PROCEED TO GALLERY V: THE WOMAN SHE IS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-5xl mx-auto w-full">
        <span>GALLERY 04 // OBJECT 040 — THE LITTLE THINGS</span>
        <span className="text-[#8D7135] font-semibold text-[11px]">NEXT: GALLERY 05 // THE WOMAN SHE IS</span>
      </div>

    </div>
  );
};
