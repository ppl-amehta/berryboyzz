import React from 'react';
import { MessageCircle, Globe, Server, MapPin } from 'lucide-react';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-stone-100 dark:bg-[#06080B] border-t border-stone-200 dark:border-zinc-800/80 pt-20 pb-16 px-6 md:px-12 relative z-20 text-xs font-mono text-stone-600 dark:text-zinc-400 transition-colors">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Domain (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                BB
              </div>
              <span className="text-base font-extrabold text-stone-900 dark:text-white uppercase tracking-wider font-mono">
                BERRYBOYZZ™
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-zinc-400 font-light max-w-sm leading-relaxed">
              Precision controlled-environment berry agriculture and commercial farm syndication.
              Operated across Maharashtra’s premier micro-climate valleys in Pune and Satara.
            </p>

            <div className="space-y-1.5 text-[11px] text-stone-500 dark:text-zinc-400 pt-2">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-rose-500" />
                <span>Primary Domains: <strong className="text-stone-900 dark:text-zinc-200">Berryboyzz.in</strong> &amp; <strong className="text-stone-900 dark:text-zinc-200">Berryboyzz.com</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Hosting Infrastructure: High-Availability Edge Cluster (5-Year Continuous SLA)</span>
              </div>
            </div>
          </div>

          {/* Col 2: The 5 Berries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
              Flagship Berries
            </h4>
            <ul className="space-y-2 text-stone-600 dark:text-zinc-400">
              <li><a href="#berries-portfolio" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Primocane Raspberry</a></li>
              <li><a href="#berries-portfolio" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Jumbo Blackberry</a></li>
              <li><a href="#berries-portfolio" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Himalayan Long Mulberry</a></li>
              <li><a href="#berries-portfolio" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Tabletop Strawberry</a></li>
              <li><a href="#berries-portfolio" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Southern Highbush Blueberry</a></li>
            </ul>
          </div>

          {/* Col 3: Agro-Systems */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
              Greenhouse Models
            </h4>
            <ul className="space-y-2 text-stone-600 dark:text-zinc-400">
              <li><a href="#commercial-models" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">NVPH Polyhouse Model</a></li>
              <li><a href="#commercial-models" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Walk-in Polytunnel System</a></li>
              <li><a href="#commercial-models" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Substrate Grow-Bags</a></li>
              <li><a href="#commercial-models" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Automated IoT Facilities</a></li>
              <li><a href="#biological-os" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Bacto-Slurry Rhizosphere</a></li>
            </ul>
          </div>

          {/* Col 4: Locations & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
              Farm Hubs
            </h4>
            <div className="space-y-2 text-[11px] text-stone-600 dark:text-zinc-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>Satara Hub: Wai-Panchgani Foothills, Maharashtra</span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>Pune Hub: Khed-Shivapur Agricultural Corridor</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openWhatsAppLead({ leadSource: 'hero' })}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>+91 98221 88800 (WhatsApp)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Institutional Compliance Disclaimer */}
        <div className="pt-8 border-t border-stone-200 dark:border-zinc-900 text-[10px] text-stone-500 dark:text-zinc-500 space-y-2 leading-relaxed">
          <p>
            Regulatory Note: Agricultural yields, EBITDA, and breakeven timelines cited are derived from audited controlled-environment trials in Pune and Satara. Agricultural operations are subject to seasonal climate shifts, water quality, and adherence to prescribed fertigation SOPs. National Horticulture Board (NHB) subsidies are subject to State government evaluation and project DPR approval.
          </p>
          <div className="flex flex-wrap justify-between items-center gap-4 text-stone-500 dark:text-zinc-500 pt-2">
            <span>© {new Date().getFullYear()} Berryboyzz™ Enterprise. All rights reserved.</span>
            <span>Domains: Berryboyzz.in · Berryboyzz.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
