export type ScreenView = 'connect' | 'assess' | 'scorecard' | 'review';

export type Language = 'en' | 'es';

export interface IntakeFormData {
  companyName: string;
  workEmail: string;
  operationType: string;
  networkSize: string;
  painPoints: string[];
  outcomeGoal: string;
  aiMaturity: 'Exploring' | 'Experimenting' | 'Piloting' | 'Scaling';
  constraints: string;
}

export interface DimensionScores {
  strategy: number;
  data: number;
  process: number;
  tech: number;
  governance: number;
}

export interface ScorecardOpportunity {
  id: string;
  title: string;
  desc: string;
}

export interface ScorecardRisk {
  id: string;
  title: string;
  desc: string;
}

export interface ScorecardData {
  companyName: string;
  date: string;
  fitScore: number;
  readinessStatus: string;
  reviewerQuote: string;
  reviewerName: string;
  reviewerAvatar: string;
  scores: DimensionScores;
  opportunities: ScorecardOpportunity[];
  risks: ScorecardRisk[];
  recommendedStep: {
    title: string;
    desc: string;
  };
}

export interface ReviewSubmission {
  id: string;
  companyName: string;
  score: number;
  status: 'Reviewing' | 'Pending' | 'Sent' | 'Approved';
  intakeDate: string;
  reviewer: string;
  telemetry: {
    infrastructure_type: string;
    node_count: number;
    automation_level: string;
    primary_bottleneck: string;
    contact_email: string;
    specific_constraints?: string;
  };
  dimensions: {
    technicalDebt: number;
    automationReadiness: number;
    dataMaturity: number;
  };
  serviceMapping: {
    atlasMapping: boolean;
    sentinelIntegration: boolean;
    legacyDecommissioning: boolean;
  };
  piiFlag: boolean;
  notes?: string;
}
