<script lang="ts">
  import { TOUR_PACKAGES } from '#data/tourPackages';
  import { Clock, MapPin, ArrowRight, Compass, Users } from '@lucide/svelte';
</script>

<svelte:head>
  <title>Experiential Farm Tours & Agronomy Masterclasses | Berryboyzz</title>
  <meta name="description" content="Join our 3.5-hour Gourmet Harvest Tasting Experience or 6-hour Commercial Agronomy & Tech Study Tour at our flagship farm in Wai-Panchgani Foothills, Satara." />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <!-- Section Title -->
  <header class="max-w-3xl mb-14">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 mb-4 backdrop-blur-sm">
      <Compass class="w-3.5 h-3.5" />
      <span>Experiential Field Education</span>
    </div>
    <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] mb-4">
      Farm Visits & Masterclasses
    </h1>
    <p class="text-base text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
      From intimate family harvest tastings in the Wai foothills to deep-dive 6-hour technical agronomy study tours for commercial CEA investors. Walk through active commercial polyhouses with master growers.
    </p>
  </header>

  <!-- Tour Cards Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each TOUR_PACKAGES as tour}
      <article class="estate-card rounded-3xl p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#F5F2EB] dark:bg-[#1E1A17] text-[#4A4643] dark:text-[#D4CEBF] border border-transparent dark:border-[#282420]">
              <Clock class="w-3 h-3 text-emerald-800 dark:text-emerald-400" />
              <span>{tour.duration}</span>
            </span>
            <span class="font-mono-num text-sm font-bold text-emerald-800 dark:text-emerald-400">
              {#if tour.id === 'harvest-visit'}
                ₹1,250 – ₹1,800
              {:else}
                ₹{tour.feePerPersonINR.toLocaleString('en-IN')} / person
              {/if}
            </span>
          </div>

          <div>
            <h2 class="font-serif text-2xl font-bold text-[#1A1615] dark:text-[#FAF9F6] group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
              {tour.title}
            </h2>
            <p class="text-xs text-[#6B6661] dark:text-[#9E9689] mt-1 line-clamp-2">
              {tour.tagline}
            </p>
          </div>

          <div class="pt-4 border-t border-[#F0ECE1] dark:border-[#282420] space-y-2 text-xs text-[#4A4643] dark:text-[#D4CEBF]">
            <div class="flex items-center gap-2">
              <MapPin class="w-3.5 h-3.5 text-[#6B6661] dark:text-[#9E9689] shrink-0" />
              <span class="truncate">{tour.location}</span>
            </div>
            <div class="flex items-center gap-2">
              <Users class="w-3.5 h-3.5 text-[#6B6661] dark:text-[#9E9689] shrink-0" />
              <span>Max {tour.maxGroupSize} participants</span>
            </div>
          </div>

          <div class="pt-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] dark:text-[#9E9689] block mb-2">Featured Highlights:</span>
            <ul class="space-y-1 text-xs text-[#262320] dark:text-[#E6E2DD]">
              {#each tour.includes.slice(0, 3) as inc}
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-800 dark:bg-emerald-400 shrink-0 mt-1.5"></span>
                  <span class="line-clamp-1">{inc}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <div class="pt-6 mt-6 border-t border-[#E8E4DC] dark:border-[#282420] flex items-center justify-between">
          <span class="text-xs font-mono text-[#6B6661] dark:text-[#9E9689]">
            Code: {tour.whatsappCode}
          </span>

          <a
            href="/tours/{tour.id}/"
            class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 transition-colors"
          >
            <span>Full Syllabus & Booking</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </article>
    {/each}
  </div>
</div>
