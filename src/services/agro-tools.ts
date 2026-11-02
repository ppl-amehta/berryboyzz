/**
 * Berryboyzz™ Deterministic Agronomy & Financial Calculation Kernel
 * Zero-Hallucination Deterministic Tool Engine for Dr. Berryboy Agro-Expert SLM
 */

export interface ROICalculationResult {
  acres: number;
  polyhouseType: 'nvph' | 'polytunnel' | 'growbay';
  capexGross: number;
  nhbSubsidyAmount: number;
  capexNet: number;
  plantCount: number;
  annualYieldKg: number;
  annualRevenue: number;
  annualOpex: number;
  annualCohortFee: number;
  netAnnualEbitda: number;
  ebitdaMarginPct: number;
  paybackMonths: number;
  offtakeRatePerKg: number;
  disclaimer: string;
}

export interface WaterSoilAnalysisResult {
  tds: number;
  ph: number;
  estimatedEc: number;
  bicarbonateRisk: 'LOW' | 'MODERATE' | 'SEVERE';
  soilRecommendation: string;
  raspberrySuitability: 'OPTIMAL' | 'ACCEPTABLE_WITH_CORRECTION' | 'NOT_RECOMMENDED';
  blueberrySuitability: 'OPTIMAL' | 'ACCEPTABLE_WITH_CORRECTION' | 'NOT_RECOMMENDED';
  waterTreatmentPlan: string[];
  substrateSpec: string;
  fertigationGuidance: string;
}

export interface CultivarSpecResult {
  id: string;
  name: string;
  botanical: string;
  type: string;
  brixRating: string;
  annualYieldPerPlant: string;
  chillHours: string;
  rootzonePh: string;
  irrigationEc: string;
  harvestWindows: string;
  wholesaleRate: string;
  keyFeatures: string;
}

export interface TourReservationResult {
  tourId: string;
  tourTitle: string;
  date: string;
  partySize: number;
  pricePerPerson: number;
  totalPrice: number;
  bookingToken: string;
  location: string;
  timeSlot: string;
  instructions: string;
}

export interface HumanEscalationDossier {
  leadToken: string;
  customerName: string;
  customerPhone: string;
  inquiryArchetype: 'INVESTOR' | 'FARMER' | 'TOURIST' | 'BUYER';
  priorityLevel: 'CRITICAL' | 'HIGH' | 'STANDARD';
  assignedAgronomistPhone: string;
  resolvedContext: string;
  pendingEscalationReason: string;
  suggestedAction: string;
  timestamp: string;
}

export class AgroToolsKernel {
  /**
   * Deterministic Capex / Opex / EBITDA Financial Model
   */
  public static calculateROI(
    acres = 1,
    polyhouseType: 'nvph' | 'polytunnel' | 'growbay' = 'nvph',
    withNhbSubsidy = true
  ): ROICalculationResult {
    const validAcres = Math.max(0.25, Math.min(acres, 100));

    // Base figures per acre
    let capexPerAcre = 4400000; // ₹44L/acre for Naturally Ventilated Polyhouse
    if (polyhouseType === 'polytunnel') {
      capexPerAcre = 3800000; // ₹38L/acre for Polytunnels
    } else if (polyhouseType === 'growbay') {
      capexPerAcre = 3500000; // ₹35L starter bay
    }

    const capexGross = Math.round(validAcres * capexPerAcre);

    // National Horticulture Board (NHB) Capital Subsidy (up to 50%, capped at ₹56L per project)
    const rawSubsidy = withNhbSubsidy ? capexGross * 0.5 : 0;
    const nhbSubsidyAmount = Math.min(rawSubsidy, 5600000);
    const capexNet = capexGross - nhbSubsidyAmount;

    // Agronomic density & harvest metrics (Grade-A Primocane commercial harvest)
    const plantCount = Math.round(validAcres * 4500); // 4,500 canes/acre
    const annualYieldKg = Math.round(validAcres * 12000); // 12,000 kg Grade-A Primocane per acre
    const offtakeRatePerKg = 600; // ₹600/kg contracted institutional off-take
    const annualRevenue = Math.round(annualYieldKg * offtakeRatePerKg); // ₹72.00 Lakhs per acre

    // Operational expenses
    const annualOpex = Math.round(validAcres * 1850000); // ₹18.50L/acre fertigation, power, cold-storage, labor
    const annualCohortFee = Math.round(validAcres * 250000 * 12); // ₹2.5L/acre/mo senior agronomist management
    
    // Net EBITDA (₹53.50 Lakhs/yr per acre ~74% operational margin)
    const netAnnualEbitda = Math.round(annualRevenue - annualOpex);
    const ebitdaMarginPct = Math.round((netAnnualEbitda / annualRevenue) * 100);

    // Payback calculation based on net capex
    const paybackMonths = Math.max(12, Math.round((capexNet / (netAnnualEbitda / 12))));

    return {
      acres: validAcres,
      polyhouseType,
      capexGross,
      nhbSubsidyAmount,
      capexNet,
      plantCount,
      annualYieldKg,
      annualRevenue,
      annualOpex,
      annualCohortFee,
      netAnnualEbitda,
      ebitdaMarginPct,
      paybackMonths,
      offtakeRatePerKg,
      disclaimer: 'Figures represent projected commercial performance under Berryboyzz CEA SOPs. NHB subsidy subject to state horticulture sanction.',
    };
  }

