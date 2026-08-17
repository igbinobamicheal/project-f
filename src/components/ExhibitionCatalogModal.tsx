import React, { useState } from 'react';
import { X, BookOpen, Printer, Award, Sparkles } from 'lucide-react';
import { MUSEUM_CONFIG } from '../data/museumContent';
import { soundEngine } from '../utils/soundEngine';

interface ExhibitionCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExhibitionCatalogModal: React.FC<ExhibitionCatalogModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'monograph' | 'plates' | 'letter'>('monograph');

  if (!isOpen) return null;

  const handlePrint = () => {
    soundEngine.playChime(720);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0D0D0D]/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="catalog-modal-container relative w-full max-w-4xl max-h-[94vh] bg-[#FAF8F5] text-[#1C1C1C] border border-[#B89A57]/40 rounded-3xl p-6 sm:p-10 shadow-[0_35px_90px_rgba(0,0,0,0.85)] overflow-y-auto flex flex-col gap-8">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#B89A57]/30 pb-4 sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md z-30 pt-1 gap-3">
          <div className="flex items-center gap-2 text-[#8D7135] font-mono-spec text-xs tracking-[0.25em] uppercase font-bold">
            <BookOpen className="w-4 h-4" />
            <span>COMMEMORATIVE EXHIBITION MONOGRAPH</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Tab Switcher */}
            <div className="flex items-center gap-1 bg-[#EFE8DC] p-1 rounded-xl border border-[#B89A57]/30 text-xs font-mono-spec">
              <button
                onClick={() => {
                  soundEngine.playChime(560);
                  setActiveTab('monograph');
                }}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'monograph' ? 'bg-[#FFFFFF] text-[#1C1C1C] font-bold shadow-xs' : 'text-[#57534E]'
                }`}
              >
                OVERVIEW
              </button>
              <button
                onClick={() => {
                  soundEngine.playChime(600);
                  setActiveTab('plates');
                }}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'plates' ? 'bg-[#FFFFFF] text-[#1C1C1C] font-bold shadow-xs' : 'text-[#57534E]'
                }`}
              >
                PLATES
              </button>
              <button
                onClick={() => {
                  soundEngine.playChime(640);
                  setActiveTab('letter');
                }}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'letter' ? 'bg-[#FFFFFF] text-[#1C1C1C] font-bold shadow-xs' : 'text-[#57534E]'
                }`}
              >
                THE LETTER
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B89A57] hover:bg-[#8D7135] text-[#FAF8F5] text-xs font-mono-spec font-bold tracking-wider transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
              title="Save as PDF or Print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SAVE PDF</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playChime(480);
                onClose();
              }}
              className="p-2 rounded-xl bg-[#EFE8DC] hover:bg-[#D8C9AA] text-[#1C1C1C] border border-[#B89A57]/30 transition-colors cursor-pointer"
              aria-label="Close Catalog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPREAD 01: COVER & MONOGRAPH */}
        {/* ========================================================================= */}
        <div className={`${activeTab !== 'monograph' ? 'hidden print:block' : 'block'} space-y-8 catalog-page-break`}>
          {/* Monograph Cover */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#EFE8DC] border border-[#B89A57]/40 text-center flex flex-col items-center gap-6 relative overflow-hidden shadow-sm">
            <div className="w-12 h-12 rounded-full border border-[#B89A57]/50 flex items-center justify-center bg-[#FAF8F5] text-[#8D7135] shadow-xs">
              <Award className="w-6 h-6" />
            </div>

            <span className="font-mono-spec text-xs tracking-[0.35em] text-[#8D7135] uppercase font-bold">
              PRIVATE EXHIBITION MONOGRAPH // EST. {MUSEUM_CONFIG.subject.estYear}
            </span>

            <h1 className="font-display text-4xl sm:text-6xl font-black tracking-wider text-[#1C1C1C] leading-tight">
              THE MUSEUM<br />OF HER
            </h1>

            <div className="w-20 h-0.5 bg-[#B89A57]" />

            <p className="font-editorial text-lg sm:text-xl text-[#57534E] italic max-w-lg leading-relaxed">
              "A curated contemporary exhibition celebrating the intellect, wit, warmth, and unmistakable presence of one extraordinary woman."
            </p>

            {/* Cover Plate Portrait Image */}
            <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-xl border border-[#B89A57]/40 overflow-hidden shadow-lg my-2">
              <img
                src="/photos/final_portrait.webp"
                alt="The Museum of Her Cover"
                className="w-full h-full object-cover filter contrast-[1.03]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#B89A57]/30 w-full max-w-lg text-xs font-mono-spec">
              <div>
                <span className="text-[#8D857B] block text-[10px] uppercase">SUBJECT</span>
                <span className="text-[#1C1C1C] font-bold">{MUSEUM_CONFIG.subject.name}</span>
              </div>
              <div>
                <span className="text-[#8D857B] block text-[10px] uppercase">CURATOR</span>
                <span className="text-[#8D7135] font-bold">{MUSEUM_CONFIG.subject.curator}</span>
              </div>
              <div>
                <span className="text-[#8D857B] block text-[10px] uppercase">EDITION</span>
                <span className="text-[#1C1C1C] font-bold">NO. {MUSEUM_CONFIG.subject.exhibitionNumber}</span>
              </div>
              <div>
                <span className="text-[#8D857B] block text-[10px] uppercase">STATUS</span>
                <span className="text-[#1C1C1C] font-bold">{MUSEUM_CONFIG.subject.status}</span>
              </div>
            </div>
          </div>

          {/* Curatorial Statement Spread */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#B89A57]/30 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono-spec text-[#8D7135] tracking-widest uppercase font-bold">
              <Sparkles className="w-4 h-4" />
              <span>CURATORIAL STATEMENT</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-[#1C1C1C]">
              Why This Museum Was Built
            </h2>
            <p className="font-editorial text-xl sm:text-2xl text-[#1C1C1C] italic leading-relaxed">
              "{MUSEUM_CONFIG.curatorWelcome}"
            </p>
            <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
              Most people go through life measuring themselves against what they haven't finished, the mistakes they've made, or the doubts they carry in quiet moments. This museum was built to invert that lens. To create an architectural space where the everyday brilliance, intellect, wit, and tenderness of one person can be witnessed with the reverence they deserve.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPREAD 02: GALLERY PLATES */}
        {/* ========================================================================= */}
        <div className={`${activeTab !== 'plates' ? 'hidden print:block' : 'block'} space-y-8 catalog-page-break`}>
          <div className="border-b border-[#B89A57]/30 pb-3 flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold tracking-wider text-[#1C1C1C]">
              EXHIBITION PLATES & MONOGRAPHS
            </h3>
            <span className="font-mono-spec text-xs text-[#8D7135] font-bold">GALLERY 01 — 05</span>
          </div>

          {/* Plate 01: Her Mind */}
          <div className="catalog-plate-frame p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#B89A57]/35 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-4 aspect-[3/4] rounded-xl overflow-hidden border border-[#B89A57]/40">
              <img
                src={MUSEUM_CONFIG.galleryMind.image}
                alt="Plate 01 - Her Mind"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-8 space-y-3">
              <span className="font-mono-spec text-xs text-[#8D7135] font-bold uppercase tracking-widest block">
                PLATE 01 // OBJECT 001
              </span>
              <h4 className="font-display text-2xl font-bold text-[#1C1C1C]">
                HER MIND
              </h4>
              <p className="font-editorial text-lg italic text-[#1C1C1C]">
                "{MUSEUM_CONFIG.galleryMind.headline}"
              </p>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-light">
                {MUSEUM_CONFIG.galleryMind.editorialText}
              </p>
            </div>
          </div>

          {/* Plate 02: Her Spirit */}
          <div className="catalog-plate-frame p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#B89A57]/35 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-4 aspect-[3/4] rounded-xl overflow-hidden border border-[#B89A57]/40">
              <img
                src={MUSEUM_CONFIG.gallerySpirit.image}
                alt="Plate 02 - Her Spirit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-8 space-y-3">
              <span className="font-mono-spec text-xs text-[#8D7135] font-bold uppercase tracking-widest block">
                PLATE 02 // OBJECT 014
              </span>
              <h4 className="font-display text-2xl font-bold text-[#1C1C1C]">
                HER SPIRIT: KIND. STRONG. RARE.
              </h4>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-light">
                {MUSEUM_CONFIG.gallerySpirit.editorialText}
              </p>
            </div>
          </div>

          {/* Plate 03: The Funny One */}
          <div className="catalog-plate-frame p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#B89A57]/35 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-4 aspect-[3/4] rounded-xl overflow-hidden border border-[#B89A57]/40">
              <img
                src={MUSEUM_CONFIG.galleryFunny.image}
                alt="Plate 03 - The Funny One"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-8 space-y-3">
              <span className="font-mono-spec text-xs text-[#8D7135] font-bold uppercase tracking-widest block">
                PLATE 03 // OBJECT 023
              </span>
              <h4 className="font-display text-2xl font-bold text-[#1C1C1C]">
                THE FUNNY ONE
              </h4>
              <p className="font-editorial text-lg italic text-[#1C1C1C]">
                "{MUSEUM_CONFIG.galleryFunny.heroTitle}"
              </p>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-light">
                {MUSEUM_CONFIG.galleryFunny.editorialText}
              </p>
            </div>
          </div>

          {/* Plate 04: The Woman She Is */}
          <div className="catalog-plate-frame p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#B89A57]/35 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-4 aspect-[3/4] rounded-xl overflow-hidden border border-[#B89A57]/40">
              <img
                src={MUSEUM_CONFIG.galleryWoman.image}
                alt="Plate 04 - The Woman She Is"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-8 space-y-3">
              <span className="font-mono-spec text-xs text-[#8D7135] font-bold uppercase tracking-widest block">
                PLATE 04 // OBJECT 060
              </span>
              <h4 className="font-display text-2xl font-bold text-[#1C1C1C]">
                THE WOMAN SHE IS
              </h4>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-light">
                {MUSEUM_CONFIG.galleryWoman.editorialText}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPREAD 03: THE LETTER & EPILOGUE */}
        {/* ========================================================================= */}
        <div className={`${activeTab !== 'letter' ? 'hidden print:block' : 'block'} space-y-8 catalog-page-break`}>
          {/* The Curatorial Letter Spread */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#EFE8DC] border border-[#B89A57]/45 space-y-6 shadow-sm">
            <span className="font-mono-spec text-xs text-[#8D7135] tracking-[0.25em] uppercase font-bold block">
              PERMANENT DEDICATION // PRIVATE SALON
            </span>
            
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1C1C]">
              {MUSEUM_CONFIG.curatorLetter.heading}
            </h3>

            <div className="w-16 h-0.5 bg-[#B89A57]" />

            <div className="space-y-4 font-editorial text-lg sm:text-xl text-[#1C1C1C] leading-relaxed pt-2">
              <p className="font-semibold text-2xl">{MUSEUM_CONFIG.curatorLetter.recipient}</p>
              {MUSEUM_CONFIG.curatorLetter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="pt-6 border-t border-[#B89A57]/30">
                <p className="italic text-[#57534E] text-base">{MUSEUM_CONFIG.curatorLetter.signoff}</p>
                <p className="font-display font-bold text-2xl text-[#8D7135]">{MUSEUM_CONFIG.curatorLetter.curatorName}</p>
                <p className="font-mono-spec text-xs text-[#8D857B]">{MUSEUM_CONFIG.curatorLetter.date}</p>
              </div>
            </div>
          </div>

          {/* Epilogue Back Cover */}
          <div className="p-8 rounded-3xl bg-[#1C1C1C] text-[#FAF8F5] text-center space-y-3 shadow-xl">
            <span className="font-mono-spec text-[10px] tracking-[0.3em] text-[#B89A57] uppercase">
              EPILOGUE INSCRIPTION
            </span>
            <p className="font-display text-2xl sm:text-3xl font-bold tracking-wider">
              HAPPY BIRTHDAY, {MUSEUM_CONFIG.subject.name}.
            </p>
            <p className="font-editorial italic text-[#D8C9AA] text-lg sm:text-xl">
              "Some exhibitions are temporary. Some people are permanent."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
