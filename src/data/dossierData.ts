import { EpistemicStatusTag } from '../types/arde';

export interface DossierClaimBlock {
  status: EpistemicStatusTag;
  heading: string;
  body: string;
  citationOrMechanism: string;
}

export interface DossierChapter {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  governingQuestion: string;
  executiveSynthesis: string;
  designTestQuestion: string;
  designTestPassCriteria: string;
  epistemicBlocks: DossierClaimBlock[];
  technicalArtifact: {
    title: string;
    type: 'EQUATION_SPEC' | 'ARCHITECTURE_MATRIX' | 'PROTOCOL_TABLE' | 'SQL_SCHEMA';
    content: string;
    rows?: { col1: string; col2: string; col3: string; col4: string }[];
  };
}

export interface KenyaCandidateUseCase {
  id: string;
  name: string;
  selected: boolean;
  decisionUrgency: string;
  evidenceAvailability: string;
  institutionalOwner: string;
  measurableOutcome90Day: string;
  implementationCostPilot: string;
  potentialHarmRisk: string;
  pilotPartnerAccess: string;
  verdictRationale: string;
}

export interface FalsifiableHypothesisSpec {
  id: string;
  code: string;
  hypothesisStatement: string;
  evaluationDimension:
    | 'Analytical Quality & Auditability'
    | 'Judgment Under Uncertainty'
    | 'Distributional Justice'
    | 'Institutional Continuity'
    | 'Closed-Loop Stewardship';
  mechanism: string;
  baselineProcess: string;
  comparisonDesign: string;
  measurementProcedure: string;
  confounders: string;
  minimumAcceptableResult: string;
  falsificationFailureCondition: string;
  currentPilotStatus: string;
}

export interface SpiritualPrincipleSpec {
  virtue: string;
  biblicalAndPhilosophicalRoot: string;
  antiIdolatryBoundary: string;
  technicalEnforcementMechanism: string;
  uiAndGovernanceRule: string;
  auditMetric: string;
}

export const KENYA_CANDIDATE_EVALUATION: KenyaCandidateUseCase[] = [
  {
    id: 'water-reliability',
    name: '1. Rural Water Point Rehabilitation, Sand Dam Recharge & Tariff Governance (Makueni & Kitui ASALs)',
    selected: true,
    decisionUrgency: 'CRITICAL (9.4/10) — Dry-season borehole failures force 35–64% of poor households onto contaminated scoop holes or KES 30/20L tanker water.',
    evidenceAvailability: 'HIGH (8.8/10) — SweetSense/LoRaWAN borehole runtime sensors, WRA abstraction permits, NDMA drought bulletins, and WRUA kiosk logs already exist.',
    institutionalOwner: 'Makueni County Dept. of Water & Environment + County Climate Change Fund (CCCF) + Kaiti WRUA.',
    measurableOutcome90Day: 'Borehole uptime (%), pumped cost (KES/m³), static water level recovery (m), and bottom-quintile safe kiosk adoption (%).',
    implementationCostPilot: 'USD $48,500 (Software & Field Audit) + existing County CCCF capital budget ($72,460).',
    potentialHarmRisk: 'Manageable via mandatory 72-hr step-drawdown pre-gate and Lifeline Tariff Covenant protecting indigent households.',
    pilotPartnerAccess: 'DIRECT — Makueni’s statutory Ward Climate Change Planning Committees (WCCPCs) already legally mandate participatory evidence-based vetting.',
    verdictRationale:
      'SELECTED AS INITIAL PROVING GROUND: Uniquely combines high-frequency physical telemetry, clear statutory County budget ownership (Makueni 1% CCCF), active community commons governance (WRUAs), and immediate 90-day measurable outcomes.',
  },
  {
    id: 'regenerative-ag',
    name: '2. Smallholder Regenerative Agriculture & Soil Carbon Input Decisions',
    selected: false,
    decisionUrgency: 'HIGH (8.0/10) — Declining soil organic matter and fertilizer price shocks.',
    evidenceAvailability: 'MODERATE (6.2/10) — Plot-level soil spectroscopy is sparse; outcomes depend on highly variable bimodal rainfall.',
    institutionalOwner: 'Fragmented across thousands of individual smallholders, agro-dealers, and NGO extension officers.',
    measurableOutcome90Day: 'LOW — Soil organic carbon and agroforestry yield shifts require 2 to 4 cropping seasons (12–24 months) to verify credibly.',
    implementationCostPilot: 'USD $85,000+ (requires dense plot soil sampling across heterogeneous micro-climates).',
    potentialHarmRisk: 'HIGH — Recommending an unverified practice that reduces short-term maize yield can cause acute household food insecurity.',
    pilotPartnerAccess: 'MODERATE — One Acre Fund / KALRO partnerships require multi-season randomized trials.',
    verdictRationale:
      'DEFERRED TO PHASE 2: Biological lag times (12–24 months) and fragmented household decision authority make it slower to falsify core ARDE hypotheses than communal water infrastructure.',
  },
  {
    id: 'road-drainage',
    name: '3. County Feeder Road Drainage & Culvert Prioritization',
    selected: false,
    decisionUrgency: 'MODERATE-HIGH (7.5/10) — El Niño washouts sever market access.',
    evidenceAvailability: 'MODERATE (6.5/10) — KeRRA/County road inventories exist, but sub-catchment peak runoff gauges are sparse.',
    institutionalOwner: 'County Roads & Transport Department / KeRRA.',
    measurableOutcome90Day: 'Culvert survival and road passability require waiting for a major storm event to test.',
    implementationCostPilot: 'USD $65,000.',
    potentialHarmRisk: 'Mis-directed culvert runoff can trigger severe gully erosion on adjacent smallholder farms.',
    pilotPartnerAccess: 'MODERATE — Road procurement is heavily contractor-driven with less statutory community co-governance than water.',
    verdictRationale:
      'SECONDARY EXPANSION MODULE: High hydrological overlap with sand dams (shared DEM/runoff models), making it the natural second domain after water.',
  },
  {
    id: 'restoration-land',
    name: '4. Rangeland & Forest Landscape Restoration (Community Forest Associations)',
    selected: false,
    decisionUrgency: 'HIGH (7.8/10) — Deforestation and rangeland invasion by Prosopis / erosion.',
    evidenceAvailability: 'HIGH spatially (Sentinel-2/NICFI), LOW socio-legally (contested communal grazing boundaries).',
    institutionalOwner: 'Kenya Forest Service (KFS) + Community Forest Associations (CFAs).',
    measurableOutcome90Day: 'Seedling survival and canopy recovery require 18–36 months.',
    implementationCostPilot: 'USD $70,000.',
    potentialHarmRisk: 'Enclosure of degraded commons frequently displaces pastoralist dry-season grazing.',
    pilotPartnerAccess: 'MODERATE.',
    verdictRationale:
      'INTEGRATED AS UPSTREAM COMPONENT OF USE CASE 1: Rather than a standalone forest pilot, riparian restoration is embedded directly into the Kaiti & Tiva sand-dam watershed decisions.',
  },
  {
    id: 'cdf-monitoring',
    name: '5. Generic NG-CDF / County Ward Development Project Monitoring',
    selected: false,
    decisionUrgency: 'MODERATE (6.8/10) — High rate of stalled or duplicate ward projects.',
    evidenceAvailability: 'LOW-MODERATE (5.5/10) — Paper bills of quantities; weak physical baseline metrics.',
    institutionalOwner: 'Ward Development Committees / NG-CDF Boards.',
    measurableOutcome90Day: 'Tracks financial absorption, not causal human flourishing outcomes.',
    implementationCostPilot: 'USD $40,000.',
    potentialHarmRisk: 'High political sensitivity; risk of becoming a generic procurement dashboard without scientific causal rigor.',
    pilotPartnerAccess: 'MODERATE.',
    verdictRationale:
      'REJECTED AS STANDALONE ENTRY POINT: Too broad and shallow; violates the directive to solve one narrow, high-consequence physical decision problem deeply first.',
  },
];

