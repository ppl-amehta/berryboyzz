<script lang="ts">
  import { onMount } from 'svelte';

  let { activeSection = 'cultivars' } = $props<{ activeSection?: string }>();

  interface SectionBackdrop {
    id: string;
    image: string;
    alt: string;
    ambientTint: string;
    darkTint: string;
  }

  const BACKDROPS: SectionBackdrop[] = [
    {
      id: 'cultivars',
      image: '/story/frame-5-ripening.jpg',
      alt: 'Lush hanging berry canes with ripe berries',
      ambientTint: 'from-rose-950/5 via-emerald-950/5 to-transparent',
      darkTint: 'from-rose-950/20 via-emerald-950/20 to-transparent',
    },
    {
      id: 'commercial-models',
      image: '/story/frame-3-canopy.jpg',
      alt: 'High-tech protected CEA polyhouse canopy architecture',
      ambientTint: 'from-emerald-950/5 via-amber-950/5 to-transparent',
      darkTint: 'from-emerald-950/20 via-amber-950/20 to-transparent',
    },
    {
      id: 'roi-calculator',
      image: '/story/frame-4-bloom.jpg',
      alt: 'Precision blossom and micro-fertigation canopy',
      ambientTint: 'from-amber-950/5 via-emerald-950/5 to-transparent',
      darkTint: 'from-amber-950/20 via-emerald-950/20 to-transparent',
    },
    {
      id: 'investment-tiers',
      image: '/story/frame-6-harvest.jpg',
      alt: 'Commercial berry harvest at institutional scale in Satara',
      ambientTint: 'from-emerald-950/5 via-slate-950/5 to-transparent',
      darkTint: 'from-emerald-950/20 via-slate-950/20 to-transparent',
    },
    {
      id: 'biological-os',
      image: '/story/frame-2-sprout.jpg',
      alt: 'Rhizosphere microbial inoculation and root health',
      ambientTint: 'from-emerald-950/5 via-teal-950/5 to-transparent',
      darkTint: 'from-emerald-950/20 via-teal-950/20 to-transparent',
    },
    {
      id: 'farm-tours',
      image: '/story/frame-7-punnet.jpg',
      alt: 'Gourmet fresh punnets and tasting experience in Wai-Panchgani',
      ambientTint: 'from-rose-950/5 via-amber-950/5 to-transparent',
      darkTint: 'from-rose-950/20 via-amber-950/20 to-transparent',
    },
  ];
</script>

<!-- Sticky Atmospheric Viewport Background Engine -->
<aside
  class="sticky top-0 h-screen w-full pointer-events-none -mb-[100vh] overflow-hidden -z-10"
  aria-hidden="true"
>
  {#each BACKDROPS as bd (bd.id)}
    {@const isActive = activeSection === bd.id}
    <div
      class="absolute inset-0 transition-all duration-1000 ease-out {isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}"
    >
      <!-- High-Resolution Image -->
      <img
        src={bd.image}
        alt={bd.alt}
        class="w-full h-full object-cover object-center filter saturate-[0.85] contrast-[1.05]"
        loading="lazy"
        decoding="async"
      />

      <!-- Color Ambient Accent Glow -->
      <div class="absolute inset-0 bg-gradient-to-br {bd.ambientTint} dark:{bd.darkTint} mix-blend-multiply"></div>

      <!-- Scrim Overlay for Supreme Contrast (Prevents Visual & Text Crosstalk) -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/90 via-[#FAF9F6]/82 to-[#FAF9F6]/94 dark:from-[#0C0A09]/92 dark:via-[#0C0A09]/85 dark:to-[#0C0A09]/95 transition-colors duration-500"
      ></div>

      <!-- Subtle Radial Vignette -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(26,22,21,0.08)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]"></div>
    </div>
  {/each}
</aside>
