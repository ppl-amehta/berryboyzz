import { CommercialModel, BiologicalOSStep, InvestmentTier } from '../types/farm';

export const COMMERCIAL_MODELS: CommercialModel[] = [
  {
    id: 'polyhouse-nvph',
    name: 'Naturally Ventilated Polyhouse (NPVH)',
    subtitle: 'High-Output Protected CEA Infrastructure for Pune & Satara (After 16 Months)',
    idealFor: 'Commercial growers targeting export & luxury domestic retail off-take',
    minLandRequired: '0.5 Acre (2,000 sq.m)',
    capexPerAcreINR: 4400000, // ₹44 Lakhs (₹38 Lakhs with NHB subsidy)
    expectedAnnualYieldKg: 9000, // 4,500 plants x 1.5kg x 2 flushes = 8k-10k kg
    breakevenMonths: 16,
    irrPercentage: 36.5,
    systemSpecs: {
      structure: 'GI Pipe Galvanized Arch Structure (Class-B 2mm) with 200-micron UV-stabilized anti-drip film',
      climateControl: 'Top & side automated roll-up motorized curtains with 40-mesh insect screens',
      irrigation: 'Automated pressure-compensating drip with inline Venturi fertilizer injectors',
      monitoring: 'Digital Temp, RH, and PAR lux monitoring sensors',
    },
    features: [
      '4,500 plants/acre yielding 8,000–10,000 kg annually (1.5 kg × 2 flushes)',
      'Capex: ₹44 Lakhs/Acre (₹38 Lakhs net of National Horticulture Board subsidy)',
      'Break-even timeline achieved after 16 months of establishment',
      'Cold chain logistics & SLM charges not included',
    ],
    recommendedBerries: ['Raspberry', 'Blackberry', 'Strawberry'],
  },
  {
    id: 'polytunnel-walk-in',
    name: 'Medium-Width Polytunnel System (M.W.P. Tunnel)',
    subtitle: 'Agile Protected Cultivation for Satara Corridors (After 16 Months)',
    idealFor: 'Phased commercial expansions and medium-scale landholders',
    minLandRequired: '0.5 Acre',
    capexPerAcreINR: 2500000, // ₹25 Lakhs (setup baseline ₹28L)
    expectedAnnualYieldKg: 9000, // 4,500 plants, 8k-10k kg
    breakevenMonths: 16,
    irrPercentage: 38.2,
    systemSpecs: {
      structure: 'Modular hoop arches anchored with ground screws, quick-deploy plastic skin',
      climateControl: 'End-wall sliding louvers and passive thermal convection venting',
      irrigation: 'Micro-sprinklers for canopy cooling + root-zone dripper lines',
      monitoring: 'Analog soil-moisture tensiometers and temperature dataloggers',
    },
    features: [
      '4,500 plants/acre producing 8,000–10,000 kg annual harvest',
      'Cost-effective ₹25 Lakhs capex per acre (₹18L–₹20L base + 15% / ₹28L setup)',
      'Break-even horizon within 16 months',
      'Cold chain logistics & SLM charges not included',
    ],
    recommendedBerries: ['Raspberry', 'Blackberry', 'Mulberry'],
  },
  {
    id: 'recirculating-grow-bag',
    name: 'Grow-Bay Hydroponic System',
    subtitle: 'Zero Soil Contamination, 100% Rhizosphere Precision Control (After 16 Months)',
    idealFor: 'Areas with hard rocky soil, saline groundwater, or nematodes',
    minLandRequired: '0.25 Acre',
    capexPerAcreINR: 3500000, // ₹35 Lakhs (range ₹35L - ₹38L)
    expectedAnnualYieldKg: 13000, // 6,000 plants, 12k-14k kg
    breakevenMonths: 16,
    irrPercentage: 39.5,
    systemSpecs: {
      structure: 'Ground weed-matting + elevated drainage stands with gutter collection',
      climateControl: 'Integrated shade net (35% white/black thermal reflection)',
      irrigation: 'Closed-loop automated fertigation skid with EC/pH feedback loops',
      monitoring: 'Daily leachate drain EC, pH, and water consumption telemetry',
    },
    features: [
      '6,000 plants/acre high-density grow-bag layout yielding 12,000–14,000 kg annually',
      'Turnkey setup at ₹35 Lakhs – ₹38 Lakhs per acre',
      'Saves up to 70% irrigation water through leachate recycling and targeted delivery',
      'Cold chain logistics & SLM charges not included',
    ],
    recommendedBerries: ['Blueberry', 'Raspberry', 'Strawberry'],
  },
  {
    id: 'fully-automated-iot',
    name: 'Fully Automated Precision Facility (FIOI Setup)',
    subtitle: 'Autonomous Climate, Fertigation & Dosing Suite (After 16 Months)',
    idealFor: 'Institutional corporate farming and remote hands-off investors',
    minLandRequired: '1.0 Acre',
    capexPerAcreINR: 7500000, // ₹70L - ₹85L (₹87 Lakhs setup)
    expectedAnnualYieldKg: 16000, // 12k - 18k kg / 15k - 20k kg
    breakevenMonths: 16,
    irrPercentage: 42.0,
    systemSpecs: {
      structure: 'Multi-span sawtooth gutter-connected polyhouse with automated ridge vents',
      climateControl: 'High-pressure misting/foggers (50 bar) + evaporative cooling pad & fan system',
      irrigation: 'Multi-channel A/B/C acid fertigation computer dosing dynamically per solar Joule',
      monitoring: 'Cloud-synced telemetry: leaf temperature thermal cameras, EC/pH sensors, soil moisture arrays',
    },
    features: [
      'Premium yields of 12,000–18,000 kg (up to 15,000–20,000 kg mature)',
      'Turnkey capex ₹70L – ₹85L per acre (₹87 Lakhs full infrastructure setup)',
      'Zero human error in nutrient delivery; exact EC/pH curves maintained 24/7',
      'Cold chain logistics & SLM charges not included',
    ],
    recommendedBerries: ['Blueberry', 'Raspberry', 'Blackberry', 'Strawberry'],
  },
  {
    id: 'urban-rooftop-farm',
    name: 'Urban Setup Rooftop Micro-Farm (1,500 – 2,000 sq.ft)',
    subtitle: 'Ultra-Local Freshness: Balconies, Patios & Urban Terrace Agri-Tech (After 16 Months)',
    idealFor: 'Urban entrepreneurs, luxury hotels, and culinary clubs in Pune/Mumbai',
    minLandRequired: '1,500 – 2,000 sq.ft (Rooftop / Terrace)',
    capexPerAcreINR: 1200000, // ₹12 Lakhs total setup
    expectedAnnualYieldKg: 2500, // 2000 - 3000 kg from 600 - 2,000 plants
    breakevenMonths: 16,
    irrPercentage: 44.0,
    systemSpecs: {
      structure: 'Lightweight aluminum framework with aerodynamic wind baffling',
      climateControl: 'Ultrasonic micro-humidifiers and overhead micro-misting',
      irrigation: 'Compact gravity or 0.5HP pressure booster drip kit on smart timer',
      monitoring: 'WiFi IoT controller with push notification alerts',
    },
    features: [
      '600 to 2,000 containerized plants producing 2,000–3,000 kg fresh fruit annually',
      'Complete terrace setup for ₹12 Lakhs (1,500 – 2,000 sq.ft)',
      'Harvest-to-plate within 15 minutes; zero transit carbon footprint',
      'Cold chain logistics & SLM charges not included',
    ],
    recommendedBerries: ['Strawberry', 'Blueberry', 'Raspberry'],
  },
];

