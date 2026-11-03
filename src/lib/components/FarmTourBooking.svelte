<script lang="ts">
  import { TOUR_PACKAGES } from '#data/tourPackages';
  import { Clock, MapPin, MessageCircle, ArrowRight, CheckCircle2 } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';

  const harvestTour = TOUR_PACKAGES.find((t) => t.id === 'harvest-visit') || TOUR_PACKAGES[0];
  const studyTour = TOUR_PACKAGES.find((t) => t.id === 'study-tour') || TOUR_PACKAGES[1];

  const harvestTourWhatsAppUrl = buildWhatsAppUrl({
    leadSource: 'home_tours_section',
    tourName: harvestTour.title,
    customMessage: `I want to reserve a slot for the ${harvestTour.title} at Berryboyzz farm.`,
  });

  const studyTourWhatsAppUrl = buildWhatsAppUrl({
    leadSource: 'home_tours_section',
    tourName: studyTour.title,
    customMessage: `I want to reserve a slot for the ${studyTour.title} at Berryboyzz farm.`,
  });
</script>

<section id="farm-tours" class="py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-[#E8E4DC]/80 dark:border-[#282420]/80 relative">
  <div class="max-w-7xl mx-auto">
    <!-- Header (Loaded on Pareto Liquid Glass Panel to eliminate crosstalk) -->
    <div class="glass-panel rounded-3xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 mb-3 backdrop-blur-sm">
          <Clock class="w-3.5 h-3.5" />
          <span>Experiential Agro-Tourism</span>
        </div>
        <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] mb-4">
          Visit Our Satara Polyhouses
        </h2>
        <p class="text-sm sm:text-base text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
          Walk between living canes in our Wai-Panchgani research facilities. Taste ripe berries directly from the vine or master the complete CEA engineering syllabus.
        </p>
      </div>

      <a
        href="/tours/"
        class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 transition-colors"
      >
        <span>View All 5 Masterclasses</span>
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>

    <!-- Featured Two Tours -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Harvest Tasting -->
      <article class="glass-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
        <div class="space-y-5">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F5F2EB]/80 dark:bg-[#1E1A17]/80 text-[#4A4643] dark:text-[#D4CEBF] border border-[#E8E4DC] dark:border-[#282420]">
              {harvestTour.duration}
            </span>
            <span class="font-mono-num text-lg font-bold text-emerald-800 dark:text-emerald-400">
              ₹1,250 / ₹1,500 / ₹1,800
            </span>
          </div>

          <div>
            <h3 class="font-serif text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
              {harvestTour.title}
            </h3>
            <p class="text-xs text-[#6B6661] dark:text-[#9E9689] mt-1 font-medium">
              {harvestTour.tagline}
            </p>
          </div>

          <div class="glass-subpanel rounded-2xl p-5 space-y-2.5 text-xs text-[#262320] dark:text-[#E6E2DD]">
            {#each harvestTour.includes.slice(0, 5) as inc}
              <div class="flex items-start gap-2.5">
                <CheckCircle2 class="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span class="leading-relaxed font-medium">{inc}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="pt-8 mt-8 border-t border-[#E8E4DC]/80 dark:border-[#282420]/80 flex items-center justify-between gap-4">
          <a
            href="/tours/harvest-visit/"
            class="text-xs font-bold uppercase tracking-wider text-[#6B6661] dark:text-[#9E9689] hover:text-[#1A1615] dark:hover:text-[#FAF9F6] transition-colors"
          >
            Read Syllabus
          </a>
          <a
            href={harvestTourWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 cursor-pointer transition-all"
          >
            <MessageCircle class="w-4 h-4" />
            <span>Book Experience</span>
          </a>
        </div>
      </article>

      <!-- Study Tour -->
      <article class="glass-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-between border-emerald-700/60 dark:border-emerald-600/60 ring-1 ring-emerald-700/20">
        <div class="space-y-5">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              {studyTour.duration} Intensive Masterclass
            </span>
            <span class="font-mono-num text-lg font-bold text-emerald-800 dark:text-emerald-400">
              ₹3,500 / person
            </span>
          </div>

          <div>
            <h3 class="font-serif text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
              {studyTour.title}
            </h3>
            <p class="text-xs text-[#6B6661] dark:text-[#9E9689] mt-1 font-medium">
              Comprehensive 12-module technical masterclass on CEA engineering, fertigation & commercial ROI.
            </p>
          </div>

          <div class="glass-subpanel rounded-2xl p-5 space-y-2.5 text-xs text-[#262320] dark:text-[#E6E2DD]">
            {#each studyTour.includes.slice(0, 5) as inc}
              <div class="flex items-start gap-2.5">
                <CheckCircle2 class="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span class="leading-relaxed font-medium">{inc}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="pt-8 mt-8 border-t border-[#E8E4DC]/80 dark:border-[#282420]/80 flex items-center justify-between gap-4">
          <a
            href="/tours/study-tour/"
            class="text-xs font-bold uppercase tracking-wider text-[#6B6661] dark:text-[#9E9689] hover:text-[#1A1615] dark:hover:text-[#FAF9F6] transition-colors"
          >
            View All 12 Modules
          </a>
          <a
            href={studyTourWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 cursor-pointer transition-all"
          >
            <MessageCircle class="w-4 h-4" />
            <span>Book Study Tour</span>
          </a>
        </div>
      </article>
    </div>
  </div>
</section>
