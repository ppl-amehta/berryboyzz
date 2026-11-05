/**
 * BERRYBOYZZ™ Frontier Spatial Web Architecture
 * Multidirectional Spatial Agro-Asset Map & Enterprise Domain Node Graph
 * Zero-Jank, Non-Linear 3D Coordinate Space
 */

export interface Vector3D {
	x: number;
	y: number;
	z: number;
}

export type SpatialCategory = 'facility' | 'cultivar-orbital' | 'domain';

export interface SpatialNode {
	id: string;
	name: string;
	category: SpatialCategory;
	tag: string;
	coordinates: Vector3D;
	cameraOffset: Vector3D;
	metric: string;
	telemetry: string;
	description: string;
	color: string;
	pentatonicFreq: number;
	anchorSection?: string;
	hotkey?: string;
}

export interface SpatialDomain extends SpatialNode {
	category: 'domain';
	hotkey: string;
	shortLabel: string;
}

export const SPATIAL_DOMAINS: SpatialDomain[] = [
	{
		id: 'overview',
		name: 'Enterprise Orbit · Macro Overview',
		shortLabel: 'Orbit',
		hotkey: '1',
		category: 'domain',
		tag: 'CEA PRECISION AGRO-ASSETS',
		coordinates: { x: 0, y: 0, z: 120 },
		cameraOffset: { x: 0, y: 40, z: 460 },
		metric: '4,500 Canes/Acre · 2.4× Industry Density',
		telemetry: 'Fully Monitored CEA Agro-Assets · Western Ghats Climes',
		description: 'Precision Controlled Environment Agriculture across Satara and Pune. Engineering high-anthocyanin genetics and institutional cold-chain logistics.',
		color: '#10B981', // Emerald
		pentatonicFreq: 440.0, // A4
		anchorSection: 'hero'
	},
	{
		id: 'cultivars',
		name: 'Cultivar Gene Bank · 5 Elite Superfruits',
		shortLabel: 'Cultivars',
		hotkey: '2',
		category: 'domain',
		tag: 'CERTIFIED VIRUS-INDEXED GENETICS',
		coordinates: { x: -320, y: 110, z: 40 },
		cameraOffset: { x: -320, y: 140, z: 380 },
		metric: '14.2° Peak Brix · 3.2 kg/year',
		telemetry: 'Day-Neutral Continuous Flush & European Primocane Genetics',
		description: 'Exclusive cultivars: San Andreas Strawberry, Maravilla Primocane Raspberry, Karaka Black Blackberry, Golden Ruby Heritage, and Giant Purple Mulberry.',
		color: '#F43F5E', // Rose
		pentatonicFreq: 495.0, // B4
		anchorSection: 'cultivars'
	},
	{
		id: 'satara-skid',
		name: 'Satara CEA Skid 01 · Polyhouse Infrastructure',
		shortLabel: 'Satara CEA',
		hotkey: '3',
		category: 'domain',
		tag: 'AUTOMATED MICROCLIMATE SKID',
		coordinates: { x: 340, y: 80, z: 10 },
		cameraOffset: { x: 340, y: 110, z: 350 },
		metric: '940 µmol/m²/s PAR · 22.4°C Canopy',
		telemetry: 'Automated Dual Ridge Vents · 200µ Anti-Drip UV Film',
		description: 'Commercial 2mm galvanized high-wire trellis CEA polyhouses engineered for severe Western Ghats monsoon winds and high solar radiation.',
		color: '#3B82F6', // Blue
		pentatonicFreq: 528.0, // C5
		anchorSection: 'commercial-models'
	},
	{
		id: 'bio-os',
		name: 'Biological OS & Rhizosphere Bioreactor',
		shortLabel: 'Bio-OS',
		hotkey: '4',
		category: 'domain',
		tag: 'MICROBIAL ORGANIC INOCULATION',
		coordinates: { x: -280, y: -160, z: -80 },
		cameraOffset: { x: -280, y: -130, z: 260 },
		metric: '5.8 Target pH · 1.64 EC',
		telemetry: 'Trichoderma Harzianum & Bacillus Subtilis Consortia',
		description: 'Clean sterile micro-propagation rootstocks and precision biological fertigation suppressing soil-borne pathogens naturally.',
		color: '#06B6D4', // Cyan
		pentatonicFreq: 586.6, // D5
		anchorSection: 'biological-os'
	},
	{
		id: 'roi-engine',
		name: 'Commercial Economics & ROI Engine',
		shortLabel: 'Economics',
		hotkey: '5',
		category: 'domain',
		tag: 'INSTITUTIONAL YIELD MODELS',
		coordinates: { x: 260, y: -140, z: -120 },
		cameraOffset: { x: 260, y: -110, z: 220 },
		metric: '16-Month Breakeven · 48% EBITDA',
		telemetry: 'Guaranteed 5-Star Hospitality & Q-Commerce Off-Take Contracts',
		description: 'Dynamic interactive calculator for capital expenditure, bi-annual crop yields, operating expenditure, and institutional investor returns.',
		color: '#F59E0B', // Amber
		pentatonicFreq: 660.0, // E5
		anchorSection: 'roi-calculator'
	},
	{
		id: 'gallery',
		name: 'Field Photogrammetry & Media Gallery',
		shortLabel: 'Gallery',
		hotkey: '6',
		category: 'domain',
		tag: 'VERIFIED CULTIVAR SPOTLIGHT',
		coordinates: { x: 0, y: 220, z: -180 },
		cameraOffset: { x: 0, y: 250, z: 160 },
		metric: '4K Micro-Photography · 100% Macro Clarity',
		telemetry: 'Frosted Glass Spotlight Stage · Full Translucent Scrim Blur',
		description: 'Unfiltered harvest imagery of fresh punnets, canopy growth, root density, and forced-air cooling cold-chain transit.',
		color: '#8B5CF6', // Purple
		pentatonicFreq: 733.3, // F#5
		anchorSection: 'field-gallery'
	},
	{
		id: 'lead-engine',
		name: 'Frontier Allocation & Triage Terminal',
		shortLabel: 'Inbound Portal',
		hotkey: '7',
		category: 'domain',
		tag: 'HIGH-PRIORITY INTAKE TRIAGE',
		coordinates: { x: 0, y: -200, z: -240 },
		cameraOffset: { x: 0, y: -170, z: 100 },
		metric: 'Sub-30 Min Verification Latency',
		telemetry: 'Automated Lead Qualification · WhatsApp Direct Bridge',
		description: 'Frontier intake terminal for institutional farm investors, retail land partners, and private technical farm tour scheduling.',
		color: '#10B981', // Emerald
		pentatonicFreq: 880.0, // A5
		anchorSection: 'inbound-engine'
	}
];

