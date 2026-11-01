import React from 'react';
import { FastForward, ArrowDown } from 'lucide-react';

export interface PhaseMeta {
  index: number;
  label: string;
  tagline: string;
  metricLabel: string;
  metricValue: string;
}

export const STORY_PHASES: PhaseMeta[] = [
  { index: 0, label: '01 SEED', tagline: '0.4g Primocane Genome', metricLabel: 'DNA Index', metricValue: 'F1 Clonal' },
  { index: 1, label: '02 RHIZO', tagline: 'Substrate Colonization', metricLabel: 'Root Zone pH', metricValue: '5.8 pH' },
  { index: 2, label: '03 CANOPY', tagline: 'CEA Solar Interception', metricLabel: 'PAR Lux', metricValue: '850 μmol' },
  { index: 3, label: '04 BLOOM', tagline: 'Entomophilic Anthesis', metricLabel: 'Pollination', metricValue: '100% Bombus' },
  { index: 4, label: '05 RIPEN', tagline: 'Anthocyanin & Sucrose', metricLabel: 'Brix Sugar', metricValue: '14.2° Brix' },
  { index: 5, label: '06 HARVEST', tagline: 'Stem Abscission & Dew', metricLabel: 'Core Pulp', metricValue: '4.0°C Pulldown' },
  { index: 6, label: '07 PUNNET', tagline: 'Cold-Chain Table Luxury', metricLabel: 'Export Grade', metricValue: '125g Vented' },
];

interface StoryScrubberRailProps {
  currentPhaseIndex: number;
  progress: number;
  onSelectPhase: (phaseIndex: number) => void;
  onSkipToCore: () => void;
}

export const StoryScrubberRail: React.FC<StoryScrubberRailProps> = ({
  currentPhaseIndex,
  progress,
  onSelectPhase,
  onSkipToCore,
}) => {
  return (
    <>
      {/* Right Rail Desktop Navigator */}
      <aside
        aria-label="Story chapter navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3 pointer-events-auto"
      >
        {/* Skip button for high-intent investors */}
        <button
          onClick={onSkipToCore}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase text-zinc-300 bg-zinc-900/80 border border-zinc-700/60 hover:border-rose-500/80 hover:text-white transition-all shadow-lg backdrop-blur-md mb-2"
        >
          <span>Skip to Pricing & Specs</span>
          <FastForward className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Phase Nodes */}
        <div className="flex flex-col gap-2.5 p-2 rounded-2xl glass-panel">
          {STORY_PHASES.map((phase) => {
            const isActive = currentPhaseIndex === phase.index;
            return (
              <button
                key={phase.index}
                onClick={() => onSelectPhase(phase.index)}
                className={`group flex items-center gap-3 px-3 py-1.5 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-rose-500/20 text-white border border-rose-500/50'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex flex-col items-end text-right">
                  <span className="text-[11px] font-mono tracking-wider font-semibold">
                    {phase.label}
                  </span>
                  <span className="text-[9px] text-zinc-400 group-hover:text-zinc-300 hidden xl:block">
                    {phase.tagline}
                  </span>
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-rose-400 scale-125 shadow-[0_0_8px_rgba(244,63,94,0.9)]'
                      : 'bg-zinc-600 group-hover:bg-zinc-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Micro progress indicator */}
        <div className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-black/40 backdrop-blur border border-zinc-800">
          MORPH: {(progress * 100).toFixed(1)}%
        </div>
      </aside>

      {/* Floating Bottom Skip Bar for Mobile Viewports */}
      <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-mono font-medium text-zinc-200">
            {STORY_PHASES[currentPhaseIndex]?.label || '01 SEED'}
          </span>
        </div>
        <button
          onClick={onSkipToCore}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-rose-600/30 text-rose-200 border border-rose-500/50"
        >
          <span>Skip Narrative</span>
          <ArrowDown className="w-3 h-3" />
        </button>
      </div>
    </>
  );
};
