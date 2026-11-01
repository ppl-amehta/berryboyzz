<script lang="ts">
  import '../app.css';
  import Navbar from '$components/Navbar.svelte';
  import Footer from '$components/Footer.svelte';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { onMount } from 'svelte';
  
  let { children } = $props();

  onMount(() => {
    injectSpeedInsights();
  });
</script>

<div class="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0C0A09] text-[#1A1615] dark:text-[#FAF9F6] transition-colors duration-300">
  <Navbar />
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
