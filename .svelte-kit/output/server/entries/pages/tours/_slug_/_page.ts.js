import { T as TOUR_PACKAGES } from "../../../../chunks/tourPackages.js";
import { e as error } from "../../../../chunks/index.js";
const prerender = true;
const entries = () => {
  return TOUR_PACKAGES.map((t) => ({ slug: t.id }));
};
const load = ({ params }) => {
  const tour = TOUR_PACKAGES.find((t) => t.id === params.slug);
  if (!tour) {
    throw error(404, `Tour package "${params.slug}" not found`);
  }
  return { tour };
};
export {
  entries,
  load,
  prerender
};
