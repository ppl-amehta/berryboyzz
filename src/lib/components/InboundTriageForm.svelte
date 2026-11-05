<script lang="ts">
  import {
    TrendingUp,
    MapPin,
    ShoppingBag,
    Users,
    CheckCircle2,
    ArrowRight,
    MessageCircle,
    ShieldCheck,
    Loader2
  } from '@lucide/svelte';

  type StakeholderRole = 'investor' | 'landowner' | 'buyer' | 'tour';

  let activeRole: StakeholderRole = $state('investor');

  // Common contact inputs
  let fullName = $state('');
  let phone = $state('');
  let email = $state('');

  // Investor fields
  let capexBracket = $state('50L-1Cr');
  let targetAcres = $state(2);
  let timeline = $state('immediate');

  // Landowner fields
  let landAcres = $state(4);
  let district = $state('Satara');
  let waterSource = $state('perennial');
  let roadAccess = $state(true);

  // Buyer fields
  let cultivar = $state('Strawberry (San Andreas)');
  let weeklyVolumeKg = $state(500);
  let deliveryLocation = $state('Mumbai Metro');

  // Tour fields
  let groupSize = $state(4);
  let preferredMonth = $state('Upcoming Weekend');
  let focusArea = $state('Polyhouse Engineering & Fertigation');

  // Submission state
  let isSubmitting = $state(false);
  let submitError = $state('');
  let submitResult: {
    success: boolean;
    leadId: string;
    tier: string;
    whatsappUrl: string;
    message: string;
  } | null = $state(null);

  const roles = [
    {
      id: 'investor' as const,
      label: 'Agro-Asset Investor',
      subtitle: 'CEA Polyhouses & 16-mo Break-even',
      icon: TrendingUp
    },
    {
      id: 'landowner' as const,
      label: 'Agricultural Landowner',
      subtitle: 'Land Partnership & Joint Venture',
      icon: MapPin
    },
    {
      id: 'buyer' as const,
      label: 'Institutional Off-Take',
      subtitle: 'Weekly Commercial Berry Procurement',
      icon: ShoppingBag
    },
    {
      id: 'tour' as const,
      label: 'Technical Delegation',
      subtitle: 'Masterclasses & Agronomy Tours',
      icon: Users
    }
  ];

  function getDetailsPayload() {
    switch (activeRole) {
      case 'investor':
        return { capexBracket, targetAcres, timeline };
      case 'landowner':
        return { acres: landAcres, district, waterSource, roadAccess };
      case 'buyer':
        return { cultivar, weeklyVolumeKg, deliveryLocation };
      case 'tour':
        return { groupSize, preferredMonth, focusArea };
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    submitError = '';

    try {
      const payload = {
        role: activeRole,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        details: getDetailsPayload()
      };

      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit commercial inquiry.');
      }

      submitResult = data;
    } catch (err) {
      submitError = err instanceof Error ? err.message : 'An unexpected error occurred. Please try WhatsApp directly.';
    } finally {
      isSubmitting = false;
    }
  }

  function resetForm() {
    submitResult = null;
    submitError = '';
  }
</script>

