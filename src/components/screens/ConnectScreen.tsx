import React from 'react';
import { ScreenView, Language } from '../../types';
import { translations } from '../../data/translations';

interface ConnectScreenProps {
  onNavigate: (screen: ScreenView) => void;
  language: Language;
  onOpenChatbot: () => void;
  onOpenAtlas: () => void;
  onOpenSentinel: () => void;
  onOpenSamplePlan: () => void;
}

export const ConnectScreen: React.FC<ConnectScreenProps> = ({
  onNavigate,
  language,
  onOpenChatbot,
  onOpenAtlas,
  onOpenSentinel,
  onOpenSamplePlan
}) => {
  const t = translations[language];

  return (
    <div id="connect-screen" className="w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-28 relative pt-12">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00f5ff]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-[#dfe2f0] mb-6 max-w-4xl tracking-tight leading-[1.1]">
          {t.hero.title}
        </h1>

        <p className="text-base md:text-lg text-[#b9caca] max-w-2xl mb-10 leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            id="hero-book-assessment-btn"
            onClick={() => onNavigate('assess')}
            className="bg-[#00f5ff] text-[#003739] font-semibold text-base py-3.5 px-8 rounded-full shadow-[0_0_18px_rgba(0,245,255,0.3)] hover:shadow-[0_0_28px_rgba(0,245,255,0.55)] hover:bg-[#63f7ff] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.hero.ctaPrimary}
          </button>

          <button
            id="hero-chatbot-btn"
            onClick={onOpenChatbot}
            className="bg-[#FFFDD0] text-[#432c00] font-semibold text-base py-3.5 px-8 rounded-full border border-[#e9c083] hover:bg-[#ffdeae] shadow-sm transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            {t.hero.ctaChatbot}
          </button>
        </div>

        <div className="mt-10 flex items-center gap-2 text-[#b9caca] font-mono text-xs tracking-wide">
          <span className="material-symbols-outlined fill-1 text-[#00dce5] text-base">
            verified_user
          </span>
          {t.hero.trustBadge}
        </div>
      </section>

      {/* What You Receive (Bento Grid) */}
      <section className="mb-28">
        <h2 className="text-2xl md:text-3xl font-bold text-[#dfe2f0] mb-8">
          {t.deliverables.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Deliverable 01 - Executive Summary */}
          <div className="col-span-1 md:col-span-8 bg-[#171c25] border border-white/10 rounded-xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-[#00f5ff]/40 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f5ff]/15 rounded-full blur-[70px] pointer-events-none" />
            <div>
              <div className="font-mono text-xs text-[#00dce5] mb-3 tracking-widest uppercase font-semibold">
                {t.deliverables.deliv1Tag}
              </div>
              <h3 className="text-xl font-semibold text-[#dfe2f0] mb-3">
                {t.deliverables.deliv1Title}
              </h3>
              <p className="text-sm text-[#b9caca] max-w-xl leading-relaxed">
                {t.deliverables.deliv1Desc}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#00dce5]">
              <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
              Human-Reviewed Synthesis
            </div>
          </div>

          {/* Deliverable 02 - Readiness Scorecard */}
          <div
            onClick={() => onNavigate('scorecard')}
            className="col-span-1 md:col-span-4 bg-[#171c25] border border-white/10 rounded-xl p-8 flex flex-col items-start justify-between cursor-pointer hover:border-[#00f5ff]/40 hover:bg-[#1b2029] transition-all group"
          >
            <div>
              <div className="font-mono text-xs text-[#e9c083] mb-3 tracking-widest uppercase font-semibold">
                {t.deliverables.deliv2Tag}
              </div>
              <h3 className="text-xl font-semibold text-[#dfe2f0] mb-2 group-hover:text-[#00f5ff] transition-colors">
                {t.deliverables.deliv2Title}
              </h3>
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-mono text-5xl font-bold text-[#00dce5] drop-shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                84
              </span>
              <span className="font-mono text-sm text-[#b9caca]">/100</span>
            </div>
          </div>

          {/* Deliverable 03 - Opportunities */}
          <div className="col-span-1 md:col-span-4 bg-[#171c25] border border-white/10 rounded-xl p-8">
            <div className="font-mono text-xs text-[#90cdff] mb-3 tracking-widest uppercase font-semibold">
              {t.deliverables.deliv3Tag}
            </div>
            <h3 className="text-xl font-semibold text-[#dfe2f0] mb-4">
              {t.deliverables.deliv3Title}
            </h3>
            <ul className="space-y-3 text-sm text-[#b9caca]">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#00dce5] text-base mt-0.5">
                  check_circle
                </span>
                <span>Automated Alarm Triage</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#00dce5] text-base mt-0.5">
                  check_circle
                </span>
                <span>Predictive Maintenance</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#00dce5] text-base mt-0.5">
                  check_circle
                </span>
                <span>Dynamic Resource Allocation</span>
              </li>
            </ul>
          </div>

          {/* Deliverable 04 - Risks */}
          <div className="col-span-1 md:col-span-4 bg-[#171c25] border border-white/10 rounded-xl p-8">
            <div className="font-mono text-xs text-[#ffb4ab] mb-3 tracking-widest uppercase font-semibold">
              {t.deliverables.deliv4Tag}
            </div>
            <h3 className="text-xl font-semibold text-[#dfe2f0] mb-4">
              {t.deliverables.deliv4Title}
            </h3>
            <ul className="space-y-3 text-sm text-[#b9caca]">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#ffb4ab] text-base mt-0.5">
                  warning
                </span>
                <span>Legacy Protocol Incompatibility</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#ffb4ab] text-base mt-0.5">
                  warning
                </span>
                <span>Data Silos in OSS/BSS</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#ffb4ab] text-base mt-0.5">
                  warning
                </span>
                <span>Security Compliance Gaps</span>
              </li>
            </ul>
          </div>

          {/* Recommended Engagement */}
          <div className="col-span-1 md:col-span-4 bg-[#171c25] border border-white/10 rounded-xl p-8 border-t-2 border-t-[#00f5ff] flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#00dce5] mb-3 tracking-widest uppercase font-semibold">
                {t.deliverables.nextStepsTag}
              </div>
              <h3 className="text-xl font-semibold text-[#dfe2f0] mb-3">
                {t.deliverables.nextStepsTitle}
              </h3>
              <p className="text-sm text-[#b9caca] mb-6 leading-relaxed">
                {t.deliverables.nextStepsDesc}
              </p>
            </div>
            <button
              id="view-sample-plan-btn"
              onClick={onOpenSamplePlan}
              className="text-[#00f5ff] font-mono text-xs uppercase tracking-wider hover:text-[#63f7ff] transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
            >
              {t.deliverables.viewSamplePlan}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Assessment Flow (Phase 1: Intake) */}
      <section className="mb-28">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#dfe2f0]">
            {t.flow.heading}
          </h2>
          <p className="font-mono text-xs text-[#b9caca] mt-2 tracking-widest uppercase font-medium">
            {t.flow.phase}
          </p>
        </div>

        {/* Desktop Stepper Visual */}
        <div className="relative max-w-5xl mx-auto hidden md:block">
          <div className="absolute top-6 left-12 right-12 h-[1px] bg-white/10 -z-10" />
          <div className="flex justify-between items-center">
            {/* Step 1 */}
            <div
              onClick={() => onNavigate('connect')}
              className="flex flex-col items-center gap-3 bg-[#0A0C14] px-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1b2029] border border-[#00f5ff] flex items-center justify-center text-[#00f5ff] shadow-[0_0_12px_rgba(0,245,255,0.25)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">search</span>
              </div>
              <span className="font-mono text-xs font-semibold text-[#dfe2f0]">
                {t.flow.discover}
              </span>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => onNavigate('assess')}
              className="flex flex-col items-center gap-3 bg-[#0A0C14] px-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1b2029] border border-[#00f5ff]/60 flex items-center justify-center text-[#00dce5] group-hover:border-[#00f5ff] group-hover:scale-110 transition-all">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <span className="font-mono text-xs font-semibold text-[#00dce5]">
                {t.flow.assess}
              </span>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => onNavigate('scorecard')}
              className="flex flex-col items-center gap-3 bg-[#0A0C14] px-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1b2029] border border-white/10 flex items-center justify-center text-[#b9caca] group-hover:border-[#e9c083] group-hover:text-[#e9c083] group-hover:scale-110 transition-all">
                <span className="material-symbols-outlined">priority_high</span>
              </div>
              <span className="font-mono text-xs text-[#b9caca] group-hover:text-[#e9c083]">
                {t.flow.prioritize}
              </span>
            </div>

            {/* Step 4 */}
            <div
              onClick={() => onNavigate('scorecard')}
              className="flex flex-col items-center gap-3 bg-[#0A0C14] px-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1b2029] border border-white/10 flex items-center justify-center text-[#b9caca] group-hover:border-[#90cdff] group-hover:text-[#90cdff] group-hover:scale-110 transition-all">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <span className="font-mono text-xs text-[#b9caca] group-hover:text-[#90cdff]">
                {t.flow.pilot}
              </span>
            </div>

            {/* Step 5 */}
            <div
              onClick={() => onNavigate('scorecard')}
              className="flex flex-col items-center gap-3 bg-[#0A0C14] px-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1b2029] border border-white/10 flex items-center justify-center text-[#b9caca] group-hover:border-white/40 group-hover:scale-110 transition-all">
                <span className="material-symbols-outlined">straighten</span>
              </div>
              <span className="font-mono text-xs text-[#b9caca]">
                {t.flow.scale}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Stepper */}
        <div className="md:hidden flex flex-col gap-4 pl-4 border-l border-white/10 ml-4">
          <div className="flex items-center gap-3 text-[#00f5ff]">
            <span className="material-symbols-outlined">search</span>
            <span className="font-mono text-xs font-bold">{t.flow.discover} (Active)</span>
          </div>
          <div onClick={() => onNavigate('assess')} className="flex items-center gap-3 text-[#b9caca]">
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-mono text-xs">{t.flow.assess}</span>
          </div>
          <div onClick={() => onNavigate('scorecard')} className="flex items-center gap-3 text-[#b9caca]">
            <span className="material-symbols-outlined">priority_high</span>
            <span className="font-mono text-xs">{t.flow.prioritize}</span>
          </div>
        </div>
      </section>

      {/* The Monkyfi Intelligence Layer (3 Product Cards) */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#dfe2f0] mb-8 text-center">
          {t.intelligence.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Monkyfi Connect */}
          <div className="bg-[#171c25] border border-[#00f5ff]/30 rounded-xl p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[#00f5ff]/5 pointer-events-none" />
            <div>
              <div className="font-mono text-xs text-[#00dce5] mb-2 uppercase tracking-widest font-semibold">
                {t.intelligence.connectTag}
              </div>
              <h3 className="text-xl font-semibold text-[#dfe2f0] mb-4">
                {t.intelligence.connectTitle}
              </h3>
              <p className="text-sm text-[#b9caca] mb-6 leading-relaxed">
                {t.intelligence.connectDesc}
              </p>
            </div>
            <button
              id="connect-current-context-btn"
              onClick={() => onNavigate('assess')}
              className="bg-[#00f5ff]/10 text-[#00dce5] border border-[#00f5ff]/50 font-mono text-xs py-2.5 px-4 rounded w-full font-bold uppercase tracking-wider hover:bg-[#00f5ff]/20 transition-all cursor-pointer"
            >
              {t.intelligence.currentContext}
            </button>
          </div>

          {/* Card 2: Monkyfi Atlas */}
          <div className="bg-[#171c25] border border-white/10 rounded-xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-[#e9c083]/40 transition-colors">
            <div className="absolute inset-0 bg-[#e9c083]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <div className="font-mono text-xs text-[#e9c083] mb-2 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                {t.intelligence.atlasTag}
              </div>
              <h3 className="text-xl font-semibold text-[#dfe2f0] mb-4">
                {t.intelligence.atlasTitle}
              </h3>
              <p className="text-sm text-[#b9caca] mb-6 leading-relaxed">
                {t.intelligence.atlasDesc}
              </p>
            </div>
            <button
              id="explore-atlas-btn"
              onClick={onOpenAtlas}
              className="bg-transparent text-[#b9caca] border border-white/10 font-mono text-xs py-2.5 px-4 rounded w-full group-hover:text-[#e9c083] group-hover:border-[#e9c083]/50 transition-colors cursor-pointer uppercase tracking-wider"
            >
              {t.intelligence.exploreAtlas}
            </button>
          </div>

          {/* Card 3: Monkyfi Sentinel */}
          <div className="bg-[#171c25] border border-white/10 rounded-xl p-8 flex flex-col justify-between group hover:border-[#90cdff]/40 transition-colors">
            <div>
              <div className="font-mono text-xs text-[#90cdff] mb-2 uppercase tracking-widest font-semibold">
                {t.intelligence.sentinelTag}
              </div>
              <h3 className="text-xl font-semibold text-[#dfe2f0] mb-4">
                {t.intelligence.sentinelTitle}
              </h3>
              <p className="text-sm text-[#b9caca] mb-6 leading-relaxed">
                {t.intelligence.sentinelDesc}
              </p>
            </div>
            <button
              id="explore-sentinel-btn"
              onClick={onOpenSentinel}
              className="bg-transparent text-[#b9caca] border border-white/10 font-mono text-xs py-2.5 px-4 rounded w-full hover:text-[#dfe2f0] hover:border-white/30 transition-colors cursor-pointer uppercase tracking-wider"
            >
              {t.intelligence.exploreSentinel}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
