import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Bottom-Up Spatial Page Integration (+page.svelte)', () => {
	const pageFile = path.resolve(process.cwd(), 'src/routes/+page.svelte');
	const content = fs.readFileSync(pageFile, 'utf-8');

	it('eliminates the obsolete 450vh linear scroll container', () => {
		expect(content).not.toContain('h-[450vh]');
	});

	it('integrates the SpatialHUD component', () => {
		expect(content).toContain('SpatialHUD');
	});

	it('integrates the SpatialDock component', () => {
		expect(content).toContain('SpatialDock');
	});

	it('integrates the SpatialIslandStage component', () => {
		expect(content).toContain('SpatialIslandStage');
	});

	it('preserves the complete semantic SEO reader deck with structured sections', () => {
		expect(content).toContain('id="cultivars"');
		expect(content).toContain('id="commercial-models"');
		expect(content).toContain('id="roi-calculator"');
		expect(content).toContain('id="biological-os"');
		expect(content).toContain('id="field-gallery"');
		expect(content).toContain('id="inbound-engine"');
	});

	it('instantiates the worker using offscreen canvas and bio-acoustic synthesizer', () => {
		expect(content).toContain('spatial-engine.worker');
		expect(content).toContain('BioAcousticSynthesizer');
	});
});
