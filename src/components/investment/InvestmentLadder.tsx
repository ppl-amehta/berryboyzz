import React from 'react';
import { TrendingUp, CheckCircle2, MessageCircle } from 'lucide-react';
import { INVESTMENT_TIERS } from '../../data/commercialModels';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const InvestmentLadder: React.FC = () => {
  return (
    <section id="investment-ladder" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-purple-500/10 border border-purple-500/25 text-purple-700 dark:text-purple-400 font-semibold">
          <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>How to Start Your Berry Journey · 4 Entry Tiers</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          From Balcony Proof-of-Concept to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 dark:from-purple-400 dark:via-rose-300 dark:to-amber-300">
            ₹40,000,000 Institutional Syndicates.
          </span>
        </h2>
        <p className="text-stone-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          Whether you want to test 5 plants on your private terrace, launch your first commercial 1,000-plant greenhouse unit,
          or transform 50 acres of agricultural land with complete turnkey management, we have a clear on-ramp.
        </p>
      </div>

      {/* 4-Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INVESTMENT_TIERS.map((tier) => {
          const isInstitutional = tier.id === 'tier-4-your-land-our-farm';

          return (
            <div
              key={tier.id}
              className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-8 transition-all ${
                isInstitutional
                  ? 'bg-gradient-to-br from-stone-900 via-stone-950 to-zinc-950 text-white border-2 border-rose-500/50 shadow-2xl relative overflow-hidden'
                  : 'glass-panel hover:border-stone-300 dark:hover:border-zinc-700'
              }`}
            >
              {isInstitutional && (
                <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-rose-600 to-purple-600 text-white text-[10px] font-mono tracking-widest uppercase font-bold">
                  FLAGSHIP 50-ACRE CORRIDOR
                </div>
              )}

              <div className="space-y-6">
                {/* Badge & Capital Amount */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-wider text-rose-600 dark:text-rose-400 uppercase font-semibold">
                    {tier.badge}
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-extrabold ${isInstitutional ? 'text-white' : 'text-stone-900 dark:text-white'}`}>
                    {tier.name}
                  </h3>
                  <div className={`text-3xl md:text-4xl font-extrabold font-mono pt-1 ${isInstitutional ? 'text-amber-300' : 'text-stone-900 dark:text-zinc-100'}`}>
                    {tier.capitalRequired}
                  </div>
                </div>

                <p className={`text-sm font-light leading-relaxed ${isInstitutional ? 'text-zinc-300' : 'text-stone-600 dark:text-zinc-300'}`}>
                  {tier.tagline}
                </p>

                {/* Financial Model Callout */}
                <div className={`p-4 rounded-2xl space-y-2 text-xs font-mono border ${
                  isInstitutional ? 'bg-black/50 border-zinc-800 text-zinc-300' : 'bg-stone-50 dark:bg-black/40 border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300'
                }`}>
                  <div className="flex justify-between">
                    <span className="text-stone-500 dark:text-zinc-500">PAYBACK TIMELINE:</span>
                    <span className="font-semibold">{tier.financialModel.turnaround}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 dark:text-zinc-500">PROJECTED RETURN:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{tier.financialModel.yieldReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 dark:text-zinc-500">PAYOUT CYCLE:</span>
                    <span>{tier.financialModel.payoutCycle}</span>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className={`space-y-2.5 text-xs ${isInstitutional ? 'text-zinc-300' : 'text-stone-700 dark:text-zinc-300'}`}>
                  <span className="text-[10px] font-mono text-stone-500 dark:text-zinc-500 uppercase tracking-wider block font-semibold">
                    What is Included:
                  </span>
                  {tier.deliverables.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                <button
                  onClick={() =>
                    openWhatsAppLead({
                      leadSource: 'syndicate_tier',
                      leadCode: tier.whatsappLeadCode,
                      customMessage: `I am requesting the prospectus and commercial terms for: ${tier.name} (${tier.capitalRequired})`,
                    })
                  }
                  className={`w-full py-3.5 px-6 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    isInstitutional
                      ? 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white shadow-lg'
                      : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-stone-700'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Syndicate Prospectus via WhatsApp</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
