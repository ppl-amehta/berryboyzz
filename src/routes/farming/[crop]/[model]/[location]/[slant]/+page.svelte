<script lang="ts">
  import {
    Sprout,
    TrendingUp,
    ShieldCheck,
    Cpu,
    Calendar,
    MapPin,
    Phone,
    MessageCircle,
    ArrowRight,
    CheckCircle2,
    DollarSign,
    Thermometer,
    Award
  } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';

  let { data } = $props();
  const page = $derived(data.page);
  const relatedPages = $derived(data.relatedPages);

  const whatsappInquiryUrl = $derived(
    buildWhatsAppUrl({
      leadSource: `programmatic_${page.cropSlug}_${page.locationSlug}`,
      customMessage: `Hello Berryboyzz, I want to discuss commercial ${page.cropName} farming under ${page.modelName} in ${page.locationName} (${page.slantTitle}).`
    })
  );

  // Schema JSON-LD Graph for this specific page
  const pageSchemaJson = $derived(
    JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `https://berryboyzz.in/farming/${page.cropSlug}/${page.modelSlug}/${page.locationSlug}/${page.slantSlug}#article`,
          "headline": page.h1,
          "description": page.metaDescription,
          "inLanguage": "en-IN",
          "publisher": {
            "@id": "https://berryboyzz.in/#organization"
          },
          "mainEntityOfPage": `https://berryboyzz.in/farming/${page.cropSlug}/${page.modelSlug}/${page.locationSlug}/${page.slantSlug}`
        },
        {
          "@type": "Product",
          "@id": `https://berryboyzz.in/farming/${page.cropSlug}/${page.modelSlug}/${page.locationSlug}/${page.slantSlug}#product`,
          "name": `${page.cropName} Turnkey ${page.modelName} Installation (${page.locationName})`,
          "description": page.metaDescription,
          "category": "Agricultural Protected Cultivation Infrastructure",
          "brand": { "@id": "https://berryboyzz.in/#organization" },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": page.netCapexINR,
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2027-12-31"
          }
        },
        {
          "@type": "FAQPage",
          "@id": `https://berryboyzz.in/farming/${page.cropSlug}/${page.modelSlug}/${page.locationSlug}/${page.slantSlug}#faq`,
          "mainEntity": page.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://berryboyzz.in/farming/${page.cropSlug}/${page.modelSlug}/${page.locationSlug}/${page.slantSlug}#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://berryboyzz.in/" },
            { "@type": "ListItem", "position": 2, "name": "Cultivars", "item": "https://berryboyzz.in/cultivars/" },
            { "@type": "ListItem", "position": 3, "name": page.cropName, "item": `https://berryboyzz.in/cultivars/${page.cropSlug}/` },
            { "@type": "ListItem", "position": 4, "name": `${page.locationName} Guide`, "item": `https://berryboyzz.in/farming/${page.cropSlug}/${page.modelSlug}/${page.locationSlug}/${page.slantSlug}` }
          ]
        }
      ]
    })
  );
</script>

<svelte:head>
  <title>{page.metaTitle}</title>
  <meta name="description" content={page.metaDescription} />
  <link rel="canonical" href={`https://berryboyzz.in/farming/${page.cropSlug}/${page.modelSlug}/${page.locationSlug}/${page.slantSlug}`} />
  <meta property="og:title" content={page.metaTitle} />
  <meta property="og:description" content={page.metaDescription} />
  <meta property="og:url" content={`https://berryboyzz.in/farming/${page.cropSlug}/${page.modelSlug}/${page.locationSlug}/${page.slantSlug}`} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://berryboyzz.in/gallery/apex-punnet-quality-full.webp" />

  <!-- Page Specific JSON-LD Knowledge Graph -->
  {@html `<script type="application/ld+json">${pageSchemaJson}</script>`}
