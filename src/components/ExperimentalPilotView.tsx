import React, { useState } from 'react';
import {
  KENYA_CANDIDATE_EVALUATION,
  FALSIFIABLE_HYPOTHESES,
  SPIRITUAL_CONSTITUTION,
} from '../data/dossierData';

export const ExperimentalPilotView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'PROVING_GROUND' | 'FALSIFIABLE_HYPOTHESES' | 'SPIRITUAL_CONSTITUTION' | 'SMALLEST_EXPERIMENT'
  >('PROVING_GROUND');

  return (
    <div className="space-y-8">
      {/* Header & Section Selector */}
      <section className="border border-stone-200 bg-white p-6 lg:p-8">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
          SECTIONS VI, VII, VIII, IX & X.12 · KENYA PROVING GROUND & EXPERIMENTAL PROGRAM
        </div>
        <h1 className="text-3xl lg:text-4xl font-editorial font-medium text-stone-900 mt-2">
          Kenya Proving Ground, Falsifiable Program & Spiritual Constitution
        </h1>
        <p className="text-sm text-stone-700 leading-relaxed max-w-3xl mt-2">
          Disciplined selection of one high-urgency Kenyan entry point, falsifiable experimental protocols with explicit failure conditions, operational translation of Christian stewardship commitments, and the 90-day Smallest Credible Experiment.
        </p>

        <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-2">
          {[
            { id: 'PROVING_GROUND', label: '01 · Kenya 5-Candidate Entry Matrix' },
            { id: 'FALSIFIABLE_HYPOTHESES', label: '02 · Falsifiable Hypotheses (H1–H5)' },
            { id: 'SPIRITUAL_CONSTITUTION', label: '03 · Operational Spiritual Constitution' },
            { id: 'SMALLEST_EXPERIMENT', label: '04 · The Final Decision: 90-Day Experiment' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveSubTab(t.id as typeof activeSubTab)}
              className={`px-3.5 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                activeSubTab === t.id
                  ? 'bg-[#14532D] text-white'
                  : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* SUBTAB 1: KENYA PROVING GROUND CANDIDATE MATRIX */}
      {activeSubTab === 'PROVING_GROUND' && (
        <section className="border border-stone-200 bg-white p-6 space-y-5">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-stone-500">
              SECTION VI · CHOOSING THE FIRST PROVING GROUND IN KENYA
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
              Comparative Evaluation of Five Kenyan Candidate Entry Points
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Evaluated across decision urgency, evidence availability, accountable institutional ownership, 90-day measurable outcomes, implementation cost, potential harm, and realistic access to a pilot partner.
            </p>
          </div>

          <div className="space-y-4">
            {KENYA_CANDIDATE_EVALUATION.map((cand) => (
              <div
                key={cand.id}
                className={`p-5 border ${
                  cand.selected
                    ? 'border-[#14532D] bg-[#FBF9F5]'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
                  <h3 className="text-base font-semibold text-stone-900">
                    {cand.name}
                  </h3>
                  <span
                    className={`text-xs font-mono font-bold ${
                      cand.selected ? 'text-[#14532D]' : 'text-stone-500'
                    }`}
                  >
                    {cand.selected ? 'SELECTED ENTRY POINT' : 'DEFERRED / SECONDARY'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-xs">
                  <div>
                    <div className="font-mono text-stone-500">Urgency & Evidence Availability</div>
                    <p className="text-stone-800 mt-0.5">
                      <strong>Urgency:</strong> {cand.decisionUrgency}
                    </p>
                    <p className="text-stone-800 mt-1">
                      <strong>Evidence:</strong> {cand.evidenceAvailability}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-stone-500">Accountable Owner & 90-Day Metric</div>
                    <p className="text-stone-800 mt-0.5">
                      <strong>Owner:</strong> {cand.institutionalOwner}
                    </p>
                    <p className="text-stone-800 mt-1">
                      <strong>90-Day Outcome:</strong> {cand.measurableOutcome90Day}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-stone-500">Pilot Cost, Harm Risk & Partner Access</div>
                    <p className="text-stone-800 mt-0.5">
                      <strong>Cost:</strong> {cand.implementationCostPilot}
                    </p>
                    <p className="text-stone-800 mt-1">
                      <strong>Harm Safeguard:</strong> {cand.potentialHarmRisk}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200 text-xs font-medium text-stone-900">
                  {cand.verdictRationale}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUBTAB 2: FALSIFIABLE HYPOTHESES */}
      {activeSubTab === 'FALSIFIABLE_HYPOTHESES' && (
        <section className="border border-stone-200 bg-white p-6 space-y-5">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-stone-500">
              SECTION VII · EXPERIMENTAL PROGRAM & FALSIFIABILITY
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
              Five Falsifiable Hypotheses: Mechanisms, Baselines, Confounders & Failure Conditions
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Every major claim of Atlas Sanctum is framed as a testable scientific hypothesis with an explicit condition under which it is falsified.
            </p>
          </div>

          <div className="space-y-4">
            {FALSIFIABLE_HYPOTHESES.map((hyp) => (
              <div key={hyp.id} className="p-5 border border-stone-200 bg-[#FBF9F5] space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200 font-mono">
                  <span className="font-bold text-stone-900">
                    {hyp.code} · {hyp.evaluationDimension}
                  </span>
                  <span className="text-[#14532D] font-semibold">{hyp.currentPilotStatus}</span>
                </div>

                <h3 className="text-sm font-semibold text-stone-900 leading-relaxed">
                  {hyp.hypothesisStatement}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div>
                    <div className="font-mono text-stone-500">Causal Mechanism & Baseline</div>
                    <p className="text-stone-800 mt-0.5">{hyp.mechanism}</p>
                    <p className="text-stone-600 mt-1">
                      <strong>Baseline:</strong> {hyp.baselineProcess}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-stone-500">Comparison & Measurement Procedure</div>
                    <p className="text-stone-800 mt-0.5">{hyp.comparisonDesign}</p>
                    <p className="text-stone-600 mt-1">
                      <strong>Confounders:</strong> {hyp.confounders}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-stone-500">Success Threshold & Falsification Rule</div>
                    <p className="text-[#14532D] font-medium mt-0.5">
                      <strong>Minimum Acceptable:</strong> {hyp.minimumAcceptableResult}
                    </p>
                    <p className="text-[#9A3412] font-medium mt-1">
                      <strong>Failure Condition:</strong> {hyp.falsificationFailureCondition}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUBTAB 3: SPIRITUAL CONSTITUTION */}
      {activeSubTab === 'SPIRITUAL_CONSTITUTION' && (
        <section className="border border-stone-200 bg-white p-6 space-y-5">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-stone-500">
              SECTION VIII · THE SPIRITUAL CONSTITUTION OF ATLAS SANCTUM
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-0.5">
              Christian Commitments Translated into Non-Idolatrous Engineering & Governance Rules
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Software cannot manufacture virtue or claim divine authority. Instead, these commitments operate as strict architectural restraints against deception, hubris, utilitarian injustice, and unaccountable power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SPIRITUAL_CONSTITUTION.map((sp) => (
              <div key={sp.virtue} className="p-5 border border-stone-200 bg-[#FBF9F5] space-y-2.5 text-xs">
                <h3 className="text-base font-editorial font-semibold text-stone-900">
                  {sp.virtue}
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  <strong>Moral & Philosophical Root:</strong> {sp.biblicalAndPhilosophicalRoot}
                </p>
                <p className="text-[#9A3412] leading-relaxed">
                  <strong>Anti-Idolatry Restraint:</strong> {sp.antiIdolatryBoundary}
                </p>
                <div className="pt-2 border-t border-stone-200 space-y-1">
                  <div>
                    <strong className="font-mono text-stone-900">Technical Constraint:</strong>{' '}
                    <span className="text-stone-800">{sp.technicalEnforcementMechanism}</span>
                  </div>
                  <div>
                    <strong className="font-mono text-stone-900">Interface & Governance Rule:</strong>{' '}
                    <span className="text-stone-800">{sp.uiAndGovernanceRule}</span>
                  </div>
                  <div className="font-mono text-[#14532D] pt-1">
                    Verification Metric: {sp.auditMetric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUBTAB 4: THE SMALLEST CREDIBLE EXPERIMENT */}
      {activeSubTab === 'SMALLEST_EXPERIMENT' && (
        <section className="border border-stone-200 bg-white p-6 lg:p-8 space-y-6">
          <div className="pb-4 border-b border-stone-200">
            <div className="text-xs font-mono text-[#14532D] font-semibold">
              FINAL DIRECTIVE · CONCRETE EXPERIMENTAL DECISION CHARTER
            </div>
            <h2 className="text-2xl font-editorial font-semibold text-stone-900 mt-1">
              The 90-Day Makueni Twin-Site Proving Ground Experiment (USD $19,800)
            </h2>
            <p className="text-sm text-stone-700 mt-1 max-w-3xl">
              Rather than concluding with a grand prediction, Atlas Sanctum concludes with an executable, costed, falsifiable 90-day decision charter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            <div className="p-4 border border-stone-200 bg-[#FBF9F5] space-y-2">
              <div className="font-mono font-bold text-stone-900">01 · WHAT TO BUILD</div>
              <p className="text-stone-700 leading-relaxed">
                Deploy the standalone ARDE Decision Workbench (PostgreSQL/PostGIS + offline-ready React PWA + printable Swahili/Kamba/English Baraza Decision Brief generator) pre-populated with Kaiti Sub-Catchment borehole sensor series, WRA abstraction permits, and SRTM/Sentinel layers.
              </p>
            </div>

            <div className="p-4 border border-stone-200 bg-[#FBF9F5] space-y-2">
              <div className="font-mono font-bold text-stone-900">02 · HOW TO TEST IT</div>
              <p className="text-stone-700 leading-relaxed">
                <strong>Arm A (Audit Trial):</strong> 12 County & WRA engineers audit 4 water briefs in ARDE vs. 4 standard 85-page consultant PDFs (testing H1 time savings & seeded error detection).<br />
                <strong>Arm B (Live Ward Allocation):</strong> Deliberate and co-authorize two live Makueni CCCF borehole/sand-dam decisions (`DEC-KE-2026-0842` in Nziu/Kee and a paired comparison site in Kilome).
              </p>
            </div>

            <div className="p-4 border border-stone-200 bg-[#FBF9F5] space-y-2">
              <div className="font-mono font-bold text-stone-900">03 · WHAT IT COSTS ($19,800)</div>
              <ul className="space-y-1 text-stone-700 font-mono tabular-nums">
                <li>· $6,200 — Two 72-hr step-drawdown & ERT tests</li>
                <li>· $4,800 — 6 Village Barazas & local enumerators</li>
                <li>· $5,400 — Field hydro-engineering & telemetry bind</li>
                <li>· $3,400 — Independent UoN / SEKU academic audit</li>
                <li className="pt-1 border-t border-stone-300 font-bold text-stone-900">
                  Total: USD $19,800 (KES 2,574,000)
                </li>
              </ul>
            </div>

            <div className="p-4 border border-stone-200 bg-[#FBF9F5] space-y-2">
              <div className="font-mono font-bold text-stone-900">04 · WHO MUST BE INVOLVED</div>
              <p className="text-stone-700 leading-relaxed">
                1. Makueni County Chief Officer for Water & Sanitation (Statutory Approver)<br />
                2. Senior County Hydrogeologist (Technical Lead)<br />
                3. Kaiti WRUA Chair & Nziu Women Caucus Rep (Co-Signers)<br />
                4. WRA Athi Basin Sub-Regional Officer (Regulatory Observer)<br />
                5. University of Nairobi / SEKU Independent Evaluator
              </p>
            </div>

            <div className="p-4 border border-[#14532D] bg-[#14532D]/5 space-y-2 md:col-span-2">
              <div className="font-mono font-bold text-[#14532D]">
                05 · EVIDENCE REQUIRED TO JUSTIFY CONTINUING (HARD GO / NO-GO GATE AT DAY 90)
              </div>
              <p className="text-stone-800 leading-relaxed">
                Progression to a multi-county phase is authorized <strong>only if all three empirical thresholds are verified</strong> by the independent evaluation team:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-stone-800">
                <li>
                  <strong>Threshold 1 (Audit Rigor):</strong> Engineer audit time decreases by &ge; 40% while detection of seeded unsupported hydrogeological assumptions reaches &ge; 80% (vs. &lt; 35% in PDF baseline).
                </li>
                <li>
                  <strong>Threshold 2 (Distributional Justice & Comprehension):</strong> Kaiti WRUA & Women Caucus ratify the Lifeline Tariff Covenant with &ge; 80% verified comprehension of option trade-offs and &ge; 80% bottom-quintile card enrollment.
                </li>
                <li>
                  <strong>Threshold 3 (Physical Diagnostic Value):</strong> The WP-1 72-hour step-drawdown and resistivity pre-gate empirically prevents a mis-sited structure or improper pump sizing.
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
