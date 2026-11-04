import { describe, it, expect } from 'vitest';
import { GET } from '../routes/healthz/+server';

describe('Healthcheck Route (/healthz)', () => {
	it('should return a 200 JSON response with healthy status', async () => {
		const mockEvent = {} as any;
		const response = await GET(mockEvent);

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toContain('application/json');
		expect(response.headers.get('Cache-Control')).toContain('no-store');

		const body = await response.json();
		expect(body.status).toBe('healthy');
		expect(body.version).toBe('1.0.0');
		expect(typeof body.uptime).toBe('number');
		expect(typeof body.timestamp).toBe('string');
	});
});
