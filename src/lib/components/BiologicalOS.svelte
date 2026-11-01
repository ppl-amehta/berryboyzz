<script lang="ts">
  import { BIOLOGICAL_OS_PILLARS } from '$data/commercialModels';
  import { Dna, CheckCircle2 } from '@lucide/svelte';
</script>

<section id="biological-os" class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E8E4DC]">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="max-w-3xl mb-14">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
        <Dna class="w-3.5 h-3.5" />
        <span>Proprietary Agronomic Framework</span>
      </div>
      <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">
        The 6-Pillar Biological Operating System
      </h2>
      <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">
        Commercial berry cultivation in Maharashtra fails when treated like open-field farming. Our integrated Biological OS governs every parameter from tissue culture multiplication to cold-dock supermarket acceptance.
      </p>
    </div>

    <!-- Pillars Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each BIOLOGICAL_OS_PILLARS as pillar}
        <article class="estate-card rounded-3xl p-7 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-full bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center">
                0{pillar.step}
              </span>
              <span class="text-[10px] font-mono font-bold tracking-wider uppercase text-[#6B6661] bg-[#F5F2EB] px-2.5 py-1 rounded-md">
                {pillar.code}
              </span>
            </div>

            <h3 class="font-serif text-xl font-bold text-[#1A1615]">
              {pillar.title}
            </h3>

            <p class="text-xs text-[#4A4643] leading-relaxed">
              {pillar.summary}
            </p>

            <div class="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC] text-[11px] text-[#262320] leading-relaxed italic">
              "{pillar.scientificMechanism}"
            </div>

            <!-- Deliverables -->
            <div class="space-y-1.5 pt-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] block">Key Deliverables:</span>
              <ul class="space-y-1 text-xs text-[#262320]">
                {#each pillar.deliverables as deliv}
                  <li class="flex items-start gap-2">
                    <CheckCircle2 class="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                    <span class="leading-relaxed font-medium">{deliv}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <div class="pt-5 mt-5 border-t border-[#E8E4DC] text-[11px] text-[#6B6661] flex justify-between items-center">
            <span>Audit Frequency:</span>
            <strong class="text-[#1A1615] font-semibold">{pillar.auditFrequency}</strong>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
