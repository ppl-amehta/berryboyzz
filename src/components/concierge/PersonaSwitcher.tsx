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
    { id: 'grower', label: 'Grower', icon: Sprout, desc: 'EC/pH, Genetics & CEA' },
    { id: 'gourmet', label: 'Gourmet', icon: Heart, desc: 'Brix, Punnets & Tours' },
  ];

  return (
    <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
      {personas.map((p) => {
        const Icon = p.icon;
        const isActive = currentPersona === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelectPersona(p.id)}
            className={`flex flex-col items-center py-2 px-1 rounded-xl text-center transition-all ${
              isActive
                ? 'bg-rose-500/20 text-white border border-rose-500/50 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 mb-1 ${isActive ? 'text-rose-400' : 'text-zinc-500'}`} />
            <span className="text-[11px] font-mono font-semibold uppercase">{p.label}</span>
            <span className="text-[8px] text-zinc-500 leading-tight hidden sm:block">{p.desc}</span>
          </button>
        );
      })}
    </div>
  );
};
