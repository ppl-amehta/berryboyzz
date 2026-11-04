import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;
export const config = {
	runtime: 'nodejs26.x',
	memory: 256,
	maxDuration: 10
};

export const GET: RequestHandler = () => {
	return json(
		{
			status: 'healthy',
			timestamp: new Date().toISOString(),
			uptime: process.uptime ? Math.floor(process.uptime()) : 0,
			version: '1.0.0'
		},
		{
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate',
				'Content-Type': 'application/json'
			}
		}
	);
};
