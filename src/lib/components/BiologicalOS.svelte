<script lang="ts">
  import { BIOLOGICAL_OS_PILLARS } from '$data/commercialModels';
  import { Dna, CheckCircle2 } from '@lucide/svelte';
</script>

<section id="biological-os" class="py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-[#E8E4DC]/80 dark:border-[#282420]/80 relative">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="max-w-3xl mb-14">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 mb-3 backdrop-blur-sm">
        <Dna class="w-3.5 h-3.5" />
        <span>Proprietary Agronomic Framework</span>
      </div>
      <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] mb-4">
        The 6-Pillar Biological Operating System
      </h2>
      <p class="text-sm sm:text-base text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
        Commercial berry cultivation in Maharashtra fails when treated like open-field farming. Our integrated Biological OS governs every parameter from tissue culture multiplication to cold-dock supermarket acceptance.
      </p>
    </div>

    <!-- Pillars Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each BIOLOGICAL_OS_PILLARS as pillar}
        <article class="glass-panel rounded-3xl p-7 flex flex-col justify-between hover:-translate-y-1 transition-all">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-full bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                0{pillar.step}
              </span>
              <span class="text-[10px] font-mono font-bold tracking-wider uppercase text-[#6B6661] dark:text-[#9E9689] bg-[#F5F2EB]/80 dark:bg-[#1E1A17]/80 border border-[#E8E4DC] dark:border-[#282420] px-2.5 py-1 rounded-md">
                {pillar.code}
              </span>
            </div>

            <h3 class="font-serif text-xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
              {pillar.title}
            </h3>

            <p class="text-xs text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
              {pillar.summary}
            </p>

            <div class="p-3.5 rounded-xl bg-white/70 dark:bg-[#0C0A09]/70 border border-[#E8E4DC] dark:border-[#282420] text-[11px] text-[#262320] dark:text-[#E6E2DD] leading-relaxed italic">
              "{pillar.scientificMechanism}"
            </div>

            <!-- Deliverables -->
            <div class="space-y-1.5 pt-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] dark:text-[#9E9689] block">Key Deliverables:</span>
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

          <div class="pt-5 mt-5 border-t border-[#E8E4DC]/80 dark:border-[#282420]/80 text-[11px] text-[#6B6661] dark:text-[#9E9689] flex justify-between items-center">
            <span>Audit Frequency:</span>
            <strong class="text-[#1A1615] dark:text-[#FAF9F6] font-semibold">{pillar.auditFrequency}</strong>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