</svelte:head>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
  <!-- Breadcrumb Navigation -->
  <nav class="flex items-center gap-2 text-xs text-[#6B6661] dark:text-[#9E9689] mb-8 overflow-x-auto pb-2" aria-label="Breadcrumb">
    <a href="/" class="hover:underline">Home</a>
    <span>/</span>
    <a href="/cultivars/" class="hover:underline">Cultivars</a>
    <span>/</span>
    <a href={`/cultivars/${page.cropSlug}/`} class="hover:underline capitalize">{page.cropSlug}</a>
    <span>/</span>
    <span class="text-emerald-800 dark:text-emerald-400 font-semibold">{page.locationName}</span>
  </nav>

  <!-- Header Section -->
  <header class="mb-12 space-y-4">
    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 backdrop-blur-sm">
      <MapPin class="w-3.5 h-3.5" />
      <span>{page.locationName} · {page.modelName}</span>
    </div>

    <h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6] leading-[1.12]">
      {page.h1}
    </h1>

    <p class="text-base sm:text-lg text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed max-w-4xl">
      Official commercial feasibility study, government subsidy norms, capital expenditure breakdown, and cold-chain off-take agreements for {page.cropName} in {page.locationName}.
    </p>
  </header>

  <!-- Key Takeaways Callout -->
  <section class="estate-card rounded-3xl p-6 sm:p-8 mb-12 border-l-4 border-l-emerald-800 dark:border-l-emerald-400">
    <h2 class="text-xs font-bold uppercase tracking-widest text-[#6B6661] dark:text-[#9E9689] mb-4 flex items-center gap-2">
      <Award class="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
      <span>Executive Summary &amp; Key Highlights</span>
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#3A3533] dark:text-[#D4CEBF]">
      {#each page.keyTakeaways as takeaway}
        <div class="flex items-start gap-3">
          <CheckCircle2 class="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
          <span>{takeaway}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Core Metric Highlights Grid -->
  <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
    <div class="estate-card p-5 rounded-2xl space-y-1">
      <span class="text-[10px] uppercase font-bold text-[#6B6661] dark:text-[#9E9689]">Net Capex (Post Subsidy)</span>
      <p class="text-xl sm:text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-400">
        ₹{(page.netCapexINR / 100000).toFixed(1)} Lakhs
      </p>
      <span class="text-[10px] text-[#888] block">Per Acre Baseline</span>
    </div>

    <div class="estate-card p-5 rounded-2xl space-y-1">
      <span class="text-[10px] uppercase font-bold text-[#6B6661] dark:text-[#9E9689]">Annual Gross Output</span>
      <p class="text-xl sm:text-2xl font-serif font-bold text-[#1A1615] dark:text-[#FAF9F6]">
        {page.expectedAnnualYieldKg.toLocaleString()} kg
      </p>
      <span class="text-[10px] text-[#888] block">Across 2 Flushes / Year</span>
    </div>

    <div class="estate-card p-5 rounded-2xl space-y-1">
      <span class="text-[10px] uppercase font-bold text-[#6B6661] dark:text-[#9E9689]">Gross Annual Revenue</span>
      <p class="text-xl sm:text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-400">
        ₹{(page.annualGrossRevenueINR / 100000).toFixed(1)} Lakhs
      </p>
      <span class="text-[10px] text-[#888] block">@ ₹{page.avgWholesalePricePerKgINR}/kg Wholesale</span>
    </div>

    <div class="estate-card p-5 rounded-2xl space-y-1">
      <span class="text-[10px] uppercase font-bold text-[#6B6661] dark:text-[#9E9689]">Payback &amp; IRR</span>
      <p class="text-xl sm:text-2xl font-serif font-bold text-rose-800 dark:text-rose-400">
        {page.breakevenMonths} Mos · {page.irrPercentage}%
      </p>
      <span class="text-[10px] text-[#888] block">Internal Rate of Return</span>
    </div>
  </section>

  <!-- Financial P&L & Capex Breakdown Table -->
  <section class="mb-16">
    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6] mb-6">
      1. Unit Economics &amp; P&amp;L Breakdown (1-Acre Commercial Scale)
    </h2>
    <div class="estate-card rounded-3xl overflow-hidden shadow-lg border border-[#E8E4DC] dark:border-[#282420]">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead class="bg-[#F5F2EB] dark:bg-[#1E1A17] text-[#1A1615] dark:text-[#FAF9F6] uppercase text-[10px] tracking-wider font-bold">
            <tr>
              <th class="p-4 sm:p-5">Financial Parameter</th>
              <th class="p-4 sm:p-5">Commercial Metric</th>
              <th class="p-4 sm:p-5 hidden sm:table-cell">Technical Notes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E8E4DC] dark:divide-[#282420] text-[#3A3533] dark:text-[#D4CEBF]">
            <tr>
              <td class="p-4 sm:p-5 font-semibold">Gross Turnkey Capex</td>
              <td class="p-4 sm:p-5 font-mono font-bold text-stone-900 dark:text-white">₹{page.capexPerAcreINR.toLocaleString()}</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs text-[#6B6661] dark:text-[#9E9689]">Galvanized framework, 200µ film, drip manifolds, automation</td>
            </tr>
            <tr class="bg-emerald-50/50 dark:bg-emerald-950/20">
              <td class="p-4 sm:p-5 font-semibold text-emerald-900 dark:text-emerald-300">NHB / MahaDBT Capital Subsidy</td>
              <td class="p-4 sm:p-5 font-mono font-bold text-emerald-800 dark:text-emerald-400">- ₹{page.subsidyAmountINR.toLocaleString()}</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs text-emerald-800 dark:text-emerald-400">Up to 40-50% credit-linked back-ended subsidy on cost norm</td>
            </tr>
            <tr class="font-bold">
              <td class="p-4 sm:p-5">Net Investor Capital Outlay</td>
              <td class="p-4 sm:p-5 font-mono text-emerald-800 dark:text-emerald-400">₹{page.netCapexINR.toLocaleString()}</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs text-[#6B6661] dark:text-[#9E9689]">Equity requirement inclusive of planting material</td>
            </tr>
            <tr>
              <td class="p-4 sm:p-5 font-semibold">Plant Population Density</td>
              <td class="p-4 sm:p-5 font-mono">{page.plantsPerAcre.toLocaleString()} Plants / Acre</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs text-[#6B6661] dark:text-[#9E9689]">High-density spacing optimized for canopy air movement</td>
            </tr>
            <tr>
              <td class="p-4 sm:p-5 font-semibold">Annual Projected Yield</td>
              <td class="p-4 sm:p-5 font-mono font-bold">{page.expectedAnnualYieldKg.toLocaleString()} kg</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs text-[#6B6661] dark:text-[#9E9689]">Bi-annual commercial harvest cycles under Biological OS</td>
            </tr>
            <tr>
              <td class="p-4 sm:p-5 font-semibold">Grade-A Realized Wholesale Price</td>
              <td class="p-4 sm:p-5 font-mono">₹{page.avgWholesalePricePerKgINR} / kg</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs text-[#6B6661] dark:text-[#9E9689]">Institutional cold-chain off-take to Mumbai &amp; Pune metro retail</td>
            </tr>
            <tr class="bg-stone-50 dark:bg-stone-900/50">
              <td class="p-4 sm:p-5 font-bold">Gross Annual Realization</td>
              <td class="p-4 sm:p-5 font-mono font-bold text-emerald-800 dark:text-emerald-400">₹{page.annualGrossRevenueINR.toLocaleString()}</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs text-[#6B6661] dark:text-[#9E9689]">Annual gross farm gate billing</td>
            </tr>
            <tr>
              <td class="p-4 sm:p-5 font-semibold">Annual Operational Expense (Opex)</td>
              <td class="p-4 sm:p-5 font-mono text-rose-800 dark:text-rose-400">₹{page.annualOpexINR.toLocaleString()}</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs text-[#6B6661] dark:text-[#9E9689]">Nutrients, electricity, bio-inputs, labor, packaging punnets</td>
            </tr>
            <tr class="bg-emerald-100/40 dark:bg-emerald-900/30 font-bold text-emerald-950 dark:text-emerald-200">
              <td class="p-4 sm:p-5">Net Annual Profit (Pre-Tax)</td>
              <td class="p-4 sm:p-5 font-mono text-lg text-emerald-800 dark:text-emerald-300">₹{page.netAnnualProfitINR.toLocaleString()}</td>
              <td class="p-4 sm:p-5 hidden sm:table-cell text-xs">Exempt from Indian central income tax under Section 10(1)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Climate & Location Suitability -->
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
    <div class="estate-card rounded-3xl p-8 space-y-4">
      <h2 class="font-serif text-xl sm:text-2xl font-bold text-[#1A1615] dark:text-[#FAF9F6] flex items-center gap-2">
        <Thermometer class="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
        <span>2. Agro-Climatic Parameters in {page.locationName}</span>
      </h2>
      <p class="text-xs sm:text-sm text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
        {page.climateOverview}
      </p>
      <div class="grid grid-cols-3 gap-3 pt-3 text-center">
        <div class="p-3 rounded-xl bg-[#F5F2EB] dark:bg-[#1C1816]">
          <span class="text-[10px] text-[#6B6661] dark:text-[#9E9689] uppercase font-bold block">Elevation</span>
          <strong class="font-mono text-sm">{page.elevationMeters}m ASL</strong>
        </div>
        <div class="p-3 rounded-xl bg-[#F5F2EB] dark:bg-[#1C1816]">
          <span class="text-[10px] text-[#6B6661] dark:text-[#9E9689] uppercase font-bold block">Diurnal Temp</span>
          <strong class="font-mono text-xs">{page.avgDiurnalTemp}</strong>
        </div>
        <div class="p-3 rounded-xl bg-[#F5F2EB] dark:bg-[#1C1816]">
          <span class="text-[10px] text-[#6B6661] dark:text-[#9E9689] uppercase font-bold block">Chill Hours</span>
          <strong class="font-mono text-sm">{page.chillHoursAvailable} Hours</strong>
        </div>
      </div>
    </div>

    <div class="estate-card rounded-3xl p-8 space-y-4">
      <h2 class="font-serif text-xl sm:text-2xl font-bold text-[#1A1615] dark:text-[#FAF9F6] flex items-center gap-2">
        <ShieldCheck class="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
        <span>3. Infrastructure Specifications</span>
      </h2>
      <ul class="space-y-3 pt-1 text-xs sm:text-sm text-[#4A4643] dark:text-[#D4CEBF]">
        {#each page.infrastructureSpecs as spec}
          <li class="flex items-start gap-2.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-800 dark:bg-emerald-400 mt-2 shrink-0"></span>
            <span>{spec}</span>
          </li>
        {/each}
      </ul>
      <p class="text-xs text-[#6B6661] dark:text-[#9E9689] pt-2 border-t border-[#E8E4DC] dark:border-[#282420]">
        All structural designs meet IS 14462:1997 greenhouse engineering guidelines for Maharashtra wind velocity ratings.
      </p>
    </div>
  </section>

  <!-- Government Subsidy Details -->
  <section class="estate-card rounded-3xl p-8 sm:p-10 mb-16 space-y-4">
    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
      4. Government Subsidy &amp; Institutional Credit Linkage
    </h2>
    <p class="text-xs sm:text-sm text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
      {page.subsidyOverview}
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
      <div class="p-4 rounded-xl bg-[#F5F2EB] dark:bg-[#1C1816] space-y-1">
        <strong class="block text-emerald-800 dark:text-emerald-400 font-bold">1. DPR Formulation</strong>
        <span>Preparation of technical feasibility dossier and bankable Detailed Project Report (DPR).</span>
      </div>
      <div class="p-4 rounded-xl bg-[#F5F2EB] dark:bg-[#1C1816] space-y-1">
        <strong class="block text-emerald-800 dark:text-emerald-400 font-bold">2. Bank Term Loan</strong>
        <span>Linkage with nationalized and commercial banks for 50-75% term debt financing.</span>
      </div>
      <div class="p-4 rounded-xl bg-[#F5F2EB] dark:bg-[#1C1816] space-y-1">
        <strong class="block text-emerald-800 dark:text-emerald-400 font-bold">3. Subsidy Release</strong>
        <span>Back-ended credit disbursal directly into the grower loan account upon inspection.</span>
      </div>
    </div>
  </section>

  <!-- FAQ Accordion -->
  <section class="mb-16 space-y-4">
    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6] mb-6">
      5. Frequently Asked Inquiries
    </h2>
    <div class="space-y-4">
      {#each page.faqs as faq}
        <div class="estate-card rounded-2xl p-6 space-y-2">
          <h3 class="font-serif text-base sm:text-lg font-bold text-[#1A1615] dark:text-[#FAF9F6]">
            {faq.question}
          </h3>
          <p class="text-xs sm:text-sm text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
            {faq.answer}
          </p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Related Programmatic Guides (Internal Linking Mesh) -->
  {#if relatedPages.length > 0}
    <section class="mb-16">
      <h2 class="text-xs font-bold uppercase tracking-widest text-[#6B6661] dark:text-[#9E9689] mb-6">
        Explore Related Commercial Farming Guides
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each relatedPages as related}
          <a
            href={`/farming/${related.cropSlug}/${related.modelSlug}/${related.locationSlug}/${related.slantSlug}`}
            class="estate-card rounded-2xl p-5 group hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div class="space-y-2">
              <span class="text-[10px] font-mono uppercase text-emerald-800 dark:text-emerald-400 font-bold block">
                {related.locationName}
              </span>
              <h3 class="font-serif text-sm font-bold text-[#1A1615] dark:text-[#FAF9F6] group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                {related.h1}
              </h3>
            </div>
            <div class="pt-3 mt-3 border-t border-[#E8E4DC] dark:border-[#282420] flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
              <span>View Guide</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Bottom CTA Strip pre-populated with exact params -->
  <section class="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
    <div class="max-w-2xl space-y-4 relative z-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 border border-white/20">
        <Sprout class="w-3.5 h-3.5 text-emerald-400" />
        <span>Turnkey Project Allotment · {page.locationName}</span>
      </div>
      <h2 class="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
        Plan Your Commercial {page.cropName} Project
      </h2>
      <p class="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
        Speak directly with our senior horticultural engineers in Satara to request a customized site feasibility report, detailed water testing analysis, and bankable DPR for {page.locationName}.
      </p>
      <div class="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider">
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition-colors border border-emerald-600 shadow-md"
        >
          <MessageCircle class="w-4 h-4" />
          <span>Inquire via WhatsApp Desk</span>
        </a>
        <a
          href="tel:+918888681136"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 transition-colors shadow-md"
        >
          <Phone class="w-4 h-4 text-emerald-800" />
          <span>Call +91 88886 81136</span>
        </a>
      </div>
    </div>
  </section>
</div>
