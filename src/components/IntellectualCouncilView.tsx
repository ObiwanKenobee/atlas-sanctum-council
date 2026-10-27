import React, { useState } from 'react';
import { INTELLECTUAL_COUNCIL } from '../data/intellectualCouncilData';

export const IntellectualCouncilView: React.FC = () => {
  const [selectedThinkerId, setSelectedThinkerId] = useState<string>('ALL');

  const visibleThinkers =
    selectedThinkerId === 'ALL'
      ? INTELLECTUAL_COUNCIL
      : INTELLECTUAL_COUNCIL.filter((t) => t.id === selectedThinkerId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="border border-stone-200 bg-white p-6 lg:p-8">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
          SECTION II · INTELLECTUAL FOUNDATIONS & PRODUCTIVE DISAGREEMENTS
        </div>
        <h1 className="text-3xl lg:text-4xl font-editorial font-medium text-stone-900 mt-2">
          The Interdisciplinary Intellectual Council
        </h1>
        <p className="text-sm lg:text-base text-stone-700 leading-relaxed max-w-3xl mt-2">
          Translating ten foundational scientific, economic, philosophical, and ecological traditions into concrete ARDE software components, data structures, empirical tests, and failure bounds—while explicitly preserving productive tensions where their frameworks disagree.
        </p>

        {/* Thinker Selector */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedThinkerId('ALL')}
            className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap shrink-0 ${
              selectedThinkerId === 'ALL'
                ? 'bg-stone-900 text-white'
                : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
            }`}
          >
            All 10 Intellectual Traditions
          </button>
          {INTELLECTUAL_COUNCIL.map((member) => (
            <button
              key={member.id}
              type="button"
              onClick={() => setSelectedThinkerId(member.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                selectedThinkerId === member.id
                  ? 'bg-[#14532D] text-white'
                  : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
              }`}
            >
              {member.thinker}
            </button>
          ))}
        </div>
      </section>

      {/* Council Cards Answering All 5 Mandatory Questions + Productive Disagreement */}
      <div className="space-y-6">
        {visibleThinkers.map((m, index) => (
          <article
            key={m.id}
            className="border border-stone-200 bg-white p-6 lg:p-7 space-y-5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-stone-200">
              <div>
                <div className="text-xs font-mono text-stone-500">
                  <span>TRADITION {String(index + 1).padStart(2, '0')}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>{m.lifespanOrEra}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span className="text-[#14532D] font-semibold">
                    {m.q3TechnicalEmbodiment.architecturalLayer}
                  </span>
                </div>
                <h2 className="text-2xl font-editorial font-semibold text-stone-900 mt-1">
                  {m.thinker} — {m.domainTradition}
                </h2>
              </div>
              <div className="text-xs font-mono text-stone-500 shrink-0">
                Reference: {m.coreWorkReference}
              </div>
            </div>

            {/* Five Mandatory Questions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
              <div className="space-y-3">
                <div>
                  <div className="font-mono font-semibold text-stone-900">
                    1. What is the underlying insight?
                  </div>
                  <p className="text-stone-700 leading-relaxed mt-1">
                    {m.q1UnderlyingInsight}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-200">
                  <div className="font-mono font-semibold text-stone-900">
                    2. What decision problem does it solve?
                  </div>
                  <p className="text-stone-700 leading-relaxed mt-1">
                    {m.q2DecisionProblemSolved}
                  </p>
                </div>
              </div>

              <div className="space-y-3 lg:border-l lg:border-stone-200 lg:pl-6">
                <div>
                  <div className="font-mono font-semibold text-[#14532D]">
                    3. Software Component, Data Structure & Governance Rule
                  </div>
                  <div className="font-semibold text-stone-900 mt-1">
                    {m.q3TechnicalEmbodiment.componentName}
                  </div>
                  <p className="text-stone-700 leading-relaxed mt-1">
                    {m.q3TechnicalEmbodiment.dataStructureOrRule}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-200">
                  <div className="font-mono font-semibold text-stone-900">
                    4. What empirical evidence indicates it works?
                  </div>
                  <p className="text-stone-700 leading-relaxed mt-1">
                    {m.q4EmpiricalVerification}
                  </p>
                </div>
              </div>

              <div className="space-y-3 lg:border-l lg:border-stone-200 lg:pl-6">
                <div>
                  <div className="font-mono font-semibold text-[#9A3412]">
                    5. Limitations & Unintended Consequences Anticipated
                  </div>
                  <p className="text-stone-700 leading-relaxed mt-1">
                    {m.q5LimitationsAndUnintendedConsequences}
                  </p>
                </div>

                <div className="p-3.5 bg-[#F2EFE9] border border-stone-200 space-y-1.5">
                  <div className="font-mono font-semibold text-stone-900">
                    PRESERVED PRODUCTIVE DISAGREEMENT vs. {m.productiveDisagreementWith.counterpartThinker.toUpperCase()}
                  </div>
                  <p className="text-stone-700">
                    <strong>Tension:</strong> {m.productiveDisagreementWith.tensionStatement}
                  </p>
                  <p className="text-stone-900 pt-1 border-t border-stone-300">
                    <strong>How ARDE Operationalizes Both:</strong>{' '}
                    {m.productiveDisagreementWith.howArdePreservesTension}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
