import React, { useState } from 'react';
import { DOSSIER_CHAPTERS, DossierChapter } from '../data/dossierData';
import { EpistemicStatusTag } from '../types/arde';

export const InventionDossierView: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ALL');
  const [epistemicFilter, setEpistemicFilter] = useState<EpistemicStatusTag | 'ALL'>('ALL');

  const visibleChapters: DossierChapter[] =
    selectedChapterId === 'ALL'
      ? DOSSIER_CHAPTERS
      : DOSSIER_CHAPTERS.filter((c) => c.id === selectedChapterId);

  return (
    <div className="space-y-8">
      {/* Editorial Monograph Header */}
      <section className="border border-stone-200 bg-white p-6 lg:p-8">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
          ATLAS SANCTUM · COMPLETE TWELVE-SECTION INVENTION DOSSIER · OCTOBER 2026
        </div>
        <h1 className="text-3xl lg:text-4xl font-editorial font-medium text-stone-900 mt-2">
          The Architecture of Accountable Judgment
        </h1>
        <p className="text-sm lg:text-base text-stone-700 leading-relaxed max-w-3xl mt-3">
          A complete engineering, scientific, institutional, and commercial specification for the Atlas Regenerative Decision Engine (ARDE). Every claim is explicitly classified as Established Evidence, Reasoned Design Choice, Untested Hypothesis, Speculative Possibility, or Missing Information.
        </p>

        {/* Chapter Index & Epistemic Filter Controls */}
        <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedChapterId('ALL')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors whitespace-nowrap shrink-0 ${
                selectedChapterId === 'ALL'
                  ? 'bg-stone-900 text-white'
                  : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
              }`}
            >
              All 12 Chapters
            </button>
            {DOSSIER_CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setSelectedChapterId(ch.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors whitespace-nowrap shrink-0 ${
                  selectedChapterId === ch.id
                    ? 'bg-[#14532D] text-white'
                    : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
                }`}
              >
                {ch.number} · {ch.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-stone-500">Epistemic Filter:</span>
            <select
              value={epistemicFilter}
              onChange={(e) => setEpistemicFilter(e.target.value as EpistemicStatusTag | 'ALL')}
              className="bg-[#FBF9F5] border border-stone-300 px-2.5 py-1 text-xs font-mono text-stone-900"
            >
              <option value="ALL">All Epistemic Statuses</option>
              <option value="ESTABLISHED_EVIDENCE">Established Evidence</option>
              <option value="REASONED_DESIGN_CHOICE">Reasoned Design Choices</option>
              <option value="UNTESTED_HYPOTHESIS">Untested Hypotheses</option>
              <option value="SPECULATIVE_POSSIBILITY">Speculative Possibilities</option>
              <option value="MISSING_INFORMATION">Missing Information</option>
            </select>
          </div>
        </div>
      </section>

      {/* Dossier Chapters */}
      <div className="space-y-8">
        {visibleChapters.map((chapter) => {
          const filteredBlocks =
            epistemicFilter === 'ALL'
              ? chapter.epistemicBlocks
              : chapter.epistemicBlocks.filter((b) => b.status === epistemicFilter);

          return (
            <article
              key={chapter.id}
              id={`dossier-${chapter.id}`}
              className="border border-stone-200 bg-white p-6 lg:p-8 space-y-6"
            >
              {/* Chapter Title & Governing Question */}
              <div className="pb-5 border-b border-stone-200">
                <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
                  DOSSIER SECTION {chapter.number} OF 12 · {chapter.id.toUpperCase()}
                </div>
                <h2 className="text-2xl lg:text-3xl font-editorial font-semibold text-stone-900 mt-1">
                  {chapter.number}. {chapter.title}
                </h2>
                <p className="text-sm text-stone-600 mt-1">{chapter.subtitle}</p>
              </div>

              {/* Asymmetric Reading Grid: 70% Narrative + Technical Artifact / 30% Design Test & Epistemic Notes */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-5">
                  <div className="text-xs font-mono text-stone-500">
                    GOVERNING QUESTION: <span className="text-stone-900 font-sans italic">{chapter.governingQuestion}</span>
                  </div>

                  <p className="text-sm lg:text-base text-stone-800 leading-relaxed max-w-prose first-letter:text-4xl first-letter:font-editorial first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#14532D]">
                    {chapter.executiveSynthesis}
                  </p>

                  {/* Technical Artifact (Table, Equation, or SQL Schema) */}
                  <div className="pt-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                      Technical Specification · {chapter.technicalArtifact.title}
                    </div>

                    {chapter.technicalArtifact.rows ? (
                      <div className="overflow-x-auto border border-stone-200">
                        <table className="w-full text-left border-collapse text-xs">
                          <tbody className="divide-y divide-stone-200">
                            {chapter.technicalArtifact.rows.map((r, i) => (
                              <tr
                                key={i}
                                className={i === 0 && chapter.number === '01' ? 'bg-[#F2EFE9] font-semibold' : 'hover:bg-[#FBF9F5]'}
                              >
                                <td className="py-2.5 px-3 font-mono font-semibold text-stone-900 align-top w-1/5">
                                  {r.col1}
                                </td>
                                <td className="py-2.5 px-3 text-stone-700 align-top w-1/4">
                                  {r.col2}
                                </td>
                                <td className="py-2.5 px-3 text-stone-700 align-top w-1/4">
                                  {r.col3}
                                </td>
                                <td className="py-2.5 px-3 text-stone-900 font-medium align-top bg-[#14532D]/5">
                                  {r.col4}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <pre className="p-4 bg-[#1C1917] text-[#FBF9F5] font-mono text-xs overflow-x-auto leading-relaxed">
                        {chapter.technicalArtifact.content}
                      </pre>
                    )}
                  </div>
                </div>

                {/* Right Margin Column: Design Test & Epistemic Classification Blocks */}
                <div className="lg:col-span-4 space-y-4 lg:border-l lg:border-stone-200 lg:pl-6">
                  <div className="p-4 bg-[#F2EFE9] border border-stone-200 text-xs space-y-2">
                    <div className="font-mono font-semibold text-[#14532D]">
                      ARCHITECTURAL DESIGN TEST
                    </div>
                    <p className="text-stone-800 font-medium">{chapter.designTestQuestion}</p>
                    <p className="text-stone-700 pt-2 border-t border-stone-300 font-mono text-[11px]">
                      {chapter.designTestPassCriteria}
                    </p>
                  </div>

                  <div className="text-xs font-mono uppercase tracking-wider text-stone-500 pt-2">
                    Epistemic Disaggregation Blocks
                  </div>

                  {filteredBlocks.length > 0 ? (
                    filteredBlocks.map((blk, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 border border-stone-200 bg-[#FBF9F5] text-xs space-y-1.5"
                      >
                        <div className="font-mono font-semibold text-stone-900">
                          {blk.status}
                        </div>
                        <div className="font-semibold text-stone-900">{blk.heading}</div>
                        <p className="text-stone-700 leading-relaxed">{blk.body}</p>
                        <div className="text-[11px] font-mono text-stone-500 pt-1 border-t border-stone-200/80">
                          {blk.citationOrMechanism}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 border border-stone-200 text-xs text-stone-500">
                      No blocks match the selected epistemic filter in this chapter.
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