<section id="commercial-triage" class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
  <div class="estate-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EBE7DF] dark:border-[#221F1C] bg-[#FAF9F6]/95 dark:bg-[#141211]/95 shadow-xl backdrop-blur-md">
    
    <!-- Section Header -->
    <div class="max-w-3xl mb-10 space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <ShieldCheck class="w-3.5 h-3.5" />
        <span>Direct Commercial Intake &amp; Triage Engine</span>
      </div>

      <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6]">
        Commercial Engagement &amp; Agronomy Desk
      </h2>

      <p class="text-sm sm:text-base text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
        Select your stakeholder profile to receive an immediate feasibility dossier, prioritized agronomist review, and direct WhatsApp routing.
      </p>
    </div>

    <!-- Role Switcher Tabs -->
    <div
      role="tablist"
      aria-label="Stakeholder Profile Selector"
      class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 p-1.5 bg-[#EFECE6] dark:bg-[#1E1B19] rounded-2xl mb-8"
    >
      {#each roles as r}
        {@const Icon = r.icon}
        <button
          type="button"
          role="tab"
          id="tab-{r.id}"
          aria-selected={activeRole === r.id}
          aria-controls="panel-{r.id}"
          onclick={() => { activeRole = r.id; resetForm(); }}
          class={`flex flex-col items-start p-3 sm:p-4 rounded-xl text-left transition-all duration-200 ${
            activeRole === r.id
              ? 'bg-white dark:bg-[#282420] text-emerald-900 dark:text-emerald-300 shadow-md border border-emerald-200/60 dark:border-emerald-800/40'
              : 'text-[#6B6661] dark:text-[#A89F91] hover:text-[#1A1615] dark:hover:text-[#FAF9F6] hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <div class="flex items-center gap-2 mb-1">
            <Icon class="w-4 h-4 shrink-0" />
            <span class="text-xs sm:text-sm font-bold tracking-tight">{r.label}</span>
          </div>
          <span class="text-[10px] sm:text-[11px] opacity-80 line-clamp-1">{r.subtitle}</span>
        </button>
      {/each}
    </div>

    <!-- Form Container -->
    {#if submitResult}
      <!-- Success / Priority Tier View -->
      <div class="rounded-2xl p-6 sm:p-8 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-6">
        <div class="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 class="w-8 h-8" />
        </div>

        <div class="space-y-2 max-w-xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100">
            Priority Tier: {submitResult.tier} &bull; Ref: {submitResult.leadId}
          </div>
          <h3 class="font-serif text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
            Dossier Prioritized for Expedited Review
          </h3>
          <p class="text-xs sm:text-sm text-[#4A4643] dark:text-[#D4CEBF]">
            Your inquiry has been cataloged under priority tier <strong>{submitResult.tier}</strong>. Click below to initiate direct dispatch with our Chief Agronomist on WhatsApp with your pre-formatted dossier.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={submitResult.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-900/20"
          >
            <MessageCircle class="w-4 h-4" />
            <span>Launch WhatsApp Agronomy Desk</span>
            <ArrowRight class="w-4 h-4 ml-1" />
          </a>

          <button
            type="button"
            onclick={resetForm}
            class="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#D5D0C5] dark:border-[#38332E] text-xs font-semibold text-[#4A4643] dark:text-[#D4CEBF] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    {:else}
      <!-- Interactive Form Container -->
      <div
        id="panel-{activeRole}"
        role="tabpanel"
        aria-labelledby="tab-{activeRole}"
      >
        <form
          action="/api/triage"
          method="POST"
          onsubmit={handleSubmit}
          class="space-y-8"
        >
          <input type="hidden" name="role" value={activeRole} />

        <!-- Role Specific Fields -->
        <div class="p-5 sm:p-6 rounded-2xl bg-[#F7F5F0] dark:bg-[#1A1715] border border-[#E8E4DA] dark:border-[#2C2724] space-y-5">
          <div class="flex items-center justify-between border-b border-[#E8E4DA] dark:border-[#2C2724] pb-3">
            <h3 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
              {activeRole === 'investor' ? 'Investor Investment Parameters' :
               activeRole === 'landowner' ? 'Parcel & Agronomic Parameters' :
               activeRole === 'buyer' ? 'Commercial Off-Take Specification' :
               'Agronomy Study Tour Specifications'}
            </h3>
            <span class="text-[10px] font-mono text-[#6B6661] dark:text-[#A89F91]">Phase 1 Screening</span>
          </div>

          {#if activeRole === 'investor'}
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="inv-capex" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Target Capital Deployment
                </label>
                <select
                  id="inv-capex"
                  name="capexBracket"
                  bind:value={capexBracket}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="25L-50L">₹25L – ₹50L (0.5 to 1 Acre Polyhouse)</option>
                  <option value="50L-1Cr">₹50L – ₹1.0 Cr (1 to 2 Acres CEA Setup)</option>
                  <option value="1Cr-5Cr">₹1.0 Cr – ₹5.0 Cr (Commercial Grow-Bay Complex)</option>
                  <option value="5Cr+">₹5.0 Cr+ (Institutional Agro-Asset)</option>
                </select>
              </div>

              <div>
                <label for="inv-acres" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Target Scale (Acres)
                </label>
                <select
                  id="inv-acres"
                  name="targetAcres"
                  bind:value={targetAcres}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value={1}>1 Acre (~₹32L Capex)</option>
                  <option value={2}>2 Acres (~₹64L Capex)</option>
                  <option value={5}>5 Acres (~₹1.6 Cr Capex)</option>
                  <option value={10}>10+ Acres (Commercial Syndicate)</option>
                </select>
              </div>

              <div>
                <label for="inv-timeline" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Deployment Horizon
                </label>
                <select
                  id="inv-timeline"
                  name="timeline"
                  bind:value={timeline}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="immediate">Immediate (&lt; 60 days)</option>
                  <option value="upcoming_quarter">Next Quarter (60-90 days)</option>
                  <option value="exploring">Strategic Evaluation</option>
                </select>
              </div>
            </div>
          {:else if activeRole === 'landowner'}
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label for="land-acres" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Parcel Acreage
                </label>
                <select
                  id="land-acres"
                  name="acres"
                  bind:value={landAcres}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value={2}>1 – 2 Acres</option>
                  <option value={4}>3 – 5 Acres</option>
                  <option value={8}>5 – 10 Acres</option>
                  <option value={15}>10+ Acres</option>
                </select>
              </div>

              <div>
                <label for="land-district" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  District / Location
                </label>
                <select
                  id="land-district"
                  name="district"
                  bind:value={district}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Satara">Satara (Primary CEA Zone)</option>
                  <option value="Pune">Pune District</option>
                  <option value="Kolhapur">Kolhapur Corridor</option>
                  <option value="Sangli">Sangli / Solapur</option>
                  <option value="Other">Other Maharashtra</option>
                </select>
              </div>

              <div>
                <label for="land-water" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Water Availability
                </label>
                <select
                  id="land-water"
                  name="waterSource"
                  bind:value={waterSource}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="perennial">Perennial River / Lake / Well</option>
                  <option value="borewell">High-yield Borewell</option>
                  <option value="seasonal">Canal / Seasonal Water</option>
                </select>
              </div>

              <div class="flex items-center pt-6">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF]">
                  <input
                    type="checkbox"
                    name="roadAccess"
                    bind:checked={roadAccess}
                    class="rounded text-emerald-800 focus:ring-emerald-600 w-4 h-4"
                  />
                  <span>All-Weather Heavy Truck Road Access</span>
                </label>
              </div>
            </div>
          {:else if activeRole === 'buyer'}
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="buy-cultivar" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Cultivar Requirement
                </label>
                <select
                  id="buy-cultivar"
                  name="cultivar"
                  bind:value={cultivar}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Strawberry (San Andreas)">Strawberry (San Andreas &amp; Sweet Sensation)</option>
                  <option value="Raspberry (Maravilla)">Raspberry (Maravilla Primocane)</option>
                  <option value="Blueberry (Biloxi Low-Chill)">Blueberry (Southern Highbush Biloxi)</option>
                  <option value="Blackberry (Karaka Black)">Blackberry (Karaka Black)</option>
                  <option value="Assorted Mixed Punnets">Assorted Mixed Superfruit Punnets</option>
                </select>
              </div>

              <div>
                <label for="buy-volume" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Weekly Volume Requirement (kg)
                </label>
                <select
                  id="buy-volume"
                  name="weeklyVolumeKg"
                  bind:value={weeklyVolumeKg}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value={200}>200 – 500 kg / week</option>
                  <option value={500}>500 – 1,000 kg / week</option>
                  <option value={1500}>1,000 – 2,500 kg / week (Priority C1)</option>
                  <option value={5000}>5,000+ kg / week (Institutional Contract)</option>
                </select>
              </div>

              <div>
                <label for="buy-dest" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Cold-Chain Destination
                </label>
                <input
                  id="buy-dest"
                  type="text"
                  name="deliveryLocation"
                  bind:value={deliveryLocation}
                  placeholder="e.g. Mumbai, Pune, Bengaluru"
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          {:else if activeRole === 'tour'}
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="tour-size" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Delegation Headcount
                </label>
                <select
                  id="tour-size"
                  name="groupSize"
                  bind:value={groupSize}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value={2}>1 – 2 Persons (Executive Walkthrough)</option>
                  <option value={5}>3 – 5 Persons (Agronomy Team)</option>
                  <option value={10}>6 – 12 Persons (Institutional Delegation)</option>
                </select>
              </div>

              <div>
                <label for="tour-month" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Preferred Schedule
                </label>
                <input
                  id="tour-month"
                  type="text"
                  name="preferredMonth"
                  bind:value={preferredMonth}
                  placeholder="e.g. November Weekend or Nov 15-20"
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label for="tour-focus" class="block text-xs font-medium text-[#4A4643] dark:text-[#D4CEBF] mb-1.5">
                  Technical Curriculum Focus
                </label>
                <select
                  id="tour-focus"
                  name="focusArea"
                  bind:value={focusArea}
                  class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#24201D] border border-[#D5D0C5] dark:border-[#38332E] text-xs font-medium text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Polyhouse Engineering & Fertigation">Polyhouse Engineering &amp; Fertigation Automation</option>
                  <option value="Substrate Agronomy & Biological OS">Substrate Agronomy &amp; Biological OS Protocols</option>
                  <option value="Tissue-Culture Nursery Operations">Tissue-Culture Nursery &amp; Propagation</option>
                  <option value="Commercial Financial Models">Commercial Capex &amp; Revenue Modeling</option>
                </select>
              </div>
            </div>
          {/if}
        </div>

        <!-- Contact Credentials -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label for="triage-name" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
              Full Name *
            </label>
            <input
              id="triage-name"
              type="text"
              name="fullName"
              required
              minlength={2}
              bind:value={fullName}
              placeholder="e.g. Rajesh Singhania"
              class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1E1B19] border border-[#D5D0C5] dark:border-[#38332E] text-xs sm:text-sm text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label for="triage-phone" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
              Phone / WhatsApp Number *
            </label>
            <input
              id="triage-phone"
              type="tel"
              name="phone"
              required
              bind:value={phone}
              placeholder="e.g. +91 98221 88800"
              class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1E1B19] border border-[#D5D0C5] dark:border-[#38332E] text-xs sm:text-sm text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label for="triage-email" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
              Email Address (Optional)
            </label>
            <input
              id="triage-email"
              type="email"
              name="email"
              bind:value={email}
              placeholder="e.g. rajesh@singhaniaholdings.com"
              class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1E1B19] border border-[#D5D0C5] dark:border-[#38332E] text-xs sm:text-sm text-[#1A1615] dark:text-[#FAF9F6] focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        <!-- Error Banner -->
        {#if submitError}
          <div class="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300">
            {submitError}
          </div>
        {/if}

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EBE7DF] dark:border-[#221F1C]">
          <div class="text-[11px] text-[#6B6661] dark:text-[#9E9689] flex items-center gap-1.5">
            <ShieldCheck class="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span>Direct WhatsApp handover &bull; Strict confidentiality under Indian Data Protection Act</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {#if isSubmitting}
              <Loader2 class="w-4 h-4 animate-spin" />
              <span>Analyzing &amp; Categorizing...</span>
            {:else}
              <span>Prioritize &amp; Open WhatsApp Dossier</span>
              <ArrowRight class="w-4 h-4" />
            {/if}
          </button>
        </div>
      </form>
    </div>
    {/if}

  </div>
</section>