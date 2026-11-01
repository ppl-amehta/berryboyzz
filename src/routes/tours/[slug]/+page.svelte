<script lang="ts">
  import { Clock, MapPin, Users, MessageCircle, Calendar, ArrowLeft, CheckCircle2 } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '$utils/whatsapp';

  let { data } = $props();
  const tour = $derived(data.tour);

  const tourWhatsAppUrl = $derived(
    buildWhatsAppUrl({
      leadSource: 'tour_detail',
      tourName: tour.title,
      customMessage: `I would like to book a slot for the "${tour.title}" (${tour.duration}, fee: ₹${tour.feePerPersonINR}/person) at Berryboyzz farm.`,
    })
  );
</script>

<svelte:head>
  <title>{tour.title} ({tour.duration}) · Experiential Agronomy | Berryboyzz</title>
  <meta name="description" content="{tour.tagline} Hosted at Berryboyzz Flagship Farm, Wai-Panchgani Foothills, Satara." />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <!-- Back link -->
  <div class="mb-8">
    <a href="/tours/" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B6661] hover:text-emerald-800 transition-colors">
      <ArrowLeft class="w-4 h-4" />
      <span>Back to Farm Visits & Masterclasses</span>
    </a>
  </div>

  <!-- Editorial Header -->
  <header class="pb-8 border-b border-[#E8E4DC] mb-10">
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200">
        Experiential Agri-Tourism
      </span>
      <span class="text-xs font-mono text-[#6B6661]">
        Code: {tour.whatsappCode}
      </span>
    </div>

    <h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">
      {tour.title}
    </h1>

    <p class="text-base sm:text-lg text-[#262320] leading-relaxed max-w-2xl mb-8">
      {tour.tagline}
    </p>

    <!-- Key Tour Info Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="estate-card p-4 rounded-2xl">
        <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Duration</span>
        <strong class="font-mono-num text-lg font-bold text-[#1A1615]">{tour.duration}</strong>
      </div>
      <div class="estate-card p-4 rounded-2xl">
        <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Per Person Fee</span>
        <strong class="font-mono-num text-lg font-bold text-emerald-800">
          {#if tour.id === 'harvest-visit'}
            ₹1,250 – ₹1,800
          {:else}
            ₹{tour.feePerPersonINR.toLocaleString('en-IN')}
          {/if}
        </strong>
      </div>
      <div class="estate-card p-4 rounded-2xl">
        <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Group Size</span>
        <strong class="font-mono-num text-lg font-bold text-[#1A1615]">Max {tour.maxGroupSize} Guests</strong>
      </div>
      <div class="estate-card p-4 rounded-2xl">
        <span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Schedule</span>
        <strong class="text-xs font-semibold text-[#1A1615] block truncate">{tour.timing.split('(')[0]}</strong>
      </div>
    </div>
  </header>

  <!-- Location Banner -->
  <div class="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E8E4DC] mb-10 text-xs text-[#4A4643]">
    <MapPin class="w-4 h-4 text-emerald-800 shrink-0" />
    <span><strong>Location:</strong> {tour.location}</span>
  </div>

  <!-- Curriculum / What's Included -->
  <section class="estate-card p-8 rounded-3xl mb-10 space-y-6">
    <h3 class="font-serif text-2xl font-bold text-[#1A1615] pb-3 border-b border-[#E8E4DC]">
      Curriculum & Experience Highlights
    </h3>

    <ul class="grid grid-cols-1 gap-3.5 text-xs text-[#262320]">
      {#each tour.includes as item}
        <li class="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F5F2EB]/60 transition-colors">
          <CheckCircle2 class="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <span class="leading-relaxed font-medium">{item}</span>
        </li>
      {/each}
    </ul>
  </section>

  <!-- Itinerary -->
  <section class="estate-card p-8 rounded-3xl mb-10 space-y-6">
    <h3 class="font-serif text-2xl font-bold text-[#1A1615] pb-3 border-b border-[#E8E4DC]">
      Schedule & Hour-by-Hour Itinerary
    </h3>

    <div class="space-y-4">
      {#each tour.itinerary as step}
        <div class="flex items-start gap-4 text-xs">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-800 shrink-0 mt-1"></span>
          <p class="text-[#262320] font-medium leading-relaxed">{step}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Booking CTA -->
  <section class="estate-card p-8 rounded-3xl bg-white border-[#E8E4DC] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-emerald-950/5">
    <div>
      <h3 class="font-serif text-2xl font-bold text-[#1A1615]">
        Reserve Your Attendance
      </h3>
      <p class="text-xs text-[#6B6661] mt-1">
        Limited to {tour.maxGroupSize} participants per session for personalized master grower guidance.
      </p>
    </div>

    <a
      href={tourWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="shrink-0 inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer"
    >
      <MessageCircle class="w-4 h-4" />
      <span>Book via WhatsApp Desk</span>
    </a>
  </section>
</div>
