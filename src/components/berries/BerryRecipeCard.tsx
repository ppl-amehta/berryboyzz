import React from 'react';
import { Utensils, Clock, Sparkles } from 'lucide-react';
import { BerryVariety } from '../../types/berry';

interface BerryRecipeCardProps {
  berry: BerryVariety;
}

export const BerryRecipeCard: React.FC<BerryRecipeCardProps> = ({ berry }) => {
  const { chefRecipePairing } = berry.tastingNotes;

  return (
    <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              Gourmet Taster Recipe
            </span>
            <h4 className="text-sm font-semibold text-white">{chefRecipePairing.dishName}</h4>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span>{chefRecipePairing.prepTime}</span>
        </div>
      </div>

      <p className="text-xs text-zinc-300 leading-relaxed font-light">
        {chefRecipePairing.description}
      </p>

      <div>
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
          Curated Ingredients:
        </span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300">
          {chefRecipePairing.ingredients.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
