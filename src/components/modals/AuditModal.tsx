import React, { useState } from 'react';

interface AuditModalProps {
  isOpen: boolean;
  type: 'audit' | 'plan';
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  type,
  onClose
}) => {
  const [scheduled, setScheduled] = useState(false);
  const [preferredDate, setPreferredDate] = useState('');

  if (!isOpen) return null;

  const isAudit = type === 'audit';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#121520] border border-[#00f5ff]/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-[#1b2029] flex justify-between items-center">
          <div>
            <span className="font-mono text-xs text-[#00f5ff] uppercase tracking-widest font-bold">
              {isAudit ? 'Engagement Protocol' : 'Roadmap Blueprint'}
            </span>
            <h3 className="text-xl font-bold text-[#dfe2f0] mt-0.5">
              {isAudit ? 'Telecom Digital Transformation Audit' : 'Sample Implementation Plan'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5 text-sm text-[#b9caca]">
          {isAudit ? (
            <>
              <p className="leading-relaxed">
                Our senior telecom architecture team (led by Carlos Mendonza) will perform a 48-hour deep-dive on your network topology, telemetry pipelines, and NOC ticketing queues to finalize pilot deployment specs.
              </p>

              <div className="bg-[#0a0e17] p-4 rounded-lg border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#00f5ff]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Scope 1: Optical & RAN Data Normalization</span>
                </div>
                <div className="flex items-center gap-2 text-[#00f5ff]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Scope 2: CMDB & BSS/OSS Interface Mapping</span>
                </div>
                <div className="flex items-center gap-2 text-[#00f5ff]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Scope 3: Zero-Touch Pilot Target Definition</span>
                </div>
              </div>

              {!scheduled ? (
                <div className="pt-2 flex flex-col gap-3">
                  <label className="font-mono text-xs text-[#849495]">
                    Select Target Week for Audit Kickoff
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="bg-[#262a34] border border-white/10 rounded p-2.5 text-xs text-[#dfe2f0] outline-none"
                  />
                  <button
                    onClick={() => setScheduled(true)}
                    className="w-full bg-[#00f5ff] text-[#003739] py-3 rounded-lg font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#63f7ff] shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all cursor-pointer mt-2"
                  >
                    Confirm & Schedule Audit
                  </button>
                </div>
              ) : (
                <div className="bg-[#00dce5]/10 border border-[#00dce5] p-4 rounded-lg text-center text-[#00dce5] font-mono text-xs">
                  ✓ Audit request successfully submitted! Carlos will follow up directly within 4 hours.
                </div>
              )}
            </>
          ) : (
            <>
              <p className="leading-relaxed">
                Standard 90-Day Monkyfi Deployment Pathway for Tier-2 & Tier-1 Telecom Operators:
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#1b2029] rounded border border-white/10 flex items-start gap-3">
                  <span className="text-[#00f5ff] font-bold">Days 1-14</span>
                  <div>
                    <div className="text-white font-semibold">Discovery & Data Sanitization</div>
                    <div className="text-[#849495] text-[11px] mt-0.5">Scrub PII, normalize telemetry across regional silos.</div>
                  </div>
                </div>
                <div className="p-3 bg-[#1b2029] rounded border border-white/10 flex items-start gap-3">
                  <span className="text-[#e9c083] font-bold">Days 15-45</span>
                  <div>
                    <div className="text-white font-semibold">Atlas NOC Copilot Integration</div>
                    <div className="text-[#849495] text-[11px] mt-0.5">Deploy shadow runbook evaluation on Level-1 alarms.</div>
                  </div>
                </div>
                <div className="p-3 bg-[#1b2029] rounded border border-white/10 flex items-start gap-3">
                  <span className="text-[#90cdff] font-bold">Days 46-90</span>
                  <div>
                    <div className="text-white font-semibold">Sentinel Closed-Loop Activation</div>
                    <div className="text-[#849495] text-[11px] mt-0.5">Enable autonomous triage and automated service restoral.</div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded text-xs font-mono text-[#b9caca] hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
