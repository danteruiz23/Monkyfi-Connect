import React, { useState } from 'react';
import { ReviewSubmission } from '../../types';

interface SummaryModalProps {
  submission: ReviewSubmission | null;
  onClose: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  submission,
  onClose
}) => {
  if (!submission) return null;

  const [copied, setCopied] = useState(false);

  const summaryText = `EXECUTIVE TELECOM INTELLIGENCE MEMO
Client: ${submission.companyName} (Ref: ${submission.id})
Fit Score: ${submission.score}/100 | Status: ${submission.status}
Reviewer: ${submission.reviewer} | Date: ${submission.intakeDate}

1. ARCHITECTURAL ASSESSMENT:
The operational intake indicates a ${submission.telemetry.infrastructure_type} topology with ${submission.telemetry.node_count.toLocaleString()} active nodes. Primary bottleneck detected: ${submission.telemetry.primary_bottleneck}.

2. DIMENSION BREAKDOWN:
- Technical Debt Score: ${submission.dimensions.technicalDebt}/5
- Automation Readiness: ${submission.dimensions.automationReadiness}/5
- Data Maturity: ${submission.dimensions.dataMaturity}/5

3. RECOMMENDED ACTION PATHWAY:
- Deploy Monkyfi Atlas for immediate NOC alarm correlation.
- Scrub legacy BSS/OSS edge telemetry for CPNI/PII compliance (${submission.piiFlag ? 'PII flag detected and quarantined' : 'No PII violations detected'}).
- Schedule Telecom Digital Transformation Audit with Carlos Mendonza.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#121520] border border-[#00f5ff]/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/10 bg-[#1b2029] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e9c083]">auto_awesome</span>
            <h3 className="text-lg font-bold text-[#dfe2f0]">
              Generated Executive Summary // {submission.companyName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-[#0a0e17] p-4 rounded-xl border border-white/10 font-mono text-xs text-[#b9caca] leading-relaxed whitespace-pre-line max-h-[380px] overflow-y-auto">
            {summaryText}
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-mono text-[#849495]">
              AI generated & reviewed by Atlas intelligence engine
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded text-xs font-mono bg-[#1b2029] text-[#dfe2f0] border border-white/10 hover:border-[#00f5ff] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                {copied ? 'Copied!' : 'Copy Memo'}
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded text-xs font-mono font-bold bg-[#00f5ff] text-[#003739] hover:bg-[#63f7ff] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
