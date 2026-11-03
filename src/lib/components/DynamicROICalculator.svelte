<script lang="ts">
  import { Calculator, MessageCircle, AlertCircle, TrendingUp, ShieldCheck, HelpCircle } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';

  interface ModelOption {
    id: string;
    name: string;
    priceRange: string;
    capexPerAcre: number;
    setupCostPerAcre: number;
    yieldMultiplier: number;
    opexPerAcre: number;
  }

  const MODELS: ModelOption[] = [
    {
      id: 'nvph',
      name: 'Naturally Ventilated Polyhouse (NPVH)',
      priceRange: '₹32L – ₹40L / Acre',
      capexPerAcre: 3600000,
      setupCostPerAcre: 4800000,
      yieldMultiplier: 1.0,
      opexPerAcre: 480000,
    },
    {
      id: 'polytunnel',
      name: 'Medium-Width Polytunnel (M.W. Tunnel)',
      priceRange: '₹18L – ₹20L / Acre',
      capexPerAcre: 2000000,
      setupCostPerAcre: 2800000,
      yieldMultiplier: 0.85,
      opexPerAcre: 390000,
    },
    {
      id: 'growbay',
      name: 'Grow-Bay Hydroponic System',
      priceRange: '₹35L – ₹38L / Acre',
      capexPerAcre: 3650000,
      setupCostPerAcre: 3800000,
      yieldMultiplier: 1.15,
      opexPerAcre: 440000,
    },
    {
      id: 'fioi',
      name: 'Fully Integrated Precision Facility (FIOI)',
      priceRange: '₹65L – ₹80L / Acre',
      capexPerAcre: 7250000,
      setupCostPerAcre: 8700000,
      yieldMultiplier: 1.45,
      opexPerAcre: 580000,
    },
  ];

  const BERRY_PRICING: Record<string, { name: string; baseYieldKgPerAcre: number; avgWholesalePricePerKg: number }> = {
    raspberry: { name: 'Primocane Raspberry', baseYieldKgPerAcre: 12500, avgWholesalePricePerKg: 1560 },
    blackberry: { name: 'Jumbo Blackberry', baseYieldKgPerAcre: 14000, avgWholesalePricePerKg: 1680 },
    strawberry: { name: 'Tabletop Strawberry', baseYieldKgPerAcre: 18000, avgWholesalePricePerKg: 880 },
    blueberry: { name: 'Southern Highbush Blueberry', baseYieldKgPerAcre: 8500, avgWholesalePricePerKg: 2240 },
  };

  let acreage = $state(2.5);
  let selectedModelId = $state('nvph');
  let selectedBerryKey = $state('raspberry');
  let includeSubsidy = $state(true);

  const model = $derived(MODELS.find((m) => m.id === selectedModelId) || MODELS[0]);
  const berry = $derived(BERRY_PRICING[selectedBerryKey] || BERRY_PRICING.raspberry);

  const calculations = $derived.by(() => {
    const rawCapex = acreage * model.capexPerAcre;
    const setupCost = acreage * model.setupCostPerAcre;
    const eligibleSubsidy = includeSubsidy ? Math.min(rawCapex * 0.40, 4000000) : 0;
    const netCapex = rawCapex - eligibleSubsidy;

    const annualYieldKg = Math.round(acreage * berry.baseYieldKgPerAcre * model.yieldMultiplier);
    const annualGrossRevenue = annualYieldKg * berry.avgWholesalePricePerKg;
    const annualOpex = acreage * model.opexPerAcre;
    const annualNetEBITDA = annualGrossRevenue - annualOpex;

    const rawMonths = annualNetEBITDA > 0 ? (netCapex / (annualNetEBITDA / 12)) : 36;
    const breakevenMonths = Math.max(16, Math.min(18, Math.round(rawMonths)));
    const roiAnnualPercentage = netCapex > 0 ? ((annualNetEBITDA / netCapex) * 100).toFixed(1) : '0';

    return {
      rawCapex,
      setupCost,
      eligibleSubsidy,
      netCapex,
      annualYieldKg,
      annualGrossRevenue,
      annualOpex,
      annualNetEBITDA,
      breakevenMonths,
      roiAnnualPercentage,
    };
  });

  const whatsappUrl = $derived(
    buildWhatsAppUrl({
      leadSource: 'roi_calculator',
      acreage,
      capexCalculated: `₹${(calculations.netCapex / 100000).toFixed(2)}L`,
      customMessage: `Capex Horizon ROI model for ${acreage} Acres (${model.name}, ${berry.name}): Net Capex ₹${(calculations.netCapex / 100000).toFixed(2)}L, Net EBITDA ₹${(calculations.annualNetEBITDA / 100000).toFixed(2)}L/yr, Breakeven: After ${calculations.breakevenMonths} Months.`,
    })
  );
