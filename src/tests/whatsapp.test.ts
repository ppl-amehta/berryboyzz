import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl, generateLeadCode, BERRYBOYZZ_WHATSAPP_NUMBER } from '../utils/whatsapp';

describe('WhatsApp Integration Engine (Frontier Deep Link Standards)', () => {
  it('strictly adheres to E.164 digits-only format with no plus or punctuation', () => {
    expect(BERRYBOYZZ_WHATSAPP_NUMBER).toBe('919822188800');
    expect(/^\d+$/.test(BERRYBOYZZ_WHATSAPP_NUMBER)).toBe(true);
    expect(BERRYBOYZZ_WHATSAPP_NUMBER.startsWith('+')).toBe(false);
  });

  it('generates unique, auditable opportunity lead codes matching BB-XXXX-XXXX format', () => {
    const code1 = generateLeadCode();
    const code2 = generateLeadCode();
    expect(code1).toMatch(/^BB-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(code2).toMatch(/^BB-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(code1).not.toBe(code2);
  });

  it('correctly constructs and single-encodes deep URLs for Hero lead', () => {
    const url = buildWhatsAppUrl({ leadSource: 'hero' });
    expect(url.startsWith('https://wa.me/919822188800?text=')).toBe(true);
    expect(url).not.toContain(' ');
    expect(url).not.toContain('%2520'); // No double-encoding
  });

  it('correctly serializes ROI calculator payload with acreage and capex', () => {
    const url = buildWhatsAppUrl({
      leadSource: 'roi_calculator',
      acreage: 5,
      capexCalculated: '₹1.2Cr',
    });
    const decoded = decodeURIComponent(url.split('?text=')[1]);
    expect(decoded).toContain('5 Acre(s)');
    expect(decoded).toContain('₹1.2Cr');
    expect(decoded).toContain('[Ref: BB-');
    // Mobile buffer safety check
    expect(decoded.length).toBeLessThan(350);
  });

  it('correctly constructs berry modal inquiry with specific berry name', () => {
    const url = buildWhatsAppUrl({
      leadSource: 'berry_modal',
      berryName: 'Raspberry',
    });
    const decoded = decodeURIComponent(url.split('?text=')[1]);
    expect(decoded).toContain('Raspberry');
    expect(decoded).toContain('[Ref: BB-');
  });
});
