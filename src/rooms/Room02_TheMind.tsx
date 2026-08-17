import React, { useState } from 'react';
import { Brain, Sparkles, ArrowRight } from 'lucide-react';
import { MuseumFrame } from '../components/MuseumFrame';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room02TheMindProps {
  onNext: () => void;
  onInspectArtwork?: (item: any) => void;
}

export const Room02_TheMind: React.FC<Room02TheMindProps> = ({ onNext, onInspectArtwork }) => {
  const { galleryMind } = MUSEUM_CONFIG;
  const [activeNode, setActiveNode] = useState(0);

  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F5] text-[#1C1C1C] py-16 px-6 sm:px-12 md:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* Directional Lighting Cone */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-radial-gradient from-[#D8C9AA]/20 via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-8 w-full my-auto">
        
        {/* Top Wing Signage */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#B89A57]/30 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-spec text-[10px] text-[#8D7135] tracking-[0.25em] uppercase font-bold mb-1">
              <Brain className="w-3.5 h-3.5" />
              <span>EAST WING // GALLERY 01</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#1C1C1C]">
              HER MIND
            </h1>
          </div>

          <div className="font-mono-spec text-xs text-[#8D857B] max-w-xs text-left sm:text-right font-light">
            OBJECT 001 // THE ARCHITECTURE OF CURIOSITY
          </div>
        </div>

        {/* Curatorial Layout: Hero Portrait + "BRILLIANT." + Editorial + Short Note */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-2">
          
          {/* Left Column (5.5 Cols): The Framed Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <MuseumFrame
              imageSrc={galleryMind.image}
              altText="Her Mind - Museum Portrait"
              aspectRatio="hero"
              objectCode={galleryMind.objectNumber}
              title={galleryMind.title}
              className="w-full max-w-sm"
              onClick={() => {
                soundEngine.playChime(640);
                if (onInspectArtwork) {
                  onInspectArtwork({
                    objectNumber: galleryMind.objectNumber,
                    title: galleryMind.title,
                    subtitle: galleryMind.subtitle,
                    medium: galleryMind.medium,
                    year: galleryMind.year,
                    image: galleryMind.image,
                    curatorNotes: galleryMind.editorialText
                  });
                }
              }}
            />
          </div>

          {/* Right Column (6.5 Cols): "BRILLIANT." + Editorial Praise + Short Letter */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Monumental Headline */}
            <div>
              <span className="font-mono-spec text-[10px] tracking-[0.3em] text-[#8D7135] uppercase font-bold block mb-1">
                CURATORIAL ESSAY
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-wider text-[#1C1C1C]">
                {galleryMind.headline}
              </h2>
            </div>

            {/* Editorial Praise / Observations */}
            <p className="font-editorial text-lg sm:text-xl text-[#1C1C1C] leading-relaxed italic">
              "{galleryMind.editorialText}"
            </p>

            {/* Short Letter from Micheal */}
            <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#B89A57]/30 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-1.5 font-mono-spec text-[10px] text-[#8D7135] uppercase tracking-widest font-bold">
                <Sparkles className="w-3 h-3" />
                <span>NOTE FROM THE CURATOR</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1C1C1C] font-light leading-relaxed">
                {galleryMind.shortLetter}
              </p>
            </div>

            {/* Streamlined Facets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {galleryMind.thoughtNodes.slice(0, 3).map((node, i) => (
                <button
                  key={node.id}
                  onClick={() => {
                    soundEngine.playChime(520 + i * 40);
                    setActiveNode(i);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono-spec transition-all cursor-pointer border ${
                    activeNode === i
                      ? 'bg-[#B89A57] text-[#FAF8F5] font-bold border-[#8D7135]'
                      : 'bg-[#FFFFFF] text-[#57534E] border-[#B89A57]/25 hover:border-[#B89A57]'
                  }`}
                >
                  {node.title}
                </button>
              ))}
            </div>

            {/* Next Gallery Walk Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  soundEngine.playFootstep();
                  onNext();
                }}
                className="px-6 py-3.5 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>PROCEED TO GALLERY II: HER SPIRIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-5xl mx-auto w-full">
        <span>GALLERY 01 // OBJECT 001 — HER MIND</span>
        <span className="text-[#8D7135] font-semibold text-[11px]">NEXT: GALLERY 02 // HER SPIRIT</span>
      </div>

    </div>
  );
};
