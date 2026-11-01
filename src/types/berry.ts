export interface BerryVariety {
  id: string;
  name: string;
  botanicalName: string;
  genetics: string; // e.g. "Primocane imported tissue-culture clones (F1)"
  colorTheme: {
    primary: string;
    glow: string;
    border: string;
    bg: string;
    accent: string;
  };
  tagline: string;
  description: string;
  
  // Agronomics & Care
  commercialDensity: string; // e.g. "3,800 plants / acre"
  spacing: string; // e.g. "1.5m row × 0.45m plant"
  substrate: string; // e.g. "Coco-peat + perlite (70:30) buffered at pH 5.8"
  idealClimate: {
    temperatureRange: string;
    chillingHours: string;
    rhRange: string;
    ph: string;
    ecTarget: string;
  };
  dailyCareProtocol: string[];

  // Commercial Yield & Financials
  harvestCycleDays: string; // e.g. "90 days post-transplant, 22-week flush"
  yieldPerPlantGrams: number; // e.g. 1800g / plant / year
  flushesPerYear: number;
  punnetWholesalePriceINR: number; // Wholesale B2B 125g punnet price
  punnetRetailPriceINR: number; // D2C 125g fresh punnet price
  b2bSupplyChannels: string[]; // e.g. ["5-Star HORECA", "Modern Trade / Nature's Basket", "Direct Cold-Chain Air Cargo"]

  // 1000+ Plant Setup
  thousandPlantSetupCapex: number; // INR
  thousandPlantAnnualGrossRevenue: number; // INR

  // Gastronomy & Pairing
  tastingNotes: {
    brix: number; // Sweetness index
    acidity: string;
    aromaProfile: string[];
    chefRecipePairing: {
      dishName: string;
      prepTime: string;
      description: string;
      ingredients: string[];
    };
  };

  livePlantAvailable: boolean;
  livePlantPriceINR: number;
}
