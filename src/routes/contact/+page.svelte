<script lang="ts">
  import { Phone, Mail, MapPin, MessageCircle, Clock, Calendar, CheckCircle2, Sprout } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '#utils/whatsapp';
</script>

<svelte:head>
  <title>Contact Agronomy Desk · Pune & Satara | Berryboyzz Agro-Ventures</title>
  <meta
    name="description"
    content="Direct inquiry desk for Berryboyzz Agro-Ventures. Connect with senior horticulturists for polyhouse setup, tissue-culture berry plant orders, farm tours, and institutional off-take in Maharashtra, India."
  />
  <link rel="canonical" href="https://berryboyzz.in/contact/" />
  <meta property="og:title" content="Contact Berryboyzz · Agronomy & Farm Inquiries Desk" />
  <meta property="og:description" content="Reach our agronomy team in Satara & Pune for commercial polyhouse setups, tissue-culture berry plants, and farm tours." />
  <meta property="og:url" content="https://berryboyzz.in/contact/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://berryboyzz.in/gallery/apex-punnet-quality-full.webp" />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <!-- Header -->
  <header class="mb-14 max-w-3xl space-y-4">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 backdrop-blur-sm">
      <Sprout class="w-3.5 h-3.5" />
      <span>Agronomy & Corporate Inquiries</span>
    </div>
    
    <h1 class="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1615] dark:text-[#FAF9F6]">
      Connect With the Berryboyzz Agronomy Desk
    </h1>
    
    <p class="text-base sm:text-lg text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
      Whether you are exploring a commercial Controlled Environment Agriculture (CEA) berry farm setup, booking certified tissue-culture planting material, or arranging an agronomic field visit, our teams in Satara and Pune are at your service.
    </p>
  </header>

  <!-- Contact Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
    <!-- Card 1: Direct Hotline & WhatsApp -->
    <div class="estate-card rounded-3xl p-8 space-y-6 flex flex-col justify-between">
      <div class="space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
          <Phone class="w-6 h-6" />
        </div>
        <div>
          <h2 class="font-serif text-xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">Direct Agronomy Hotline</h2>
          <p class="text-xs text-[#6B6661] dark:text-[#9E9689] mt-1">Direct voice connection with our senior agricultural specialists.</p>
        </div>
        <div class="space-y-2 pt-2">
          <a href="tel:+918888681136" class="text-lg font-mono font-bold text-emerald-800 dark:text-emerald-400 hover:underline block">
            +91 88886 81136
          </a>
          <p class="text-xs text-[#575049] dark:text-[#A89F91]">Primary Voice &amp; WhatsApp</p>
        </div>
      </div>

      <div class="pt-4 border-t border-[#F0ECE1] dark:border-[#282420]">
        <a
          href={buildWhatsAppUrl({ leadSource: 'contact_page_hotline', customMessage: 'Hello Berryboyzz, I want to inquire about commercial berry farming.' })}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
        >
          <MessageCircle class="w-4 h-4" />
          <span>Launch WhatsApp Desk</span>
        </a>
      </div>
    </div>

    <!-- Card 2: Email & Institutional Correspondence -->
    <div class="estate-card rounded-3xl p-8 space-y-6 flex flex-col justify-between">
      <div class="space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
          <Mail class="w-6 h-6" />
        </div>
        <div>
          <h2 class="font-serif text-xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">Written Inquiries &amp; Tenders</h2>
          <p class="text-xs text-[#6B6661] dark:text-[#9E9689] mt-1">Detailed project proposals, soil reports, and off-take contracts.</p>
        </div>
        <div class="space-y-3 pt-2 text-xs">
          <div>
            <span class="text-[#6B6661] dark:text-[#9E9689] block font-semibold">General &amp; Agronomy:</span>
            <a href="mailto:agro@berryboyzz.com" class="font-mono text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:underline">
              agro@berryboyzz.com
            </a>
          </div>
          <div>
            <span class="text-[#6B6661] dark:text-[#9E9689] block font-semibold">Data Privacy &amp; Legal:</span>
            <a href="mailto:privacy@berryboyzz.com" class="font-mono text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:underline">
              privacy@berryboyzz.com
            </a>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-[#F0ECE1] dark:border-[#282420] text-[11px] text-[#6B6661] dark:text-[#9E9689]">
        Typical response turnaround: &lt; 4 business hours.
      </div>
    </div>

    <!-- Card 3: Research Estate & Logistics -->
    <div class="estate-card rounded-3xl p-8 space-y-6 flex flex-col justify-between">
      <div class="space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
          <MapPin class="w-6 h-6" />
        </div>
        <div>
          <h2 class="font-serif text-xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">Estates &amp; Facilities</h2>
          <p class="text-xs text-[#6B6661] dark:text-[#9E9689] mt-1">Field operations across the Western Ghats horticultural belt.</p>
        </div>
        <div class="space-y-3 pt-2 text-xs text-[#4A4643] dark:text-[#D4CEBF]">
          <div>
            <strong class="block text-[#1A1615] dark:text-[#FAF9F6]">Primary Research &amp; Commercial Estate:</strong>
            <p>Satara-Mahabaleshwar CEA Corridor, Satara, Maharashtra 415001, India.</p>
          </div>
          <div>
            <strong class="block text-[#1A1615] dark:text-[#FAF9F6]">Corporate &amp; Dispatch Coordination:</strong>
            <p>Agronomy Center, Pune, Maharashtra 411001, India.</p>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-[#F0ECE1] dark:border-[#282420] flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
        <Clock class="w-4 h-4" />
        <span>Mon–Sat: 08:00 – 18:00 IST</span>
      </div>
    </div>
  </div>

  <!-- Visiting & Farm Protocol Guidelines -->
  <section class="estate-card rounded-3xl p-8 sm:p-10 mb-16 space-y-6">
    <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#FAF9F6]">
      Estate Visiting Protocols &amp; Biosafety Guidelines
    </h2>
    <p class="text-sm text-[#4A4643] dark:text-[#D4CEBF] leading-relaxed">
      To protect our certified tissue-culture mother stock and precision substrate systems against pest vector introduction (such as <em>Frankliniella occidentalis</em> thrips and powdery mildew spores), visits to the Satara research estate are strictly scheduled by prior appointment.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#4A4643] dark:text-[#D4CEBF]">
      <div class="flex items-start gap-3">
        <CheckCircle2 class="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
        <span>Pre-booking mandatory minimum 48 hours prior to arrival via our Tour Desk or WhatsApp.</span>
      </div>
      <div class="flex items-start gap-3">
        <CheckCircle2 class="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
        <span>Footwear sanitation bath and protective shoe coverings provided at the biosecurity airlock.</span>
      </div>
      <div class="flex items-start gap-3">
        <CheckCircle2 class="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
        <span>Guided inspections led by a qualified horticultural engineer explaining fertigation and canopy physics.</span>
      </div>
      <div class="flex items-start gap-3">
        <CheckCircle2 class="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
        <span>Complimentary sensory fruit tasting and Brix measurement demonstration during active harvest months.</span>
      </div>
    </div>

    <div class="pt-4">
      <a
        href="/tours/"
        class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 hover:underline"
      >
        <span>Explore All 5 Farm Tour &amp; Masterclass Formats</span>
        <span>&rarr;</span>
      </a>
    </div>
  </section>
</div>
