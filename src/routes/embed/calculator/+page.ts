import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	return {
		title: 'Berryboyzz Commercial Polyhouse & Berry Farming ROI Calculator'
	};
};
