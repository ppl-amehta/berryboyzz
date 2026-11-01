import React from 'react';
import { ArrowDown, ShieldCheck, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { STORY_PHASES } from './StoryScrubberRail';

interface StoryPhaseOverlayProps {
  onExploreCore: () => void;
}

export const StoryPhaseOverlay: React.FC<StoryPhaseOverlayProps> = ({ onExploreCore }) => {
  return (
    <div className="relative z-10 w-full pointer-events-none">
      {/* Phase 01: Embryonic Seed */}
      <section
        id="phase-0"
        className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 max-w-4xl mx-auto py-32"
      >
        <div className="pointer-events-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Phase 01 · Clonal Genetics
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Everything that follows is encoded in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-amber-200">
              0.4 grams.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed">
            We do not plant open-pollinated seed varieties. Every Berryboyzz asset originates from
            certified virus-indexed European & Californian Primocane tissue-culture clones, engineered to fruit in year one without seasonal dormancy.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-zinc-400">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              GENOME: <span className="text-amber-400">Autumn Bliss / Murano F1</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              PATHOGEN SCREEN: <span className="text-emerald-400">100% Virus-Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 02: Rhizosphere Sprout & Root Architecture */}
      <section
        id="phase-1"
        className="min-h-screen flex flex-col justify-center items-end px-6 md:px-16 max-w-4xl mx-auto py-32 text-right"
      >
        <div className="pointer-events-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Phase 02 · Substrate Rhizosphere
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            You're not buying dirt. <br />
            You're acquiring{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              biological semiconductors.
            </span>
          </h2>
          <p className="text-base md:text-lg text-zinc-300 max-w-xl font-light leading-relaxed ml-auto">
            Native Sahyadri red soil is isolated. Roots expand inside buffered coco-coir & perlite substrate
            inoculated with proprietary Bacto-Liquid microbial consortia, eliminating 100% of soil-borne wilt and nematode vectors.
          </p>
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 font-mono text-xs text-zinc-400">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              AIR-FILL POROSITY: <span className="text-emerald-400">&gt;22%</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              TARGET EC: <span className="text-teal-400">1.4 – 1.8 mS/cm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 03: Vegetative CEA Canopy */}
      <section
        id="phase-2"
        className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 max-w-4xl mx-auto py-32"
      >
        <div className="pointer-events-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Phase 03 · CEA Canopy Architecture
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Controlled Environment is not farming. <br />
            It is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-lime-300">
              photonic manufacturing.
            </span>
          </h2>
          <p className="text-base md:text-lg text-zinc-300 max-w-xl font-light leading-relaxed">
            Under 200-micron anti-drip diffused polyhouse film, light transforms into uniform photosynthetic canopy.
            High-wire T-trellising ensures maximum leaf area exposure and rapid sap translocation.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-zinc-400">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              PULSE DOSING: <span className="text-green-400">8x Daily (Solar-tracked)</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              DENSITY: <span className="text-green-400">4,000 canes / Acre</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 04: White Blossom & Pollination */}
      <section
        id="phase-3"
        className="min-h-screen flex flex-col justify-center items-end px-6 md:px-16 max-w-4xl mx-auto py-32 text-right"
      >
        <div className="pointer-events-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            Phase 04 · Biological Anthesis
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            100% conical geometry. <br />
            Engineered by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-200 to-white">
              native bumblebee hives.
            </span>
          </h2>
          <p className="text-base md:text-lg text-zinc-300 max-w-xl font-light leading-relaxed ml-auto">
            Misshapen berries reduce wholesale margins by 40%. We house resident Bombus terrestris hives inside
            every enclosed unit to achieve complete pistil fertilization and symmetrical drupelet distribution.
          </p>
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 font-mono text-xs text-zinc-400">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              GRADE-A CONFORMATION: <span className="text-rose-300">96.8%</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              POLLINATOR EFFICIENCY: <span className="text-amber-300">2.4x vs Honeybees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 05: Ripening & Anthocyanin Swell */}
      <section
        id="phase-4"
        className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 max-w-4xl mx-auto py-32"
      >
        <div className="pointer-events-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/10 border border-rose-500/30 text-rose-400 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Phase 05 · Chemical Matrix
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Brix is not a vibe. <br />
            It's a number{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-purple-400">
              in our off-take contract.
            </span>
          </h2>
          <p className="text-base md:text-lg text-zinc-300 max-w-xl font-light leading-relaxed">
            Cold night temperatures in the Satara foothills (14°C) combined with high potassium-silicate fertigation
            concentrate natural fructose, yielding 14.2° Brix sweetness that luxury patisseries pay double for.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-zinc-400">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              AVERAGE BRIX: <span className="text-rose-400">14.2°</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              ANTHOCYANIN DENSITY: <span className="text-purple-400">High-ORAC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 06: Precision Harvest */}
      <section
        id="phase-5"
        className="min-h-screen flex flex-col justify-center items-end px-6 md:px-16 max-w-4xl mx-auto py-32 text-right"
      >
        <div className="pointer-events-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Phase 06 · Thermal Arrest
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Pre-cooled to 4°C <br />
            within{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
              45 minutes of harvest.
            </span>
          </h2>
          <p className="text-base md:text-lg text-zinc-300 max-w-xl font-light leading-relaxed ml-auto">
            Berries respire at ferocious speed in ambient Indian heat. Our on-farm forced-air pre-cooling pulls the core
            pulp temperature down instantly, arresting decay and ensuring zero spoilage across the Mumbai-Pune corridor.
          </p>
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 font-mono text-xs text-zinc-400">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              CORE PULP PULLDOWN: <span className="text-sky-400">2°C – 4°C</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
              SHELF LIFE: <span className="text-indigo-400">14 Days Monitored</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 07: Luxury Punnet Table Presentation */}
      <section
        id="phase-6"
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-16 max-w-4xl mx-auto py-32 text-center"
      >
        <div className="pointer-events-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-mono tracking-widest uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
            Phase 07 · The Apex Liquidation
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            This is what{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-300 to-amber-300">
              ₹2,800/kg
            </span>{' '}
            looks like on a luxury shelf.
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Delivered directly to five-star hospitality kitchens, luxury organic grocers, and direct private subscriber
            cellars. Contracted off-take guarantees 100% harvest liquidation before planting even begins.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreCore}
              className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 hover:from-rose-500 hover:to-purple-500 shadow-xl shadow-rose-950/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <span>Explore Commercial Farm & Investment Specs</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
