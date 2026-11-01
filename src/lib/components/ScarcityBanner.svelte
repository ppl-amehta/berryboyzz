<script lang="ts">
  import { Flame, Clock, ArrowRight } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '$utils/whatsapp';

  const bannerWhatsAppUrl = buildWhatsAppUrl({
    leadSource: 'scarcity_banner',
    customMessage: 'Priority inquiry regarding Cohort 04 allocation (₹2.5L/Acre/mo CEA opportunity cost).',
  });
</script>

<div class="bg-[#FBF8EF] border-y border-[#EADBBD] py-3.5 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
    <div class="flex items-center gap-3">
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
        <Flame class="w-3 h-3 text-amber-700" />
        <span>Cohort 04 Active</span>
      </span>
      <span class="text-[#262320] font-medium">
        Satara Foothills Corridor · Opportunity Cost: <strong class="font-mono-num text-amber-950 font-bold">₹2,50,000 / Acre / month CEA</strong>
      </span>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-[#6B6661] text-[11px] hidden md:inline">
        Only 3 commercial allocations remaining for Q2 planting
      </span>
      <a
        href={bannerWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 font-bold text-emerald-900 hover:text-emerald-950 hover:underline uppercase tracking-wider text-[11px] cursor-pointer"
      >
        <span>Lock Allocation</span>
        <ArrowRight class="w-3 h-3" />
      </a>
    </div>
  </div>
</div>
