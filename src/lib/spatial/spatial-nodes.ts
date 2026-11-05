/**
 * BERRYBOYZZ™ Frontier Spatial Web Architecture
 * Multidirectional Spatial Agro-Asset Map & Cultivar Orbital Node Graph
 * Zero-Jank, Non-Linear 3D Coordinate Space
 */

export interface Vector3D {
	x: number;
	y: number;
	z: number;
}

export interface SpatialNode {
	id: string;
	name: string;
	category: 'facility' | 'cultivar-orbital';
	tag: string;
	coordinates: Vector3D;
	cameraOffset: Vector3D;
	metric: string;
	telemetry: string;
	description: string;
	color: string;
	pentatonicFreq: number;
	anchorSection?: string;
}

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
		color: '#10B981', // Emerald
		pentatonicFreq: 440.0, // A4
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
		color: '#F43F5E', // Rose
		pentatonicFreq: 528.0, // C5 ("Solfeggio Transformation")
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
		color: '#06B6D4', // Cyan
		pentatonicFreq: 660.0, // E5
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
		color: '#8B5CF6', // Purple
		pentatonicFreq: 880.0, // A5
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
		color: '#EF4444', // Red
		pentatonicFreq: 495.0, // B4
		anchorSection: 'cultivars'
	},
	{
		id: 'cultivar-maravilla',
		name: 'Maravilla Primocane Raspberry',
		category: 'cultivar-orbital',
		tag: 'DOUBLE-FLUSH PRIMOCANE',
		coordinates: { x: 190, y: -160, z: -80 },
		cameraOffset: { x: 190, y: -130, z: 370 },
		metric: '14.2° Brix · 9,000 kg / acre',
		telemetry: 'Spring Floricane + Autumn Primocane · 250+ Chill Hours',
		description: 'Heavy-cropping European primocane raspberry with large conical drupelets and unmatched market wholesale value.',
		color: '#EC4899', // Pink
		pentatonicFreq: 586.67, // D5
		anchorSection: 'cultivars'
	},
	{
		id: 'cultivar-karaka-black',
		name: 'Karaka Black Blackberry',
		category: 'cultivar-orbital',
		tag: 'HIGH-ANTHOCYANIN GLOSS',
		coordinates: { x: -260, y: 190, z: -60 },
		cameraOffset: { x: -260, y: 220, z: 390 },
		metric: '15.0° Brix · 4–5 Canes/m',
		telemetry: 'Deep Obsidian Shine · Acid-Sweet Sugar Ratio',
		description: 'Heavyweight trailing floricane blackberry producing elongated fruits packed with bioactive anthocyanins and dietary polyphenols.',
		color: '#6366F1', // Indigo
		pentatonicFreq: 660.0, // E5
		anchorSection: 'cultivars'
	},
	{
		id: 'cultivar-golden-ruby',
		name: 'Golden Ruby Heritage',
		category: 'cultivar-orbital',
		tag: 'DUAL-HUE FLAVONOID MUTATION',
		coordinates: { x: 340, y: 110, z: -260 },
		cameraOffset: { x: 340, y: 140, z: 190 },
		metric: '13.5° Brix · High Aromatics',
		telemetry: 'Amber-Rose Gradient · Luxury Garnish Demand',
		description: 'Rare heritage raspberry variety cultivated for premier artisanal gastronomy and pastry decoration.',
		color: '#F59E0B', // Amber
		pentatonicFreq: 733.33, // F#5
		anchorSection: 'cultivars'
	},
	{
		id: 'cultivar-mulberry',
		name: 'Giant Purple Mulberry',
		category: 'cultivar-orbital',
		tag: 'TREE-CANE EXPEDITION CROP',
		coordinates: { x: 40, y: 260, z: -180 },
		cameraOffset: { x: 40, y: 290, z: 270 },
		metric: '18.5° Brix · Low Acid Peak',
		telemetry: 'Clonal Morus Graft · 8–10cm Elongated Berries',
		description: 'Ultra-sweet elongated mulberry yielding heavy flushes with rapid local market absorption.',
		color: '#A855F7', // Purple
		pentatonicFreq: 880.0, // A5
		anchorSection: 'cultivars'
	}
];

export const ALL_SPATIAL_NODES: SpatialNode[] = [
	...SPATIAL_FACILITY_NODES,
	...SPATIAL_CULTIVAR_ORBITALS
];

export function getSpatialNodeById(id: string): SpatialNode | undefined {
	return ALL_SPATIAL_NODES.find((node) => node.id === id);
}
