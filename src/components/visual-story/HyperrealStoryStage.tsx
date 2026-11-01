import React, { useRef, useEffect, useCallback, useState } from 'react';
import { FastForward, ArrowDown, Sparkles, Layers, Eye, Compass, Move3d } from 'lucide-react';

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
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [activeTier, setActiveTier] = useState<'hi' | 'mid' | 'lo'>('hi');

  // Single rAF state ref (Zero layout reads in loop)
  const state = useRef({
    sy: 0,
    syT: 0,
    px: 0.5,
    py: 0.5,
    pxt: 0.5,
    pyt: 0.5,
    tx: 0,
    ty: 0,
    txt: 0,
    tyt: 0,
    ema: 8,
    tier: 0, // 0 = hi, 1 = mid, 2 = lo
    visible: true,
  });

  const bounds = useRef({ top: 0, bottom: 1000 });

  // Geometry measurement strictly on mount and resize via ResizeObserver
  const measure = useCallback(() => {
    if (!stageRef.current) return;
    const parent = stageRef.current.parentElement || stageRef.current;
    const rect = parent.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    bounds.current = {
      top: rect.top + scrollTop,
      bottom: rect.bottom + scrollTop - window.innerHeight,
    };
  }, []);

  // Request gyroscope permission on iOS Safari if requested
  const requestGyro = useCallback(async () => {
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setGyroEnabled(true);
        }
      } catch (err) {
        console.warn('Gyroscope permission was denied or not supported:', err);
      }
    } else {
      setGyroEnabled(true);
    }
  }, []);

  // Spatial compositing loop (1 rAF tick, 7 setProperty calls, zero layout thrashing)
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);

    const io = new IntersectionObserver(
      ([entry]) => {
        state.current.visible = entry.isIntersecting;
      },
      { rootMargin: '20% 0px' }
    );
    if (stageRef.current) io.observe(stageRef.current);

    // Passive input listeners
    const onScroll = () => {
      state.current.syT = window.scrollY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? window.innerWidth / 2 : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? window.innerHeight / 2 : e.clientY;
      state.current.pxt = Math.min(Math.max(clientX / window.innerWidth, 0), 1);
      state.current.pyt = Math.min(Math.max(clientY / window.innerHeight, 0), 1);
    };

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamped tilt mapping (-15deg to +15deg mapped to 0..1)
        const normX = Math.min(Math.max((e.gamma + 15) / 30, 0), 1);
        const normY = Math.min(Math.max((e.beta - 30) / 40, 0), 1);
        state.current.pxt = normX;
        state.current.pyt = normY;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    if (gyroEnabled) {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      const s = state.current;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!s.visible || document.hidden || !stageRef.current) return;

      // Exponential damping: lerp(v, target, dt)
      const damp = 1 - Math.exp(-12 * dt);
      s.sy += (s.syT - s.sy) * damp;
      s.px += (s.pxt - s.px) * damp;
      s.py += (s.pyt - s.py) * damp;

      // Velocity yaw momentum coupled to scroll velocity (clamp to +/- 3.5 deg)
      const velocityYaw = Math.min(Math.max(((s.syT - s.sy) / (dt || 0.016)) * 0.0025, -3.5), 3.5);

      // 3D Perspective Tilt targets
      s.txt = (s.px - 0.5) * 10 + velocityYaw; // Yaw angle (deg)
      s.tyt = -(s.py - 0.5) * 8; // Pitch angle (deg)

      s.tx += (s.txt - s.tx) * damp;
      s.ty += (s.tyt - s.ty) * damp;

      // Thermal & frame-time governor (Exponential Moving Average)
      const frameDelta = now - ((state.current as any).lastTickTime || now);
      (state.current as any).lastTickTime = now;
      s.ema = s.ema * 0.9 + frameDelta * 0.1;

      if (s.ema > 14 && s.tier < 1) {
        s.tier = 1;
        setActiveTier('mid');
      } else if (s.ema > 18 && s.tier < 2) {
        s.tier = 2;
        setActiveTier('lo');
      }

      // Normalized stage progress
      const totalSpan = Math.max(bounds.current.bottom - bounds.current.top, 1);
      const stageP = Math.min(Math.max((s.sy - bounds.current.top) / totalSpan, 0), 1);

      // Dynamic Depth-of-Field Circle-of-Confusion
      const cocBg = Math.min(24 * stageP, 24); // Atmospheric progressive background defocus (0 -> 24px)
      const cocFg = (s.tier === 2 ? 3 : 6) + Math.abs(velocityYaw) * 0.5; // Foreground bokeh with focus pull breath

      // THE SINGLE COMPOSITOR WRITE: 7 CSS variables derived by all planes
      const style = stageRef.current.style;
      style.setProperty('--sd', `${-(s.sy - bounds.current.top)}px`);
      style.setProperty('--ty3d', `${s.tx.toFixed(3)}deg`);
      style.setProperty('--tx3d', `${s.ty.toFixed(3)}deg`);
      style.setProperty('--coc-b', `${cocBg.toFixed(2)}`);
      style.setProperty('--coc-f', `${cocFg.toFixed(2)}`);
      style.setProperty('--pxn', `${s.px.toFixed(4)}`);
      style.setProperty('--pyn', `${s.py.toFixed(4)}`);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      if (gyroEnabled) {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
      }
    };
  }, [measure, gyroEnabled]);

  return (
    <section
      ref={stageRef}
      className={`spatial-stage-root relative w-full py-8 md:py-16 px-4 sm:px-8 max-w-7xl mx-auto overflow-visible ${
        activeTier === 'mid' ? 'tier-mid' : activeTier === 'lo' ? 'tier-lo' : 'tier-hi'
      }`}
    >
      {/* =========================================================================
       * LAYER 0: Deep Atmospheric Ambient Light Rays & Chromatic Aura (d = -850)
       * Moves at 0.15x speed with progressive atmospheric defocus blur
       * ========================================================================= */}
      <div className="spatial-layer spatial-lyr-rays" aria-hidden="true" />

      {/* Chapter Index & Hardware Spatial Controller Bar */}
      <div className="relative z-30 flex items-center justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {HYPERREAL_PHASES.map((p) => {
            const isActive = p.index === currentPhaseIndex;
            return (
              <button
                key={p.index}
                onClick={() => onSelectPhase(p.index)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-rose-500 text-white font-semibold shadow-md shadow-rose-500/25 scale-105'
                    : 'bg-stone-200/60 dark:bg-zinc-800/80 text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Spatial 3D / Gyro Affordance (Mobile & Desktop) */}
          <button
            onClick={requestGyro}
            title="Spatial Lockscreen 3D Parallax Active"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-all ${
              gyroEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'bg-stone-200/60 dark:bg-zinc-800/80 border-stone-300 dark:border-zinc-700 text-stone-600 dark:text-zinc-300'
            }`}
          >
            <Move3d className="w-3.5 h-3.5 text-rose-500" />
            <span>Spatial Parallax 120Hz</span>
          </button>

          <button
            onClick={onSkipToCore}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-stone-700 dark:text-zinc-300 bg-stone-200/70 dark:bg-zinc-800/80 hover:bg-rose-500 hover:text-white transition-all shadow-sm flex-shrink-0"
          >
            <span>Skip to Specs</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Dual-Zone Showcase (Spatial 3D Viewport on Left, Frosted Glass Card on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8 relative z-20">
        {/* Left: Multi-Layered Spatial Photographic Viewport (7 Cols) */}
        <div className="lg:col-span-7 relative">
          <div className="spatial-focal-viewport relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 dark:border-zinc-700/80 bg-stone-950 group">
            {/* =========================================================================
             * LAYER 2: Midground Focal Stage (Anchor, Razor Sharp 0 Blur, 3D Gyro Tilt)
             * ========================================================================= */}
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
                    fetchPriority={phase.index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    loading={phase.index === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Subtle vignette scrim to guarantee contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                </div>
              );
            })}

            {/* =========================================================================
             * LAYER 3: Foreground Floating Spatial Objects (Macro Bokeh Plane, d = +650)
             * Moves faster at 1.65x speed with dynamic circle-of-confusion bokeh blur
             * ========================================================================= */}
            <div className="spatial-layer spatial-fg-bokeh pointer-events-none" aria-hidden="true">
              {/* Luminous refracted water dewdrop lens */}
              <div
                className="absolute top-[18%] left-[22%] w-10 h-10 rounded-full bg-gradient-to-br from-white/70 via-rose-300/30 to-transparent border border-white/40 shadow-lg"
                style={{
                  transform: 'translate3d(calc(var(--pxn) * 20px), calc(var(--pyn) * 15px), 0)',
                }}
              />
              {/* Pollinator bumblebee silhouette floating near flower bloom during phase 3 & 4 */}
              {(currentPhaseIndex === 3 || currentPhaseIndex === 4) && (
                <div
                  className="absolute bottom-[28%] right-[18%] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-[10px] font-mono text-amber-200"
                  style={{
                    transform: 'translate3d(calc((1 - var(--pxn)) * 35px), calc((1 - var(--pyn)) * 25px), 0)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Bumblebee Pollination Plane</span>
                </div>
              )}
              {/* Floating golden pollen / solar flare bokeh dots */}
              <div
                className="absolute top-[42%] right-[12%] w-6 h-6 rounded-full bg-rose-400/40 border border-rose-300/30"
                style={{
                  transform: 'translate3d(calc(var(--pxn) * -18px), calc(var(--pyn) * 20px), 0)',
                }}
              />
              <div
                className="absolute bottom-[16%] left-[32%] w-8 h-8 rounded-full bg-amber-400/30 border border-amber-300/30"
                style={{
                  transform: 'translate3d(calc(var(--pxn) * 25px), calc(var(--pyn) * -16px), 0)',
                }}
              />
            </div>

            {/* Floating Lens Telemetry Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono shadow-md">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>{activePhase.label} · 100MP MACRO STAGE</span>
            </div>

            {/* Dynamic Tilt Coordinate Pill */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300">
              <Eye className="w-3 h-3 text-rose-400" />
              <span>Focal σ: 0.0px</span>
            </div>

            {/* Bottom Photo Caption */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-zinc-200 bg-black/55 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-lg">
              <span className="truncate max-w-[70%]">{activePhase.altText}</span>
              <span className="text-amber-300 font-semibold ml-2 flex-shrink-0">
                {activePhase.metricValue}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Layer 4 — Pinned Interactive Frosted Glass Card with Specular Light Tracking (5 Cols) */}
        <div className="lg:col-span-5 relative z-30">
          <div className="spatial-specular-card p-7 sm:p-9 rounded-3xl bg-white/95 dark:bg-[#121622]/95 border border-stone-200/95 dark:border-zinc-800 shadow-2xl space-y-6">
            {/* Stage Badge with Specular Glow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activePhase.badge}</span>
            </div>

            {/* Headline in Lay-Friendly Inspiring Language */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-snug">
              {activePhase.headline}
            </h2>

            {/* Humanistic Plain-English Explanation */}
            <p className="text-sm sm:text-base text-stone-600 dark:text-zinc-300 font-light leading-relaxed">
              {activePhase.plainEnglishExplanation}
            </p>

            {/* Technical Agronomic Footnote (Elite signaling without intimidation) */}
            <div className="p-3.5 rounded-xl bg-stone-100/90 dark:bg-zinc-900/90 border border-stone-200 dark:border-zinc-800/80 text-xs font-mono text-stone-700 dark:text-zinc-300">
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
                    className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-all active:scale-95"
                  >
                    Next Phase →
                  </button>
                ) : (
                  <button
                    onClick={onSkipToCore}
                    className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all active:scale-95 flex items-center gap-1.5"
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
