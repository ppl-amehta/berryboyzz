<script lang="ts">
  import { Activity, Thermometer, Droplets, Sun, CheckCircle } from '@lucide/svelte';
</script>

<div class="fixed bottom-0 left-0 right-0 z-20 bg-white/90 dark:bg-[#141210]/90 backdrop-blur-md border-t border-[#E8E4DC] dark:border-[#282420] py-2 px-4 hidden sm:block transition-colors duration-300">
  <div class="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-[#4A4643] dark:text-[#D4CEBF] font-mono-num">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
        <strong class="text-[#1A1615] dark:text-[#FAF9F6]">SATARA TELEMETRY:</strong>
      </div>
      <div class="flex items-center gap-1.5">
        <Thermometer class="w-3.5 h-3.5 text-[#6B6661] dark:text-[#9E9689]" />
        <span>22.4°C CEA Canopy</span>
      </div>
      <div class="flex items-center gap-1.5">
        <Droplets class="w-3.5 h-3.5 text-[#6B6661] dark:text-[#9E9689]" />
        <span>64% RH Optimal</span>
      </div>
      <div class="flex items-center gap-1.5">
        <Sun class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>PAR 940 µmol/m²/s</span>
      </div>
      <div class="hidden lg:flex items-center gap-1.5">
        <Activity class="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
        <span>Fertigation EC 1.64 · pH 5.75</span>
      </div>
    </div>

    <div class="flex items-center gap-2 text-[#6B6661] dark:text-[#9E9689] text-[10px] uppercase font-bold tracking-wider">
      <CheckCircle class="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
      <span>100% Biological OS In Compliance</span>
    </div>
  </div>
</div>
