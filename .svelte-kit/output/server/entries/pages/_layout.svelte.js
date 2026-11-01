import "clsx";
import { S as Sprout } from "../../chunks/sprout.js";
import { K as spread_props } from "../../chunks/index2.js";
import { I as Icon } from "../../chunks/Icon.js";
import { M as Message_circle } from "../../chunks/message-circle.js";
import { M as Map_pin } from "../../chunks/map-pin.js";
import "../../chunks/client.js";
const __iconData$3 = {
  "name": "arrow-up-right",
  "size": 24,
  "node": [
    ["path", { "d": "M7 7h10v10" }],
    ["path", { "d": "M7 17 17 7" }]
  ]
};
__iconData$3.node;
function Arrow_up_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$3 }]));
}
const __iconData$2 = {
  "name": "mail",
  "size": 24,
  "node": [
    ["path", { "d": "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
    [
      "rect",
      { "x": "2", "y": "4", "width": "20", "height": "16", "rx": "2" }
    ]
  ]
};
__iconData$2.node;
function Mail($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$2 }]));
}
const __iconData$1 = {
  "name": "menu",
  "size": 24,
  "node": [
    ["path", { "d": "M4 5h16" }],
    ["path", { "d": "M4 12h16" }],
    ["path", { "d": "M4 19h16" }]
  ]
};
__iconData$1.node;
function Menu($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$1 }]));
}
const __iconData = {
  "name": "phone",
  "size": 24,
  "node": [
    [
      "path",
      {
        "d": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      }
    ]
  ]
};
__iconData.node;
function Phone($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<header class="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E8E4DC] transition-all"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-20"><a href="/" class="flex items-center gap-3 group"><div class="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-950/10 group-hover:bg-emerald-900 transition-colors">`);
    Sprout($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----></div> <div><span class="font-serif text-xl tracking-tight font-bold text-[#1A1615] block group-hover:text-emerald-900 transition-colors">BERRYBOYZZ</span> <span class="text-[9px] tracking-widest uppercase font-semibold text-[#6B6661] block -mt-0.5">Agro-Assets · Pune &amp; Satara</span></div></a> <nav class="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#4A4643]"><a href="/cultivars/" class="hover:text-emerald-800 transition-colors py-1">Cultivars</a> <a href="/#commercial-models" class="hover:text-emerald-800 transition-colors py-1">Commercial Models</a> <a href="/#roi-calculator" class="hover:text-emerald-800 transition-colors py-1">Capex &amp; ROI</a> <a href="/tours/" class="hover:text-emerald-800 transition-colors py-1">Farm Tours</a> <a href="/#biological-os" class="hover:text-emerald-800 transition-colors py-1">Biological OS</a></nav> <div class="hidden sm:flex items-center gap-3"><a href="tel:+918888681136" class="p-2.5 rounded-xl border border-[#E8E4DC] bg-white text-[#4A4643] hover:text-[#1A1615] hover:border-[#D4CEBF] transition-all" title="Direct Agronomy Desk">`);
    Phone($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----></a> <button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm shadow-emerald-950/10 transition-all hover:shadow-md cursor-pointer">`);
    Message_circle($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>WhatsApp Desk</span></button></div> <div class="md:hidden flex items-center gap-2"><button class="p-2.5 rounded-xl border border-[#E8E4DC] bg-white text-[#1A1615] hover:bg-[#F5F2EB] transition-colors" aria-label="Toggle Navigation Menu">`);
    {
      $$renderer2.push("<!--[-1-->");
      Menu($$renderer2, { class: "w-5 h-5" });
    }
    $$renderer2.push(`<!--]--></button></div></div></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header>`);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<footer class="bg-white border-t border-[#E8E4DC] text-[#1A1615] pt-16 pb-12 mt-24"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E8E4DC]"><div class="md:col-span-1 space-y-4"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center">`);
    Sprout($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----></div> <span class="font-serif text-xl font-bold tracking-tight">BERRYBOYZZ</span></div> <p class="text-xs text-[#4A4643] leading-relaxed">Pioneering controlled-environment precision berry farming across Maharashtra's Pune &amp; Satara agricultural corridors. Certified tissue culture clones, high-density CEA polyhouses, and integrated cold chain off-take partnerships.</p> <div class="flex items-center gap-2 text-xs text-[#6B6661]">`);
    Map_pin($$renderer2, { class: "w-3.5 h-3.5 text-emerald-800 shrink-0" });
    $$renderer2.push(`<!----> <span>Wai-Panchgani Foothills &amp; Satara Plateau, MH</span></div></div> <div class="space-y-3"><h4 class="text-xs font-bold uppercase tracking-wider text-[#6B6661]">Flagship Cultivars</h4> <ul class="space-y-2 text-xs font-medium text-[#1A1615]"><li><a href="/cultivars/raspberry/" class="hover:text-emerald-800 flex items-center justify-between group"><span>Primocane Raspberry</span> `);
    Arrow_up_right($$renderer2, {
      class: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
    });
    $$renderer2.push(`<!----></a></li> <li><a href="/cultivars/blackberry/" class="hover:text-emerald-800 flex items-center justify-between group"><span>Jumbo Blackberry</span> `);
    Arrow_up_right($$renderer2, {
      class: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
    });
    $$renderer2.push(`<!----></a></li> <li><a href="/cultivars/mulberry/" class="hover:text-emerald-800 flex items-center justify-between group"><span>Royal Mulberry (₹80 pack)</span> `);
    Arrow_up_right($$renderer2, {
      class: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
    });
    $$renderer2.push(`<!----></a></li> <li><a href="/cultivars/blueberry/" class="hover:text-emerald-800 flex items-center justify-between group"><span>Southern Highbush Blueberry</span> `);
    Arrow_up_right($$renderer2, {
      class: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
    });
    $$renderer2.push(`<!----></a></li> <li><a href="/cultivars/strawberry/" class="hover:text-emerald-800 flex items-center justify-between group"><span>Tabletop Hydro Strawberry</span> `);
    Arrow_up_right($$renderer2, {
      class: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
    });
    $$renderer2.push(`<!----></a></li></ul></div> <div class="space-y-3"><h4 class="text-xs font-bold uppercase tracking-wider text-[#6B6661]">Commercial &amp; Experiential</h4> <ul class="space-y-2 text-xs font-medium text-[#1A1615]"><li><a href="/#commercial-models" class="hover:text-emerald-800">Naturally Ventilated Polyhouse (NPVH)</a></li> <li><a href="/#commercial-models" class="hover:text-emerald-800">Medium-Width Polytunnel System</a></li> <li><a href="/#commercial-models" class="hover:text-emerald-800">Grow-Bay Hydroponic System</a></li> <li><a href="/tours/harvest-visit/" class="hover:text-emerald-800">Gourmet Harvest Tasting (3.5 Hrs)</a></li> <li><a href="/tours/study-tour/" class="hover:text-emerald-800">Agronomy Tech Study Tour (6 Hrs)</a></li></ul></div> <div class="space-y-3"><h4 class="text-xs font-bold uppercase tracking-wider text-[#6B6661]">Agronomy Inquiry Desk</h4> <p class="text-xs text-[#4A4643]">Connect directly with our senior horticultural team in Satara:</p> <div class="space-y-2 pt-1 text-xs"><a href="tel:+918888681136" class="flex items-center gap-2 text-[#1A1615] font-semibold hover:text-emerald-800">`);
    Phone($$renderer2, { class: "w-3.5 h-3.5 text-emerald-800" });
    $$renderer2.push(`<!----> <span>+91 88886 81136</span></a> <a href="mailto:agro@berryboyzz.com" class="flex items-center gap-2 text-[#4A4643] hover:text-[#1A1615]">`);
    Mail($$renderer2, { class: "w-3.5 h-3.5 text-[#6B6661]" });
    $$renderer2.push(`<!----> <span>agro@berryboyzz.com</span></a></div> <button class="w-full mt-2 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-sm cursor-pointer">`);
    Message_circle($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>WhatsApp Agronomist</span></button></div></div> <div class="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#6B6661]"><div class="space-y-1"><p>© 2026 Berryboyzz Agro-Ventures LLP. All rights reserved.</p> <p class="text-[#8C867E]">* Mandatory Disclosure: Cold chain logistics &amp; SLM charges not included in baseline capex. Projected 16–18 month break-even timelines are modeled upon standard horticultural protocols.</p></div> <div class="flex items-center gap-4 text-xs font-medium"><a href="/#commercial-models" class="hover:underline">Investment Terms</a> <a href="/#biological-os" class="hover:underline">Biological OS</a> <a href="/tours/" class="hover:underline">Farm Visits</a></div></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    $$renderer2.push(`<div class="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1615]">`);
    Navbar($$renderer2);
    $$renderer2.push(`<!----> <main class="flex-grow">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _layout as default
};
