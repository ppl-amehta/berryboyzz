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
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out {isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
    >
      <!-- Rich High-Resolution Photographic Canvas (Vivid, Next-Gen Formats) -->
      <picture>
        <source srcset={bd.image.replace('.jpg', '.avif')} type="image/avif" />
        <source srcset={bd.image.replace('.jpg', '.webp')} type="image/webp" />
        <img
          src={bd.image}
          alt={bd.alt}
          class="w-full h-full object-cover object-center filter saturate-[1.12] contrast-[1.06] brightness-[0.98] dark:brightness-[0.72]"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          width="1376"
          height="768"
        />
      </picture>

      <!-- Subtle Ambient Lighting Film (Adds Atmospheric Depth Without Washing Out Details) -->
      <div class="absolute inset-0 bg-black/10 dark:bg-black/35 pointer-events-none"></div>

      <!-- Color Ambient Accent Glow -->
      <div class="absolute inset-0 bg-gradient-to-br {bd.ambientTint} dark:{bd.darkTint} mix-blend-overlay opacity-40 pointer-events-none"></div>

      <!-- Top & Bottom Feathering (Seamless Entry from Morphogenesis Canvas & Exit to Footer) -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent via-15% via-85% to-[#FAF9F6] dark:from-[#0C0A09] dark:via-transparent dark:to-[#0C0A09] opacity-95 pointer-events-none transition-colors duration-500"
      ></div>

      <!-- Cinematic Vignette for Depth -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.22)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)] pointer-events-none"></div>
    </div>
  {/each}
</aside>
