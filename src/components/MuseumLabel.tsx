import React from 'react';
import { Eye } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface MuseumLabelProps {
  objectNumber: string;
  title: string;
  subtitle?: string;
  medium?: string;
  year?: string;
  classification?: string;
  curatorNotes?: string;
  theme?: 'light' | 'dark';
  className?: string;
  onInspect?: () => void;
}

export const MuseumLabel: React.FC<MuseumLabelProps> = ({
  objectNumber,
  title,
  subtitle,
  medium,
  year,
  classification,
  curatorNotes,
  theme = 'light',
  className = '',
  onInspect
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-[#141416]/95 border border-[#B89A57]/30 text-[#F7F5F1] shadow-xl'
          : 'bg-[#FFFFFF]/95 border border-[#B89A57]/35 text-[#1C1C1C] shadow-lg'
      } ${className}`}
    >
      {/* Brass Corner Rivets */}
      <div className="absolute top-2.5 left-2.5 w-1 h-1 rounded-full bg-[#B89A57]" />
      <div className="absolute top-2.5 right-2.5 w-1 h-1 rounded-full bg-[#B89A57]" />
      <div className="absolute bottom-2.5 left-2.5 w-1 h-1 rounded-full bg-[#B89A57]" />
      <div className="absolute bottom-2.5 right-2.5 w-1 h-1 rounded-full bg-[#B89A57]" />

      {/* Top Spec Header */}
      <div className="flex items-center justify-between border-b border-[#B89A57]/20 pb-3 mb-3">
        <span className="font-mono-spec text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8D7135] uppercase font-bold">
          {objectNumber}
        </span>
        {classification && (
          <span className="font-mono-spec text-[10px] tracking-widest text-[#8D857B] uppercase">
            // {classification}
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h3 className="font-display text-lg sm:text-xl font-bold tracking-wider text-[#1C1C1C] dark:text-[#F7F5F1]">
          {title}
        </h3>
        {subtitle && (
          <p className="font-editorial text-sm sm:text-base italic text-[#57534E] dark:text-[#D8C9AA]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Metadata Specification Grid */}
      {(medium || year) && (
        <div className="mt-3 py-2 border-y border-[#B89A57]/15 flex items-center justify-between text-[11px] font-mono-spec text-[#8D857B]">
          {medium && <span>{medium}</span>}
          {year && <span className="text-[#8D7135] font-semibold">{year}</span>}
        </div>
      )}

      {/* Curatorial Observation Text */}
      {curatorNotes && (
        <p className="mt-3 text-xs sm:text-sm font-light leading-relaxed text-[#57534E] dark:text-[#D8C9AA]/90">
          {curatorNotes}
        </p>
      )}

      {/* Interactive Inspect Button */}
      {onInspect && (
        <div className="mt-4 pt-3 border-t border-[#B89A57]/20 flex justify-end">
          <button
            onClick={() => {
              soundEngine.playChime(660);
              onInspect();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono-spec tracking-wider transition-all duration-200 cursor-pointer bg-[#B89A57]/15 hover:bg-[#B89A57]/25 text-[#8D7135] hover:text-[#0D0D0D] border border-[#B89A57]/40"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>EXAMINE DETAILS</span>
          </button>
        </div>
      )}
    </div>
  );
};