export const SPATIAL_FACILITY_NODES: SpatialNode[] = [
	{
		id: 'satara-canopy',
		name: 'Satara CEA Skid 01',
		category: 'facility',
		tag: 'CONTROLLED CANOPY & VENTING',
		coordinates: { x: 0, y: 0, z: 0 },
		cameraOffset: { x: 0, y: 30, z: 450 },
		metric: '940 µmol/m²/s PAR · 22.4°C',
		telemetry: 'Canopy 64% RH · 2mm Galvanized Class-B Polyhouse',
		description: 'High-wire trellis canopy maintaining 4,500 canes per acre under 200-micron diffused UV polyethylene with automated ridge venting.',
		color: '#10B981',
		pentatonicFreq: 440.0,
		anchorSection: 'commercial-models'
	},
	{
		id: 'pune-hub',
		name: 'Pune Cold-Chain Terminal',
		category: 'facility',
		tag: 'RAPID FORCED-AIR PRE-COOLING',
		coordinates: { x: 480, y: -90, z: -220 },
		cameraOffset: { x: 480, y: -60, z: 230 },
		metric: '2°C–4°C Entry · 45-Min Pulldown',
		telemetry: 'Zero Cold-Chain Latency · Luxury Hospitality Off-Take',
		description: 'Refrigerated logistics hub supplying 125g calibrated punnets directly to Mumbai & Pune five-star hospitality within 3 hours of harvest.',
		color: '#F43F5E',
		pentatonicFreq: 528.0,
		anchorSection: 'farm-tours'
	},
	{
		id: 'rhizosphere-lab',
		name: 'Substrate Rhizosphere Bioreactor',
		category: 'facility',
		tag: 'MICROBIAL ORGANIC INOCULATION',
		coordinates: { x: -440, y: 140, z: -160 },
		cameraOffset: { x: -440, y: 170, z: 290 },
		metric: '5.8 Target pH · 1.64 EC',
		telemetry: 'Trichoderma & Bacillus Consortia · Phosphorus Solubilization',
		description: 'Precision automated fertigation drenching coir root plugs with biological inoculants, maximizing root uptake and suppressing soil pathogens.',
		color: '#06B6D4',
		pentatonicFreq: 660.0,
		anchorSection: 'biological-os'
	},
	{
		id: 'meristem-nursery',
		name: 'Meristem Micro-Propagation Lab',
		category: 'facility',
		tag: 'VIRUS-INDEXED TISSUE CULTURE',
		coordinates: { x: 220, y: 320, z: -380 },
		cameraOffset: { x: 220, y: 350, z: 70 },
		metric: '99.8% Clonal Genetic Purity',
		telemetry: 'Sterilized Meristem Micro-Plugs · European Genetics',
		description: 'Clean tissue-culture propagation facility generating virus-free, high-vigor rootstocks optimized for Maharashtra diurnal chill-hour profiles.',
		color: '#8B5CF6',
		pentatonicFreq: 880.0,
		anchorSection: 'cultivars'
	}
];

