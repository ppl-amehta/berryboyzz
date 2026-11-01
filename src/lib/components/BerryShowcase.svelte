<script lang="ts">
  import { BERRIES_DATA } from '$data/berriesData';
  import { ArrowRight, Sparkles, CheckCircle2, MessageCircle } from '@lucide/svelte';
  import { openWhatsAppLead } from '$utils/whatsapp';

  let selectedBerryId = $state(BERRIES_DATA[0].id);
  const currentBerry = $derived(BERRIES_DATA.find((b) => b.id === selectedBerryId) || BERRIES_DATA[0]);

  function handleOrder() {
    openWhatsAppLead({
      leadSource: 'home_showcase',
      berryVariety: currentBerry.name,
      customMessage: `I want to inquire about ${currentBerry.name} planting stock / fresh punnets from Berryboyzz.`,
    });
  }
</script>

<section id="cultivars" class="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] border-t border-[#E8E4DC]">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Flagship Clonal Portfolio</span>
        </div>
        <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">
          The 5 Commercial Superfruits
        </h2>
        <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">
          Engineered for bi-annual flushes (1.6 kg/harvest = 3.2 kg/year per plant) and mature yields up to 2.5 kg/plant for Southern Highbush Blueberries.
        </p>
      </div>

      <a
        href="/cultivars/"
        class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950"
      >
        <span>View Full Technical Dossiers</span>
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>

    <!-- Cultivar Tabs -->
    <div class="flex gap-2 pb-4 overflow-x-auto border-b border-[#E8E4DC] mb-8">
      {#each BERRIES_DATA as berry}
        <button
          type="button"
          onclick={() => (selectedBerryId = berry.id)}
          class="px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer {selectedBerryId === berry.id ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-[#4A4643] border border-[#E8E4DC] hover:border-[#D4CEBF]'}"
        >
          {berry.name}
        </button>
      {/each}
    </div>

    <!-- Selected Cultivar Feature Card -->
    <div class="estate-card rounded-3xl p-8 sm:p-12 bg-white border-[#E8E4DC]">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Details (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div>
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-3 inline-block">
              {currentBerry.genetics}
            </span>
            <h3 class="font-serif text-3xl sm:text-4xl font-bold text-[#1A1615]">
              {currentBerry.name}
            </h3>
            <p class="font-serif italic text-sm text-[#6B6661] mt-0.5">
              {currentBerry.botanicalName}
            </p>
          </div>

          <p class="text-sm text-[#262320] leading-relaxed">
            {currentBerry.description}
          </p>

          <!-- Key Metrics -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div class="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E4DC]">
              <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-0.5">Annual Yield</span>
              <strong class="font-mono-num text-lg font-bold text-emerald-800">
                {currentBerry.yieldPerPlantGrams >= 1000 ? (currentBerry.yieldPerPlantGrams / 1000).toFixed(1) + ' kg / yr' : currentBerry.yieldPerPlantGrams + ' g / yr'}
              </strong>
            </div>
            <div class="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E4DC]">
              <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-0.5">Brix Index</span>
              <strong class="font-mono-num text-lg font-bold text-rose-800">
                {currentBerry.tastingNotes.brix}° Bx
              </strong>
            </div>
            <div class="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E4DC] col-span-2 sm:col-span-1">
              <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-0.5">Price Point</span>
              <strong class="text-xs font-bold text-[#1A1615] block mt-1">
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
              class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-[#E8E4DC] hover:border-[#D4CEBF] text-[#1A1615] transition-all"
            >
              <span>Full Dossier & Recipe</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </a>
            <button
              onclick={handleOrder}
              class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle class="w-3.5 h-3.5" />
              <span>Inquire Crop Availability</span>
            </button>
          </div>
        </div>

        <!-- Sensory & Agronomy Highlights (5 cols) -->
        <div class="lg:col-span-5 bg-[#FAF9F6] p-7 rounded-3xl border border-[#E8E4DC] space-y-5">
          <h4 class="font-serif text-xl font-bold text-[#1A1615] pb-3 border-b border-[#E8E4DC]">
            Rhizosphere & Protocol
          </h4>

          <div class="space-y-3 text-xs text-[#262320]">
            <div>
              <span class="text-[#6B6661] block text-[10px] uppercase font-bold">Substrate Composition:</span>
              <p class="font-medium mt-0.5">{currentBerry.substrate}</p>
            </div>
            <div>
              <span class="text-[#6B6661] block text-[10px] uppercase font-bold">Micro-Climate Control:</span>
              <p class="font-medium mt-0.5">{currentBerry.idealClimate.temperatureRange} · {currentBerry.idealClimate.rhRange}</p>
            </div>
            <div>
              <span class="text-[#6B6661] block text-[10px] uppercase font-bold">Tasting Sensory Profile:</span>
              <p class="italic text-[#4A4643] mt-0.5">"{currentBerry.tastingNotes.acidity}"</p>
            </div>
          </div>

          <div class="pt-2">
            <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-2">B2B Channels:</span>
            <div class="flex flex-wrap gap-1.5">
              {#each currentBerry.b2bSupplyChannels as ch}
                <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-[#E8E4DC] text-[#4A4643]">
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
