import { ReviewSubmission, ScorecardData, IntakeFormData } from '../types';

export const CARLOS_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDqGWnAzFqSdMa7ilXoUr4n-QHkwqG_lIx9mNuRp0VTQ2_SH_f16oTkGfbXgTKifFDCJi0kI28JFEcSfzuR8l8DgpSd_8k4yAeTZskh65RE9rX3ctgN8EqhQyGNdRzcKyiHhlb4kqJ8vCV1UBOfp783Lc7_MatvbKgeYZwCP-dIeDp99OsYQO07ddZsCSVPQkihzCLJLGighd2Xgz3LmuyqPFTvi1ooZ8ro8-9d1g5IJoexJfnLTtIY';

export const NETWORK_TOPOLOGY_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuABopchSf1-UrX2XIgcGKDA4ga-H-DD7l7Mv9Um82YqsqsMicD2E0PnS9cx3u15rJG7m-CBt_95QSWdZ9mxTBLIiUBNlKxNbY7olY0gbANuCEFJcyEOgrZTbkziQCkBolxWcpSTFhx3BQXI3JWAaIVOoPWGMy6RKE-5h7EmQmZzWR3ilzKAmZMrWzwnmOtbcUjrDvBjkF5j0ayqd8R6L3vEsjgLdtEvvrrk0gTs5qQkLA036KSYOIkP';

export const initialSubmissions: ReviewSubmission[] = [
  {
    id: 'SUB-8921',
    companyName: 'TechFlow Inc.',
    score: 84,
    status: 'Reviewing',
    intakeDate: '2024-10-24 14:32:01 UTC',
    reviewer: 'Admin_01',
    telemetry: {
      infrastructure_type: 'legacy_hybrid',
      node_count: 4500,
      automation_level: 'manual_scripted',
      primary_bottleneck: 'provisioning_latency',
      contact_email: 'admin@techflow.internal',
      specific_constraints: 'Restricted cross-regional database syncing'
    },
    dimensions: {
      technicalDebt: 4,
      automationReadiness: 3,
      dataMaturity: 5
    },
    serviceMapping: {
      atlasMapping: true,
      sentinelIntegration: true,
      legacyDecommissioning: false
    },
    piiFlag: true,
    notes: 'Requires automated CPNI/PII scrub on edge log telemetry.'
  },
  {
    id: 'SUB-8920',
    companyName: 'OmniNet Systems',
    score: 62,
    status: 'Pending',
    intakeDate: '2024-10-24 11:15:40 UTC',
    reviewer: 'Carlos_NOC',
    telemetry: {
      infrastructure_type: 'multi_cloud_ran',
      node_count: 12800,
      automation_level: 'semi_automated',
      primary_bottleneck: 'alarm_floods_5g',
      contact_email: 'ops@omninet.net'
    },
    dimensions: {
      technicalDebt: 3,
      automationReadiness: 2,
      dataMaturity: 3
    },
    serviceMapping: {
      atlasMapping: true,
      sentinelIntegration: false,
      legacyDecommissioning: true
    },
    piiFlag: false
  },
  {
    id: 'SUB-8919',
    companyName: 'Global Telco Corp',
    score: 91,
    status: 'Sent',
    intakeDate: '2024-10-23 18:44:12 UTC',
    reviewer: 'Admin_02',
    telemetry: {
      infrastructure_type: 'fiber_backbone_tier1',
      node_count: 54000,
      automation_level: 'closed_loop_trial',
      primary_bottleneck: 'packet_optical_orchestration',
      contact_email: 'architecture@globaltelco.com'
    },
    dimensions: {
      technicalDebt: 5,
      automationReadiness: 5,
      dataMaturity: 4
    },
    serviceMapping: {
      atlasMapping: true,
      sentinelIntegration: true,
      legacyDecommissioning: true
    },
    piiFlag: false
  },
  {
    id: 'SUB-8918',
    companyName: 'Nexo Communications',
    score: 45,
    status: 'Pending',
    intakeDate: '2024-10-23 09:12:33 UTC',
    reviewer: 'Carlos_NOC',
    telemetry: {
      infrastructure_type: 'legacy_copper_microwave',
      node_count: 1800,
      automation_level: 'ad_hoc_manual',
      primary_bottleneck: 'technician_truck_rolls',
      contact_email: 'support@nexocomms.io'
    },
    dimensions: {
      technicalDebt: 2,
      automationReadiness: 1,
      dataMaturity: 2
    },
    serviceMapping: {
      atlasMapping: false,
      sentinelIntegration: false,
      legacyDecommissioning: true
    },
    piiFlag: false
  }
];

export const defaultScorecard: ScorecardData = {
  companyName: 'TechFlow Inc.',
  date: 'October 24, 2024',
  fitScore: 84,
  readinessStatus: 'READINESS: PILOT READY',
  reviewerQuote:
    '"Reviewed by Carlos. Let\'s discuss these results. The data layer needs some work before we scale the NOC automation, but the pilot looks very promising."',
  reviewerName: 'Carlos Mendonza',
  reviewerAvatar: CARLOS_AVATAR_URL,
  scores: {
    strategy: 4.2,
    data: 2.8,
    process: 3.9,
    tech: 4.5,
    governance: 3.5
  },
  opportunities: [
    {
      id: '01',
      title: 'NOC Automation',
      desc: 'Implement Sentinel for Level 1 ticket auto-resolution.'
    },
    {
      id: '02',
      title: 'Data Sanitization Pipeline',
      desc: 'Automated clean-up of legacy CMDB entries.'
    },
    {
      id: '03',
      title: 'Predictive Maintenance',
      desc: 'Utilize historical logs to forecast hardware degradation.'
    }
  ],
  risks: [
    {
      id: '01',
      title: 'Fragmented Data Sources',
      desc: 'Inconsistent schema across regional databases.'
    },
    {
      id: '02',
      title: 'Manual Process Dependency',
      desc: 'Critical workflows rely on undocumented tribal knowledge.'
    },
    {
      id: '03',
      title: 'Change Management Resistance',
      desc: 'Potential friction from legacy engineering teams.'
    }
  ],
  recommendedStep: {
    title: 'Telecom Digital Transformation Audit',
    desc: 'Deep dive into data structures and process mapping to blueprint the pilot implementation.'
  }
};

export const defaultFormData: IntakeFormData = {
  companyName: '',
  workEmail: '',
  operationType: 'Network Operations',
  networkSize: '',
  painPoints: ['Faster incident resolution', 'Predictive maintenance'],
  outcomeGoal: '',
  aiMaturity: 'Exploring',
  constraints: ''
};
