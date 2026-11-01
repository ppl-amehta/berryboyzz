<script lang="ts">
  import { INVESTMENT_TIERS } from '$data/commercialModels';
  import { ShieldCheck, MessageCircle, ArrowRight, CheckCircle2 } from '@lucide/svelte';
  import { openWhatsAppLead } from '$utils/whatsapp';

  function handleTierInquiry(tier: (typeof INVESTMENT_TIERS)[0]) {
    openWhatsAppLead({
      leadSource: 'investment_ladder',
      investmentTier: tier.name,
      customMessage: `I am inquiring about the ${tier.name} (${tier.capitalRequired}) investment tier with Berryboyzz.`,
    });
  }
</script>

<section id="investment-tiers" class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E8E4DC]">
  <div class="max-w-7xl mx-auto">
    <div class="max-w-3xl mb-14">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
        <ShieldCheck class="w-3.5 h-3.5" />
        <span>Institutional Agro-Asset Portfolios</span>
      </div>
      <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">
        Capital Deployment Tiers
      </h2>
      <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">
        From 5-plant balcony validation kits to turnkey 50-Acre institutional syndicates. Backed by certified genomics, automated precision irrigation, and contractual off-take agreements.
      </p>
    </div>

    <!-- Tiers Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each INVESTMENT_TIERS as tier}
        <article class="estate-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-all {tier.id === 'tier-2-commercial-1000' ? 'border-emerald-700 ring-1 ring-emerald-700/20' : ''}">
          <div class="space-y-4">
            <div>
              <span class="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F5F2EB] text-[#4A4643] block w-fit mb-2">
                {tier.badge}
              </span>
              <h3 class="font-serif text-xl font-bold text-[#1A1615]">
                {tier.name}
              </h3>
            </div>

            <div class="py-3 border-y border-[#F0ECE1]">
              <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-0.5">Capital Required</span>
              <strong class="font-mono-num text-xl font-bold text-emerald-800 block">
                {tier.capitalRequired}
              </strong>
            </div>

            <p class="text-xs text-[#4A4643] leading-relaxed">
              {tier.tagline}
            </p>

            <!-- Financial Specs -->
            <div class="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC] space-y-1.5 text-[11px]">
              <div class="text-emerald-900 font-semibold">
                {tier.financialModel.yieldReturn}
              </div>
              <div class="text-[#6B6661]">
                Timeline: {tier.financialModel.turnaround}
              </div>
            </div>

            <!-- Deliverables -->
            <div class="space-y-2 pt-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] block">Key Inclusions:</span>
              <ul class="space-y-1.5 text-xs text-[#262320]">
                {#each tier.deliverables.slice(0, 3) as deliv}
                  <li class="flex items-start gap-2">
                    <CheckCircle2 class="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                    <span class="leading-relaxed line-clamp-2">{deliv}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-6 mt-6 border-t border-[#E8E4DC] space-y-2">
            <span class="text-[10px] text-[#8C867E] block text-center">
              * Cold chain logistics & SLM not included
            </span>
            <button
              onclick={() => handleTierInquiry(tier)}
              class="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider {tier.id === 'tier-2-commercial-1000' ? 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm' : 'bg-[#FAF9F6] text-[#1A1615] border border-[#E8E4DC] hover:border-[#D4CEBF]'} transition-all cursor-pointer"
            >
              <MessageCircle class="w-3.5 h-3.5" />
              <span>Inquire Allocation</span>
            </button>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
