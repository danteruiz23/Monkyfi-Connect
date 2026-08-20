import React, { useState } from 'react';
import { ReviewSubmission, ScreenView } from '../../types';

interface ReviewScreenProps {
  submissions: ReviewSubmission[];
  setSubmissions: React.Dispatch<React.SetStateAction<ReviewSubmission[]>>;
  onNavigate: (screen: ScreenView) => void;
  onGenerateSummary: (sub: ReviewSubmission) => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  submissions,
  setSubmissions,
  onNavigate,
  onGenerateSummary
}) => {
  const [selectedId, setSelectedId] = useState<string>(submissions[0]?.id || 'SUB-8921');
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedSubmission =
    submissions.find((s) => s.id === selectedId) || submissions[0];

  // Helper to dynamically update the active submission's dimensions and recalculate score
  const handleDimensionChange = (
    key: 'technicalDebt' | 'automationReadiness' | 'dataMaturity',
    val: number
  ) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === selectedId) {
          const updatedDims = { ...sub.dimensions, [key]: val };
          // Calculate score based on dimensions (out of 100)
          // Technical debt, readiness, maturity out of 5
          const newScore = Math.round(
            ((updatedDims.technicalDebt * 0.3 +
              updatedDims.automationReadiness * 0.4 +
              updatedDims.dataMaturity * 0.3) /
              5) *
              100
          );
          return {
            ...sub,
            dimensions: updatedDims,
            score: newScore
          };
        }
        return sub;
      })
    );
  };

  const handleServiceMappingToggle = (
    key: 'atlasMapping' | 'sentinelIntegration' | 'legacyDecommissioning'
  ) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === selectedId) {
          return {
            ...sub,
            serviceMapping: {
              ...sub.serviceMapping,
              [key]: !sub.serviceMapping[key]
            }
          };
        }
        return sub;
      })
    );
  };

  const handleApproveAndSend = () => {
    if (!selectedSubmission) return;
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === selectedId ? { ...sub, status: 'Sent' } : sub
      )
    );
    setToastMessage(`Assessment for ${selectedSubmission.companyName} Approved & Sent to client!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.companyName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || sub.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div id="review-screen" className="w-full max-w-[1440px] mx-auto pb-16">
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#00dce5] text-[#003739] font-bold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce font-mono text-xs">
          <span className="material-symbols-outlined text-base">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Grid Canvas: Left Queue Table & Right Detailed Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Table of Submissions (Left Pane) */}
        <section className="xl:col-span-5 flex flex-col bg-[#121520] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-white/10 bg-[#1b2029] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[#dfe2f0]">Queue</h2>
              <span className="font-mono text-xs text-[#00f5ff] bg-[#00f5ff]/10 px-2 py-0.5 rounded">
                {submissions.length} Total
              </span>
            </div>

            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="p-1.5 rounded hover:bg-white/10 text-[#849495] hover:text-[#00f5ff] transition-colors cursor-pointer"
                title="Filter by status"
              >
                <span className="material-symbols-outlined text-lg">filter_list</span>
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 top-8 w-40 bg-[#1b2029] border border-white/10 rounded-lg shadow-2xl z-20 py-1 text-xs font-mono">
                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setShowFilterDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-white/10 text-[#dfe2f0]"
                  >
                    All Statuses
                  </button>
                  <button
                    onClick={() => {
                      setFilterStatus('Reviewing');
                      setShowFilterDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-white/10 text-[#00f5ff]"
                  >
                    Reviewing
                  </button>
                  <button
                    onClick={() => {
                      setFilterStatus('Pending');
                      setShowFilterDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-white/10 text-[#e9c083]"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => {
                      setFilterStatus('Sent');
                      setShowFilterDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-white/10 text-[#90cdff]"
                  >
                    Sent
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Search */}
          <div className="p-3 bg-[#0a0e17] border-b border-white/10">
            <div className="flex items-center gap-2 bg-[#1b2029] px-3 py-1.5 rounded border border-white/10 text-xs">
              <span className="material-symbols-outlined text-sm text-[#849495]">search</span>
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search company or ID..."
                className="bg-transparent text-[#dfe2f0] outline-none w-full font-mono placeholder:text-[#849495]"
              />
            </div>
          </div>

          {/* Queue Table */}
          <div className="overflow-y-auto max-h-[580px]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="sticky top-0 bg-[#262a34] border-b border-white/10 z-10">
                <tr>
                  <th className="p-3.5 text-[#b9caca] font-medium uppercase tracking-wider">SUBMISSION</th>
                  <th className="p-3.5 text-[#b9caca] font-medium uppercase tracking-wider">SCORE</th>
                  <th className="p-3.5 text-[#b9caca] font-medium uppercase tracking-wider">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredSubmissions.map((sub) => {
                  const isSelected = sub.id === selectedId;

                  let scoreColor = 'text-[#00dce5]';
                  if (sub.score < 60) scoreColor = 'text-[#ffb4ab]';
                  else if (sub.score < 80) scoreColor = 'text-[#e9c083]';

                  return (
                    <tr
                      key={sub.id}
                      onClick={() => setSelectedId(sub.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#31353f]/80 border-l-4 border-[#00dce5]'
                          : 'hover:bg-[#1b2029] bg-[#121520]'
                      }`}
                    >
                      <td className="p-3.5">
                        <div className={`font-semibold ${isSelected ? 'text-[#00f5ff]' : 'text-[#dfe2f0]'}`}>
                          {sub.companyName}
                        </div>
                        <div className="text-[#849495] text-[10px] mt-0.5">
                          ID: {sub.id}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className={`font-mono text-base font-bold ${scoreColor}`}>
                          {sub.score}
                        </span>
                      </td>

                      <td className="p-3.5">
                        {sub.status === 'Reviewing' && (
                          <span className="bg-[#00f5ff]/10 text-[#00dce5] px-2 py-1 rounded text-[10px] uppercase border border-[#00f5ff]/20 font-semibold">
                            Reviewing
                          </span>
                        )}
                        {sub.status === 'Pending' && (
                          <span className="bg-[#31353f] text-[#b9caca] px-2 py-1 rounded text-[10px] uppercase border border-white/10">
                            Pending
                          </span>
                        )}
                        {sub.status === 'Sent' && (
                          <span className="bg-[#849495]/20 text-[#90cdff] px-2 py-1 rounded text-[10px] uppercase border border-[#90cdff]/30">
                            Sent
                          </span>
                        )}
                        {sub.status === 'Approved' && (
                          <span className="bg-[#00dce5]/20 text-[#00dce5] px-2 py-1 rounded text-[10px] uppercase border border-[#00dce5]/40 font-bold">
                            Approved
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Review Pane (Right Pane) */}
        {selectedSubmission ? (
          <section className="xl:col-span-7 flex flex-col gap-6">
            {/* Header Card */}
            <div className="bg-[#121520] border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#dfe2f0]">
                    {selectedSubmission.companyName}
                  </h1>
                  {selectedSubmission.piiFlag && (
                    <span className="bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30 px-2.5 py-1 rounded font-mono text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      PII FLAG
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-[#849495]">
                  Intake Date: {selectedSubmission.intakeDate} | Reviewer: {selectedSubmission.reviewer}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono text-xs text-[#849495] mb-0.5 tracking-wider">
                  FIT SCORE
                </div>
                <div className="font-mono text-4xl md:text-5xl font-bold text-[#00dce5] drop-shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                  {selectedSubmission.score}
                </div>
              </div>
            </div>

            {/* Bento Grid for Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Raw Data Snippet */}
              <div className="bg-[#121520] border border-white/10 rounded-xl p-5 col-span-1 md:col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base font-semibold text-[#dfe2f0] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00f5ff] text-base">terminal</span>
                    Raw Intake Telemetry
                  </h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(selectedSubmission.telemetry, null, 2));
                      setToastMessage('Telemetry JSON copied to clipboard!');
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="font-mono text-xs text-[#849495] hover:text-[#00f5ff] flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    Copy JSON
                  </button>
                </div>

                <div className="bg-[#0a0e17] p-4 rounded-lg border border-white/10 font-mono text-xs text-[#b9caca] overflow-x-auto leading-relaxed">
                  <pre>
                    <code>
                      {`{\n`}
                      {`  "infrastructure_type": "${selectedSubmission.telemetry.infrastructure_type}",\n`}
                      {`  "node_count": ${selectedSubmission.telemetry.node_count},\n`}
                      {`  "automation_level": "${selectedSubmission.telemetry.automation_level}",\n`}
                      {`  "primary_bottleneck": "${selectedSubmission.telemetry.primary_bottleneck}",\n`}
                      <span className={selectedSubmission.piiFlag ? 'text-[#ffb4ab] bg-[#93000a]/20 px-1 py-0.5 rounded' : ''}>
                        {`  "contact_email": "${selectedSubmission.telemetry.contact_email}"${selectedSubmission.piiFlag ? ' // FLAG: PII' : ''}\n`}
                      </span>
                      {selectedSubmission.telemetry.specific_constraints && (
                        `  "constraints": "${selectedSubmission.telemetry.specific_constraints}"\n`
                      )}
                      {`}`}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Dimension Assessment Slider Tool */}
              <div className="bg-[#121520] border border-white/10 rounded-xl p-5">
                <h3 className="text-base font-semibold text-[#dfe2f0] mb-4 flex items-center justify-between">
                  <span>Dimension Assessment</span>
                  <span className="text-xs font-mono text-[#849495]">Adjust Rubric</span>
                </h3>
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[#b9caca]">Technical Debt</span>
                      <span className="text-[#00dce5] font-bold text-sm">
                        {selectedSubmission.dimensions.technicalDebt} / 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={selectedSubmission.dimensions.technicalDebt}
                      onChange={(e) =>
                        handleDimensionChange('technicalDebt', parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[#b9caca]">Automation Readiness</span>
                      <span className="text-[#00dce5] font-bold text-sm">
                        {selectedSubmission.dimensions.automationReadiness} / 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={selectedSubmission.dimensions.automationReadiness}
                      onChange={(e) =>
                        handleDimensionChange('automationReadiness', parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[#b9caca]">Data Maturity</span>
                      <span className="text-[#00dce5] font-bold text-sm">
                        {selectedSubmission.dimensions.dataMaturity} / 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={selectedSubmission.dimensions.dataMaturity}
                      onChange={(e) =>
                        handleDimensionChange('dataMaturity', parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Service Mapping Selector */}
              <div className="bg-[#121520] border border-white/10 rounded-xl p-5">
                <h3 className="text-base font-semibold text-[#dfe2f0] mb-4">
                  Service Mapping
                </h3>
                <div className="space-y-2.5 font-mono text-xs">
                  <label
                    onClick={() => handleServiceMappingToggle('atlasMapping')}
                    className="flex items-center gap-3 p-2.5 rounded bg-[#1b2029] hover:bg-[#262a34] border border-white/10 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubmission.serviceMapping.atlasMapping}
                      onChange={() => {}}
                      className="w-4 h-4 rounded bg-[#0f131d] border-[#849495] text-[#00dce5] accent-[#00dce5]"
                    />
                    <span className="text-[#dfe2f0]">Atlas Mapping</span>
                  </label>

                  <label
                    onClick={() => handleServiceMappingToggle('sentinelIntegration')}
                    className="flex items-center gap-3 p-2.5 rounded bg-[#1b2029] hover:bg-[#262a34] border border-white/10 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubmission.serviceMapping.sentinelIntegration}
                      onChange={() => {}}
                      className="w-4 h-4 rounded bg-[#0f131d] border-[#849495] text-[#00dce5] accent-[#00dce5]"
                    />
                    <span className="text-[#dfe2f0]">Sentinel Integration</span>
                  </label>

                  <label
                    onClick={() => handleServiceMappingToggle('legacyDecommissioning')}
                    className="flex items-center gap-3 p-2.5 rounded bg-[#1b2029] hover:bg-[#262a34] border border-white/10 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubmission.serviceMapping.legacyDecommissioning}
                      onChange={() => {}}
                      className="w-4 h-4 rounded bg-[#0f131d] border-[#849495] text-[#00dce5] accent-[#00dce5]"
                    />
                    <span className="text-[#dfe2f0]">Legacy Decommissioning</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-[#262a34] border border-white/10 rounded-xl p-4 flex flex-wrap justify-end gap-3 shadow-md">
              <button
                id="generate-summary-btn"
                onClick={() => onGenerateSummary(selectedSubmission)}
                className="flex items-center gap-2 border border-[#849495] text-[#dfe2f0] px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider hover:bg-[#31353f] hover:text-white transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#e9c083]">
                  auto_awesome
                </span>
                Generate Summary
              </button>

              <button
                id="approve-send-btn"
                onClick={handleApproveAndSend}
                className="flex items-center gap-2 bg-[#00dce5] text-[#003739] px-6 py-2.5 rounded font-mono text-xs uppercase font-bold tracking-wider hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:bg-[#63f7ff] transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                Approve & Send
              </button>
            </div>
          </section>
        ) : (
          <div className="xl:col-span-7 bg-[#121520] p-12 rounded-xl border border-white/10 text-center text-[#849495]">
            No submissions match your query.
          </div>
        )}
      </div>
    </div>
  );
};
