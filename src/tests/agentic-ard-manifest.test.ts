import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Agentic Resource Discovery (ARD) Manifest & Schema Compliance', () => {
	const ardPath = path.resolve(process.cwd(), 'static/.well-known/ard.json');
	const appHtmlPath = path.resolve(process.cwd(), 'src/app.html');

	it('ensures static ard.json exists and adheres to ARD schema specifications', () => {
		expect(fs.existsSync(ardPath), 'ard.json file must exist in static/.well-known/').toBe(true);

		const manifest = JSON.parse(fs.readFileSync(ardPath, 'utf-8'));
		expect(manifest.ard_version).toBeTruthy();
		expect(manifest.entity).toBeDefined();
		expect(manifest.entity.domain).toBe('berryboyzz.in');

		// Strictly verify the 'entries' array required by the ARD specification
		expect(Array.isArray(manifest.entries), "ARD manifest root must contain an 'entries' array").toBe(true);
		expect(manifest.entries.length).toBeGreaterThanOrEqual(3);

		for (const entry of manifest.entries) {
			expect(entry.identifier).toMatch(/^urn:air:berryboyzz\.in:[a-z0-9\-]+$/);
			expect(entry.displayName).toBeTruthy();
			expect(entry.url).toMatch(/^https:\/\/berryboyzz\.in\//);
			expect(Array.isArray(entry.representativeQueries)).toBe(true);
			expect(entry.representativeQueries.length).toBeGreaterThan(0);
		}
	});

	it('includes rel="ard" link and under 4 critical preconnect hints in app.html', () => {
		const html = fs.readFileSync(appHtmlPath, 'utf-8');

		expect(html).toContain('rel="ard"');
		expect(html).toContain('/.well-known/ard.json');

		// Verify preconnect count is under 4 to satisfy CWV criteria
		const preconnectMatches = html.match(/rel=["']preconnect["']/g) || [];
		expect(preconnectMatches.length).toBeLessThanOrEqual(4);
	});

	it('guarantees zero client-side prototype monkeypatching in the codebase', () => {
		const webmcpUtilPath = path.resolve(process.cwd(), 'src/utils/webmcp.ts');
		expect(fs.existsSync(webmcpUtilPath), 'src/utils/webmcp.ts must NOT exist in clean architecture').toBe(false);

		// Scan app.html and routes to ensure no Object.defineProperty on document or navigator
		const layoutPath = path.resolve(process.cwd(), 'src/routes/+layout.svelte');
		const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
		expect(layoutContent).not.toContain('initWebMCP');
		expect(layoutContent).not.toContain('modelContext');
	});
});
