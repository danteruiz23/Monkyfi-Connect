import React from 'react';
import { NETWORK_TOPOLOGY_IMAGE_URL } from '../../data/mockData';

interface ProductModalProps {
  product: 'atlas' | 'sentinel' | null;
  onClose: () => void;
  onBook: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onBook
}) => {
  if (!product) return null;

  const isAtlas = product === 'atlas';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#121520] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Banner */}
        <div className="relative h-40 bg-[#0a0e17] border-b border-white/10 overflow-hidden flex items-center justify-between p-6">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
            style={{ backgroundImage: `url('${NETWORK_TOPOLOGY_IMAGE_URL}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17] via-[#0a0e17]/80 to-transparent" />

          <div className="relative z-10">
            <span className={`font-mono text-xs uppercase tracking-widest font-bold ${isAtlas ? 'text-[#e9c083]' : 'text-[#90cdff]'}`}>
              {isAtlas ? 'Premium Tier Copilot' : 'Autonomous Enterprise Swarm'}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#dfe2f0] mt-1">
              {isAtlas ? 'Monkyfi Atlas' : 'Monkyfi Sentinel'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#b9caca] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <p className="text-sm md:text-base text-[#b9caca] leading-relaxed">
            {isAtlas
              ? 'Monkyfi Atlas acts as your direct NOC Copilot. It aggregates multi-vendor telemetry from legacy hybrid switches, executes intelligent anomaly detection, and generates automated triage runbooks for human operators.'
              : 'Monkyfi Sentinel is our zero-touch network resilience tier. It deploys distributed AI swarms across regional points-of-presence (PoPs) to isolate fiber degradations and auto-reroute traffic in under 4ms.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#1b2029] p-3.5 rounded-lg border border-white/10">
              <div className="font-mono text-xs text-[#00f5ff] mb-1">Latency</div>
              <div className="text-lg font-bold text-white">&lt; 12ms</div>
              <p className="text-[11px] text-[#849495] mt-0.5">Real-time edge triage</p>
            </div>
            <div className="bg-[#1b2029] p-3.5 rounded-lg border border-white/10">
              <div className="font-mono text-xs text-[#e9c083] mb-1">Noise Reduction</div>
              <div className="text-lg font-bold text-white">88.4%</div>
              <p className="text-[11px] text-[#849495] mt-0.5">Alarm flood suppression</p>
            </div>
            <div className="bg-[#1b2029] p-3.5 rounded-lg border border-white/10">
              <div className="font-mono text-xs text-[#90cdff] mb-1">Compliance</div>
              <div className="text-lg font-bold text-white">CPNI / PII Safe</div>
              <p className="text-[11px] text-[#849495] mt-0.5">Hardware-level scrubbing</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded text-xs font-mono text-[#b9caca] hover:text-white border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook();
              }}
              className="px-6 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-[#00f5ff] text-[#003739] hover:bg-[#63f7ff] shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all cursor-pointer"
            >
              Book Assessment for {isAtlas ? 'Atlas' : 'Sentinel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
