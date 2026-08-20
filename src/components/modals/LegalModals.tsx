import React, { useState } from 'react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'support' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const [supportSent, setSupportSent] = useState(false);
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#121520] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/10 bg-[#1b2029] flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#dfe2f0]">
            {type === 'privacy' && 'Privacy Policy & CPNI Protection'}
            {type === 'terms' && 'Terms of Service'}
            {type === 'support' && 'Contact Telecom Engineering Support'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849495] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-[#b9caca] leading-relaxed">
          {type === 'privacy' && (
            <div className="space-y-3 font-sans text-xs">
              <p>
                <strong>Customer Proprietary Network Information (CPNI):</strong> Monkyfi Connect enforces strict automated edge scrubbing. No subscriber phone numbers, IP packets, or billing identifiers are stored in plaintext.
              </p>
              <p>
                <strong>Encryption:</strong> All telemetry is TLS 1.3 encrypted in transit and AES-256 encrypted at rest.
              </p>
              <p>
                <strong>Human-in-the-loop:</strong> Raw telemetry is only accessed by designated clearance engineers (e.g. Carlos Mendonza) during verified audit windows.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-3 font-sans text-xs">
              <p>
                <strong>1. Scope of Assessment:</strong> The AI Readiness Scorecard is provided as a strategic and technical diagnostic tool for telecom operators.
              </p>
              <p>
                <strong>2. Platform Availability:</strong> Monkyfi Connect and Atlas maintain 99.99% SLA availability for automated intake ingestion.
              </p>
              <p>
                <strong>3. Intellectual Property:</strong> Network topology blueprints generated during audits remain the sole property of the client operator.
              </p>
            </div>
          )}

          {type === 'support' && (
            <div>
              {!supportSent ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSupportSent(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <p>
                    Have specific questions about legacy switch compatibility or custom BSS/OSS connectors? Send a note to our telecom systems desk:
                  </p>
                  <div>
                    <label className="font-mono text-[#849495] block mb-1">Your Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engineer@telco.net"
                      className="w-full bg-[#262a34] border border-white/10 rounded p-2.5 text-[#dfe2f0] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[#849495] block mb-1">Message / Technical Requirement</label>
                    <textarea
                      required
                      rows={3}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. We need to verify compatibility with Nokia SAM and Ciena Blue Planet..."
                      className="w-full bg-[#262a34] border border-white/10 rounded p-2.5 text-[#dfe2f0] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#00f5ff] text-[#003739] py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#63f7ff] transition-all cursor-pointer mt-2"
                  >
                    Send to Engineering Desk
                  </button>
                </form>
              ) : (
                <div className="bg-[#00dce5]/10 border border-[#00dce5] p-4 rounded-lg text-center text-[#00dce5] font-mono text-xs">
                  ✓ Message received! A member of our NOC engineering team will respond within 2 hours.
                </div>
              )}
            </div>
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