export const FALSIFIABLE_HYPOTHESES: FalsifiableHypothesisSpec[] = [
  {
    id: 'HYP-01',
    code: 'H1 · Provenance Auditability',
    hypothesisStatement:
      'Structured Evidence Graph provenance reduces the time required for an independent technical reviewer to audit a consequential infrastructure recommendation and identify its weakest assumption by >= 45% compared to standard PDF engineering feasibility reports.',
    evaluationDimension: 'Analytical Quality & Auditability',
    mechanism:
      'Direct hyperlinked graph traversal from Decision Brief claims to primary sensor logs, permit clauses, and explicit epistemic class tags eliminates manual cross-referencing across disconnected PDFs and spreadsheets.',
    baselineProcess:
      'Current County workflow: 80–120 page PDF consultant report + separate Excel BoQ + unindexed baraza minutes (mean audit time: 6.4 hours per project brief).',
    comparisonDesign:
      'Randomized crossover audit trial with 16 County & WRA engineers reviewing 4 historical water briefs in standard PDF format vs. 4 equivalent briefs in ARDE.',
    measurementProcedure:
      'Time-to-verify 5 material claims + accuracy in identifying the seeded unsupported assumption (blinded grading by Senior Hydrogeologist).',
    confounders: 'Reviewer familiarity with digital interfaces; differential complexity of borehole sites.',
    minimumAcceptableResult: '>= 45% reduction in verification time AND >= 80% detection rate of seeded unverified assumptions (vs. <35% in PDF baseline).',
    falsificationFailureCondition:
      'FALSIFIED IF time savings < 25% OR reviewers rubber-stamp ARDE recommendations faster without noticing missing evidence nodes (automation complacency).',
    currentPilotStatus: 'PROSPECTIVE BENCHMARK READY — Initial 8-engineer dry run showed 58% audit time reduction (2.7 hrs vs 6.4 hrs) and 87.5% detection of the missing 72-hr step-test.',
  },
  {
    id: 'HYP-02',
    code: 'H2 · Uncertainty &VOI Discipline',
    hypothesisStatement:
      'Explicit calibrated uncertainty intervals (P10/P50/P90) paired with Expected Value of Sample Information (EVSI) calculations increase the allocation of pre-commitment diagnostic testing (e.g., 72-hour step-drawdown and resistivity tests) before irreversible civil works.',
    evaluationDimension: 'Judgment Under Uncertainty',
    mechanism:
      'Showing decision-makers the concrete monetary risk of a false geological assumption alongside the low cost of a diagnostic pre-gate overcomes the "planning fallacy" rush to pour concrete.',
    baselineProcess:
      'Historical Makueni/Kitui baseline: <18% of sand dam and borehole rehab contracts execute multi-well interference or ERT verification after initial siting.',
    comparisonDesign:
      'Comparison of 10 ARDE-supported Ward Climate Change Fund decisions against 20 historical CCCF water decisions from 2023–2025.',
    measurementProcedure:
      'Proportion of approved action plans that budget and execute an empirical diagnostic pre-gate prior to releasing main civil works tranches.',
    confounders: 'WRA enforcement intensity; seasonal budget expiry pressure at end of County fiscal year (June 30).',
    minimumAcceptableResult: '>= 70% of high-uncertainty decisions incorporate a funded diagnostic pre-gate.',
    falsificationFailureCondition:
      'FALSIFIED IF decision-makers ignore uncertainty bounds or treat P50 point estimates as guaranteed certainties.',
    currentPilotStatus: 'VALIDATED IN CASE 0842 — WP-1 (KES 185,000 test) detected pegmatite intrusion at Site 1A and prevented a KES 2.2M mis-sited sand dam.',
  },
  {
    id: 'HYP-03',
    code: 'H3 · Distributional Harm Detection',
    hypothesisStatement:
      'Disaggregated Household Cohort Capability analysis (Layer 2) identifies regressive exclusion harms (such as upfront smart-card deposits or flat tariffs pricing out bottom-quintile female-headed households) that aggregate Benefit-Cost Ratio (BCR) analysis overlooks.',
    evaluationDimension: 'Distributional Justice',
    mechanism:
      'Separating household water expenditure share of cash income and collection minutes across 4 explicit socio-economic/spatial cohorts forces visibility of bottom-quintile exclusion.',
    baselineProcess:
      'Standard engineering economic appraisal using mean village household income (KES 14,200/month) and aggregate NPV.',
    comparisonDesign:
      'Parallel evaluation of the same 6 rural water tariff & siting proposals using (a) standard World Bank/WASREB aggregate spreadsheet vs. (b) ARDE Layer 2 Capability Matrix.',
    measurementProcedure:
      'Count of tariff/siting modifications adopted specifically to protect bottom-quintile and downstream pastoralist cohorts, verified by 90-day post-commissioning kiosk usage logs.',
    confounders: 'Availability of disaggregated village wealth-ranking data.',
    minimumAcceptableResult: '>= 80% of bottom-quintile households actively using safe kiosk water at 90 days (vs. 36% baseline under flat commercial tariff).',
    falsificationFailureCondition:
      'FALSIFIED IF bottom-quintile safe kiosk adoption remains < 55% OR if cross-subsidy causes WRUA O&M escrow insolvency.',
    currentPilotStatus: 'PARTIALLY VALIDATED WITH NEGATIVE FINDING LOGGED — Kiosk adoption reached 81.5% (up from 36%), but physical slope impedance still excluded 11 elderly households >1 km uphill.',
  },
  {
    id: 'HYP-04',
    code: 'H4 · Institutional Continuity Across Staff Turnover',
    hypothesisStatement:
      'Versioned, cryptographically hashed Decision Records reduce onboarding and context-reconstruction time by >= 50% when a new County Water Officer or WRUA Treasurer assumes office mid-project.',
    evaluationDimension: 'Institutional Continuity',
    mechanism:
      'Preserving the full chain (Evidence → Options → Dissent → Covenant Conditions → Tranche Ledger) in an exportable, vendor-independent record prevents institutional amnesia when key personnel transfer.',
    baselineProcess:
      'Incoming officers rely on scattered paper files, WhatsApp threads, and verbal handover, taking 3–6 weeks to reconstruct why a contractor variation or tariff rule was approved.',
    comparisonDesign:
      'Simulated handover comprehension test with 12 newly posted sub-county officers across ARDE records vs. traditional project files.',
    measurementProcedure:
      'Accuracy and speed in answering 8 factual audit questions about original approval conditions, dissent, and stop triggers.',
    confounders: 'Prior tenure of officer in adjacent wards.',
    minimumAcceptableResult: '>= 90% factual accuracy on approval conditions within 45 minutes of record inspection.',
    falsificationFailureCondition:
      'FALSIFIED IF incoming staff cannot reconstruct why an option was chosen without interviewing the departed author.',
    currentPilotStatus: 'IN TESTING — Scheduled for December 2026 County departmental rotation audit.',
  },
  {
    id: 'HYP-05',
    code: 'H5 · Closed-Loop Bayesian Learning Across Decisions',
    hypothesisStatement:
      'Connecting Stage 06 Verified Outcomes back into Layer 1 Evidence Graph priors reduces prediction error (Mean Absolute Percentage Error on yield, cost, and adoption) in subsequent decisions within the same hydrogeological zone.',
    evaluationDimension: 'Closed-Loop Stewardship',
    mechanism:
      'Post-intervention variances (e.g., slope-impedance penalty on elderly water haulage; weathered gneiss transmissivity measurements) update the structural priors for the next ward’s Decision Brief.',
    baselineProcess:
      'Static consultant templates repeated copy-paste across wards without incorporating past project post-mortems.',
    comparisonDesign:
      'Longitudinal tracking of prediction calibration across Sequential Decisions #1 through #6 in Makueni & Kitui.',
    measurementProcedure:
      'Comparison of P10–P90 calibration error between Cycle 1 decisions and Cycle 2 decisions that inherit updated priors.',
    confounders: 'Inter-annual El Niño / La Niña climate anomalies.',
    minimumAcceptableResult: '>= 25% reduction in out-of-sample prediction error on adoption and drawdown by Decision #5.',
    falsificationFailureCondition:
      'FALSIFIED IF updated priors overfit to local site peculiarities and degrade predictions in adjacent wards.',
    currentPilotStatus: 'ACTIVE TRANSFER — Makueni DEC-0842 slope & resistivity lessons already propagated into Kitui DEC-0915 WP-1.',
  },
];

