import React, { useState } from 'react';
import { X, Sparkles, Volume2, Lock, Unlock, Move, Search, Image as ImageIcon } from 'lucide-react';
import type { ArtworkPlacard } from '../data/museumContent';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface ArtworkModalProps {
  artwork: ArtworkPlacard | null;
  onClose: () => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose }) => {
  const [isRedactedUnlocked, setIsRedactedUnlocked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });

  if (!artwork) return null;

  const handleAudioPlay = () => {
    setIsPlayingAudio(true);
    soundEngine.playEtherealChord();
    setTimeout(() => {
      soundEngine.playChime(620);
      setIsPlayingAudio(false);
    }, 2500);
  };

  const handleUnlock = () => {
    soundEngine.playChime(780);
    setIsRedactedUnlocked(!isRedactedUnlocked);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D0D0D]/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#F7F5F1] text-[#1C1C1C] border border-[#B89A57]/45 rounded-3xl p-6 sm:p-8 shadow-[0_35px_90px_rgba(0,0,0,0.85)] overflow-y-auto max-h-[90vh] flex flex-col gap-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#B89A57]/30 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#B89A57]/20 text-[#8D7135] font-mono-spec text-[11px] font-bold tracking-wider">
              {artwork.objectNumber}
            </span>
            {artwork.classification && (
              <span className="font-mono-spec text-[11px] text-[#8D857B] tracking-wider uppercase font-semibold">
                // {artwork.classification}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              soundEngine.playChime(480);
              onClose();
            }}
            className="p-1.5 rounded-full bg-[#EFE8DC] hover:bg-[#D8C9AA] text-[#1C1C1C] border border-[#B89A57]/30 transition-colors cursor-pointer"
            aria-label="Close Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Artwork Title */}
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-[#1C1C1C]">
            {artwork.title}
          </h2>
          {artwork.subtitle && (
            <p className="font-editorial text-base sm:text-lg italic text-[#57534E] mt-1">
              {artwork.subtitle}
            </p>
          )}
        </div>

        {/* Artwork Image Frame (If Photo Exists) */}
        {artwork.image && (
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#B89A57]/40 bg-[#0D0D0D] shadow-xl group max-h-[360px] flex items-center justify-center">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-contain max-h-[340px] rounded-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/museum/mind.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 border border-[#B89A57]/40 text-[10px] font-mono-spec text-[#D8C9AA] flex items-center gap-1.5 backdrop-blur-md">
              <ImageIcon className="w-3 h-3 text-[#B89A57]" />
              <span>PERMANENT PHOTOGRAPHIC ARTIFACT</span>
            </div>
          </div>
        )}

        {/* Interactive Artwork Demonstration Area */}
        <div className="p-6 rounded-2xl bg-[#EFE8DC] border border-[#B89A57]/35 relative overflow-hidden flex flex-col items-center justify-center min-h-[140px]">
          {artwork.interactiveType === 'tilt' && (
            <div 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
                setTiltAngle({ x, y });
              }}
              onMouseLeave={() => setTiltAngle({ x: 0, y: 0 })}
              style={{
                transform: `perspective(600px) rotateX(${tiltAngle.y}deg) rotateY(${tiltAngle.x}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
              className="p-5 rounded-xl bg-[#FFFFFF] border border-[#B89A57]/50 shadow-md flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing text-center select-none"
            >
              <Move className="w-5 h-5 text-[#8D7135] animate-pulse" />
              <span className="font-mono-spec text-xs font-bold text-[#1C1C1C]">
                [INTERACTIVE TILT STUDY // HOVER TO SHIFT PERSPECTIVE]
              </span>
              <span className="font-editorial text-sm text-[#57534E] italic">
                Notice how the expression changes as you move closer.
              </span>
            </div>
          )}

          {artwork.interactiveType === 'audio' && (
            <div className="flex flex-col items-center gap-3 w-full max-w-sm text-center">
              <div className="flex items-center gap-1.5 h-10 w-full justify-center">
                {[40, 70, 30, 90, 50, 80, 45, 95, 60, 35, 85, 55].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: isPlayingAudio ? `${h}%` : '25%' }}
                    className="w-1.5 bg-[#8D7135] rounded-full transition-all duration-150"
                  />
                ))}
              </div>
              <button
                onClick={handleAudioPlay}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B89A57] hover:bg-[#8D7135] text-[#F7F5F1] text-xs font-mono-spec font-bold tracking-wider transition-all cursor-pointer shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? "PLAYING MEMORY..." : "TRANSCRIBE MEMORY AUDIO"}</span>
              </button>
            </div>
          )}

          {artwork.interactiveType === 'redacted' && (
            <div className="w-full space-y-3 text-center">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#B89A57]/30 font-mono-spec text-xs">
                {isRedactedUnlocked ? (
                  <span className="text-[#8D7135] font-semibold leading-relaxed">
                    ACCESS GRANTED: "The moment at 2 AM where a single sentence made both of us laugh until our stomachs hurt. Strictly between us."
                  </span>
                ) : (
                  <span className="text-[#8D857B] tracking-widest font-bold">
                    ██████████████ [SECURITY LEVEL 2 REQUIRED] ██████████████
                  </span>
                )}
              </div>
              <button
                onClick={handleUnlock}
                className="flex items-center gap-2 mx-auto px-4 py-1.5 rounded-full bg-[#B89A57]/20 hover:bg-[#B89A57]/30 text-xs font-mono-spec text-[#8D7135] font-bold transition-all border border-[#B89A57]/40 cursor-pointer"
              >
                {isRedactedUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{isRedactedUnlocked ? "LOCK FILE" : "OVERRIDE CLEARANCE"}</span>
              </button>
            </div>
          )}

          {(!artwork.interactiveType || artwork.interactiveType === 'inspect' || artwork.interactiveType === 'diagram') && (
            <div className="flex flex-col items-center gap-2 text-center text-[#57534E]">
              <Search className="w-5 h-5 text-[#8D7135]" />
              <span className="font-mono-spec text-xs font-bold tracking-wider text-[#1C1C1C]">
                GALLERY ARTIFACT SPECIFICATION
              </span>
              <span className="text-xs text-[#8D857B] font-light max-w-sm">
                Curator verified permanent artifact. Under conservation protocols.
              </span>
            </div>
          )}
        </div>

        {/* Museum Placard Details Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FFFFFF] border border-[#B89A57]/30 text-xs font-mono-spec">
          <div>
            <span className="text-[#8D857B] block text-[10px]">MEDIUM</span>
            <span className="text-[#1C1C1C] font-semibold">{artwork.medium}</span>
          </div>
          <div>
            <span className="text-[#8D857B] block text-[10px]">YEAR</span>
            <span className="text-[#1C1C1C] font-semibold">{artwork.year}</span>
          </div>
          <div>
            <span className="text-[#8D857B] block text-[10px]">SUBJECT</span>
            <span className="text-[#1C1C1C] font-semibold">{MUSEUM_CONFIG.subject.name}</span>
          </div>
          <div>
            <span className="text-[#8D857B] block text-[10px]">CURATOR</span>
            <span className="text-[#8D7135] font-semibold">{MUSEUM_CONFIG.subject.curator}</span>
          </div>
        </div>

        {/* Curatorial Notes */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono-spec text-[#8D7135] tracking-widest uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATORIAL ANALYSIS</span>
          </div>
          <p className="text-sm sm:text-base text-[#1C1C1C] leading-relaxed font-light">
            {artwork.curatorNotes}
          </p>
          {artwork.extendedAnalysis && (
            <p className="text-xs sm:text-sm text-[#57534E] italic pt-2 border-t border-[#B89A57]/20 font-editorial">
              "{artwork.extendedAnalysis}"
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
