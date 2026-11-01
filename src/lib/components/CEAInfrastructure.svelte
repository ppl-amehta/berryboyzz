<script lang="ts">
  import { COMMERCIAL_MODELS } from '$data/commercialModels';
  import { Warehouse, CheckCircle2, MessageCircle, ArrowRight } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '$utils/whatsapp';
</script>

<section id="commercial-models" class="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] border-t border-[#E8E4DC]">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="max-w-3xl mb-14">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
        <Warehouse class="w-3.5 h-3.5" />
        <span>Controlled Environment Agriculture (CEA)</span>
      </div>
      <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">
        Commercial Farm Engineering (Pune & Satara)
      </h2>
      <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">
        Five precision-engineered protected cultivation structures calibrated for Sahyadri wind loads, solar radiation, and micro-climate regulation. All commercial setups reach capital break-even within 16–18 months.
      </p>
    </div>

    <!-- Models Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each COMMERCIAL_MODELS as model}
        <article class="estate-card rounded-3xl p-7 flex flex-col justify-between group hover:-translate-y-1 transition-all">
          <div class="space-y-4">
            <div>
              <span class="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 block w-fit mb-2">
                Min. Land: {model.minLandRequired}
              </span>
              <h3 class="font-serif text-2xl font-bold text-[#1A1615] group-hover:text-emerald-950 transition-colors">
                {model.name}
              </h3>
              <p class="text-xs text-[#6B6661] mt-1 font-medium">
                {model.subtitle}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3 py-3 border-y border-[#F0ECE1] text-xs">
              <div>
                <span class="text-[10px] uppercase font-bold text-[#6B6661] block">Capex / Setup</span>
                <strong class="font-mono-num text-base font-bold text-[#1A1615]">
                  ₹{(model.capexPerAcreINR / 100000).toFixed(0)} Lakhs
                </strong>
              </div>
              <div>
                <span class="text-[10px] uppercase font-bold text-[#6B6661] block">Annual Yield</span>
                <strong class="font-mono-num text-base font-bold text-emerald-800">
                  {model.expectedAnnualYieldKg.toLocaleString('en-IN')} kg
                </strong>
              </div>
            </div>

            <!-- Features List -->
            <ul class="space-y-2 text-xs text-[#262320]">
              {#each model.features as feature}
                <li class="flex items-start gap-2.5">
                  <CheckCircle2 class="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                  <span class="leading-relaxed font-medium">{feature}</span>
                </li>
              {/each}
            </ul>

            <!-- Recommended Cultivars -->
            <div class="pt-2">
              <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1.5">Recommended Crops:</span>
              <div class="flex flex-wrap gap-1.5">
                {#each model.recommendedBerries as crop}
                  <span class="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#F5F2EB] text-[#1A1615]">
                    {crop}
                  </span>
                {/each}
              </div>
            </div>
          </div>

          <div class="pt-6 mt-6 border-t border-[#E8E4DC]">
            <a
              href={buildWhatsAppUrl({
                leadSource: 'commercial_model',
                customMessage: `I am interested in setting up the ${model.name} (${model.subtitle}) in Maharashtra.`,
              })}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-[#1A1615] border border-[#E8E4DC] hover:border-emerald-800 hover:text-emerald-900 transition-all cursor-pointer"
            >
              <MessageCircle class="w-3.5 h-3.5" />
              <span>Inquire Infrastructure Setup</span>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
