<script lang="ts">
  import '../app.css';
  import Navbar from '$components/Navbar.svelte';
  import Footer from '$components/Footer.svelte';
  import { SpeedInsights } from '@vercel/speed-insights/sveltekit';
  
  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1615]">
  <Navbar />
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>

<SpeedInsights />
