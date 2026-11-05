import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { POST } from '../routes/api/inbound-lead/+server';

describe('Frontier Inbound Lead Triage Engine & Agentic Protocols', () => {
  it('should validate and process an institutional commercial investor submission', async () => {
    const payload = {
      role: 'investor',
      name: 'Vikramaditya Singhania',
      organization: 'Singhania Agritech Holdings',
      phone: '+91 98200 12345',
      email: 'vikram@singhania-holdings.com',
      capitalBracket: '₹1 Crore - ₹5 Crore+',
      cropPreference: 'Raspberry & Strawberry Polyhouse',
      notes: 'Interested in 10-acre turnkey commercial cluster in Satara with buyback off-take.',
    };

    const mockRequest = new Request('https://berryboyzz.in/api/inbound-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const response = await POST({ request: mockRequest } as any);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.leadId).toMatch(/^BB-LEAD-[A-Z0-9]{4,10}$/);
    expect(json.priority).toBe('TIER_1_INSTITUTIONAL');
    expect(json.leadScore).toBeGreaterThanOrEqual(80);
    expect(json.sla).toContain('15 minutes');
    expect(json.whatsappUrl).toContain('wa.me');
    expect(json.whatsappUrl).toContain(encodeURIComponent(json.leadId));
    expect(json.dossierUrl).toBe('https://berryboyzz.in/llms-full.txt');
  });

  it('should process an agricultural landowner lead with high priority triage', async () => {
    const payload = {
      role: 'landowner',
      name: 'Anandrao Patil',
      organization: 'Patil Agro Estates',
      phone: '+91 94220 98765',
      email: 'anand.patil@example.com',
      acres: '10',
      landLocation: 'Wai-Panchgani Foothills, Satara',
      waterSource: 'Borewell 24x7 + Dhom Left Bank Canal',
      notes: 'Looking to partner on high-yield protected raspberry farming.',
    };

    const mockRequest = new Request('https://berryboyzz.in/api/inbound-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const response = await POST({ request: mockRequest } as any);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(['TIER_1_INSTITUTIONAL', 'HIGH_PRIORITY_CEA']).toContain(json.priority);
    expect(json.leadScore).toBeGreaterThanOrEqual(75);
    expect(json.sla).toBeTruthy();
  });

  it('should reject invalid or missing required contact fields with HTTP 400', async () => {
    const invalidPayload = {
      role: 'buyer',
      name: 'Fresh Mart India',
      // Missing phone or email
    };

    const mockRequest = new Request('https://berryboyzz.in/api/inbound-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidPayload),
    });

    const response = await POST({ request: mockRequest } as any);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toBeTruthy();
  });

  it('should negotiate Markdown response when requested via Accept: text/markdown', async () => {
    const payload = {
      role: 'tour',
      name: 'Dr. Sunita Deshmukh',
      phone: '+91 98230 55443',
      email: 'sunita.d@univ-agri.edu',
      tourTrack: 'CEA Polyhouse Masterclass',
      groupSize: '5 - 10 Delegates',
    };

    const mockRequest = new Request('https://berryboyzz.in/api/inbound-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/markdown',
      },
      body: JSON.stringify(payload),
    });

    const response = await POST({ request: mockRequest } as any);
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('text/markdown');

    const text = await response.text();
    expect(text).toContain('# Berryboyzz Inbound Registration Confirmed');
    expect(text).toContain('Lead Reference');
    expect(text).toContain('wa.me');
  });

  it('should verify physical presence and JSON validity of Agentic Resource Discovery (.well-known/ard.json)', () => {
    const ardPath = path.resolve(process.cwd(), 'static/.well-known/ard.json');
    expect(fs.existsSync(ardPath)).toBe(true);

    const content = fs.readFileSync(ardPath, 'utf-8');
    const json = JSON.parse(content);

    expect(json.ard_version).toBe('1.0');
    expect(json.entity.name).toBe('Berryboyzz Agro-Ventures LLP');
    expect(json.entity.domain).toBe('berryboyzz.in');
    expect(json.manifests.webmcp).toBe('https://berryboyzz.in/.well-known/webmcp.json');
    expect(json.manifests.llms_txt).toBe('https://berryboyzz.in/llms.txt');
    expect(json.tools).toBeInstanceOf(Array);
    expect(json.tools.some((t: any) => t.name === 'submit_lead')).toBe(true);
  });

  it('should verify physical presence and JSON validity of WebMCP Manifest (.well-known/webmcp.json)', () => {
    const mcpPath = path.resolve(process.cwd(), 'static/.well-known/webmcp.json');
    expect(fs.existsSync(mcpPath)).toBe(true);

    const content = fs.readFileSync(mcpPath, 'utf-8');
    const json = JSON.parse(content);

    expect(json.version).toBe('1.0');
    expect(json.name).toBe('Berryboyzz CEA WebMCP Integration');
    expect(json.tools).toBeInstanceOf(Array);

    const leadTool = json.tools.find((t: any) => t.name === 'submit_inbound_lead');
    expect(leadTool).toBeDefined();
    expect(leadTool.targetUrl).toBe('https://berryboyzz.in/api/inbound-lead');
    expect(leadTool.inputSchema.required).toContain('role');
    expect(leadTool.inputSchema.required).toContain('name');
    expect(leadTool.inputSchema.required).toContain('phone');
  });

  it('should verify security headers, clickjacking mitigation, and HSTS preload policies', () => {
    const vercelConfigPath = path.resolve(process.cwd(), 'vercel.json');
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'));

    // Verify embed route headers
    const embedHeaderRule = vercelConfig.headers.find((h: any) => h.source === '/embed/(.*)');
    expect(embedHeaderRule).toBeDefined();
    const embedCsp = embedHeaderRule.headers.find((h: any) => h.key === 'Content-Security-Policy');
    expect(embedCsp.value).toContain('frame-ancestors *');

    // Verify non-embed route headers (Clickjacking protection & HSTS)
    const mainHeaderRule = vercelConfig.headers.find((h: any) => h.source === '/((?!embed/).*)');
    expect(mainHeaderRule).toBeDefined();
    const mainXfo = mainHeaderRule.headers.find((h: any) => h.key === 'X-Frame-Options');
    expect(mainXfo.value).toBe('SAMEORIGIN');
    const mainCsp = mainHeaderRule.headers.find((h: any) => h.key === 'Content-Security-Policy');
    expect(mainCsp.value).toContain("frame-ancestors 'self'");
    const mainHsts = mainHeaderRule.headers.find((h: any) => h.key === 'Strict-Transport-Security');
    expect(mainHsts.value).toContain('max-age=63072000; includeSubDomains; preload');
  });
});