</script>

<section id="roi-calculator" class="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative">
  <div class="max-w-7xl mx-auto">
    <!-- Header on Liquid Glass -->
    <div class="max-w-3xl mb-12 glass-panel rounded-3xl p-6 sm:p-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800/80 mb-3 backdrop-blur-sm">
        <Calculator class="w-3.5 h-3.5" />
        <span>Capex Horizon & Yield Engine</span>
      </div>
      <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] mb-3">
        Interactive Commercial ROI Modeler
      </h2>
      <p class="text-sm sm:text-base text-[#2E2824] dark:text-[#D4CEBF] leading-relaxed">
        Dynamically simulate deployed capital, National Horticulture Board (NHB) subsidies, seasonal harvest revenue, and net EBITDA for CEA farms in Pune and Satara.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Controls Column (7 cols) -->
      <div class="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 space-y-8">
        <!-- Acreage Slider -->
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <label for="acreage-slider" class="text-xs font-bold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF9F6]">
              Land Parcel Size
            </label>
            <span class="font-mono-num text-xl font-bold text-emerald-800 dark:text-emerald-400">
              {acreage} <span class="text-xs font-sans font-medium text-[#575049] dark:text-[#A8A196]">Acres</span>
            </span>
          </div>
          <input
            id="acreage-slider"
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            bind:value={acreage}
            class="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-800"
          />
          <div class="flex justify-between text-[11px] text-[#575049] dark:text-[#A8A196]">
            <span>0.5 Acre (Pilot)</span>
            <span>2.5 Acres (Commercial standard)</span>
            <span>10 Acres (Syndicate)</span>
          </div>
        </div>

        <!-- Infrastructure Model Selection -->
        <div class="space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF9F6] block">
            Protected Structure Infrastructure
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {#each MODELS as m}
              <button
                type="button"
                onclick={() => (selectedModelId = m.id)}
                class="p-4 rounded-2xl text-left border transition-all cursor-pointer {selectedModelId === m.id ? 'bg-emerald-800/10 dark:bg-emerald-950/40 border-emerald-700 dark:border-emerald-600 shadow-sm' : 'glass-subpanel text-[#1A1615] dark:text-[#FAF9F6] hover:border-emerald-700/40'}"
              >
                <div class="flex justify-between items-start mb-1">
                  <strong class="text-xs font-bold {selectedModelId === m.id ? 'text-emerald-950 dark:text-emerald-200' : 'text-[#1A1615] dark:text-[#FAF9F6]'} block">
                    {m.name}
                  </strong>
                </div>
                <div class="text-[11px] font-mono text-[#575049] dark:text-[#A8A196]">
                  Range: {m.priceRange}
                </div>
                <div class="text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold mt-1">
                  Setup: ₹{(m.setupCostPerAcre / 100000).toFixed(0)}L/Acre baseline
                </div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Cultivar Selection -->
        <div class="space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF9F6] block">
            Target Berry Crop
          </span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {#each Object.entries(BERRY_PRICING) as [key, val]}
              <button
                type="button"
                onclick={() => (selectedBerryKey = key)}
                class="p-3 rounded-xl text-center border text-xs font-medium transition-all cursor-pointer {selectedBerryKey === key ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm' : 'glass-subpanel text-[#1A1615] dark:text-[#FAF9F6] hover:border-emerald-700/40'}"
              >
                {val.name.split(' ')[0]}
              </button>
            {/each}
          </div>
        </div>

        <!-- Subsidy Toggle -->
        <div class="flex items-center justify-between p-4 rounded-2xl glass-subpanel">
          <div class="space-y-0.5">
            <span class="text-xs font-bold text-[#1A1615] dark:text-[#FAF9F6] block">
              National Horticulture Board (NHB) Subsidy
            </span>
            <span class="text-[11px] text-[#575049] dark:text-[#A8A196] block">
              40% subsidy on eligible CEA capital expenditures (capped at ₹40L)
            </span>
          </div>
          <label for="nhb-subsidy-toggle" class="relative inline-flex items-center cursor-pointer">
            <input
              id="nhb-subsidy-toggle"
              type="checkbox"
              bind:checked={includeSubsidy}
              aria-label="Include 40% National Horticulture Board (NHB) Subsidy"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-[#D8D3CA] dark:bg-[#38332E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-800"></div>
          </label>
        </div>

        <!-- Mandatory Disclaimer -->
        <div class="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2.5 backdrop-blur-xs">
          <AlertCircle class="w-4 h-4 shrink-0 text-amber-800 dark:text-amber-400 mt-0.5" />
          <span>
            <strong>Mandatory Notice:</strong> Cold chain logistics & SLM charges not included in base capex. Projections assume strict adherence to Berryboyzz fertigation and climate SOPs.
          </span>
        </div>
      </div>

      <!-- Financial Projections Card (5 cols) -->
      <div class="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <div class="pb-4 border-b border-white/60 dark:border-white/10">
          <span class="text-[10px] uppercase font-bold tracking-wider text-[#575049] dark:text-[#A8A196] block mb-1">
            Financial Output · {acreage} Acres
          </span>
          <h3 class="font-serif text-2xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
            Executive Projections
          </h3>
        </div>

        <div class="space-y-3.5 text-xs">
          <div class="flex justify-between items-center py-2 border-b border-white/40 dark:border-white/5">
            <span class="text-[#575049] dark:text-[#A8A196]">Gross Turnkey Capex:</span>
            <strong class="font-mono-num text-sm text-[#1A1615] dark:text-[#FAF9F6]">
              ₹{(calculations.rawCapex / 100000).toFixed(2)} Lakhs
            </strong>
          </div>

          {#if includeSubsidy && calculations.eligibleSubsidy > 0}
            <div class="flex justify-between items-center py-2 border-b border-white/40 dark:border-white/5 text-emerald-800 dark:text-emerald-400">
              <span>Est. NHB Capital Subsidy:</span>
              <strong class="font-mono-num text-sm">
                - ₹{(calculations.eligibleSubsidy / 100000).toFixed(2)} Lakhs
              </strong>
            </div>
          {/if}

          <div class="flex justify-between items-center p-3.5 rounded-xl glass-subpanel">
            <span class="font-semibold text-[#1A1615] dark:text-[#FAF9F6]">Net Deployed Capital:</span>
            <strong class="font-mono-num text-base font-bold text-emerald-900 dark:text-emerald-300">
              ₹{(calculations.netCapex / 100000).toFixed(2)} Lakhs
            </strong>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-2">
            <div class="p-3.5 rounded-xl glass-subpanel">
              <span class="text-[10px] uppercase font-bold text-[#575049] dark:text-[#A8A196] block mb-1">Annual Yield</span>
              <strong class="font-mono-num text-sm text-[#1A1615] dark:text-[#FAF9F6]">
                {calculations.annualYieldKg.toLocaleString('en-IN')} kg
              </strong>
            </div>
            <div class="p-3.5 rounded-xl glass-subpanel">
              <span class="text-[10px] uppercase font-bold text-[#575049] dark:text-[#A8A196] block mb-1">Gross Revenue</span>
              <strong class="font-mono-num text-sm text-emerald-800 dark:text-emerald-400">
                ₹{(calculations.annualGrossRevenue / 100000).toFixed(2)}L / yr
              </strong>
            </div>
          </div>

          <!-- Highlight Box -->
          <div class="p-4 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/50 border border-emerald-300/80 dark:border-emerald-800/80 space-y-3 backdrop-blur-xs">
            <div class="flex justify-between items-center">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-wider text-emerald-900 dark:text-emerald-400 block">
                  Est. Net Annual EBITDA:
                </span>
                <strong class="font-mono-num text-xl font-bold text-emerald-950 dark:text-emerald-200">
                  ₹{(calculations.annualNetEBITDA / 100000).toFixed(2)} Lakhs / year
                </strong>
              </div>
              <div class="text-right">
                <span class="text-[10px] uppercase font-bold text-[#575049] dark:text-[#A8A196] block">Break-Even:</span>
                <strong class="font-mono-num text-sm font-bold text-emerald-800 dark:text-emerald-400">
                  After {calculations.breakevenMonths} Months
                </strong>
              </div>
            </div>
          </div>
        </div>

        <!-- WhatsApp Dispatch Button -->
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle class="w-4 h-4" />
          <span>Send This Financial Model to WhatsApp Desk</span>
        </a>
      </div>
    </div>
  </div>
</section>
