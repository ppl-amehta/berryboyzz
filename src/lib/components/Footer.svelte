<script lang="ts">
  import { Sprout, MessageCircle, MapPin, Phone, Mail, ArrowUpRight } from '@lucide/svelte';
  import { buildWhatsAppUrl } from '$utils/whatsapp';

  const footerWhatsAppUrl = buildWhatsAppUrl({
    leadSource: 'footer_desk',
    customMessage: 'Inquiry from Berryboyzz website footer',
  });
</script>

<footer class="bg-white border-t border-[#E8E4DC] text-[#1A1615] pt-16 pb-12 mt-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E8E4DC]">
      <!-- Brand & Mission -->
      <div class="md:col-span-1 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
            <Sprout class="w-5 h-5" />
          </div>
          <span class="font-serif text-xl font-bold tracking-tight">BERRYBOYZZ</span>
        </div>
        <p class="text-xs text-[#4A4643] leading-relaxed">
          Pioneering controlled-environment precision berry farming across Maharashtra's Pune & Satara agricultural corridors. Certified tissue culture clones, high-density CEA polyhouses, and integrated cold chain off-take partnerships.
        </p>
        <div class="flex items-center gap-2 text-xs text-[#6B6661]">
          <MapPin class="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span>Wai-Panchgani Foothills & Satara Plateau, MH</span>
        </div>
      </div>

      <!-- Quick Nav: Cultivars -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold uppercase tracking-wider text-[#6B6661]">
          Flagship Cultivars
        </h4>
        <ul class="space-y-2 text-xs font-medium text-[#1A1615]">
          <li>
            <a href="/cultivars/raspberry/" class="hover:text-emerald-800 flex items-center justify-between group">
              <span>Primocane Raspberry</span>
              <ArrowUpRight class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
          <li>
            <a href="/cultivars/blackberry/" class="hover:text-emerald-800 flex items-center justify-between group">
              <span>Jumbo Blackberry</span>
              <ArrowUpRight class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
          <li>
            <a href="/cultivars/mulberry/" class="hover:text-emerald-800 flex items-center justify-between group">
              <span>Royal Mulberry (₹80 pack)</span>
              <ArrowUpRight class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
          <li>
            <a href="/cultivars/blueberry/" class="hover:text-emerald-800 flex items-center justify-between group">
              <span>Southern Highbush Blueberry</span>
              <ArrowUpRight class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
          <li>
            <a href="/cultivars/strawberry/" class="hover:text-emerald-800 flex items-center justify-between group">
              <span>Tabletop Hydro Strawberry</span>
              <ArrowUpRight class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        </ul>
      </div>

      <!-- Quick Nav: Commercial Models & Tours -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold uppercase tracking-wider text-[#6B6661]">
          Commercial & Experiential
        </h4>
        <ul class="space-y-2 text-xs font-medium text-[#1A1615]">
          <li><a href="/#commercial-models" class="hover:text-emerald-800">Naturally Ventilated Polyhouse (NPVH)</a></li>
          <li><a href="/#commercial-models" class="hover:text-emerald-800">Medium-Width Polytunnel System</a></li>
          <li><a href="/#commercial-models" class="hover:text-emerald-800">Grow-Bay Hydroponic System</a></li>
          <li><a href="/tours/harvest-visit/" class="hover:text-emerald-800">Gourmet Harvest Tasting (3.5 Hrs)</a></li>
          <li><a href="/tours/study-tour/" class="hover:text-emerald-800">Agronomy Tech Study Tour (6 Hrs)</a></li>
        </ul>
      </div>

      <!-- Direct Contact Desk -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold uppercase tracking-wider text-[#6B6661]">
          Agronomy Inquiry Desk
        </h4>
        <p class="text-xs text-[#4A4643]">
          Connect directly with our senior horticultural team in Satara:
        </p>
        <div class="space-y-2 pt-1 text-xs">
          <a href="tel:+918888681136" class="flex items-center gap-2 text-[#1A1615] font-semibold hover:text-emerald-800">
            <Phone class="w-3.5 h-3.5 text-emerald-800" />
            <span>+91 88886 81136</span>
          </a>
          <a href="mailto:agro@berryboyzz.com" class="flex items-center gap-2 text-[#4A4643] hover:text-[#1A1615]">
            <Mail class="w-3.5 h-3.5 text-[#6B6661]" />
            <span>agro@berryboyzz.com</span>
          </a>
        </div>
        <a
          href={footerWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full mt-2 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-sm cursor-pointer"
        >
          <MessageCircle class="w-4 h-4" />
          <span>WhatsApp Agronomist</span>
        </a>
      </div>
    </div>

    <!-- Legal & Mandatory Disclaimers -->
    <div class="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#6B6661]">
      <div class="space-y-1">
        <p>© 2026 Berryboyzz Agro-Ventures LLP. All rights reserved.</p>
        <p class="text-[#8C867E]">
          * Mandatory Disclosure: Cold chain logistics & SLM charges not included in baseline capex. Projected 16–18 month break-even timelines are modeled upon standard horticultural protocols.
        </p>
      </div>
      <div class="flex items-center gap-4 text-xs font-medium">
        <a href="/#commercial-models" class="hover:underline">Investment Terms</a>
        <a href="/#biological-os" class="hover:underline">Biological OS</a>
        <a href="/tours/" class="hover:underline">Farm Visits</a>
      </div>
    </div>
  </div>
</footer>