export const BIOLOGICAL_OS_PILLARS: BiologicalOSStep[] = [
  {
    step: 1,
    title: 'High-Genetics Tissue Culture & Imported Clones',
    code: 'GENOMICS-TC',
    summary: 'Virus-indexed, certified disease-free micropropagated plants from world-class European and North American nurseries.',
    scientificMechanism: 'Meristem-tip micropropagation eliminates systemic viral loads. Primocane varieties guarantee fruiting on current-season first-year wood without mandatory chilling cycles.',
    deliverables: [
      'Genetic authenticity certificate for every clonal batch',
      'Complete lab screening report against raspberry bushy dwarf virus & latent ringspot',
      'Hardened, plug-established saplings with active mycorrhizal root colonization',
    ],
    auditFrequency: 'At batch dispatch & 30 days post-transplant',
  },
  {
    step: 2,
    title: 'Fertilizer Input & Bacto-Rich Rhizosphere Development',
    code: 'RHIZO-BACTO',
    summary: 'Proprietary slurry development and fermented microbial consortia to stimulate hyper-vigorous nutrient uptake.',
    scientificMechanism: 'Liquid formulations of Bacillus subtilis, Trichoderma harzianum, and Azospirillum solubilize bound phosphorus and chelate micronutrients while stimulating plant growth regulators (PGRs).',
    deliverables: [
      'Customized monthly fertigation schedule matched to plant phenology',
      'Concentrated Bacto-Liquid microbial inoculants supplied per acre',
      'Organic PGR boosters formulated for drupelet swelling & Brix maximization',
    ],
    auditFrequency: 'Bi-weekly substrate leachate testing',
  },
  {
    step: 3,
    title: 'Operating System & Dedicated Agronomy Team',
    code: 'OPS-CORE',
    summary: 'Standard operating protocols (SOPs) governing every hour of farm management from sunrise irrigation to evening canopy management.',
    scientificMechanism: 'Systematic task queues eliminate grower guesswork. Daily logs track fertigation volume, canopy leaf-area index, pest scouting thresholds, and flower-to-fruit transformation rates.',
    deliverables: [
      'Digitized Farm OS task management dashboard',
      'Dedicated on-site farm supervisor training and certification',
      'Direct agronomy hotline with 2-hour response SLA for operational emergencies',
    ],
    auditFrequency: 'Continuous digital logging',
  },
  {
    step: 4,
    title: 'Agronomist Field Visits & Diagnostic Schedules',
    code: 'AGRO-AUDIT',
    summary: 'Senior horticultural agronomists conduct scheduled physical site audits with precision diagnostic equipment.',
    scientificMechanism: 'Handheld chlorophyll meters (SPAD), digital refractometers (Brix), and sap-analysis tools detect nutrient deficiencies 10 days before visual leaf symptoms emerge.',
    deliverables: [
      'Comprehensive physical audit report with actionable photographic action items',
      'Immediate chemical & biological intervention adjustments',
      'Seasonal pruning and canopy architecture optimization guidance',
    ],
    auditFrequency: 'Bi-monthly scheduled physical audits',
  },
  {
    step: 5,
    title: 'Cold-Chain Logistics & Controlled Atmosphere Transit',
    code: 'COLD-CHAIN',
    summary: 'Unbroken refrigerated transit from farm gate to supermarket shelf, arresting respiration within 45 minutes of harvest.',
    scientificMechanism: 'Forced-air rapid pre-cooling pulls core berry pulp temperature down to 2°C–4°C, lowering ethylene synthesis and extending fresh punnet shelf life from 3 days to 14 days.',
    deliverables: [
      'GPS-tracked temperature-logged reefer vans servicing Pune, Mumbai, and Goa daily',
      'Export-grade vented 125g punnets with food-grade anti-microbial absorbent pads',
      'Guaranteed cold-dock acceptance protocols with tier-1 luxury retailers',
    ],
    auditFrequency: 'Per-shipment temperature data-logger telemetry',
  },
  {
    step: 6,
    title: 'Guaranteed B2B Off-Take Partnerships & Market Linkages',
    code: 'OFF-TAKE',
    summary: 'Contractual off-take agreements with luxury hotel chains, modern trade grocers, and pastry institutions eliminating market price volatility.',
    scientificMechanism: 'Aggregated cold-chain supply secures pre-negotiated fixed price contracts per punnet, insulating the grower from local mandi fluctuations and distress selling.',
    deliverables: [
      'Signed 3-year commercial off-take purchase agreement',
      'Transparent weekly weight receipts and digital payment settlement',
      'Direct access to high-margin export air cargo quotas to Middle East markets',
    ],
    auditFrequency: 'Weekly settlement statements',
  },
];

