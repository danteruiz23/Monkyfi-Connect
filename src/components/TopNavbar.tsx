import React from 'react';
import { ScreenView, Language } from '../types';
import { translations } from '../data/translations';

interface TopNavbarProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView) => void;
  language: Language;
  onToggleLanguage: () => void;
  onOpenAtlas: () => void;
  onOpenSentinel: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentScreen,
  onNavigate,
  language,
  onToggleLanguage,
  onOpenAtlas,
  onOpenSentinel
}) => {
  const t = translations[language].nav;

  return (
    <nav
      id="top-navbar"
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-16 bg-[#0f131d]/90 backdrop-blur-md border-b border-white/10"
    >
      <div className="flex items-center gap-4">
        <button
          id="nav-brand-btn"
          onClick={() => onNavigate('connect')}
          className="flex items-center gap-2 text-left group transition-all"
        >
          <span className="material-symbols-outlined text-[#00dce5] text-2xl group-hover:rotate-12 transition-transform">
            cable
          </span>
          <span className="font-semibold text-xl tracking-tight text-[#e9feff]">
            Monkyfi Connect
          </span>
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <button
          id="nav-link-connect"
          onClick={() => onNavigate('connect')}
          className={`font-medium transition-all duration-200 ${
            currentScreen === 'connect'
              ? 'text-[#e9feff] font-bold border-b-2 border-[#00f5ff] pb-1'
              : 'text-[#b9caca] hover:text-[#00dce5]'
          }`}
        >
          {t.connect}
        </button>

        <button
          id="nav-link-atlas"
          onClick={onOpenAtlas}
          className="text-[#b9caca] font-medium hover:text-[#e9c083] flex items-center gap-1.5 transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-sm text-[#e9c083]">auto_awesome</span>
          {t.atlas}
        </button>

        <button
          id="nav-link-sentinel"
          onClick={onOpenSentinel}
          className="text-[#b9caca] font-medium hover:text-[#90cdff] flex items-center gap-1.5 transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-sm text-[#90cdff]">shield</span>
          {t.sentinel}
        </button>

        <button
          id="nav-link-review"
          onClick={() => onNavigate('review')}
          className={`font-medium transition-all duration-200 ${
            currentScreen === 'review'
              ? 'text-[#e9feff] font-bold border-b-2 border-[#00f5ff] pb-1'
              : 'text-[#b9caca] hover:text-[#00dce5]'
          }`}
        >
          {t.review}
        </button>

        {currentScreen === 'scorecard' && (
          <button
            id="nav-link-scorecard-active"
            onClick={() => onNavigate('scorecard')}
            className="text-[#e9feff] font-bold border-b-2 border-[#00f5ff] pb-1 text-sm uppercase tracking-wider"
          >
            Scorecard
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          id="lang-toggle-btn"
          onClick={onToggleLanguage}
          title="Switch Language (EN/ES)"
          className="px-2.5 py-1 text-xs font-mono rounded border border-white/10 text-[#b9caca] hover:text-white hover:border-white/20 transition-all"
        >
          {language.toUpperCase()}
        </button>

        <button
          id="book-assessment-header-btn"
          onClick={() => onNavigate('assess')}
          className="bg-[#00f5ff] text-[#003739] font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-[0_0_12px_rgba(0,245,255,0.25)] hover:shadow-[0_0_20px_rgba(0,245,255,0.45)] hover:bg-[#63f7ff] transition-all cursor-pointer"
        >
          {t.bookAssessment}
        </button>
      </div>
    </nav>
  );
};
