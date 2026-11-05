<script lang="ts">
  import DynamicROICalculator from '#components/DynamicROICalculator.svelte';
  import { Code2, Check, ExternalLink } from '@lucide/svelte';

  let copied = $state(false);
  let showEmbedSnippet = $state(false);

  const embedCode = `<iframe src="https://berryboyzz.in/embed/calculator/" width="100%" height="820" frameborder="0" style="border:none; border-radius:24px; box-shadow:0 10px 30px rgba(0,0,0,0.08); overflow:hidden;" title="Commercial Berry Polyhouse & Hydroponics ROI Calculator"></iframe>
<p style="font-size:11px; text-align:center; color:#6B6661; font-family:system-ui,sans-serif; margin-top:8px;">Interactive Agronomic Financial Engine by <a href="https://berryboyzz.in/#roi-calculator" target="_blank" rel="noopener" style="color:#065f46; font-weight:600; text-decoration:underline;">Berryboyzz Agro-Assets</a></p>`;

  function copyEmbedSnippet() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(embedCode);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2500);
    }
  }
</script>

<svelte:head>
  <title>Commercial Berry Farming ROI Calculator (Embeddable) · Berryboyzz</title>
  <meta name="description" content="Embeddable commercial protected horticulture ROI and capex calculator for strawberries, raspberries, blackberries, and blueberries in India." />
  <link rel="canonical" href="https://berryboyzz.in/#roi-calculator" />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="p-4 sm:p-6 max-w-5xl mx-auto">
  <!-- Top Embed Control Strip -->
  <div class="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E4DC] dark:border-[#282420] text-xs">
    <div class="flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
      <span class="font-bold uppercase tracking-wider text-[#6B6661] dark:text-[#9E9689] text-[10px]">
        Embeddable Financial Engine
      </span>
    </div>

    <div class="flex items-center gap-3">
      <button
        onclick={() => (showEmbedSnippet = !showEmbedSnippet)}
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E4DC] dark:border-[#282420] bg-white dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs font-semibold hover:border-emerald-700 transition-colors cursor-pointer"
      >
        <Code2 class="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
        <span>{showEmbedSnippet ? 'Hide Embed Code' : 'Embed On Your Website'}</span>
      </button>

      <a
        href="https://berryboyzz.in/#roi-calculator"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-1 text-xs text-emerald-800 dark:text-emerald-400 font-semibold hover:underline"
      >
        <span>Full Estate Platform</span>
        <ExternalLink class="w-3.5 h-3.5" />
      </a>
    </div>
  </div>

  <!-- Embed Snippet Box (Collapsible) -->
  {#if showEmbedSnippet}
    <div class="estate-card p-4 rounded-2xl mb-6 space-y-3 bg-[#F5F2EB] dark:bg-[#1C1816]">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-[#1A1615] dark:text-[#FAF9F6]">
          Copy-paste this snippet into any HTML page, CMS, or blog post:
        </span>
        <button
          onclick={copyEmbedSnippet}
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          {#if copied}
            <Check class="w-3.5 h-3.5" />
            <span>Copied!</span>
          {:else}
            <span>Copy Snippet</span>
          {/if}
        </button>
      </div>
      <pre class="p-3 rounded-xl bg-black/90 text-emerald-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap select-all"><code>{embedCode}</code></pre>
    </div>
  {/if}

  <!-- The Core Interactive ROI Calculator Component -->
  <DynamicROICalculator />

  <!-- Attribution & Backlink Footer Bar -->
  <footer class="pt-6 mt-6 border-t border-[#E8E4DC] dark:border-[#282420] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B6661] dark:text-[#9E9689]">
    <div class="flex items-center gap-2">
      <span>Data &amp; Agronomic Protocols provided by</span>
      <a
        href="https://berryboyzz.in/#roi-calculator"
        target="_blank"
        rel="noopener"
        class="font-serif font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
      >
        Berryboyzz Agro-Ventures LLP
      </a>
    </div>
    <div class="text-[11px] font-mono">
      <span>Satara-Mahabaleshwar CEA Corridor · Pune Desk</span>
    </div>
  </footer>
</div>