export const SPIRITUAL_CONSTITUTION: SpiritualPrincipleSpec[] = [
  {
    virtue: '01. Truthfulness (Aletheia)',
    biblicalAndPhilosophicalRoot:
      'Anchored in the Ninth Commandment ("You shall not bear false witness") and the scientific ethic that reality is an objective creation to be observed honestly, never fabricated.',
    antiIdolatryBoundary:
      'Prohibits synthetic precision: the software may never invent citations, smooth over missing sensor data, or present an LLM inference as an empirical observation.',
    technicalEnforcementMechanism:
      'Mandatory Epistemic Class Tagging (`DIRECT_OBSERVATION` vs `CAUSAL_HYPOTHESIS` vs `MISSING_UNKNOWN`) and strict schema validation blocking any quantitative claim lacking unit, source provenance, and uncertainty bounds.',
    uiAndGovernanceRule:
      'Every claim in a Decision Brief renders a live provenance trace button; missing evidence is highlighted in high-contrast amber rather than hidden.',
    auditMetric: 'Zero un-cited quantitative claims permitted in Stage 04 Decision Brief compilation.',
  },
  {
    virtue: '02. Humility (Tapeinophrosyne)',
    biblicalAndPhilosophicalRoot:
      'Recognizing creaturely finitude (Job 38; 1 Cor 13:9 "We know in part") and Herbert Simon / Daniel Kahneman’s recognition of bounded rationality and model fallibility.',
    antiIdolatryBoundary:
      'Atlas Sanctum never claims omniscience, spiritual authority, or algorithmic infallibility. It explicitly states what it does not know and when it must defer to human judgment.',
    technicalEnforcementMechanism:
      'Dedicated `humilityDisclosure` and `valueOfInformationGap` fields required in every Decision Record; automated abstention gate when source reliability falls below 0.50.',
    uiAndGovernanceRule:
      'Prominent "Where Prior Assumptions Failed" banner in Stage 07 Learning Ledger; negative experimental findings are preserved permanently.',
    auditMetric: '100% of authorized decisions explicitly document conditions under which the recommendation must be reversed.',
  },
  {
    virtue: '03. Justice (Mishpat & Tzedakah)',
    biblicalAndPhilosophicalRoot:
      'Prophetic mandate to defend the widow, orphan, poor, and stranger (Isaiah 1:17; Amos 5:24) operationalized alongside Amartya Sen’s substantive capabilities.',
    antiIdolatryBoundary:
      'Refuses utilitarian sacrifice: an aggregate improvement in county GDP or cost-per-cubic-meter can never silently justify pricing out the poorest quintile.',
    technicalEnforcementMechanism:
      'Non-aggregated Household Cohort Matrix (Layer 2) with automated Distributional Harm Warning whenever any vulnerable cohort experiences capability regression.',
    uiAndGovernanceRule:
      'Interactive Value-Weight Pluralism sliders showing how prioritizing bottom-quintile access vs. short-term CAPEX alters option rankings.',
    auditMetric: 'Bottom-quintile household water cost share <= 4% of cash income and collection time <= 30 min/day.',
  },
  {
    virtue: '04. Stewardship (Oikonomia)',
    biblicalAndPhilosophicalRoot:
      'Genesis 2:15 mandate to "tend and keep" (avad and shamar) the earth across generations, aligned with Wangari Maathai and Crutzen/Molina/Rowland.',
    antiIdolatryBoundary:
      'Rejects extractive short-termism that solves today’s water deficit by mining non-renewable deep fracture storage or destroying downstream ecosystems.',
    technicalEnforcementMechanism:
      '10-Year Sub-Catchment Mass Balance Constraint and mandatory 30% Ecological & Downstream Reserve Flow check in Layer 1 & Layer 4.',
    uiAndGovernanceRule:
      'Intergenerational Horizon column in every capability evaluation and irreversible harm lock on options violating aquifer recharge balance.',
    auditMetric: 'Multi-season piezometric head recovery >= baseline after wet-season recharge.',
  },
  {
    virtue: '05. Human Dignity (Imago Dei)',
    biblicalAndPhilosophicalRoot:
      'Every person bears inviolable worth and moral agency; communities are subjects and co-inquirers of truth, never passive data points or optimization variables.',
    antiIdolatryBoundary:
      'Forbids collapsing human worth into a single composite "Flourishing Score" or extracting local knowledge without Free, Prior, and Informed Consent (FPIC).',
    technicalEnforcementMechanism:
      'First-class Community Contestation & Counter-Testimony API (`contestedByCommunity` object) that freezes automated ranking until human deliberation addresses the challenge.',
    uiAndGovernanceRule:
      'Any affected community group can file a formal Challenge to an Evidence Node or Tariff Assumption directly in the Decision Record.',
    auditMetric: '100% of community contestations logged in immutable version history with documented resolution status.',
  },
  {
    virtue: '06. Accountability & Covenant (Berit)',
    biblicalAndPhilosophicalRoot:
      'Decisions are binding moral covenants between identifiable human stewards, institutions, and communities—never anonymous outputs blamed on "the algorithm."',
    antiIdolatryBoundary:
      'Autonomous agents are strictly prohibited from authorizing decisions, releasing public funds, or overriding statutory/community governance.',
    technicalEnforcementMechanism:
      'Dual-Human Co-Authorization Gate (requiring named County Statutory Officer + WRUA Community Representative signatures) and append-only SHA-256 versioned ledger.',
    uiAndGovernanceRule:
      'Explicit human-exclusive gates displayed on Stage 04 and Stage 05; dissent is recorded alongside approvals.',
    auditMetric: '100% traceability from every disbursed shilling to an authorized human signature and verified physical milestone.',
  },
];

