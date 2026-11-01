import React, { useMemo } from 'react';
import { FastForward, ArrowDown, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface StoryPhaseContent {
  index: number;
  label: string;
  badge: string;
  headline: string;
  plainEnglishExplanation: string;
  agronomicNote: string;
  metricLabel: string;
  metricValue: string;
  imageSrc: string;
  altText: string;
}

export const HYPERREAL_PHASES: StoryPhaseContent[] = [
  {
    index: 0,
    label: '01 SEED',
    badge: 'Phase 01 · Certified European Genetics',
    headline: 'Every great harvest begins with certified mother plants.',
    plainEnglishExplanation:
      'We never gamble with unknown market seeds. Every Berryboyzz plant starts from certified, virus-tested European mother plants grown in sterile laboratories. They grow vigorously and bear abundant, sweet berries in their very first year.',
    agronomicNote: '100% Pathogen-screened meristem clones (Autumn Bliss & Murano lineage).',
    metricLabel: 'Genetics Authenticity',
    metricValue: '100% Virus-Free Clonal',
    imageSrc: './story/frame-1-seed.jpg',
    altText: 'Extreme macro photo of an heirloom Primocane berry seed with dewdrop on coco-peat',
  },
  {
    index: 1,
    label: '02 SPROUT & ROOTS',
    badge: 'Phase 02 · Clean Soil-Free Roots',
    headline: 'Growing in pure coco-coir, completely free from soil diseases.',
    plainEnglishExplanation:
      'Instead of regular farm soil which carries fungi and pests, our roots expand in clean, airy coconut husk fibers. We feed the root zone with natural plant-friendly probiotic liquids, helping the roots absorb nutrition effortlessly.',
    agronomicNote: 'Buffered coco-peat + perlite substrate with Bacillus & Trichoderma bio-inoculants.',
    metricLabel: 'Rhizosphere pH',
    metricValue: '5.8 pH Target',
    imageSrc: './story/frame-2-sprout.jpg',
    altText: 'Macro shot of an emerald green berry seedling with healthy white root hairs branching',
  },
  {
    index: 2,
    label: '03 GREENHOUSE CANOPY',
    badge: 'Phase 03 · Climate-Controlled Greenhouses',
    headline: 'Gentle mountain sunlight and total weather protection.',
    plainEnglishExplanation:
      'Our modern polyhouses across Pune and Satara shield the tender berries from unseasonal monsoon downpours, scorching afternoon heat, and hungry insects. The special diffused greenhouse roof bathes every leaf in soft, even sunlight.',
    agronomicNote: 'Naturally Ventilated Polyhouse (NVPH) with automated side curtains and 40-mesh insect barriers.',
    metricLabel: 'Solar Interception',
    metricValue: 'Diffused Anti-Glare',
    imageSrc: './story/frame-3-canopy.jpg',
    altText: 'Rows of lush trellised raspberry canes in a sunlit modern commercial polyhouse',
  },
  {
    index: 3,
    label: '04 BLOSSOM & BEES',
    badge: 'Phase 04 · Natural Bumblebee Pollination',
    headline: 'Friendly bumblebees pollinate every single blossom.',
    plainEnglishExplanation:
      'Misshapen berries happen when flowers are poorly pollinated. We invite resident bumblebees to live inside our greenhouses. Their gentle buzzing pollinates every micro-pistil, ensuring every berry develops into a plump, perfectly symmetrical cone.',
    agronomicNote: 'Biological pollination via resident Bombus terrestris hives for 98% Grade-A conformation.',
    metricLabel: 'Grade-A Shape Rate',
    metricValue: '96.8% Conical',
    imageSrc: './story/frame-4-bloom.jpg',
    altText: 'Delicate white 5-petaled berry blossom in full bloom with golden yellow anthers',
  },
  {
    index: 4,
    label: '05 SWEETENING & RIPENING',
    badge: 'Phase 05 · Exceptional Mountain Sweetness',
    headline: 'Chilly mountain nights lock in an intense 14.2° Brix sweetness.',
    plainEnglishExplanation:
      'As berries ripen, they transition from pale green to blushing pink, and finally a deep glowing ruby red. Crisp 14°C night air in the Satara hills slows down the plant, concentrating rich natural fruit sugars that make our berries taste extraordinarily sweet.',
    agronomicNote: 'Natural diurnal temperature shifts yield 14.2° Brix, outperforming standard supermarket berries.',
    metricLabel: 'Tested Sweetness',
    metricValue: '14.2° Brix Index',
    imageSrc: './story/frame-5-ripening.jpg',
    altText: 'Close-up of ripening raspberries transitioning from green to blush pink and glowing ruby red',
  },
  {
    index: 5,
    label: '06 SUNRISE HARVEST',
    badge: 'Phase 06 · Hand-Harvested at Dawn',
    headline: 'Hand-picked at sunrise, cooled to 4°C within 45 minutes.',
    plainEnglishExplanation:
      'Warm sunlight makes ripe berries soft. Our harvesting team hand-plucks each berry at dawn while the air is still cool. Within 45 minutes of picking, the berries enter our on-farm rapid cold room to preserve their crunch, juiciness, and 14-day freshness.',
    agronomicNote: 'Rapid forced-air pulp pulldown to 4°C arrests respiration and preserves cell turgidity.',
    metricLabel: 'Core Pulp Pulldown',
    metricValue: '4.0°C within 45m',
    imageSrc: './story/frame-6-harvest.jpg',
    altText: 'Farmer holding a freshly picked, pristine crimson raspberry in the sunlit morning',
  },
  {
    index: 6,
    label: '07 LUXURY TABLE PUNNET',
    badge: 'Phase 07 · From Farm to Luxury Tables',
    headline: 'Delivered fresh to 5-star kitchens and gourmet homes.',
    plainEnglishExplanation:
      'Packed in crystal-clear, breathable 125g vented punnets and transported in refrigerated vans to Mumbai, Pune, and Goa. Guaranteed off-take contracts mean every berry harvested is pre-sold to luxury hotels, modern trade grocers, and private subscribers.',
    agronomicNote: 'Pre-negotiated B2B off-take contracts eliminate farm price volatility and ensure 100% liquidation.',
    metricLabel: 'Punnet Presentation',
    metricValue: '125g Luxury Vented',
    imageSrc: './story/frame-7-punnet.jpg',
    altText: 'Crystal vented clamshell punnet overflowing with jewel-like fresh berries on a sunlit marble table',
  },
];

interface HyperrealStoryStageProps {
  currentPhaseIndex: number;
  progress: number;
  onSelectPhase: (idx: number) => void;
  onSkipToCore: () => void;
}

export const HyperrealStoryStage: React.FC<HyperrealStoryStageProps> = ({
  currentPhaseIndex,
  progress,
  onSelectPhase,
  onSkipToCore,
}) => {
  const activePhase = HYPERREAL_PHASES[currentPhaseIndex] || HYPERREAL_PHASES[0];

  return (
    <section className="relative w-full py-12 md:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Chapter Index Quick-Tabs Header */}
      <div className="flex items-center justify-between gap-4 pb-8 border-b border-stone-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {HYPERREAL_PHASES.map((p) => {
            const isActive = p.index === currentPhaseIndex;
            return (
              <button
                key={p.index}
                onClick={() => onSelectPhase(p.index)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-rose-500 text-white font-semibold shadow-md shadow-rose-500/20'
                    : 'bg-stone-200/60 dark:bg-zinc-800/80 text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onSkipToCore}
          className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono text-stone-700 dark:text-zinc-300 bg-stone-200/70 dark:bg-zinc-800/80 hover:bg-rose-500 hover:text-white transition-all shadow-sm flex-shrink-0"
        >
          <span>Skip to Numbers & Specs</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Dual-Zone Showcase (Hyperreal Photo on Left, Clean Protected Card on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-10">
        {/* Left: Hyperrealistic Photographic Stage (7 Cols) */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-zinc-700/80 bg-stone-900 group">
            {/* Photographic Frames Crossfade Stack */}
            {HYPERREAL_PHASES.map((phase) => {
              const isCurrent = phase.index === currentPhaseIndex;
              return (
                <div
                  key={phase.index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    isCurrent ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src={phase.imageSrc}
                    alt={phase.altText}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle vignette scrim to guarantee contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                </div>
              );
            })}

            {/* Floating Lens Telemetry Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>{activePhase.label} · LIVE STAGE</span>
            </div>

            {/* Bottom Photo Caption */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-zinc-200 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
              <span className="truncate">{activePhase.altText}</span>
              <span className="text-amber-300 font-semibold ml-2 flex-shrink-0">
                {activePhase.metricValue}
              </span>
            </div>
          </div>
        </div>

        {/* Right: High-Contrast Opaque Protected Story Card (5 Cols) */}
        <div className="lg:col-span-5 relative z-20">
          <div className="p-7 sm:p-9 rounded-3xl bg-white/95 dark:bg-[#121622]/95 backdrop-blur-2xl border border-stone-200/90 dark:border-zinc-800 shadow-2xl space-y-6">
            {/* Stage Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activePhase.badge}</span>
            </div>

            {/* Headline in Lay-Friendly Inspiring Language */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-snug">
              {activePhase.headline}
            </h2>

            {/* Humanistic Friendly Explanation */}
            <p className="text-sm sm:text-base text-stone-600 dark:text-zinc-300 font-light leading-relaxed">
              {activePhase.plainEnglishExplanation}
            </p>

            {/* Technical Agronomic Footnote (Elite signaling without intimidation) */}
            <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800/80 text-xs font-mono text-stone-700 dark:text-zinc-300">
              <span className="text-rose-600 dark:text-rose-400 font-semibold block mb-1">
                AGRONOMIST AUDIT NOTE:
              </span>
              {activePhase.agronomicNote}
            </div>

            {/* Navigation & Jump to Specs Action */}
            <div className="pt-2 flex items-center justify-between border-t border-stone-200 dark:border-zinc-800">
              <div className="text-xs font-mono text-stone-500 dark:text-zinc-400">
                <span>Phase {activePhase.index + 1} of 7</span>
              </div>

              <div className="flex items-center gap-2">
                {activePhase.index > 0 && (
                  <button
                    onClick={() => onSelectPhase(activePhase.index - 1)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-200 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 hover:bg-stone-300 dark:hover:bg-zinc-700 transition-colors"
                  >
                    ← Prev
                  </button>
                )}
                {activePhase.index < 6 ? (
                  <button
                    onClick={() => onSelectPhase(activePhase.index + 1)}
                    className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow transition-colors"
                  >
                    Next Phase →
                  </button>
                ) : (
                  <button
                    onClick={onSkipToCore}
                    className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-colors flex items-center gap-1.5"
                  >
                    <span>View Pricing & Specs</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
