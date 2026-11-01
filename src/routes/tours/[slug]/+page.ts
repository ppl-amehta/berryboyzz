import { TOUR_PACKAGES } from '$data/tourPackages';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return TOUR_PACKAGES.map((t) => ({ slug: t.id }));
};

export const load: PageLoad = ({ params }) => {
  const tour = TOUR_PACKAGES.find((t) => t.id === params.slug);
  if (!tour) {
    throw error(404, `Tour package "${params.slug}" not found`);
  }
  return { tour };
};