export const SPATIAL_CULTIVAR_ORBITALS: SpatialNode[] = [
	{
		id: 'cultivar-san-andreas',
		name: 'San Andreas Strawberry',
		category: 'cultivar-orbital',
		tag: 'DAY-NEUTRAL HORTICULTURE',
		coordinates: { x: -180, y: -80, z: 90 },
		cameraOffset: { x: -180, y: -50, z: 540 },
		metric: '12.8° Brix · 1.2 kg / plant',
		telemetry: 'Day-Neutral Continuous Flush · October to May Harvest',
		description: 'High-firmness commercial day-neutral strawberry engineered for prolonged off-take and zero transit degradation.',
		color: '#EF4444',
		pentatonicFreq: 495.0,
		anchorSection: 'cultivars'
	},
	{
		id: 'cultivar-maravilla',
		name: 'Maravilla Primocane Raspberry',
		category: 'cultivar-orbital',
		tag: 'HIGH-CANE DENSITY PRIMOCANE',
		coordinates: { x: -120, y: 160, z: -70 },
		cameraOffset: { x: -120, y: 190, z: 380 },
		metric: '13.4° Brix · 1.8 kg / cane',
		telemetry: 'Bi-Annual Double Cropping · Spring & Autumn Harvest Windows',
		description: 'Benchmark global commercial primocane raspberry with high drupelet cohesion and vibrant ruby translucency.',
		color: '#E11D48',
		pentatonicFreq: 586.6,
		anchorSection: 'cultivars'
	},
	{
		id: 'cultivar-karaka-black',
		name: 'Karaka Black Blackberry',
		category: 'cultivar-orbital',
		tag: 'ELONGATED GIANT DRUPELETS',
		coordinates: { x: 240, y: -150, z: -90 },
		cameraOffset: { x: 240, y: -120, z: 360 },
		metric: '14.1° Brix · 12g fruit weight',
		telemetry: 'Early-Season Flush · Dense Anthocyanin Pigmentation',
		description: 'Extraordinary berry sizing with deep obsidian sheen, offering exceptional shelf firmness for five-star pastry applications.',
		color: '#7C3AED',
		pentatonicFreq: 660.0,
		anchorSection: 'cultivars'
	},
	{
		id: 'cultivar-golden-ruby',
		name: 'Golden Ruby Heritage',
		category: 'cultivar-orbital',
		tag: 'ALBINO CAROTENOID FLAVONOID',
		coordinates: { x: -260, y: 220, z: -140 },
		cameraOffset: { x: -260, y: 250, z: 310 },
		metric: '15.2° Brix · Floral Honey Profile',
		telemetry: 'Rare Specialty Niche · Champagne Hospitality Direct',
		description: 'Rare amber champagne raspberry cultivar with high natural sweetness and zero bitter tannin astringency.',
		color: '#F59E0B',
		pentatonicFreq: 733.3,
		anchorSection: 'cultivars'
	},
	{
		id: 'cultivar-mulberry',
		name: 'Giant Purple Mulberry',
		category: 'cultivar-orbital',
		tag: 'MICRO-CLONED BUSH FORM',
		coordinates: { x: 380, y: 190, z: -200 },
		cameraOffset: { x: 380, y: 220, z: 250 },
		metric: '16.5° Brix · Deep Resveratrol',
		telemetry: 'Dwarf Micro-Trained Bush · Ultra-High Antioxidant Superfruit',
		description: 'Controlled dwarf bush architecture delivering rich ruby-purple nectar profiles without tree-climbing harvest overhead.',
		color: '#9333EA',
		pentatonicFreq: 880.0,
		anchorSection: 'cultivars'
	}
];

export const ALL_SPATIAL_NODES: SpatialNode[] = [
	...SPATIAL_DOMAINS,
	...SPATIAL_FACILITY_NODES,
	...SPATIAL_CULTIVAR_ORBITALS
];

export function getSpatialNodeById(id: string): SpatialNode | undefined {
	return ALL_SPATIAL_NODES.find((node) => node.id === id);
}

export function getSpatialDomainById(id: string): SpatialDomain | undefined {
	return SPATIAL_DOMAINS.find((domain) => domain.id === id);
}
