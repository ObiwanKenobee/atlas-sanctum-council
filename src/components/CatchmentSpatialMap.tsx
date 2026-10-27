import React, { useState } from 'react';
import { CanonicalDecisionRecord, EvidenceNode } from '../types/arde';

interface CatchmentSpatialMapProps {
  record: CanonicalDecisionRecord;
  selectedEvidenceId: string | null;
  onSelectEvidenceNode: (nodeId: string) => void;
}

export const CatchmentSpatialMap: React.FC<CatchmentSpatialMapProps> = ({
  record,
  selectedEvidenceId,
  onSelectEvidenceNode,
}) => {
  const [viewMode, setViewMode] = useState<'PLANIMETRIC_GIS' | 'HYDROGEOLOGICAL_CROSS_SECTION'>('PLANIMETRIC_GIS');
  const [showSandDams, setShowSandDams] = useState(true);
  const [showFaultLineament, setShowFaultLineament] = useState(true);
  const [showIsochrones, setShowIsochrones] = useState(true);

  const isMakueni = record.decisionId === 'DEC-KE-2026-0842';

  const spatialMarkers: {
    id: string;
    evidenceId: string;
    label: string;
    sublabel: string;
    x: number;
    y: number;
    kind: 'BOREHOLE' | 'SAND_DAM' | 'COMMUNITY_KIOSK' | 'MISSING_FAULT' | 'WRA_GAUGE';
  }[] = isMakueni
    ? [
        {
          id: 'MK-1',
          evidenceId: 'EV-0842-01',
          label: 'BH-KT-02 (Nziu Borehole)',
          sublabel: 'LoRaWAN Piezometer · -3.8m Drawdown',
          x: 340,
          y: 185,
          kind: 'BOREHOLE',
        },
        {
          id: 'MK-2',
          evidenceId: 'EV-0842-03',
          label: 'Sand Dam #1B & #2 Cascade',
          sublabel: '+52 m³/day Alluvial Recharge',
          x: 215,
          y: 138,
          kind: 'SAND_DAM',
        },
        {
          id: 'MK-3',
          evidenceId: 'EV-0842-02',
          label: 'Nziu & Kee Prepaid Water Kiosks',
          sublabel: 'Lifeline Tier: KES 1.50/20L · 593 Indigent Cards',
          x: 410,
          y: 225,
          kind: 'COMMUNITY_KIOSK',
        },
        {
          id: 'MK-4',
          evidenceId: 'EV-0842-05',
          label: 'Nziu–Kee Fault Lineament (Unmapped T)',
          sublabel: 'WP-1 72-Hr Step-Drawdown Verification Zone',
          x: 495,
          y: 265,
          kind: 'MISSING_FAULT',
        },
        {
          id: 'MK-5',
          evidenceId: 'EV-0842-04',
          label: 'WRA Weir 3F12 & Lower Kee Troughs',
          sublabel: '75 m³/day Cap · 30% Ecological Reserve',
          x: 645,
          y: 315,
          kind: 'WRA_GAUGE',
        },
      ]
    : [
        {
          id: 'KT-1',
          evidenceId: 'EV-0915-01',
          label: 'Tiva Transect T-08 (Denuded Reach)',
          sublabel: '0.68m Sand Depth · EC 2,950 µS/cm',
          x: 290,
          y: 175,
          kind: 'BOREHOLE',
        },
        {
          id: 'KT-2',
          evidenceId: 'EV-0915-02',
          label: 'Kavonzweni Youth Masonry & ISSB Site',
          sublabel: '145 Youth Cooperative · 4 Staged Weirs',
          x: 475,
          y: 235,
          kind: 'SAND_DAM',
        },
      ];

  const activeEvidence: EvidenceNode | undefined =
    record.evidenceNodes.find((n) => n.id === selectedEvidenceId) || record.evidenceNodes[0];

  return (
    <div className="border border-stone-200 bg-white">
      {/* Top Instrument Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 bg-[#F2EFE9] px-5 py-3">
        <div>
          <div className="text-xs font-mono text-stone-600">
            <span>{record.place.catchmentName}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{record.place.boundingBox}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>SRTM 30m + Hydrogeological Audit</span>
          </div>
          <h3 className="text-base font-semibold text-stone-900 mt-0.5">
            Spatial Evidence & Subsurface Aquifer Coupling Model
          </h3>
        </div>

        {/* Interactive View Switcher */}
        <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded">
          <button
            type="button"
            onClick={() => setViewMode('PLANIMETRIC_GIS')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
              viewMode === 'PLANIMETRIC_GIS'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Catchment GIS Plan View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('HYDROGEOLOGICAL_CROSS_SECTION')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
              viewMode === 'HYDROGEOLOGICAL_CROSS_SECTION'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Subsurface Aquifer Cross-Section
          </button>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 px-5 py-2.5 text-xs text-stone-600 bg-[#FBF9F5]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-medium text-stone-800">Active Spatial Layers:</span>
          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showSandDams}
              onChange={(e) => setShowSandDams(e.target.checked)}
              className="accent-[#14532D] rounded"
            />
            <span>Alluvial Sand Dam Recharge Zones</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showFaultLineament}
              onChange={(e) => setShowFaultLineament(e.target.checked)}
              className="accent-[#14532D] rounded"
            />
            <span>Basement Fracture Lineaments & Uncertainties</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showIsochrones}
              onChange={(e) => setShowIsochrones(e.target.checked)}
              className="accent-[#14532D] rounded"
            />
            <span>1.5 km Safe Walk Isochrone vs. Upper Ridge Slope</span>
          </label>
        </div>
        <div className="font-mono text-stone-500">
          Population in Catchment: {record.place.populationAffected.toLocaleString()} residents
        </div>
      </div>

      {/* Main Map / Cross-Section Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 relative bg-[#F6F3EC] border-b lg:border-b-0 lg:border-r border-stone-200">
          {viewMode === 'PLANIMETRIC_GIS' ? (
            <svg
              viewBox="0 0 800 400"
              className="w-full h-[360px] md:h-[400px] block select-none"
              role="img"
              aria-label="Sub-Catchment Planimetric GIS Map showing river channel, sand dams, boreholes, and fault lineaments"
            >
              <defs>
                <pattern id="topoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#E5E0D5"
                    strokeWidth="0.75"
                  />
                </pattern>
              </defs>

              {/* Coordinate Grid */}
              <rect width="800" height="400" fill="url(#topoGrid)" />

              {/* Topographic Elevation Contours */}
              <path
                d="M 20 60 Q 240 40, 460 95 T 780 150"
                fill="none"
                stroke="#D6CEBE"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text x="30" y="52" fontSize="10" fill="#78716C" fontFamily="IBM Plex Mono">
                1,250m ASL (Upper Kyamuthei Ridge — Slope Impedance Zone)
              </text>

              <path
                d="M 10 290 Q 280 310, 520 355 T 790 385"
                fill="none"
                stroke="#D6CEBE"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text x="30" y="378" fontSize="10" fill="#78716C" fontFamily="IBM Plex Mono">
                1,040m ASL (Lower Kee Agro-Pastoralist Plain)
              </text>

              {/* 1.5 km Safe Walk Isochrones */}
              {showIsochrones && (
                <g>
                  <circle
                    cx="340"
                    cy="185"
                    r="92"
                    fill="#14532D"
                    fillOpacity="0.06"
                    stroke="#14532D"
                    strokeWidth="1"
                    strokeDasharray="5 3"
                  />
                  <circle
                    cx="410"
                    cy="225"
                    r="85"
                    fill="#1E3A8A"
                    fillOpacity="0.05"
                    stroke="#1E3A8A"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <text x="260" y="84" fontSize="10" fill="#14532D" fontFamily="IBM Plex Mono">
                    1.5 km Round-Trip Safe Access Zone (&le; 30 min)
                  </text>
                </g>
              )}

              {/* Subsurface Fault Lineament & Uncertainty Zone */}
              {showFaultLineament && (
                <g>
                  <line
                    x1="310"
                    y1="170"
                    x2="630"
                    y2="320"
                    stroke="#B45309"
                    strokeWidth="2.5"
                    strokeDasharray="8 5"
                  />
                  <rect
                    x="440"
                    y="232"
                    width="135"
                    height="38"
                    rx="3"
                    fill="#FEF3C7"
                    fillOpacity="0.85"
                    stroke="#B45309"
                    strokeWidth="1"
                  />
                  <text x="448" y="248" fontSize="9.5" fontWeight="600" fill="#92400E" fontFamily="IBM Plex Mono">
                    MISSING DATA: EV-0842-05
                  </text>
                  <text x="448" y="261" fontSize="9" fill="#78350F" fontFamily="Plus Jakarta Sans">
                    Fracture Transmissivity Test
                  </text>
                </g>
              )}

              {/* Ephemeral Sand River Channel (Kaiti / Tiva) */}
              <path
                d="M 40 85 C 160 110, 230 145, 340 185 C 450 225, 550 280, 760 350"
                fill="none"
                stroke="#D6C7A9"
                strokeWidth="22"
                strokeLinecap="round"
              />
              <path
                d="M 40 85 C 160 110, 230 145, 340 185 C 450 225, 550 280, 760 350"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="10 4"
              />

              {/* Sand Dam Perched Alluvial Recharge Plumes */}
              {showSandDams && (
                <g>
                  <ellipse
                    cx="215"
                    cy="138"
                    rx="58"
                    ry="26"
                    transform="rotate(21 215 138)"
                    fill="#0284C7"
                    fillOpacity="0.18"
                    stroke="#0284C7"
                    strokeWidth="1.2"
                  />
                  {/* Concrete Sand Dam Weir Walls */}
                  <line
                    x1="190"
                    y1="115"
                    x2="205"
                    y2="148"
                    stroke="#1C1917"
                    strokeWidth="4"
                  />
                  <line
                    x1="230"
                    y1="130"
                    x2="245"
                    y2="162"
                    stroke="#1C1917"
                    strokeWidth="4"
                  />
                  {/* Site 1A Relocated Pegmatite Warning */}
                  <text x="128" y="176" fontSize="9.5" fill="#0369A1" fontFamily="IBM Plex Mono">
                    Perched Alluvial Storage (+18,500 m³)
                  </text>
                </g>
              )}

              {/* Interactive Evidence Markers */}
              {spatialMarkers.map((m) => {
                const isSelected = selectedEvidenceId === m.evidenceId;
                const fillByKind =
                  m.kind === 'BOREHOLE'
                    ? '#14532D'
                    : m.kind === 'SAND_DAM'
                    ? '#0369A1'
                    : m.kind === 'MISSING_FAULT'
                    ? '#B45309'
                    : m.kind === 'COMMUNITY_KIOSK'
                    ? '#1E3A8A'
                    : '#44403C';

                return (
                  <g
                    key={m.id}
                    className="cursor-pointer"
                    onClick={() => onSelectEvidenceNode(m.evidenceId)}
                  >
                    {isSelected && (
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r="18"
                        fill="none"
                        stroke={fillByKind}
                        strokeWidth="2"
                      />
                    )}
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r="9"
                      fill={fillByKind}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <rect
                      x={m.x + 14}
                      y={m.y - 18}
                      width="205"
                      height="34"
                      rx="3"
                      fill={isSelected ? '#1C1917' : '#FFFFFF'}
                      stroke={isSelected ? '#1C1917' : '#D6CEBE'}
                      strokeWidth="1"
                    />
                    <text
                      x={m.x + 20}
                      y={m.y - 4}
                      fontSize="10.5"
                      fontWeight="600"
                      fill={isSelected ? '#FFFFFF' : '#1C1917'}
                      fontFamily="Plus Jakarta Sans"
                    >
                      {m.label}
                    </text>
                    <text
                      x={m.x + 20}
                      y={m.y + 9}
                      fontSize="9.5"
                      fill={isSelected ? '#D6CEBE' : '#57534E'}
                      fontFamily="IBM Plex Mono"
                    >
                      {m.sublabel}
                    </text>
                  </g>
                );
              })}

              {/* Scale Bar & North Arrow */}
              <g transform="translate(24, 325)">
                <line x1="0" y1="0" x2="80" y2="0" stroke="#1C1917" strokeWidth="2" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#1C1917" strokeWidth="2" />
                <line x1="80" y1="-4" x2="80" y2="4" stroke="#1C1917" strokeWidth="2" />
                <text x="18" y="-6" fontSize="9.5" fill="#1C1917" fontFamily="IBM Plex Mono">
                  1.0 km Scale
                </text>
              </g>
            </svg>
          ) : (
            /* Hydrogeological Cross-Section View */
            <svg
              viewBox="0 0 800 400"
              className="w-full h-[360px] md:h-[400px] block select-none"
              role="img"
              aria-label="Hydrogeological Cross-Section showing alluvial sand dam storage, weathered gneiss regolith, and deep basement fractures"
            >
              {/* Sky & Surface */}
              <rect x="0" y="0" width="800" height="90" fill="#FBF9F5" />
              {/* Alluvial Sand Layer (Top) */}
              <path
                d="M 0 90 L 260 105 L 520 125 L 800 145 L 800 175 L 520 160 L 260 145 L 0 120 Z"
                fill="#E7D8B5"
                stroke="#C7B287"
              />
              {/* Weathered Regolith / Saprolite Zone */}
              <path
                d="M 0 120 L 260 145 L 520 160 L 800 175 L 800 255 L 520 245 L 260 225 L 0 205 Z"
                fill="#D6CEBE"
                stroke="#B8AFA0"
              />
              {/* Fresh Precambrian Basement Gneiss */}
              <path
                d="M 0 205 L 260 225 L 520 245 L 800 255 L 800 400 L 0 400 Z"
                fill="#A8A29E"
              />

              {/* Pegmatite Intrusion Detected by WP-1 at Site 1A */}
              <polygon
                points="235,140 265,145 285,395 215,395"
                fill="#78716C"
                stroke="#44403C"
                strokeWidth="1.5"
              />
              <text x="165" y="345" fontSize="9.5" fill="#FFFFFF" fontFamily="IBM Plex Mono">
                Impermeable Pegmatite Dyke (WP-1 Discovery: Shifted Dam 140m Upstream)
              </text>

              {/* Perched Water Table from Sand Dam #1B */}
              <path
                d="M 60 95 L 210 102 L 210 140 L 60 120 Z"
                fill="#0284C7"
                fillOpacity="0.45"
              />
              {/* Concrete Sand Dam Wall keyed into bedrock */}
              <rect x="206" y="84" width="10" height="62" fill="#1C1917" />
              <text x="55" y="75" fontSize="10.5" fontWeight="600" fill="#0369A1" fontFamily="Plus Jakarta Sans">
                Sand Dam #1B Perched Aquifer (+52 m³/day Bank Recharge)
              </text>

              {/* Recharge Vectors into Weathered Gneiss */}
              <path
                d="M 150 130 Q 290 190, 355 210"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />

              {/* Borehole BH-KT-02 Well Shaft */}
              <rect x="355" y="75" width="10" height="235" fill="#1C1917" />
              <rect x="357" y="195" width="6" height="105" fill="#38BDF8" />
              <text x="375" y="92" fontSize="11" fontWeight="700" fill="#14532D" fontFamily="Plus Jakarta Sans">
                BH-KT-02 (Nziu Solar-Hybrid Borehole · 105m Depth)
              </text>
              <text x="375" y="185" fontSize="10" fill="#1C1917" fontFamily="IBM Plex Mono">
                Static Water Level: 64.2m bgl (Recovered +1.4m Post-Dam)
              </text>
              <text x="375" y="202" fontSize="10" fill="#9A3412" fontFamily="IBM Plex Mono">
                Option A Un-Recharged Drawdown Cone Risk (&gt;95m bgl)
              </text>

              {/* Downstream Kee Shallow Hand-Pump */}
              <rect x="650" y="115" width="8" height="105" fill="#1E3A8A" />
              <text x="560" y="108" fontSize="10.5" fontWeight="600" fill="#1E3A8A" fontFamily="Plus Jakarta Sans">
                Downstream Kee Community Well (Protected by 75 m³/d Cap)
              </text>

              {/* Layer Labels */}
              <text x="16" y="112" fontSize="9.5" fill="#44403C" fontFamily="IBM Plex Mono">
                L1: Alluvial Coarse Quartz Sand (0–4m)
              </text>
              <text x="16" y="168" fontSize="9.5" fill="#44403C" fontFamily="IBM Plex Mono">
                L2: Weathered Gneiss Saprolite Aquifer (4–45m)
              </text>
              <text x="16" y="290" fontSize="9.5" fill="#F5F5F4" fontFamily="IBM Plex Mono">
                L3: Fractured Precambrian Basement Complex (45–165m)
              </text>
            </svg>
          )}
        </div>

        {/* Right Inspection Panel: Selected Spatial Evidence Node */}
        <div className="lg:col-span-4 p-5 flex flex-col justify-between bg-[#FBF9F5]">
          {activeEvidence && (
            <div>
              <div className="text-xs font-mono text-stone-500">
                <span>{activeEvidence.id}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span className="font-semibold text-stone-800">{activeEvidence.epistemicClass}</span>
              </div>
              <h4 className="text-base font-semibold text-stone-900 mt-1">
                {activeEvidence.title}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed mt-2">
                {activeEvidence.statement}
              </p>

              <dl className="mt-4 pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div>
                  <dt className="text-stone-500 font-mono">Source & Instrumentation</dt>
                  <dd className="text-stone-900 font-medium mt-0.5">
                    {activeEvidence.sourceInstitution} — {activeEvidence.sourceAuthorOrSensor}
                  </dd>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <dt className="text-stone-500 font-mono">Measured Value</dt>
                    <dd className="font-mono font-semibold text-stone-900 mt-0.5 tabular-nums">
                      {activeEvidence.measuredValue}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500 font-mono">Calibrated Uncertainty</dt>
                    <dd className="font-mono text-stone-800 mt-0.5 tabular-nums">
                      {activeEvidence.confidenceInterval}
                    </dd>
                  </div>
                </div>
                <div className="pt-1">
                  <dt className="text-stone-500 font-mono">Falsification / Reversal Condition</dt>
                  <dd className="text-stone-800 mt-0.5">
                    {activeEvidence.wouldChangeConclusionIf}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Coordinates: {activeEvidence?.coordinates.lat.toFixed(3)}°, {activeEvidence?.coordinates.lng.toFixed(3)}°</span>
            <span>Reliability: {Math.round((activeEvidence?.reliabilityScore || 0) * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
