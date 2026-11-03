import { BERRIES_DATA } from '#data/berriesData';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return BERRIES_DATA.map((b: { id: string }) => ({ slug: b.id }));
};

export const load: PageLoad = ({ params }) => {
  const berry = BERRIES_DATA.find((b: { id: string }) => b.id === params.slug);
  if (!berry) {
    throw error(404, `Cultivar "${params.slug}" not found`);
  }
  return { berry };
};
