<script lang="ts">
  import { onMount } from 'svelte';
  import MorphogenesisCanvas from '#components/MorphogenesisCanvas.svelte';
  import StoryPhaseOverlay from '#components/StoryPhaseOverlay.svelte';
  import TelemetryTicker from '#components/TelemetryTicker.svelte';
  import ScarcityBanner from '#components/ScarcityBanner.svelte';
  import PostStoryBackdrop from '#components/PostStoryBackdrop.svelte';
  import BerryShowcase from '#components/BerryShowcase.svelte';
  import CEAInfrastructure from '#components/CEAInfrastructure.svelte';
  import DynamicROICalculator from '#components/DynamicROICalculator.svelte';
  import InvestmentLadder from '#components/InvestmentLadder.svelte';
  import BiologicalOS from '#components/BiologicalOS.svelte';
  import FarmTourBooking from '#components/FarmTourBooking.svelte';
  import AgenticConcierge from '#components/AgenticConcierge.svelte';
  import { Sprout, ArrowDown, ChevronRight, MessageCircle } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';

  let scrollProgress = $state(0);
  let currentPhaseIndex = $state(0);
  let activeSectionId = $state('cultivars');
  let storyContainer: HTMLDivElement | null = $state(null);

  onMount(() => {
    let ticking = false;
    let cachedStoryTop = 0;
    let cachedStoryHeight = 0;
    let cachedWindowHeight = window.innerHeight;

    const measureStory = () => {
      if (storyContainer) {
        cachedStoryTop = storyContainer.offsetTop;
        cachedStoryHeight = storyContainer.offsetHeight;
        cachedWindowHeight = window.innerHeight;
      }
    };

    // Asynchronously measure dimensions after initial frame paint to prevent forced synchronous reflow
    requestAnimationFrame(() => {
      measureStory();
    });
    window.addEventListener('resize', measureStory, { passive: true });

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScrollable = cachedStoryHeight - cachedWindowHeight;
          if (totalScrollable > 0) {
            const currentScrolled = window.scrollY - cachedStoryTop;
            const p = Math.min(Math.max(currentScrolled / totalScrollable, 0), 1);
            scrollProgress = p;
            currentPhaseIndex = Math.min(Math.floor(p * 7), 6);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Section IntersectionObserver to sync background image transitions
    const sectionIds = [
      'cultivars',
      'commercial-models',
      'roi-calculator',
      'investment-tiers',
      'biological-os',
      'farm-tours',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSectionId = entry.target.id;
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureStory);
      observer.disconnect();
    };
  });
</script>

<svelte:head>
  <title>Berryboyzz · Commercial Berry Agro-Assets & CEA Engineering | Pune & Satara</title>
  <meta
    name="description"
    content="Controlled Environment Agriculture (CEA) berry farming across Maharashtra. Certified tissue culture clones, bi-annual 3.2 kg/year yields, and 16-month break-even commercial models."
  />
</svelte:head>

<!-- Scarcity Live Banner -->
<ScarcityBanner />

<!-- Scrollytelling Hero Container -->
<div bind:this={storyContainer} class="relative h-[450vh] bg-[#FAF9F6] dark:bg-[#0C0A09] transition-colors duration-500">
  <!-- Fixed Procedural Canvas Engine -->
  {#if scrollProgress < 0.98}
    <MorphogenesisCanvas progress={scrollProgress} />
    <StoryPhaseOverlay {currentPhaseIndex} progress={scrollProgress} />
  {/if}

  <!-- Intro Hero Billboard (First Screen) -->
  <div class="h-screen flex items-center justify-center px-4 relative z-10 pointer-events-none">
    <div class="max-w-3xl text-center space-y-6 pointer-events-auto">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 shadow-sm backdrop-blur-sm">
        <Sprout class="w-3.5 h-3.5" />
        <span>Precision Superfruit Agro-Assets · Satara & Pune</span>
      </div>

      <h1 class="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] leading-[1.08]">
        Engineering the Superfruit Economy.
      </h1>

      <p class="text-base sm:text-xl text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed max-w-2xl mx-auto">
        Transforming rural Maharashtra into India's premier controlled-environment berry powerhouse. High-anthocyanin genetics yielding twice annually with guaranteed cold-chain off-take.
      </p>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={buildWhatsAppUrl({ leadSource: 'hero_primary', customMessage: 'Hello, I want to discuss commercial berry farm setup in Maharashtra.' })}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer"
        >
          <MessageCircle class="w-4 h-4" />
          <span>Inquire Allocation via WhatsApp</span>
        </a>

        <a
          href="#cultivars"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white/90 dark:bg-[#1C1816]/90 hover:bg-[#F5F2EB] dark:hover:bg-[#28221D] text-[#1A1615] dark:text-[#FAF9F6] border border-[#E8E4DC] dark:border-[#332D28] backdrop-blur-md transition-all"
        >
          <span>Explore 5 Cultivars</span>
          <ChevronRight class="w-4 h-4" />
        </a>
      </div>

      <div class="pt-12 text-[#6B6661] dark:text-[#9E9689] text-xs flex items-center justify-center gap-2 animate-bounce">
        <ArrowDown class="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
        <span class="uppercase tracking-widest font-semibold text-[10px]">Scroll Down to Witness 7-Phase Living Morphogenesis</span>
      </div>
    </div>
  </div>
</div>

<!-- Main Section Deck with PostStoryBackdrop -->
<div class="relative z-10 bg-transparent">
  <!-- Crossfading Sticky Background Engine -->
  <PostStoryBackdrop activeSection={activeSectionId} />

  <!-- Cultivar Showcase -->
  <div class="content-auto">
    <BerryShowcase />
  </div>

  <!-- Commercial Models (NPVH / Polytunnel / Grow-Bay) -->
  <div class="content-auto">
    <CEAInfrastructure />
  </div>

  <!-- Dynamic ROI & Capex Horizon Calculator -->
  <div class="content-auto">
    <DynamicROICalculator />
  </div>

  <!-- Investment Tiers -->
  <div class="content-auto">
    <InvestmentLadder />
  </div>

  <!-- 6-Pillar Biological OS -->
  <div class="content-auto">
    <BiologicalOS />
  </div>

  <!-- Farm Tour Bookings & Masterclasses -->
  <div class="content-auto">
    <FarmTourBooking />
  </div>
</div>

<!-- Telemetry Bottom Bar -->
<TelemetryTicker />

<!-- Floating Agronomy Concierge -->
<AgenticConcierge />
