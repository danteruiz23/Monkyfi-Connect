import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onToggleLanguage,
  onOpenPrivacy,
  onOpenTerms,
  onOpenSupport
}) => {
  const t = translations[language].footer;

  return (
    <footer
      id="main-footer"
      className="w-full py-8 px-6 md:px-12 mt-auto flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0a0e17] border-t border-white/10 z-30"
    >
      <span className="font-mono text-xs text-[#e9c083] text-center md:text-left">
        {t.copyright}
      </span>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-[#b9caca]">
        <button
          id="footer-privacy-btn"
          onClick={onOpenPrivacy}
          className="hover:text-[#ffdeae] transition-colors cursor-pointer"
        >
          {t.privacy}
        </button>
        <button
          id="footer-terms-btn"
          onClick={onOpenTerms}
          className="hover:text-[#ffdeae] transition-colors cursor-pointer"
        >
          {t.terms}
        </button>
        <button
          id="footer-switcher-btn"
          onClick={onToggleLanguage}
          className="hover:text-[#00f5ff] text-[#00dce5] font-mono text-xs transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xs">translate</span>
          {t.switcher} ({language.toUpperCase()})
        </button>
        <button
          id="footer-support-btn"
          onClick={onOpenSupport}
          className="hover:text-[#ffdeae] transition-colors cursor-pointer"
        >
          {t.contact}
        </button>
      </div>
    </footer>
  );
};
