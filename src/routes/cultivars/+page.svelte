<script lang="ts">
  import { BERRIES_DATA } from '$data/berriesData';
  import { ArrowRight, Sprout, Sparkles } from '@lucide/svelte';
</script>

<svelte:head>
  <title>Flagship Berry Cultivars · Pune & Satara Foothills | Berryboyzz</title>
  <meta name="description" content="Explore certified Primocane Raspberries, Chester Blackberries, Himalayan Long Mulberries, Tabletop Strawberries, and Southern Highbush Blueberries engineered for Maharashtra CEA polyhouses." />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <!-- Section Title -->
  <header class="max-w-3xl mb-14">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-4">
      <Sparkles class="w-3.5 h-3.5" />
      <span>Certified Genetic Portfolio</span>
    </div>
    <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">
      The Cultivar Collection
    </h1>
    <p class="text-base text-[#4A4643] leading-relaxed">
      Tissue-culture certified, high-anthocyanin superfruits calibrated specifically for controlled environment agriculture (CEA) across the Sahyadri foothills and Satara plateau. Yielding bi-annual commercial flushes with export-grade firmness.
    </p>
  </header>

  <!-- Cultivar Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each BERRIES_DATA as berry}
      <article class="estate-card rounded-3xl p-7 flex flex-col justify-between group hover:-translate-y-1 transition-all">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F5F2EB] text-[#4A4643]">
              {berry.harvestCycleDays.includes('36 months') ? 'Mature Yield: 36 Mos' : 'Bi-Annual Flush'}
            </span>
            <span class="font-mono-num text-xs font-bold text-emerald-800">
              {berry.yieldPerPlantGrams >= 1000 ? (berry.yieldPerPlantGrams / 1000).toFixed(1) + ' kg/yr' : berry.yieldPerPlantGrams + ' g/yr'}
            </span>
          </div>

          <div>
            <h2 class="font-serif text-2xl font-bold text-[#1A1615] group-hover:text-emerald-900 transition-colors">
              {berry.name}
            </h2>
            <p class="font-serif italic text-xs text-[#6B6661] mt-0.5">
              {berry.botanicalName}
            </p>
          </div>

          <p class="text-xs text-[#4A4643] leading-relaxed line-clamp-3">
            {berry.description}
          </p>

          <div class="pt-4 border-t border-[#F0ECE1] grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span class="text-[#6B6661] block text-[10px] uppercase font-semibold">Sugar Index:</span>
              <strong class="font-mono-num text-rose-800">{berry.tastingNotes.brix}° Brix</strong>
            </div>
            <div>
              <span class="text-[#6B6661] block text-[10px] uppercase font-semibold">Substrate:</span>
              <span class="text-[#1A1615] font-medium truncate block">{berry.substrate.split(',')[0]}</span>
            </div>
          </div>
        </div>

        <div class="pt-6 mt-6 border-t border-[#E8E4DC] flex items-center justify-between">
          <span class="text-xs font-semibold text-[#1A1615]">
            {#if berry.id === 'mulberry'}
              ₹80 (100g/200g)
            {:else if berry.id === 'blueberry'}
              ₹2,500 / kg mature
            {:else}
              ₹{berry.punnetRetailPriceINR} / punnet
            {/if}
          </span>

          <a
            href="/cultivars/{berry.id}/"
            class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-900"
          >
            <span>Dossier</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </article>
    {/each}
  </div>
</div>
