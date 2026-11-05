<script lang="ts">
  import '../app.css';
  import Navbar from '#components/Navbar.svelte';
  import Footer from '#components/Footer.svelte';
  import { page } from '$app/state';
  import { injectSpeedInsights } from '@vercel/speed-insights';
  import { inject as injectAnalytics } from '@vercel/analytics';
  import { onMount } from 'svelte';
  import { scheduleBackgroundTask } from '#utils/scheduler';
  import { initWebMCP } from '#utils/webmcp';
  
  let { children } = $props();

  const isEmbed = $derived(page.url.pathname.startsWith('/embed'));

  onMount(() => {
    initWebMCP();
    scheduleBackgroundTask(() => {
      injectSpeedInsights({ framework: 'sveltekit' });
      injectAnalytics();
    });
  });
</script>

{#if isEmbed}
  <div class="bg-transparent text-[#1A1615] dark:text-[#FAF9F6]">
    {@render children()}
  </div>
{:else}
  <div class="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0C0A09] text-[#1A1615] dark:text-[#FAF9F6]">
    <Navbar />
    <main class="flex-grow">
      {@render children()}
    </main>
    <Footer />
  </div>
{/if}
