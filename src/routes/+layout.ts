import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit-next';

injectAnalytics({ mode: dev ? 'development' : 'production' });

export const prerender = true;
export const trailingSlash = 'always';
