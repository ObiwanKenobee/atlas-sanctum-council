import React, { useState } from 'react';
import { KENYA_DECISION_RECORDS } from './data/kenyaDecisionRecords';
import { CanonicalDecisionRecord } from './types/arde';
import { DecisionWorkbench } from './components/DecisionWorkbench';
import { InventionDossierView } from './components/InventionDossierView';
import { IntellectualCouncilView } from './components/IntellectualCouncilView';
import { CanonicalSchemaView } from './components/CanonicalSchemaView';
import { ExperimentalPilotView } from './components/ExperimentalPilotView';

type PrimaryView =
  | 'WORKBENCH'
  | 'DOSSIER'
  | 'COUNCIL'
  | 'SCHEMAS'
  | 'PILOT';

export function App() {
  const [activeView, setActiveView] = useState<PrimaryView>('WORKBENCH');
  const [records, setRecords] = useState<CanonicalDecisionRecord[]>(KENYA_DECISION_RECORDS);
  const [activeRecordId, setActiveRecordId] = useState<string>(
    KENYA_DECISION_RECORDS[0].decisionId
  );

  const activeRecord =
    records.find((r) => r.decisionId === activeRecordId) || records[0];

  const handleUpdateRecord = (updated: CanonicalDecisionRecord) => {
    setRecords((prev) =>
      prev.map((r) => (r.decisionId === updated.decisionId ? updated : r))
    );
  };

  const handleExportDecisionRecord = () => {
    const payload = {
      $schema: 'https://schemas.atlassanctum.org/v1/canonical-decision-record.json',
      exportedAt: new Date().toISOString(),
      institution: 'Atlas Sanctum — Atlas Regenerative Decision Engine (ARDE)',
      canonicalRecord: activeRecord,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeRecord.decisionId}-${activeRecord.version}.atlas.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 lg:px-10 py-4 border-b border-stone-200 bg-[#FBF9F5]/95 backdrop-blur-xs">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('WORKBENCH');
          }}
          className="text-xl font-editorial font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          Atlas Sanctum
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="#decision-engine"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('WORKBENCH');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === 'WORKBENCH'
                ? 'text-stone-900 underline underline-offset-8 decoration-2 decoration-[#14532D]'
                : 'hover:text-stone-900'
            }`}
          >
            Decision Engine
          </a>
          <a
            href="#invention-dossier"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('DOSSIER');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === 'DOSSIER'
                ? 'text-stone-900 underline underline-offset-8 decoration-2 decoration-[#14532D]'
                : 'hover:text-stone-900'
            }`}
          >
            Invention Dossier
          </a>
          <a
            href="#intellectual-council"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('COUNCIL');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === 'COUNCIL'
                ? 'text-stone-900 underline underline-offset-8 decoration-2 decoration-[#14532D]'
                : 'hover:text-stone-900'
            }`}
          >
            Intellectual Council
          </a>
          <a
            href="#canonical-schemas"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('SCHEMAS');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === 'SCHEMAS'
                ? 'text-stone-900 underline underline-offset-8 decoration-2 decoration-[#14532D]'
                : 'hover:text-stone-900'
            }`}
          >
            Canonical Schemas
          </a>
          <a
            href="#experimental-pilot"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('PILOT');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === 'PILOT'
                ? 'text-stone-900 underline underline-offset-8 decoration-2 decoration-[#14532D]'
                : 'hover:text-stone-900'
            }`}
          >
            Experimental Pilot
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleExportDecisionRecord}
            className="px-4 py-2 text-xs font-medium text-white bg-[#14532D] rounded hover:bg-[#14532D]/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Export Decision Record
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar (visible only on small screens) */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto px-4 py-2.5 border-b border-stone-200 bg-[#F2EFE9]">
        {[
          { id: 'WORKBENCH', label: 'Decision Engine' },
          { id: 'DOSSIER', label: 'Invention Dossier' },
          { id: 'COUNCIL', label: 'Intellectual Council' },
          { id: 'SCHEMAS', label: 'Canonical Schemas' },
          { id: 'PILOT', label: 'Experimental Pilot' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveView(item.id as PrimaryView)}
            className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap shrink-0 ${
              activeView === item.id
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 bg-white border border-stone-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Institutional Marquee & Governing Principle Banner */}
      <div className="border-b border-stone-200 bg-[#F2EFE9]">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-xs font-mono text-stone-600">
                <span>ATLAS REGENERATIVE DECISION ENGINE (ARDE)</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>PLACE-BASED DECISION INTELLIGENCE INFRASTRUCTURE</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>KENYA PROVING GROUND</span>
              </div>
              <p className="text-base lg:text-lg font-editorial italic text-stone-900 leading-relaxed">
                “What would we build if intelligence were treated not as an instrument of domination, but as a sacred responsibility to seek truth, exercise wisdom, protect the vulnerable, steward creation, and help civilization flourish across generations?”
              </p>
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-stone-300 lg:pl-6 text-xs space-y-1.5 font-mono text-stone-700">
              <div>
                <span className="text-stone-500">Fundamental Unit:</span>{' '}
                <strong className="text-stone-900">Auditable Decision Record</strong>
              </div>
              <div>
                <span className="text-stone-500">Architecture:</span>{' '}
                <strong className="text-stone-900">6 Epistemic Layers · 7 Cyclical Stages</strong>
              </div>
              <div>
                <span className="text-stone-500">Initial Proving Ground:</span>{' '}
                <strong className="text-[#14532D]">Makueni &amp; Kitui ASAL Water Commons</strong>
              </div>
              <div>
                <span className="text-stone-500">Phase-Zero Experiment:</span>{' '}
                <strong className="text-stone-900 tabular-nums">90 Days · USD $19,800 · Falsifiable</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container (1440px Desktop Presence) */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-6 lg:px-10 py-8">
        {activeView === 'WORKBENCH' && (
          <DecisionWorkbench
            records={records}
            activeRecordId={activeRecordId}
            onSelectRecord={(id) => setActiveRecordId(id)}
            onUpdateRecord={handleUpdateRecord}
          />
        )}

        {activeView === 'DOSSIER' && <InventionDossierView />}

        {activeView === 'COUNCIL' && <IntellectualCouncilView />}

        {activeView === 'SCHEMAS' && (
          <CanonicalSchemaView
            record={activeRecord}
            onExportJson={handleExportDecisionRecord}
          />
        )}

        {activeView === 'PILOT' && <ExperimentalPilotView />}
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="border-t border-stone-200 bg-[#F2EFE9] mt-16">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            <span className="font-editorial font-semibold text-stone-900">Atlas Sanctum</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Atlas Regenerative Decision Engine (ARDE)</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Intelligence in service of truth, stewardship, and human flourishing.</span>
          </div>
          <div className="flex items-center gap-5 font-mono">
            <button
              type="button"
              onClick={() => setActiveView('WORKBENCH')}
              className="hover:text-stone-900 cursor-pointer"
            >
              Workbench
            </button>
            <button
              type="button"
              onClick={() => setActiveView('DOSSIER')}
              className="hover:text-stone-900 cursor-pointer"
            >
              12-Section Dossier
            </button>
            <button
              type="button"
              onClick={handleExportDecisionRecord}
              className="text-[#14532D] font-semibold hover:underline cursor-pointer"
            >
              Export Canonical JSON
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
