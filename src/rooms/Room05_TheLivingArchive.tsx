import React, { useState, useRef } from 'react';
import { Archive, ArrowRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ArchivalMemory } from '../data/museumContent';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room05TheLivingArchiveProps {
  onNext: () => void;
  onInspectArchivalItem: (item: ArchivalMemory) => void;
}

export const Room05_TheLivingArchive: React.FC<Room05TheLivingArchiveProps> = ({
  onNext,
  onInspectArchivalItem
}) => {
  const { livingArchive } = MUSEUM_CONFIG;
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allTags = ['ALL', ...Array.from(new Set(livingArchive.items.flatMap((item) => item.tags)))];

  const filteredItems = selectedTag === 'ALL'
    ? livingArchive.items
    : livingArchive.items.filter((item) => item.tags.includes(selectedTag));

  const handleScrollLeft = () => {
    soundEngine.playFootstep();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    soundEngine.playFootstep();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#EFE8DC] text-[#1C1C1C] py-16 px-6 sm:px-12 md:px-16 overflow-hidden flex flex-col justify-between">
      
      {/* Archival Track Lighting */}
      <div className="absolute top-0 left-1/4 w-full max-w-6xl h-72 bg-radial-gradient from-[#B89A57]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-6 w-full my-auto">
        
        {/* Archive Room Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#B89A57]/30 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-spec text-[10px] text-[#8D7135] tracking-[0.25em] uppercase font-bold mb-1">
              <Archive className="w-3.5 h-3.5" />
              <span>CENTRAL WING // THE LIVING ARCHIVE</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#1C1C1C]">
              THE LIVING ARCHIVE
            </h1>
          </div>

          <div className="font-mono-spec text-xs text-[#8D857B] font-light max-w-xs text-left md:text-right">
            CONTINUOUS CONTACT SHEET WALL // {filteredItems.length} ARTIFACTS
          </div>
        </div>

        {/* Filter Controls & Corridor Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-1 border-b border-[#B89A57]/20">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <Filter className="w-3 h-3 text-[#8D7135] shrink-0" />
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  soundEngine.playChime(600);
                  setSelectedTag(tag);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono-spec tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#B89A57] text-[#FAF8F5] font-bold shadow-xs'
                    : 'bg-[#FFFFFF] border border-[#B89A57]/25 text-[#57534E] hover:text-[#1C1C1C]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono-spec text-[10px] text-[#8D7135] font-semibold hidden md:inline">
              SCROLL CORRIDOR:
            </span>
            <button
              onClick={handleScrollLeft}
              className="p-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EFE8DC] border border-[#B89A57]/30 text-[#1C1C1C] transition-colors cursor-pointer"
              aria-label="Scroll Archive Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleScrollRight}
              className="p-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EFE8DC] border border-[#B89A57]/30 text-[#1C1C1C] transition-colors cursor-pointer"
              aria-label="Scroll Archive Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Contact Sheet Wall */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-6 pt-3 scroll-smooth -mx-2 px-2"
        >
          <div className="flex gap-6 min-w-max items-center py-2">
            {filteredItems.map((item) => {
              const getCardFrameStyle = (aspectRatio: string) => {
                switch (aspectRatio) {
                  case 'tall':
                  case 'story':
                    return {
                      cardWidth: 'w-[205px] sm:w-[230px]',
                      frameAspect: 'aspect-[9/16]',
                    };
                  case 'landscape':
                  case 'wide':
                    return {
                      cardWidth: 'w-[310px] sm:w-[370px]',
                      frameAspect: 'aspect-[4/3]',
                    };
                  case 'square':
                    return {
                      cardWidth: 'w-[245px] sm:w-[280px]',
                      frameAspect: 'aspect-square',
                    };
                  case 'portrait':
                  default:
                    return {
                      cardWidth: 'w-[240px] sm:w-[270px]',
                      frameAspect: 'aspect-[3/4]',
                    };
                }
              };

              const { cardWidth, frameAspect } = getCardFrameStyle(item.aspectRatio);

              return (
                <div
                  key={item.id}
                  data-cursor="open"
                  onClick={() => {
                    soundEngine.playChime(640);
                    onInspectArchivalItem(item);
                  }}
                  className={`group relative rounded-2xl bg-[#FFFFFF] border border-[#B89A57]/30 p-3 shadow-xs transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border-[#8D7135] cursor-pointer shrink-0 ${cardWidth}`}
                >
                  {/* Photo Frame */}
                  <div className={`relative w-full rounded-xl overflow-hidden bg-[#FAF8F5] shadow-xs ${frameAspect}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.02]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/museum/mind.jpg';
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent pointer-events-none" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                      <span className="font-mono-spec text-[9px] text-[#D8C9AA] uppercase tracking-wider">
                        {item.catalogCode} // {item.date}
                      </span>
                      <h4 className="font-display text-sm font-bold text-white leading-snug mt-0.5">
                        {item.title}
                      </h4>
                      <p className="font-editorial text-xs italic text-zinc-200 line-clamp-2 mt-1">
                        "{item.curatorNote}"
                      </p>
                    </div>
                  </div>

                  {/* Underneath Placard */}
                  <div className="mt-2.5 pt-1.5 border-t border-[#B89A57]/20 flex items-center justify-between text-xs font-mono-spec">
                    <div className="min-w-0 pr-2">
                      <span className="text-[#8D7135] font-bold block text-[9px] uppercase tracking-wider">
                        {item.catalogCode}
                      </span>
                      <span className="font-display font-semibold text-[#1C1C1C] text-[11px] truncate block">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[#8D857B] text-[9px] uppercase shrink-0">
                      {item.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Wing Walk Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#B89A57]/30">
          <p className="font-editorial text-xs italic text-[#57534E]">
            "Preserving moments that would otherwise belong only to memory."
          </p>

          <button
            onClick={() => {
              soundEngine.playFootstep();
              onNext();
            }}
            className="px-6 py-3.5 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-xs transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>NEXT: THE LITTLE THINGS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-6xl mx-auto w-full">
        <span>CENTRAL WING // THE LIVING ARCHIVE</span>
        <span className="text-[#8D7135] font-semibold text-[11px]">NEXT: GALLERY 04 // THE LITTLE THINGS</span>
      </div>

    </div>
  );
};
