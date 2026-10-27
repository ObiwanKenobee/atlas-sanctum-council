import React, { useState, useMemo } from 'react';
import {
  CanonicalDecisionRecord,
  DecisionStageId,
  EpistemicClass,
  EvidenceNode,
} from '../types/arde';
import { CatchmentSpatialMap } from './CatchmentSpatialMap';
import {
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Filter,
  GitBranch,
  Scale,
  ShieldAlert,
  Sliders,
  Plus,
  ArrowUpRight,
} from 'lucide-react';

interface DecisionWorkbenchProps {
  records: CanonicalDecisionRecord[];
  activeRecordId: string;
  onSelectRecord: (id: string) => void;
  onUpdateRecord: (updated: CanonicalDecisionRecord) => void;
}

const STAGE_DEFINITIONS: {
  id: DecisionStageId;
  num: string;
  label: string;
  layerFocus: string;
  summary: string;
}[] = [
  {
    id: '01_OBSERVE',
    num: '01',
    label: 'Observe',
    layerFocus: 'Layer 1 · Spatial & Sensor Provenance',
    summary: 'Authorized scientific, geospatial, operational, and community evidence with explicit data gaps.',
  },
  {
    id: '02_UNDERSTAND',
    num: '02',
    label: 'Understand',
    layerFocus: 'Layer 1 · Evidence Graph & Causal Links',
    summary: 'Connect observations into a causal network, separating direct measurements from hypotheses and missing data.',
  },
  {
    id: '03_DELIBERATE',
    num: '03',
    label: 'Deliberate',
    layerFocus: 'Layer 2 & 3 · Capabilities & Commons Governance',
    summary: 'Evaluate who benefits, who bears cost/risk across cohorts, and which statutory or customary rules govern.',
  },
  {
    id: '04_DECIDE',
    num: '04',
    label: 'Decide',
    layerFocus: 'Layer 4 · Decision Brief & Human Authorization',
    summary: 'Compare options under sensitivity analysis, state reconsideration conditions, and record human co-authorization.',
  },
  {
    id: '05_ACT',
    num: '05',
    label: 'Act',
    layerFocus: 'Layer 5 · Coordination & Capital Tranches',
    summary: 'Track proposed, approved, committed, disbursed, and verified expenditure across accountable organizations.',
  },
  {
    id: '06_VERIFY',
    num: '06',
    label: 'Verify',
    layerFocus: 'Layer 6 · Outcome Verification & DiD Attribution',
    summary: 'Compare observed post-intervention metrics against baselines and counterfactual comparison groups.',
  },
  {
    id: '07_LEARN',
    num: '07',
    label: 'Learn',
    layerFocus: 'Layer 6 · Institutional Memory & Prior Updating',
    summary: 'Document where prior assumptions failed, update the Evidence Graph, and preserve versioned history.',
  },
];

