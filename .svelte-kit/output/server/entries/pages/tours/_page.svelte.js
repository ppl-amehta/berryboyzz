import { K as spread_props, W as head, N as ensure_array_like, Q as attr, V as stringify } from "../../../chunks/index2.js";
import { T as TOUR_PACKAGES } from "../../../chunks/tourPackages.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { C as Clock } from "../../../chunks/clock.js";
import { M as Map_pin } from "../../../chunks/map-pin.js";
import { A as Arrow_right } from "../../../chunks/arrow-right.js";
import { e as escape_html } from "../../../chunks/context.js";
const __iconData$1 = {
  "name": "compass",
  "size": 24,
  "node": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "path",
      {
        "d": "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"
      }
    ]
  ]
};
__iconData$1.node;
function Compass($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$1 }]));
}
const __iconData = {
  "name": "users",
  "size": 24,
  "node": [
    ["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["path", { "d": "M16 3.128a4 4 0 0 1 0 7.744" }],
    ["path", { "d": "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }]
  ]
};
__iconData.node;
function Users($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
function _page($$renderer) {
  head("1e6ivlg", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Experiential Farm Tours &amp; Agronomy Masterclasses | Berryboyzz</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Join our 3.5-hour Gourmet Harvest Tasting Experience or 6-hour Commercial Agronomy &amp; Tech Study Tour at our flagship farm in Wai-Panchgani Foothills, Satara."/>`);
  });
  $$renderer.push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><header class="max-w-3xl mb-14"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-4">`);
  Compass($$renderer, { class: "w-3.5 h-3.5" });
  $$renderer.push(`<!----> <span>Experiential Field Education</span></div> <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">Farm Visits &amp; Masterclasses</h1> <p class="text-base text-[#4A4643] leading-relaxed">From intimate family harvest tastings in the Wai foothills to deep-dive 6-hour technical agronomy study tours for commercial CEA investors. Walk through active commercial polyhouses with master growers.</p></header> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"><!--[-->`);
  const each_array = ensure_array_like(TOUR_PACKAGES);
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let tour = each_array[$$index_1];
    $$renderer.push(`<article class="estate-card rounded-3xl p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all"><div class="space-y-4"><div class="flex items-center justify-between"><span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#F5F2EB] text-[#4A4643]">`);
    Clock($$renderer, { class: "w-3 h-3 text-emerald-800" });
    $$renderer.push(`<!----> <span>${escape_html(tour.duration)}</span></span> <span class="font-mono-num text-sm font-bold text-emerald-800">`);
    if (tour.id === "harvest-visit") {
      $$renderer.push(`<!--[0-->₹1,250 – ₹1,800`);
    } else {
      $$renderer.push(`<!--[-1-->₹${escape_html(tour.feePerPersonINR.toLocaleString("en-IN"))} / person`);
    }
    $$renderer.push(`<!--]--></span></div> <div><h2 class="font-serif text-2xl font-bold text-[#1A1615] group-hover:text-emerald-900 transition-colors">${escape_html(tour.title)}</h2> <p class="text-xs text-[#6B6661] mt-1 line-clamp-2">${escape_html(tour.tagline)}</p></div> <div class="pt-4 border-t border-[#F0ECE1] space-y-2 text-xs text-[#4A4643]"><div class="flex items-center gap-2">`);
    Map_pin($$renderer, { class: "w-3.5 h-3.5 text-[#6B6661] shrink-0" });
    $$renderer.push(`<!----> <span class="truncate">${escape_html(tour.location)}</span></div> <div class="flex items-center gap-2">`);
    Users($$renderer, { class: "w-3.5 h-3.5 text-[#6B6661] shrink-0" });
    $$renderer.push(`<!----> <span>Max ${escape_html(tour.maxGroupSize)} participants</span></div></div> <div class="pt-2"><span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] block mb-2">Featured Highlights:</span> <ul class="space-y-1 text-xs text-[#262320]"><!--[-->`);
    const each_array_1 = ensure_array_like(tour.includes.slice(0, 3));
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let inc = each_array_1[$$index];
      $$renderer.push(`<li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-800 shrink-0 mt-1.5"></span> <span class="line-clamp-1">${escape_html(inc)}</span></li>`);
    }
    $$renderer.push(`<!--]--></ul></div></div> <div class="pt-6 mt-6 border-t border-[#E8E4DC] flex items-center justify-between"><span class="text-xs font-mono text-[#6B6661]">Code: ${escape_html(tour.whatsappCode)}</span> <a${attr("href", `/tours/${stringify(tour.id)}/`)} class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-900"><span>Full Syllabus &amp; Booking</span> `);
    Arrow_right($$renderer, {
      class: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
    });
    $$renderer.push(`<!----></a></div></article>`);
  }
  $$renderer.push(`<!--]--></div></div>`);
}
export {
  _page as default
};
