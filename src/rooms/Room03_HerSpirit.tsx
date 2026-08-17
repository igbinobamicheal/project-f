import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { MuseumFrame } from '../components/MuseumFrame';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room03HerSpiritProps {
  onNext: () => void;
  onInspectArtwork?: (item: any) => void;
}

export const Room03_HerSpirit: React.FC<Room03HerSpiritProps> = ({ onNext, onInspectArtwork }) => {
  const { gallerySpirit } = MUSEUM_CONFIG;
  const [selectedQualityIndex, setSelectedQualityIndex] = useState(0);

  return (
    <div className="relative w-full min-h-screen bg-[#EFE8DC] text-[#1C1C1C] py-16 px-6 sm:px-12 md:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* Warm Luminescence Gallery Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-radial-gradient from-[#B89A57]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 w-full my-auto">
        
        {/* Top Wing Signage */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#B89A57]/30 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-spec text-[10px] text-[#8D7135] tracking-[0.25em] uppercase font-bold mb-1">
              <Heart className="w-3.5 h-3.5" />
              <span>WEST WING // GALLERY 02</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#1C1C1C]">
              HER SPIRIT
            </h1>
          </div>

          <div className="font-mono-spec text-xs text-[#8D857B] font-light">
            OBJECT 014 // VIRTUE MONUMENT
          </div>
        </div>

        {/* Minimalist 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
          
          {/* Left: 3 Monumental Typographic Virtues */}
          <div className="lg:col-span-4 space-y-2.5">
            {gallerySpirit.qualities.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundEngine.playChime(540 + idx * 60);
                  setSelectedQualityIndex(idx);
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 border cursor-pointer ${
                  selectedQualityIndex === idx
                    ? 'bg-[#FFFFFF] border-[#8D7135] shadow-xs'
                    : 'bg-[#FAF8F5]/80 border-[#B89A57]/20 hover:border-[#B89A57]'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono-spec text-[9px] text-[#8D7135] font-bold">
                    {q.objectCode}
                  </span>
                  <span className="font-mono-spec text-[9px] text-[#8D857B] uppercase">
                    {q.label}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-black text-[#1C1C1C]">
                  {q.word}
                </h3>

                <p className="font-editorial text-xs italic text-[#57534E] mt-0.5 line-clamp-2">
                  "{q.annotation}"
                </p>
              </button>
            ))}
          </div>

          {/* Center: Centerpiece Hero Portrait */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <MuseumFrame
              imageSrc={gallerySpirit.image}
              altText="Her Spirit - Fine Art Portrait"
              aspectRatio="portrait"
              objectCode={gallerySpirit.objectNumber}
              title={gallerySpirit.title}
              className="w-full max-w-xs"
              onClick={() => {
                soundEngine.playChime(640);
                if (onInspectArtwork) {
                  onInspectArtwork({
                    objectNumber: gallerySpirit.objectNumber,
                    title: gallerySpirit.title,
                    subtitle: gallerySpirit.subtitle,
                    medium: gallerySpirit.medium,
                    year: gallerySpirit.year,
                    image: gallerySpirit.image,
                    curatorNotes: gallerySpirit.editorialText
                  });
                }
              }}
            />
          </div>

          {/* Right: Curatorial Analysis & Note */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#B89A57]/30 shadow-xs space-y-2">
              <span className="font-mono-spec text-[9px] text-[#8D7135] tracking-widest uppercase font-bold block">
                {gallerySpirit.qualities[selectedQualityIndex].objectCode} ANALYSIS
              </span>
              <h4 className="font-display text-sm font-bold text-[#1C1C1C]">
                {gallerySpirit.qualities[selectedQualityIndex].label}
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed font-light">
                {gallerySpirit.qualities[selectedQualityIndex].detail}
              </p>
            </div>

            {/* Note from Micheal */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#B89A57]/30 space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 font-mono-spec text-[9px] text-[#8D7135] uppercase tracking-widest font-bold">
                <Sparkles className="w-3 h-3" />
                <span>CURATOR'S REFLECTION</span>
              </div>
              <p className="text-xs text-[#1C1C1C] font-light leading-relaxed">
                {gallerySpirit.shortLetter}
              </p>
            </div>

            {/* Proceed Button */}
            <button
              onClick={() => {
                soundEngine.playFootstep();
                onNext();
              }}
              className="w-full px-5 py-3 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-xs transition-all duration-300 hover:scale-[1.02] flex items-center justify-between cursor-pointer"
            >
              <span>NEXT: THE FUNNY ONE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-5xl mx-auto w-full">
        <span>GALLERY 02 // OBJECT 014 — HER SPIRIT</span>
        <span className="text-[#8D7135] font-semibold text-[11px]">NEXT: GALLERY 03 // THE FUNNY ONE</span>
      </div>

    </div>
  );
};
