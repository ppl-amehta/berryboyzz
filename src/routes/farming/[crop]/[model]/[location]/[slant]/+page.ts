import { error } from '@sveltejs/kit';
import { PROGRAMMATIC_PAGES, type ProgrammaticPageData } from '#data/programmaticSeoData';
import type { PageLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return PROGRAMMATIC_PAGES.map((page) => ({
		crop: page.cropSlug,
		model: page.modelSlug,
		location: page.locationSlug,
		slant: page.slantSlug
	}));
};

export const load: PageLoad = ({ params }) => {
	const page = PROGRAMMATIC_PAGES.find(
		(p) =>
			p.cropSlug === params.crop &&
			p.modelSlug === params.model &&
			p.locationSlug === params.location &&
			p.slantSlug === params.slant
	);

	if (!page) {
		throw error(404, 'Farming guide not found');
	}

	const relatedPages = PROGRAMMATIC_PAGES.filter(
		(p) =>
			(p.cropSlug === page.cropSlug || p.locationSlug === page.locationSlug) &&
			p !== page
	).slice(0, 4);

	return {
		page,
		relatedPages
	};
};
