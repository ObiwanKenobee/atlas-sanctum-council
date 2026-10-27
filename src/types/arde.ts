export type EpistemicClass =
  | 'DIRECT_OBSERVATION'
  | 'DOCUMENTARY_EVIDENCE'
  | 'STATISTICAL_ASSOCIATION'
  | 'CAUSAL_HYPOTHESIS'
  | 'MODEL_INFERENCE'
  | 'EXPERT_JUDGMENT'
  | 'MISSING_UNKNOWN';

export type EpistemicStatusTag =
  | 'ESTABLISHED_EVIDENCE'
  | 'REASONED_DESIGN_CHOICE'
  | 'UNTESTED_HYPOTHESIS'
  | 'SPECULATIVE_POSSIBILITY'
  | 'MISSING_INFORMATION';

export type DecisionStageId =
  | '01_OBSERVE'
  | '02_UNDERSTAND'
  | '03_DELIBERATE'
  | '04_DECIDE'
  | '05_ACT'
  | '06_VERIFY'
  | '07_LEARN';

export interface EvidenceNode {
  id: string;
  title: string;
  statement: string;
  epistemicClass: EpistemicClass;
  sourceInstitution: string;
  sourceAuthorOrSensor: string;
  observedAt: string;
  spatialScope: string;
  coordinates: { lat: number; lng: number };
  method: string;
  unit: string;
  measuredValue: string;
  confidenceInterval: string;
  reliabilityScore: number; // 0.0 to 1.0 calibrated source reliability
  licenseAndConsent: string;
  missingEvidenceRisk: string;
  wouldChangeConclusionIf: string;
  contestedByCommunity?: {
    claimantGroup: string;
    dateFiled: string;
    counterTestimony: string;
    resolutionStatus: 'OPEN_CONTESTATION' | 'INCORPORATED_IN_SENSITIVITY' | 'VERIFIED_FIELD_AUDIT';
  };
  linkedOptionIds: string[];
}

export interface CausalEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  relationship: 'CAUSES' | 'CONSTRAINS' | 'CONFIRMS' | 'CONTRADICTS' | 'OMITTED_CONFOUNDER';
  mechanismDescription: string;
  assumptionStrength: 'EMPIRICALLY_TESTED' | 'MODERATE_PRIOR' | 'WEAK_UNVERIFIED';
}

export interface CapabilityDimension {
  dimension:
    | 'Water Security & Reliability'
    | 'Household Disposable Income'
    | 'Maternal & Child Health'
    | 'Time Poverty & Labor Burden'
    | 'Ecological & Aquifer Resilience'
    | 'Procedural Dignity & Voice';
  baselineMetric: string;
  projectedChange: string;
  direction: 'EXPANDS' | 'NEUTRAL' | 'DIMINISHES' | 'UNCERTAIN';
  intergenerationalHorizon: string;
}

export interface HouseholdCohortImpact {
  cohortId: string;
  cohortName: string;
  populationSharePct: number;
  estimatedHouseholds: number;
  vulnerabilityProfile: string;
  excludedFromStandardAnalysis: boolean;
  netCapabilityEffect: 'POSITIVE' | 'MIXED' | 'NEGATIVE_HARM_WARNING';
  waterCostShareOfIncomePct: {
    baseline: number;
    underOptionA: number;
    underOptionB: number;
    underOptionC: number;
    underOptionD: number;
  };
  dailyCollectionMinutes: {
    baseline: number;
    underOptionA: number;
    underOptionB: number;
    underOptionC: number;
    underOptionD: number;
  };
  dignityAndAgencyNotes: string;
  capabilities: CapabilityDimension[];
}

export interface GovernanceRule {
  id: string;
  ruleTitle: string;
  ruleType:
    | 'STATUTORY_LAW'
    | 'LOCALLY_ESTABLISHED_BYLAW'
    | 'CUSTOMARY_PRACTICE'
    | 'VOLUNTARY_COMMITMENT'
    | 'DISPUTED_CLAIM'
    | 'SYSTEM_ASSUMPTION';
  governingBody: string;
  legalCitationOrCustom: string;
  enforcementMechanism: string;
  escalationProcedure: string;
  ostromPrincipleAlignment: string;
}

export interface StakeholderAuthority {
  id: string;
  institutionOrGroup: string;
  roleInDecision: 'APPROVAL_AUTHORITY' | 'MANDATORY_CONSULTATION' | 'AFFECTED_RIGHTSHOLDER' | 'IMPLEMENTATION_OPERATOR' | 'INDEPENDENT_AUDITOR';
  namedRepresentativeRole: string;
  consentStatus: 'GRANTED_WITH_CONDITIONS' | 'PENDING_DELIBERATION' | 'CONTESTED_TARIFF_CLAUSE' | 'AUTHORIZED';
  vetoOrChallengeRight: string;
}

