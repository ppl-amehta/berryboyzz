import React from 'react';
import { X, MessageCircle, Sprout, TrendingUp, Sun, Droplets, CheckCircle2 } from 'lucide-react';
import { BerryVariety } from '../../types/berry';
import { BerryRecipeCard } from './BerryRecipeCard';
import { openWhatsAppLead } from '../../utils/whatsapp';

interface BerryDetailModalProps {
  berry: BerryVariety | null;
  onClose: () => void;
}

export const BerryDetailModal: React.FC<BerryDetailModalProps> = ({ berry, onClose }) => {
  if (!berry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 dark:bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0E1118] border border-stone-200 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-6 md:p-8 space-y-8 text-stone-900 dark:text-zinc-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Block */}
        <div className="space-y-3 pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 font-semibold">
            <span>{berry.botanicalName}</span>
            <span>·</span>
            <span>{berry.genetics}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {berry.name}
          </h3>
          <p className="text-base text-stone-600 dark:text-zinc-300 font-light leading-relaxed">
            {berry.description}
          </p>
        </div>

        {/* 4 Key Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
            <span className="text-[11px] text-stone-500 dark:text-zinc-400 uppercase block font-semibold">Yield / Plant / Yr</span>
            <span className="text-lg font-bold text-stone-900 dark:text-white">{(berry.yieldPerPlantGrams / 1000).toFixed(2)} kg</span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
            <span className="text-[11px] text-stone-500 dark:text-zinc-400 uppercase block font-semibold">Wholesale Punnet</span>
            <span className="text-lg font-bold text-rose-600 dark:text-rose-400">₹{berry.punnetWholesalePriceINR} / 125g</span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
            <span className="text-[11px] text-stone-500 dark:text-zinc-400 uppercase block font-semibold">Sweetness</span>
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{berry.tastingNotes.brix}° Brix</span>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
            <span className="text-[11px] text-stone-500 dark:text-zinc-400 uppercase block font-semibold">Yearly Flushes</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{berry.flushesPerYear} Harvests</span>
          </div>
        </div>

        {/* Commercial Setup: 1,000+ Plants Model */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50/60 via-stone-50 to-white dark:from-rose-950/20 dark:via-zinc-900/50 dark:to-zinc-900/80 border border-rose-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h4 className="text-base font-bold text-stone-900 dark:text-white">
                1,000+ Commercial Plant Setup Economics
              </h4>
            </div>
            <span className="text-xs font-mono text-stone-500 dark:text-zinc-400">Pune / Satara Corridor Standard</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-white dark:bg-black/40 border border-stone-200 dark:border-zinc-800 shadow-sm">
              <span className="text-stone-500 dark:text-zinc-400 block mb-1">Turnkey Setup Capex:</span>
              <strong className="text-base text-stone-900 dark:text-white">₹{berry.thousandPlantSetupCapex.toLocaleString('en-IN')}</strong>
            </div>
            <div className="p-3.5 rounded-lg bg-white dark:bg-black/40 border border-stone-200 dark:border-zinc-800 shadow-sm">
              <span className="text-stone-500 dark:text-zinc-400 block mb-1">Projected Annual Revenue:</span>
              <strong className="text-base text-emerald-600 dark:text-emerald-400">₹{berry.thousandPlantAnnualGrossRevenue.toLocaleString('en-IN')}</strong>
            </div>
            <div className="p-3.5 rounded-lg bg-white dark:bg-black/40 border border-stone-200 dark:border-zinc-800 shadow-sm">
              <span className="text-stone-500 dark:text-zinc-400 block mb-1">Commercial Density:</span>
              <strong className="text-stone-800 dark:text-zinc-200">{berry.commercialDensity}</strong>
            </div>
          </div>
        </div>

        {/* Soil, Climate & Care Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Soil & Climate Requirements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Ideal Climate &amp; Soil Conditions</span>
            </div>
            <div className="space-y-2 text-xs font-mono text-stone-700 dark:text-zinc-300">
              <div className="flex justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-zinc-900/50 border border-stone-200 dark:border-zinc-800/80">
                <span className="text-stone-500 dark:text-zinc-400">Target Root pH:</span>
                <span className="font-semibold text-stone-900 dark:text-white">{berry.idealClimate.ph}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-zinc-900/50 border border-stone-200 dark:border-zinc-800/80">
                <span className="text-stone-500 dark:text-zinc-400">Fertigation Target EC:</span>
                <span className="font-semibold text-stone-900 dark:text-white">{berry.idealClimate.ecTarget}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-zinc-900/50 border border-stone-200 dark:border-zinc-800/80">
                <span className="text-stone-500 dark:text-zinc-400">Ideal Temperature:</span>
                <span className="font-semibold text-stone-900 dark:text-white">{berry.idealClimate.temperatureRange}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-zinc-900/50 border border-stone-200 dark:border-zinc-800/80">
                <span className="text-stone-500 dark:text-zinc-400">Winter Chilling Need:</span>
                <span className="font-semibold text-stone-900 dark:text-white">{berry.idealClimate.chillingHours}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-zinc-900/50 border border-stone-200 dark:border-zinc-800/80">
                <span className="text-stone-500 dark:text-zinc-400">Substrate Mix:</span>
                <span className="font-medium text-stone-800 dark:text-zinc-300 truncate max-w-[200px]" title={berry.substrate}>{berry.substrate}</span>
              </div>
            </div>
          </div>

          {/* Daily Agronomic Care Protocol */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
              <Droplets className="w-4 h-4 text-sky-500" />
              <span>Standard Daily Care Protocols</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-zinc-300">
              {berry.dailyCareProtocol.map((protocol, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-stone-50 dark:bg-zinc-900/40 border border-stone-200 dark:border-zinc-800/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{protocol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chef Recipe Card */}
        <BerryRecipeCard berry={berry} />

        {/* Action Buttons: D2C WhatsApp & Live Plant Order */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            {berry.livePlantAvailable && (
              <button
                onClick={() =>
                  openWhatsAppLead({
                    leadSource: 'berry_modal',
                    berryName: berry.name,
                    customMessage: `I want to order live tissue-culture plants of ${berry.name} (₹${berry.livePlantPriceINR}/plant)`,
                  })
                }
                className="px-4 py-2.5 rounded-xl font-medium text-xs text-stone-800 dark:text-zinc-200 bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-600 transition-colors flex items-center gap-2"
              >
                <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Order Live Plants (₹{berry.livePlantPriceINR})</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() =>
                openWhatsAppLead({
                  leadSource: 'berry_modal',
                  berryName: berry.name,
                  customMessage: `Inquiring for commercial cultivation & 1000+ plant setup of ${berry.name}`,
                })
              }
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Consult for {berry.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
