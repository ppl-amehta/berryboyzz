import React from 'react';
import { Briefcase, Sprout, Heart } from 'lucide-react';
import { ConciergePersona } from '../../types/concierge';

interface PersonaSwitcherProps {
  currentPersona: ConciergePersona;
  onSelectPersona: (persona: ConciergePersona) => void;
}

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({ currentPersona, onSelectPersona }) => {
  const personas: { id: ConciergePersona; label: string; icon: typeof Briefcase; desc: string }[] = [
    { id: 'investor', label: 'Investor', icon: Briefcase, desc: 'IRR, Capex & Off-Take' },
    { id: 'grower', label: 'Grower', icon: Sprout, desc: 'Greenhouse & Genetics' },
    { id: 'gourmet', label: 'Gourmet', icon: Heart, desc: 'Brix, Punnets & Tours' },
  ];

  return (
    <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-stone-100 dark:bg-zinc-950/80 border border-stone-200 dark:border-zinc-800">
      {personas.map((p) => {
        const Icon = p.icon;
        const isActive = currentPersona === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelectPersona(p.id)}
            className={`flex flex-col items-center py-2 px-1 rounded-xl text-center transition-all ${
              isActive
                ? 'bg-white dark:bg-rose-500/20 text-stone-900 dark:text-white border border-stone-300 dark:border-rose-500/50 shadow-sm font-semibold'
                : 'text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-200 hover:bg-stone-200/50 dark:hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 mb-1 ${isActive ? 'text-rose-600 dark:text-rose-400' : 'text-stone-400 dark:text-zinc-500'}`} />
            <span className="text-[11px] font-mono font-semibold uppercase">{p.label}</span>
            <span className="text-[8px] text-stone-500 dark:text-zinc-500 leading-tight hidden sm:block">{p.desc}</span>
          </button>
        );
      })}
    </div>
  );
};
