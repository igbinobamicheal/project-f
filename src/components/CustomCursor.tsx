import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovered(false);
        setCursorText('');
        return;
      }

      // Check context
      const isArtwork = target.closest('[data-cursor="view"]') || target.closest('.museum-gold-frame');
      const isArchive = target.closest('[data-cursor="open"]');
      const isVideo = target.closest('[data-cursor="play"]');
      const isLetter = target.closest('[data-cursor="read"]');
      const isDoor = target.closest('[data-cursor="enter"]');

      if (isVideo) {
        setIsHovered(true);
        setCursorText('PLAY');
      } else if (isArchive) {
        setIsHovered(true);
        setCursorText('OPEN');
      } else if (isArtwork) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (isLetter) {
        setIsHovered(true);
        setCursorText('READ');
      } else if (isDoor) {
        setIsHovered(true);
        setCursorText('ENTER');
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center Reticle Point */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered && cursorText ? '0px' : isHovered ? '6px' : '4px',
          height: isHovered && cursorText ? '0px' : isHovered ? '6px' : '4px',
          backgroundColor: '#B89A57',
          boxShadow: '0 0 10px rgba(184,154,87,0.8)'
        }}
      />

      {/* Outer Fine Art Precision Ring / Context Badge */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B89A57]/60 transition-all duration-200 ease-out hidden md:flex items-center justify-center font-mono-spec text-[9px] tracking-widest text-[#8D7135] font-bold"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: cursorText ? '48px' : isHovered ? '38px' : '24px',
          height: cursorText ? '48px' : isHovered ? '38px' : '24px',
          backgroundColor: isHovered ? 'rgba(184, 154, 87, 0.12)' : 'transparent',
          backdropFilter: cursorText ? 'blur(4px)' : 'none',
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`
        }}
      >
        {cursorText}
      </div>
    </>
  );
};
