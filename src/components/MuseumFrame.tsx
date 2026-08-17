import React from 'react';

interface MuseumFrameProps {
  imageSrc: string;
  altText: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'hero' | 'auto';
  className?: string;
  theme?: 'light' | 'dark';
  objectCode?: string;
  title?: string;
  onClick?: () => void;
  hoverScale?: boolean;
}

export const MuseumFrame: React.FC<MuseumFrameProps> = ({
  imageSrc,
  altText,
  aspectRatio = 'portrait',
  className = '',
  theme = 'light',
  objectCode,
  title,
  onClick,
  hoverScale = true
}) => {
  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-[3/4] max-h-[380px] sm:max-h-[440px]';
      case 'landscape':
        return 'aspect-[16/10] max-h-[300px] sm:max-h-[360px]';
      case 'square':
        return 'aspect-square max-h-[320px] sm:max-h-[380px]';
      case 'hero':
        return 'aspect-[3/4] max-h-[400px] sm:max-h-[460px]';
      case 'auto':
      default:
        return 'h-auto max-h-[400px]';
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`relative group ${hoverScale ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Outer Fine Art Gold Bevel Frame */}
      <div
        className={`relative p-3 sm:p-3.5 rounded-2xl transition-all duration-700 ${
          isDark
            ? 'bg-[#141416] border border-[#B89A57]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]'
            : 'bg-[#FFFFFF] border border-[#B89A57]/35 shadow-[0_20px_50px_-15px_rgba(28,28,28,0.1)]'
        } ${hoverScale ? 'hover:shadow-[0_25px_60px_-15px_rgba(184,154,87,0.2)] hover:border-[#B89A57]/70 hover:-translate-y-1' : ''}`}
      >
        {/* Inner Gold Inset Rule */}
        <div className="absolute inset-1.5 sm:inset-2 border border-[#B89A57]/20 pointer-events-none rounded-xl" />

        {/* Archival Museum Matte */}
        <div
          className={`relative p-2 rounded-lg overflow-hidden ${
            isDark ? 'bg-[#0D0D0D]' : 'bg-[#FAF8F5]'
          }`}
        >
          {/* Photograph Container */}
          <div className={`relative overflow-hidden rounded-sm w-full ${getAspectClass()} flex items-center justify-center bg-black/5`}>
            <img
              src={imageSrc}
              alt={altText}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 filter contrast-[1.03] ${
                hoverScale ? 'group-hover:scale-[1.02]' : ''
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/museum/mind.jpg';
              }}
            />

            {/* Museum Optical Glass Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent pointer-events-none" />

            {/* Vignette Shadow Depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
          </div>
        </div>

        {/* Optional Brass Nameplate Plate */}
        {(objectCode || title) && (
          <div className="mt-2.5 pt-2 border-t border-[#B89A57]/20 flex items-center justify-between px-1">
            {objectCode && (
              <span className="font-mono-spec text-[10px] tracking-[0.2em] text-[#8D7135] uppercase font-bold">
                {objectCode}
              </span>
            )}
            {title && (
              <span className="font-display text-[11px] tracking-wider text-[#1C1C1C] dark:text-[#EFE8DC] font-medium truncate max-w-[180px]">
                {title}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
