import { B as BERRIES_DATA } from "../../../../chunks/berriesData.js";
import { e as error } from "../../../../chunks/index.js";
const prerender = true;
const entries = () => {
  return BERRIES_DATA.map((b) => ({ slug: b.id }));
};
const load = ({ params }) => {
  const berry = BERRIES_DATA.find((b) => b.id === params.slug);
  if (!berry) {
    throw error(404, `Cultivar "${params.slug}" not found`);
  }
  return { berry };
};
export {
  entries,
  load,
  prerender
};
