import { describe, it, expect } from 'vitest';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../lib/data/gallery-data';
import fs from 'node:fs';
import path from 'node:path';

describe('Media Gallery Architecture & Asset Verification', () => {
	it('should contain a curated manifest of 12 apex items', () => {
		expect(GALLERY_ITEMS.length).toBe(12);
	});

	it('should include all standard categories', () => {
		expect(GALLERY_CATEGORIES).toContain('All');
		expect(GALLERY_CATEGORIES).toContain('Harvest');
		expect(GALLERY_CATEGORIES).toContain('Infrastructure');
		expect(GALLERY_CATEGORIES).toContain('Morphogenesis');
		expect(GALLERY_CATEGORIES).toContain('Off-Take');
		expect(GALLERY_CATEGORIES).toContain('Quality');
	});

	it('should have valid metadata, categories and dimensions for all items', () => {
		for (const item of GALLERY_ITEMS) {
			expect(item.id).toBeTruthy();
			expect(item.title).toBeTruthy();
			expect(item.subtitle).toBeTruthy();
			expect(GALLERY_CATEGORIES).toContain(item.category);
			expect(item.cultivar).toBeTruthy();
			expect(item.location).toBeTruthy();
			expect(item.metric).toBeTruthy();

			// Verify thumbnail specs
			expect(item.thumb.width).toBeGreaterThan(0);
			expect(item.thumb.height).toBeGreaterThan(0);
			expect(item.thumb.aspectRatio).toBeGreaterThan(0);
			expect(item.thumb.webp).toMatch(/^\/gallery\/.*-thumb\.webp$/);
			expect(item.thumb.avif).toMatch(/^\/gallery\/.*-thumb\.avif$/);

			// Verify full-res specs
			expect(item.full.width).toBeGreaterThan(0);
			expect(item.full.height).toBeGreaterThan(0);
			expect(item.full.aspectRatio).toBeGreaterThan(0);
			expect(item.full.webp).toMatch(/^\/gallery\/.*-full\.webp$/);
			expect(item.full.avif).toMatch(/^\/gallery\/.*-full\.avif$/);
		}
	});

	it('should ensure all physical WebP and AVIF static files exist on disk with positive bytes', () => {
		const staticDir = path.resolve(process.cwd(), 'static');

		for (const item of GALLERY_ITEMS) {
			const thumbWebpPath = path.join(staticDir, item.thumb.webp);
			const thumbAvifPath = path.join(staticDir, item.thumb.avif);
			const fullWebpPath = path.join(staticDir, item.full.webp);
			const fullAvifPath = path.join(staticDir, item.full.avif);

			expect(fs.existsSync(thumbWebpPath), `Missing: ${thumbWebpPath}`).toBe(true);
			expect(fs.statSync(thumbWebpPath).size).toBeGreaterThan(1000);

			expect(fs.existsSync(thumbAvifPath), `Missing: ${thumbAvifPath}`).toBe(true);
			expect(fs.statSync(thumbAvifPath).size).toBeGreaterThan(1000);

			expect(fs.existsSync(fullWebpPath), `Missing: ${fullWebpPath}`).toBe(true);
			expect(fs.statSync(fullWebpPath).size).toBeGreaterThan(1000);

			expect(fs.existsSync(fullAvifPath), `Missing: ${fullAvifPath}`).toBe(true);
			expect(fs.statSync(fullAvifPath).size).toBeGreaterThan(1000);
		}
	});
});
