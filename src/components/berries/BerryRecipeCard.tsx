import React from 'react';
import { Utensils, Clock } from 'lucide-react';
import { BerryVariety } from '../../types/berry';

interface BerryRecipeCardProps {
  berry: BerryVariety;
}

export const BerryRecipeCard: React.FC<BerryRecipeCardProps> = ({ berry }) => {
  const { chefRecipePairing } = berry.tastingNotes;

  return (
    <div className="p-6 rounded-2xl bg-stone-50/90 dark:bg-zinc-950/60 border border-stone-200 dark:border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono text-stone-500 dark:text-zinc-400 uppercase tracking-wider block">
              Gourmet Chef Pairing Recipe
            </span>
            <h4 className="text-base font-bold text-stone-900 dark:text-white">{chefRecipePairing.dishName}</h4>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-stone-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-stone-200 dark:border-zinc-800 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-rose-500" />
          <span>{chefRecipePairing.prepTime}</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 leading-relaxed font-light">
        {chefRecipePairing.description}
      </p>

      <div>
        <span className="text-[11px] font-mono text-stone-500 dark:text-zinc-400 uppercase tracking-wider block mb-2 font-semibold">
          Curated Ingredients:
        </span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-zinc-300">
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
