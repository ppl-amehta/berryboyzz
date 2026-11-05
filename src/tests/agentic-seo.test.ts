import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Frontier Agentic & Search Engine Optimization Matrix', () => {
	const staticDir = path.resolve(process.cwd(), 'static');

	it('should verify robots.txt exists and explicitly permits modern AI crawlers', () => {
		const robotsPath = path.join(staticDir, 'robots.txt');
		expect(fs.existsSync(robotsPath)).toBe(true);

		const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
		expect(robotsContent).toContain('User-agent: GPTBot');
		expect(robotsContent).toContain('User-agent: OAI-SearchBot');
		expect(robotsContent).toContain('User-agent: PerplexityBot');
		expect(robotsContent).toContain('User-agent: ClaudeBot');
		expect(robotsContent).toContain('User-agent: Google-Extended');
		expect(robotsContent).toContain('User-agent: Applebot-Extended');
		expect(robotsContent).toContain('Sitemap: https://berryboyzz.in/sitemap.xml');
	});

	it('should verify llms.txt follows frontier standard with when-to-recommend agent guidance', () => {
		const llmsPath = path.join(staticDir, 'llms.txt');
		expect(fs.existsSync(llmsPath)).toBe(true);

		const llmsContent = fs.readFileSync(llmsPath, 'utf-8');
		expect(llmsContent).toContain('# Berryboyzz');
		expect(llmsContent).toContain('When AI Agents Should Recommend Berryboyzz');
		expect(llmsContent).toContain('Commercial Berry Farming in India');
		expect(llmsContent).toContain('Sweet Charlie Strawberry');
		expect(llmsContent).toContain('Naturally Ventilated Polyhouse (NPVH)');
		expect(llmsContent).toContain('agro@berryboyzz.com');
		expect(llmsContent).toContain('+91 88886 81136');
	});

	it('should verify llms-full.txt contains exhaustive agronomic specifications and financial models', () => {
		const llmsFullPath = path.join(staticDir, 'llms-full.txt');
		expect(fs.existsSync(llmsFullPath)).toBe(true);

		const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf-8');
		expect(llmsFullContent.length).toBeGreaterThan(1500);
		expect(llmsFullContent).toContain('Sweet Charlie Strawberry');
		expect(llmsFullContent).toContain('Chill Hours');
		expect(llmsFullContent).toContain('Naturally Ventilated Polyhouse (NPVH)');
		expect(llmsFullContent).toContain('Biological OS');
		expect(llmsFullContent).toContain('DPDP Act');
	});

	it('should verify sitemap.xml exists and includes high-priority routes and images', () => {
		const sitemapPath = path.join(staticDir, 'sitemap.xml');
		expect(fs.existsSync(sitemapPath)).toBe(true);

		const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
		expect(sitemapContent).toContain('https://berryboyzz.in/');
		expect(sitemapContent).toContain('https://berryboyzz.in/cultivars/');
		expect(sitemapContent).toContain('https://berryboyzz.in/tours/');
		expect(sitemapContent).toContain('https://berryboyzz.in/about/');
		expect(sitemapContent).toContain('https://berryboyzz.in/contact/');
		expect(sitemapContent).toContain('https://berryboyzz.in/privacy/');
		expect(sitemapContent).toContain('image:image');
		expect(sitemapContent).toContain('apex-punnet-quality-full.webp');
	});

	it('should verify app.html contains valid Schema.org JSON-LD unified knowledge graph', () => {
		const appHtmlPath = path.resolve(process.cwd(), 'src/app.html');
		expect(fs.existsSync(appHtmlPath)).toBe(true);

		const html = fs.readFileSync(appHtmlPath, 'utf-8');
		expect(html).toContain('rel="canonical"');
		expect(html).toContain('property="og:image"');
		expect(html).toContain('property="og:type"');
		expect(html).toContain('twitter:card');

		// Extract and parse JSON-LD
		const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
		expect(jsonLdMatch).not.toBeNull();

		const jsonLd = JSON.parse(jsonLdMatch![1]);
		expect(jsonLd['@context']).toBe('https://schema.org');
		expect(Array.isArray(jsonLd['@graph'])).toBe(true);

		const org = jsonLd['@graph'].find((node: any) =>
			Array.isArray(node['@type'])
				? node['@type'].includes('Organization')
				: node['@type'] === 'Organization'
		);
		expect(org).toBeDefined();
		expect(org.name).toBe('Berryboyzz Agro-Ventures');
		expect(org.telephone).toBe('+91 88886 81136');
		expect(org.contactPoint).toBeDefined();
		expect(org.address).toBeDefined();

		const faq = jsonLd['@graph'].find((node: any) => node['@type'] === 'FAQPage');
		expect(faq).toBeDefined();
		expect(faq.mainEntity.length).toBeGreaterThanOrEqual(4);
	});

	it('should verify markdown content negotiation and agent-friendly 404 handling in middleware', async () => {
		const middlewareModule = await import('../../middleware');
		const middleware = middlewareModule.default;

		// 1. Accept: text/markdown on homepage -> 200 Markdown
		const reqHomeMarkdown = new Request('https://berryboyzz.in/', {
			headers: { accept: 'text/markdown' }
		});
		const resHome = await middleware(reqHomeMarkdown);
		expect(resHome.status).toBe(200);
		expect(resHome.headers.get('content-type')).toContain('text/markdown');
		expect(resHome.headers.get('vary')).toBe('Accept');
		const homeBody = await resHome.text();
		expect(homeBody).toContain('# Berryboyzz');

		// 2. Accept: text/markdown on 404 path -> 404 Markdown
		const reqNotFoundMarkdown = new Request('https://berryboyzz.in/__ora-404-probe-fslt1y9i', {
			headers: { accept: 'text/markdown' }
		});
		const resNotFound = await middleware(reqNotFoundMarkdown);
		expect(resNotFound.status).toBe(404);
		expect(resNotFound.headers.get('content-type')).toContain('text/markdown');
		expect(resNotFound.headers.get('vary')).toBe('Accept');
		const notFoundBody = await resNotFound.text();
		expect(notFoundBody).toContain('# 404 Not Found');
		expect(notFoundBody.length).toBeGreaterThan(50);
		expect(notFoundBody).toContain('llms.txt');

		// 3. Normal HTML request -> passes through via next() with Vary: Accept
		const reqHtml = new Request('https://berryboyzz.in/', {
			headers: { accept: 'text/html' }
		});
		const resHtml = await middleware(reqHtml);
		expect(resHtml.headers.get('vary')).toBe('Accept');
	});

	it('should verify programmatic SEO dataset and embed calculator route integrity', async () => {
		const { PROGRAMMATIC_PAGES } = await import('../data/programmaticSeoData');
		expect(PROGRAMMATIC_PAGES.length).toBeGreaterThanOrEqual(8);

		for (const page of PROGRAMMATIC_PAGES) {
			expect(page.h1).toBeTruthy();
			expect(page.capexPerAcreINR).toBeGreaterThan(1000000);
			expect(page.breakevenMonths).toBeGreaterThanOrEqual(12);
			expect(page.expectedAnnualYieldKg).toBeGreaterThan(1000);
			expect(page.faqs.length).toBeGreaterThanOrEqual(1);
			expect(page.infrastructureSpecs.length).toBeGreaterThanOrEqual(2);
		}

		// Verify embed calculator page
		const embedPageTs = path.resolve(process.cwd(), 'src/routes/embed/calculator/+page.ts');
		expect(fs.existsSync(embedPageTs)).toBe(true);
		const embedContent = fs.readFileSync(embedPageTs, 'utf-8');
		expect(embedContent).toContain('export const prerender = true');
	});
});