  /**
   * Deterministic Borewell Water & Soil Analysis for Maharashtra
   */
  public static analyzeWaterSoil(
    tds: number,
    ph: number,
    dailyWaterLiters = 10000,
    acres = 1
  ): WaterSoilAnalysisResult {
    // Standard conversion factor for Deccan basalt aquifers: EC = TDS / 640
    const estimatedEc = Number((tds / 640).toFixed(2));

    let bicarbonateRisk: 'LOW' | 'MODERATE' | 'SEVERE' = 'LOW';
    if (tds > 700 || ph > 7.5) {
      bicarbonateRisk = 'SEVERE'; // Typical Baramati/Solapur borewell: 250–350 ppm HCO3
    } else if (tds > 450 || ph > 7.0) {
      bicarbonateRisk = 'MODERATE';
    }

    // Raspberry evaluation
    let raspberrySuitability: 'OPTIMAL' | 'ACCEPTABLE_WITH_CORRECTION' | 'NOT_RECOMMENDED' = 'OPTIMAL';
    if (estimatedEc > 1.8 || ph > 8.0) {
      raspberrySuitability = 'NOT_RECOMMENDED';
    } else if (estimatedEc > 1.0 || ph > 6.8) {
      raspberrySuitability = 'ACCEPTABLE_WITH_CORRECTION';
    }

    // Blueberry evaluation (acid-loving, low salt threshold)
    let blueberrySuitability: 'OPTIMAL' | 'ACCEPTABLE_WITH_CORRECTION' | 'NOT_RECOMMENDED' = 'OPTIMAL';
    if (estimatedEc > 1.0 || ph > 7.0 || bicarbonateRisk === 'SEVERE') {
      blueberrySuitability = 'ACCEPTABLE_WITH_CORRECTION'; // Needs RO blending
    }
    if (estimatedEc > 1.6 || ph > 8.2) {
      blueberrySuitability = 'NOT_RECOMMENDED';
    }

    const waterTreatmentPlan: string[] = [];
    if (bicarbonateRisk === 'SEVERE') {
      waterTreatmentPlan.push('Install 500-1,000 LPH Commercial Reverse Osmosis (RO) skid');
      waterTreatmentPlan.push('Blend RO permeate with borewell water at 60:40 ratio to achieve target EC < 0.6 mS/cm');
      waterTreatmentPlan.push('Continuous nitric/phosphoric acid dosing to neutralize bicarbonates and lower pH to 5.5–5.8');
    } else if (bicarbonateRisk === 'MODERATE') {
      waterTreatmentPlan.push('Inline acid-injection unit (phosphoric/nitric) targeting pH 6.0 for irrigation delivery');
      waterTreatmentPlan.push('Weekly substrate leachate EC/pH monitoring with 20% leaching fraction');
    } else {
      waterTreatmentPlan.push('Standard disc filtration with biological mineral balancing');
    }

    return {
      tds,
      ph,
      estimatedEc,
      bicarbonateRisk,
      soilRecommendation: 'Open field Maharashtra black cotton soil is calcifuge-incompatible. Soilless substrate cultivation is mandatory.',
      raspberrySuitability,
      blueberrySuitability,
      waterTreatmentPlan,
      substrateSpec: '70% buffered low-sodium coco coir + 30% horticulture-grade perlite in 15–20L UV-stabilized aerated polybags.',
      fertigationGuidance: 'Blueberries require ammonium-dominant nitrogen at pH 4.8–5.2. Raspberries require balanced potassium nitrate & calcium nitrate at pH 5.8–6.2.',
    };
  }

