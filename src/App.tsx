import React, { useState } from 'react';
import { ScreenView, Language, IntakeFormData, ScorecardData, ReviewSubmission } from './types';
import { initialSubmissions, defaultScorecard, defaultFormData, CARLOS_AVATAR_URL } from './data/mockData';
import { TopNavbar } from './components/TopNavbar';
import { SideNavbar } from './components/SideNavbar';
import { Footer } from './components/Footer';
import { ConnectScreen } from './components/screens/ConnectScreen';
import { AssessScreen } from './components/screens/AssessScreen';
import { ScorecardScreen } from './components/screens/ScorecardScreen';
import { ReviewScreen } from './components/screens/ReviewScreen';
import { ChatbotDrawer } from './components/modals/ChatbotDrawer';
import { ProductModal } from './components/modals/ProductModal';
import { AuditModal } from './components/modals/AuditModal';
import { SummaryModal } from './components/modals/SummaryModal';
import { LegalModal } from './components/modals/LegalModals';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('connect');
  const [language, setLanguage] = useState<Language>('en');

  // Intake Form & Scorecard State
  const [formData, setFormData] = useState<IntakeFormData>(defaultFormData);
  const [scorecardData, setScorecardData] = useState<ScorecardData>(defaultScorecard);
  const [submissions, setSubmissions] = useState<ReviewSubmission[]>(initialSubmissions);

  // Modals & Drawers State
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [productModal, setProductModal] = useState<'atlas' | 'sentinel' | null>(null);
  const [auditModal, setAuditModal] = useState<'audit' | 'plan' | null>(null);
  const [summarySubmission, setSummarySubmission] = useState<ReviewSubmission | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'support' | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  const handleNavigate = (screen: ScreenView) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when user submits the assessment form on AssessScreen
  const handleSubmitAssessment = (data: IntakeFormData) => {
    const nodeCount = parseInt(data.networkSize) || 3500;
    
    // Dynamic score generation based on responses
    let baseScore = 70;
    if (data.aiMaturity === 'Scaling') baseScore += 18;
    else if (data.aiMaturity === 'Piloting') baseScore += 14;
    else if (data.aiMaturity === 'Experimenting') baseScore += 8;
    else baseScore += 4;

    if (data.painPoints.length >= 3) baseScore -= 3;
    const finalScore = Math.min(Math.max(baseScore, 40), 96);

    const stratScore = Math.min(5, 3.2 + (data.aiMaturity === 'Scaling' ? 1.6 : 0.8));
    const dataScore = Math.min(5, 2.4 + (data.constraints ? 0.6 : 1.2));
    const procScore = Math.min(5, 3.0 + data.painPoints.length * 0.3);
    const techScore = Math.min(5, 3.8 + (nodeCount > 5000 ? 0.8 : 0.5));
    const govScore = 3.5;

    const newScorecard: ScorecardData = {
      companyName: data.companyName || 'Your Telecom Organization',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      fitScore: finalScore,
      readinessStatus: finalScore >= 80 ? 'READINESS: PILOT READY' : 'READINESS: ASSESSMENT IN PROGRESS',
      reviewerQuote: `"Reviewed by Carlos for ${data.companyName || 'your organization'}. We detected significant automation potential for your ${data.operationType.toLowerCase()} workloads. Let's blueprint the Level-1 NOC pilot."`,
      reviewerName: 'Carlos Mendonza',
      reviewerAvatar: CARLOS_AVATAR_URL,
      scores: {
        strategy: Number(stratScore.toFixed(1)),
        data: Number(dataScore.toFixed(1)),
        process: Number(procScore.toFixed(1)),
        tech: Number(techScore.toFixed(1)),
        governance: Number(govScore.toFixed(1))
      },
      opportunities: [
        {
          id: '01',
          title: 'NOC & Alarm Automation',
          desc: `Automate resolution for ${data.operationType} alert streams.`
        },
        {
          id: '02',
          title: 'Data Normalization Pipeline',
          desc: 'Clean up legacy CMDB schemas and decouple cross-region telemetry.'
        },
        {
          id: '03',
          title: 'Predictive Hardware Maintenance',
          desc: `Analyze optical degradation across ${nodeCount.toLocaleString()} node topology.`
        }
      ],
      risks: [
        {
          id: '01',
          title: 'Legacy Protocol Silos',
          desc: 'Disparate interfaces between BSS/OSS layers.'
        },
        {
          id: '02',
          title: 'Manual Dispatch Dependency',
          desc: 'Excessive truck-roll overhead on unverified alarms.'
        },
        {
          id: '03',
          title: 'Security & CPNI Compliance',
          desc: 'Ensure automated scrubbing before ingesting edge log telemetry.'
        }
      ],
      recommendedStep: {
        title: 'Telecom Digital Transformation Audit',
        desc: `Targeted architectural deep dive with Carlos to finalize your ${data.companyName} pilot specification.`
      }
    };

    setScorecardData(newScorecard);

    // Also inject into the internal Review Queue
    const newSubmission: ReviewSubmission = {
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: data.companyName || 'New Submission',
      score: finalScore,
      status: 'Reviewing',
      intakeDate: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      reviewer: 'Carlos_NOC',
      telemetry: {
        infrastructure_type: data.operationType.toLowerCase().replace(/\s+/g, '_'),
        node_count: nodeCount,
        automation_level: data.aiMaturity.toLowerCase(),
        primary_bottleneck: data.painPoints[0]?.toLowerCase().replace(/\s+/g, '_') || 'latency',
        contact_email: data.workEmail || 'admin@telecom.net',
        specific_constraints: data.constraints
      },
      dimensions: {
        technicalDebt: Math.round(dataScore),
        automationReadiness: Math.round(stratScore),
        dataMaturity: Math.round(procScore)
      },
      serviceMapping: {
        atlasMapping: true,
        sentinelIntegration: finalScore > 75,
        legacyDecommissioning: true
      },
      piiFlag: data.constraints.includes('@') || data.constraints.length > 50
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    showToast(`Assessment submitted for ${data.companyName}! Scorecard generated.`);
    setCurrentScreen('scorecard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyChatbotIntake = (partial: Partial<IntakeFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
    showToast('Intake data updated from Atlas Copilot!');
  };

  const hasSideNav = currentScreen !== 'connect';

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#dfe2f0] flex flex-col font-sans selection:bg-[#00f5ff]/30 selection:text-[#00f5ff]">
      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-[#00f5ff] text-[#003739] font-bold px-5 py-3 rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.4)] flex items-center gap-2.5 animate-in slide-in-from-top-2 font-mono text-xs">
          <span className="material-symbols-outlined text-base">check_circle</span>
          {toast}
        </div>
      )}

      {/* Top Navbar */}
      <TopNavbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenAtlas={() => setProductModal('atlas')}
        onOpenSentinel={() => setProductModal('sentinel')}
      />

      {/* Main Layout Area */}
      <div className="pt-16 flex-1 flex w-full">
        {/* Side Navbar on Assess, Scorecard, and Review screens */}
        {hasSideNav && (
          <SideNavbar
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            language={language}
          />
        )}

        {/* Dynamic Screen View Content */}
        <main
          className={`flex-1 flex flex-col px-4 sm:px-6 md:px-12 py-8 transition-all ${
            hasSideNav ? 'lg:pl-72' : 'max-w-7xl mx-auto'
          }`}
        >
          {currentScreen === 'connect' && (
            <ConnectScreen
              onNavigate={handleNavigate}
              language={language}
              onOpenChatbot={() => setIsChatbotOpen(true)}
              onOpenAtlas={() => setProductModal('atlas')}
              onOpenSentinel={() => setProductModal('sentinel')}
              onOpenSamplePlan={() => setAuditModal('plan')}
            />
          )}

          {currentScreen === 'assess' && (
            <AssessScreen
              formData={formData}
              setFormData={setFormData}
              onSubmitAssessment={handleSubmitAssessment}
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'scorecard' && (
            <ScorecardScreen
              scorecardData={scorecardData}
              onNavigate={handleNavigate}
              onInitiateAudit={() => setAuditModal('audit')}
            />
          )}

          {currentScreen === 'review' && (
            <ReviewScreen
              submissions={submissions}
              setSubmissions={setSubmissions}
              onNavigate={handleNavigate}
              onGenerateSummary={(sub) => setSummarySubmission(sub)}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
        onOpenSupport={() => setLegalModal('support')}
      />

      {/* Modals and Drawers */}
      <ChatbotDrawer
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onApplyIntake={handleApplyChatbotIntake}
        onNavigateToAssess={() => setCurrentScreen('assess')}
      />

      <ProductModal
        product={productModal}
        onClose={() => setProductModal(null)}
        onBook={() => {
          setCurrentScreen('assess');
          setProductModal(null);
        }}
      />

      <AuditModal
        isOpen={auditModal !== null}
        type={auditModal || 'audit'}
        onClose={() => setAuditModal(null)}
      />

      <SummaryModal
        submission={summarySubmission}
        onClose={() => setSummarySubmission(null)}
      />

      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}

export default App;
