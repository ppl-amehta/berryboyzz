<script lang="ts">
  import {
    Briefcase,
    Sprout,
    Building2,
    GraduationCap,
    Send,
    CheckCircle2,
    MessageCircle,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Clock,
    FileText,
    HelpCircle
  } from '@lucide/svelte';
  import type { InboundLeadResponse } from '../../routes/api/inbound-lead/+server';

  let selectedRole = $state<'investor' | 'landowner' | 'buyer' | 'tour' | 'other'>('investor');
  let name = $state('');
  let organization = $state('');
  let phone = $state('');
  let email = $state('');
  let notes = $state('');

  // Role-specific dynamic fields
  let capitalBracket = $state('₹50L - ₹1 Crore');
  let cropPreference = $state('Raspberry & Strawberry Polyhouse');
  let acres = $state('5');
  let landLocation = $state('Satara / Wai');
  let waterSource = $state('Year-Round Borewell / Canal');
  let volumePerWeek = $state('200 - 500 kg / week');
  let deliveryHub = $state('Mumbai / Navi Mumbai');
  let tourTrack = $state('Commercial Polyhouse Study Tour');
  let groupSize = $state('2 - 5 Delegates');

  let isSubmitting = $state(false);
  let submissionError = $state<string | null>(null);
  let submissionResult = $state<InboundLeadResponse | null>(null);

  const ROLES = [
    {
      id: 'investor',
      title: 'Commercial Investor',
      badge: 'Turnkey CEA Agro-Asset',
      desc: 'Deploy ₹25L–₹5Cr+ in protected polyhouse clusters with 32–48% projected IRR and off-take.',
      icon: Briefcase,
    },
    {
      id: 'landowner',
      title: 'Agricultural Landowner',
      badge: 'Managed Joint-Venture',
      desc: 'Partner your 2–20+ acre parcel with Berryboyzz turnkey infrastructure and agronomy OS.',
      icon: Sprout,
    },
    {
      id: 'buyer',
      title: 'Institutional Off-Take Buyer',
      badge: 'Fresh Clamshell Supply',
      desc: 'Procure calibrated, zero-residue raspberries, strawberries, and blackberries for luxury hospitality or retail.',
      icon: Building2,
    },
    {
      id: 'tour',
      title: 'Farm Tour & Masterclass',
      badge: 'Experiential CEA Delegations',
      desc: 'Book weekend site visits, tissue-culture nursery inspections, and commercial masterclasses.',
      icon: GraduationCap,
    },
  ] as const;

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isSubmitting = true;
    submissionError = null;

    const payload = {
      role: selectedRole,
      name,
      organization,
      phone,
      email,
      details: {
        ...(selectedRole === 'investor' && { capitalBracket, cropPreference }),
        ...(selectedRole === 'landowner' && { acres, location: landLocation, waterSource }),
        ...(selectedRole === 'buyer' && { volumePerWeek, deliveryHub }),
        ...(selectedRole === 'tour' && { tourTrack, groupSize }),
      },
      notes,
    };

    try {
      const res = await fetch('/api/inbound-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register triage dossier.');
      }

      submissionResult = data;
    } catch (err) {
      submissionError = err instanceof Error ? err.message : 'Network error. Please try again or WhatsApp us directly.';
    } finally {
      isSubmitting = false;
    }
  }

  function resetForm() {
    submissionResult = null;
    submissionError = null;
    name = '';
    organization = '';
    phone = '';
    email = '';
    notes = '';
  }
</script>

