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
  { index: 0, label: '01 SEED', tagline: 'Certified Clonal Genetics', metricLabel: 'Genetics', metricValue: '100% Virus-Free' },
  { index: 1, label: '02 RHIZO', tagline: 'Clean Coco-Coir Roots', metricLabel: 'Substrate', metricValue: '5.8 pH Target' },
  { index: 2, label: '03 CANOPY', tagline: 'Climate-Protected Polyhouse', metricLabel: 'Optics', metricValue: 'Diffused Anti-Glare' },
  { index: 3, label: '04 BLOOM', tagline: 'Natural Bumblebee Pollination', metricLabel: 'Conformation', metricValue: '96.8% Conical' },
  { index: 4, label: '05 RIPEN', tagline: 'Satara Mountain Sweetness', metricLabel: 'Sugar Brix', metricValue: '14.2° Brix' },
  { index: 5, label: '06 HARVEST', tagline: 'Sunrise Hand-Picked at 4°C', metricLabel: 'Cold Chain', metricValue: '4.0°C in 45m' },
  { index: 6, label: '07 PUNNET', tagline: '5-Star Luxury Table Punnet', metricLabel: 'Packaging', metricValue: '125g Vented' },
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
      {/* Right Rail Desktop Navigator (Fixed on Right) */}
      <aside
        aria-label="Story chapter navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-3 pointer-events-auto"
      >
        {/* Skip button for high-intent investors */}
        <button
          onClick={onSkipToCore}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase text-stone-700 dark:text-zinc-300 bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-zinc-800 hover:border-rose-500 hover:text-rose-600 dark:hover:text-white transition-all shadow-lg backdrop-blur-md mb-2"
        >
          <span>Skip to Specs</span>
          <FastForward className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Phase Nodes */}
        <div className="flex flex-col gap-2 p-2.5 rounded-2xl bg-white/90 dark:bg-[#121622]/90 border border-stone-200 dark:border-zinc-800 shadow-xl backdrop-blur-xl">
          {STORY_PHASES.map((phase) => {
            const isActive = currentPhaseIndex === phase.index;
            return (
              <button
                key={phase.index}
                onClick={() => onSelectPhase(phase.index)}
                className={`group flex items-center gap-3 px-3 py-1.5 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/40 font-semibold'
                    : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex flex-col items-end text-right">
                  <span className="text-[11px] font-mono tracking-wider">
                    {phase.label}
                  </span>
                  <span className="text-[9px] text-stone-400 dark:text-zinc-500 group-hover:text-stone-600 dark:group-hover:text-zinc-300">
                    {phase.tagline}
                  </span>
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-rose-500 scale-125 shadow-[0_0_8px_rgba(244,63,94,0.7)]'
                      : 'bg-stone-300 dark:bg-zinc-600 group-hover:bg-stone-400 dark:group-hover:bg-zinc-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Micro progress indicator */}
        <div className="text-[10px] font-mono text-stone-500 dark:text-zinc-400 px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur border border-stone-200 dark:border-zinc-800 shadow-sm">
          PROGRESS: {(progress * 100).toFixed(0)}%
        </div>
      </aside>
    </>
  );
};
