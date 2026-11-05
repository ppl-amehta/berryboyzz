import { describe, it, expect } from 'vitest';
import { POST } from '../routes/api/triage/+server';
import type { RequestEvent } from '@sveltejs/kit';

function createMockEvent(body: any): RequestEvent {
	return {
		request: new Request('https://berryboyzz.in/api/triage', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: typeof body === 'string' ? body : JSON.stringify(body)
		})
	} as unknown as RequestEvent;
}

describe('Inbound Commercial Lead Triage API (/api/triage)', () => {
	it('rejects invalid or missing role with 400', async () => {
		const res = await POST(createMockEvent({ fullName: 'Vikram Patel', phone: '+919822188800' }));
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.success).toBe(false);
		expect(data.error).toMatch(/role/i);
	});

	it('rejects invalid contact details with 400', async () => {
		const res = await POST(createMockEvent({ role: 'investor', fullName: 'V', phone: '123' }));
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.success).toBe(false);
		expect(data.error).toMatch(/name|phone/i);
	});

	it('triages an Investor lead with Priority A1 tier for high capex', async () => {
		const res = await POST(createMockEvent({
			role: 'investor',
			fullName: 'Rajesh Singhania',
			phone: '+919876543210',
			email: 'rajesh@singhaniaholdings.com',
			details: {
				capexBracket: '1Cr-5Cr',
				targetAcres: 5,
				timeline: 'immediate'
			}
		}));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.leadId).toMatch(/^BB-INV-[A-Z0-9-]+$/);
		expect(data.tier).toBe('A1');
		expect(data.whatsappUrl).toContain('https://wa.me/918888681136?text=');
		expect(decodeURIComponent(data.whatsappUrl)).toContain('Rajesh Singhania');
		expect(decodeURIComponent(data.whatsappUrl)).toContain('1Cr-5Cr');
	});

	it('triages an Investor lead with Priority A2 tier for mid capex', async () => {
		const res = await POST(createMockEvent({
			role: 'investor',
			fullName: 'Aakash Deshmukh',
			phone: '+919822334455',
			details: {
				capexBracket: '25L-50L',
				targetAcres: 1
			}
		}));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.tier).toBe('A2');
	});

	it('triages a Landowner lead with Priority B1 tier for strategic corridor', async () => {
		const res = await POST(createMockEvent({
			role: 'landowner',
			fullName: 'Nitin Kadam',
			phone: '+919422001122',
			details: {
				acres: 4,
				district: 'Satara',
				waterSource: 'perennial',
				roadAccess: true
			}
		}));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.leadId).toMatch(/^BB-LAND-[A-Z0-9-]+$/);
		expect(data.tier).toBe('B1');
		expect(decodeURIComponent(data.whatsappUrl)).toContain('Satara');
	});

	it('triages a Wholesale Buyer lead with Priority C1 for high volume', async () => {
		const res = await POST(createMockEvent({
			role: 'buyer',
			fullName: 'Priya Sharma',
			phone: '+919988776655',
			details: {
				cultivar: 'Raspberry',
				weeklyVolumeKg: 1200,
				deliveryLocation: 'Mumbai Metro'
			}
		}));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.leadId).toMatch(/^BB-BUY-[A-Z0-9-]+$/);
		expect(data.tier).toBe('C1');
		expect(decodeURIComponent(data.whatsappUrl)).toContain('1200');
	});

	it('triages a Farm Tour Delegation with Priority D1', async () => {
		const res = await POST(createMockEvent({
			role: 'tour',
			fullName: 'Dr. Ashok Bhosale',
			phone: '+919822003344',
			details: {
				groupSize: 8,
				preferredMonth: 'November 2026',
				focusArea: 'Polyhouse Engineering & Fertigation'
			}
		}));

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.leadId).toMatch(/^BB-TOUR-[A-Z0-9-]+$/);
		expect(data.tier).toBe('D1');
	});
});