  /**
   * Deterministic Cultivar Agronomy Dossier
   */
  public static getCultivarSpecs(cultivarId: string): CultivarSpecResult {
    const q = (cultivarId || '').toLowerCase();

    if (q.includes('rasp') || q.includes('autumn') || q.includes('bliss')) {
      return {
        id: 'autumn-bliss',
        name: 'Autumn Bliss Primocane Raspberry',
        botanical: 'Rubus idaeus',
        type: 'Day-Neutral Primocane',
        brixRating: '14.2° Brix',
        annualYieldPerPlant: '3.2 kg/year (bi-annual flushes)',
        chillHours: 'Low chill (~150 hrs), evergreen management',
        rootzonePh: '5.8 – 6.3',
        irrigationEc: '1.2 – 1.6 mS/cm',
        harvestWindows: 'Flush 1: Nov–Jan | Flush 2: March–May',
        wholesaleRate: '₹600 – ₹800/kg B2B off-take',
        keyFeatures: 'Dual-season fruiting on first-year canes. High anthocyanin density with firm drupelet bond for 14-day cold-chain transit.',
      };
    }

    if (q.includes('black') || q.includes('karaka')) {
      return {
        id: 'karaka-black',
        name: 'Karaka Black Thornless Blackberry',
        botanical: 'Rubus fruticosus',
        type: 'Thornless Floricane/Trailing',
        brixRating: '18.5° Brix',
        annualYieldPerPlant: '3.5 kg/year',
        chillHours: '200 hrs',
        rootzonePh: '5.8 – 6.4',
        irrigationEc: '1.4 – 1.8 mS/cm',
        harvestWindows: 'December to May',
        wholesaleRate: '₹650 – ₹900/kg B2B off-take',
        keyFeatures: 'Huge 8-10g berries, extreme cyanidin-3-glucoside antioxidant levels, heavy clusters on high-wire trellises.',
      };
    }

    if (q.includes('blue') || q.includes('biloxi')) {
      return {
        id: 'biloxi',
        name: 'Biloxi Low-Chill Southern Highbush',
        botanical: 'Vaccinium darrowii x corymbosum',
        type: 'Evergreen Low-Chill Shrub',
        brixRating: '15.5° Brix',
        annualYieldPerPlant: '2.8 – 3.4 kg/year (Year 3+ maturity)',
        chillHours: '150 hrs (ideal for Satara/Panchgani/Pune belt)',
        rootzonePh: '4.5 – 5.2 (strict calcifuge)',
        irrigationEc: '0.6 – 1.0 mS/cm',
        harvestWindows: 'January to June',
        wholesaleRate: '₹700 – ₹1,200/kg B2B off-take',
        keyFeatures: '20-year productive lifespan. Requires acidic peat/perlite/coir substrate and iron-EDDHA chelate.',
      };
    }

    if (q.includes('mulberry') || q.includes('sweet lavender')) {
      return {
        id: 'sweet-lavender',
        name: 'Sweet Lavender Australian Mulberry',
        botanical: 'Morus alba',
        type: 'Dwarf Trellised Bush',
        brixRating: '22.0° Brix',
        annualYieldPerPlant: '4.5 kg/year',
        chillHours: 'Zero chill required (Tropical)',
        rootzonePh: '6.0 – 6.8',
        irrigationEc: '1.2 – 1.8 mS/cm',
        harvestWindows: 'Year-round continuous fruiting',
        wholesaleRate: '₹80 per 150g retail consumer pack',
        keyFeatures: 'High sweetness, pale lavender drupelets, zero staining juice, immediate consumer favorite.',
      };
    }

    // Default: San Andreas Strawberry
    return {
      id: 'san-andreas',
      name: 'San Andreas Day-Neutral Strawberry',
      botanical: 'Fragaria x ananassa',
      type: 'Day-Neutral Polyhouse Runner',
      brixRating: '12.8° Brix',
      annualYieldPerPlant: '800g – 1,000g/year',
      chillHours: 'Day-neutral (climate independent)',
      rootzonePh: '5.8 – 6.2',
      irrigationEc: '1.2 – 1.4 mS/cm',
      harvestWindows: 'October through April',
      wholesaleRate: '₹350 – ₹500/kg B2B off-take',
      keyFeatures: 'Continuous flowering under shaded polyhouse, conical fruit form, disease-resistant crown.',
    };
  }

