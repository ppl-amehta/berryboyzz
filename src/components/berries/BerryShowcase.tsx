import React, { useState } from 'react';
import { ArrowRight, Sparkles, MessageCircle, Sprout } from 'lucide-react';
import { BERRIES_DATA } from '../../data/berriesData';
import { BerryVariety } from '../../types/berry';
import { BerryDetailModal } from './BerryDetailModal';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const BerryShowcase: React.FC = () => {
  const [selectedBerry, setSelectedBerry] = useState<BerryVariety | null>(null);

  return (
    <section id="berries-portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      {/* Section Header with friendly language */}
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The 5 Flagship Berry Varieties</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          Grown for Unrivaled Sweetness, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-sky-600 dark:from-rose-400 dark:via-purple-400 dark:to-sky-400">
            Natural Aroma &amp; Firm Juiciness.
          </span>
        </h2>
        <p className="text-stone-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          Tested and perfected over multiple growing seasons in the Sahyadri foothills. 
          Each variety represents clean, high-yielding European genetics cultivated in soil-free climate greenhouses.
        </p>
      </div>

      {/* 5-Berry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BERRIES_DATA.map((berry) => {
          return (
            <div
              key={berry.id}
              className="group relative flex flex-col justify-between p-7 rounded-3xl glass-panel hover:glass-panel-glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-5">
                {/* Top Badge & Botanical classification */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-stone-500 dark:text-zinc-400 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors">
                    {berry.botanicalName}
                  </span>
                  <div className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-stone-700 dark:text-zinc-300 font-semibold">
                    {berry.tastingNotes.brix}° Brix Sweet
                  </div>
                </div>

                {/* Berry Title & Tagline */}
                <div>
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-200 transition-colors">
                    {berry.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1 line-clamp-2 font-light leading-relaxed">
                    {berry.tagline}
                  </p>
                </div>

                {/* Quick Commercial Specs */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-stone-50/80 dark:bg-zinc-900/60 border border-stone-200/80 dark:border-zinc-800">
                    <span className="text-stone-400 dark:text-zinc-500 block text-[10px] font-semibold">YEARLY YIELD</span>
                    <strong className="text-stone-800 dark:text-zinc-200">{(berry.yieldPerPlantGrams / 1000).toFixed(1)} kg / plant</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50/80 dark:bg-zinc-900/60 border border-stone-200/80 dark:border-zinc-800">
                    <span className="text-stone-400 dark:text-zinc-500 block text-[10px] font-semibold">FRESH PUNNET</span>
                    <strong className="text-rose-600 dark:text-rose-400">₹{berry.punnetWholesalePriceINR} / 125g</strong>
                  </div>
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <div className="pt-6 mt-6 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedBerry(berry)}
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 group-hover:translate-x-1 transition-all"
                >
                  <span>View Farm Dossier &amp; Care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() =>
                    openWhatsAppLead({
                      leadSource: 'berry_modal',
                      berryName: berry.name,
                      customMessage: `I am interested in fresh punnet supply / commercial cultivation of ${berry.name}`,
                    })
                  }
                  className="p-2.5 rounded-xl bg-stone-100 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-600/30 text-stone-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-300 border border-stone-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all"
                  title="Direct WhatsApp Query"
                  aria-label="Direct WhatsApp Query"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Drilldown */}
      <BerryDetailModal berry={selectedBerry} onClose={() => setSelectedBerry(null)} />
    </section>
  );
};
