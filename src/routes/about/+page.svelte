<script lang="ts">
  import { Sprout, ShieldCheck, Cpu, TrendingUp, Award, ArrowRight, Phone, MessageCircle } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';
</script>

<svelte:head>
  <title>About Berryboyzz · Precision Berry Agro-Assets & CEA Agronomy | Pune & Satara</title>
  <meta
    name="description"
    content="Discover Berryboyzz Agro-Ventures: India's premier controlled environment berry venture. Learn about our tissue-culture mother nursery, automated polyhouse infrastructure, and precision biological operating system in Satara, Maharashtra."
  />
  <link rel="canonical" href="https://berryboyzz.in/about/" />
  <meta property="og:title" content="About Berryboyzz · Precision Berry Agro-Assets & CEA Agronomy" />
  <meta property="og:description" content="Engineering the superfruit economy across Maharashtra. Discover our tissue-culture genetics, polyhouse systems, and biological operating system." />
  <meta property="og:url" content="https://berryboyzz.in/about/" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://berryboyzz.in/gallery/apex-punnet-quality-full.webp" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <!-- Header / Breadcrumb -->
  <header class="mb-14 space-y-4">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 backdrop-blur-sm">
      <Sprout class="w-3.5 h-3.5" />
      <span>The Agro-Asset Engineering Story</span>
    </div>
    
    <h1 class="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] leading-tight">
      Transforming Rural Maharashtra Into India's Superfruit Epicenter.
    </h1>
    
    <p class="text-lg text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed max-w-3xl">
      Founded in the microclimatic corridor between the Sahyadri foothills of Pune and the plateau of Satara, Berryboyzz Agro-Ventures LLP is pioneering high-yield Controlled Environment Agriculture (CEA) for strawberries, raspberries, blackberries, and blueberries.
    </p>
  </header>

  <!-- Narrative Section 1: The Problem & The Mission -->
  <section class="space-y-6 mb-16 text-[#3A3533] dark:text-[#D4CEBF] leading-relaxed text-sm sm:text-base">
    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
      1. Overcoming the Open-Field Vulnerability
    </h2>
    <p>
      For decades, berry farming across India has been constrained by unpredictable monsoon patterns, unshielded open-field exposure, temperature spikes during flowering, and soil-borne fungal pathogens such as <em>Phytophthora cactorum</em> and <em>Verticillium dahliae</em>. Traditional growers struggled with fragile yields, extreme seasonal price volatility, and heavy dependence on harsh chemical interventions that damaged plant longevity and fruit shelf life.
    </p>
    <p>
      Berryboyzz was founded to eliminate these vulnerabilities through systematic engineering. By integrating climate-controlled Naturally Ventilated Polyhouses (NPVH), specialized UV-diffused polytunnels, and elevated hydroponic substrate troughs, we create an optimized micro-biosphere where cultivars thrive independent of exterior climatic shocks.
    </p>
  </section>

  <!-- Key Pillars Grid -->
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
    <div class="estate-card rounded-2xl p-6 space-y-3">
      <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
        <ShieldCheck class="w-5 h-5" />
      </div>
      <h3 class="font-serif text-lg font-bold text-[#1A1615] dark:text-[#FAF9F6]">Certified Genetics</h3>
      <p class="text-xs text-[#575049] dark:text-[#A89F91] leading-relaxed">
        100% virus-indexed, tissue-culture derived mother stock acclimatized specifically for sub-tropical day-length and chill-hour parameters.
      </p>
    </div>

    <div class="estate-card rounded-2xl p-6 space-y-3">
      <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
        <Cpu class="w-5 h-5" />
      </div>
      <h3 class="font-serif text-lg font-bold text-[#1A1615] dark:text-[#FAF9F6]">Biological OS</h3>
      <p class="text-xs text-[#575049] dark:text-[#A89F91] leading-relaxed">
        Automated dosing heads delivering stage-specific electrical conductivity (EC) and pH balance with beneficial microbial inoculants.
      </p>
    </div>

    <div class="estate-card rounded-2xl p-6 space-y-3">
      <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
        <TrendingUp class="w-5 h-5" />
      </div>
      <h3 class="font-serif text-lg font-bold text-[#1A1615] dark:text-[#FAF9F6]">Cold-Chain Off-Take</h3>
      <p class="text-xs text-[#575049] dark:text-[#A89F91] leading-relaxed">
        Integrated post-harvest blast chillers, nitrogen packaging, and direct institutional supply contracts providing predictable farmer revenues.
      </p>
    </div>
  </section>

  <!-- Narrative Section 2: Technical Philosophy -->
  <section class="space-y-6 mb-16 text-[#3A3533] dark:text-[#D4CEBF] leading-relaxed text-sm sm:text-base">
    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
      2. The Satara Horticultural Advantage
    </h2>
    <p>
      Located at an altitude of 750 to 950 meters above sea level, our primary research and cultivation estate in Satara benefits from a unique diurnal temperature gradient. Warm daylight hours (24°C–28°C) trigger intensive photosynthesis and carbohydrate synthesis, while cool night breezes descending from the Western Ghats (12°C–16°C) decelerate plant respiration. This diurnal swing locks natural sugars into the fruit pulp, generating anthocyanin concentrations and Brix scores that rival premier Mediterranean and California berry harvests.
    </p>
    <p>
      Our substrate farming techniques utilize sterilized, aged Sri Lankan and Indian coir fiber combined with horticultural grade perlite. This inert medium ensures zero soil-borne pathogens, perfect drainage porosity (35% air-filled porosity), and precise root-zone temperature management throughout the hot pre-monsoon months.
    </p>

    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6] pt-6">
      3. The Superfruit Economic Model
    </h2>
    <p>
      Modern agriculture must be financially sound to be truly sustainable. Conventional commodity crops in India often yield negative or fragile margins after accounting for diesel, chemical inputs, and water depletion. In contrast, Berryboyzz commercial polyhouse models generate between ₹28,00,000 and ₹42,00,000 per acre annually in gross revenue, achieving full capital payback within 16 to 18 months.
    </p>
    <p>
      By clustering family farms and progressive agri-entrepreneurs under our biological protocol, Berryboyzz provides end-to-end off-take assurance. Harvest lots are pre-cooled within 90 minutes of field harvest to 2°C, packaged into micro-perforated clamshell punnets, and dispatched via reefer transport directly to premium supermarket chains, gourmet confectioneries, and export cargo hubs.
    </p>
  </section>

  <!-- Contact / Inquiry Strip -->
  <section class="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
    <div class="max-w-2xl space-y-4 relative z-10">
      <h3 class="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
        Connect With Our Agronomy Leadership
      </h3>
      <p class="text-sm text-emerald-100/90 leading-relaxed">
        Whether you are planning a 1-acre commercial polyhouse installation, seeking certified tissue-culture mother stock, or exploring agricultural asset investment, our senior horticulturists in Satara are available for consultations.
      </p>
      <div class="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider">
        <a
          href="tel:+918888681136"
          class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 transition-colors shadow-md"
        >
          <Phone class="w-4 h-4 text-emerald-800" />
          <span>Call +91 88886 81136</span>
        </a>
        <a
          href={buildWhatsAppUrl({ leadSource: 'about_page', customMessage: 'Hello, I read your About page and want to discuss commercial berry farming.' })}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition-colors border border-emerald-600 shadow-md"
        >
          <MessageCircle class="w-4 h-4" />
          <span>WhatsApp Agronomist</span>
        </a>
      </div>
    </div>
  </section>
</div>
