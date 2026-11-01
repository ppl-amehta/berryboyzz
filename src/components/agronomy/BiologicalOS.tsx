import React from 'react';
import { ShieldCheck, Cpu, Droplets, Users, Truck, Handshake, CheckCircle2 } from 'lucide-react';
import { BIOLOGICAL_OS_PILLARS } from '../../data/commercialModels';

const ICONS = [ShieldCheck, Droplets, Cpu, Users, Truck, Handshake];

export const BiologicalOS: React.FC = () => {
  return (
    <section id="biological-os" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-sky-500/10 border border-sky-500/30 text-sky-400">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          <span>The 6-Stage Biological Operating System</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          How Our System Works <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
            To Guarantee Predictable Commercial Yield.
          </span>
        </h2>
        <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          Traditional farming gambles on monsoon luck and volatile local mandis. The Berryboyzz OS converts
          berry cultivation into a deterministic biological manufacturing pipeline with guaranteed cold-chain off-take.
        </p>
      </div>

      {/* 6-Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BIOLOGICAL_OS_PILLARS.map((pillar, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          return (
            <div
              key={pillar.step}
              className="p-7 rounded-3xl glass-panel hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Step badge & Code */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                    {pillar.code}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-sky-400 uppercase tracking-widest">
                    Pillar 0{pillar.step}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {pillar.summary}
                </p>

                {/* Scientific Protocol callout */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] text-zinc-400 font-mono leading-relaxed">
                  <span className="text-sky-300 font-semibold block mb-1">SCIENTIFIC MECHANISM:</span>
                  {pillar.scientificMechanism}
                </div>
              </div>

              {/* Deliverables list */}
              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Mandated Deliverables:
                </span>
                {pillar.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}

                <div className="pt-2 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>AUDIT FREQUENCY:</span>
                  <span className="text-zinc-200">{pillar.auditFrequency}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
