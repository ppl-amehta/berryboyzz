<script lang="ts">
  import { MessageCircle, X, ChevronRight, Sparkles, UserCheck } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '$utils/whatsapp';

  let isOpen = $state(false);

  const PERSONAS = [
    {
      id: 'investor',
      title: 'HNI / Syndicate Investor',
      subtitle: 'Explore 50-Acre syndicates & ₹35L commercial starter units',
      message: 'Hello, I am exploring commercial berry farming investment opportunities (Tier 2/Tier 4) with Berryboyzz.',
    },
    {
      id: 'grower',
      title: 'Landowner / Progressive Farmer',
      subtitle: 'Convert existing land to NPVH or Polytunnel CEA setups',
      message: 'Hello, I have land in Maharashtra and want to evaluate setting up a Naturally Ventilated Polyhouse for berries.',
    },
    {
      id: 'tourist',
      title: 'Family / Farm Tour Guest',
      subtitle: 'Book Gourmet Harvest Tasting (₹1,250–₹1,800) in Satara',
      message: 'Hello, I would like to book the Gourmet Harvest & Berry Tasting Experience for my family.',
    },
    {
      id: 'chef',
      title: 'Culinary Chef / Retail Buyer',
      subtitle: 'Procure direct fresh punnets (Mulberry ₹80, Blueberries)',
      message: 'Hello, I am interested in regular B2B wholesale berry procurement for my hospitality/culinary brand.',
    },
  ];
</script>

<!-- Floating Concierge Trigger -->
<div class="fixed bottom-6 right-6 z-50">
  {#if !isOpen}
    <button
      onclick={() => (isOpen = true)}
      class="estate-card flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-800 text-white shadow-xl hover:bg-emerald-900 transition-all cursor-pointer group hover:scale-105"
      aria-label="Open Agronomy Concierge"
    >
      <MessageCircle class="w-5 h-5 text-emerald-200" />
      <span class="text-xs font-bold uppercase tracking-wider">
        WhatsApp Desk
      </span>
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    </button>
  {:else}
    <!-- Expanded Drawer -->
    <div class="estate-card w-80 sm:w-96 rounded-3xl p-5 bg-white border-[#E8E4DC] shadow-2xl space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-[#E8E4DC]">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Sparkles class="w-4 h-4" />
          </div>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#1A1615]">
              Agronomy Concierge
            </h4>
            <span class="text-[10px] text-[#6B6661] block -mt-0.5">
              Instant routing to senior grower
            </span>
          </div>
        </div>
        <button
          onclick={() => (isOpen = false)}
          class="p-1.5 rounded-lg hover:bg-[#F5F2EB] text-[#6B6661] transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="space-y-2">
        <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] block">
          Select Your Inquiring Profile:
        </span>
        {#each PERSONAS as persona}
          <a
            href={buildWhatsAppUrl({
              leadSource: 'concierge_drawer',
              customMessage: persona.message,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => (isOpen = false)}
            class="w-full text-left p-3 rounded-2xl border border-[#E8E4DC] hover:border-emerald-700 hover:bg-[#FAF9F6] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div>
              <strong class="text-xs font-bold text-[#1A1615] group-hover:text-emerald-900 block">
                {persona.title}
              </strong>
              <span class="text-[11px] text-[#6B6661] block mt-0.5">
                {persona.subtitle}
              </span>
            </div>
            <ChevronRight class="w-4 h-4 text-[#8C867E] group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </a>
        {/each}
      </div>

      <div class="pt-2 text-center text-[10px] text-[#8C867E]">
        Direct line to Berryboyzz Satara Agronomy Operations (+91 88886 81136)
      </div>
    </div>
  {/if}
</div>
