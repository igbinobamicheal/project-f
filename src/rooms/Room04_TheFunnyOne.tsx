import React, { useState } from 'react';
import { Smile, ArrowRight, Volume2, Move, Lock, Unlock } from 'lucide-react';
import { MuseumFrame } from '../components/MuseumFrame';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface Room04TheFunnyOneProps {
  onNext: () => void;
  onInspectArtwork?: (item: any) => void;
}

export const Room04_TheFunnyOne: React.FC<Room04TheFunnyOneProps> = ({ onNext, onInspectArtwork }) => {
  const { galleryFunny } = MUSEUM_CONFIG;
  const [activeObservationIndex, setActiveObservationIndex] = useState(0);
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);

  const activeObs = galleryFunny.observations[activeObservationIndex];

  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F5] text-[#1C1C1C] py-16 px-6 sm:px-12 md:px-20 overflow-hidden flex flex-col justify-between">
      
      {/* Halogen Gallery Spotlight */}
      <div className="absolute top-0 right-1/3 w-full max-w-5xl h-80 bg-radial-gradient from-[#D8C9AA]/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6 w-full my-auto">
        
        {/* Top Wing Signage */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#B89A57]/30 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-spec text-[10px] text-[#8D7135] tracking-[0.25em] uppercase font-bold mb-1">
              <Smile className="w-3.5 h-3.5" />
              <span>NORTH WING // GALLERY 03</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-[#1C1C1C]">
              THE FUNNY ONE
            </h1>
          </div>

          <div className="font-mono-spec text-xs text-[#8D857B] font-light text-left sm:text-right">
            OBJECT 023 // COMEDIC TIMING & UNFILTERED WIT
          </div>
        </div>

        {/* Large Title */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-4xl font-black tracking-wider text-[#1C1C1C] leading-tight">
            {galleryFunny.heroTitle}
          </h2>
        </div>

        {/* Main Exhibit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
          
          {/* Left Column (5 Cols): Candid Frame with Tilt */}
          <div className="lg:col-span-5 space-y-3">
            <div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
                setTiltAngle({ x, y });
              }}
              onMouseLeave={() => setTiltAngle({ x: 0, y: 0 })}
              style={{
                transform: `perspective(600px) rotateX(${tiltAngle.y}deg) rotateY(${tiltAngle.x}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <MuseumFrame
                imageSrc={activeObs.image || galleryFunny.image}
                altText="The Funny One - Candid Portrait"
                aspectRatio="portrait"
                objectCode={activeObs.code}
                title={activeObs.title}
                className="w-full max-w-xs mx-auto"
                onClick={() => {
                  soundEngine.playChime(640);
                  if (onInspectArtwork) {
                    onInspectArtwork({
                      objectNumber: activeObs.code,
                      title: activeObs.title,
                      subtitle: activeObs.spec,
                      medium: "Mixed media / candid",
                      year: "2026",
                      image: activeObs.image || galleryFunny.image,
                      curatorNotes: activeObs.body
                    });
                  }
                }}
              />
            </div>

            <div className="text-center font-mono-spec text-[10px] text-[#8D7135] flex items-center justify-center gap-1.5">
              <Move className="w-3 h-3" />
              <span>HOVER TO TILT ARTIFACT</span>
            </div>
          </div>

          {/* Right Column (7 Cols): 3 Streamlined Observations & Interactive Triggers */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {galleryFunny.observations.slice(0, 3).map((obs, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundEngine.playChime(560 + idx * 40);
                    setActiveObservationIndex(idx);
                  }}
                  className={`p-3 rounded-xl text-left transition-all duration-300 border cursor-pointer flex flex-col justify-between min-h-[110px] ${
                    activeObservationIndex === idx
                      ? 'bg-[#FFFFFF] border-[#8D7135] shadow-xs'
                      : 'bg-[#EFE8DC]/70 border-[#B89A57]/20 hover:border-[#B89A57]'
                  }`}
                >
                  <span className="font-mono-spec text-[9px] text-[#8D7135] font-bold">
                    {obs.code}
                  </span>
                  <h4 className="font-display text-xs font-bold text-[#1C1C1C]">
                    {obs.title}
                  </h4>
                  <span className="font-mono-spec text-[9px] text-[#8D857B]">
                    {obs.spec}
                  </span>
                </button>
              ))}
            </div>

            {/* Revealed Active Observation */}
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#B89A57]/30 shadow-xs space-y-2">
              <div className="flex items-center justify-between border-b border-[#B89A57]/20 pb-1.5">
                <span className="font-mono-spec text-xs font-bold text-[#8D7135]">
                  {activeObs.code} // {activeObs.title}
                </span>
                <span className="font-mono-spec text-[10px] text-[#8D857B]">
                  CURATOR VERIFIED
                </span>
              </div>

              <p className="font-editorial text-base sm:text-lg text-[#1C1C1C] italic">
                "{activeObs.body}"
              </p>

              {/* Redacted Joke Button */}
              {activeObs.interactiveType === 'redacted' && (
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-mono-spec text-xs text-[#57534E]">
                    {isSecretUnlocked ? "DECRYPTED" : "LEVEL 2 REQUIRED"}
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playChime(780);
                      setIsSecretUnlocked(!isSecretUnlocked);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B89A57]/20 hover:bg-[#B89A57]/30 text-xs font-mono-spec text-[#8D7135] font-bold cursor-pointer transition-colors"
                  >
                    {isSecretUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    <span>{isSecretUnlocked ? "LOCK" : "DECRYPT"}</span>
                  </button>
                </div>
              )}

              {/* Audio Waveform Trigger */}
              {activeObs.interactiveType === 'audio' && (
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-mono-spec text-xs text-[#57534E]">
                    {isPlayingAudio ? "PLAYING..." : "AUDIO MEMORY"}
                  </span>
                  <button
                    onClick={() => {
                      setIsPlayingAudio(true);
                      soundEngine.playEtherealChord();
                      setTimeout(() => {
                        soundEngine.playChime(660);
                        setIsPlayingAudio(false);
                      }, 2000);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B89A57]/20 hover:bg-[#B89A57]/30 text-xs font-mono-spec text-[#8D7135] font-bold cursor-pointer transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{isPlayingAudio ? "REPLAYING..." : "PLAY"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Note & Next Walk */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <p className="font-editorial text-xs italic text-[#57534E] flex-1">
                "{galleryFunny.shortLetter}"
              </p>

              <button
                onClick={() => {
                  soundEngine.playFootstep();
                  onNext();
                }}
                className="px-6 py-3.5 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] font-display text-xs tracking-widest font-bold shadow-xs transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 shrink-0 cursor-pointer w-full sm:w-auto justify-center"
              >
                <span>ENTER LIVING ARCHIVE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Inscription */}
      <div className="relative z-10 border-t border-[#B89A57]/30 pt-4 flex items-center justify-between text-[#8D857B] text-xs font-mono-spec max-w-5xl mx-auto w-full">
        <span>GALLERY 03 // OBJECT 023 — THE COMEDIAN</span>
        <span className="text-[#8D7135] font-semibold text-[11px]">NEXT: THE LIVING ARCHIVE</span>
      </div>

    </div>
  );
};