export interface DecisionOption {
  id: string;
  code: 'OPTION_A' | 'OPTION_B' | 'OPTION_C' | 'OPTION_D';
  title: string;
  summary: string;
  capexKes: number;
  capexUsd: number;
  annualOpexKes: number;
  timeToOperationalDays: number;
  expectedDrySeasonYieldM3Day: { p10: number; p50: number; p90: number };
  aggregateCostEfficiencyRank: number;
  distributionalJusticeWarning: string | null;
  downsideScenario: string;
  irreversibleHarmRisk: 'LOW' | 'MODERATE_AQUIFER_DEPLETION' | 'HIGH_EXCLUSION_RISK';
  regulatoryCompliance: string;
  keyAssumptions: string[];
}

export interface CapitalAllocationItem {
  id: string;
  workPackage: string;
  responsibleOrganization: string;
  assignedLeadRole: string;
  fundingSource: string;
  procurementMethod: string;
  proposedKes: number;
  approvedKes: number;
  committedKes: number;
  disbursedKes: number;
  verifiedSpentKes: number;
  milestoneDeadline: string;
  verificationArtifact: string;
  status: 'VERIFIED_COMPLETE' | 'DISBURSED_IN_EXECUTION' | 'COMMITTED_AWAITING_SIGN_OFF' | 'PROPOSED_ONLY';
}

export interface OutcomeMetricRecord {
  id: string;
  indicatorName: string;
  unit: string;
  preInterventionBaseline: string;
  predictedTarget90Day: string;
  observedActual90Day: string;
  counterfactualComparisonGroup: string;
  evaluationDesign: string;
  confoundersIdentified: string;
  verificationStatus: 'INDEPENDENTLY_VERIFIED' | 'FIELD_SENSOR_LOGGED' | 'COMMUNITY_AUDITED' | 'UNRESOLVED_VARIANCE';
  varianceExplanation: string;
}

export interface VersionRevisionEntry {
  version: string;
  timestamp: string;
  authorRole: string;
  stage: DecisionStageId;
  changeSummary: string;
  dissentRecorded: string | null;
  cryptographicHash: string;
}

export interface CanonicalDecisionRecord {
  decisionId: string;
  version: string;
  title: string;
  currentStage: DecisionStageId;
  place: {
    country: string;
    county: string;
    subCounty: string;
    ward: string;
    catchmentName: string;
    hydrogeologicalZone: string;
    boundingBox: string;
    centroid: { lat: number; lng: number };
    populationAffected: number;
  };
  problem: {
    statement: string;
    intendedOutcome: string;
    baselineSummary: string;
    evidenceQualitySummary: string;
    urgencyLevel: string;
  };
  evidenceNodes: EvidenceNode[];
  causalEdges: CausalEdge[];
  cohorts: HouseholdCohortImpact[];
  governanceRules: GovernanceRule[];
  stakeholders: StakeholderAuthority[];
  options: DecisionOption[];
  recommendation: {
    recommendedOptionId: string;
    rationale: string;
    conditionsForReconsideration: string[];
    valueOfInformationGap: string;
    humilityDisclosure: string;
  };
  authorization: {
    status: 'AUTHORIZED_WITH_COVENANT_CONDITIONS' | 'AWAITING_HUMAN_SIGNATURES' | 'CHALLENGED_UNDER_REVIEW';
    primaryApproverRole: string;
    communityCoSignerRole: string;
    authorizedTimestamp: string;
    recordedDissent: string;
    mandatoryHumanExclusiveGates: string[];
  };
  capitalAllocations: CapitalAllocationItem[];
  outcomeRecords: OutcomeMetricRecord[];
  lessonsLearned: {
    priorAssumptionFailed: string;
    evidenceGraphUpdate: string;
    continuationDecision: 'CONTINUE_WITH_TARIFF_REVISION' | 'EXPAND_TO_ADJACENT_WARD' | 'HALT_AND_REDESIGN';
  };
  versionHistory: VersionRevisionEntry[];
}

export interface IntellectualCouncilMember {
  id: string;
  thinker: string;
  lifespanOrEra: string;
  domainTradition: string;
  coreWorkReference: string;
  q1UnderlyingInsight: string;
  q2DecisionProblemSolved: string;
  q3TechnicalEmbodiment: {
    componentName: string;
    dataStructureOrRule: string;
    architecturalLayer: string;
  };
  q4EmpiricalVerification: string;
  q5LimitationsAndUnintendedConsequences: string;
  productiveDisagreementWith: {
    counterpartThinker: string;
    tensionStatement: string;
    howArdePreservesTension: string;
  };
}