<section
  id="inbound-engine"
  class="py-24 bg-[#FAF9F6] dark:bg-[#0C0A09] border-t border-[#E8E4DC] dark:border-[#282420] transition-colors relative overflow-hidden"
  aria-label="Frontier Inbound Lead Triage Engine"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Header -->
    <div class="max-w-3xl mb-12">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-800/10 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-800/20 dark:border-emerald-500/20 mb-4">
        <Sparkles class="w-3.5 h-3.5" />
        <span>Frontier Inbound Triage Engine</span>
      </div>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1615] dark:text-[#FAF9F6] tracking-tight leading-[1.15]">
        Engage the Superfruit Economy.
      </h2>
      <p class="mt-4 text-base sm:text-lg text-[#6B6661] dark:text-[#A89F91] leading-relaxed">
        Categorize your commercial objectives in under 60 seconds. Our Agronomy Desk automatically allocates a lead token, assesses triage priority, and routes your project dossier directly to our senior directors.
      </p>
    </div>

    <!-- Triage Form / Success Card -->
    <div class="bg-white dark:bg-[#141210] rounded-3xl border border-[#E8E4DC] dark:border-[#282420] p-6 sm:p-10 lg:p-12 shadow-xl shadow-stone-200/50 dark:shadow-none">
      {#if submissionResult}
        <!-- Step 3: Instant Automated Handoff & Confirmation -->
        <div class="max-w-2xl mx-auto text-center space-y-6 py-8 animate-lightbox-fade">
          <div class="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 class="w-8 h-8" />
          </div>

          <div class="space-y-2">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase {submissionResult.priority === 'TIER_1_INSTITUTIONAL' ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-300 dark:border-amber-800' : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'}">
              {submissionResult.priority.replace(/_/g, ' ')}
            </span>
            <h3 class="text-2xl sm:text-3xl font-serif font-bold text-[#1A1615] dark:text-[#FAF9F6]">
              Triage Dossier Registered
            </h3>
            <p class="text-sm text-[#6B6661] dark:text-[#A89F91]">
              Token: <strong class="font-mono text-[#1A1615] dark:text-[#FAF9F6] text-base">{submissionResult.leadId}</strong>
            </p>
          </div>

          <div class="bg-stone-50 dark:bg-[#1A1615] rounded-2xl p-4 sm:p-6 border border-[#E8E4DC] dark:border-[#282420] text-left space-y-3">
            <div class="flex items-center gap-2 text-xs font-mono text-[#6B6661] dark:text-[#A89F91]">
              <Clock class="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>Target Response SLA: <strong class="text-[#1A1615] dark:text-[#FAF9F6]">{submissionResult.sla}</strong></span>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono text-[#6B6661] dark:text-[#A89F91]">
              <ShieldCheck class="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>Lead Quality Score: <strong class="text-emerald-700 dark:text-emerald-400">{submissionResult.leadScore} / 100</strong></span>
            </div>
            <p class="text-xs text-[#6B6661] dark:text-[#A89F91] pt-1">
              {submissionResult.message}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={submissionResult.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle class="w-4 h-4" />
              <span>Open Priority WhatsApp Desk</span>
            </a>

            <a
              href={submissionResult.dossierUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-white dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] hover:bg-stone-50 font-semibold text-sm transition-all cursor-pointer"
            >
              <FileText class="w-4 h-4" />
              <span>View Technical Agronomy Dossier</span>
            </a>
          </div>

          <button
            type="button"
            onclick={resetForm}
            class="text-xs text-[#6B6661] dark:text-[#A89F91] hover:text-emerald-800 dark:hover:text-emerald-400 underline cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      {:else}
        <!-- Form Body with WebMCP & Semantic Schema Attributes -->
        <form
          aria-label="Berryboyzz Inbound Lead & CEA Triage Engine"
          data-webmcp-tool="submit_lead"
          data-webmcp-target="/api/inbound-lead"
          onsubmit={handleSubmit}
          class="space-y-8"
        >
          <!-- Step 1: Inbound Classification Selector -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label for="role-selector" class="text-xs font-bold uppercase tracking-wider text-[#6B6661] dark:text-[#A89F91]">
                Step 1: Select Your Commercial Profile
              </label>
              <span class="text-xs font-mono text-emerald-800 dark:text-emerald-400">1 of 2</span>
            </div>

            <div id="role-selector" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5" role="radiogroup" aria-label="Inbound profile selection">
              {#each ROLES as role}
                {@const isSelected = selectedRole === role.id}
                {@const Icon = role.icon}
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onclick={() => (selectedRole = role.id)}
                  class="flex flex-col text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative {isSelected
                    ? 'border-emerald-800 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-950/20 shadow-md'
                    : 'border-[#E8E4DC] dark:border-[#282420] bg-transparent hover:border-[#1A1615] dark:hover:border-[#FAF9F6]'}"
                >
                  <div class="flex items-center justify-between w-full mb-2">
                    <div class="p-2 rounded-xl {isSelected ? 'bg-emerald-800 text-white dark:bg-emerald-500 dark:text-black' : 'bg-stone-100 dark:bg-stone-900 text-[#6B6661] dark:text-[#A89F91]'}">
                      <Icon class="w-4 h-4" />
                    </div>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded-full {isSelected ? 'bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 font-bold' : 'text-[#888]'}">
                      {role.badge}
                    </span>
                  </div>
                  <h4 class="font-semibold text-sm sm:text-base text-[#1A1615] dark:text-[#FAF9F6] mb-1">
                    {role.title}
                  </h4>
                  <p class="text-xs text-[#6B6661] dark:text-[#A89F91] leading-relaxed line-clamp-2">
                    {role.desc}
                  </p>
                </button>
              {/each}
            </div>
          </div>

          <!-- Step 2: Role-Adaptive Dynamic Triage Fields -->
          <div class="pt-6 border-t border-[#E8E4DC] dark:border-[#282420] space-y-6">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-[#6B6661] dark:text-[#A89F91]">
                Step 2: Project Specifications & Direct Routing
              </span>
              <span class="text-xs font-mono text-emerald-800 dark:text-emerald-400">2 of 2</span>
            </div>

            <!-- Dynamic Role Details -->
            {#if selectedRole === 'investor'}
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="inv-capital" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Planned Capital Allocation
                  </label>
                  <select
                    id="inv-capital"
                    bind:value={capitalBracket}
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs font-medium focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  >
                    <option value="₹25L - ₹50 Lakhs">₹25L – ₹50 Lakhs (Modular 0.5-Acre Starter)</option>
                    <option value="₹50L - ₹1 Crore">₹50L – ₹1 Crore (Standard 1–2 Acre Commercial NPVH)</option>
                    <option value="₹1 Crore - ₹3 Crores">₹1 Crore – ₹3 Crores (3–5 Acre High-Wire CEA Cluster)</option>
                    <option value="₹3 Crores - ₹10 Crores+">₹3 Crores – ₹10 Crores+ (Institutional Agro-Park)</option>
                  </select>
                </div>

                <div>
                  <label for="inv-crop" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Target Cultivar Architecture
                  </label>
                  <select
                    id="inv-crop"
                    bind:value={cropPreference}
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs font-medium focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  >
                    <option value="Raspberry & Strawberry Polyhouse">Raspberry & Strawberry Polyhouse (Fastest 16-mo Break-even)</option>
                    <option value="Low-Chill Blueberry Hydroponic Grow-Bay">Low-Chill Blueberry Hydroponic Grow-Bay (Premium Long-Horizon)</option>
                    <option value="Prime-Ark Blackberry High-Wire">Prime-Ark Blackberry High-Wire (HoReCa Export Profile)</option>
                    <option value="Balanced Superfruit Multi-Crop Cluster">Balanced Superfruit Multi-Crop Cluster (Diversified Risk)</option>
                  </select>
                </div>
              </div>
            {:else if selectedRole === 'landowner'}
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label for="land-acres" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Parcel Size (Acres)
                  </label>
                  <input
                    id="land-acres"
                    type="text"
                    bind:value={acres}
                    placeholder="e.g. 5 Acres"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label for="land-loc" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Taluka / District
                  </label>
                  <input
                    id="land-loc"
                    type="text"
                    bind:value={landLocation}
                    placeholder="e.g. Satara, Wai, Pune, Bhor"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label for="land-water" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Water Security
                  </label>
                  <select
                    id="land-water"
                    bind:value={waterSource}
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs font-medium focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  >
                    <option value="Year-Round Borewell / Canal">Year-Round Borewell / Canal (Optimal)</option>
                    <option value="Farm Pond / River Lift">Farm Pond / River Lift</option>
                    <option value="Seasonal / Groundwater Dependent">Seasonal / Groundwater Dependent</option>
                  </select>
                </div>
              </div>
            {:else if selectedRole === 'buyer'}
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="buy-vol" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Target Volume Requirement
                  </label>
                  <select
                    id="buy-vol"
                    bind:value={volumePerWeek}
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs font-medium focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  >
                    <option value="50 - 200 kg / week">50 – 200 kg / week (Boutique Hospitality & Cafes)</option>
                    <option value="200 - 500 kg / week">200 – 500 kg / week (Luxury Hotels & Gourmet Chains)</option>
                    <option value="500 - 2,000 kg / week">500 – 2,000 kg / week (Metro Retail Supermarkets)</option>
                    <option value="2+ Tonnes / week">2+ Tonnes / week (Export Air-Cargo Program)</option>
                  </select>
                </div>

                <div>
                  <label for="buy-hub" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Destination Cold-Chain Hub
                  </label>
                  <select
                    id="buy-hub"
                    bind:value={deliveryHub}
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs font-medium focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  >
                    <option value="Mumbai / Navi Mumbai">Mumbai / Navi Mumbai (Daily 4-hr Pre-cooled Transit)</option>
                    <option value="Pune Metro Belt">Pune Metro Belt (Direct Farm-to-Hub)</option>
                    <option value="Bengaluru / Hyderabad Air Cargo">Bengaluru / Hyderabad Air Cargo</option>
                    <option value="Delhi NCR Cold-Chain">Delhi NCR Cold-Chain</option>
                    <option value="International Export Terminal (BOM)">International Export Terminal (BOM)</option>
                  </select>
                </div>
              </div>
            {:else if selectedRole === 'tour'}
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="tour-prog" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Selected Tour Track
                  </label>
                  <select
                    id="tour-prog"
                    bind:value={tourTrack}
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs font-medium focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  >
                    <option value="Harvest Experience & Tasting">Weekend Fresh Harvest & Tasting Tour (₹1,500/head)</option>
                    <option value="Commercial Polyhouse Study Tour">Commercial Polyhouse Study Tour (₹4,500/head)</option>
                    <option value="Agro-Asset Masterclass & Nursery">Comprehensive 2-Day Agro-Asset Masterclass (₹12,500/head)</option>
                  </select>
                </div>

                <div>
                  <label for="tour-size" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                    Delegation Size
                  </label>
                  <select
                    id="tour-size"
                    bind:value={groupSize}
                    class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs font-medium focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                  >
                    <option value="Solo Attendee">Solo Attendee</option>
                    <option value="2 - 5 Delegates">2 – 5 Delegates (Standard)</option>
                    <option value="6 - 15 Corporate Delegation">6 – 15 Corporate Delegation</option>
                    <option value="15+ Institutional Group">15+ Institutional Group</option>
                  </select>
                </div>
              </div>
            {/if}

            <!-- Contact Credentials (Universal) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div>
                <label for="rep-name" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                  Your Full Name <span class="text-rose-500">*</span>
                </label>
                <input
                  id="rep-name"
                  type="text"
                  required
                  bind:value={name}
                  placeholder="e.g. Vikramaditya Deshmukh"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                />
              </div>

              <div>
                <label for="rep-phone" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                  WhatsApp / Mobile <span class="text-rose-500">*</span>
                </label>
                <input
                  id="rep-phone"
                  type="tel"
                  required
                  bind:value={phone}
                  placeholder="e.g. +91 98220 12345"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                />
              </div>

              <div>
                <label for="rep-email" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                  Official Email
                </label>
                <input
                  id="rep-email"
                  type="email"
                  bind:value={email}
                  placeholder="e.g. v.deshmukh@investments.in"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                />
              </div>

              <div>
                <label for="rep-org" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                  Entity / Estate Name
                </label>
                <input
                  id="rep-org"
                  type="text"
                  bind:value={organization}
                  placeholder="e.g. Sahyadri Agro Capital LLP"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs focus:ring-2 focus:ring-emerald-800 focus:outline-none"
                />
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label for="rep-notes" class="block text-xs font-semibold text-[#1A1615] dark:text-[#FAF9F6] mb-1.5">
                Specific Targets or Inquiries (Optional)
              </label>
              <input
                id="rep-notes"
                type="text"
                bind:value={notes}
                placeholder="e.g. Seeking turnkey polyhouse subsidy assistance, targeting March 2027 floricane planting."
                class="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#282420] bg-stone-50 dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] text-xs focus:ring-2 focus:ring-emerald-800 focus:outline-none"
              />
            </div>

            {#if submissionError}
              <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-xs font-mono border border-rose-200 dark:border-rose-900/40">
                ⚠ {submissionError}
              </div>
            {/if}

            <!-- Submit Action -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8E4DC] dark:border-[#282420]">
              <div class="flex items-center gap-2 text-xs text-[#6B6661] dark:text-[#A89F91]">
                <ShieldCheck class="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Confidential DPDP Act 2023 Compliant Triage Protocol. Zero Spam.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer disabled:opacity-60 active:scale-95"
              >
                {#if isSubmitting}
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Transmitting Dossier...</span>
                {:else}
                  <span>Submit & Generate Agronomy Token</span>
                  <ArrowRight class="w-4 h-4" />
                {/if}
              </button>
            </div>
          </div>
        </form>
      {/if}
    </div>
  </div>
</section>
