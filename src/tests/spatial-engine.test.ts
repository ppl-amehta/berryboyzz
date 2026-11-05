// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
	SPATIAL_FACILITY_NODES,
	SPATIAL_CULTIVAR_ORBITALS,
	ALL_SPATIAL_NODES,
	getSpatialNodeById
} from '../lib/spatial/spatial-nodes';
import { BioAcousticSynthesizer, getBioSynthesizer } from '../lib/spatial/bio-synthesizer';
import fs from 'node:fs';
import path from 'node:path';

describe('Frontier Spatial Runtime & Bio-Acoustic Engine', () => {
	it('should verify the 4 core facilities with valid 3D spatial vectors', () => {
		expect(SPATIAL_FACILITY_NODES.length).toBe(4);

		const expectedIds = ['satara-canopy', 'pune-hub', 'rhizosphere-lab', 'meristem-nursery'];
		for (const id of expectedIds) {
			const node = getSpatialNodeById(id);
			expect(node, `Node ${id} missing`).toBeDefined();
			expect(node?.category).toBe('facility');
			expect(node?.coordinates).toBeDefined();
			expect(node?.cameraOffset).toBeDefined();
			expect(typeof node?.coordinates.x).toBe('number');
			expect(typeof node?.coordinates.y).toBe('number');
			expect(typeof node?.coordinates.z).toBe('number');
			expect(node?.pentatonicFreq).toBeGreaterThan(0);
			expect(node?.color).toMatch(/^#[0-9A-F]{6}$/i);
			expect(node?.metric).toBeTruthy();
			expect(node?.description).toBeTruthy();
		}
	});

	it('should verify the 5 dedicated cultivar orbital sub-nodes', () => {
		expect(SPATIAL_CULTIVAR_ORBITALS.length).toBe(5);

		const expectedCultivars = [
			'cultivar-san-andreas',
			'cultivar-maravilla',
			'cultivar-karaka-black',
			'cultivar-golden-ruby',
			'cultivar-mulberry'
		];

		for (const id of expectedCultivars) {
			const orbital = getSpatialNodeById(id);
			expect(orbital, `Orbital ${id} missing`).toBeDefined();
			expect(orbital?.category).toBe('cultivar-orbital');
			expect(orbital?.coordinates).toBeDefined();
			expect(orbital?.cameraOffset).toBeDefined();
			expect(orbital?.pentatonicFreq).toBeGreaterThan(400);
			expect(orbital?.color).toMatch(/^#[0-9A-F]{6}$/i);
			expect(orbital?.metric).toBeTruthy();
		}

		expect(ALL_SPATIAL_NODES.length).toBeGreaterThanOrEqual(9);
	});

	it('should guarantee safe operation of BioAcousticSynthesizer in jsdom', () => {
		const synth = new BioAcousticSynthesizer();
		expect(synth.getActiveStatus()).toBe(false);

		// Safe fallback in environments where Web Audio is absent or mocked
		const status = synth.toggle();
		// In mock jsdom, it safely handles missing AudioContext
		expect(typeof status).toBe('boolean');

		// Safe method calls
		expect(() => synth.updateSpatialDynamics(50, 940)).not.toThrow();
		expect(() => synth.triggerNodeChime(528)).not.toThrow();
		expect(() => synth.dispose()).not.toThrow();

		const singleton = getBioSynthesizer();
		expect(singleton).toBeInstanceOf(BioAcousticSynthesizer);
	});

	it('should verify spatial engine worker architecture and message protocol', () => {
		const workerPath = path.resolve(process.cwd(), 'src/lib/workers/spatial-engine.worker.ts');
		expect(fs.existsSync(workerPath)).toBe(true);

		const content = fs.readFileSync(workerPath, 'utf-8');
		expect(content).toContain('class SpatialEngine');
		expect(content).toContain('OffscreenCanvas');
		expect(content).toContain('INIT');
		expect(content).toContain('RESIZE');
		expect(content).toContain('SET_TARGET_NODE');
		expect(content).toContain('UPDATE_TELEMETRY');
		expect(content).toContain('POINTER_VELOCITY');
		expect(content).toContain('ENGINE_STATUS');
		expect(content).toContain('TRIGGER_NODE_CHIME');
		expect(content).toContain('project3D');
	});

	it('should verify SpatialViewport component integration and interactive glass HUD', () => {
		const componentPath = path.resolve(process.cwd(), 'src/lib/components/SpatialViewport.svelte');
		expect(fs.existsSync(componentPath)).toBe(true);

		const content = fs.readFileSync(componentPath, 'utf-8');
		// Offscreen canvas transfer
		expect(content).toContain('canvasElement.transferControlToOffscreen()');
		expect(content).toContain('new Worker(');

		// Interactive glass HUD badges
		expect(content).toContain('BIO-ACOUSTICS: LIVE');
		expect(content).toContain('BIO-ACOUSTICS: OFF');
		expect(content).toContain('toggleBioAcoustics');

		// 4 Core Facilities & 5 Cultivar Orbitals tabs
		expect(content).toContain('4 Core Facilities');
		expect(content).toContain('5 Cultivar Orbitals');
		expect(content).toContain('SPATIAL_FACILITY_NODES');
		expect(content).toContain('SPATIAL_CULTIVAR_ORBITALS');
	});

	it('should verify homepage integration of unified bottom-up spatial operating system', () => {
		const pagePath = path.resolve(process.cwd(), 'src/routes/+page.svelte');
		const content = fs.readFileSync(pagePath, 'utf-8');

		expect(content).toContain('SpatialHUD');
		expect(content).toContain('SpatialDock');
		expect(content).toContain('SpatialIslandStage');
		expect(content).toContain('spatial-engine.worker');
	});
});
