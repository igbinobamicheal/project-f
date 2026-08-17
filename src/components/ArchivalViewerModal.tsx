import React from 'react';
import { X, Calendar, MapPin, Sparkles, Image as ImageIcon, Play } from 'lucide-react';
import type { ArchivalMemory } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface ArchivalViewerModalProps {
  item: ArchivalMemory | null;
  onClose: () => void;
}

export const ArchivalViewerModal: React.FC<ArchivalViewerModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0D0D0D]/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#F7F5F1] text-[#1C1C1C] border border-[#B89A57]/40 rounded-3xl shadow-[0_35px_90px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Close Button Top-Right */}
        <button
          onClick={() => {
            soundEngine.playChime(480);
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#1C1C1C]/80 hover:bg-[#1C1C1C] text-[#F7F5F1] transition-all cursor-pointer shadow-lg"
          aria-label="Close Archival Viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left / Top: High-Res Photograph / Visual Frame */}
        <div className="md:w-3/5 bg-[#0D0D0D] flex items-center justify-center p-6 sm:p-8 relative min-h-[320px] md:min-h-[500px]">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-[#B89A57]/15 to-transparent pointer-events-none" />

          {/* Centered Image with Fine Bevel Border */}
          <div className="relative rounded-2xl overflow-hidden border border-[#B89A57]/40 shadow-2xl max-h-[75vh] group">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain max-h-[70vh] filter contrast-[1.03]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/museum/mind.jpg';
              }}
            />
            {/* Museum Glass Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />

            {item.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-16 h-16 rounded-full bg-[#B89A57]/90 text-zinc-950 flex items-center justify-center shadow-2xl">
                  <Play className="w-6 h-6 fill-zinc-950 ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right / Bottom: Archival Placard & Personal Curatorial Notes */}
        <div className="md:w-2/5 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto bg-[#F7F5F1] space-y-6">
          <div className="space-y-4">
            {/* Museum Catalog Tag */}
            <div className="flex items-center justify-between border-b border-[#B89A57]/25 pb-3">
              <div className="flex items-center gap-2 text-[#8D7135] font-mono-spec text-xs font-bold tracking-[0.2em] uppercase">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{item.catalogCode}</span>
              </div>
              <span className="font-mono-spec text-[10px] text-[#8D857B] uppercase tracking-wider">
                ARCHIVAL PRESERVATION
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-[#1C1C1C]">
                {item.title}
              </h2>
            </div>

            {/* Date & Location Spec */}
            <div className="space-y-2 py-3 border-y border-[#B89A57]/20 text-xs font-mono-spec text-[#57534E]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8D7135]" />
                <span>DATE: <strong className="text-[#1C1C1C] font-semibold">{item.date}</strong></span>
                {item.time && <span className="text-[#8D857B]">({item.time})</span>}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8D7135]" />
                <span>LOCATION: <strong className="text-[#1C1C1C] font-semibold">{item.location}</strong></span>
              </div>
            </div>

            {/* Curator's Note */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-1.5 font-mono-spec text-xs text-[#8D7135] uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CURATOR'S PERSONAL NOTE</span>
              </div>
              <p className="font-editorial text-lg sm:text-xl text-[#1C1C1C] italic leading-relaxed">
                "{item.curatorNote}"
              </p>
            </div>
          </div>

          {/* Tags & Permanent Registry Badge */}
          <div className="pt-4 border-t border-[#B89A57]/20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#EFE8DC] border border-[#B89A57]/25 text-[10px] font-mono-spec text-[#8D7135] uppercase tracking-wider"
                >
                  #{t}
                </span>
              ))}
            </div>

            <span className="font-mono-spec text-[10px] tracking-widest text-[#8D857B] uppercase">
              STATUS: PERMANENT
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