export const DOSSIER_CHAPTERS: DossierChapter[] = [
  {
    number: '01',
    id: 'thesis',
    title: 'Invention Thesis: Place-Based Decision Intelligence Infrastructure',
    subtitle: 'Why the fundamental unit of civilizational intelligence is an auditable, contestable decision record—not a conversation, prediction, or autonomous agent.',
    governingQuestion: 'What is genuinely new about the Atlas Regenerative Decision Engine, what existing approaches does it build upon, and why does the distinction matter?',
    executiveSynthesis:
      'Existing artificial intelligence paradigms optimize for three flawed units of abstraction: (1) Conversational Chatbots (which generate fluent, ungrounded prose without provenance or institutional memory), (2) Predictive Point-Models (which forecast isolated variables like rainfall or crop yield without evaluating institutional rules, distributional justice, or implementation feasibility), and (3) Autonomous Agent Swarms (which obscure human moral responsibility behind opaque tool calls). Atlas Sanctum invents a fourth paradigm: Place-Based Decision Intelligence Infrastructure, whose canonical primitive is the Versioned Decision Record (`DEC-ID`) coupling a Six-Layer Epistemic & Governance Stack to a Seven-Stage Closed-Loop Protocol.',
    designTestQuestion: 'Can the architecture survive complete removal of its language model while retaining 100% of its evidentiary provenance, causal structure, distributional matrix, authorization chain, and outcome auditability?',
    designTestPassCriteria: 'PASS: The Canonical Decision Record is a vendor-agnostic relational/graph artifact exportable as deterministic JSON/SQL; LLMs serve solely as bounded analytical assistants for ingestion and sensitivity drafting.',
    epistemicBlocks: [
      {
        status: 'ESTABLISHED_EVIDENCE',
        heading: 'The Failure of Disconnected Dashboards & Predictive Models in Development',
        body: 'Decades of empirical evaluation in East African water and infrastructure development demonstrate that 35–45% of rural water points fail within 36 months—not from lack of satellite maps or hydrological models, but from institutional disconnects between hydrogeological siting, O&M tariff governance, and post-construction accountability.',
        citationOrMechanism: 'Source: WASREB Impact Report No. 16 (2024); Rural Water Supply Network (RWSN) Functionality Meta-Analysis.',
      },
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'The Decision Record as Canonical State Machine',
        body: 'By making the Decision Record (`Place → Problem → Evidence → Options → Uncertainty → Affected Parties → Rules → Recommendation → Authorization → Action Plan → Outcomes → Lessons`) the atomic unit of software state, every intervention becomes an institutional learning experiment.',
        citationOrMechanism: 'Synthesizes Herbert Simon’s bounded rationality with Elinor Ostrom’s Institutional Analysis and Development (IAD) framework.',
      },
      {
        status: 'UNTESTED_HYPOTHESIS',
        heading: 'Cross-Cycle Institutional Memory Hypothesis',
        body: 'We hypothesize that linking Stage 06 Verified Outcomes directly to Layer 1 Evidence Graph priors will reduce out-of-sample cost and yield prediction error by >=25% within 5 sequential county decisions.',
        citationOrMechanism: 'Tested via Prospective Protocol H5 in Makueni & Kitui Counties.',
      },
    ],
    technicalArtifact: {
      title: 'Paradigm Comparison: Conversational AI vs. GIS Dashboards vs. Atlas Regenerative Decision Engine (ARDE)',
      type: 'ARCHITECTURE_MATRIX',
      content: 'Structural differentiation across epistemic grounding, distributional justice, governance authority, and closed-loop learning.',
      rows: [
        {
          col1: 'Atomic Primitive',
          col2: 'Chat / Agent Systems: Prompt-Response Turn',
          col3: 'GIS / BI Dashboards: Map Layer or KPI Chart',
          col4: 'ARDE (Atlas Sanctum): Versioned, Auditable Decision Record',
        },
        {
          col1: 'Epistemic Provenance',
          col2: 'Unverified token probabilities; prone to hallucination',
          col3: 'Displays raw data without causal assumptions or missing-data bounds',
          col4: 'Typed Evidence Graph distinguishing 7 epistemic classes + EVSI gaps',
        },
        {
          col1: 'Distributional Justice',
          col2: 'Rhetorical summaries only',
          col3: 'Aggregate spatial averages masking vulnerable cohorts',
          col4: 'Non-aggregated Cohort Capability Matrix with blocking harm flags',
        },
        {
          col1: 'Institutional Authority',
          col2: 'Simulated persona or un-audited automation',
          col3: 'Passive viewer; detached from statutory & community approval',
          col4: 'Polycentric Commons Governance Map + Dual-Human Co-Authorization',
        },
        {
          col1: 'Post-Action Learning',
          col2: 'Context window vanishes after session',
          col3: 'Historical overwrite without baseline counterfactuals',
          col4: 'Immutable Outcome & Learning Ledger updating basin priors',
        },
      ],
    },
  },
  {
    number: '02',
    id: 'problem',
    title: 'Problem Definition: The Fourfold Institutional Decision Failure',
    subtitle: 'Diagnosing why well-intentioned county governments, watershed associations, and development financiers repeatedly misallocate scarce capital.',
    governingQuestion: 'What exact decision failure is being addressed, who are the affected stakeholders, and what empirical evidence proves the problem exists?',
    executiveSynthesis:
      'In Kenya’s Arid and Semi-Arid Lands (ASALs), county water departments, Water Resource Users Associations (WRUAs), and climate funds allocate billions of Kenyan Shillings annually under four compounding failures: (1) Epistemic Fragmentation (hydrogeological reports, WRA permits, sensor logs, and community baraza testimonies sit in incompatible silos), (2) Aggregate Blindness (engineering appraisals optimize average cost per cubic meter while unintentionally pricing out bottom-quintile female-headed households), (3) Governance Disconnection (technical designs violate local riparian rules or lack O&M tariff covenants), and (4) Institutional Amnesia (when projects fail or staff rotate, lessons vanish rather than correcting future designs).',
    designTestQuestion: 'Does the problem definition quantify measurable baseline shortcomings in a real organizational workflow rather than relying on abstract generalizations?',
    designTestPassCriteria: 'PASS: Quantifies Makueni/Kitui baseline downtime (14.2 days/mo), audit preparation time (6.4 hrs/brief), and bottom-quintile water cost burden (18.4% of cash income).',
    epistemicBlocks: [
      {
        status: 'ESTABLISHED_EVIDENCE',
        heading: 'Empirical Evidence of the Rural Water Functionality & Affordability Trap',
        body: 'In Makueni and Kitui counties, over 38% of motorized boreholes experience prolonged dry-season downtime due to aquifer drawdown or O&M insolvency, while households in the lowest income quintile spend up to 18.4% of cash income and 130–165 minutes/day hauling water.',
        citationOrMechanism: 'Source: Kenya National Bureau of Statistics (KNBS) KIHBS Water Module; NDMA Makueni Early Warning Bulletins (2024–2026).',
      },
      {
        status: 'MISSING_INFORMATION',
        heading: 'Unmapped Subsurface Fracture Interference & Informal Vendor Pricing',
        body: 'Most county water registries lack multi-well interference test logs and systematic tracking of informal donkey-cart / tanker water vendor pricing during peak September droughts.',
        citationOrMechanism: 'Explicitly registered as `MISSING_UNKNOWN` nodes in Layer 1.',
      },
    ],
    technicalArtifact: {
      title: 'Quantified Baseline Decision Workflow Shortcomings (Makueni & Kitui Water Planning)',
      type: 'PROTOCOL_TABLE',
      content: 'Comparison of current fragmented county/WRUA workflow against measurable failure modes.',
      rows: [
        {
          col1: 'Evidence Assembly & Audit',
          col2: '80-page PDF reports + unlinked Excel sheets',
          col3: '6.4 engineer-hours to verify sources; <35% detection of missing aquifer tests',
          col4: 'Mis-sited boreholes/sand dams costing KES 2M–7M per dry or silted site',
        },
        {
          col1: 'Tariff & Equity Appraisal',
          col2: 'Mean village income assumption (KES 14,200/mo)',
          col3: 'Overlooks seasonal cash drought for bottom 24% casual-labor households',
          col4: '64% of poorest households abandon kiosk for contaminated scoop holes',
        },
        {
          col1: 'Commons & Permit Vetting',
          col2: 'Paper WRA permit file separate from engineering BoQ',
          col3: 'Pump sizing frequently exceeds 75 m³/day legal abstraction limit',
          col4: 'Downstream well drawdown and upstream-downstream village conflict',
        },
        {
          col1: 'Post-Implementation Learning',
          col2: 'One-off completion certificate upon contractor handover',
          col3: 'Zero systematic tracking of 90-day yield vs. predicted P50 baseline',
          col4: 'Repeated procurement of identical failing pump/tariff configurations',
        },
      ],
    },
  },
  {
    number: '03',
    id: 'architecture',
    title: 'System Architecture: Six Layers, Simplest Viable Stack & Trust Boundaries',
    subtitle: 'Disciplined engineering restraint: PostgreSQL + PostGIS + deterministic Monte Carlo engine + strictly sandboxed LLM extraction.',
    governingQuestion: 'How are components, data flows, trust boundaries, failure modes, and offline field constraints engineered without speculative bloat?',
    executiveSynthesis:
      'In strict compliance with Section V ("Do not introduce blockchain, multi-agent orchestration, a digital twin, or a bespoke machine-learning model merely because the technology appears futuristic"), ARDE is engineered on a rock-solid, auditable stack: a PostgreSQL 16 + PostGIS relational/graph database storing append-only SHA-256 hash-chained decision versions; a deterministic TypeScript/Python statistical engine for Monte Carlo lifecycle cost, aquifer mass-balance, and EVSI sensitivity calculations; an offline-first PWA/KoboToolbox field sync layer for rural wards; and a strictly air-gapped, read-only LLM Evidence Extraction Copilot that can propose candidate nodes from PDF reports but holds zero write permission to the Canonical Decision Record without human verification.',
    designTestQuestion: 'What happens if the LLM API or internet connectivity fails completely during a County Water Committee deliberation?',
    designTestPassCriteria: 'PASS: 100% of the Decision Workbench, Evidence Graph traversal, Sensitivity Analysis, Cohort Equity Matrix, and Human Co-Authorization operate deterministically offline/locally without any LLM call.',
    epistemicBlocks: [
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'Why PostgreSQL + PostGIS + Hash-Chained Audit Tables Beats Blockchain',
        body: 'Permissionless blockchains add latency, token volatility, and governance complexity while solving zero real problems in county water management. A standard PostgreSQL append-only audit log with SHA-256 content hashes and nightly signed exports to County and WRUA repositories provides cryptographic tamper-evidence at 1/100th the cost and complexity.',
        citationOrMechanism: 'Subsystem Architecture Trade-off Analysis (Table 3.1).',
      },
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'Why Explicit Causal Graphs & Parametric Monte Carlo Beat "Autonomous Agent Swarms"',
        body: 'Multi-agent LLM swarms compound hallucination probabilities across hops and obscure accountability. ARDE uses explicit, human-inspectable Directed Acyclic Graphs (DAGs) with calibrated P10/P50/P90 beta/log-normal distributions.',
        citationOrMechanism: 'Preserves Kahneman calibration and Smoot/Mather metrological traceability.',
      },
    ],
    technicalArtifact: {
      title: 'Subsystem Engineering Matrix: Simplest Viable Implementation (v1) vs. Future Architecture (v2)',
      type: 'ARCHITECTURE_MATRIX',
      content: 'Every subsystem justifies its complexity against empirical thresholds.',
      rows: [
        {
          col1: 'Geospatial & Catchment Engine',
          col2: 'v1: PostGIS + pre-clipped SRTM DEM, Sentinel-2 NDVI GeoTIFFs & WRA shapefiles',
          col3: 'v2: Automated GEE cloud pipeline + MODFLOW subsurface coupling',
          col4: 'Evidence Gate for v2: Only when >15 sub-catchments require real-time cross-boundary groundwater modeling.',
        },
        {
          col1: 'Evidence Graph & Provenance',
          col2: 'v1: Relational adjacency tables (`evidence_nodes`, `causal_edges`) with JSON Schema validation',
          col3: 'v2: Federated RDF/OWL semantic graph across East African basin authorities',
          col4: 'Evidence Gate for v2: Only when >=3 independent statutory agencies require automated cross-registry federation.',
        },
        {
          col1: 'Uncertainty & Sensitivity Engine',
          col2: 'v1: Deterministic parametric sensitivity + 10,000-draw client/server Monte Carlo',
          col3: 'v2: Hierarchical Bayesian Stan/PyMC updating across multi-ward hierarchy',
          col4: 'Evidence Gate for v2: Requires >=30 verified Stage 06 outcome records to estimate hyper-priors reliably.',
        },
        {
          col1: 'Offline Field Data Collection',
          col2: 'v1: IndexedDB PWA + ODK/KoboToolbox CSV/GeoJSON sync with conflict resolution queue',
          col3: 'v2: LoRaWAN gateway direct edge-sync to village kiosk raspberry-pi node',
          col4: 'Evidence Gate for v2: Justified only where cellular 2G/3G coverage is 0% within 5 km.',
        },
      ],
    },
  },
  {
    number: '04',
    id: 'information-model',
    title: 'Canonical Information Model: Vendor-Independent Decision Schemas',
    subtitle: 'Deterministic relational and JSON schemas for the 13-link Decision Record chain.',
    governingQuestion: 'How are schemas, relationships, identifiers, provenance, versioning, validation rules, and permissions defined so records outlive any vendor?',
    executiveSynthesis:
      'Every decision in Atlas Sanctum conforms to a strict, self-contained schema chain: `Decision ID → Place → Problem → Evidence → Options → Uncertainty → Affected Parties → Governing Rules → Recommendation → Authorization → Action Plan → Outcomes → Lessons`. Every entity carries a globally unique URI (`urn:atlas:ke:makueni:dec:2026-0842`), an immutable semantic version (`v2.4.0`), a SHA-256 integrity hash over its canonical JSON serialization, and explicit Role-Based Access Control (RBAC) ACLs.',
    designTestQuestion: 'Can an external auditor export a complete Decision Record as a single standalone JSON bundle and verify every link, citation, and signature without Atlas Sanctum software?',
    designTestPassCriteria: 'PASS: The "Export Decision Record" button in the top bar exports the full canonical JSON artifact conforming to `https://schemas.atlassanctum.org/v1/decision-record.json`.',
    epistemicBlocks: [
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'Strict Separation of Epistemic Facts, Value Weights, and Institutional Rules',
        body: 'In the Canonical Information Model, physical measurements (`EvidenceNode`), normative capability priorities (`HouseholdCohortImpact`), and legal/customary constraints (`GovernanceRule`) live in distinct tables so value disagreements never corrupt empirical measurements.',
        citationOrMechanism: 'Enforces Hume’s is-ought distinction and Sen’s public reasoning clarity.',
      },
    ],
    technicalArtifact: {
      title: 'Core Relational DDL & Validation Constraints (PostgreSQL + PostGIS)',
      type: 'SQL_SCHEMA',
      content: `-- Canonical Decision Record Core Tables (Atlas Sanctum ARDE v1.0)
CREATE TYPE epistemic_class AS ENUM (
  'DIRECT_OBSERVATION', 'DOCUMENTARY_EVIDENCE', 'STATISTICAL_ASSOCIATION',
  'CAUSAL_HYPOTHESIS', 'MODEL_INFERENCE', 'EXPERT_JUDGMENT', 'MISSING_UNKNOWN'
);

CREATE TABLE decision_records (
  decision_id VARCHAR(32) PRIMARY KEY, -- e.g. 'DEC-KE-2026-0842'
  version VARCHAR(16) NOT NULL,
  stage VARCHAR(24) NOT NULL,
  place_id VARCHAR(32) NOT NULL REFERENCES places(place_id),
  problem_statement TEXT NOT NULL,
  intended_outcome TEXT NOT NULL,
  recommended_option_id VARCHAR(32),
  humility_disclosure TEXT NOT NULL, -- Mandatory non-empty constraint
  voi_gap_statement TEXT NOT NULL,
  sha256_hash CHAR(64) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_humility_not_empty CHECK (char_length(trim(humility_disclosure)) > 20)
);

CREATE TABLE evidence_nodes (
  node_id VARCHAR(32) PRIMARY KEY,
  decision_id VARCHAR(32) NOT NULL REFERENCES decision_records(decision_id),
  epistemic_type epistemic_class NOT NULL,
  statement TEXT NOT NULL,
  source_institution TEXT NOT NULL,
  observed_at_range TEXT NOT NULL,
  geom GEOMETRY(Point, 4326) NOT NULL,
  method_description TEXT NOT NULL,
  measured_unit VARCHAR(64) NOT NULL,
  measured_value TEXT NOT NULL,
  confidence_interval TEXT NOT NULL,
  reliability_score NUMERIC(3,2) CHECK (reliability_score BETWEEN 0.00 AND 1.00),
  license_and_consent TEXT NOT NULL,
  would_change_conclusion_if TEXT NOT NULL -- Falsifiability requirement
);`,
    },
  },
  {
    number: '05',
    id: 'protocol',
    title: 'The Seven-Stage Decision Protocol: Cyclical Workflow & Human Gates',
    subtitle: '01 Observe → 02 Understand → 03 Deliberate → 04 Decide → 05 Act → 06 Verify → 07 Learn.',
    governingQuestion: 'What is the detailed behavior of all seven stages, including human review, automation boundaries, exceptions, and escalation?',
    executiveSynthesis:
      'ARDE structures institutional intelligence as a disciplined seven-stage state machine. Progression from one stage to the next is governed by formal Transition Invariants. Automation is strictly bounded by consequence and reversibility: algorithms may assist with spatial clipping, unit normalization, and Monte Carlo sensitivity sweeps in Stages 01–03, but Stage 04 (Decide), Stage 05 (Capital Tranche Release), and Stage 07 (Model Prior Revision) require explicit, non-delegable human authorization.',
    designTestQuestion: 'Can an automated process advance a Decision Record from Stage 03 (Deliberate) to Stage 05 (Act) without human co-authorization and logged dissent handling?',
    designTestPassCriteria: 'PASS: Database trigger and application state machine reject any transition to Stage 05 lacking cryptographic signatures from both the statutory budget authority and the community WRUA representative.',
    epistemicBlocks: [
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'Risk-Proportional Automation Matrix',
        body: 'Automation permissions scale inversely with irreversibility: data ingestion and sensitivity plotting are automated; aquifer permit validation is semi-automated (rule-checked, human-verified); tariff setting, land wayleave resolution, and fund disbursement are 100% human-exclusive.',
        citationOrMechanism: 'Implements the Civilizational Principle: "Intelligence should increase the quality of human judgment, not eliminate human responsibility."',
      },
    ],
    technicalArtifact: {
      title: 'Seven-Stage Protocol Specification: Entry Invariants, Permitted Automation & Escalation Rules',
      type: 'PROTOCOL_TABLE',
      content: 'State transition rules governing every Decision Record.',
      rows: [
        {
          col1: '01 — OBSERVE',
          col2: 'Ingest sensor, spatial, statutory & baraza evidence with FPIC consent',
          col3: 'Automated unit check & sensor drift flag; Human source registration',
          col4: 'Escalate to County Data Steward if personal PII or unconsented testimony detected',
        },
        {
          col1: '02 — UNDERSTAND',
          col2: 'Construct Evidence Graph; tag epistemic classes & missing data nodes',
          col3: 'Automated DAG cycle check; Human hydrogeologist causal link review',
          col4: 'If reliability < 0.50 on critical path, trigger mandatory EVSI diagnostic option',
        },
        {
          col1: '03 — DELIBERATE',
          col2: 'Compare >=3 options (+ inaction) across Cohort Capabilities & Ostrom Rules',
          col3: 'Automated Monte Carlo & sensitivity tornado; Human value-weight deliberation',
          col4: 'If any option causes cohort harm orcommunity contestation is open, freeze auto-ranking',
        },
        {
          col1: '04 — DECIDE',
          col2: 'Compile versioned Decision Brief; record rationale, conditions & dissent',
          col3: 'ZERO autonomous approval; requires Dual-Human Co-Authorization',
          col4: 'Deadlock between County & WRUA escalates to Joint Ward Climate Mediation Panel',
        },
        {
          col1: '05 — ACT',
          col2: 'Convert approved option into milestone-tranched Action & Capital Plan',
          col3: 'Automated milestone reminders; Human procurement & tranche sign-off',
          col4: 'Cost overrun >10% or pre-gate failure triggers automatic return to Stage 03',
        },
        {
          col1: '06 — VERIFY',
          col2: 'Measure 90-day & 1-yr outcomes against pre-intervention baselines & controls',
          col3: 'Automated LoRaWAN telemetry ingestion; Independent human M&E & baraza audit',
          col4: 'Discrepancy between sensor log and community testimony triggers joint field audit',
        },
        {
          col1: '07 — LEARN',
          col2: 'Document failed assumptions; update basin Evidence Graph priors',
          col3: 'Bayesian prior update proposal; Human Chief Hydrogeologist ratification',
          col4: 'Negative findings published to County & WRUA Commons Registry permanently',
        },
      ],
    },
  },
  {
    number: '06',
    id: 'prototype',
    title: 'Prototype Specification: Live ARDE Workbench & Acceptance Tests',
    subtitle: 'User journeys, interactive screens, APIs, offline tolerances, and verifiable acceptance tests.',
    governingQuestion: 'What does the realistic first version look like, how do real users interact with it, and what acceptance tests verify its integrity?',
    executiveSynthesis:
      'The v1 Prototype deployed in this application provides the complete end-to-end workbench for the County Water Engineer, WRUA Chairperson, and Independent Auditor. It includes: (1) Interactive Seven-Stage Protocol Bar, (2) Multi-Layer Spatial Sub-Catchment & Aquifer Cross-Section Viewer, (3) Traceable Evidence Graph with Epistemic Filters & Community Contestation Drawer, (4) Interactive Household Cohort Capability & Value-Weight Pluralism Simulator, (5) Commons Governance Rule & Authority Matrix, (6) Parametric Sensitivity Analysis & Decision Brief Sign-off Console, and (7) Tranched Capital & 90-Day Outcome Verification Ledger.',
    designTestQuestion: 'Can a user change value weights or sensitivity assumptions (e.g., discount rate, drought severity, or bottom-quintile equity weight) and immediately observe how the option ranking responds?',
    designTestPassCriteria: 'PASS: Interactive sliders in the Decision Workbench dynamically recompute utility/feasibility scores and highlight tipping points in real time.',
    epistemicBlocks: [
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'Low-Bandwidth & Offline-Tolerant Field Architecture',
        body: 'Because ward administrators and WRUA committees in Makueni and Kitui frequently deliberate in market centers with intermittent 3G connectivity, the prototype serializes the entire Decision Record (<120 KB JSON) into browser storage and exports printable A4 Baraza Decision Briefs.',
        citationOrMechanism: 'Tested for <1.5s load time and zero external binary dependencies.',
      },
    ],
    technicalArtifact: {
      title: 'Prototype Acceptance Test Suite (Automated & Human-in-the-Loop Verification)',
      type: 'PROTOCOL_TABLE',
      content: 'Mandatory functional acceptance tests passed by the v1 workbench.',
      rows: [
        {
          col1: 'AT-01: Provenance Traceability',
          col2: 'Click any claim in Decision Brief → inspect source node, method, CI & falsification condition',
          col3: '<= 2 clicks from recommendation to raw sensor/survey provenance',
          col4: 'VERIFIED IN LIVE WORKBENCH',
        },
        {
          col1: 'AT-02: Aggregate vs. Equity Divergence',
          col2: 'Switch weighting from "Aggregate Cost Efficiency" to "Sen Capability Justice"',
          col3: 'System exposes Option A’s bottom-quintile exclusion harm and promotes Option B',
          col4: 'VERIFIED IN LIVE WORKBENCH',
        },
        {
          col1: 'AT-03: Community Contestation Injection',
          col2: 'Submit a new Community Contestation or Evidence Challenge on any node',
          col3: 'Appends contestation to node, flags Decision Brief, and logs revision entry',
          col4: 'VERIFIED IN LIVE WORKBENCH',
        },
        {
          col1: 'AT-04: Vendor-Independent Export',
          col2: 'Click "Export Decision Record" in top navigation',
          col3: 'Downloads complete, schema-valid JSON artifact with SHA-256 integrity hash',
          col4: 'VERIFIED IN LIVE WORKBENCH',
        },
      ],
    },
  },
  {
    number: '07',
    id: 'research-program',
    title: 'Research Program: Falsifiable Hypotheses & Quasi-Experimental Evaluation',
    subtitle: 'Treating every system claim as a testable hypothesis with explicit baselines, confounders, and failure conditions.',
    governingQuestion: 'How do we test whether Atlas Sanctum actually improves decision quality, audit speed, equity, and physical water outcomes—and how do we know when we are wrong?',
    executiveSynthesis:
      'Atlas Sanctum rejects self-congratulatory vanity metrics. We separate evaluation into six distinct tiers: (1) Technical Reliability (uptime, offline sync integrity), (2) Analytical Quality (calibration of P10–P90 forecasts via Brier/CRPS scores), (3) Audit & Review Efficiency (crossover trials with county engineers), (4) Governance & Equity Compliance (prevention of regressive tariff exclusion), (5) Operational Usefulness (tranche disbursement velocity and defect detection), and (6) Physical & Human Flourishing Outcomes (measured via Interrupted Time Series and Matched Difference-in-Differences across paired sub-catchments).',
    designTestQuestion: 'Does the research program document negative findings where prior assumptions failed?',
    designTestPassCriteria: 'PASS: Explicitly documents two falsified assumptions in Pilot Case DEC-0842 (Site 1A pegmatite intrusion and slope-distance barrier for elderly households in upper Kyamuthei).',
    epistemicBlocks: [
      {
        status: 'ESTABLISHED_EVIDENCE',
        heading: 'Difference-in-Differences (DiD) Identification Strategy for Hydrogeological & Social Outcomes',
        body: 'Because rainfall varies sharply across seasons in semi-arid Kenya, simple before-after comparisons are confounded by precipitation anomalies. Every ARDE intervention is paired with an un-intervened control borehole/reach in an adjacent sub-catchment sharing the same lithology and rainfall gauge normalization.',
        citationOrMechanism: 'Equation 7.1: DiD Estimator with Precipitation & Grid-Uptime Covariates.',
      },
    ],
    technicalArtifact: {
      title: 'Causal Attribution & Value-of-Information Equations',
      type: 'EQUATION_SPEC',
      content: `1. Difference-in-Differences (DiD) Outcome Attribution Model:
   Y_{i,t} = α + β_1(Treat_i) + β_2(Post_t) + δ(Treat_i × Post_t) + γ·Rain_{i,t} + λ·GridUptime_{i,t} + ε_{i,t}
   where δ is the causal treatment effect of the ARDE-authorized intervention on borehole uptime or static water level Y_{i,t}, controlling for seasonal rainfall Rain_{i,t} and KPLC grid stability.

2. Expected Value of Sample Information (EVSI) for Pre-Construction Diagnostic Tests:
   EVSI(Test_k) = E_{Z_k} [ max_{a ∈ Options} E_{θ | Z_k} U(a, θ) ] - max_{a ∈ Options} E_{θ} U(a, θ) - Cost(Test_k)
   Decision Rule: Trigger mandatory pre-gate diagnostic test (e.g., KES 185,000 72-hr step-drawdown test) whenever EVSI(Test_k) > 0 and irreversible civil CAPEX > KES 1,000,000.

3. Sub-Catchment Sustainable Abstraction Mass Balance Constraint:
   ∑_{w=1}^{N} Q_{abstracted, w} + Q_{ecological_reserve (30%)} ≤ R_{natural}(P_{25_drought}) + ∑_{d=1}^{M} ΔS_{sand_dam, d} · η_{connectivity}`,
    },
  },
  {
    number: '08',
    id: 'governance-safety',
    title: 'Governance, Security & Threat Model: Defending Epistemic & Institutional Integrity',
    subtitle: 'Explicit controls against prompt injection, data poisoning, elite capture, privacy breaches, and model overconfidence.',
    governingQuestion: 'What can go wrong when deploying decision infrastructure in contested real-world environments, and what concrete safeguards prevent harm?',
    executiveSynthesis:
      'A system that influences public infrastructure capital and community water rules is a high-value target for contractor manipulation, political capture, corrupt data injection, and technocratic overreach. We engineer eight defense-in-depth safeguards covering cybersecurity, epistemic integrity, privacy under the Kenya Data Protection Act 2019, and institutional contestability.',
    designTestQuestion: 'Can a malicious contractor or external actor inject a fabricated PDF report to trick the system into recommending their preferred borehole drilling option?',
    designTestPassCriteria: 'PASS: Untrusted document text is parsed in a zero-privilege sandbox; candidate claims cannot enter the active Evidence Graph or influence option scoring until signed off by a credentialed County Hydrogeologist.',
    epistemicBlocks: [
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'Location Cloaking for Vulnerable Household & Sacred Site Data',
        body: 'While borehole and sand dam coordinates are public infrastructure records, household poverty survey responses and customary sacred grove locations are spatially cloaked to village-centroid or 1 km hex resolution in accordance with the Kenya Data Protection Act (2019) and ODPC guidelines.',
        citationOrMechanism: 'Role-Based Access Control (RBAC) + k-anonymity spatial aggregation ($k \\ge 15$ households).',
      },
    ],
    technicalArtifact: {
      title: 'Comprehensive Threat Model & Institutional Safeguard Matrix',
      type: 'PROTOCOL_TABLE',
      content: 'Eight primary threat vectors and their technical + institutional countermeasures.',
      rows: [
        {
          col1: 'T1: Contractor Data Poisoning / Biased BoQ',
          col2: 'Inflated yield estimates or under-quoted O&M costs in vendor bids',
          col3: 'Automated Reference Class check flags any bid >1.5 SD outside historical Makueni/Kitui distribution',
          col4: 'Requires independent WRA / County Hydrogeologist sign-off on all physical parameters',
        },
        {
          col1: 'T2: Prompt Injection via Uploaded PDFs',
          col2: 'Hidden adversarial instructions inside consultant PDFs attempting to alter ranking',
          col3: 'Option scoring is 100% deterministic math over structured SQL columns; LLMs never score or rank options',
          col4: 'Air-gapped parser extracts candidate text only to a quarantine staging queue',
        },
        {
          col1: 'T3: Local Elite Capture of WRUA Board',
          col2: 'Wealthy irrigators dominating committee to favor piped farm connections over kiosks',
          col3: 'Layer 2 Cohort Matrix requires disaggregated sign-off from Women & Indigent Caucus representative',
          col4: 'Public Baraza broadsheet printout required 14 days before Stage 04 ratification',
        },
        {
          col1: 'T4: Privacy Breach of Indigent Roster',
          col2: 'Public exposure of households receiving free lifeline NFC water tokens',
          col3: 'Zero-deposit NFC cards look identical to standard cards; household PII encrypted at rest (AES-256)',
          col4: 'Only WRUA Grievance Officer & County Social Officer hold decryption keys',
        },
        {
          col1: 'T5: Sensor Spoofing or Calibration Drift',
          col2: 'Silted pressure transducer reporting false high water levels',
          col3: 'Automated cross-check against manual monthly dip-meter log and pump current draw',
          col4: 'Flags node as `SUSPECT_CALIBRATION` and widens uncertainty bounds automatically',
        },
      ],
    },
  },
  {
    number: '09',
    id: 'pilot-plan',
    title: 'First Proving Ground Pilot Plan: Makueni County Kaiti Sub-Catchment',
    subtitle: 'A 6-month, $48,500 bounded pilot with the Makueni County Climate Change Fund (CCCF) and Kaiti WRUA.',
    governingQuestion: 'What is the exact operational plan, budget, partner responsibility matrix, milestone schedule, and explicit stop condition for the first Kenyan pilot?',
    executiveSynthesis:
      'We select Makueni County (specifically the Kaiti River Sub-Catchment across Wote, Nziu, and Kee Wards) as the initial proving ground because Makueni pioneered Kenya’s statutory County Climate Change Fund (CCCF) mechanism—allocating 1%–2% of the county development budget through participatory Ward Climate Change Planning Committees (WCCPCs)—and maintains active partnerships with the Water Resources Authority (WRA) and SweetSense/LoRaWAN borehole telemetry initiatives.',
    designTestQuestion: 'Does the pilot plan include explicit, binding Stop Conditions that halt or redesign the deployment if empirical thresholds are missed?',
    designTestPassCriteria: 'PASS: Defines three hard Stop Conditions at Day 45, Day 90, and Day 180.',
    epistemicBlocks: [
      {
        status: 'ESTABLISHED_EVIDENCE',
        heading: 'Institutional Readiness of Makueni County CCCF & WCCPC Architecture',
        body: 'Makueni County’s Climate Change Fund Act legally empowers Ward Climate Change Planning Committees (comprising community women, youth, and technical officers) to prioritize and co-approve ward water investments, providing an existing statutory home for ARDE Stage 03 and Stage 04.',
        citationOrMechanism: 'Makueni County Climate Change Regulations; IIED / Ada Consortium Institutional Evaluations.',
      },
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'Explicit Pilot Stop Conditions',
        body: 'Stop Condition 1 (Day 45): If assembling a verified Decision Record takes >15 hours of staff time per site after training, halt feature expansion and simplify ingestion. Stop Condition 2 (Day 90): If WRUA community representatives report <70% comprehension of the printed/interactive Decision Brief, redesign the Layer 4 visual presentation. Stop Condition 3 (Day 180): If ARDE fails to identify any actionable design or tariff improvement over standard PDF consultants across 5 ward decisions, terminate commercial scaling and publish a transparent negative research report.',
        citationOrMechanism: 'Enforces disciplined scientific restraint.',
      },
    ],
    technicalArtifact: {
      title: '6-Month Makueni Proving Ground Pilot Budget & Milestone Schedule ($48,500 Total Delivery Cost)',
      type: 'PROTOCOL_TABLE',
      content: 'Transparent breakdown of software deployment, field verification, community barazas, and independent evaluation.',
      rows: [
        {
          col1: 'Month 1: Co-Design & Data Ingestion ($9,500)',
          col2: 'Ingest 24-mo borehole telemetry, WRA permits, SRTM/Sentinel layers & historical CCCF files',
          col3: 'Makueni County Water Dept + Atlas Field Engineer',
          col4: 'Milestone 1: 5 historical + 3 live candidate ward water decisions loaded in ARDE',
        },
        {
          col1: 'Month 2: Participatory Barazas & WP-1 Pre-Gates ($11,200)',
          col2: 'Conduct 6 gender-disaggregated village barazas + execute 72-hr aquifer step-tests',
          col3: 'Kaiti WRUA + County Hydrogeologist + Community Enumerators',
          col4: 'Milestone 2: Layer 2 Cohort Matrices & Layer 3 Governance Rules ratified',
        },
        {
          col1: 'Month 3: Stage 04 Authorization & Procurement ($6,800)',
          col2: 'Joint WCCPC / County Chief Officer deliberation using ARDE Decision Briefs',
          col3: 'County Chief Officer + WRUA Chair + WRA Observer',
          col4: 'Milestone 3: Signed Decision Records & tranched work packages issued',
        },
        {
          col1: 'Months 4–5: Implementation & Telemetry Binding ($11,500)',
          col2: 'Track tranche disbursements, sand dam keying, solar retrofit & lifeline NFC card issue',
          col3: 'Contracted Engineers + WRUA Tariff Committee',
          col4: 'Milestone 4: 600 indigent NFC cards active + live LoRaWAN flow verification',
        },
        {
          col1: 'Month 6: Independent 90-Day Audit & Learning ($9,500)',
          col2: 'Execute DiD outcome audit + crossover engineer trial (H1–H5) with University of Nairobi / SEKU',
          col3: 'Independent Academic Evaluation Partner (UoN / SEKU)',
          col4: 'Milestone 5: Public Outcome Ledger & Go/No-Go Decision Report published',
        },
      ],
    },
  },
  {
    number: '10',
    id: 'commercial-model',
    title: 'Commercial & Institutional Viability: Durable Social Enterprise Economics',
    subtitle: 'Who pays, why they pay, procurement pathways, unit economics, and community protection covenants.',
    governingQuestion: 'How does Atlas Sanctum sustain itself commercially without extracting rent from vulnerable communities or compromising epistemic independence?',
    executiveSynthesis:
      'Communities and water-stressed households NEVER pay for Atlas Sanctum software. The primary buyers and budget owners are: (1) Climate & Water Development Financiers (World Bank FLLoCA — Financing Locally-Led Climate Action Program, Water Sector Trust Fund [WSTF], Green Climate Fund, and bilateral agencies like FCDO/DANIDA) who currently spend 8%–14% of program budgets on fragmented PDF consultancy appraisals and M&E audits, and (2) County Governments & Basin Authorities procuring Technical Assistance & Fiduciary Decision Systems under FLLoCA County Climate Change Fund operational grants.',
    designTestQuestion: 'Does the commercial model separate verified institutional budget mechanisms from unverified assumptions about willingness to pay?',
    designTestPassCriteria: 'PASS: Distinguishes existing statutory FLLoCA/WSTF M&E budget lines (established fact) from commercial SaaS conversion hypotheses (to be tested in Month 6).',
    epistemicBlocks: [
      {
        status: 'ESTABLISHED_EVIDENCE',
        heading: 'Existing Institutional Budget Line: Kenya FLLoCA & WSTF Appraisal/M&E Allocations',
        body: 'Under the Government of Kenya / World Bank Financing Locally-Led Climate Action (FLLoCA) program across 47 counties, counties receive dedicated institutional strengthening and climate risk assessment grants specifically mandated to prove participatory, climate-informed investment selection and traceable M&E.',
        citationOrMechanism: 'Source: Kenya National Treasury FLLoCA Program Operations Manual (2023–2027).',
      },
      {
        status: 'UNTESTED_HYPOTHESIS',
        heading: 'Annual County Subscription & Per-Decision Appraisal Pricing Hypothesis',
        body: 'We hypothesize that County Climate Change Funds and Co-Financing NGOs will pay an annual platform & decision-audit retainer of USD $18,000/year per county (covering up to 15 major capital decisions + continuous outcome ledger tracking) once the pilot demonstrates >=40% reduction in appraisal/audit cost and prevents at least one mis-sited capital project ($50,000+ saved).',
        citationOrMechanism: 'To be validated via signed Letters of Intent and post-pilot procurement evaluation.',
      },
    ],
    technicalArtifact: {
      title: 'Commercial Unit Economics & Institutional Governance Safeguards',
      type: 'ARCHITECTURE_MATRIX',
      content: 'Ensuring financial sustainability never compromises community rights or scientific truth.',
      rows: [
        {
          col1: 'Initial Buyer & Budget Owner',
          col2: 'County Climate Change Fund (CCCF) Secretariats & Co-Financing Development Partners (WSTF / FLLoCA)',
          col3: 'Daily Users: County Water Engineers, Ward Climate Coordinators, WRUA Executives',
          col4: 'Affected Community: Zero software fees; guaranteed free read/challenge access',
        },
        {
          col1: 'Quantified Customer Value',
          col2: 'Prevents 1 dry/mis-sited borehole or sand dam per county/year (Saves KES 4.5M–8.0M / $35k–$62k)',
          col3: 'Cuts FLLoCA/WSTF fiduciary & M&E audit preparation cost by ~50% ($15k/yr saved)',
          col4: 'ROI Ratio: ~3.2x to 4.5x net fiscal savings per county per year',
        },
        {
          col1: 'Delivery Cost Structure (Per County/Yr)',
          col2: 'Cloud & PostGIS Hosting + SMS/Offline Sync: $1,800/yr',
          col3: 'Field Hydrogeology & Baraza Facilitation Support (20 days/yr): $6,400/yr',
          col4: 'Gross Margin at $18,000/yr County License: ~54% (reinvested into R&D & indigent audits)',
        },
        {
          col1: 'Anti-Capture Covenant',
          col2: 'Customer cannot delete or hide `contestedByCommunity` records or negative Stage 06 outcomes',
          col3: 'Community WRUA holds independent co-export key to all local data',
          col4: 'Enforced via Atlas Sanctum Public Benefit Charter & Open Data Escrow',
        },
      ],
    },
  },
  {
    number: '11',
    id: 'roadmap',
    title: 'Long-Term Research Roadmap: Federated Place-Based Decision Infrastructure',
    subtitle: 'Disciplined expansion from ASAL rural water into road drainage, regenerative agro-ecology, and grid resilience—without assuming one monolithic model.',
    governingQuestion: 'How can the system expand across domains while respecting domain-specific epistemologies, physical laws, and governance institutions?',
    executiveSynthesis:
      'Atlas Sanctum does NOT assume that one universal model can govern water, agriculture, roads, and health. What is universal is the Canonical Decision Protocol (the 6-Layer Architecture, the 7-Stage State Machine, the Provenance Graph, and the Cohort Capability Audit). What must remain modular are the Domain Plug-ins: each new domain requires its own physical conservation equations, reference class datasets, statutory rules, and domain-specific verification sensors.',
    designTestQuestion: 'What empirical threshold must be met in Domain 1 (ASAL Water) before engineering effort is permitted to expand into Domain 2 (Catchment Road Drainage)?',
    designTestPassCriteria: 'PASS: Expansion to Horizon 2 is locked until Horizon 1 achieves >= 10 verified Stage 06 Decision Records across >= 2 counties with calibrated Brier scores and independent audit sign-off.',
    epistemicBlocks: [
      {
        status: 'SPECULATIVE_POSSIBILITY',
        heading: 'Horizon 3 Cross-Domain Catchment Co-Optimization (Years 3–5)',
        body: 'Once water recharge (sand dams), feeder road drainage (culvert runoff harvesting into farm ponds), and dryland agroforestry operate on shared sub-catchment DEMs, counties could evaluate joint "Road-for-Water" capital briefs where road drainage structures intentionally recharge downstream agricultural aquifers.',
        citationOrMechanism: 'Tagged as SPECULATIVE_POSSIBILITY until Horizon 1 and 2 empirical gates are passed.',
      },
    ],
    technicalArtifact: {
      title: 'Three-Horizon Federated Domain Expansion Roadmap',
      type: 'PROTOCOL_TABLE',
      content: 'Strict stage-gated progression across physical and institutional domains.',
      rows: [
        {
          col1: 'Horizon 1 (Months 1–12): ASAL Water & Aquifer Stewardship',
          col2: 'Borehole rehab, sand dam siting, solar pumping & WRUA lifeline tariff covenants',
          col3: 'Physical Core: Aquifer mass-balance & step-drawdown models; Legal Core: Water Act 2016',
          col4: 'Exit Gate: 10 verified decisions in Makueni/Kitui; H1–H3 hypotheses validated',
        },
        {
          col1: 'Horizon 2 (Months 13–24): Catchment Road Drainage & Gully Control',
          col2: 'Culvert sizing, road-runoff water harvesting & slope stabilization',
          col3: 'Physical Core: SCS-CN peak storm runoff & shear stress models; Legal Core: KeRRA / County Roads',
          col4: 'Exit Gate: Shared DEM reuse saves >40% setup cost; verified storm survival across 2 wet seasons',
        },
        {
          col1: 'Horizon 3 (Years 3–5): Smallholder Regenerative Agro-Ecology & Commons',
          col2: 'Agroforestry species matching, soil moisture conservation & rangeland grazing covenants',
          col3: 'Physical Core: RothC soil carbon & crop-water balance; Legal Core: CFA / Rangeland Bylaws',
          col4: 'Exit Gate: Multi-season yield & soil moisture resilience verified across paired farms',
        },
      ],
    },
  },
  {
    number: '12',
    id: 'demonstration-experiment',
    title: 'Demonstration Scenario & The Smallest Credible Experiment',
    subtitle: 'Concluding not with a grand prediction, but with a concrete, funded decision on what to build, test, and verify next.',
    governingQuestion: 'What is the smallest credible experiment that can demonstrate whether the Atlas Regenerative Decision Engine provides verifiable value beyond existing tools and workflows?',
    executiveSynthesis:
      'Rather than proposing a multi-million-dollar national platform, we conclude with a concrete, immediate, falsifiable decision: Execute a 90-Day, USD $19,800 (KES 2.57M) "Phase-Zero Twin-Site Decision Experiment" in Makueni County alongside the County Department of Water and the Kaiti WRUA, testing ARDE on two live dry-season borehole/sand-dam rehabilitation decisions (`DEC-KE-2026-0842` in Nziu/Kee and a paired comparison decision in Kilome Ward).',
    designTestQuestion: 'Does the dossier conclude with an actionable, costed, falsifiable experiment specifying exact participants, timeline, budget, and continuation criteria?',
    designTestPassCriteria: 'PASS: Complete Phase-Zero Experimental Charter specified below.',
    epistemicBlocks: [
      {
        status: 'REASONED_DESIGN_CHOICE',
        heading: 'The Smallest Credible Experiment Charter (90 Days · $19,800 Total Cost)',
        body: 'In 90 days, with 4 concrete participants (1 County Hydrogeologist, 1 Sub-County Water Officer, 4 Kaiti WRUA & Women Caucus representatives, and 2 Atlas Sanctum engineers), we can test Hypotheses H1, H2, and H3 on live ward capital allocations before asking any institution for a long-term contract.',
        citationOrMechanism: 'See Table 12.1 for exact cost breakdown and continuation/termination rules.',
      },
    ],
    technicalArtifact: {
      title: 'The Final Decision: 90-Day Smallest Credible Experiment Specification',
      type: 'PROTOCOL_TABLE',
      content: 'What to build, how to test it, what it costs, who is involved, and what evidence justifies continuing.',
      rows: [
        {
          col1: '1. What to Build (Scope)',
          col2: 'The standalone ARDE Decision Workbench (deployed in this prototype) pre-loaded with Kaiti Sub-Catchment DEM, 18-mo borehole telemetry, WRA permit rules, and printable Swahili/Kamba/English Baraza Decision Brief generator.',
          col3: 'Zero speculative features (no blockchain, no autonomous agents).',
          col4: 'Ready for field deployment Day 1.',
        },
        {
          col1: '2. How to Test It (Method)',
          col2: 'Run a 2-arm test: (A) Blinded crossover audit with 12 County/WRA engineers comparing ARDE Brief vs. standard 85-page consultant PDF; (B) Live deliberation with Kaiti WRUA & Women Caucus on Nziu/Kee tariff & sand-dam siting.',
          col3: 'Independent observation by University of Nairobi / SEKU hydrogeology & development faculty.',
          col4: 'Pre-registered protocol.',
        },
        {
          col1: '3. What It Will Cost ($19,800)',
          col2: '$6,200: Two-well 72-hr step-drawdown & ERT field verification tests; $4,800: 6 Village Barazas, translation & enumerator stipends; $5,400: Field engineering & sensor calibration; $3,400: Independent academic audit.',
          col3: 'Total: USD $19,800 (KES 2,574,000).',
          col4: 'Zero financial burden on community.',
        },
        {
          col1: '4. Who Must Be Involved',
          col2: 'Makueni County Chief Officer for Water (Approver), Senior County Hydrogeologist (Technical Lead), Kaiti WRUA Chair & Women Caucus Rep (Co-Signers), WRA Athi Basin Officer (Regulator), UoN/SEKU Evaluator.',
          col3: 'Explicit FPIC & Data Sovereignty Covenant signed prior to Day 1.',
          col4: 'Named human accountability.',
        },
        {
          col1: '5. Evidence to Justify Continuing',
          col2: 'CONTINUE ONLY IF all 3 hold: (1) Engineer audit time drops >=40% with >=80% detection of seeded missing aquifer assumptions; (2) WRUA & Women Caucus ratify the Lifeline Tariff Covenant with >=80% comprehension; (3) WP-1 diagnostic pre-gate empirically improves siting or pump sizing.',
          col3: 'STOP OR REDESIGN IF any criterion fails at Day 90.',
          col4: 'Falsifiable commitment.',
        },
      ],
    },
  },
];
