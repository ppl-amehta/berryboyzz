import React, { useState } from 'react';
import { Layers, CheckCircle2, MessageCircle } from 'lucide-react';
import { COMMERCIAL_MODELS } from '../../data/commercialModels';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const CEAInfrastructure: React.FC = () => {
  const [activeModelId, setActiveModelId] = useState<string>(COMMERCIAL_MODELS[0].id);

  const activeModel = COMMERCIAL_MODELS.find((m) => m.id === activeModelId) || COMMERCIAL_MODELS[0];

  return (
    <section id="commercial-models" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 font-semibold">
          <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Commercial Farm Engineering · Pune & Satara</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          Precision Greenhouse Models <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
            Engineered for Maximum Harvest per Acre.
          </span>
        </h2>
        <p className="text-stone-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          From cost-effective polytunnels in the Satara terraces to high-yield polyhouses and substrate grow bags,
          we build and run turnkey farms calibrated to your land's topography and water source.
        </p>
      </div>

      {/* Interactive Model Selector Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 no-scrollbar">
        {COMMERCIAL_MODELS.map((model) => {
          const isActive = model.id === activeModelId;
          return (
            <button
              key={model.id}
              onClick={() => setActiveModelId(model.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/20 font-semibold'
                  : 'bg-stone-100 dark:bg-zinc-900/60 text-stone-700 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-200 border border-stone-200 dark:border-zinc-800 hover:bg-stone-200/70'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-stone-400 dark:bg-zinc-600'}`} />
              <span>{model.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Model Deep Dive Showcase Card */}
      <div className="mt-8 p-8 md:p-10 rounded-3xl glass-panel border border-emerald-500/25 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-zinc-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
              {activeModel.subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white">
              {activeModel.name}
            </h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 font-light">
              Best suited for: <span className="font-medium text-stone-800 dark:text-zinc-200">{activeModel.idealFor}</span>
            </p>
          </div>

          <button
            onClick={() =>
              openWhatsAppLead({
                leadSource: 'syndicate_tier',
                customMessage: `Inquiring regarding setup feasibility for ${activeModel.name} (Estimated Capex: ₹${(activeModel.capexPerAcreINR / 100000).toFixed(1)}L/Acre)`,
              })
            }
            className="self-start md:self-auto px-6 py-3 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/20 transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Feasibility WhatsApp Review</span>
          </button>
        </div>

        {/* 4 Financial & Engineering Benchmarks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
            <span className="text-stone-500 dark:text-zinc-400 block text-[11px] mb-1">Turnkey Setup / Acre</span>
            <strong className="text-base text-stone-900 dark:text-white">₹{(activeModel.capexPerAcreINR / 100000).toFixed(1)} Lakhs</strong>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
            <span className="text-stone-500 dark:text-zinc-400 block text-[11px] mb-1">Target Annual Yield</span>
            <strong className="text-base text-emerald-600 dark:text-emerald-400">{activeModel.expectedAnnualYieldKg.toLocaleString('en-IN')} kg / Acre</strong>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
            <span className="text-stone-500 dark:text-zinc-400 block text-[11px] mb-1">Target Project IRR</span>
            <strong className="text-base text-teal-600 dark:text-teal-300">{activeModel.irrPercentage}% Annualized</strong>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
            <span className="text-stone-500 dark:text-zinc-400 block text-[11px] mb-1">Breakeven Horizon</span>
            <strong className="text-base text-amber-600 dark:text-amber-400">{activeModel.breakevenMonths} Months</strong>
          </div>
        </div>

        {/* System Specifications Blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider font-mono">
              Structural &amp; Irrigation Specifications
            </h4>
            <div className="space-y-2 text-xs font-mono text-stone-700 dark:text-zinc-300">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-black/40 border border-stone-200 dark:border-zinc-800">
                <span className="text-stone-500 dark:text-zinc-500 block text-[10px] font-semibold">STRUCTURE &amp; FILM:</span>
                <span className="text-stone-800 dark:text-zinc-200">{activeModel.systemSpecs.structure}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-black/40 border border-stone-200 dark:border-zinc-800">
                <span className="text-stone-500 dark:text-zinc-500 block text-[10px] font-semibold">TEMPERATURE &amp; VENTILATION:</span>
                <span className="text-stone-800 dark:text-zinc-200">{activeModel.systemSpecs.climateControl}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-black/40 border border-stone-200 dark:border-zinc-800">
                <span className="text-stone-500 dark:text-zinc-500 block text-[10px] font-semibold">AUTOMATED DRIP DOSING:</span>
                <span className="text-stone-800 dark:text-zinc-200">{activeModel.systemSpecs.irrigation}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider font-mono">
              Key Grower Advantages
            </h4>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-zinc-300">
              {activeModel.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-stone-50 dark:bg-black/40 border border-stone-200 dark:border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