  /**
   * Deterministic Farm Tour Slot Booking
   */
  public static reserveFarmTour(
    tourType: 'harvest-visit' | 'study-tour' | 'commercial-masterclass',
    date: string,
    partySize = 2,
    customerName = 'Guest',
    customerPhone = ''
  ): TourReservationResult {
    const guests = Math.max(1, Math.min(partySize, 25));
    const token = `BB-TOUR-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let pricePerPerson = 1250;
    let tourTitle = 'Gourmet Harvest & Berry Tasting Walk';
    let timeSlot = '08:00 AM – 10:30 AM';

    if (tourType === 'study-tour' || tourType === 'commercial-masterclass') {
      pricePerPerson = 3500;
      tourTitle = 'Technical CEA & Polyhouse Engineering Masterclass';
      timeSlot = '10:00 AM – 03:30 PM (includes lunch & syllabus dossier)';
    }

    const totalPrice = guests * pricePerPerson;

    return {
      tourId: tourType,
      tourTitle,
      date: date || 'Upcoming Saturday',
      partySize: guests,
      pricePerPerson,
      totalPrice,
      bookingToken: token,
      location: 'Berryboyzz Research Polyhouse Facility, Wai-Panchgani Highway, Satara, Maharashtra 412803',
      timeSlot,
      instructions: `Please arrive 15 minutes before ${timeSlot}. Clean bio-security shoe covers are provided at entrance. Fresh fruit tasting included.`,
    };
  }

  /**
   * Deterministic Human Escalation Dossier Generator
   */
  public static createHumanEscalationDossier(params: {
    customerName: string;
    customerPhone: string;
    inquiryArchetype: 'INVESTOR' | 'FARMER' | 'TOURIST' | 'BUYER';
    reason: string;
    resolvedContext: string;
    suggestedAction?: string;
  }): HumanEscalationDossier {
    const leadToken = `BB-ESC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let priorityLevel: 'CRITICAL' | 'HIGH' | 'STANDARD' = 'STANDARD';
    if (params.inquiryArchetype === 'INVESTOR' || params.reason.toLowerCase().includes('syndicate')) {
      priorityLevel = 'CRITICAL';
    } else if (params.inquiryArchetype === 'FARMER' || params.reason.toLowerCase().includes('acre')) {
      priorityLevel = 'HIGH';
    }

    return {
      leadToken,
      customerName: params.customerName || 'Valued Partner',
      customerPhone: params.customerPhone || 'N/A',
      inquiryArchetype: params.inquiryArchetype,
      priorityLevel,
      assignedAgronomistPhone: '+91 88886 81136',
      resolvedContext: params.resolvedContext,
      pendingEscalationReason: params.reason,
      suggestedAction: params.suggestedAction || 'Review soil/water profile and initiate phone consultation within 2 business hours.',
      timestamp: new Date().toISOString(),
    };
  }
}
