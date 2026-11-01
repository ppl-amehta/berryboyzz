import React from 'react';
import { TrendingUp, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { INVESTMENT_TIERS } from '../../data/commercialModels';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const InvestmentLadder: React.FC = () => {
  return (
    <section id="investment-ladder" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-purple-500/10 border border-purple-500/30 text-purple-400">
          <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
          <span>How to Start Your Berry Journey · 4 Entry Tiers</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          From Balcony Proof-of-Concept to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-rose-300 to-amber-300">
            ₹40,000,000 Institutional Syndicates.
          </span>
        </h2>
        <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          Whether you are testing genetics in your private terrace garden, launching your first commercial 1,000-plant unit,
          or developing a 50-acre agro-asset corridor across Pune and Satara, we provide turnkey execution.
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
                  ? 'bg-gradient-to-br from-zinc-900 via-[#151226] to-zinc-950 border-2 border-rose-500/50 shadow-2xl shadow-rose-950/40 relative overflow-hidden'
                  : 'glass-panel hover:border-zinc-700'
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
                  <span className="text-[11px] font-mono tracking-wider text-rose-400 uppercase font-semibold">
                    {tier.badge}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                    {tier.name}
                  </h3>
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-300 pt-1 font-mono">
                    {tier.capitalRequired}
                  </div>
                </div>

                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {tier.tagline}
                </p>

                {/* Financial Model Callout */}
                <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">PAYBACK SPEED:</span>
                    <span className="text-zinc-200">{tier.financialModel.turnaround}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">PROJECTED RETURN:</span>
                    <span className="text-emerald-400 font-semibold">{tier.financialModel.yieldReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">LIQUIDATION CYCLE:</span>
                    <span className="text-zinc-200">{tier.financialModel.payoutCycle}</span>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2.5 text-xs text-zinc-300">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Turnkey Deliverables:
                  </span>
                  {tier.deliverables.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between gap-4">
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
                      ? 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white shadow-lg shadow-rose-950/60'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
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
