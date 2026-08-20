import React, { useState } from 'react';
import { ScreenView, IntakeFormData, ScorecardData, ReviewSubmission } from '../../types';
import { NETWORK_TOPOLOGY_IMAGE_URL } from '../../data/mockData';

interface AssessScreenProps {
  formData: IntakeFormData;
  setFormData: React.Dispatch<React.SetStateAction<IntakeFormData>>;
  onSubmitAssessment: (data: IntakeFormData) => void;
  onNavigate: (screen: ScreenView) => void;
}

export const AssessScreen: React.FC<AssessScreenProps> = ({
  formData,
  setFormData,
  onSubmitAssessment,
  onNavigate
}) => {
  const [piiDetected, setPiiDetected] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  const painPointOptions = [
    'Faster incident resolution',
    'Less manual service delivery',
    'Predictive maintenance',
    'Legacy system integration'
  ];

  const maturityLevels: Array<'Exploring' | 'Experimenting' | 'Piloting' | 'Scaling'> = [
    'Exploring',
    'Experimenting',
    'Piloting',
    'Scaling'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time PII pattern check (e.g. emails in freeform text, credit cards, or internal keys)
    if (name === 'constraints' || name === 'outcomeGoal') {
      const piiRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:password|secret|apikey|token)[:=]/i;
      setPiiDetected(piiRegex.test(value));
    }
  };

  const handleTogglePainPoint = (point: string) => {
    setFormData((prev) => {
      const exists = prev.painPoints.includes(point);
      return {
        ...prev,
        painPoints: exists
          ? prev.painPoints.filter((p) => p !== point)
          : [...prev.painPoints, point]
      };
    });
  };

  const handleMaturitySelect = (level: 'Exploring' | 'Experimenting' | 'Piloting' | 'Scaling') => {
    setFormData((prev) => ({ ...prev, aiMaturity: level }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim()) {
      setValidationError('Please enter your Company Name to generate the scorecard.');
      return;
    }
    setValidationError(null);
    onSubmitAssessment(formData);
  };

  const handleLoadSample = () => {
    setFormData({
      companyName: 'TechFlow Inc.',
      workEmail: 'admin@techflow.internal',
      operationType: 'Network Operations',
      networkSize: '4500',
      painPoints: ['Faster incident resolution', 'Predictive maintenance', 'Legacy system integration'],
      outcomeGoal: 'Automate Level-1 NOC ticket resolution and triage multi-vendor telemetry with lower latency.',
      aiMaturity: 'Piloting',
      constraints: 'Restricted cross-regional database syncing and legacy BSS/OSS protocol translation.'
    });
  };

  return (
    <div id="assess-screen" className="w-full max-w-[1440px] mx-auto pb-16">
      {/* Warning Banner */}
      <div className="bg-[#93000a]/20 border border-[#ffb4ab]/50 rounded-lg p-4 mb-8 flex items-start gap-4">
        <span className="material-symbols-outlined text-[#ffb4ab] text-2xl mt-0.5 shrink-0">
          warning
        </span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-[#ffb4ab] mb-1">
              Sensitive Data Warning
            </h3>
            <button
              onClick={handleLoadSample}
              className="text-xs font-mono text-[#00f5ff] hover:underline underline-offset-2"
            >
              Fill Sample Data
            </button>
          </div>
          <p className="text-sm text-[#ffdad6] leading-relaxed">
            Do not include CPNI, customer PII, or network secrets in this intake form.
          </p>
        </div>
      </div>

      {validationError && (
        <div className="bg-[#ffb4ab]/10 border border-[#ffb4ab] text-[#ffdad6] text-sm p-3 rounded-lg mb-6 flex items-center justify-between">
          <span>{validationError}</span>
          <button
            onClick={() => setValidationError(null)}
            className="text-xs font-mono underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Company Info */}
            <div className="bg-[#121520] border border-white/10 rounded-xl p-6 transition-all hover:border-white/20">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-semibold text-[#e9feff]">
                  01 // Company Info
                </h2>
                <span className="font-mono text-xs text-[#00f5ff] bg-[#00f5ff]/15 border border-[#00f5ff]/30 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-[#b9caca] mb-2 uppercase tracking-wide">
                    Company Name <span className="text-[#00f5ff]">*</span>
                  </label>
                  <input
                    id="input-company-name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    type="text"
                    required
                    className="w-full bg-[#262a34] border border-white/10 rounded p-3 text-[#dfe2f0] text-sm focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff] transition-colors outline-none font-sans placeholder:text-[#849495]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#b9caca] mb-2 uppercase tracking-wide">
                    Work Email
                  </label>
                  <input
                    id="input-work-email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    placeholder="admin@telecom.net"
                    type="email"
                    className="w-full bg-[#262a34] border border-white/10 rounded p-3 text-[#dfe2f0] text-sm focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff] transition-colors outline-none font-sans placeholder:text-[#849495]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#b9caca] mb-2 uppercase tracking-wide">
                    Operation Type
                  </label>
                  <select
                    id="select-operation-type"
                    name="operationType"
                    value={formData.operationType}
                    onChange={handleInputChange}
                    className="w-full bg-[#262a34] border border-white/10 rounded p-3 text-[#dfe2f0] text-sm focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff] outline-none font-sans cursor-pointer"
                  >
                    <option value="Network Operations">Network Operations</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="RAN & Edge Optimization">RAN & Edge Optimization</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#b9caca] mb-2 uppercase tracking-wide">
                    Network Size (Nodes)
                  </label>
                  <input
                    id="input-network-size"
                    name="networkSize"
                    value={formData.networkSize}
                    onChange={handleInputChange}
                    placeholder="e.g. 5000"
                    type="text"
                    className="w-full bg-[#262a34] border border-white/10 rounded p-3 text-[#dfe2f0] text-sm focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff] outline-none font-sans placeholder:text-[#849495]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Operational Issues */}
            <div className="bg-[#121520] border border-white/10 rounded-xl p-6 transition-all hover:border-white/20">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-semibold text-[#e9feff]">
                  02 // Operational Issues
                </h2>
                <span className="font-mono text-xs text-[#849495] bg-[#31353f] px-2.5 py-1 rounded uppercase tracking-wider font-semibold">
                  {formData.painPoints.length > 0 ? 'Active' : 'Pending'}
                </span>
              </div>

              <div className="mb-6">
                <label className="block font-mono text-xs text-[#b9caca] mb-3 uppercase tracking-wide">
                  Primary Pain Points (Select multiple)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {painPointOptions.map((point) => {
                    const isSelected = formData.painPoints.includes(point);
                    return (
                      <label
                        key={point}
                        onClick={() => handleTogglePainPoint(point)}
                        className={`flex items-center p-3 border rounded cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#262a34] border-[#00f5ff]/70 text-[#e9feff] shadow-[0_0_8px_rgba(0,245,255,0.15)]'
                            : 'bg-[#262a34] border-white/10 text-[#dfe2f0] hover:border-white/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // handled by parent onClick
                          className="w-4 h-4 rounded bg-[#0f131d] border-[#849495] text-[#00f5ff] focus:ring-[#00f5ff] accent-[#00f5ff]"
                        />
                        <span className="ml-3 text-sm">{point}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#b9caca] mb-2 uppercase tracking-wide">
                  What outcome are you trying to improve?
                </label>
                <textarea
                  id="textarea-outcome-goal"
                  name="outcomeGoal"
                  value={formData.outcomeGoal}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe the ideal state..."
                  className="w-full bg-[#262a34] border border-white/10 rounded p-3 text-[#dfe2f0] text-sm focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff] transition-colors outline-none font-sans placeholder:text-[#849495] resize-y"
                />
              </div>
            </div>

            {/* Step 3: Intelligence Context */}
            <div className="bg-[#121520] border border-white/10 rounded-xl p-6 transition-all hover:border-white/20">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-semibold text-[#e9feff]">
                  03 // Intelligence Context
                </h2>
                <span className="font-mono text-xs text-[#849495] bg-[#31353f] px-2.5 py-1 rounded uppercase tracking-wider font-semibold">
                  {formData.constraints ? 'Active' : 'Pending'}
                </span>
              </div>

              <div className="mb-6">
                <label className="block font-mono text-xs text-[#b9caca] mb-3 uppercase tracking-wide">
                  Current AI Maturity Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {maturityLevels.map((level) => {
                    const isSelected = formData.aiMaturity === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleMaturitySelect(level)}
                        className={`p-3 border rounded font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#00f5ff]/15 border-[#00f5ff] text-[#00f5ff] font-bold shadow-[0_0_10px_rgba(0,245,255,0.2)]'
                            : 'bg-[#262a34] border-white/10 text-[#dfe2f0] hover:border-[#00f5ff]/50 hover:text-[#00f5ff]'
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative">
                <label className="block font-mono text-xs text-[#b9caca] mb-2 uppercase tracking-wide">
                  Specific operational constraints
                </label>
                <textarea
                  id="textarea-constraints"
                  name="constraints"
                  value={formData.constraints}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Detail constraints here..."
                  className="w-full bg-[#262a34] border border-white/10 rounded p-3 text-[#dfe2f0] text-sm focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff] transition-colors outline-none font-sans placeholder:text-[#849495] pb-8 resize-y"
                />

                {/* Sensitive Data Scanner Indicator */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 font-mono text-[11px]">
                  {piiDetected ? (
                    <span className="text-[#ffb4ab] flex items-center gap-1 bg-[#93000a]/40 px-2 py-0.5 rounded border border-[#ffb4ab]/30 animate-pulse">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      PII pattern detected (Auto-scrub active)
                    </span>
                  ) : (
                    <span className="text-[#849495] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">policy</span>
                      Sensitive Data Scanner Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Form Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                id="submit-assessment-btn"
                className="bg-[#00f5ff] text-[#003739] text-base md:text-lg font-bold px-8 py-3.5 rounded shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:bg-[#63f7ff] transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                Submit for Assessment
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Monkyfi Atlas Info Card */}
              <div className="bg-gradient-to-b from-[#FFFDD0]/10 to-transparent border border-[#e9c083]/20 rounded-xl p-6 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#e9c083]">auto_awesome</span>
                  <h3 className="text-lg font-semibold text-[#e9c083]">Monkyfi Atlas</h3>
                </div>
                <p className="text-sm text-[#b9caca] mb-4 leading-relaxed">
                  Your inputs will be analyzed by our intelligence layer to cross-reference known legacy telecom constraints with optimal AI automation pathways.
                </p>
                <div className="h-32 rounded bg-[#0A0C14] border border-white/10 overflow-hidden relative group">
                  <div
                    className="bg-cover bg-center w-full h-full opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${NETWORK_TOPOLOGY_IMAGE_URL}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C14] to-transparent opacity-60" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-[#e9c083]">
                    <span>AI Readiness Assessment | Intake</span>
                    <span className="text-[#00f5ff]">● Online</span>
                  </div>
                </div>
              </div>

              {/* Intake Protocol Card */}
              <div className="bg-[#121520] border border-white/10 rounded-xl p-6">
                <h3 className="font-mono text-xs text-[#b9caca] uppercase tracking-widest border-b border-white/10 pb-2.5 mb-4 font-semibold">
                  Intake Protocol
                </h3>
                <ul className="space-y-3.5 text-sm text-[#b9caca]">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#00dce5] text-base mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span>Data is encrypted in transit and at rest.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#00dce5] text-base mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span>Automated PII scrubbing enabled on text fields.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#00dce5] text-base mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span>Assessment generates a readiness scorecard within 24h.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
