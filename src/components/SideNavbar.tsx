import React from 'react';
import { ScreenView, Language } from '../types';
import { translations } from '../data/translations';

interface SideNavbarProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView) => void;
  language: Language;
  activeFlowStep?: string;
  onSelectStep?: (step: string) => void;
}

export const SideNavbar: React.FC<SideNavbarProps> = ({
  currentScreen,
  onNavigate,
  language,
  activeFlowStep = 'assess',
  onSelectStep
}) => {
  const t = translations[language].flow;

  const steps = [
    { id: 'discover', label: t.discover, icon: 'search', screenTarget: 'connect' },
    { id: 'assess', label: t.assess, icon: 'analytics', screenTarget: 'assess' },
    { id: 'prioritize', label: t.prioritize, icon: 'priority_high', screenTarget: 'scorecard' },
    { id: 'pilot', label: t.pilot, icon: 'rocket_launch', screenTarget: 'scorecard' },
    { id: 'scale', label: t.scale, icon: 'straighten', screenTarget: 'scorecard' }
  ];

  return (
    <aside
      id="side-navbar"
      className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-64 py-6 bg-[#1b2029] border-r border-white/10 z-40"
    >
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-[#00dce5] mb-1">
          {t.heading}
        </h2>
        <p className="font-mono text-xs text-[#e9c083] uppercase tracking-widest font-semibold">
          {t.phase}
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-1.5 px-3">
        {steps.map((step) => {
          const isAssessActive = (currentScreen === 'assess' && step.id === 'assess') ||
            (currentScreen === 'scorecard' && (step.id === 'prioritize' || step.id === 'pilot')) ||
            (currentScreen === 'connect' && step.id === 'discover') ||
            (activeFlowStep === step.id);

          const isCurrentAssessScreen = currentScreen === 'assess' && step.id === 'assess';

          return (
            <button
              key={step.id}
              id={`side-nav-${step.id}`}
              onClick={() => {
                if (onSelectStep) onSelectStep(step.id);
                if (step.id === 'discover') onNavigate('connect');
                else if (step.id === 'assess') onNavigate('assess');
                else if (step.id === 'prioritize' || step.id === 'pilot' || step.id === 'scale') {
                  onNavigate('scorecard');
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all text-left ${
                isCurrentAssessScreen
                  ? 'text-[#00f5ff] font-bold border-r-4 border-[#00f5ff] bg-[#00f5ff]/10 translate-x-1'
                  : isAssessActive
                  ? 'text-[#e9feff] bg-white/5 hover:bg-white/10'
                  : 'text-[#b9caca] opacity-70 hover:opacity-100 hover:bg-[#31353f] hover:text-[#e9feff]'
              }`}
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: isCurrentAssessScreen ? "'FILL' 1" : "'FILL' 0" }}
              >
                {step.icon}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider">
                {step.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* View Scorecard quick action button */}
      <div className="p-6 mt-auto border-t border-white/10">
        <button
          id="side-nav-view-scorecard-btn"
          onClick={() => onNavigate('scorecard')}
          className={`w-full border py-2.5 px-3 rounded font-mono text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
            currentScreen === 'scorecard'
              ? 'bg-[#00f5ff] text-[#003739] border-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.3)]'
              : 'border-[#00f5ff] text-[#00f5ff] hover:bg-[#00f5ff]/10'
          }`}
        >
          <span className="material-symbols-outlined text-sm">score</span>
          {t.viewScorecard}
        </button>
      </div>
    </aside>
  );
};
