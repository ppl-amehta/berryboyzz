<script lang="ts">
  import { BERRIES_DATA } from '#data/berriesData';
  import { ArrowRight, Sparkles, CheckCircle2, MessageCircle } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';

  let selectedBerryId = $state(BERRIES_DATA[0].id);
  const currentBerry = $derived(BERRIES_DATA.find((b) => b.id === selectedBerryId) || BERRIES_DATA[0]);

  const currentBerryWhatsAppUrl = $derived(
    buildWhatsAppUrl({
      leadSource: 'home_showcase',
      berryVariety: currentBerry.name,
      customMessage: `I want to inquire about ${currentBerry.name} planting stock / fresh punnets from Berryboyzz.`,
    })
  );
</script>

<section id="cultivars" class="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative">
  <div class="max-w-7xl mx-auto">
    <!-- Header on Liquid Glass -->
    <div class="glass-panel rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800/80 mb-3 backdrop-blur-sm shadow-xs">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Flagship Clonal Portfolio</span>
        </div>
        <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] mb-3">
          The 5 Commercial Superfruits
        </h2>
        <p class="text-sm sm:text-base text-[#2E2824] dark:text-[#D4CEBF] leading-relaxed">
          Engineered for bi-annual flushes (1.6 kg/harvest = 3.2 kg/year per plant) and mature yields up to 2.5 kg/plant for Southern Highbush Blueberries.
        </p>
      </div>

      <a
        href="/cultivars/"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 bg-white/70 dark:bg-black/40 border border-emerald-800/20 dark:border-emerald-500/20 hover:border-emerald-800/50 transition-all shrink-0"
      >
        <span>View Full Technical Dossiers</span>
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>

    <!-- Cultivar Tabs on Liquid Glass -->
    <div class="flex gap-2 pb-4 overflow-x-auto mb-8">
      {#each BERRIES_DATA as berry}
        <button
          type="button"
          onclick={() => (selectedBerryId = berry.id)}
          class="px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer {selectedBerryId === berry.id ? 'bg-emerald-800 text-white shadow-md ring-2 ring-emerald-600/30' : 'glass-panel text-[#2E2824] dark:text-[#D4CEBF] hover:border-emerald-600/60'}"
        >
          {berry.name}
        </button>
      {/each}
    </div>

    <!-- Selected Cultivar Feature Card -->
    <div class="glass-panel rounded-3xl p-8 sm:p-12 relative">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Details (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div>
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/70 px-2.5 py-1 rounded-md border border-emerald-300/80 dark:border-emerald-800/80 mb-3 inline-block">
              {currentBerry.genetics}
            </span>
            <h3 class="font-serif text-3xl sm:text-4xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
              {currentBerry.name}
            </h3>
            <p class="font-serif italic text-sm text-[#575049] dark:text-[#A8A196] mt-0.5">
              {currentBerry.botanicalName}
            </p>
          </div>

          <p class="text-sm text-[#262320] dark:text-[#E6E2DD] leading-relaxed">
            {currentBerry.description}
          </p>

          <!-- Key Metrics -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div class="p-3.5 rounded-2xl glass-subpanel">
              <span class="text-[10px] uppercase font-bold text-[#575049] dark:text-[#A8A196] block mb-0.5">Annual Yield</span>
              <strong class="font-mono-num text-lg font-bold text-emerald-800 dark:text-emerald-400">
                {currentBerry.yieldPerPlantGrams >= 1000 ? (currentBerry.yieldPerPlantGrams / 1000).toFixed(1) + ' kg / yr' : currentBerry.yieldPerPlantGrams + ' g / yr'}
              </strong>
            </div>
            <div class="p-3.5 rounded-2xl glass-subpanel">
              <span class="text-[10px] uppercase font-bold text-[#575049] dark:text-[#A8A196] block mb-0.5">Brix Index</span>
              <strong class="font-mono-num text-lg font-bold text-rose-800 dark:text-rose-400">
                {currentBerry.tastingNotes.brix}° Bx
              </strong>
            </div>
            <div class="p-3.5 rounded-2xl glass-subpanel col-span-2 sm:col-span-1">
              <span class="text-[10px] uppercase font-bold text-[#575049] dark:text-[#A8A196] block mb-0.5">Price Point</span>
              <strong class="text-xs font-bold text-[#1A1615] dark:text-[#FAF9F6] block mt-1">
                {#if currentBerry.id === 'mulberry'}
                  ₹80 (100g/200g)
                {:else if currentBerry.id === 'blueberry'}
                  ₹2,500 / kg mature
                {:else}
                  ₹{currentBerry.punnetRetailPriceINR} / punnet
                {/if}
              </strong>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-4">
            <a
              href="/cultivars/{currentBerry.id}/"
              class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider glass-subpanel hover:border-emerald-600/60 text-[#1A1615] dark:text-[#FAF9F6] transition-all"
            >
              <span>Full Dossier & Recipe</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </a>
            <a
              href={currentBerryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer"
            >
              <MessageCircle class="w-3.5 h-3.5" />
              <span>Inquire Crop Availability</span>
            </a>
          </div>
        </div>

        <!-- Sensory & Agronomy Highlights (5 cols) -->
        <div class="lg:col-span-5 glass-subpanel p-7 rounded-3xl space-y-5">
          <h4 class="font-serif text-xl font-bold text-[#1A1615] dark:text-[#FAF9F6] pb-3 border-b border-white/50 dark:border-white/10">
            Rhizosphere & Protocol
          </h4>

          <div class="space-y-3 text-xs text-[#262320] dark:text-[#E6E2DD]">
            <div>
              <span class="text-[#575049] dark:text-[#A8A196] block text-[10px] uppercase font-bold">Substrate Composition:</span>
              <p class="font-medium mt-0.5">{currentBerry.substrate}</p>
            </div>
            <div>
              <span class="text-[#575049] dark:text-[#A8A196] block text-[10px] uppercase font-bold">Micro-Climate Control:</span>
              <p class="font-medium mt-0.5">{currentBerry.idealClimate.temperatureRange} · {currentBerry.idealClimate.rhRange}</p>
            </div>
            <div>
              <span class="text-[#575049] dark:text-[#A8A196] block text-[10px] uppercase font-bold">Tasting Sensory Profile:</span>
              <p class="italic text-[#4A4643] dark:text-[#D4CEBF] mt-0.5">"{currentBerry.tastingNotes.acidity}"</p>
            </div>
          </div>

          <div class="pt-2">
            <span class="text-[10px] uppercase font-bold text-[#575049] dark:text-[#A8A196] block mb-2">B2B Channels:</span>
            <div class="flex flex-wrap gap-1.5">
              {#each currentBerry.b2bSupplyChannels as ch}
                <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-white/70 dark:bg-black/40 border border-white/60 dark:border-white/10 text-[#332D28] dark:text-[#D4CEBF]">
                  {ch}
                </span>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
