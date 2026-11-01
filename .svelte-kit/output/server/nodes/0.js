import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BOFMHCfm.js","_app/immutable/chunks/CDFQNSq5.js","_app/immutable/chunks/Hq2qUmNQ.js","_app/immutable/chunks/Uu66Es8v.js","_app/immutable/chunks/Bm39_daW.js","_app/immutable/chunks/orRXP5gy.js","_app/immutable/chunks/CV961vCQ.js","_app/immutable/chunks/BWnduUQX.js","_app/immutable/chunks/B0YRWMTd.js","_app/immutable/chunks/SKIVF-tc.js","_app/immutable/chunks/C5CFQwdn.js","_app/immutable/chunks/DvcFQL-y.js","_app/immutable/chunks/CtZbMJ-r.js","_app/immutable/chunks/CYgJF_JY.js"];
export const stylesheets = ["_app/immutable/assets/0.CJDeXJRJ.css"];
export const fonts = [];
