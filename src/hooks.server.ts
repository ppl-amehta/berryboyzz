import type { Handle } from '@sveltejs/kit/hooks';

const HOMEPAGE_MARKDOWN = `# Berryboyzz · Controlled Environment Agriculture (CEA) Superfruit Agro-Assets

> Commercial berry farming, certified tissue-culture nurseries, and high-ROI agro-assets across Pune & Satara, Maharashtra, India.

## Executive Overview
Berryboyzz transforms rural Maharashtra into India's premier controlled-environment berry powerhouse. Operating commercial Naturally Ventilated Polyhouses (NPVH), high-density substrate grow-bays, and certified virus-indexed nurseries, Berryboyzz delivers bi-annual superfruit yields averaging 3.2 kg/m² with guaranteed institutional cold-chain off-take.

## Core Financial & Operational Metrics
- **Location:** Satara-Mahabaleshwar Corridor & Pune, Maharashtra, India
- **Average Yield:** 3.2 kg/m² annually across commercial polyhouse clusters
- **Payback Period:** 16–18 months on turnkey polyhouse installations
- **Projected Internal Rate of Return (IRR):** 32%–48%
- **Water Savings:** 85% reduction compared to traditional soil flood irrigation
- **Primary Cultivars:** Sweet Charlie Strawberry, San Andreas Strawberry, Maravilla Raspberry, Prime-Ark 45 Blackberry, Biloxi Southern Highbush Blueberry

## Commercial Models & Infrastructure Capex
1. **Naturally Ventilated Polyhouse (NPVH):** ₹18,00,000–₹24,00,000 / acre capex. 4.5m gutter height, 200-micron UV-stabilized anti-drip film, automated fertigation.
2. **Medium-Width Polytunnel System:** ₹12,00,000–₹16,00,000 / acre capex. Modular galvanized steel arches for field protection.
3. **Grow-Bay Hydroponic System:** ₹28,00,000–₹36,00,000 / acre capex. Elevated cocopeat/perlite substrate troughs with 100% closed-loop nutrient recirculation.

## Machine-Readable Resources for AI Agents
- [LLM Documentation & Fact Sheet](https://berryboyzz.in/llms.txt)
- [Full Technical Specification](https://berryboyzz.in/llms-full.txt)
- [XML Sitemap](https://berryboyzz.in/sitemap.xml)
- [Cultivars Collection](https://berryboyzz.in/cultivars/)
- [Farm Tours & Masterclasses](https://berryboyzz.in/tours/)
- [About Berryboyzz](https://berryboyzz.in/about/)
- [Contact Agronomy Desk](https://berryboyzz.in/contact/)

## Direct Inquiries
- **Hotline:** +91 88886 81136
- **WhatsApp:** https://wa.me/918888681136
- **Email:** agro@berryboyzz.com
- **Estate:** Satara-Mahabaleshwar CEA Corridor, Satara, Maharashtra 415001, India.
`;

const NOT_FOUND_MARKDOWN = `# 404 Not Found

The requested resource does not exist on Berryboyzz (\`https://berryboyzz.in\`).

Please refer to the following documentation and verified index endpoints:
- [Berryboyzz Homepage](https://berryboyzz.in/)
- [Certified Cultivars](https://berryboyzz.in/cultivars/)
- [Machine-Readable Documentation (llms.txt)](https://berryboyzz.in/llms.txt)
- [Full Technical Specification (llms-full.txt)](https://berryboyzz.in/llms-full.txt)
- [XML Sitemap](https://berryboyzz.in/sitemap.xml)
- [Contact Agronomy Desk](https://berryboyzz.in/contact/)
`;

export const handle: Handle = async ({ event, resolve }) => {
	const accept = event.request.headers.get('accept') || '';
	const isMarkdownRequest = accept.includes('text/markdown');

	if (isMarkdownRequest) {
		const pathname = event.url.pathname;
		if (pathname === '/' || pathname === '/index.html') {
			return new Response(HOMEPAGE_MARKDOWN, {
				status: 200,
				headers: {
					'Content-Type': 'text/markdown; charset=utf-8',
					'Vary': 'Accept',
					'Cache-Control': 'public, max-age=3600, s-maxage=86400'
				}
			});
		}

		// Nonexistent paths or probes requested via Accept: text/markdown
		const validPrefixes = ['/cultivars', '/tours', '/about', '/contact', '/privacy', '/healthz'];
		const isValid = validPrefixes.some(prefix => pathname.startsWith(prefix));

		if (!isValid) {
			return new Response(NOT_FOUND_MARKDOWN, {
				status: 404,
				headers: {
					'Content-Type': 'text/markdown; charset=utf-8',
					'Vary': 'Accept',
					'Cache-Control': 'no-cache'
				}
			});
		}
	}

	const response = await resolve(event);
	response.headers.set('Vary', 'Accept');
	return response;
};