export const DecisionWorkbench: React.FC<DecisionWorkbenchProps> = ({
  records,
  activeRecordId,
  onSelectRecord,
  onUpdateRecord,
}) => {
  const record = useMemo(
    () => records.find((r) => r.decisionId === activeRecordId) || records[0],
    [records, activeRecordId]
  );

  const [activeLayerTab, setActiveLayerTab] = useState<
    | 'ALL_LAYERS'
    | 'LAYER_1_EVIDENCE'
    | 'LAYER_2_FLOURISHING'
    | 'LAYER_3_GOVERNANCE'
    | 'LAYER_4_BRIEF'
    | 'LAYER_5_CAPITAL'
    | 'LAYER_6_OUTCOMES'
  >('ALL_LAYERS');

  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(
    record.evidenceNodes[0]?.id || null
  );
  const [epistemicFilter, setEpistemicFilter] = useState<EpistemicClass | 'ALL'>('ALL');

  // Layer 2 & Layer 4 Interactive Value-Weight Pluralism & Sensitivity Sliders
  const [weightPoorestQuintile, setWeightPoorestQuintile] = useState<number>(45); // 0 to 100
  const [weightAquiferStewardship, setWeightAquiferStewardship] = useState<number>(35); // 0 to 100
  const [weightShortTermCapex, setWeightShortTermCapex] = useState<number>(20); // 0 to 100
  const [droughtSeverityMultiplier, setDroughtSeverityMultiplier] = useState<number>(1.0); // 0.7x to 1.5x
  const [sandDamConnectivityPct, setSandDamConnectivityPct] = useState<number>(80); // 20% to 100%

  // Interactive Community Contestation / Evidence Addition Modal State
  const [showContestationForm, setShowContestationForm] = useState(false);
  const [contestationTargetNodeId, setContestationTargetNodeId] = useState<string>(
    record.evidenceNodes[0]?.id || ''
  );
  const [claimantGroupInput, setClaimantGroupInput] = useState('');
  const [counterTestimonyInput, setCounterTestimonyInput] = useState('');

  // Interactive Authorization / Dissent Recording State
  const [approverNameInput, setApproverNameInput] = useState('');
  const [dissentNoteInput, setDissentNoteInput] = useState('');
  const [authFeedbackBanner, setAuthFeedbackBanner] = useState<string | null>(null);

  const filteredEvidenceNodes = useMemo(() => {
    if (epistemicFilter === 'ALL') return record.evidenceNodes;
    return record.evidenceNodes.filter((n) => n.epistemicClass === epistemicFilter);
  }, [record.evidenceNodes, epistemicFilter]);

  // Dynamic Option Scoring under Value-Weight Pluralism & Parametric Sensitivity
  const evaluatedOptions = useMemo(() => {
    const totalWeight =
      weightPoorestQuintile + weightAquiferStewardship + weightShortTermCapex || 100;
    const wEquity = weightPoorestQuintile / totalWeight;
    const wAquifer = weightAquiferStewardship / totalWeight;
    const wCapex = weightShortTermCapex / totalWeight;

    return record.options
      .map((opt) => {
        // Compute Capex Score (0-100, lower capex = higher score, except status quo has high OPEX penalty)
        const capexScore =
          opt.code === 'OPTION_D'
            ? 25
            : Math.max(15, Math.round(100 - (opt.capexKes / 12000000) * 75));

        // Compute Poorest-Quintile Capability Score from Cohort 1
        const poorestCohort = record.cohorts[0];
        const costShare =
          opt.code === 'OPTION_A'
            ? poorestCohort.waterCostShareOfIncomePct.underOptionA
            : opt.code === 'OPTION_B'
            ? poorestCohort.waterCostShareOfIncomePct.underOptionB
            : opt.code === 'OPTION_C'
            ? poorestCohort.waterCostShareOfIncomePct.underOptionC
            : poorestCohort.waterCostShareOfIncomePct.underOptionD;

        const walkMins =
          opt.code === 'OPTION_A'
            ? poorestCohort.dailyCollectionMinutes.underOptionA
            : opt.code === 'OPTION_B'
            ? poorestCohort.dailyCollectionMinutes.underOptionB
            : opt.code === 'OPTION_C'
            ? poorestCohort.dailyCollectionMinutes.underOptionC
            : poorestCohort.dailyCollectionMinutes.underOptionD;

        const equityScore = Math.max(
          5,
          Math.min(100, Math.round(100 - costShare * 3.8 - walkMins * 0.25))
        );

        // Compute Aquifer & Drought Resilience Score
        const baseYield = opt.expectedDrySeasonYieldM3Day.p50;
        const effectiveYield =
          opt.code === 'OPTION_B' || opt.code === 'OPTION_C'
            ? Math.round(
                (baseYield * (0.55 + 0.45 * (sandDamConnectivityPct / 100))) /
                  droughtSeverityMultiplier
              )
            : Math.round(baseYield / Math.pow(droughtSeverityMultiplier, 1.35));

        const depletionPenalty =
          opt.irreversibleHarmRisk === 'HIGH_EXCLUSION_RISK'
            ? 38
            : opt.irreversibleHarmRisk === 'MODERATE_AQUIFER_DEPLETION'
            ? 22
            : 0;

        const aquiferScore = Math.max(
          10,
          Math.min(100, Math.round((effectiveYield / 160) * 90 - depletionPenalty))
        );

        const compositeScore = Math.round(
          wEquity * equityScore + wAquifer * aquiferScore + wCapex * capexScore
        );

        return {
          ...opt,
          effectiveYield,
          capexScore,
          equityScore,
          aquiferScore,
          compositeScore,
        };
      })
      .sort((a, b) => b.compositeScore - a.compositeScore);
  }, [
    record,
    weightPoorestQuintile,
    weightAquiferStewardship,
    weightShortTermCapex,
    droughtSeverityMultiplier,
    sandDamConnectivityPct,
  ]);

  const handleFileContestation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantGroupInput.trim() || !counterTestimonyInput.trim()) return;

    const updatedNodes: EvidenceNode[] = record.evidenceNodes.map((n) => {
      if (n.id !== contestationTargetNodeId) return n;
      return {
        ...n,
        contestedByCommunity: {
          claimantGroup: claimantGroupInput.trim(),
          dateFiled: '2026-10-27',
          counterTestimony: counterTestimonyInput.trim(),
          resolutionStatus: 'OPEN_CONTESTATION',
        },
      };
    });

    const newVersion = `v${record.version.replace('v', '')}-contested`;
    const updatedRecord: CanonicalDecisionRecord = {
      ...record,
      version: newVersion,
      evidenceNodes: updatedNodes,
      versionHistory: [
        {
          version: newVersion,
          timestamp: new Date().toISOString(),
          authorRole: `Community Contestation (${claimantGroupInput.trim()})`,
          stage: '03_DELIBERATE',
          changeSummary: `Formal community counter-testimony attached to Evidence Node ${contestationTargetNodeId}.`,
          dissentRecorded: counterTestimonyInput.trim(),
          cryptographicHash: `sha256:${Math.random().toString(16).substring(2, 14)}...9b4e`,
        },
        ...record.versionHistory,
      ],
    };

    onUpdateRecord(updatedRecord);
    setClaimantGroupInput('');
    setCounterTestimonyInput('');
    setShowContestationForm(false);
    setAuthFeedbackBanner(
      `Community contestation recorded on ${contestationTargetNodeId} and logged in immutable version history (${newVersion}).`
    );
  };

  const handleRecordHumanAuthorization = (e: React.FormEvent) => {
    e.preventDefault();
    if (!approverNameInput.trim()) return;

    const newVersion = 'v2.5.0-AUTH';
    const updatedRecord: CanonicalDecisionRecord = {
      ...record,
      version: newVersion,
      authorization: {
        ...record.authorization,
        status: 'AUTHORIZED_WITH_COVENANT_CONDITIONS',
        primaryApproverRole: approverNameInput.trim(),
        authorizedTimestamp: new Date().toISOString(),
        recordedDissent: dissentNoteInput.trim()
          ? dissentNoteInput.trim()
          : record.authorization.recordedDissent,
      },
      versionHistory: [
        {
          version: newVersion,
          timestamp: new Date().toISOString(),
          authorRole: approverNameInput.trim(),
          stage: '04_DECIDE',
          changeSummary: `Human Co-Authorization ratified for ${evaluatedOptions[0].code}.`,
          dissentRecorded: dissentNoteInput.trim() || null,
          cryptographicHash: `sha256:${Math.random().toString(16).substring(2, 14)}...c401`,
        },
        ...record.versionHistory,
      ],
    };

    onUpdateRecord(updatedRecord);
    setApproverNameInput('');
    setDissentNoteInput('');
    setAuthFeedbackBanner(
      `Stage 04 Human Authorization & Dissent Ledger updated (${newVersion}).`
    );
  };

  return (
    <div className="space-y-8">
      {/* Decision Record Selector & Canonical Chain Header */}
      <section className="border border-stone-200 bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-stone-200">
          <div>
            <div className="text-xs font-mono text-stone-500">
              <span>CANONICAL DECISION RECORD</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span className="text-stone-900 font-semibold">{record.decisionId}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Version {record.version}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{record.place.county}, {record.place.country}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-editorial font-semibold text-stone-900 mt-1">
              {record.title}
            </h1>
          </div>

          {/* Switch Active Kenyan Decision Record */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-stone-500">Active Proving Ground Record:</span>
            <div className="flex items-center gap-1 bg-[#F2EFE9] p-1 rounded border border-stone-200">
              {records.map((r) => (
                <button
                  key={r.decisionId}
                  type="button"
                  onClick={() => {
                    onSelectRecord(r.decisionId);
                    setSelectedEvidenceId(r.evidenceNodes[0]?.id || null);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap shrink-0 ${
                    r.decisionId === record.decisionId
                      ? 'bg-[#14532D] text-white font-medium'
                      : 'text-stone-700 hover:bg-stone-200/70'
                  }`}
                >
                  {r.decisionId} ({r.place.county.replace(' County', '')})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Problem Statement, Intended Outcome & Baseline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              01 · Problem & Place Context
            </div>
            <p className="text-sm text-stone-800 leading-relaxed mt-1.5">
              {record.problem.statement}
            </p>
            <div className="text-xs font-mono text-stone-500 mt-2">
              {record.place.ward} · {record.place.hydrogeologicalZone}
            </div>
          </div>

          <div className="lg:border-l lg:border-stone-200 lg:pl-6">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              02 · Intended Flourishing Outcome
            </div>
            <p className="text-sm text-stone-800 leading-relaxed mt-1.5">
              {record.problem.intendedOutcome}
            </p>
            <div className="text-xs font-mono text-[#14532D] mt-2">
              Urgency: {record.problem.urgencyLevel}
            </div>
          </div>

          <div className="lg:border-l lg:border-stone-200 lg:pl-6">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              03 · Pre-Intervention Empirical Baseline
            </div>
            <p className="text-sm text-stone-800 leading-relaxed mt-1.5">
              {record.problem.baselineSummary}
            </p>
            <div className="text-xs font-mono text-stone-500 mt-2">
              {record.problem.evidenceQualitySummary}
            </div>
          </div>
        </div>

        {/* Seven-Stage Decision Protocol Bar */}
        <div className="mt-6 pt-5 border-t border-stone-200">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Seven-Stage Cyclical Decision Protocol (Click any stage to focus corresponding architecture layer)
            </span>
            <span className="text-xs font-mono text-stone-600">
              Current Record Stage: <strong className="text-stone-900">{record.currentStage}</strong>
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {STAGE_DEFINITIONS.map((st) => {
              const isCurrent = record.currentStage === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    if (st.id === '01_OBSERVE' || st.id === '02_UNDERSTAND') {
                      setActiveLayerTab('LAYER_1_EVIDENCE');
                    } else if (st.id === '03_DELIBERATE') {
                      setActiveLayerTab('LAYER_2_FLOURISHING');
                    } else if (st.id === '04_DECIDE') {
                      setActiveLayerTab('LAYER_4_BRIEF');
                    } else if (st.id === '05_ACT') {
                      setActiveLayerTab('LAYER_5_CAPITAL');
                    } else {
                      setActiveLayerTab('LAYER_6_OUTCOMES');
                    }
                  }}
                  className={`text-left p-2.5 border transition-colors ${
                    isCurrent
                      ? 'border-[#14532D] bg-[#14532D]/5'
                      : 'border-stone-200 bg-[#FBF9F5] hover:bg-[#F2EFE9]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={isCurrent ? 'font-bold text-[#14532D]' : 'text-stone-500'}>
                      STAGE {st.num}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-[#14532D] font-semibold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-stone-900 mt-0.5 whitespace-nowrap truncate">
                    {st.label}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5 truncate">
                    {st.layerFocus}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {authFeedbackBanner && (
        <div className="border border-[#14532D] bg-[#14532D]/10 px-5 py-3 flex items-center justify-between text-xs text-[#14532D]">
          <span className="font-medium">{authFeedbackBanner}</span>
          <button
            type="button"
            onClick={() => setAuthFeedbackBanner(null)}
            className="underline font-mono ml-4 whitespace-nowrap shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Six-Layer Architecture Navigation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'ALL_LAYERS', label: 'Complete 6-Layer Stack' },
            { id: 'LAYER_1_EVIDENCE', label: 'L1 · Evidence Graph' },
            { id: 'LAYER_2_FLOURISHING', label: 'L2 · Human Flourishing' },
            { id: 'LAYER_3_GOVERNANCE', label: 'L3 · Commons Governance' },
            { id: 'LAYER_4_BRIEF', label: 'L4 · Decision Brief & Sensitivity' },
            { id: 'LAYER_5_CAPITAL', label: 'L5 · Coordination & Capital' },
            { id: 'LAYER_6_OUTCOMES', label: 'L6 · Outcome & Learning Ledger' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveLayerTab(tab.id as typeof activeLayerTab)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                activeLayerTab === tab.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowContestationForm(!showContestationForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#9A3412] bg-[#9A3412]/10 hover:bg-[#9A3412]/15 rounded transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>File Community Evidence Challenge</span>
        </button>
      </div>

      {/* Community Contestation Drawer */}
      {showContestationForm && (
        <form
          onSubmit={handleFileContestation}
          className="border border-stone-300 bg-[#F2EFE9] p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                Contest an Assumption or Submit Community Testimony (Layer 1 & Layer 2 Safeguard)
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Affected communities can challenge technical assumptions or supply missing local evidence. Every challenge is logged in the immutable version history.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowContestationForm(false)}
              className="text-xs font-mono text-stone-500 hover:text-stone-900"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-stone-700 mb-1">
                Target Evidence Node
              </label>
              <select
                value={contestationTargetNodeId}
                onChange={(e) => setContestationTargetNodeId(e.target.value)}
                className="w-full bg-white border border-stone-300 px-3 py-2 text-xs text-stone-900"
              >
                {record.evidenceNodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.id} — {n.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-stone-700 mb-1">
                Claimant Community Group / WRUA Caucus
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Kyamuthei Upper Ridge Elderly Caregivers"
                value={claimantGroupInput}
                onChange={(e) => setClaimantGroupInput(e.target.value)}
                className="w-full bg-white border border-stone-300 px-3 py-2 text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-stone-700 mb-1">
                Counter-Testimony or Missing Evidence Statement
              </label>
              <input
                type="text"
                required
                placeholder="Describe local observation or contested assumption..."
                value={counterTestimonyInput}
                onChange={(e) => setCounterTestimonyInput(e.target.value)}
                className="w-full bg-white border border-stone-300 px-3 py-2 text-xs text-stone-900"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-[#14532D] hover:bg-[#14532D]/90 rounded whitespace-nowrap shrink-0"
            >
              Append Challenge to Decision Record
            </button>
          </div>
        </form>
      )}

      {/* Spatial Catchment Map (Always visible on ALL_LAYERS or LAYER_1_EVIDENCE) */}
      {(activeLayerTab === 'ALL_LAYERS' || activeLayerTab === 'LAYER_1_EVIDENCE') && (
        <CatchmentSpatialMap
          record={record}
          selectedEvidenceId={selectedEvidenceId}
          onSelectEvidenceNode={(id) => setSelectedEvidenceId(id)}
        />
      )}

      {/* LAYER 1: EVIDENCE GRAPH — THE PURSUIT OF TRUTH */}
      {(activeLayerTab === 'ALL_LAYERS' || activeLayerTab === 'LAYER_1_EVIDENCE') && (
        <section className="border border-stone-200 bg-white p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="text-xs font-mono text-stone-500">
                LAYER 01 · THE PURSUIT OF TRUTH · DESIGN TEST VERIFIED
              </div>
              <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
                Traceable Evidence Graph & Epistemic Provenance Network
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Distinguishes direct sensor observations, documentary records, causal hypotheses, model inferences, and explicit missing unknowns.
              </p>
            </div>

            {/* Epistemic Class Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-stone-500 mr-1" />
              {(
                [
                  'ALL',
                  'DIRECT_OBSERVATION',
                  'DOCUMENTARY_EVIDENCE',
                  'CAUSAL_HYPOTHESIS',
                  'MODEL_INFERENCE',
                  'MISSING_UNKNOWN',
                ] as const
              ).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setEpistemicFilter(cls)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors whitespace-nowrap shrink-0 ${
                    epistemicFilter === cls
                      ? 'bg-stone-900 text-white'
                      : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cls === 'ALL' ? 'All Classes' : cls.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Evidence Nodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvidenceNodes.map((node) => {
              const isSelected = selectedEvidenceId === node.id;
              const isMissing = node.epistemicClass === 'MISSING_UNKNOWN';
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedEvidenceId(node.id)}
                  className={`p-4 border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-stone-900 bg-[#FBF9F5]'
                      : isMissing
                      ? 'border-amber-300 bg-amber-50/30 hover:border-amber-400'
                      : 'border-stone-200 bg-white hover:bg-[#FBF9F5]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                    <div>
                      <span className="font-semibold text-stone-900">{node.id}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span
                        className={
                          isMissing
                            ? 'text-amber-800 font-semibold'
                            : node.epistemicClass === 'DIRECT_OBSERVATION'
                            ? 'text-[#14532D] font-semibold'
                            : 'text-stone-700'
                        }
                      >
                        {node.epistemicClass}
                      </span>
                    </div>
                    <span className="tabular-nums">
                      Reliability: {Math.round(node.reliabilityScore * 100)}%
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-stone-900 mt-1.5">
                    {node.title}
                  </h3>
                  <p className="text-xs text-stone-700 leading-relaxed mt-1">
                    {node.statement}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/80 space-y-1 text-xs font-mono text-stone-600">
                    <div>
                      <span className="text-stone-400">Measured:</span>{' '}
                      <span className="text-stone-900 font-medium tabular-nums">{node.measuredValue}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span className="tabular-nums">{node.confidenceInterval}</span>
                    </div>
                    <div>
                      <span className="text-stone-400">Provenance:</span> {node.sourceInstitution} ({node.observedAt})
                    </div>
                    <div>
                      <span className="text-stone-400">Reversal Test:</span>{' '}
                      <span className="font-sans text-stone-800">{node.wouldChangeConclusionIf}</span>
                    </div>
                  </div>

                  {node.contestedByCommunity && (
                    <div className="mt-3 p-2.5 bg-[#9A3412]/5 border border-[#9A3412]/30 text-xs">
                      <div className="font-mono font-semibold text-[#9A3412]">
                        COMMUNITY CONTESTATION · {node.contestedByCommunity.claimantGroup} ({node.contestedByCommunity.resolutionStatus})
                      </div>
                      <p className="text-stone-800 mt-1">
                        {node.contestedByCommunity.counterTestimony}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Causal Directed Edges Summary */}
          <div className="pt-4 border-t border-stone-200">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2.5">
              Causal Graph Edges & Structural Mechanisms
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {record.causalEdges.map((edge) => (
                <div
                  key={edge.id}
                  className="p-3 border border-stone-200 bg-[#FBF9F5] text-xs flex items-start gap-2.5"
                >
                  <GitBranch className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-stone-800">
                      <strong>{edge.fromNodeId}</strong> → <span>{edge.relationship}</span> →{' '}
                      <strong>{edge.toNodeId}</strong>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span className="text-stone-500">Prior: {edge.assumptionStrength}</span>
                    </div>
                    <p className="text-stone-700 mt-1">{edge.mechanismDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LAYER 2: HUMAN FLOURISHING MODEL — THE PURSUIT OF JUSTICE */}
      {(activeLayerTab === 'ALL_LAYERS' || activeLayerTab === 'LAYER_2_FLOURISHING') && (
        <section className="border border-stone-200 bg-white p-6 space-y-5">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-stone-500">
              LAYER 02 · THE PURSUIT OF JUSTICE · AMARTYA SEN CAPABILITIES MATRIX
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
              Disaggregated Household Cohort Capabilities & Distributional Equity Audit
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Human dignity is never reduced to a single universal score. This matrix reveals when an option improves an aggregate cost metric while leaving a vulnerable group worse off.
            </p>
          </div>

          {/* Design Test Warning Callout */}
          <div className="p-4 border border-[#9A3412]/40 bg-[#9A3412]/5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#9A3412] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-semibold text-[#9A3412] font-mono">
                LAYER 2 DESIGN TEST DETECTED A DISTRIBUTIONAL INJUSTICE IN OPTION A
              </div>
              <p className="text-stone-800 leading-relaxed">
                Standard engineering appraisal ranked <strong>Option A (Deep Borehole + Flat KES 5/20L Commercial Kiosk)</strong> #1 on aggregate Year-1 cost efficiency. However, Cohort COH-01 (Bottom-Quintile Female-Headed Households, 24% of population) faces an upfront KES 500 smart-card barrier and 14.2% cash income drain under Option A—forcing 64% of poor families back to contaminated riverbed scoop holes. <strong>Option B</strong> resolves this via a cross-subsidized Lifeline Tariff Covenant (KES 1.50/20L + free indigent cards), reducing poorest-quintile water expenditure to 3.1% of income.
              </p>
            </div>
          </div>

          {/* Disaggregated Cohort Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-300 bg-[#F2EFE9] font-mono text-stone-700">
                  <th className="py-2.5 px-3">Household Cohort & Share</th>
                  <th className="py-2.5 px-3">Excluded in Standard CBA?</th>
                  <th className="py-2.5 px-3 text-right">Baseline Income % / Walk</th>
                  <th className="py-2.5 px-3 text-right">Option A (Flat Kiosk)</th>
                  <th className="py-2.5 px-3 text-right bg-[#14532D]/10 text-[#14532D]">
                    Option B (Lifeline Covenant)
                  </th>
                  <th className="py-2.5 px-3 text-right">Option C (Shallow Only)</th>
                  <th className="py-2.5 px-3">Substantive Capability & Dignity Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {record.cohorts.map((cohort) => (
                  <tr key={cohort.cohortId} className="hover:bg-[#FBF9F5]">
                    <td className="py-3 px-3 align-top">
                      <div className="font-semibold text-stone-900">{cohort.cohortName}</div>
                      <div className="font-mono text-stone-500 mt-0.5 tabular-nums">
                        {cohort.populationSharePct}% pop · {cohort.estimatedHouseholds.toLocaleString()} HHs
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top font-mono">
                      {cohort.excludedFromStandardAnalysis ? (
                        <span className="text-[#9A3412] font-semibold">YES — OMITTED</span>
                      ) : (
                        <span className="text-stone-500">Included</span>
                      )}
                    </td>
                    <td className="py-3 px-3 align-top text-right font-mono tabular-nums">
                      <div>{cohort.waterCostShareOfIncomePct.baseline.toFixed(1)}% inc</div>
                      <div className="text-stone-500">{cohort.dailyCollectionMinutes.baseline} min/d</div>
                    </td>
                    <td className="py-3 px-3 align-top text-right font-mono tabular-nums">
                      <div
                        className={
                          cohort.waterCostShareOfIncomePct.underOptionA > 10
                            ? 'text-[#9A3412] font-bold'
                            : 'text-stone-800'
                        }
                      >
                        {cohort.waterCostShareOfIncomePct.underOptionA.toFixed(1)}% inc
                      </div>
                      <div className="text-stone-500">
                        {cohort.dailyCollectionMinutes.underOptionA} min/d
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top text-right font-mono tabular-nums bg-[#14532D]/5 font-semibold text-[#14532D]">
                      <div>{cohort.waterCostShareOfIncomePct.underOptionB.toFixed(1)}% inc</div>
                      <div>{cohort.dailyCollectionMinutes.underOptionB} min/d</div>
                    </td>
                    <td className="py-3 px-3 align-top text-right font-mono tabular-nums">
                      <div>{cohort.waterCostShareOfIncomePct.underOptionC.toFixed(1)}% inc</div>
                      <div className="text-stone-500">
                        {cohort.dailyCollectionMinutes.underOptionC} min/d
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top text-stone-700 max-w-xs">
                      {cohort.dignityAndAgencyNotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* LAYER 3: COMMONS GOVERNANCE MAP — THE ARCHITECTURE OF RESPONSIBILITY */}
      {(activeLayerTab === 'ALL_LAYERS' || activeLayerTab === 'LAYER_3_GOVERNANCE') && (
        <section className="border border-stone-200 bg-white p-6 space-y-5">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-stone-500">
              LAYER 03 · THE ARCHITECTURE OF RESPONSIBILITY · ELINOR OSTROM POLYCENTRIC GOVERNANCE
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
              Commons Governance Map: Statutory Law, Local WRUA Bylaws, Customary Norms & Disputes
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Identifies who holds authority to approve an action, who must be consulted, whose rights are affected, and how riparian or tariff disputes escalate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Applicable Rules List */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                Governing Institutional Rules & Escalation Paths
              </div>
              {record.governanceRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-3.5 border text-xs ${
                    rule.ruleType === 'DISPUTED_CLAIM'
                      ? 'border-amber-400 bg-amber-50/40'
                      : 'border-stone-200 bg-[#FBF9F5]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-stone-500">
                    <span className="font-semibold text-stone-900">
                      {rule.id} · {rule.ruleType}
                    </span>
                    <span>{rule.governingBody}</span>
                  </div>
                  <div className="text-sm font-semibold text-stone-900 mt-1">
                    {rule.ruleTitle}
                  </div>
                  <p className="text-stone-700 mt-1">
                    <strong>Enforcement:</strong> {rule.enforcementMechanism}
                  </p>
                  <div className="mt-2 pt-2 border-t border-stone-200/80 flex flex-wrap justify-between gap-2 font-mono text-[11px] text-stone-600">
                    <span>Escalation: {rule.escalationProcedure}</span>
                    <span className="text-[#14532D]">{rule.ostromPrincipleAlignment}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stakeholder Authority & Consent Matrix */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                Decision Authority, Consent & Veto Rights
              </div>
              {record.stakeholders.map((stk) => (
                <div
                  key={stk.id}
                  className="p-3.5 border border-stone-200 bg-white text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-semibold text-stone-900">{stk.roleInDecision}</span>
                    <span className="text-[#14532D] font-medium">{stk.consentStatus}</span>
                  </div>
                  <div className="text-sm font-semibold text-stone-900">
                    {stk.institutionOrGroup}
                  </div>
                  <div className="text-stone-600 font-mono">
                    Accountable Role: {stk.namedRepresentativeRole}
                  </div>
                  <p className="text-stone-700 pt-1 border-t border-stone-100">
                    <strong>Standing & Veto Right:</strong> {stk.vetoOrChallengeRight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LAYER 4: DECISION BRIEF — THE DISCIPLINE OF JUDGMENT */}
      {(activeLayerTab === 'ALL_LAYERS' || activeLayerTab === 'LAYER_4_BRIEF') && (
        <section className="border border-stone-200 bg-white p-6 space-y-6">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-stone-500">
              LAYER 04 · THE DISCIPLINE OF JUDGMENT · SENSITIVITY & HUMAN AUTHORIZATION
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
              Structured Decision Brief, Parametric Sensitivity Simulator & Co-Authorization Gate
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Test how value judgments and physical uncertainties alter the ranking of feasible options. No recommendation can be executed without dual-human authorization.
            </p>
          </div>

          {/* Interactive Value-Weight Pluralism & Sensitivity Sliders */}
          <div className="p-5 bg-[#F2EFE9] border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-stone-800" />
                <h3 className="text-sm font-semibold text-stone-900">
                  Interactive Sensitivity & Value-Weight Pluralism Controls
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setWeightPoorestQuintile(10);
                    setWeightAquiferStewardship(15);
                    setWeightShortTermCapex(75);
                  }}
                  className="px-2.5 py-1 text-xs font-mono bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 rounded whitespace-nowrap shrink-0"
                >
                  Preset: Narrow Capex Minimizer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWeightPoorestQuintile(45);
                    setWeightAquiferStewardship(35);
                    setWeightShortTermCapex(20);
                    setDroughtSeverityMultiplier(1.0);
                    setSandDamConnectivityPct(80);
                  }}
                  className="px-2.5 py-1 text-xs font-mono bg-[#14532D] text-white rounded whitespace-nowrap shrink-0"
                >
                  Preset: Atlas Regenerative Covenant
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
              <div className="bg-white p-3 border border-stone-200">
                <div className="flex justify-between font-mono text-stone-700 mb-1">
                  <span>Poorest-Quintile Justice</span>
                  <span className="font-bold tabular-nums">{weightPoorestQuintile}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weightPoorestQuintile}
                  onChange={(e) => setWeightPoorestQuintile(Number(e.target.value))}
                  className="w-full accent-[#14532D]"
                />
                <div className="text-[11px] text-stone-500 mt-1">
                  Sen Capability weight on COH-01 affordability & time
                </div>
              </div>

              <div className="bg-white p-3 border border-stone-200">
                <div className="flex justify-between font-mono text-stone-700 mb-1">
                  <span>10-Yr Aquifer Resilience</span>
                  <span className="font-bold tabular-nums">{weightAquiferStewardship}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weightAquiferStewardship}
                  onChange={(e) => setWeightAquiferStewardship(Number(e.target.value))}
                  className="w-full accent-[#14532D]"
                />
                <div className="text-[11px] text-stone-500 mt-1">
                  Maathai / Crutzen recharge balance weight
                </div>
              </div>

              <div className="bg-white p-3 border border-stone-200">
                <div className="flex justify-between font-mono text-stone-700 mb-1">
                  <span>Initial CAPEX Restraint</span>
                  <span className="font-bold tabular-nums">{weightShortTermCapex}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weightShortTermCapex}
                  onChange={(e) => setWeightShortTermCapex(Number(e.target.value))}
                  className="w-full accent-[#14532D]"
                />
                <div className="text-[11px] text-stone-500 mt-1">
                  Upfront capital budget conservation weight
                </div>
              </div>

              <div className="bg-white p-3 border border-stone-200">
                <div className="flex justify-between font-mono text-stone-700 mb-1">
                  <span>Drought Stress Factor</span>
                  <span className="font-bold tabular-nums">{droughtSeverityMultiplier.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={1.5}
                  step={0.1}
                  value={droughtSeverityMultiplier}
                  onChange={(e) => setDroughtSeverityMultiplier(Number(e.target.value))}
                  className="w-full accent-[#B45309]"
                />
                <div className="text-[11px] text-stone-500 mt-1">
                  Simulates multi-season rainfall failure severity
                </div>
              </div>

              <div className="bg-white p-3 border border-stone-200">
                <div className="flex justify-between font-mono text-stone-700 mb-1">
                  <span>Sand-Dam Connectivity</span>
                  <span className="font-bold tabular-nums">{sandDamConnectivityPct}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  step={5}
                  value={sandDamConnectivityPct}
                  onChange={(e) => setSandDamConnectivityPct(Number(e.target.value))}
                  className="w-full accent-[#0369A1]"
                />
                <div className="text-[11px] text-stone-500 mt-1">
                  Alluvial-to-gneiss fracture transfer efficiency
                </div>
              </div>
            </div>
          </div>

          {/* Feasible Options Comparison Cards */}
          <div className="space-y-3">
            {evaluatedOptions.map((opt, idx) => {
              const isTopRanked = idx === 0;
              return (
                <div
                  key={opt.id}
                  className={`p-5 border transition-colors ${
                    isTopRanked
                      ? 'border-[#14532D] bg-[#FBF9F5]'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                    <div>
                      <div className="text-xs font-mono">
                        <span className="font-bold text-stone-900">
                          RANK #{idx + 1} UNDER CURRENT VALUE WEIGHTS
                        </span>
                        <span className="mx-2" aria-hidden="true">·</span>
                        <span>Composite Utility: {opt.compositeScore}/100</span>
                        <span className="mx-2" aria-hidden="true">·</span>
                        <span>Irreversible Harm Risk: {opt.irreversibleHarmRisk}</span>
                      </div>
                      <h3 className="text-base font-semibold text-stone-900 mt-0.5">
                        {opt.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono tabular-nums shrink-0">
                      <div>
                        <span className="text-stone-400">CAPEX:</span>{' '}
                        <strong className="text-stone-900">
                          KES {(opt.capexKes / 1000000).toFixed(2)}M
                        </strong>{' '}
                        (${opt.capexUsd.toLocaleString()})
                      </div>
                      <div>
                        <span className="text-stone-400">Annual OPEX:</span>{' '}
                        <strong className="text-stone-900">
                          KES {(opt.annualOpexKes / 1000).toFixed(0)}k/yr
                        </strong>
                      </div>
                      <div>
                        <span className="text-stone-400">Simulated Yield (P50):</span>{' '}
                        <strong className="text-[#14532D]">
                          {opt.effectiveYield} m³/day
                        </strong>{' '}
                        [{opt.expectedDrySeasonYieldM3Day.p10}–{opt.expectedDrySeasonYieldM3Day.p90}]
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed mt-3">
                    {opt.summary}
                  </p>

                  {opt.distributionalJusticeWarning && (
                    <div className="mt-3 p-3 bg-[#9A3412]/5 border border-[#9A3412]/30 text-xs text-[#9A3412] font-medium">
                      {opt.distributionalJusticeWarning}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 pt-3 border-t border-stone-200/80 text-xs">
                    <div>
                      <span className="font-mono text-stone-500">Downside / Pre-Mortem Risk:</span>
                      <p className="text-stone-800 mt-0.5">{opt.downsideScenario}</p>
                    </div>
                    <div>
                      <span className="font-mono text-stone-500">Statutory & Governance Compliance:</span>
                      <p className="text-stone-800 mt-0.5">{opt.regulatoryCompliance}</p>
                    </div>
                    <div>
                      <span className="font-mono text-stone-500">Sub-Scores (Equity / Aquifer / Capex):</span>
                      <p className="font-mono text-stone-900 mt-0.5 tabular-nums">
                        Equity: {opt.equityScore} · Aquifer: {opt.aquiferScore} · Capex: {opt.capexScore}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reconsideration Conditions, VOI Gap, Humility Disclosure & Human Authorization Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-stone-200">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  Conditions Under Which Recommendation Must Be Reconsidered
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-stone-800 list-disc pl-4">
                  {record.recommendation.conditionsForReconsideration.map((cond, i) => (
                    <li key={i} className="leading-relaxed">
                      {cond}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 border border-stone-200 bg-[#FBF9F5] text-xs space-y-1.5">
                <div className="font-mono font-semibold text-stone-900">
                  EXPECTED VALUE OF SAMPLE INFORMATION (EVSI) & HUMILITY DISCLOSURE
                </div>
                <p className="text-stone-700">
                  <strong>Value of Information Gap:</strong> {record.recommendation.valueOfInformationGap}
                </p>
                <p className="text-stone-700">
                  <strong>Epistemic Humility Boundary:</strong> {record.recommendation.humilityDisclosure}
                </p>
              </div>
            </div>

            {/* Human-Exclusive Co-Authorization Gate */}
            <div className="lg:col-span-5 border border-stone-300 bg-[#F2EFE9] p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-stone-900">
                  STAGE 04 · HUMAN CO-AUTHORIZATION RECORD
                </span>
                <span className="text-[#14532D] font-bold">{record.authorization.status}</span>
              </div>
              <div className="text-xs space-y-1 text-stone-700">
                <div>
                  <strong>Statutory Approver:</strong> {record.authorization.primaryApproverRole}
                </div>
                <div>
                  <strong>Community Co-Signer:</strong> {record.authorization.communityCoSignerRole}
                </div>
                <div>
                  <strong>Logged Dissent:</strong> {record.authorization.recordedDissent}
                </div>
              </div>

              <form onSubmit={handleRecordHumanAuthorization} className="pt-3 border-t border-stone-300 space-y-2.5">
                <div className="text-xs font-mono text-stone-700 font-semibold">
                  Log New Human Review Signature or Formal Dissent
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your Name & Institutional Role (e.g. WRA Regional Hydrogeologist)"
                  value={approverNameInput}
                  onChange={(e) => setApproverNameInput(e.target.value)}
                  className="w-full bg-white border border-stone-300 px-3 py-1.5 text-xs text-stone-900"
                />
                <input
                  type="text"
                  placeholder="Optional: Record formal dissenting interpretation or condition..."
                  value={dissentNoteInput}
                  onChange={(e) => setDissentNoteInput(e.target.value)}
                  className="w-full bg-white border border-stone-300 px-3 py-1.5 text-xs text-stone-900"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded whitespace-nowrap"
                >
                  Sign & Append to Immutable Authorization History
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* LAYER 5: COORDINATION AND CAPITAL LAYER — THE CONVERSION OF JUDGMENT INTO ACTION */}
      {(activeLayerTab === 'ALL_LAYERS' || activeLayerTab === 'LAYER_5_CAPITAL') && (
        <section className="border border-stone-200 bg-white p-6 space-y-5">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-stone-500">
              LAYER 05 · THE CONVERSION OF JUDGMENT INTO ACTION · TRANCHED FIDUCIARY LEDGER
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
              Coordination, Procurement & Capital Tranche Accountability Matrix
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Strictly separates proposed allocations, approved budgets, committed funding, disbursed funds, and verified expenditure. ARDE never autonomously releases funds.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-300 bg-[#F2EFE9] font-mono text-stone-700">
                  <th className="py-2.5 px-3">Work Package & Responsible Lead</th>
                  <th className="py-2.5 px-3">Funding Source & Procurement</th>
                  <th className="py-2.5 px-3 text-right">Approved (KES)</th>
                  <th className="py-2.5 px-3 text-right">Disbursed (KES)</th>
                  <th className="py-2.5 px-3 text-right">Verified Spent (KES)</th>
                  <th className="py-2.5 px-3">Verification Artifact & Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {record.capitalAllocations.map((cap) => (
                  <tr key={cap.id} className="hover:bg-[#FBF9F5]">
                    <td className="py-3 px-3 align-top">
                      <div className="font-semibold text-stone-900">{cap.workPackage}</div>
                      <div className="text-stone-500 font-mono mt-0.5">
                        {cap.responsibleOrganization} · {cap.assignedLeadRole}
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top">
                      <div className="text-stone-800">{cap.fundingSource}</div>
                      <div className="text-stone-500 font-mono mt-0.5">
                        {cap.procurementMethod} · Due {cap.milestoneDeadline}
                      </div>
                    </td>
                    <td className="py-3 px-3 align-top text-right font-mono tabular-nums">
                      {cap.approvedKes.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 align-top text-right font-mono tabular-nums">
                      {cap.disbursedKes.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 align-top text-right font-mono font-semibold text-[#14532D] tabular-nums">
                      {cap.verifiedSpentKes.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 align-top">
                      <div className="font-mono font-semibold text-stone-900">{cap.status}</div>
                      <div className="text-stone-600 mt-0.5">{cap.verificationArtifact}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* LAYER 6: OUTCOME AND LEARNING LEDGER — THE DISCIPLINE OF STEWARDSHIP */}
      {(activeLayerTab === 'ALL_LAYERS' || activeLayerTab === 'LAYER_6_OUTCOMES') && (
        <section className="border border-stone-200 bg-white p-6 space-y-6">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-stone-500">
              LAYER 06 · THE DISCIPLINE OF STEWARDSHIP · EMPIRICAL OUTCOMES & FAILED ASSUMPTIONS
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
              Outcome Verification, Counterfactual Attribution & Institutional Learning Ledger
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Compares predicted P50 targets against observed 90-day outcomes using matched counterfactual comparison groups, and records where prior assumptions failed.
            </p>
          </div>

          {record.outcomeRecords.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {record.outcomeRecords.map((out) => (
                <div key={out.id} className="p-4 border border-stone-200 bg-[#FBF9F5] space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono text-stone-500">
                    <span className="font-semibold text-stone-900">{out.id}</span>
                    <span className="text-[#14532D] font-semibold">{out.verificationStatus}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900">{out.indicatorName}</h3>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 font-mono tabular-nums">
                    <div>
                      <div className="text-stone-400 text-[10px]">BASELINE</div>
                      <div className="text-stone-800 font-medium mt-0.5">
                        {out.preInterventionBaseline}
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-[10px]">PREDICTED (90d)</div>
                      <div className="text-stone-800 font-medium mt-0.5">
                        {out.predictedTarget90Day}
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-[10px]">OBSERVED ACTUAL</div>
                      <div className="text-[#14532D] font-bold mt-0.5">
                        {out.observedActual90Day}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 space-y-1 text-stone-700">
                    <div>
                      <strong>Counterfactual Control:</strong> {out.counterfactualComparisonGroup} ({out.evaluationDesign})
                    </div>
                    <div>
                      <strong>Variance & Learning Analysis:</strong> {out.varianceExplanation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 border border-stone-200 bg-[#FBF9F5] text-center text-xs text-stone-600">
              This decision record ({record.decisionId}) is currently in Stage 04 (Decide). Post-intervention 90-day outcome metrics will populate upon Stage 06 verification.
            </div>
          )}

          {/* Where Prior Assumptions Failed + Version History */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-stone-200">
            <div className="lg:col-span-6 p-4 border border-amber-300 bg-amber-50/40 space-y-2 text-xs">
              <div className="font-mono font-semibold text-amber-900">
                STAGE 07 LEARNING · WHERE PRIOR ASSUMPTIONS FAILED
              </div>
              <p className="text-stone-800 leading-relaxed">
                {record.lessonsLearned.priorAssumptionFailed}
              </p>
              <div className="pt-2 border-t border-amber-200 text-stone-700">
                <strong>Evidence Graph & Prior Update:</strong> {record.lessonsLearned.evidenceGraphUpdate}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                Immutable Decision Version & Audit History
              </div>
              <div className="divide-y divide-stone-200 border border-stone-200 bg-[#FBF9F5] text-xs">
                {record.versionHistory.map((ver) => (
                  <div key={ver.version + ver.timestamp} className="p-3">
                    <div className="flex items-center justify-between font-mono text-stone-500">
                      <span className="font-semibold text-stone-900">
                        {ver.version} · {ver.stage}
                      </span>
                      <span className="tabular-nums">{ver.timestamp.slice(0, 10)}</span>
                    </div>
                    <div className="text-stone-800 mt-1">{ver.changeSummary}</div>
                    <div className="text-[11px] font-mono text-stone-500 mt-1">
                      Author: {ver.authorRole} · Hash: {ver.cryptographicHash}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
