export interface ProgrammaticPageData {
	cropSlug: 'strawberry' | 'raspberry' | 'blackberry' | 'blueberry';
	cropName: string;
	modelSlug: 'polyhouse' | 'polytunnel' | 'grow-bay';
	modelName: string;
	locationSlug: 'satara' | 'pune' | 'wai' | 'mahabaleshwar';
	locationName: string;
	slantSlug: 'capex-roi' | 'subsidy-guide' | 'farming-setup';
	slantTitle: string;
	h1: string;
	metaTitle: string;
	metaDescription: string;
	elevationMeters: number;
	avgDiurnalTemp: string;
	chillHoursAvailable: number;
	capexPerAcreINR: number;
	subsidyAmountINR: number;
	netCapexINR: number;
	plantsPerAcre: number;
	expectedAnnualYieldKg: number;
	avgWholesalePricePerKgINR: number;
	annualGrossRevenueINR: number;
	annualOpexINR: number;
	netAnnualProfitINR: number;
	breakevenMonths: number;
	irrPercentage: number;
	keyTakeaways: string[];
	climateOverview: string;
	subsidyOverview: string;
	infrastructureSpecs: string[];
	faqs: { question: string; answer: string }[];
}

export const PROGRAMMATIC_PAGES: ProgrammaticPageData[] = [
	{
		cropSlug: 'raspberry',
		cropName: 'Maravilla Primocane Raspberry',
		modelSlug: 'polyhouse',
		modelName: 'Naturally Ventilated Polyhouse (NPVH)',
		locationSlug: 'satara',
		locationName: 'Satara Horticultural Belt',
		slantSlug: 'capex-roi',
		slantTitle: 'Capex, Cost Breakdown & ROI Analysis',
		h1: 'Commercial Raspberry Polyhouse Farming in Satara: Capex, Yields & ROI Model',
		metaTitle: 'Raspberry Polyhouse Farming in Satara · Capex, Yield & ROI | Berryboyzz',
		metaDescription: 'Detailed commercial raspberry polyhouse unit economics in Satara, Maharashtra. ₹44L capex, ₹16L NHB subsidy, 9,000 kg/acre annual yield, and 16-month break-even.',
		elevationMeters: 750,
		avgDiurnalTemp: '12°C Night / 26°C Day',
		chillHoursAvailable: 280,
		capexPerAcreINR: 4400000,
		subsidyAmountINR: 1600000,
		netCapexINR: 2800000,
		plantsPerAcre: 4500,
		expectedAnnualYieldKg: 9000,
		avgWholesalePricePerKgINR: 650,
		annualGrossRevenueINR: 5850000,
		annualOpexINR: 1850000,
		netAnnualProfitINR: 4000000,
		breakevenMonths: 16,
		irrPercentage: 42.5,
		keyTakeaways: [
			'High-elevation Western Ghats night temperatures provide the 250+ chill hours required for double-flush primocane raspberries.',
			'National Horticulture Board (NHB) Scheme 1 provides up to 50% capital subsidy on commercial protected polyhouses in Maharashtra.',
			'Bi-annual flushes (Spring floricane + Autumn primocane) yield 9,000 kg/acre with premium institutional off-take to Mumbai & Pune.',
			'Net capital payback achieved within 16 months under Berryboyzz biological fertigation protocols.'
		],
		climateOverview: 'Satara sits at 750m elevation in the Sahyadri foothills, experiencing clean mountain breezes and a sharp day-night temperature differential that minimizes respiratory carbohydrate loss and maximizes raspberry drupelet firmness.',
		subsidyOverview: 'Under the National Horticulture Board (NHB) Development of Commercial Horticulture scheme, polyhouse structures qualify for credit-linked back-ended capital subsidies up to ₹16,00,000 per acre (40–50% of cost norm).',
		infrastructureSpecs: [
			'Class-B Galvanized Steel tubular framework (2mm wall thickness)',
			'200-micron multi-layer UV diffused anti-drip polyethylene roof film',
			'Automated top ridge vent + motorized side roll-up curtains with 40-mesh insect screens',
			'Pressure-compensating button dripper assembly (2.0 L/h) per root-bag'
		],
		faqs: [
			{
				question: 'What is the total capital required to start a 1-acre raspberry polyhouse in Satara?',
				answer: 'Total setup expenditure is approximately ₹44,00,000 per acre, which includes the galvanized steel polyhouse structure, 200-micron cladding, fertigation automation, and certified tissue-culture Maravilla plants. With NHB subsidy assistance, net capital out-of-pocket reduces to ₹28,00,000.'
			},
			{
				question: 'What is the expected annual yield and wholesale price for raspberries in Maharashtra?',
				answer: 'A high-density 1-acre planting of 4,500 bushes yields 8,000 to 10,000 kg annually across two distinct flushes. Grade-A fresh raspberries command wholesale off-take prices between ₹550 and ₹750 per kg in Mumbai and Pune luxury retail markets.'
			},
			{
				question: 'How does Berryboyzz guarantee harvest off-take in Satara?',
				answer: 'Berryboyzz enters into formal off-take agreements with partner growers, managing pre-cooling within 90 minutes of harvest, cold-chain reefer transit at 2°C, and supply delivery to leading supermarket chains and gourmet pastry houses.'
			}
		]
	},
	{
		cropSlug: 'strawberry',
		cropName: 'Sweet Charlie & San Andreas Strawberry',
		modelSlug: 'polyhouse',
		modelName: 'Naturally Ventilated Polyhouse (NPVH)',
		locationSlug: 'pune',
		locationName: 'Pune Agricultural Belt',
		slantSlug: 'subsidy-guide',
		slantTitle: 'Government Subsidies & Eligibility Guide',
		h1: 'Commercial Strawberry Polyhouse Subsidies in Pune: NHB, MIDC & MahaDBT Guide',
		metaTitle: 'Strawberry Polyhouse Subsidies in Pune · NHB & MahaDBT Guide | Berryboyzz',
		metaDescription: 'Complete roadmap for polyhouse strawberry farming subsidies in Pune, Maharashtra. Eligibility norms, DPR documentation, and 50% capital subsidy breakdown.',
		elevationMeters: 560,
		avgDiurnalTemp: '14°C Night / 28°C Day',
		chillHoursAvailable: 200,
		capexPerAcreINR: 3800000,
		subsidyAmountINR: 1520000,
		netCapexINR: 2280000,
		plantsPerAcre: 24000,
		expectedAnnualYieldKg: 18000,
		avgWholesalePricePerKgINR: 240,
		annualGrossRevenueINR: 4320000,
		annualOpexINR: 1450000,
		netAnnualProfitINR: 2870000,
		breakevenMonths: 15,
		irrPercentage: 46.8,
		keyTakeaways: [
			'Pune district qualifies under NHB Commercial Horticulture schemes with up to 40-50% subsidy on greenhouse infrastructure.',
			'Proximity to Pune cargo airport and Mumbai-Pune expressway reduces cold-chain transit loss to under 1.5%.',
			'High-density tabletop and bed plantings achieve 18,000 kg/acre annual output with Sweet Charlie & San Andreas cultivars.',
			'Comprehensive DPR preparation and bank credit linkage support provided by the Berryboyzz technical desk.'
		],
		climateOverview: 'Pune offers ideal sun intensity (PAR lux levels exceeding 900 µmol/m²/s) and moderate night temperatures from October through March, accelerating flowering and sugar accumulation in day-neutral strawberry varieties.',
		subsidyOverview: 'MahaDBT (Department of Agriculture, Maharashtra) and NHB provide credit-linked back-ended subsidies for Naturally Ventilated Polyhouses up to ₹1,400/m² of cost norm for general category growers and ₹1,600/m² for SC/ST/women farmers.',
		infrastructureSpecs: [
			'Galvanized arch structural design built to withstand 120 km/h wind gusts',
			'Thermal screen shading (50% aluminized shade net) for afternoon radiation control',
			'Micro-misting overhead fogger lines for relative humidity optimization',
			'Automated A/B fertilizer injection tanks with electronic EC/pH feedback'
		],
		faqs: [
			{
				question: 'How do I apply for a polyhouse subsidy for strawberry farming in Pune?',
				answer: 'Applications are submitted online via the National Horticulture Board (NHB) portal or MahaDBT. Requirements include 7/12 land extract, water and soil test certificate, detailed project report (DPR), bank sanction letter, and layout blueprints.'
			},
			{
				question: 'What is the minimum land requirement for a subsidized polyhouse in Maharashtra?',
				answer: 'The minimum viable commercial size recognized under NHB schemes is 0.5 acre (2,000 sq.m), though 1-acre installations offer optimal economies of scale for automation and cold storage.'
			}
		]
	},
	{
		cropSlug: 'blueberry',
		cropName: 'Biloxi Southern Highbush Blueberry',
		modelSlug: 'grow-bay',
		modelName: 'Grow-Bay Hydroponic System',
		locationSlug: 'satara',
		locationName: 'Satara Horticultural Belt',
		slantSlug: 'capex-roi',
		slantTitle: 'Substrate Hydroponics Capex & P&L Analysis',
		h1: 'Commercial Blueberry Hydroponic Farming in Satara: Setup Cost & High-Yield ROI',
		metaTitle: 'Hydroponic Blueberry Farming in Satara · Capex & ROI Model | Berryboyzz',
		metaDescription: 'Commercial zero-chill Biloxi blueberry farming in Satara. Elevated substrate grow-bays, ₹35L capex, 12,000 kg mature yield, and ₹900/kg off-take economics.',
		elevationMeters: 750,
		avgDiurnalTemp: '12°C Night / 25°C Day',
		chillHoursAvailable: 150,
		capexPerAcreINR: 3500000,
		subsidyAmountINR: 1400000,
		netCapexINR: 2100000,
		plantsPerAcre: 6000,
		expectedAnnualYieldKg: 12000,
		avgWholesalePricePerKgINR: 850,
		annualGrossRevenueINR: 10200000,
		annualOpexINR: 2600000,
		netAnnualProfitINR: 7600000,
		breakevenMonths: 18,
		irrPercentage: 54.2,
		keyTakeaways: [
			'Blueberries require acidic root zones (pH 4.5–5.0), perfectly maintained via elevated 70:30 cocopeat:perlite grow-bays.',
			'Biloxi Southern Highbush genetics require minimal chilling (<150 hours), flourishing in Satara plateau elevations.',
			'Mature production produces up to 2.4 kg per bush, yielding over ₹1 Crore gross revenue per acre at premium market rates.',
			'Fully closed-loop fertigation recycles 20% drainage runoff, conserving 85% water compared to soil farming.'
		],
		climateOverview: 'Satara plateau conditions provide the cool night temperatures and low ambient fungal pressure necessary for blueberry flower induction and thick waxy epicuticular bloom formation.',
		subsidyOverview: 'Substrate hydroponics qualifies under NHB High-Tech Commercial Horticulture schemes, eligible for 40% capital investment subsidy on specialized fertigation heads, gutters, and climate automation.',
		infrastructureSpecs: [
			'Elevated gutter stands (1.0m height) with UV-treated 25L drain-gro polypropylene bags',
			'Pre-buffered Sri Lankan low-EC coco coir blended with horticultural perlite',
			'Automated 4-channel dosing unit dynamically controlling nitric acid, calcium, and micronutrients',
			'Sub-surface drainage collection channels with UV sterilization filtration'
		],
		faqs: [
			{
				question: 'Can blueberries really be grown commercially in Maharashtra?',
				answer: 'Yes. By utilizing zero/low-chill Southern Highbush cultivars (such as Biloxi) in elevated acidic substrate grow-bays, commercial yields exceeding 12,000 kg/acre are achieved in Satara and Pune without soil limitation.'
			},
			{
				question: 'What is the market demand and off-take price for fresh blueberries in India?',
				answer: 'India imports the majority of its blueberries at ₹1,200–₹1,800/kg. Locally harvested Grade-A fresh berries command ₹750–₹1,000/kg wholesale, offering immense domestic import-substitution potential.'
			}
		]
	},
	{
		cropSlug: 'strawberry',
		cropName: 'Sweet Charlie & Camarosa Strawberry',
		modelSlug: 'polytunnel',
		modelName: 'Medium-Width Polytunnel System',
		locationSlug: 'mahabaleshwar',
		locationName: 'Mahabaleshwar Highland',
		slantSlug: 'capex-roi',
		slantTitle: 'Polytunnel Capex, Yield & Profitability',
		h1: 'Commercial Strawberry Polytunnel Farming in Mahabaleshwar: Costs & Returns',
		metaTitle: 'Strawberry Polytunnel Farming in Mahabaleshwar · Capex & Returns | Berryboyzz',
		metaDescription: 'Commercial polytunnel strawberry cultivation in Mahabaleshwar. ₹25L capex, 16-month break-even, ₹18L–₹26L annual returns, and rain protection engineering.',
		elevationMeters: 1350,
		avgDiurnalTemp: '8°C Night / 22°C Day',
		chillHoursAvailable: 350,
		capexPerAcreINR: 2500000,
		subsidyAmountINR: 1000000,
		netCapexINR: 1500000,
		plantsPerAcre: 22000,
		expectedAnnualYieldKg: 15000,
		avgWholesalePricePerKgINR: 220,
		annualGrossRevenueINR: 3300000,
		annualOpexINR: 1100000,
		netAnnualProfitINR: 2200000,
		breakevenMonths: 14,
		irrPercentage: 48.2,
		keyTakeaways: [
			'Mahabaleshwar elevation (1,350m) provides 350+ chill hours, generating supreme sweetness and fruit firmness.',
			'Modular polytunnel structures cost 40% less than full polyhouses while providing complete rain and frost protection.',
			'Net capital investment of ₹15 Lakhs achieves full break-even within 14 months of winter planting.',
			'Direct integration with local tourism u-pick and metro cold-chain off-take.'
		],
		climateOverview: 'Mahabaleshwar is the historical heart of Indian strawberry cultivation, with crisp Himalayan-like winter temperatures that produce natural Brix levels exceeding 10.5°.',
		subsidyOverview: 'Protected cultivation in designated hilly districts receives preferential state horticulture subsidies under NHM (National Horticulture Mission) covering up to 50% of structural costs.',
		infrastructureSpecs: [
			'Galvanized structural steel hoop arches anchored with helical ground screws',
			'150-micron UV-stabilized anti-fog film with side roll-up ventilation',
			'Raised bed drip tape with 20cm emitter spacing and silver-black reflective mulch',
			'Inline filtration and Venturi fertigation system'
		],
		faqs: [
			{
				question: 'Why choose polytunnels over polyhouses in Mahabaleshwar?',
				answer: 'Polytunnels require ₹25 Lakhs/acre versus ₹44 Lakhs for heavy polyhouses, deploy in under 3 weeks, and provide sufficient protection against unseasonal rainfall and morning frost.'
			}
		]
	},
	{
		cropSlug: 'blackberry',
		cropName: 'Prime-Ark 45 Thornless Blackberry',
		modelSlug: 'polyhouse',
		modelName: 'Naturally Ventilated Polyhouse (NPVH)',
		locationSlug: 'satara',
		locationName: 'Satara Horticultural Belt',
		slantSlug: 'farming-setup',
		slantTitle: 'Turnkey Commercial Setup & Agronomy Guide',
		h1: 'Commercial Blackberry Polyhouse Setup in Satara: Architecture & Off-Take',
		metaTitle: 'Blackberry Polyhouse Setup in Satara · Agronomy & Turnkey Guide | Berryboyzz',
		metaDescription: 'Step-by-step setup guide for commercial Prime-Ark 45 blackberry polyhouses in Satara. Trellising architecture, fertigation protocols, and buyback agreements.',
		elevationMeters: 750,
		avgDiurnalTemp: '12°C Night / 26°C Day',
		chillHoursAvailable: 280,
		capexPerAcreINR: 4200000,
		subsidyAmountINR: 1500000,
		netCapexINR: 2700000,
		plantsPerAcre: 4000,
		expectedAnnualYieldKg: 8500,
		avgWholesalePricePerKgINR: 600,
		annualGrossRevenueINR: 5100000,
		annualOpexINR: 1650000,
		netAnnualProfitINR: 3450000,
		breakevenMonths: 16,
		irrPercentage: 39.5,
		keyTakeaways: [
			'Prime-Ark 45 is a high-yielding, thornless primocane blackberry adapted for sub-tropical protected tunnels.',
			'T-trellis support system ensures 100% light interception and ergonomic harvest picking.',
			'High anthocyanin content and drupelet firmness allow 8-day cold storage transit without leakage.',
			'Guaranteed institutional cold-chain off-take contracts managed by Berryboyzz.'
		],
		climateOverview: 'Satara foothills provide the dry atmosphere and moderate humidity needed to prevent botrytis fruit rot during flowering and fruit ripening.',
		subsidyOverview: 'NHB Scheme 1 covers 40-50% of the polyhouse, trellising wire, drip system, and certified planting material costs.',
		infrastructureSpecs: [
			'Reinforced G.I. post and cable trellising system with tensioned wire support',
			'Naturally ventilated greenhouse with 4.5m gutter height for heat dissipation',
			'Double-line drip tubing per bed with 1.6 L/h pressure-compensating emitters',
			'Bio-rational integrated pest management (IPM) predator insect protocols'
		],
		faqs: [
			{
				question: 'How many years does a blackberry polyhouse plantation remain productive?',
				answer: 'A well-maintained commercial blackberry plantation remains highly productive for 8 to 10 years, with canes renewed through annual primocane selection and post-harvest mowing.'
			}
		]
	},
	{
		cropSlug: 'raspberry',
		cropName: 'Maravilla Primocane Raspberry',
		modelSlug: 'grow-bay',
		modelName: 'Grow-Bay Hydroponic System',
		locationSlug: 'pune',
		locationName: 'Pune Agricultural Belt',
		slantSlug: 'farming-setup',
		slantTitle: 'High-Tech Hydroponic Substrate Installation',
		h1: 'Hydroponic Raspberry Setup in Pune: Substrate Engineering & Biological OS',
		metaTitle: 'Hydroponic Raspberry Setup in Pune · Substrate Engineering | Berryboyzz',
		metaDescription: 'Engineered hydroponic substrate raspberry farming in Pune. 3.2 kg/m² yield, automated EC/pH dosing, zero-soil pathogens, and metro off-take.',
		elevationMeters: 560,
		avgDiurnalTemp: '14°C Night / 28°C Day',
		chillHoursAvailable: 200,
		capexPerAcreINR: 3600000,
		subsidyAmountINR: 1440000,
		netCapexINR: 2160000,
		plantsPerAcre: 5500,
		expectedAnnualYieldKg: 11000,
		avgWholesalePricePerKgINR: 650,
		annualGrossRevenueINR: 7150000,
		annualOpexINR: 2200000,
		netAnnualProfitINR: 4950000,
		breakevenMonths: 15,
		irrPercentage: 49.0,
		keyTakeaways: [
			'Substrate grow-bays isolate raspberries from soil nematodes and verticillium wilt, ensuring 99%+ plant survival.',
			'Pune peri-urban location provides direct 45-minute delivery access to high-end hospitality and retail in Mumbai/Pune.',
			'Automated Biological OS fertigation regulates EC from 1.2 to 2.2 mS/cm matching phenological stages.',
			'11,000 kg/acre annual harvest yielding over ₹70 Lakhs gross revenue.'
		],
		climateOverview: 'Controlled environment shade screens and micro-foggers modulate Pune peak midday heat, maintaining optimal photosynthetic temperatures below 28°C.',
		subsidyOverview: 'National Horticulture Board provides up to 50% assistance on high-tech hydroponic automation and precision irrigation heads.',
		infrastructureSpecs: [
			'Elevated steel substrate benching with drain collection troughs',
			'70% coarse coco chips + 30% perlite sterile growing medium',
			'Multi-channel automated dosing system with EC and pH sensors',
			'UV-shielded drainage recycling storage tank'
		],
		faqs: [
			{
				question: 'What is the main benefit of growing raspberries in hydroponic substrate vs soil?',
				answer: 'Substrate farming prevents all soil-borne root rots (Phytophthora), improves root oxygenation by 40%, increases yield density by 30%, and enables precise control of sugar and firmness.'
			}
		]
	},
	{
		cropSlug: 'strawberry',
		cropName: 'Sweet Charlie Strawberry',
		modelSlug: 'polyhouse',
		modelName: 'Naturally Ventilated Polyhouse (NPVH)',
		locationSlug: 'wai',
		locationName: 'Wai-Panchgani Foothills',
		slantSlug: 'farming-setup',
		slantTitle: 'Turnkey Installation & Fertigation Management',
		h1: 'Commercial Strawberry Polyhouse Setup in Wai: Turnkey Engineering & Yields',
		metaTitle: 'Strawberry Polyhouse Setup in Wai · Turnkey Engineering | Berryboyzz',
		metaDescription: 'Commercial strawberry polyhouse setup in Wai, Maharashtra. Krishna river basin water, 18,000 kg yield, automated fertigation, and off-take contracts.',
		elevationMeters: 650,
		avgDiurnalTemp: '13°C Night / 27°C Day',
		chillHoursAvailable: 240,
		capexPerAcreINR: 3900000,
		subsidyAmountINR: 1560000,
		netCapexINR: 2340000,
		plantsPerAcre: 24000,
		expectedAnnualYieldKg: 17500,
		avgWholesalePricePerKgINR: 230,
		annualGrossRevenueINR: 4025000,
		annualOpexINR: 1350000,
		netAnnualProfitINR: 2675000,
		breakevenMonths: 15,
		irrPercentage: 45.2,
		keyTakeaways: [
			'Wai basin provides pristine, low-salinity river irrigation water (EC <0.3 mS/cm), reducing filtration capex.',
			'Strategic location midway between Pune and Mahabaleshwar provides dual-market off-take flexibility.',
			'High-density raised beds with silver-black mulch produce 17,500 kg/acre annual yields.',
			'Full turnkey handover: soil remediation, structural erection, fertigation automation, and mother stock delivery.'
		],
		climateOverview: 'The Wai valley benefits from mountain airflow funneling down from the Panchgani plateau, providing cooler night temperatures than Pune with lower monsoon humidity.',
		subsidyOverview: 'Qualifies under NHB Scheme 1 for commercial protected horticulture with up to ₹16,00,000 subsidy per acre.',
		infrastructureSpecs: [
			'Class-2 G.I. structural pipe arch design with continuous ridge ventilation',
			'UV-stabilized 200-micron anti-dust, anti-condensation polyethylene film',
			'Automated misting system for evaporative cooling during early autumn planting',
			'Drip irrigation manifolds with pressure regulators and secondary disc filtration'
		],
		faqs: [
			{
				question: 'How long does it take from signing to the first strawberry harvest in Wai?',
				answer: 'Polyhouse fabrication and planting take 6 to 8 weeks. Planting in September/October yields the first commercial harvest within 60 to 75 days, continuing through April.'
			}
		]
	},
	{
		cropSlug: 'blueberry',
		cropName: 'Biloxi Southern Highbush Blueberry',
		modelSlug: 'grow-bay',
		modelName: 'Grow-Bay Hydroponic System',
		locationSlug: 'pune',
		locationName: 'Pune Agricultural Belt',
		slantSlug: 'capex-roi',
		slantTitle: 'Substrate Hydroponics Capex & P&L Analysis',
		h1: 'Commercial Blueberry Hydroponic Farming in Pune: Capex, Yield & Off-Take Model',
		metaTitle: 'Hydroponic Blueberry Farming in Pune · Capex & ROI Model | Berryboyzz',
		metaDescription: 'Detailed commercial blueberry hydroponic setup in Pune. ₹36L capex, 11,500 kg yield, ₹850/kg wholesale off-take, and 18-month break-even.',
		elevationMeters: 560,
		avgDiurnalTemp: '14°C Night / 28°C Day',
		chillHoursAvailable: 150,
		capexPerAcreINR: 3600000,
		subsidyAmountINR: 1440000,
		netCapexINR: 2160000,
		plantsPerAcre: 6000,
		expectedAnnualYieldKg: 11500,
		avgWholesalePricePerKgINR: 850,
		annualGrossRevenueINR: 9775000,
		annualOpexINR: 2500000,
		netAnnualProfitINR: 7275000,
		breakevenMonths: 18,
		irrPercentage: 52.8,
		keyTakeaways: [
			'Pune offers immediate access to the highest concentration of premium retail chains and five-star hotels in Western India.',
			'Elevated grow-bays allow successful blueberry cultivation in areas with neutral or black cotton soils by isolating roots in acid coir.',
			'Mature crop generates over ₹95 Lakhs in annual gross revenue with ₹850/kg institutional off-take.',
			'Berryboyzz turnkey management handles daily fertigation dosing, canopy pruning, and harvest cold chain.'
		],
		climateOverview: 'With thermal shade screening and humidity misting, Pune provides an extended 10-month vegetative and bulking cycle for Southern Highbush blueberries.',
		subsidyOverview: 'Eligible for 40% capital investment subsidy under the National Horticulture Board high-tech protected cultivation framework.',
		infrastructureSpecs: [
			'Heavy-duty elevated gutter support stands with 25L drain-gro bags',
			'Low-EC, buffered coconut coir with 30% perlite blend',
			'Computerized inline fertigation unit with automatic pH correction',
			'Sub-canopy micro-drip irrigation with anti-leak valves'
		],
		faqs: [
			{
				question: 'What is the life expectancy of a blueberry plantation in substrate troughs?',
				answer: 'A blueberry bush in a properly maintained substrate trough remains productive for 15 to 20 years, with media reconditioning or top-dressing every 4 to 5 years.'
			}
		]
	}
];
