import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const ScarcityBanner: React.FC = () => {
  return (
    <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-[#171424] via-[#10121C] to-[#171424] border border-rose-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>Cohort 04 · Pre-Monsoon Planting Window</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              Commercial Acreage Allotments:{' '}
              <span className="text-rose-400 font-mono">3 of 12 Remaining</span>
            </h3>

            <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              To guarantee zero-chemical residue cold-chain logistics and full dedicated agronomist audit schedules,
              Berryboyzz limits onboarding to 12 commercial cultivation acreage parcels per agricultural planting cycle across Pune & Satara.
            </p>
          </div>

          {/* Loss Aversion Opportunity Cost Box */}
          <div className="p-5 rounded-2xl bg-black/40 border border-zinc-800 space-y-2 min-w-[280px]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <TrendingDown className="w-4 h-4 text-amber-400" />
              <span>OPPORTUNITY COST SENSITIVITY:</span>
            </div>
            <div className="text-xl font-bold font-mono text-white">
              ₹1,54,000 <span className="text-xs text-zinc-400 font-normal">/ acre / month</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Estimated unrealized CEA yield delta on uncultivated fallow land vs high-density Primocane tissue-culture production.
            </p>
          </div>
        </div>

        {/* Live Cohort Commitments Ticker */}
        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-zinc-400">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Parcel 08 (Wai Plateau · 4.0 Acres):</span>
              <strong className="text-zinc-200">Locked</strong>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Parcel 09 (Shirwal Corridor · 2.5 Acres):</span>
              <strong className="text-zinc-200">Locked</strong>
            </div>
          </div>

          <button
            onClick={() =>
              openWhatsAppLead({
                leadSource: 'syndicate_tier',
                customMessage: 'Requesting allocation audit & reservation for Cohort 04 planting window',
              })
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950/50 transition-all ml-auto"
          >
            <span>Reserve Remaining Acreage via WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
