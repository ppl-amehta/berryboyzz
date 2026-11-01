import React from 'react';
import { Clock, CheckCircle2, ArrowRight, TrendingDown } from 'lucide-react';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const ScarcityBanner: React.FC = () => {
  return (
    <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-[#171424] dark:via-[#10121C] dark:to-[#171424] border border-rose-200 dark:border-rose-500/30 shadow-xl space-y-6 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 font-semibold">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>Cohort 04 · Pre-Monsoon Planting Season</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white">
              Commercial Acreage Allotments:{' '}
              <span className="text-rose-600 dark:text-rose-400 font-mono">3 of 12 Parcels Remaining</span>
            </h3>

            <p className="text-xs md:text-sm text-stone-600 dark:text-zinc-300 font-light leading-relaxed">
              To guarantee dedicated agronomist audit schedules and seamless cold-chain transport to Mumbai and Pune,
              we strictly limit onboarding to 12 commercial acreage parcels per planting cycle.
            </p>
          </div>

          {/* Loss Aversion Opportunity Cost Box */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-black/40 border border-stone-200 dark:border-zinc-800 space-y-2 min-w-[280px]">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-zinc-400 font-semibold">
              <TrendingDown className="w-4 h-4 text-amber-500" />
              <span>OPPORTUNITY COST COMPARISON:</span>
            </div>
            <div className="text-xl font-bold font-mono text-stone-900 dark:text-white">
              ₹1,54,000 <span className="text-xs text-stone-500 dark:text-zinc-400 font-normal">/ acre / month</span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-zinc-400 leading-normal">
              Estimated unrealized harvest revenue on uncultivated land vs precision Primocane greenhouse cultivation.
            </p>
          </div>
        </div>

        {/* Live Cohort Commitments Ticker */}
        <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-stone-600 dark:text-zinc-400">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Parcel 08 (Wai Foothills · 4.0 Acres):</span>
              <strong className="text-stone-900 dark:text-zinc-200">Locked</strong>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Parcel 09 (Shirwal Corridor · 2.5 Acres):</span>
              <strong className="text-stone-900 dark:text-zinc-200">Locked</strong>
            </div>
          </div>

          <button
            onClick={() =>
              openWhatsAppLead({
                leadSource: 'syndicate_tier',
                customMessage: 'Requesting allocation audit & reservation for Cohort 04 planting window',
              })
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-950/20 transition-all ml-auto"
          >
            <span>Reserve Remaining Acreage via WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
