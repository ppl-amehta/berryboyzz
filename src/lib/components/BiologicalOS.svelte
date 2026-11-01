<script lang="ts">
  import { BIOLOGICAL_OS_PILLARS } from '$data/commercialModels';
  import { Dna, CheckCircle2 } from '@lucide/svelte';
</script>

<section id="biological-os" class="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative">
  <div class="max-w-7xl mx-auto">
    <!-- Header on Liquid Glass -->
    <div class="max-w-3xl mb-12 glass-panel rounded-3xl p-6 sm:p-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800/80 mb-3 backdrop-blur-sm">
        <Dna class="w-3.5 h-3.5" />
        <span>Proprietary Agronomic Framework</span>
      </div>
      <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] mb-3">
        The 6-Pillar Biological Operating System
      </h2>
      <p class="text-sm sm:text-base text-[#2E2824] dark:text-[#D4CEBF] leading-relaxed">
        Commercial berry cultivation in Maharashtra fails when treated like open-field farming. Our integrated Biological OS governs every parameter from tissue culture multiplication to cold-dock supermarket acceptance.
      </p>
    </div>

    <!-- Pillars Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each BIOLOGICAL_OS_PILLARS as pillar}
        <article class="glass-panel rounded-3xl p-7 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-full bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center shadow-md shadow-emerald-950/20">
                0{pillar.step}
              </span>
              <span class="text-[10px] font-mono font-bold tracking-wider uppercase text-[#332D28] dark:text-[#D4CEBF] bg-white/70 dark:bg-black/40 border border-white/60 dark:border-white/10 px-2.5 py-1 rounded-md">
                {pillar.code}
              </span>
            </div>

            <h3 class="font-serif text-xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
              {pillar.title}
            </h3>

            <p class="text-xs text-[#2E2824] dark:text-[#D4CEBF] leading-relaxed">
              {pillar.summary}
            </p>

            <div class="p-3.5 rounded-xl glass-subpanel text-[11px] text-[#262320] dark:text-[#E6E2DD] leading-relaxed italic">
              "{pillar.scientificMechanism}"
            </div>

            <!-- Deliverables -->
            <div class="space-y-1.5 pt-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#575049] dark:text-[#A8A196] block">Key Deliverables:</span>
              <ul class="space-y-1 text-xs text-[#262320] dark:text-[#E6E2DD]">
                {#each pillar.deliverables as deliv}
                  <li class="flex items-start gap-2">
                    <CheckCircle2 class="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span class="leading-relaxed font-medium">{deliv}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <div class="pt-5 mt-5 border-t border-white/60 dark:border-white/10 text-[11px] text-[#575049] dark:text-[#A8A196] flex justify-between items-center">
            <span>Audit Frequency:</span>
            <strong class="text-[#1A1615] dark:text-[#FAF9F6] font-semibold">{pillar.auditFrequency}</strong>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
