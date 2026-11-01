import React from 'react';
import { ShieldCheck, Cpu, Droplets, Users, Truck, Handshake, CheckCircle2 } from 'lucide-react';
import { BIOLOGICAL_OS_PILLARS } from '../../data/commercialModels';

const ICONS = [ShieldCheck, Droplets, Cpu, Users, Truck, Handshake];

export const BiologicalOS: React.FC = () => {
  return (
    <section id="biological-os" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-sky-500/10 border border-sky-500/25 text-sky-700 dark:text-sky-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>The 6-Stage Biological Operating System</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          How Our System Works <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-300 dark:to-purple-400">
            To Guarantee Predictable, High-Value Harvests.
          </span>
        </h2>
        <p className="text-stone-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          Traditional farming gambles on unpredictable rains and price drops at local markets. 
          Our complete 6-stage system guides you from clean mother plants and biological plant probiotics to scheduled expert visits, cold-chain trucks, and pre-agreed supermarket purchase contracts.
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
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-stone-500 dark:text-zinc-400 px-3 py-1 rounded-full bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800">
                    {pillar.code}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 uppercase tracking-widest font-semibold">
                    Step 0{pillar.step}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 font-light leading-relaxed">
                  {pillar.summary}
                </p>

                {/* Plain-English Scientific Protocol */}
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 text-[11px] text-stone-700 dark:text-zinc-400 font-mono leading-relaxed">
                  <span className="text-sky-600 dark:text-sky-300 font-semibold block mb-1">HOW IT WORKS:</span>
                  {pillar.scientificMechanism}
                </div>
              </div>

              {/* Deliverables list */}
              <div className="pt-4 border-t border-stone-200 dark:border-zinc-800 space-y-2 text-xs text-stone-700 dark:text-zinc-300">
                <span className="text-[10px] font-mono text-stone-500 dark:text-zinc-400 uppercase tracking-wider block font-semibold">
                  What You Receive:
                </span>
                {pillar.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}

                <div className="pt-2 text-[10px] font-mono text-stone-500 dark:text-zinc-400 flex items-center justify-between">
                  <span>AUDIT SCHEDULE:</span>
                  <span className="font-semibold text-stone-800 dark:text-zinc-200">{pillar.auditFrequency}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
