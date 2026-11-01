<script lang="ts">
  import { Sprout, MessageCircle, Thermometer, Droplets, Gauge, ShieldCheck, ArrowLeft, CheckCircle2, Utensils } from '@lucide/svelte';
  import { openWhatsAppLead } from '$utils/whatsapp';

  let { data } = $props();
  const berry = $derived(data.berry);

  function handleInquiry() {
    openWhatsAppLead({
      leadSource: 'cultivar_dossier',
      berryVariety: berry.name,
      customMessage: `I am reviewing the ${berry.name} (${berry.botanicalName}) technical agronomy dossier on Berryboyzz and would like commercial planting availability.`,
    });
  }
</script>

<svelte:head>
  <title>{berry.name} ({berry.botanicalName}) · Flagship Agro-Asset | Berryboyzz</title>
  <meta name="description" content="{berry.tagline} Engineered for high-density CEA polyhouses in Pune & Satara." />
  <meta property="og:title" content="{berry.name} Agro-Asset Dossier · Berryboyzz" />
  <meta property="og:description" content="{berry.description}" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <!-- Back link -->
  <div class="mb-8">
    <a href="/cultivars/" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B6661] hover:text-emerald-800 transition-colors">
      <ArrowLeft class="w-4 h-4" />
      <span>Back to Cultivar Catalog</span>
    </a>
  </div>

  <!-- Editorial Hero Header -->
  <header class="pb-10 border-b border-[#E8E4DC] mb-12">
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200">
        Certified Agro-Asset
      </span>
      <span class="text-xs font-mono text-[#6B6661]">
        Genetics: {berry.genetics}
      </span>
    </div>
    
    <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1615] mb-3">
      {berry.name}
    </h1>
    <p class="font-serif italic text-lg sm:text-xl text-[#6B6661] mb-6">
      {berry.botanicalName}
    </p>

    <p class="text-base sm:text-lg text-[#262320] leading-relaxed max-w-3xl">
      {berry.description}
    </p>
  </header>

  <!-- Core Commercial Metrics Grid -->
  <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
    <div class="estate-card p-5 rounded-2xl">
      <span class="text-[10px] uppercase font-bold tracking-wider text-[#6B6661] block mb-1">
        Annual Yield / Plant
      </span>
      <strong class="font-mono-num text-2xl font-bold text-emerald-800 block">
        {berry.yieldPerPlantGrams >= 1000 ? (berry.yieldPerPlantGrams / 1000).toFixed(1) + ' kg' : berry.yieldPerPlantGrams + ' g'}
      </strong>
      <span class="text-[11px] text-[#4A4643] block mt-1">
        Bi-annual harvest flushes
      </span>
    </div>

    <div class="estate-card p-5 rounded-2xl">
      <span class="text-[10px] uppercase font-bold tracking-wider text-[#6B6661] block mb-1">
        Harvest Cycle
      </span>
      <strong class="font-mono-num text-lg font-bold text-[#1A1615] block mt-0.5">
        Every 6 Months
      </strong>
      <span class="text-[11px] text-[#4A4643] block mt-1">
        Twice-a-year commercial picking
      </span>
    </div>

    <div class="estate-card p-5 rounded-2xl">
      <span class="text-[10px] uppercase font-bold tracking-wider text-[#6B6661] block mb-1">
        Sugar Index (Brix)
      </span>
      <strong class="font-mono-num text-2xl font-bold text-rose-800 block">
        {berry.tastingNotes.brix}° Bx
      </strong>
      <span class="text-[11px] text-[#4A4643] block mt-1">
        Natural fructose accumulation
      </span>
    </div>

    <div class="estate-card p-5 rounded-2xl">
      <span class="text-[10px] uppercase font-bold tracking-wider text-[#6B6661] block mb-1">
        Planting Density
      </span>
      <strong class="text-sm font-bold text-[#1A1615] block mt-1">
        {berry.commercialDensity.split('(')[0]}
      </strong>
      <span class="text-[11px] text-[#4A4643] block mt-1">
        High-density CEA layout
      </span>
    </div>
  </section>

  <!-- Agronomic Architecture & Climate -->
  <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <!-- Climate & Rhizosphere -->
    <div class="estate-card p-8 rounded-3xl space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-[#E8E4DC]">
        <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
          <Thermometer class="w-4 h-4" />
        </div>
        <h3 class="font-serif text-xl font-bold text-[#1A1615]">Micro-Climate & Rhizosphere</h3>
      </div>

      <div class="space-y-4 text-xs">
        <div class="flex justify-between items-center py-2 border-b border-[#F0ECE1]">
          <span class="text-[#6B6661]">Temperature Target:</span>
          <strong class="text-[#1A1615]">{berry.idealClimate.temperatureRange}</strong>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-[#F0ECE1]">
          <span class="text-[#6B6661]">Chilling Hours:</span>
          <strong class="text-[#1A1615]">{berry.idealClimate.chillingHours}</strong>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-[#F0ECE1]">
          <span class="text-[#6B6661]">Substrate pH Range:</span>
          <strong class="font-mono-num text-emerald-800 font-semibold">{berry.idealClimate.ph}</strong>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-[#F0ECE1]">
          <span class="text-[#6B6661]">Relative Humidity (RH):</span>
          <strong class="font-mono-num text-[#1A1615]">{berry.idealClimate.rhRange}</strong>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-[#6B6661]">Fertigation EC:</span>
          <strong class="font-mono-num text-emerald-800 font-semibold">{berry.idealClimate.ecTarget}</strong>
        </div>
      </div>
    </div>

    <!-- Daily Care SOPs -->
    <div class="estate-card p-8 rounded-3xl space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-[#E8E4DC]">
        <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center">
          <ShieldCheck class="w-4 h-4" />
        </div>
        <h3 class="font-serif text-xl font-bold text-[#1A1615]">Daily Field Protocol</h3>
      </div>

      <ul class="space-y-3.5 text-xs text-[#262320]">
        {#each berry.dailyCareProtocol as step}
          <li class="flex items-start gap-3">
            <CheckCircle2 class="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <span class="leading-relaxed">{step}</span>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- Culinary Gastronomy & Chef Pairing -->
  <section class="estate-card p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border-[#E4DFC8] mb-12">
    <div class="flex items-center gap-3 pb-4 border-b border-[#E4DFC8] mb-6">
      <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
        <Utensils class="w-4 h-4" />
      </div>
      <div>
        <h3 class="font-serif text-2xl font-bold text-[#1A1615]">Culinary Gastronomy Pairing</h3>
        <span class="text-xs text-[#6B6661]">Chef Tasting Notes & Artisan Recipe</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="space-y-3">
        <span class="text-[10px] uppercase font-bold tracking-wider text-[#6B6661] block">
          Aromatic Profile
        </span>
        <div class="flex flex-wrap gap-2">
          {#each berry.tastingNotes.aromaProfile as note}
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-white border border-[#E8E4DC] text-[#1A1615]">
              {note}
            </span>
          {/each}
        </div>
        <p class="text-xs text-[#4A4643] italic pt-2">
          "{berry.tastingNotes.acidity}"
        </p>
      </div>

      <div class="md:col-span-2 bg-white p-6 rounded-2xl border border-[#E8E4DC] space-y-4">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
            Featured Recipe ({berry.tastingNotes.chefRecipePairing.prepTime})
          </span>
          <h4 class="font-serif text-lg font-bold text-[#1A1615]">
            {berry.tastingNotes.chefRecipePairing.dishName}
          </h4>
        </div>

        <p class="text-xs text-[#4A4643] leading-relaxed">
          {berry.tastingNotes.chefRecipePairing.description}
        </p>

        <div class="pt-2 border-t border-[#F0ECE1]">
          <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-2">Artisan Ingredients:</span>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#1A1615]">
            {#each berry.tastingNotes.chefRecipePairing.ingredients as ing}
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-800"></span>
                <span>{ing}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Conversion CTA Strip -->
  <section class="estate-card p-8 rounded-3xl bg-white border-[#E8E4DC] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-emerald-950/5">
    <div class="space-y-1 text-center sm:text-left">
      <h3 class="font-serif text-2xl font-bold text-[#1A1615]">
        Plant {berry.name} in Your Protected Facility
      </h3>
      <p class="text-xs text-[#6B6661]">
        Certified tissue-culture saplings, automated fertigation charts, and guaranteed B2B off-take support.
      </p>
      <span class="text-[11px] text-[#8C867E] block pt-1">
        * Cold chain logistics & SLM charges not included.
      </span>
    </div>

    <button
      onclick={handleInquiry}
      class="shrink-0 inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer"
    >
      <MessageCircle class="w-4 h-4" />
      <span>Inquire Plant Allocation</span>
    </button>
  </section>
</div>
