import { W as head, N as ensure_array_like, Q as attr, V as stringify } from "../../../chunks/index2.js";
import { B as BERRIES_DATA } from "../../../chunks/berriesData.js";
import { S as Sparkles } from "../../../chunks/sparkles.js";
import { A as Arrow_right } from "../../../chunks/arrow-right.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("uzvev2", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Flagship Berry Cultivars · Pune &amp; Satara Foothills | Berryboyzz</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Explore certified Primocane Raspberries, Chester Blackberries, Himalayan Long Mulberries, Tabletop Strawberries, and Southern Highbush Blueberries engineered for Maharashtra CEA polyhouses."/>`);
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><header class="max-w-3xl mb-14"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-4">`);
    Sparkles($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Certified Genetic Portfolio</span></div> <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">The Cultivar Collection</h1> <p class="text-base text-[#4A4643] leading-relaxed">Tissue-culture certified, high-anthocyanin superfruits calibrated specifically for controlled environment agriculture (CEA) across the Sahyadri foothills and Satara plateau. Yielding bi-annual commercial flushes with export-grade firmness.</p></header> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
    const each_array = ensure_array_like(BERRIES_DATA);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let berry = each_array[$$index];
      $$renderer2.push(`<article class="estate-card rounded-3xl p-7 flex flex-col justify-between group hover:-translate-y-1 transition-all"><div class="space-y-4"><div class="flex items-center justify-between"><span class="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F5F2EB] text-[#4A4643]">${escape_html(berry.harvestCycleDays.includes("36 months") ? "Mature Yield: 36 Mos" : "Bi-Annual Flush")}</span> <span class="font-mono-num text-xs font-bold text-emerald-800">${escape_html(berry.yieldPerPlantGrams >= 1e3 ? (berry.yieldPerPlantGrams / 1e3).toFixed(1) + " kg/yr" : berry.yieldPerPlantGrams + " g/yr")}</span></div> <div><h2 class="font-serif text-2xl font-bold text-[#1A1615] group-hover:text-emerald-900 transition-colors">${escape_html(berry.name)}</h2> <p class="font-serif italic text-xs text-[#6B6661] mt-0.5">${escape_html(berry.botanicalName)}</p></div> <p class="text-xs text-[#4A4643] leading-relaxed line-clamp-3">${escape_html(berry.description)}</p> <div class="pt-4 border-t border-[#F0ECE1] grid grid-cols-2 gap-2 text-[11px]"><div><span class="text-[#6B6661] block text-[10px] uppercase font-semibold">Sugar Index:</span> <strong class="font-mono-num text-rose-800">${escape_html(berry.tastingNotes.brix)}° Brix</strong></div> <div><span class="text-[#6B6661] block text-[10px] uppercase font-semibold">Substrate:</span> <span class="text-[#1A1615] font-medium truncate block">${escape_html(berry.substrate.split(",")[0])}</span></div></div></div> <div class="pt-6 mt-6 border-t border-[#E8E4DC] flex items-center justify-between"><span class="text-xs font-semibold text-[#1A1615]">`);
      if (berry.id === "mulberry") {
        $$renderer2.push(`<!--[0-->₹80 (100g/200g)`);
      } else if (berry.id === "blueberry") {
        $$renderer2.push(`<!--[1-->₹2,500 / kg mature`);
      } else {
        $$renderer2.push(`<!--[-1-->₹${escape_html(berry.punnetRetailPriceINR)} / punnet`);
      }
      $$renderer2.push(`<!--]--></span> <a${attr("href", `/cultivars/${stringify(berry.id)}/`)} class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-900"><span>Dossier</span> `);
      Arrow_right($$renderer2, {
        class: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
      });
      $$renderer2.push(`<!----></a></div></article>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
