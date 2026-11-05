import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Frontier Inbound Lead Triage UI Component & Integration', () => {
	const componentPath = path.resolve(process.cwd(), 'src/lib/components/InboundTriageForm.svelte');
	const homePagePath = path.resolve(process.cwd(), 'src/routes/+page.svelte');
	const contactPagePath = path.resolve(process.cwd(), 'src/routes/contact/+page.svelte');

	it('ensures InboundTriageForm.svelte exists and implements 4 commercial stakeholder profiles', () => {
		expect(fs.existsSync(componentPath), 'InboundTriageForm.svelte must exist in src/lib/components/').toBe(true);

		const content = fs.readFileSync(componentPath, 'utf-8');

		// 4 Commercial profiles
		expect(content).toContain('investor');
		expect(content).toContain('landowner');
		expect(content).toContain('buyer');
		expect(content).toContain('tour');

		// Form semantics & progressive enhancement
		expect(content).toContain('<form');
		expect(content).toContain('action="/api/triage"');
		expect(content).toContain('method="POST"');

		// Accessible tablist & ARIA semantics
		expect(content).toContain('role="tablist"');
		expect(content).toContain('role="tab"');
		expect(content).toContain('aria-selected');

		// Strict CWV: Zero synchronous layout reflow patterns
		expect(content).not.toMatch(/\.offsetHeight|\.offsetWidth|\.clientHeight|\.clientWidth|\.getBoundingClientRect\(\)/);
	});

	it('ensures InboundTriageForm is mounted in src/routes/+page.svelte', () => {
		const content = fs.readFileSync(homePagePath, 'utf-8');
		expect(content).toContain('InboundTriageForm');
		expect(content).toContain('<InboundTriageForm');
	});

	it('ensures InboundTriageForm is mounted in src/routes/contact/+page.svelte', () => {
		const content = fs.readFileSync(contactPagePath, 'utf-8');
		expect(content).toContain('InboundTriageForm');
		expect(content).toContain('<InboundTriageForm');
	});
});