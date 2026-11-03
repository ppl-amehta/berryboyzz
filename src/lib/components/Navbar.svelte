<script lang="ts">
  import { Sprout, Menu, X, MessageCircle, ChevronRight, Phone, Sun, Moon } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';
  import { themeManager } from '#lib/theme.svelte';

  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  const whatsappUrl = buildWhatsAppUrl({
    leadSource: 'navbar_cta',
    customMessage: 'Hello Berryboyzz, I would like to inquire about commercial berry farming and investment opportunities.',
  });
</script>

<header class="sticky top-0 z-50 bg-[#FAF9F6]/90 dark:bg-[#0C0A09]/90 backdrop-blur-md border-b border-[#E8E4DC] dark:border-[#282420] transition-all">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <!-- Brand Logo -->
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-emerald-800 dark:bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-950/10 group-hover:bg-emerald-900 dark:group-hover:bg-emerald-600 transition-colors">
          <Sprout class="w-5 h-5" />
        </div>
        <div>
          <span class="font-serif text-xl tracking-tight font-bold text-[#1A1615] dark:text-[#FAF9F6] block group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
            BERRYBOYZZ
          </span>
          <span class="text-[9px] tracking-widest uppercase font-semibold text-[#6B6661] dark:text-[#A8A196] block -mt-0.5">
            Agro-Assets · Pune & Satara
          </span>
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#4A4643] dark:text-[#A8A196]">
        <a href="/cultivars/" class="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors py-1">
          Cultivars
        </a>
        <a href="/#commercial-models" class="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors py-1">
          Commercial Models
        </a>
        <a href="/#roi-calculator" class="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors py-1">
          Capex & ROI
        </a>
        <a href="/tours/" class="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors py-1">
          Farm Tours
        </a>
        <a href="/#biological-os" class="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors py-1">
          Biological OS
        </a>
      </nav>

      <!-- Action Buttons -->
      <div class="hidden sm:flex items-center gap-3">
        <!-- Adaptive Night Mode Toggle -->
        <button
          onclick={() => themeManager.toggle()}
          class="p-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#2E2A27] bg-white dark:bg-[#181513] text-[#4A4643] dark:text-[#D4CEBF] hover:text-[#1A1615] dark:hover:text-white hover:border-[#D4CEBF] dark:hover:border-[#443E38] transition-all cursor-pointer shadow-sm"
          title={themeManager.isDark ? 'Switch to Sunlit Estate (Day)' : 'Switch to Obsidian Estate (Night)'}
          aria-label="Toggle Night Mode"
        >
          {#if themeManager.isDark}
            <Sun class="w-4 h-4 text-amber-400" />
          {:else}
            <Moon class="w-4 h-4 text-emerald-800" />
          {/if}
        </button>

        <a
          href="tel:+918888681136"
          class="p-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#2E2A27] bg-white dark:bg-[#181513] text-[#4A4643] dark:text-[#D4CEBF] hover:text-[#1A1615] dark:hover:text-white hover:border-[#D4CEBF] dark:hover:border-[#443E38] transition-all"
          title="Direct Agronomy Desk"
        >
          <Phone class="w-4 h-4" />
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white shadow-sm shadow-emerald-950/10 transition-all hover:shadow-md cursor-pointer"
        >
          <MessageCircle class="w-4 h-4" />
          <span>WhatsApp Desk</span>
        </a>
      </div>

      <!-- Mobile Controls -->
      <div class="md:hidden flex items-center gap-2">
        <button
          onclick={() => themeManager.toggle()}
          class="p-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#2E2A27] bg-white dark:bg-[#181513] text-[#4A4643] dark:text-[#D4CEBF] transition-all cursor-pointer shadow-sm"
          aria-label="Toggle Night Mode"
        >
          {#if themeManager.isDark}
            <Sun class="w-4 h-4 text-amber-400" />
          {:else}
            <Moon class="w-4 h-4 text-emerald-800" />
          {/if}
        </button>

        <button
          onclick={toggleMobileMenu}
          class="p-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#2E2A27] bg-white dark:bg-[#181513] text-[#1A1615] dark:text-[#FAF9F6] hover:bg-[#F5F2EB] dark:hover:bg-[#201D1A] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {#if mobileMenuOpen}
            <X class="w-5 h-5" />
          {:else}
            <Menu class="w-5 h-5" />
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Drawer -->
  {#if mobileMenuOpen}
    <div class="md:hidden bg-white dark:bg-[#141210] border-b border-[#E8E4DC] dark:border-[#282420] px-4 pt-3 pb-6 space-y-3 shadow-xl">
      <nav class="flex flex-col space-y-2 text-sm font-medium text-[#1A1615] dark:text-[#FAF9F6]">
        <a
          href="/cultivars/"
          onclick={() => (mobileMenuOpen = false)}
          class="px-3 py-2.5 rounded-lg hover:bg-[#F5F2EB] dark:hover:bg-[#201D1A] flex items-center justify-between"
        >
          <span>Flagship Cultivars</span>
          <ChevronRight class="w-4 h-4 text-[#6B6661] dark:text-[#9E9689]" />
        </a>
        <a
          href="/#commercial-models"
          onclick={() => (mobileMenuOpen = false)}
          class="px-3 py-2.5 rounded-lg hover:bg-[#F5F2EB] dark:hover:bg-[#201D1A] flex items-center justify-between"
        >
          <span>Commercial Models (NPVH / Tunnels)</span>
          <ChevronRight class="w-4 h-4 text-[#6B6661] dark:text-[#9E9689]" />
        </a>
        <a
          href="/#roi-calculator"
          onclick={() => (mobileMenuOpen = false)}
          class="px-3 py-2.5 rounded-lg hover:bg-[#F5F2EB] dark:hover:bg-[#201D1A] flex items-center justify-between"
        >
          <span>Capex Horizon & ROI Calculator</span>
          <ChevronRight class="w-4 h-4 text-[#6B6661] dark:text-[#9E9689]" />
        </a>
        <a
          href="/tours/"
          onclick={() => (mobileMenuOpen = false)}
          class="px-3 py-2.5 rounded-lg hover:bg-[#F5F2EB] dark:hover:bg-[#201D1A] flex items-center justify-between"
        >
          <span>Farm Tours & Study Tour</span>
          <ChevronRight class="w-4 h-4 text-[#6B6661] dark:text-[#9E9689]" />
        </a>
        <a
          href="/#biological-os"
          onclick={() => (mobileMenuOpen = false)}
          class="px-3 py-2.5 rounded-lg hover:bg-[#F5F2EB] dark:hover:bg-[#201D1A] flex items-center justify-between"
        >
          <span>6-Pillar Biological OS</span>
          <ChevronRight class="w-4 h-4 text-[#6B6661] dark:text-[#9E9689]" />
        </a>
      </nav>

      <div class="pt-2 border-t border-[#E8E4DC] dark:border-[#282420]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onclick={() => (mobileMenuOpen = false)}
          class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white shadow-sm"
        >
          <MessageCircle class="w-4 h-4" />
          <span>Inquire via WhatsApp Desk</span>
        </a>
      </div>
    </div>
  {/if}
</header>
