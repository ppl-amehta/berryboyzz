import { describe, it, expect } from 'vitest';
import { SPATIAL_DOMAINS, getSpatialDomainById } from '../lib/spatial/spatial-nodes';

describe('Spatial Island Stage Domain Mapping', () => {
	it('maps every spatial domain to a corresponding functional view', () => {
		const expectedDomains = [
			'overview',
			'cultivars',
			'satara-skid',
			'bio-os',
			'roi-engine',
			'gallery',
			'lead-engine'
		];

		for (const domainId of expectedDomains) {
			const domain = getSpatialDomainById(domainId);
			expect(domain).toBeDefined();
			expect(domain?.name).toBeTruthy();
			expect(domain?.tag).toBeTruthy();
			expect(domain?.telemetry).toBeTruthy();
			expect(domain?.description).toBeTruthy();
		}
	});

	it('maintains deep-link anchors that correspond to page section identifiers', () => {
		const anchors = SPATIAL_DOMAINS.map((d) => d.anchorSection);
		expect(anchors).toContain('hero');
		expect(anchors).toContain('cultivars');
		expect(anchors).toContain('commercial-models');
		expect(anchors).toContain('biological-os');
		expect(anchors).toContain('roi-calculator');
		expect(anchors).toContain('field-gallery');
		expect(anchors).toContain('inbound-engine');
	});
});
