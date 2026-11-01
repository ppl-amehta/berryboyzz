import React, { useState } from 'react';
import { Layers, CheckCircle2, ChevronRight, MessageCircle, Building2, Cpu, Home, Shield } from 'lucide-react';
import { COMMERCIAL_MODELS } from '../../data/commercialModels';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const CEAInfrastructure: React.FC = () => {
  const [activeModelId, setActiveModelId] = useState<string>(COMMERCIAL_MODELS[0].id);

  const activeModel = COMMERCIAL_MODELS.find((m) => m.id === activeModelId) || COMMERCIAL_MODELS[0];

  return (
    <section id="commercial-models" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Commercial Farm Engineering · Pune & Satara</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Precision CEA Architectures <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Engineered for Maximum Kilograms / m².
          </span>
        </h2>
        <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          From naturally ventilated polyhouses in the Wai-Satara valleys to automated substrate grow-bag facilities,
          we deploy turn-key biological assets calibrated to your land's topography and water table.
        </p>
      </div>

      {/* Interactive Model Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {COMMERCIAL_MODELS.map((model) => {
          const isActive = model.id === activeModelId;
          return (
            <button
              key={model.id}
              onClick={() => setActiveModelId(model.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
              <span>{model.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Model Deep Dive Showcase Card */}
      <div className="mt-8 p-8 md:p-10 rounded-3xl glass-panel border border-emerald-500/30 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              {activeModel.subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              {activeModel.name}
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Ideal Application: <span className="text-zinc-200">{activeModel.idealFor}</span>
            </p>
          </div>

          <button
            onClick={() =>
              openWhatsAppLead({
                leadSource: 'syndicate_tier',
                customMessage: `Inquiring regarding setup feasibility for ${activeModel.name} (Estimated Capex: ₹${(activeModel.capexPerAcreINR / 100000).toFixed(1)}L/Acre)`,
              })
            }
            className="self-start md:self-auto px-6 py-3 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Feasibility WhatsApp Review</span>
          </button>
        </div>

        {/* 4 Financial & Engineering Benchmarks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px] mb-1">Turnkey Capex / Acre</span>
            <strong className="text-base text-white">₹{(activeModel.capexPerAcreINR / 100000).toFixed(1)} Lakhs</strong>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px] mb-1">Target Annual Yield</span>
            <strong className="text-base text-emerald-400">{activeModel.expectedAnnualYieldKg.toLocaleString('en-IN')} kg / Acre</strong>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px] mb-1">Target Project IRR</span>
            <strong className="text-base text-teal-300">{activeModel.irrPercentage}% Annualized</strong>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px] mb-1">Breakeven Timeline</span>
            <strong className="text-base text-amber-400">{activeModel.breakevenMonths} Months</strong>
          </div>
        </div>

        {/* System Specifications Blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Structural & Biological Specifications
            </h4>
            <div className="space-y-2 text-xs font-mono text-zinc-300">
              <div className="p-3 rounded-lg bg-black/40 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">FRAME & CLADDING:</span>
                <span className="text-zinc-200">{activeModel.systemSpecs.structure}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">CLIMATE SYSTEM:</span>
                <span className="text-zinc-200">{activeModel.systemSpecs.climateControl}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">IRRIGATION DOSING:</span>
                <span className="text-zinc-200">{activeModel.systemSpecs.irrigation}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Key Engineering Advantages
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300">
              {activeModel.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
