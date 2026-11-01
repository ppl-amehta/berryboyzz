// @ts-nocheck
import { BERRIES_DATA } from '$data/berriesData';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return BERRIES_DATA.map((b) => ({ slug: b.id }));
};

export const load = ({ params }: Parameters<PageLoad>[0]) => {
  const berry = BERRIES_DATA.find((b) => b.id === params.slug);
  if (!berry) {
    throw error(404, `Cultivar "${params.slug}" not found`);
  }
  return { berry };
};