export const INVESTMENT_TIERS: InvestmentTier[] = [
  {
    id: 'tier-1-home',
    badge: 'BALCONY HOME KIT · 5 PLANTS',
    name: 'Balcony Home Kit (5 Plants)',
    tagline: 'Experience and verify elite berry genetics firsthand in your private space.',
    capitalRequired: '₹15,000',
    rawCapitalINR: 15000, // ₹2,999 per plant x 5 plants = ₹15,000
    targetAudience: 'Gardeners, culinary enthusiasts, and curious prospective investors wishing to test plant vigor.',
    deliverables: [
      '5 Hardened Tissue-Culture Berry Saplings (₹2,999 per plant package)',
      '10L Aerated Coco-Coir & Perlite planting substrate with slow-release organic nutrients',
      '1L Bacto-Liquid microbial rhizosphere booster + foliar spray pack',
      'Step-by-step master handbook & WhatsApp personal grower support',
      'Cold chain logistics & SLM charges not included',
    ],
    financialModel: {
      turnaround: 'First harvest in 75–90 days on your balcony',
      yieldReturn: '5 plants × 5 kg = 25 kg/harvest = 50 kg/year × ₹1,500 = ₹75,000 gross fruit value',
      payoutCycle: 'Personal harvest enjoyment & culinary value',
      buybackGuarantee: '100% plant replacement guarantee if establishment fails within 30 days',
    },
    whatsappLeadCode: 'BB-LEAD-HOME-T1',
  },
  {
    id: 'tier-2-commercial-1000',
    badge: 'COMMERCIAL STARTER UNIT · 1,000 PLANTS',
    name: 'Commercial Starter Unit (1,000 Plants)',
    tagline: 'Turnkey commercial pilot asset yielding 2,000 kg annually with rapid capital recovery.',
    capitalRequired: '₹35,00,000',
    rawCapitalINR: 3500000, // 1000 plants x ₹3500 each = ₹35,00,000
    targetAudience: 'Independent farmers, progressive landholders, and weekend agri-entrepreneurs with 0.25 to 0.5 acre.',
    deliverables: [
      '1,000 Certified Primocane Tissue-Culture Plants (@ ₹3,500 per plant package)',
      'Complete micro-drip fertigation manifold with precision pressure emitters',
      '1,000 UV-treated 35L substrate grow-bags or raised bed trellising materials',
      'Quarterly on-site agronomist visits + full 12-month fertigation inputs package',
      'B2B packaging punnet boxes and guaranteed off-take purchase support',
      'Cold chain logistics & SLM charges not included',
    ],
    financialModel: {
      turnaround: 'After 16 months per kg per plant gives full break-even at 18 Months',
      yieldReturn: 'Yield: 1,000 kg × 2 (twice a year) = 2,000 kg × ₹1,500/kg = ₹30,00,000 annual revenue',
      payoutCycle: 'Bi-annual picking flushes with weekly liquidation payouts',
      buybackGuarantee: 'Contractual off-take agreement for 100% Grade-A punnets produced',
    },
    whatsappLeadCode: 'BB-LEAD-COMM-1000-T2',
  },
  {
    id: 'tier-3-rent-plants',
    badge: 'LEASE PLANTS · MANAGED SYNDICATE',
    name: 'Lease Plants in Operational Farm',
    tagline: 'Own high-yield berry plants in our active Pune/Satara farms; we do 100% of the operational work.',
    capitalRequired: '₹2,500 – ₹3,500 / Plant (Blocks of 50 to 200)',
    rawCapitalINR: 150000, // Baseline: 50 plants @ ₹3000 avg = ₹1,50,000
    targetAudience: 'Urban professionals and NRIs seeking hands-off, passive agricultural cash flow without owning rural land.',
    deliverables: [
      'Lease blocks from 50 plants (₹1.25L–₹1.75L) up to 200 plants (₹5.0L–₹7.0L)',
      'Full professional farming, agronomy, water, nutrient, and labour management included',
      'Live 24/7 IoT camera & sensor dashboard access to your plant block',
      'Quarterly doorstep dispatch of 2kg luxury fresh berries + artisanal jams for your family',
      'Cold chain logistics & SLM charges not included',
    ],
    financialModel: {
      turnaround: 'Payouts commence from the 2nd agricultural quarter (After 16 Months)',
      yieldReturn: '24% – 32% target annualized passive return on deployed plant capital',
      payoutCycle: 'Quarterly electronic bank transfer directly to your account',
      buybackGuarantee: 'Full capital exit option at the end of the 36-month plant lifecycle',
    },
    whatsappLeadCode: 'BB-LEAD-RENTAL-T3',
  },
  {
    id: 'tier-4-your-land-our-farm',
    badge: 'MEGA SCALE PROJECT · 50 ACRES',
    name: 'Mega Scale Project: Your Land — Our Farm',
    tagline: 'Turnkey transformation of 50 acres into an institutional CEA berry powerhouse.',
    capitalRequired: '₹40,00,00,000 (₹40 Crore / 50-Acre Scale)',
    rawCapitalINR: 400000000, // ₹40 Cr per 50-Acre farm setup
    targetAudience: 'High-Net-Worth Individuals (HNIs), institutional land aggregators, family offices, and corporate farming estates.',
    deliverables: [
      'Master planning, topographic survey, and climate engineering for 50-Acre corridor',
      'Setup cost: ₹48L – ₹65L – ₹85L per Acre setup cost + operational management',
      'World-class Naturally Ventilated Polyhouse (NPVH) & polytunnel infrastructure erection',
      'Complete automated fertigation skids, RO water filtration, and solar backup systems',
      'Resident Senior Agronomist + dedicated permanent operating crew stationed on site',
      'Integrated on-farm forced-air pre-cooling cold storage facility (2°C)',
      '10-Year institutional off-take contract with global supermarket chains and export airfreight',
      'Cold chain logistics & SLM charges not included',
    ],
    financialModel: {
      turnaround: 'Commissioning in 120 days; break-even targeted after 16–18 months',
      yieldReturn: '₹2.8Cr – ₹4.2Cr projected annual net EBITDA per 10-acre block at mature production',
      payoutCycle: 'Monthly financial audits and escrow-cleared liquidation payouts',
      buybackGuarantee: '10-year tripartite buyback off-take guarantee and bankable agricultural asset appraisal',
    },
    whatsappLeadCode: 'BB-LEAD-SYNDICATE-50ACRE-T4',
  },
];
