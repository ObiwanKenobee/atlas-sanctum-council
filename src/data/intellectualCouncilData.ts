import { IntellectualCouncilMember } from '../types/arde';

export const INTELLECTUAL_COUNCIL: IntellectualCouncilMember[] = [
  {
    id: 'ostrom',
    thinker: 'Elinor Ostrom',
    lifespanOrEra: '1933–2012 · Institutional Political Economy',
    domainTradition: 'Polycentric Commons Governance & Collective Action Rules',
    coreWorkReference: 'Governing the Commons (1990); Understanding Institutional Diversity (2005)',
    q1UnderlyingInsight:
      'Shared natural resources (aquifers, grazing lands, irrigation channels, forests) are neither inevitably destroyed by a "tragedy of the commons" nor saved by centralized state or market privatization; they endure when governed by polycentric, locally adapted rules where resource users participate in rule-making, monitoring, and graduated sanctions.',
    q2DecisionProblemSolved:
      'Prevents top-down algorithmic or ministerial resource allocations that fail in the field because they ignore local Water Resource Users Associations (WRUAs), customary access norms, boundary definitions, and local conflict-resolution mechanisms.',
    q3TechnicalEmbodiment: {
      componentName: 'Layer 3: Commons Governance Rule Engine & Institutional Grammar Matrix (ADICO Schema)',
      dataStructureOrRule:
        'Encodes every rule using Ostrom’s ADICO syntax (Attributes, Deontic [May/Must/Must Not], aIm, Conditions, Or-else sanction) and enforces co-signature gates where both statutory authority (County/WRA) and local commons body (WRUA/Baraza) must authorize interventions.',
      architecturalLayer: 'Layer 3 — Commons Governance Map',
    },
    q4EmpiricalVerification:
      'Measured by reduction in post-installation vandalism/non-compliance incidents, percentage of operational rules modified and ratified by local users within 12 months, and 24-month infrastructure survival rate compared to centrally imposed projects.',
    q5LimitationsAndUnintendedConsequences:
      'Local institutions are not automatically egalitarian: customary elders or local elites can capture WRUA boards and exclude women, youth, or migrant pastoralists. Ostrom’s polycentric deference must therefore be paired with Amartya Sen’s capability audits to prevent elite capture.',
    productiveDisagreementWith: {
      counterpartThinker: 'Amartya Sen',
      tensionStatement:
        'Procedural Local Autonomy (Ostrom) vs. Substantive Capability Protection for Marginalized Minorities (Sen): What happens when a locally legitimate community rule excludes a vulnerable minority (e.g., transient pastoralists or landless women)?',
      howArdePreservesTension:
        'ARDE refuses to resolve this silently: Layer 3 validates whether a rule has local collective-choice legitimacy (Ostrom), while Layer 2 simultaneously flags if that rule diminishes basic capabilities for any vulnerable subgroup (Sen), forcing explicit human deliberation and constitutional covenant safeguards.',
    },
  },
  {
    id: 'sen',
    thinker: 'Amartya Sen',
    lifespanOrEra: 'b. 1933 · Welfare Economics & Social Choice Philosophy',
    domainTradition: 'Human Capabilities Approach & Distributional Justice',
    coreWorkReference: 'Development as Freedom (1999); The Idea of Justice (2009)',
    q1UnderlyingInsight:
      'Aggregate utility or GDP growth masks severe deprivation. True development consists of expanding people’s substantive freedoms ("capabilities") to lead lives they have reason to value—and social choice does not require a single transcendental formula if it enables public reasoning to eliminate manifest injustices.',
    q2DecisionProblemSolved:
      'Stops technical planners from choosing an intervention that maximizes aggregate cost-effectiveness (e.g., lowest average cost per cubic meter of water pumped) while pricing out the poorest 20% of households or increasing female time poverty.',
    q3TechnicalEmbodiment: {
      componentName: 'Layer 2: Non-Aggregated Capability Matrix & Value-Weight Pluralism Engine',
      dataStructureOrRule:
        'Prohibits collapsing human flourishing into a single scalar "Dignity Score." Maintains disaggregated cohort vectors across 6 capability dimensions and triggers an automatic blocking warning whenever an aggregate-optimal option degrades a basic capability for a vulnerable cohort.',
      architecturalLayer: 'Layer 2 — Human Flourishing Model',
    },
    q4EmpiricalVerification:
      'Audit test showing whether decision-makers using ARDE identify and mitigate regressive distributional harms (such as upfront KES 500 smart-card barriers) significantly more often than teams using standard Benefit-Cost Ratio (BCR) spreadsheets.',
    q5LimitationsAndUnintendedConsequences:
      'Multi-dimensional capability tables across many subgroups can overwhelm boundedly rational decision-makers (Herbert Simon’s critique) or cause paralysis when every option involves painful trade-offs.',
    productiveDisagreementWith: {
      counterpartThinker: 'Herbert Simon',
      tensionStatement:
        'Multidimensional Capability Completeness (Sen) vs. Cognitive Tractability Under Bounded Rationality (Simon): Exhaustive distributional matrices across 10 dimensions and 6 cohorts can exceed human working memory.',
      howArdePreservesTension:
        'ARDE preserves the full multidimensional capability tensor in Layer 2 (Sen), but uses Simon’s "satisficing threshold filters" in Layer 4 to highlight only the specific cohorts and dimensions where minimum constitutional thresholds are violated.',
    },
  },
  {
    id: 'simon',
    thinker: 'Herbert A. Simon',
    lifespanOrEra: '1916–2001 · Decision Science, Administrative Behavior & AI',
    domainTradition: 'Bounded Rationality, Satisficing & Architecture of Complexity',
    coreWorkReference: 'Administrative Behavior (1947); The Sciences of the Artificial (1969)',
    q1UnderlyingInsight:
      'Human institutions operate under severe constraints of information, time, and cognitive attention. In complex, uncertain environments, attempting mathematical "global optimization" is delusional; robust systems rely on "satisficing" (meeting explicit adequacy thresholds across critical constraints) and nearly decomposable modular hierarchies.',
    q2DecisionProblemSolved:
      'Prevents ARDE from becoming an opaque "black-box optimizer" or overwhelming county engineers with 400-page unprioritized data dumps that consume scarce institutional attention.',
    q3TechnicalEmbodiment: {
      componentName: 'Layer 4: Satisficing Constraint Gate & Expected Value of Sample Information (EVSI) Stop-Rule',
      dataStructureOrRule:
        'Structures the Decision Brief around explicit feasibility thresholds (e.g., WRA <= 75 m³/day cap, Poorest Quintile water cost <= 5% income, Uptime >= 90%) and computes when gathering more data costs more in delay than the decision variance it resolves.',
      architecturalLayer: 'Layer 4 — Decision Brief',
    },
    q4EmpiricalVerification:
      'Reduction in decision preparation and audit cycle time (measured in staff hours from problem logging to authorized brief) without loss of constraint compliance.',
    q5LimitationsAndUnintendedConsequences:
      'Pure satisficing can lead institutions to settle for the first "good enough" option examined, prematurely halting the search for transformative regenerative alternatives.',
    productiveDisagreementWith: {
      counterpartThinker: 'Tu Youyou & George Smoot',
      tensionStatement:
        'Practical Satisficing Under Time Constraints (Simon) vs. Exhaustive Empirical Measurement Before Action (Smoot / Tu): County budget windows close in 60 days, while hydrogeological certainty takes multi-season observation.',
      howArdePreservesTension:
        'ARDE introduces staged conditional commitments: authorize the reversible diagnostic step first (e.g., 72-hr aquifer step-test) while holding irreversible civil works behind an empirical verification gate.',
    },
  },
  {
    id: 'kahneman',
    thinker: 'Daniel Kahneman',
    lifespanOrEra: '1934–2024 · Behavioral Economics & Cognitive Psychology',
    domainTradition: 'Judgment Under Uncertainty, Heuristics, Biases & Reference Class Forecasting',
    coreWorkReference: 'Judgment under Uncertainty: Heuristics and Biases (1974, with Tversky); Noise (2021)',
    q1UnderlyingInsight:
      'Expert intuition and institutional planning systematically suffer from overconfidence, anchoring, confirmation bias, and the "planning fallacy" (inside-view optimism about costs, timelines, and yields). Discipline requires outside-view Reference Class Forecasting and structured Pre-Mortem dissent.',
    q2DecisionProblemSolved:
      'Counteracts both human contractor optimism ("this borehole will yield 150 m³/day in 30 days with zero cost overrun") and LLM hallucinated fluency ("persuasive prose mistaken for calibrated probability").',
    q3TechnicalEmbodiment: {
      componentName: 'Reference Class Calibration Engine & Mandatory Pre-Mortem Dissent Prompt',
      dataStructureOrRule:
        'Anchors every project cost, timeline, and yield prediction against the empirical distribution (P10/P50/P90) of past comparable Kenyan ASAL water interventions, and requires logging at least one concrete Downside Pre-Mortem Failure Scenario before Stage 04 Authorization is unlocked.',
      architecturalLayer: 'Layer 4 — Decision Brief & Layer 6 — Outcome Ledger',
    },
    q4EmpiricalVerification:
      'Brier score and calibration curve of P10–P90 interval predictions compared against actual 90-day and 1-year observed outcomes across pilot decisions.',
    q5LimitationsAndUnintendedConsequences:
      'Over-reliance on historical reference classes can penalize genuinely novel regenerative designs that outperform historical failed baselines.',
    productiveDisagreementWith: {
      counterpartThinker: 'Muhammad Yunus',
      tensionStatement:
        'Outside-View Pessimism from Historical Base Rates (Kahneman) vs. Institutional Innovation that Breaks Historical Traps (Yunus): Historical base rates of rural water kiosk repayment look poor until the institutional mechanism (lifeline cross-subsidy + women-led trust) is redesigned.',
      howArdePreservesTension:
        'ARDE displays the historical outside-view base rate as the default prior (Kahneman), requiring explicit mechanistic evidence (Yunus/Hurwicz) to justify shifting the posterior forecast.',
    },
  },
  {
    id: 'hurwicz',
    thinker: 'Leonid Hurwicz',
    lifespanOrEra: '1917–2008 · Mathematical Economics & Mechanism Design',
    domainTradition: 'Incentive Compatibility, Institutional Rules & Information Decentralization',
    coreWorkReference: 'Optimality and Informational Efficiency in Resource Allocation Processes (1960); Nobel Lecture (2007)',
    q1UnderlyingInsight:
      'Information about local needs, costs, and compliance is dispersed among self-interested actors. A policy or technical intervention will fail unless its institutional rules are "incentive-compatible"—meaning actors find it in their own interest to report truthfully and steward shared assets.',
    q2DecisionProblemSolved:
      'Explains why punitive bans on river sand harvesting fail (youth loaders and lorry cartels switch to night harvesting) and why unverified contractor lump-sum contracts lead to shallow borehole drilling or sub-spec solar inverters.',
    q3TechnicalEmbodiment: {
      componentName: 'Layer 5: Incentive-Compatibility Audit & Milestone-Tranched Escrow Verification',
      dataStructureOrRule:
        'Evaluates every stakeholder’s net payoff under proposed rules (e.g., ensuring youth sand loaders earn >= KES 650/day via sand-dam masonry and soil-block cooperatives vs. KES 550/day illegal loading) and ties contractor tranche release to sensor-verified 30-day performance rather than paper completion certificates.',
      architecturalLayer: 'Layer 5 — Coordination and Capital Layer',
    },
    q4EmpiricalVerification:
      'Rate of truthful defect reporting, reduction in nocturnal rule evasion, and contractor defect remediation rate under performance-tranched contracts vs. traditional lump-sum procurement.',
    q5LimitationsAndUnintendedConsequences:
      'Purely transactional extrinsic incentives can crowd out intrinsic civic and spiritual stewardship ("moral crowding-out" documented by Ostrom and Samuel Bowles).',
    productiveDisagreementWith: {
      counterpartThinker: 'Wangari Maathai',
      tensionStatement:
        'Game-Theoretic Self-Interest Alignment (Hurwicz) vs. Moral & Cultural Covenant for Creation (Maathai): Designing rules assuming everyone is a purely self-interested utility maximizer can erode communal solidarity.',
      howArdePreservesTension:
        'ARDE combines fair material livelihood compensation (so stewardship never requires destitution) with public covenant ceremonies and collective watershed honour (Maathai).',
    },
  },
  {
    id: 'yunus',
    thinker: 'Muhammad Yunus',
    lifespanOrEra: 'b. 1940 · Development Economics & Social Enterprise',
    domainTradition: 'Social Business Architecture, Financial Inclusion & Last-Mile Affordability',
    coreWorkReference: 'Banker to the Poor (1999); Building Social Business (2010)',
    q1UnderlyingInsight:
      'Charity hand-outs often collapse when donor grants end, while conventional profit-maximizing utilities exclude the ultra-poor. A self-sustaining "social business" recovers full operational and maintenance costs through progressive cross-subsidies and micro-tranche affordability without extracting dividends.',
    q2DecisionProblemSolved:
      'Solves the chronic "build-neglect-rebuild" cycle of rural African water infrastructure (where 35–45% of boreholes sit broken within 3 years due to depleted O&M funds) without pricing out indigent families.',
    q3TechnicalEmbodiment: {
      componentName: 'Progressive Tariff Cross-Subsidy Simulator & Escrow O&M Solvency Ledger',
      dataStructureOrRule:
        'Models multi-tier tariff structures (Tier 1: Indigent/Lifeline 40L/day at KES 0–1.50/20L with zero card deposit; Tier 2: Domestic standard at KES 3.00/20L; Tier 3: Commercial bulk/livestock/brickmaking at KES 5.00/20L) and verifies that net monthly revenue covers 100% of O&M + inverter replacement reserve.',
      architecturalLayer: 'Layer 2 (Affordability) & Layer 5 (Capital Layer)',
    },
    q4EmpiricalVerification:
      '12-month O&M escrow balance solvency ratio (>= 1.15x annual maintenance requirement) paired with >= 85% bottom-quintile household active usage of safe kiosk water.',
    q5LimitationsAndUnintendedConsequences:
      'In homogeneous ultra-poor communities lacking commercial bulk buyers, internal cross-subsidy alone cannot cover major capital replacements without county equalization transfers.',
    productiveDisagreementWith: {
      counterpartThinker: 'Amartya Sen',
      tensionStatement:
        'Strict Cost-Recovery Solvency (Yunus) vs. Unconditional Constitutional Right to Water (Sen): What if a community is so drought-stricken that no local tariff tier can cover O&M?',
      howArdePreservesTension:
        'ARDE computes the exact local cross-subsidy frontier first; if local solvency requires pricing Tier 1 above 4% of poorest-quintile income, ARDE automatically flags a mandatory County Equalization Subsidy requirement rather than raising the lifeline tariff.',
    },
  },
  {
    id: 'maathai',
    thinker: 'Wangari Maathai',
    lifespanOrEra: '1940–2011 · Ecological Restoration, Civic Agency & Environmental Stewardship',
    domainTradition: 'Watershed Regeneration, Community Mobilization & Eco-Civic Dignity',
    coreWorkReference: 'The Green Belt Movement (2003); Replenishing the Earth (2010)',
    q1UnderlyingInsight:
      'Environmental degradation, rural poverty, and disempowerment are symptoms of the same root rupture: when communities are alienated from stewarding their own land, trees, and headwaters, downstream infrastructure inevitably silts up or dries out. Restoration must heal the land and restore civic agency together.',
    q2DecisionProblemSolved:
      'Prevents treating water scarcity as a purely mechanical plumbing/drilling problem while ignoring upper-catchment deforestation, riparian soil erosion, and women’s ecological knowledge.',
    q3TechnicalEmbodiment: {
      componentName: 'Coupled Catchment-Infrastructure Co-Design Rule & Citizen Ecological Testimony Node',
      dataStructureOrRule:
        'Requires every groundwater extraction proposal in ARDE to evaluate coupled upper-catchment recharge (sand dams, vetiver terracing, indigenous riparian reforestation) and treats verified community ecological observations as first-class Evidence Graph nodes.',
      architecturalLayer: 'Layer 1 (Evidence Graph) & Layer 6 (Learning Ledger)',
    },
    q4EmpiricalVerification:
      'Satellite NDVI / fractional vegetation cover recovery in riparian buffers, survival rate of community-planted indigenous seedlings at 24 months, and sand-dam coarse sediment accretion rate.',
    q5LimitationsAndUnintendedConsequences:
      'Tree planting without species-site matching (e.g., planting water-intensive exotic Eucalyptus near semi-arid wetlands) can actually lower water tables instead of recharging them.',
    productiveDisagreementWith: {
      counterpartThinker: 'Paul Crutzen & Hydrogeological Systemists',
      tensionStatement:
        'Rapid Community Tree-Planting Mobilization (Maathai) vs. Eco-Hydrological Evapotranspiration Constraints in Semi-Arid Lands: Dense canopy cover in <600mm rainfall zones can transpire more water than it infiltrates if exotic species or excessive densities are used.',
      howArdePreservesTension:
        'ARDE pairs community mobilization with species-specific eco-hydrological water-balance rules (restricting riparian plantings in ASALs to indigenous phreatophytes/agroforestry species like Faidherbia albida and Acacia tortilis at optimal spacing).',
    },
  },
  {
    id: 'tuyouyou',
    thinker: 'Tu Youyou',
    lifespanOrEra: 'b. 1930 · Pharmaceutical Chemistry & Empirical Experimental Method',
    domainTradition: 'Rigorous Empirical Validation of Traditional Knowledge & Cold-Extraction Falsification',
    coreWorkReference: 'Discovery of Artemisinin (Qinghaosu) — Nobel Lecture (2015)',
    q1UnderlyingInsight:
      'Historical and traditional practitioners hold invaluable empirical clues accumulated over centuries (such as Ge Hong’s cold-steeping method for sweet wormwood), but turning traditional testimony into reliable life-saving interventions requires disciplined, falsifiable experimentation that tests why standard assumptions fail.',
    q2DecisionProblemSolved:
      'Bridges the false dichotomy between dismissing indigenous/community knowledge as "anecdotal folklore" and romantically accepting every local claim without controlled empirical testing.',
    q3TechnicalEmbodiment: {
      componentName: 'Layer 1 & 6: Hypothesis Falsification Protocol & Community-Observation-to-Field-Test Pipeline',
      dataStructureOrRule:
        'When community elders or farmers report an observation (e.g., "shallow wells along the Nziu fault line stay sweet while adjacent wells turn brackish"), ARDE logs it as a high-priority `CAUSAL_HYPOTHESIS` and generates a low-cost, falsifiable field protocol (e.g., paired EC & resistivity transect) to verify the mechanism.',
      architecturalLayer: 'Layer 1 — Evidence Graph & Layer 6 — Outcome Ledger',
    },
    q4EmpiricalVerification:
      'Proportion of community-originated hypotheses that are formally tested with controlled field measurements and documented (including negative findings) in the Learning Ledger.',
    q5LimitationsAndUnintendedConsequences:
      'Extractive "bioprospecting" or data mining of indigenous knowledge without Free, Prior, and Informed Consent (FPIC) and benefit returns violates community trust.',
    productiveDisagreementWith: {
      counterpartThinker: 'Elinor Ostrom',
      tensionStatement:
        'Controlled Scientific Falsification (Tu Youyou) vs. Respect for Customary Authority (Ostrom): What happens when controlled water-quality or hydrogeological testing falsifies a long-held customary belief about a water source’s safety?',
      howArdePreservesTension:
        'ARDE requires transparent co-testing with community representatives present (joint water sampling and visible field test kits) so empirical falsification builds shared truth rather than technocratic humiliation.',
    },
  },
  {
    id: 'smoot_mather',
    thinker: 'George Smoot & John C. Mather',
    lifespanOrEra: 'Smoot (1945–2025) & Mather (b. 1946) · Observational Astrophysics & Precision Metrology',
    domainTradition: 'Instrumentation, Calibration, Systematic Error Budgeting & Signal Extraction',
    coreWorkReference: 'COBE Differential Microwave Radiometers & FIRAS Blackbody Spectrum (Nobel Prize 2006)',
    q1UnderlyingInsight:
      'Extracting tiny, consequential truths from noisy natural environments requires obsessive differential measurement, explicit calibration against reference standards, and ruthless accounting for systematic instrument biases before claiming a discovery.',
    q2DecisionProblemSolved:
      'Prevents corrupt, uncalibrated, or drifted field sensor data, satellite imagery artifacts, or biased survey samples from silently poisoning the Evidence Graph and producing garbage recommendations.',
    q3TechnicalEmbodiment: {
      componentName: 'Layer 1: Provenance Metrology Header, Systematic Error Budget & Differential Baseline Matcher',
      dataStructureOrRule:
        'Every quantitative node in the Evidence Graph must carry a mandatory Metrology & Uncertainty Descriptor (`unit`, `calibration_date`, `random_error_ci`, `systematic_bias_bounds`, `differential_control_reference`). Uncalibrated measurements are automatically down-weighted in sensitivity rankings.',
      architecturalLayer: 'Layer 1 — Evidence Graph',
    },
    q4EmpiricalVerification:
      'Detection rate of drifted piezometers, anomalous rain-gauge readings, or biased survey clusters before they alter a Stage 04 Decision Brief.',
    q5LimitationsAndUnintendedConsequences:
      'Demanding astrophysical-grade precision in data-sparse rural contexts can lead to rejecting useful low-cost participatory observations if error bars are not handled proportionally.',
    productiveDisagreementWith: {
      counterpartThinker: 'Herbert Simon',
      tensionStatement:
        'Strict Metrological Calibration Standards (Smoot/Mather) vs. Action Under Sparse, Noisy Field Data (Simon): Rural counties rarely have 10-year calibrated telemetry networks.',
      howArdePreservesTension:
        'ARDE never discards lower-precision evidence; instead, it widens the calibrated confidence interval proportionally and runs sensitivity analysis to show whether the decision ranking flips across that uncertainty range.',
    },
  },
  {
    id: 'crutzen_molina_rowland',
    thinker: 'Paul Crutzen, Mario Molina & F. Sherwood Rowland',
    lifespanOrEra: 'Crutzen (1933–2021), Molina (1943–2020), Rowland (1927–2012) · Earth System Science',
    domainTradition: 'Cumulative Boundary Risks, Non-Linear Thresholds & Intergenerational Stewardship',
    coreWorkReference: 'Stratospheric Ozone Depletion Catalysis (Nobel Prize 1995); Anthropocene System Boundaries',
    q1UnderlyingInsight:
      'Locally rational, short-term technical interventions (like chlorofluorocarbons or intensive deep-aquifer pumping) can accumulate across space and time to trigger irreversible, non-linear regime shifts (aquifer collapse, salinization, soil laterization) that harm future generations.',
    q2DecisionProblemSolved:
      'Prevents short-term project success metrics (e.g., 90-day water yield increase) from masking cumulative 10-year aquifer depletion or downstream ecological collapse.',
    q3TechnicalEmbodiment: {
      componentName: 'Cumulative Catchment Mass-Balance Constraint & Intergenerational Tail-Risk Gate',
      dataStructureOrRule:
        'Computes cumulative basin abstraction vs. multi-year recharge mass balance ($\\sum Q_{\\text{abstracted}} + Q_{\\text{ecological\\_reserve}} \\le R_{\\text{effective}}(\\text{P25 drought})$) across all active decisions in a sub-catchment, blocking options with unmitigated irreversible tail risks.',
      architecturalLayer: 'Layer 1 (Aquifer Model) & Layer 4 (Irreversible Harm Gate)',
    },
    q4EmpiricalVerification:
      '10-year multi-borehole piezometric trend stability and preservation of 30% downstream ecological baseflow across drought cycles.',
    q5LimitationsAndUnintendedConsequences:
      'Precautionary locks against long-term ecological risk can unintentionally block urgent short-term humanitarian relief during acute crises if emergency override protocols are not defined.',
    productiveDisagreementWith: {
      counterpartThinker: 'Amartya Sen & Humanitarian Urgency',
      tensionStatement:
        'Long-Term Aquifer Boundary Preservation (Crutzen/Molina/Rowland) vs. Acute Present-Day Humanitarian Thirst (Sen): During a severe 2-year drought, should a community temporarily pump fossil groundwater beyond annual recharge to save lives and livestock?',
      howArdePreservesTension:
        'ARDE permits an explicit, time-bounded "Drought Emergency Covenant Variance" (requiring human co-authorization and an automatic post-drought recharge replenishment mandate) rather than silently violating the aquifer boundary.',
    },
  },
];
