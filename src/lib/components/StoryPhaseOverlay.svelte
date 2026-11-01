<script lang="ts">
  import { Sparkles, Dna, ArrowDown, ChevronRight } from '@lucide/svelte';

  let { currentPhaseIndex = 0, progress = 0 } = $props<{ currentPhaseIndex: number; progress: number }>();

  const PHASES = [
    {
      index: 1,
      title: 'Phase 01: Genetic Micro-Propagation',
      subtitle: 'Meristem Tissue-Culture Clones',
      desc: 'Virus-indexed European & North American Primocane clones hardened in sterilized coir plugs.',
      metric: '99.8% Clonal Purity',
      accent: 'emerald',
    },
    {
      index: 2,
      title: 'Phase 02: Bacto-Rhizosphere Colonization',
      subtitle: 'Organic Bacto-Slurry Fertigation',
      desc: 'Substrate inoculated with Trichoderma & Bacillus consortia to optimize phosphorus solubilization.',
      metric: '5.8 Target pH · 1.6 EC',
      accent: 'emerald',
    },
    {
      index: 3,
      title: 'Phase 03: High-Wire Canopy Architecture',
      subtitle: 'Controlled Environment Polyhouse',
      desc: 'T-Trellis trellising maintaining 4–5 dominant fruiting canes per linear meter for 360° light interception.',
      metric: '4,500 Plants / Acre',
      accent: 'emerald',
    },
    {
      index: 4,
      title: 'Phase 04: Blossom & Precision Pollination',
      subtitle: 'Day-Neutral Synchronized Flowering',
      desc: 'Bumblebee integration ensures 100% conical fruit shape and complete drupelet fertilization.',
      metric: '100% Conical Drupelet Shape',
      accent: 'amber',
    },
    {
      index: 5,
      title: 'Phase 05: Anthocyanin Drupelet Swelling',
      subtitle: 'Brix Maximization & Bio-PGRs',
      desc: 'Rapid sucrose and anthocyanin accumulation. High-potassium bio-drenching yields deep pigment saturation.',
      metric: '14.5°–19.5° Brix Rating',
      accent: 'rose',
    },
    {
      index: 6,
      title: 'Phase 06: Dawn Harvest & Pre-Cooling',
      subtitle: 'Hand-Harvested Before 10:00 AM',
      desc: 'Single-touch picking directly into export punnets. Immediate forced-air cooling down to 2°C–4°C in 45 minutes.',
      metric: '2°C–4°C Cold Chain Entry',
      accent: 'blue',
    },
    {
      index: 7,
      title: 'Phase 07: Direct Supermarket & Export Supply',
      subtitle: 'Commercial Liquidation · ₹2,500 / kg',
      desc: 'Refrigerated van logistics to luxury five-star hospitality, high-end metropolitan grocers, and air cargo.',
      metric: '₹2,500 / kg Price Point',
      accent: 'emerald',
    },
  ];

  const phase = $derived(PHASES[Math.min(Math.max(currentPhaseIndex, 0), 6)]);
</script>

<div class="fixed top-24 left-4 sm:left-8 z-20 max-w-sm sm:max-w-md pointer-events-none">
  <div class="glass-panel p-6 rounded-3xl bg-white/90 dark:bg-[#141210]/90 backdrop-blur-md border-[#E8E4DC] dark:border-[#282420] shadow-xl space-y-3 pointer-events-auto">
    <div class="flex items-center justify-between">
      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        Living Morphogenesis
      </span>
      <span class="font-mono-num text-xs font-bold text-[#6B6661] dark:text-[#9E9689]">
        Stage 0{phase.index} / 07
      </span>
    </div>

    <div>
      <h2 class="font-serif text-2xl font-bold text-[#1A1615] dark:text-[#FAF9F6] leading-tight">
        {phase.title}
      </h2>
      <p class="text-xs font-serif italic text-emerald-800 dark:text-emerald-400 mt-0.5">
        {phase.subtitle}
      </p>
    </div>

    <p class="text-xs text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
      {phase.desc}
    </p>

    <div class="pt-2 border-t border-[#F0ECE1] dark:border-[#282420] flex items-center justify-between">
      <span class="text-[11px] font-mono font-bold text-emerald-900 dark:text-emerald-300 bg-[#F5F2EB] dark:bg-[#1E1A17] px-2.5 py-1 rounded-lg">
        {phase.metric}
      </span>
      <span class="text-[10px] text-[#6B6661] dark:text-[#9E9689] uppercase tracking-wider font-semibold">
        Scroll to progress
      </span>
    </div>
  </div>
</div>
