import { describe, it, expect } from 'vitest';
import {
	SPATIAL_DOMAINS,
	SPATIAL_FACILITY_NODES,
	SPATIAL_CULTIVAR_ORBITALS,
	ALL_SPATIAL_NODES,
	getSpatialNodeById,
	type SpatialDomain
} from '../lib/spatial/spatial-nodes';

describe('Spatial Domain Graph & Topology', () => {
	it('defines all 7 core enterprise domains for the bottom-up spatial experience', () => {
		expect(SPATIAL_DOMAINS).toBeDefined();
		expect(SPATIAL_DOMAINS.length).toBe(7);

		const domainIds = SPATIAL_DOMAINS.map((d: SpatialDomain) => d.id);
		expect(domainIds).toContain('overview');
		expect(domainIds).toContain('cultivars');
		expect(domainIds).toContain('satara-skid');
		expect(domainIds).toContain('bio-os');
		expect(domainIds).toContain('roi-engine');
		expect(domainIds).toContain('gallery');
		expect(domainIds).toContain('lead-engine');
	});

	it('assigns unique keyboard shortcut keys [1-7] to all 7 domains', () => {
		const keys = SPATIAL_DOMAINS.map((d: SpatialDomain) => d.hotkey);
		expect(keys).toEqual(['1', '2', '3', '4', '5', '6', '7']);
	});

	it('ensures each spatial domain has valid 3D coordinates, camera offset, and color token', () => {
		SPATIAL_DOMAINS.forEach((domain: SpatialDomain) => {
			expect(typeof domain.coordinates.x).toBe('number');
			expect(typeof domain.coordinates.y).toBe('number');
			expect(typeof domain.coordinates.z).toBe('number');
			expect(typeof domain.cameraOffset.z).toBe('number');
			expect(domain.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
			expect(domain.pentatonicFreq).toBeGreaterThan(0);
		});
	});

	it('includes all 5 cultivar orbitals in ALL_SPATIAL_NODES', () => {
		expect(SPATIAL_CULTIVAR_ORBITALS.length).toBe(5);
		const orbitalIds = SPATIAL_CULTIVAR_ORBITALS.map((o) => o.id);
		expect(orbitalIds).toContain('cultivar-san-andreas');
		expect(orbitalIds).toContain('cultivar-maravilla');
		expect(orbitalIds).toContain('cultivar-karaka-black');
		expect(orbitalIds).toContain('cultivar-golden-ruby');
		expect(orbitalIds).toContain('cultivar-mulberry');
	});

	it('resolves nodes by ID via getSpatialNodeById helper', () => {
		const overview = getSpatialNodeById('overview');
		expect(overview).toBeDefined();
		expect(overview?.name).toContain('Enterprise Orbit');

		const maravilla = getSpatialNodeById('cultivar-maravilla');
		expect(maravilla).toBeDefined();
		expect(maravilla?.metric).toContain('Brix');
	});
});
