import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Security Headers & Frame Embedding Architecture', () => {
	const vercelJsonPath = path.resolve(process.cwd(), 'vercel.json');
	const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));

	const middlewarePath = path.resolve(process.cwd(), 'middleware.ts');
	const middlewareContent = fs.readFileSync(middlewarePath, 'utf-8');

	it('configures permissive framing for calculator embeds in vercel.json', () => {
		const headers = vercelConfig.headers as Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
		const embedHeader = headers.find((h) => h.source.includes('embed'));

		expect(embedHeader, 'Embed route header configuration missing in vercel.json').toBeDefined();
		const csp = embedHeader?.headers.find((k) => k.key === 'Content-Security-Policy');
		expect(csp?.value).toContain('frame-ancestors *');

		// Ensure X-Frame-Options is NOT set to DENY on embed routes
		const xfo = embedHeader?.headers.find((k) => k.key === 'X-Frame-Options');
		expect(xfo).toBeUndefined();
	});

	it('protects main site against clickjacking using SAMEORIGIN and frame-ancestors self in vercel.json', () => {
		const headers = vercelConfig.headers as Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
		const rootHeader = headers.find((h) => h.source === '/((?!embed/).*)' || h.source === '/(.*)');

		expect(rootHeader, 'Root header configuration missing in vercel.json').toBeDefined();
		const xfo = rootHeader?.headers.find((k) => k.key === 'X-Frame-Options');
		expect(xfo?.value).toBe('SAMEORIGIN');

		const csp = rootHeader?.headers.find((k) => k.key === 'Content-Security-Policy');
		expect(csp?.value).toContain("frame-ancestors 'self'");
	});

	it('uses safe standard HSTS policy without premature preload flags', () => {
		const headers = vercelConfig.headers as Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
		for (const rule of headers) {
			const hsts = rule.headers.find((h) => h.key === 'Strict-Transport-Security');
			if (hsts) {
				expect(hsts.value).not.toContain('preload');
				expect(hsts.value).toContain('max-age=31536000');
			}
		}
	});

	it('injects standard compliant security headers in middleware.ts', () => {
		expect(middlewareContent).toContain('Strict-Transport-Security');
		expect(middlewareContent).toContain('frame-ancestors');
		expect(middlewareContent).not.toContain('preload');
	});
});
