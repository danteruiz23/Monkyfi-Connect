import React, { useState } from 'react';
import { ScorecardData, ScreenView } from '../../types';
import { CARLOS_AVATAR_URL } from '../../data/mockData';

interface ScorecardScreenProps {
  scorecardData: ScorecardData;
  onNavigate: (screen: ScreenView) => void;
  onInitiateAudit: () => void;
}

export const ScorecardScreen: React.FC<ScorecardScreenProps> = ({
  scorecardData,
  onNavigate,
  onInitiateAudit
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'opportunities' | 'risks'>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const {
    companyName,
    fitScore,
    readinessStatus,
    reviewerQuote,
    reviewerName,
    reviewerAvatar,
    scores,
    opportunities,
    risks,
    recommendedStep
  } = scorecardData;

  return (
    <div id="scorecard-screen" className="w-full max-w-[1440px] mx-auto space-y-8 pb-16">
      {/* Header / Executive Summary */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#dfe2f0] tracking-tight">
              AI Readiness Scorecard
            </h1>
            {companyName && (
              <span className="font-mono text-xs text-[#00f5ff] bg-[#00f5ff]/10 border border-[#00f5ff]/30 px-2.5 py-1 rounded">
                {companyName}
              </span>
            )}
          </div>
          <p className="text-base text-[#b9caca]">
            Comprehensive analysis of network infrastructure automation potential.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#262a34] px-4 py-2.5 rounded-lg border border-[#00f5ff] shadow-[0_0_12px_rgba(0,245,255,0.15)] shrink-0">
          <span className="material-symbols-outlined text-[#00f5ff]">check_circle</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#00f5ff] font-bold">
            {readinessStatus || 'READINESS: PILOT READY'}
          </span>
        </div>
      </div>

      {/* Human Note */}
      <div className="bg-[#121520] border border-[#e9c083]/30 rounded-xl p-6 flex flex-col sm:flex-row items-start gap-4 bg-[#171c25]/50 relative overflow-hidden group hover:border-[#e9c083]/60 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e9c083]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="w-14 h-14 rounded-full bg-[#5d4210] flex items-center justify-center shrink-0 border-2 border-[#e9c083]/70 overflow-hidden shadow-[0_0_10px_rgba(233,192,131,0.25)]">
          <img
            src={reviewerAvatar || CARLOS_AVATAR_URL}
            alt="Carlos Mendonza - Telecom Engineer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="font-mono text-xs text-[#e9c083] font-semibold tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">support_agent</span>
              ATLAS INTELLIGENCE DESK
            </div>
            <span className="text-xs font-mono text-[#849495]">{reviewerName || 'Carlos Mendonza'}</span>
          </div>
          <p className="text-base text-[#FFFDD0] leading-relaxed italic font-normal">
            {reviewerQuote}
          </p>
        </div>
      </div>

      {/* Scorecard Grid (Bento Dimensions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Strategy */}
        <div className="bg-[#121520] border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-[#00f5ff]/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f5ff]/10 rounded-bl-full opacity-50 pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-[#dfe2f0]">Strategy</h3>
            <span className="font-mono text-xl font-bold text-[#00f5ff]">
              {scores?.strategy?.toFixed(1) || '4.2'}
            </span>
          </div>
          <div className="w-full bg-[#0a0e17] h-2 rounded-full mb-4 overflow-hidden">
            <div
              className="bg-[#00f5ff] h-full rounded-full transition-all duration-1000"
              style={{ width: `${((scores?.strategy || 4.2) / 5) * 100}%` }}
            />
          </div>
          <p className="text-sm text-[#b9caca] leading-relaxed">
            Strong executive alignment, but lack of clear KPI definitions for early automation phases.
          </p>
        </div>

        {/* Data */}
        <div className="bg-[#121520] border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-[#e9c083]/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#e9c083]/10 rounded-bl-full opacity-50 pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-[#dfe2f0]">Data</h3>
            <span className="font-mono text-xl font-bold text-[#e9c083]">
              {scores?.data?.toFixed(1) || '2.8'}
            </span>
          </div>
          <div className="w-full bg-[#0a0e17] h-2 rounded-full mb-4 overflow-hidden">
            <div
              className="bg-[#e9c083] h-full rounded-full transition-all duration-1000"
              style={{ width: `${((scores?.data || 2.8) / 5) * 100}%` }}
            />
          </div>
          <p className="text-sm text-[#b9caca] leading-relaxed">
            Siloed systems. High priority needed on normalization before deploying predictive models.
          </p>
        </div>

        {/* Process */}
        <div className="bg-[#121520] border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-[#00f5ff]/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f5ff]/10 rounded-bl-full opacity-50 pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-[#dfe2f0]">Process</h3>
            <span className="font-mono text-xl font-bold text-[#00f5ff]">
              {scores?.process?.toFixed(1) || '3.9'}
            </span>
          </div>
          <div className="w-full bg-[#0a0e17] h-2 rounded-full mb-4 overflow-hidden">
            <div
              className="bg-[#00f5ff] h-full rounded-full transition-all duration-1000"
              style={{ width: `${((scores?.process || 3.9) / 5) * 100}%` }}
            />
          </div>
          <p className="text-sm text-[#b9caca] leading-relaxed">
            Manual interventions documented well. Ripe for robotic process automation in ticket triaging.
          </p>
        </div>

        {/* Tech */}
        <div className="bg-[#121520] border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-[#00f5ff]/50 transition-colors md:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f5ff]/10 rounded-bl-full opacity-50 pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-[#dfe2f0]">Tech</h3>
            <span className="font-mono text-xl font-bold text-[#00f5ff]">
              {scores?.tech?.toFixed(1) || '4.5'}
            </span>
          </div>
          <div className="w-full bg-[#0a0e17] h-2 rounded-full mb-4 overflow-hidden">
            <div
              className="bg-[#00f5ff] h-full rounded-full transition-all duration-1000"
              style={{ width: `${((scores?.tech || 4.5) / 5) * 100}%` }}
            />
          </div>
          <p className="text-sm text-[#b9caca] leading-relaxed">
            Modern cloud infrastructure in place. API endpoints available for Monkyfi Sentinel integration.
          </p>
        </div>

        {/* Governance */}
        <div className="bg-[#121520] border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-[#90cdff]/50 transition-colors md:col-span-2 lg:col-span-2">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#90cdff]/10 rounded-bl-full opacity-50 pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-[#dfe2f0]">Governance</h3>
            <span className="font-mono text-xl font-bold text-[#90cdff]">
              {scores?.governance?.toFixed(1) || '3.5'}
            </span>
          </div>
          <div className="w-full bg-[#0a0e17] h-2 rounded-full mb-4 overflow-hidden">
            <div
              className="bg-[#90cdff] h-full rounded-full transition-all duration-1000"
              style={{ width: `${((scores?.governance || 3.5) / 5) * 100}%` }}
            />
          </div>
          <p className="text-sm text-[#b9caca] leading-relaxed">
            Security protocols robust, but AI ethics framework needs development before scaling automated decision-making.
          </p>
        </div>
      </div>

      {/* Opps & Risks Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opportunities */}
        <div className="bg-[#121520] border border-white/10 p-6 rounded-xl">
          <div className="flex items-center space-x-2 mb-6 border-b border-white/10 pb-4">
            <span className="material-symbols-outlined text-[#00f5ff]">trending_up</span>
            <h3 className="text-lg font-semibold text-[#dfe2f0]">Top 3 Opportunities</h3>
          </div>
          <ul className="space-y-4">
            {opportunities.map((opp) => (
              <li
                key={opp.id}
                onClick={() => setSelectedItem(opp.title)}
                className="flex items-start space-x-3 group cursor-pointer p-2 rounded hover:bg-white/5 transition-all"
              >
                <span className="font-mono text-xs text-[#00f5ff] mt-1 bg-[#00f5ff]/10 px-2 py-1 rounded font-bold">
                  {opp.id}
                </span>
                <div>
                  <h4 className="text-sm md:text-base font-medium text-[#dfe2f0] group-hover:text-[#00f5ff] transition-colors">
                    {opp.title}
                  </h4>
                  <p className="text-sm text-[#b9caca] mt-0.5 leading-relaxed">{opp.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="bg-[#121520] border border-[#e9c083]/20 p-6 rounded-xl">
          <div className="flex items-center space-x-2 mb-6 border-b border-white/10 pb-4">
            <span className="material-symbols-outlined text-[#e9c083]">warning</span>
            <h3 className="text-lg font-semibold text-[#dfe2f0]">Top 3 Risks</h3>
          </div>
          <ul className="space-y-4">
            {risks.map((risk) => (
              <li
                key={risk.id}
                onClick={() => setSelectedItem(risk.title)}
                className="flex items-start space-x-3 group cursor-pointer p-2 rounded hover:bg-white/5 transition-all"
              >
                <span className="font-mono text-xs text-[#e9c083] mt-1 bg-[#e9c083]/10 px-2 py-1 rounded font-bold">
                  {risk.id}
                </span>
                <div>
                  <h4 className="text-sm md:text-base font-medium text-[#dfe2f0] group-hover:text-[#e9c083] transition-colors">
                    {risk.title}
                  </h4>
                  <p className="text-sm text-[#b9caca] mt-0.5 leading-relaxed">{risk.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Engagement */}
      <div className="bg-[#121520] p-8 rounded-xl flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#262a34] to-[#0f131d] border border-[#00f5ff]/30 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[#00f5ff]/10 pointer-events-none" />

        <div className="mb-6 md:mb-0 z-10">
          <div className="font-mono text-xs text-[#00f5ff] mb-2 uppercase tracking-widest font-semibold">
            Recommended Next Step
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#dfe2f0] mb-2">
            {recommendedStep.title}
          </h2>
          <p className="text-sm md:text-base text-[#b9caca] max-w-xl leading-relaxed">
            {recommendedStep.desc}
          </p>
        </div>

        <button
          id="initiate-audit-btn"
          onClick={onInitiateAudit}
          className="bg-[#00f5ff] text-[#003739] px-6 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,245,255,0.25)] hover:shadow-[0_0_30px_rgba(0,245,255,0.45)] hover:bg-[#63f7ff] transition-all z-10 whitespace-nowrap cursor-pointer transform hover:-translate-y-0.5"
        >
          Initiate Audit
        </button>
      </div>

      {/* Footer Return / Retake Actions */}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => onNavigate('assess')}
          className="text-xs font-mono text-[#b9caca] hover:text-[#00f5ff] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Edit Intake Form
        </button>
        <button
          onClick={() => onNavigate('review')}
          className="text-xs font-mono text-[#00f5ff] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          Open Reviewer Queue
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
