import { K as spread_props, J as derived, N as ensure_array_like, O as attr_class, Q as attr, V as stringify, W as head } from "../../chunks/index2.js";
import "clsx";
import { e as escape_html } from "../../chunks/context.js";
import { T as Thermometer, S as Shield_check } from "../../chunks/thermometer.js";
import { I as Icon } from "../../chunks/Icon.js";
import { A as Arrow_right } from "../../chunks/arrow-right.js";
import { B as BERRIES_DATA } from "../../chunks/berriesData.js";
import { S as Sparkles } from "../../chunks/sparkles.js";
import { M as Message_circle } from "../../chunks/message-circle.js";
import { C as Circle_check } from "../../chunks/circle-check.js";
import { T as TOUR_PACKAGES } from "../../chunks/tourPackages.js";
import { C as Clock } from "../../chunks/clock.js";
import { S as Sprout } from "../../chunks/sprout.js";
const __iconData$a = {
  "name": "activity",
  "size": 24,
  "node": [
    [
      "path",
      {
        "d": "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
      }
    ]
  ]
};
__iconData$a.node;
function Activity($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$a }]));
}
const __iconData$9 = {
  "name": "arrow-down",
  "size": 24,
  "node": [
    ["path", { "d": "M12 5v14" }],
    ["path", { "d": "m19 12-7 7-7-7" }]
  ]
};
__iconData$9.node;
function Arrow_down($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$9 }]));
}
const __iconData$8 = {
  "name": "calculator",
  "size": 24,
  "node": [
    [
      "rect",
      { "width": "16", "height": "20", "x": "4", "y": "2", "rx": "2" }
    ],
    ["line", { "x1": "8", "x2": "16", "y1": "6", "y2": "6" }],
    ["line", { "x1": "16", "x2": "16", "y1": "14", "y2": "18" }],
    ["path", { "d": "M16 10h.01" }],
    ["path", { "d": "M12 10h.01" }],
    ["path", { "d": "M8 10h.01" }],
    ["path", { "d": "M12 14h.01" }],
    ["path", { "d": "M8 14h.01" }],
    ["path", { "d": "M12 18h.01" }],
    ["path", { "d": "M8 18h.01" }]
  ]
};
__iconData$8.node;
function Calculator($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$8 }]));
}
const __iconData$7 = {
  "name": "chevron-right",
  "size": 24,
  "node": [["path", { "d": "m9 18 6-6-6-6" }]]
};
__iconData$7.node;
function Chevron_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$7 }]));
}
const __iconData$6 = {
  "name": "circle-alert",
  "size": 24,
  "node": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["line", { "x1": "12", "x2": "12", "y1": "8", "y2": "12" }],
    [
      "line",
      { "x1": "12", "x2": "12.01", "y1": "16", "y2": "16" }
    ]
  ],
  "aliases": ["alert-circle"]
};
__iconData$6.node;
function Circle_alert($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$6 }]));
}
const __iconData$5 = {
  "name": "circle-check-big",
  "size": 24,
  "node": [
    ["path", { "d": "M21.801 10A10 10 0 1 1 17 3.335" }],
    ["path", { "d": "m9 11 3 3L22 4" }]
  ],
  "aliases": ["check-circle"]
};
__iconData$5.node;
function Circle_check_big($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$5 }]));
}
const __iconData$4 = {
  "name": "dna",
  "size": 24,
  "node": [
    ["path", { "d": "m10 16 1.5 1.5" }],
    ["path", { "d": "m14 8-1.5-1.5" }],
    [
      "path",
      { "d": "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" }
    ],
    ["path", { "d": "m16.5 10.5 1 1" }],
    ["path", { "d": "m17 6-2.891-2.891" }],
    ["path", { "d": "M2 15c6.667-6 13.333 0 20-6" }],
    ["path", { "d": "m20 9 .891.891" }],
    ["path", { "d": "M3.109 14.109 4 15" }],
    ["path", { "d": "m6.5 12.5 1 1" }],
    ["path", { "d": "m7 18 2.891 2.891" }],
    ["path", { "d": "M9 22c1.798-1.998 2.518-3.995 2.807-5.993" }]
  ]
};
__iconData$4.node;
function Dna($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$4 }]));
}
const __iconData$3 = {
  "name": "droplets",
  "size": 24,
  "node": [
    [
      "path",
      {
        "d": "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"
      }
    ],
    [
      "path",
      {
        "d": "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"
      }
    ]
  ]
};
__iconData$3.node;
function Droplets($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$3 }]));
}
const __iconData$2 = {
  "name": "flame",
  "size": 24,
  "node": [
    [
      "path",
      {
        "d": "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
      }
    ]
  ]
};
__iconData$2.node;
function Flame($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$2 }]));
}
const __iconData$1 = {
  "name": "sun",
  "size": 24,
  "node": [
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ]
};
__iconData$1.node;
function Sun($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$1 }]));
}
const __iconData = {
  "name": "warehouse",
  "size": 24,
  "node": [
    [
      "path",
      { "d": "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" }
    ],
    [
      "path",
      {
        "d": "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"
      }
    ],
    ["path", { "d": "M6 13h12" }],
    ["path", { "d": "M6 17h12" }]
  ]
};
__iconData.node;
function Warehouse($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
function MorphogenesisCanvas($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<canvas class="fixed inset-0 pointer-events-none z-0 w-full h-full" aria-hidden="true"></canvas>`);
  });
}
function StoryPhaseOverlay($$renderer, $$props) {
  let { currentPhaseIndex = 0 } = $$props;
  const PHASES = [
    {
      index: 1,
      title: "Phase 01: Genetic Micro-Propagation",
      subtitle: "Meristem Tissue-Culture Clones",
      desc: "Virus-indexed European & North American Primocane clones hardened in sterilized coir plugs.",
      metric: "99.8% Clonal Purity",
      accent: "emerald"
    },
    {
      index: 2,
      title: "Phase 02: Bacto-Rhizosphere Colonization",
      subtitle: "Organic Bacto-Slurry Fertigation",
      desc: "Substrate inoculated with Trichoderma & Bacillus consortia to optimize phosphorus solubilization.",
      metric: "5.8 Target pH · 1.6 EC",
      accent: "emerald"
    },
    {
      index: 3,
      title: "Phase 03: High-Wire Canopy Architecture",
      subtitle: "Controlled Environment Polyhouse",
      desc: "T-Trellis trellising maintaining 4–5 dominant fruiting canes per linear meter for 360° light interception.",
      metric: "4,500 Plants / Acre",
      accent: "emerald"
    },
    {
      index: 4,
      title: "Phase 04: Blossom & Precision Pollination",
      subtitle: "Day-Neutral Synchronized Flowering",
      desc: "Bumblebee integration ensures 100% conical fruit shape and complete drupelet fertilization.",
      metric: "100% Conical Drupelet Shape",
      accent: "amber"
    },
    {
      index: 5,
      title: "Phase 05: Anthocyanin Drupelet Swelling",
      subtitle: "Brix Maximization & Bio-PGRs",
      desc: "Rapid sucrose and anthocyanin accumulation. High-potassium bio-drenching yields deep pigment saturation.",
      metric: "14.5°–19.5° Brix Rating",
      accent: "rose"
    },
    {
      index: 6,
      title: "Phase 06: Dawn Harvest & Pre-Cooling",
      subtitle: "Hand-Harvested Before 10:00 AM",
      desc: "Single-touch picking directly into export punnets. Immediate forced-air cooling down to 2°C–4°C in 45 minutes.",
      metric: "2°C–4°C Cold Chain Entry",
      accent: "blue"
    },
    {
      index: 7,
      title: "Phase 07: Direct Supermarket & Export Supply",
      subtitle: "Commercial Liquidation · ₹2,500 / kg",
      desc: "Refrigerated van logistics to luxury five-star hospitality, high-end metropolitan grocers, and air cargo.",
      metric: "₹2,500 / kg Price Point",
      accent: "emerald"
    }
  ];
  const phase = derived(() => PHASES[Math.min(Math.max(currentPhaseIndex, 0), 6)]);
  $$renderer.push(`<div class="fixed top-24 left-4 sm:left-8 z-20 max-w-sm sm:max-w-md pointer-events-none"><div class="estate-card p-6 rounded-3xl bg-white/95 backdrop-blur-md border-[#E8E4DC] shadow-xl space-y-3 pointer-events-auto"><div class="flex items-center justify-between"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">Living Morphogenesis</span> <span class="font-mono-num text-xs font-bold text-[#6B6661]">Stage 0${escape_html(phase().index)} / 07</span></div> <div><h2 class="font-serif text-2xl font-bold text-[#1A1615] leading-tight">${escape_html(phase().title)}</h2> <p class="text-xs font-serif italic text-emerald-800 mt-0.5">${escape_html(phase().subtitle)}</p></div> <p class="text-xs text-[#4A4643] leading-relaxed">${escape_html(phase().desc)}</p> <div class="pt-2 border-t border-[#F0ECE1] flex items-center justify-between"><span class="text-[11px] font-mono font-bold text-emerald-900 bg-[#F5F2EB] px-2.5 py-1 rounded-lg">${escape_html(phase().metric)}</span> <span class="text-[10px] text-[#6B6661] uppercase tracking-wider font-semibold">Scroll to progress</span></div></div></div>`);
}
function TelemetryTicker($$renderer) {
  $$renderer.push(`<div class="fixed bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md border-t border-[#E8E4DC] py-2 px-4 hidden sm:block"><div class="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-[#4A4643] font-mono-num"><div class="flex items-center gap-6"><div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span> <strong class="text-[#1A1615]">SATARA TELEMETRY:</strong></div> <div class="flex items-center gap-1.5">`);
  Thermometer($$renderer, { class: "w-3.5 h-3.5 text-[#6B6661]" });
  $$renderer.push(`<!----> <span>22.4°C CEA Canopy</span></div> <div class="flex items-center gap-1.5">`);
  Droplets($$renderer, { class: "w-3.5 h-3.5 text-[#6B6661]" });
  $$renderer.push(`<!----> <span>64% RH Optimal</span></div> <div class="flex items-center gap-1.5">`);
  Sun($$renderer, { class: "w-3.5 h-3.5 text-amber-600" });
  $$renderer.push(`<!----> <span>PAR 940 µmol/m²/s</span></div> <div class="hidden lg:flex items-center gap-1.5">`);
  Activity($$renderer, { class: "w-3.5 h-3.5 text-emerald-700" });
  $$renderer.push(`<!----> <span>Fertigation EC 1.64 · pH 5.75</span></div></div> <div class="flex items-center gap-2 text-[#6B6661] text-[10px] uppercase font-bold tracking-wider">`);
  Circle_check_big($$renderer, { class: "w-3 h-3 text-emerald-700" });
  $$renderer.push(`<!----> <span>100% Biological OS In Compliance</span></div></div></div>`);
}
function ScarcityBanner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="bg-[#FBF8EF] border-y border-[#EADBBD] py-3.5 px-4 sm:px-6 lg:px-8"><div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"><div class="flex items-center gap-3"><span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">`);
    Flame($$renderer2, { class: "w-3 h-3 text-amber-700" });
    $$renderer2.push(`<!----> <span>Cohort 04 Active</span></span> <span class="text-[#262320] font-medium">Satara Foothills Corridor · Opportunity Cost: <strong class="font-mono-num text-amber-950 font-bold">₹2,50,000 / Acre / month CEA</strong></span></div> <div class="flex items-center gap-4"><span class="text-[#6B6661] text-[11px] hidden md:inline">Only 3 commercial allocations remaining for Q2 planting</span> <button class="inline-flex items-center gap-1 font-bold text-emerald-900 hover:text-emerald-950 hover:underline uppercase tracking-wider text-[11px] cursor-pointer"><span>Lock Allocation</span> `);
    Arrow_right($$renderer2, { class: "w-3 h-3" });
    $$renderer2.push(`<!----></button></div></div></div>`);
  });
}
function BerryShowcase($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedBerryId = BERRIES_DATA[0].id;
    const currentBerry = derived(() => BERRIES_DATA.find((b) => b.id === selectedBerryId) || BERRIES_DATA[0]);
    $$renderer2.push(`<section id="cultivars" class="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] border-t border-[#E8E4DC]"><div class="max-w-7xl mx-auto"><div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"><div class="max-w-2xl"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">`);
    Sparkles($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Flagship Clonal Portfolio</span></div> <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">The 5 Commercial Superfruits</h2> <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">Engineered for bi-annual flushes (1.6 kg/harvest = 3.2 kg/year per plant) and mature yields up to 2.5 kg/plant for Southern Highbush Blueberries.</p></div> <a href="/cultivars/" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950"><span>View Full Technical Dossiers</span> `);
    Arrow_right($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----></a></div> <div class="flex gap-2 pb-4 overflow-x-auto border-b border-[#E8E4DC] mb-8"><!--[-->`);
    const each_array = ensure_array_like(BERRIES_DATA);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let berry = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class(`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${selectedBerryId === berry.id ? "bg-emerald-800 text-white shadow-sm" : "bg-white text-[#4A4643] border border-[#E8E4DC] hover:border-[#D4CEBF]"}`)}>${escape_html(berry.name)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="estate-card rounded-3xl p-8 sm:p-12 bg-white border-[#E8E4DC]"><div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"><div class="lg:col-span-7 space-y-6"><div><span class="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-3 inline-block">${escape_html(currentBerry().genetics)}</span> <h3 class="font-serif text-3xl sm:text-4xl font-bold text-[#1A1615]">${escape_html(currentBerry().name)}</h3> <p class="font-serif italic text-sm text-[#6B6661] mt-0.5">${escape_html(currentBerry().botanicalName)}</p></div> <p class="text-sm text-[#262320] leading-relaxed">${escape_html(currentBerry().description)}</p> <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2"><div class="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E4DC]"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-0.5">Annual Yield</span> <strong class="font-mono-num text-lg font-bold text-emerald-800">${escape_html(currentBerry().yieldPerPlantGrams >= 1e3 ? (currentBerry().yieldPerPlantGrams / 1e3).toFixed(1) + " kg / yr" : currentBerry().yieldPerPlantGrams + " g / yr")}</strong></div> <div class="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E4DC]"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-0.5">Brix Index</span> <strong class="font-mono-num text-lg font-bold text-rose-800">${escape_html(currentBerry().tastingNotes.brix)}° Bx</strong></div> <div class="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E4DC] col-span-2 sm:col-span-1"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-0.5">Price Point</span> <strong class="text-xs font-bold text-[#1A1615] block mt-1">`);
    if (currentBerry().id === "mulberry") {
      $$renderer2.push(`<!--[0-->₹80 (100g/200g)`);
    } else if (currentBerry().id === "blueberry") {
      $$renderer2.push(`<!--[1-->₹2,500 / kg mature`);
    } else {
      $$renderer2.push(`<!--[-1-->₹${escape_html(currentBerry().punnetRetailPriceINR)} / punnet`);
    }
    $$renderer2.push(`<!--]--></strong></div></div> <div class="flex items-center gap-4 pt-4"><a${attr("href", `/cultivars/${stringify(currentBerry().id)}/`)} class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-[#E8E4DC] hover:border-[#D4CEBF] text-[#1A1615] transition-all"><span>Full Dossier &amp; Recipe</span> `);
    Arrow_right($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----></a> <button class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm transition-all cursor-pointer">`);
    Message_circle($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Inquire Crop Availability</span></button></div></div> <div class="lg:col-span-5 bg-[#FAF9F6] p-7 rounded-3xl border border-[#E8E4DC] space-y-5"><h4 class="font-serif text-xl font-bold text-[#1A1615] pb-3 border-b border-[#E8E4DC]">Rhizosphere &amp; Protocol</h4> <div class="space-y-3 text-xs text-[#262320]"><div><span class="text-[#6B6661] block text-[10px] uppercase font-bold">Substrate Composition:</span> <p class="font-medium mt-0.5">${escape_html(currentBerry().substrate)}</p></div> <div><span class="text-[#6B6661] block text-[10px] uppercase font-bold">Micro-Climate Control:</span> <p class="font-medium mt-0.5">${escape_html(currentBerry().idealClimate.temperatureRange)} · ${escape_html(currentBerry().idealClimate.rhRange)}</p></div> <div><span class="text-[#6B6661] block text-[10px] uppercase font-bold">Tasting Sensory Profile:</span> <p class="italic text-[#4A4643] mt-0.5">"${escape_html(currentBerry().tastingNotes.acidity)}"</p></div></div> <div class="pt-2"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-2">B2B Channels:</span> <div class="flex flex-wrap gap-1.5"><!--[-->`);
    const each_array_1 = ensure_array_like(currentBerry().b2bSupplyChannels);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let ch = each_array_1[$$index_1];
      $$renderer2.push(`<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-[#E8E4DC] text-[#4A4643]">${escape_html(ch)}</span>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></div></div></section>`);
  });
}
const COMMERCIAL_MODELS = [
  {
    id: "polyhouse-nvph",
    name: "Naturally Ventilated Polyhouse (NPVH)",
    subtitle: "High-Output Protected CEA Infrastructure for Pune & Satara (After 16 Months)",
    idealFor: "Commercial growers targeting export & luxury domestic retail off-take",
    minLandRequired: "0.5 Acre (2,000 sq.m)",
    capexPerAcreINR: 44e5,
    // ₹44 Lakhs (₹38 Lakhs with NHB subsidy)
    expectedAnnualYieldKg: 9e3,
    // 4,500 plants x 1.5kg x 2 flushes = 8k-10k kg
    breakevenMonths: 16,
    irrPercentage: 36.5,
    systemSpecs: {
      structure: "GI Pipe Galvanized Arch Structure (Class-B 2mm) with 200-micron UV-stabilized anti-drip film",
      climateControl: "Top & side automated roll-up motorized curtains with 40-mesh insect screens",
      irrigation: "Automated pressure-compensating drip with inline Venturi fertilizer injectors",
      monitoring: "Digital Temp, RH, and PAR lux monitoring sensors"
    },
    features: [
      "4,500 plants/acre yielding 8,000–10,000 kg annually (1.5 kg × 2 flushes)",
      "Capex: ₹44 Lakhs/Acre (₹38 Lakhs net of National Horticulture Board subsidy)",
      "Break-even timeline achieved after 16 months of establishment",
      "Cold chain logistics & SLM charges not included"
    ],
    recommendedBerries: ["Raspberry", "Blackberry", "Strawberry"]
  },
  {
    id: "polytunnel-walk-in",
    name: "Medium-Width Polytunnel System (M.W.P. Tunnel)",
    subtitle: "Agile Protected Cultivation for Satara Corridors (After 16 Months)",
    idealFor: "Phased commercial expansions and medium-scale landholders",
    minLandRequired: "0.5 Acre",
    capexPerAcreINR: 25e5,
    // ₹25 Lakhs (setup baseline ₹28L)
    expectedAnnualYieldKg: 9e3,
    // 4,500 plants, 8k-10k kg
    breakevenMonths: 16,
    irrPercentage: 38.2,
    systemSpecs: {
      structure: "Modular hoop arches anchored with ground screws, quick-deploy plastic skin",
      climateControl: "End-wall sliding louvers and passive thermal convection venting",
      irrigation: "Micro-sprinklers for canopy cooling + root-zone dripper lines",
      monitoring: "Analog soil-moisture tensiometers and temperature dataloggers"
    },
    features: [
      "4,500 plants/acre producing 8,000–10,000 kg annual harvest",
      "Cost-effective ₹25 Lakhs capex per acre (₹18L–₹20L base + 15% / ₹28L setup)",
      "Break-even horizon within 16 months",
      "Cold chain logistics & SLM charges not included"
    ],
    recommendedBerries: ["Raspberry", "Blackberry", "Mulberry"]
  },
  {
    id: "recirculating-grow-bag",
    name: "Grow-Bay Hydroponic System",
    subtitle: "Zero Soil Contamination, 100% Rhizosphere Precision Control (After 16 Months)",
    idealFor: "Areas with hard rocky soil, saline groundwater, or nematodes",
    minLandRequired: "0.25 Acre",
    capexPerAcreINR: 35e5,
    // ₹35 Lakhs (range ₹35L - ₹38L)
    expectedAnnualYieldKg: 13e3,
    // 6,000 plants, 12k-14k kg
    breakevenMonths: 16,
    irrPercentage: 39.5,
    systemSpecs: {
      structure: "Ground weed-matting + elevated drainage stands with gutter collection",
      climateControl: "Integrated shade net (35% white/black thermal reflection)",
      irrigation: "Closed-loop automated fertigation skid with EC/pH feedback loops",
      monitoring: "Daily leachate drain EC, pH, and water consumption telemetry"
    },
    features: [
      "6,000 plants/acre high-density grow-bag layout yielding 12,000–14,000 kg annually",
      "Turnkey setup at ₹35 Lakhs – ₹38 Lakhs per acre",
      "Saves up to 70% irrigation water through leachate recycling and targeted delivery",
      "Cold chain logistics & SLM charges not included"
    ],
    recommendedBerries: ["Blueberry", "Raspberry", "Strawberry"]
  },
  {
    id: "fully-automated-iot",
    name: "Fully Automated Precision Facility (FIOI Setup)",
    subtitle: "Autonomous Climate, Fertigation & Dosing Suite (After 16 Months)",
    idealFor: "Institutional corporate farming and remote hands-off investors",
    minLandRequired: "1.0 Acre",
    capexPerAcreINR: 75e5,
    // ₹70L - ₹85L (₹87 Lakhs setup)
    expectedAnnualYieldKg: 16e3,
    // 12k - 18k kg / 15k - 20k kg
    breakevenMonths: 16,
    irrPercentage: 42,
    systemSpecs: {
      structure: "Multi-span sawtooth gutter-connected polyhouse with automated ridge vents",
      climateControl: "High-pressure misting/foggers (50 bar) + evaporative cooling pad & fan system",
      irrigation: "Multi-channel A/B/C acid fertigation computer dosing dynamically per solar Joule",
      monitoring: "Cloud-synced telemetry: leaf temperature thermal cameras, EC/pH sensors, soil moisture arrays"
    },
    features: [
      "Premium yields of 12,000–18,000 kg (up to 15,000–20,000 kg mature)",
      "Turnkey capex ₹70L – ₹85L per acre (₹87 Lakhs full infrastructure setup)",
      "Zero human error in nutrient delivery; exact EC/pH curves maintained 24/7",
      "Cold chain logistics & SLM charges not included"
    ],
    recommendedBerries: ["Blueberry", "Raspberry", "Blackberry", "Strawberry"]
  },
  {
    id: "urban-rooftop-farm",
    name: "Urban Setup Rooftop Micro-Farm (1,500 – 2,000 sq.ft)",
    subtitle: "Ultra-Local Freshness: Balconies, Patios & Urban Terrace Agri-Tech (After 16 Months)",
    idealFor: "Urban entrepreneurs, luxury hotels, and culinary clubs in Pune/Mumbai",
    minLandRequired: "1,500 – 2,000 sq.ft (Rooftop / Terrace)",
    capexPerAcreINR: 12e5,
    // ₹12 Lakhs total setup
    expectedAnnualYieldKg: 2500,
    // 2000 - 3000 kg from 600 - 2,000 plants
    breakevenMonths: 16,
    irrPercentage: 44,
    systemSpecs: {
      structure: "Lightweight aluminum framework with aerodynamic wind baffling",
      climateControl: "Ultrasonic micro-humidifiers and overhead micro-misting",
      irrigation: "Compact gravity or 0.5HP pressure booster drip kit on smart timer",
      monitoring: "WiFi IoT controller with push notification alerts"
    },
    features: [
      "600 to 2,000 containerized plants producing 2,000–3,000 kg fresh fruit annually",
      "Complete terrace setup for ₹12 Lakhs (1,500 – 2,000 sq.ft)",
      "Harvest-to-plate within 15 minutes; zero transit carbon footprint",
      "Cold chain logistics & SLM charges not included"
    ],
    recommendedBerries: ["Strawberry", "Blueberry", "Raspberry"]
  }
];
const BIOLOGICAL_OS_PILLARS = [
  {
    step: 1,
    title: "High-Genetics Tissue Culture & Imported Clones",
    code: "GENOMICS-TC",
    summary: "Virus-indexed, certified disease-free micropropagated plants from world-class European and North American nurseries.",
    scientificMechanism: "Meristem-tip micropropagation eliminates systemic viral loads. Primocane varieties guarantee fruiting on current-season first-year wood without mandatory chilling cycles.",
    deliverables: [
      "Genetic authenticity certificate for every clonal batch",
      "Complete lab screening report against raspberry bushy dwarf virus & latent ringspot",
      "Hardened, plug-established saplings with active mycorrhizal root colonization"
    ],
    auditFrequency: "At batch dispatch & 30 days post-transplant"
  },
  {
    step: 2,
    title: "Fertilizer Input & Bacto-Rich Rhizosphere Development",
    code: "RHIZO-BACTO",
    summary: "Proprietary slurry development and fermented microbial consortia to stimulate hyper-vigorous nutrient uptake.",
    scientificMechanism: "Liquid formulations of Bacillus subtilis, Trichoderma harzianum, and Azospirillum solubilize bound phosphorus and chelate micronutrients while stimulating plant growth regulators (PGRs).",
    deliverables: [
      "Customized monthly fertigation schedule matched to plant phenology",
      "Concentrated Bacto-Liquid microbial inoculants supplied per acre",
      "Organic PGR boosters formulated for drupelet swelling & Brix maximization"
    ],
    auditFrequency: "Bi-weekly substrate leachate testing"
  },
  {
    step: 3,
    title: "Operating System & Dedicated Agronomy Team",
    code: "OPS-CORE",
    summary: "Standard operating protocols (SOPs) governing every hour of farm management from sunrise irrigation to evening canopy management.",
    scientificMechanism: "Systematic task queues eliminate grower guesswork. Daily logs track fertigation volume, canopy leaf-area index, pest scouting thresholds, and flower-to-fruit transformation rates.",
    deliverables: [
      "Digitized Farm OS task management dashboard",
      "Dedicated on-site farm supervisor training and certification",
      "Direct agronomy hotline with 2-hour response SLA for operational emergencies"
    ],
    auditFrequency: "Continuous digital logging"
  },
  {
    step: 4,
    title: "Agronomist Field Visits & Diagnostic Schedules",
    code: "AGRO-AUDIT",
    summary: "Senior horticultural agronomists conduct scheduled physical site audits with precision diagnostic equipment.",
    scientificMechanism: "Handheld chlorophyll meters (SPAD), digital refractometers (Brix), and sap-analysis tools detect nutrient deficiencies 10 days before visual leaf symptoms emerge.",
    deliverables: [
      "Comprehensive physical audit report with actionable photographic action items",
      "Immediate chemical & biological intervention adjustments",
      "Seasonal pruning and canopy architecture optimization guidance"
    ],
    auditFrequency: "Bi-monthly scheduled physical audits"
  },
  {
    step: 5,
    title: "Cold-Chain Logistics & Controlled Atmosphere Transit",
    code: "COLD-CHAIN",
    summary: "Unbroken refrigerated transit from farm gate to supermarket shelf, arresting respiration within 45 minutes of harvest.",
    scientificMechanism: "Forced-air rapid pre-cooling pulls core berry pulp temperature down to 2°C–4°C, lowering ethylene synthesis and extending fresh punnet shelf life from 3 days to 14 days.",
    deliverables: [
      "GPS-tracked temperature-logged reefer vans servicing Pune, Mumbai, and Goa daily",
      "Export-grade vented 125g punnets with food-grade anti-microbial absorbent pads",
      "Guaranteed cold-dock acceptance protocols with tier-1 luxury retailers"
    ],
    auditFrequency: "Per-shipment temperature data-logger telemetry"
  },
  {
    step: 6,
    title: "Guaranteed B2B Off-Take Partnerships & Market Linkages",
    code: "OFF-TAKE",
    summary: "Contractual off-take agreements with luxury hotel chains, modern trade grocers, and pastry institutions eliminating market price volatility.",
    scientificMechanism: "Aggregated cold-chain supply secures pre-negotiated fixed price contracts per punnet, insulating the grower from local mandi fluctuations and distress selling.",
    deliverables: [
      "Signed 3-year commercial off-take purchase agreement",
      "Transparent weekly weight receipts and digital payment settlement",
      "Direct access to high-margin export air cargo quotas to Middle East markets"
    ],
    auditFrequency: "Weekly settlement statements"
  }
];
const INVESTMENT_TIERS = [
  {
    id: "tier-1-home",
    badge: "BALCONY HOME KIT · 5 PLANTS",
    name: "Balcony Home Kit (5 Plants)",
    tagline: "Experience and verify elite berry genetics firsthand in your private space.",
    capitalRequired: "₹15,000",
    rawCapitalINR: 15e3,
    // ₹2,999 per plant x 5 plants = ₹15,000
    targetAudience: "Gardeners, culinary enthusiasts, and curious prospective investors wishing to test plant vigor.",
    deliverables: [
      "5 Hardened Tissue-Culture Berry Saplings (₹2,999 per plant package)",
      "10L Aerated Coco-Coir & Perlite planting substrate with slow-release organic nutrients",
      "1L Bacto-Liquid microbial rhizosphere booster + foliar spray pack",
      "Step-by-step master handbook & WhatsApp personal grower support",
      "Cold chain logistics & SLM charges not included"
    ],
    financialModel: {
      turnaround: "First harvest in 75–90 days on your balcony",
      yieldReturn: "5 plants × 5 kg = 25 kg/harvest = 50 kg/year × ₹1,500 = ₹75,000 gross fruit value",
      payoutCycle: "Personal harvest enjoyment & culinary value",
      buybackGuarantee: "100% plant replacement guarantee if establishment fails within 30 days"
    },
    whatsappLeadCode: "BB-LEAD-HOME-T1"
  },
  {
    id: "tier-2-commercial-1000",
    badge: "COMMERCIAL STARTER UNIT · 1,000 PLANTS",
    name: "Commercial Starter Unit (1,000 Plants)",
    tagline: "Turnkey commercial pilot asset yielding 2,000 kg annually with rapid capital recovery.",
    capitalRequired: "₹35,00,000",
    rawCapitalINR: 35e5,
    // 1000 plants x ₹3500 each = ₹35,00,000
    targetAudience: "Independent farmers, progressive landholders, and weekend agri-entrepreneurs with 0.25 to 0.5 acre.",
    deliverables: [
      "1,000 Certified Primocane Tissue-Culture Plants (@ ₹3,500 per plant package)",
      "Complete micro-drip fertigation manifold with precision pressure emitters",
      "1,000 UV-treated 35L substrate grow-bags or raised bed trellising materials",
      "Quarterly on-site agronomist visits + full 12-month fertigation inputs package",
      "B2B packaging punnet boxes and guaranteed off-take purchase support",
      "Cold chain logistics & SLM charges not included"
    ],
    financialModel: {
      turnaround: "After 16 months per kg per plant gives full break-even at 18 Months",
      yieldReturn: "Yield: 1,000 kg × 2 (twice a year) = 2,000 kg × ₹1,500/kg = ₹30,00,000 annual revenue",
      payoutCycle: "Bi-annual picking flushes with weekly liquidation payouts",
      buybackGuarantee: "Contractual off-take agreement for 100% Grade-A punnets produced"
    },
    whatsappLeadCode: "BB-LEAD-COMM-1000-T2"
  },
  {
    id: "tier-3-rent-plants",
    badge: "LEASE PLANTS · MANAGED SYNDICATE",
    name: "Lease Plants in Operational Farm",
    tagline: "Own high-yield berry plants in our active Pune/Satara farms; we do 100% of the operational work.",
    capitalRequired: "₹2,500 – ₹3,500 / Plant (Blocks of 50 to 200)",
    rawCapitalINR: 15e4,
    // Baseline: 50 plants @ ₹3000 avg = ₹1,50,000
    targetAudience: "Urban professionals and NRIs seeking hands-off, passive agricultural cash flow without owning rural land.",
    deliverables: [
      "Lease blocks from 50 plants (₹1.25L–₹1.75L) up to 200 plants (₹5.0L–₹7.0L)",
      "Full professional farming, agronomy, water, nutrient, and labour management included",
      "Live 24/7 IoT camera & sensor dashboard access to your plant block",
      "Quarterly doorstep dispatch of 2kg luxury fresh berries + artisanal jams for your family",
      "Cold chain logistics & SLM charges not included"
    ],
    financialModel: {
      turnaround: "Payouts commence from the 2nd agricultural quarter (After 16 Months)",
      yieldReturn: "24% – 32% target annualized passive return on deployed plant capital",
      payoutCycle: "Quarterly electronic bank transfer directly to your account",
      buybackGuarantee: "Full capital exit option at the end of the 36-month plant lifecycle"
    },
    whatsappLeadCode: "BB-LEAD-RENTAL-T3"
  },
  {
    id: "tier-4-your-land-our-farm",
    badge: "MEGA SCALE PROJECT · 50 ACRES",
    name: "Mega Scale Project: Your Land — Our Farm",
    tagline: "Turnkey transformation of 50 acres into an institutional CEA berry powerhouse.",
    capitalRequired: "₹40,00,00,000 (₹40 Crore / 50-Acre Scale)",
    rawCapitalINR: 4e8,
    // ₹40 Cr per 50-Acre farm setup
    targetAudience: "High-Net-Worth Individuals (HNIs), institutional land aggregators, family offices, and corporate farming estates.",
    deliverables: [
      "Master planning, topographic survey, and climate engineering for 50-Acre corridor",
      "Setup cost: ₹48L – ₹65L – ₹85L per Acre setup cost + operational management",
      "World-class Naturally Ventilated Polyhouse (NPVH) & polytunnel infrastructure erection",
      "Complete automated fertigation skids, RO water filtration, and solar backup systems",
      "Resident Senior Agronomist + dedicated permanent operating crew stationed on site",
      "Integrated on-farm forced-air pre-cooling cold storage facility (2°C)",
      "10-Year institutional off-take contract with global supermarket chains and export airfreight",
      "Cold chain logistics & SLM charges not included"
    ],
    financialModel: {
      turnaround: "Commissioning in 120 days; break-even targeted after 16–18 months",
      yieldReturn: "₹2.8Cr – ₹4.2Cr projected annual net EBITDA per 10-acre block at mature production",
      payoutCycle: "Monthly financial audits and escrow-cleared liquidation payouts",
      buybackGuarantee: "10-year tripartite buyback off-take guarantee and bankable agricultural asset appraisal"
    },
    whatsappLeadCode: "BB-LEAD-SYNDICATE-50ACRE-T4"
  }
];
function CEAInfrastructure($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section id="commercial-models" class="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] border-t border-[#E8E4DC]"><div class="max-w-7xl mx-auto"><div class="max-w-3xl mb-14"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">`);
    Warehouse($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Controlled Environment Agriculture (CEA)</span></div> <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">Commercial Farm Engineering (Pune &amp; Satara)</h2> <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">Five precision-engineered protected cultivation structures calibrated for Sahyadri wind loads, solar radiation, and micro-climate regulation. All commercial setups reach capital break-even within 16–18 months.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
    const each_array = ensure_array_like(COMMERCIAL_MODELS);
    for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
      let model = each_array[$$index_2];
      $$renderer2.push(`<article class="estate-card rounded-3xl p-7 flex flex-col justify-between group hover:-translate-y-1 transition-all"><div class="space-y-4"><div><span class="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 block w-fit mb-2">Min. Land: ${escape_html(model.minLandRequired)}</span> <h3 class="font-serif text-2xl font-bold text-[#1A1615] group-hover:text-emerald-950 transition-colors">${escape_html(model.name)}</h3> <p class="text-xs text-[#6B6661] mt-1 font-medium">${escape_html(model.subtitle)}</p></div> <div class="grid grid-cols-2 gap-3 py-3 border-y border-[#F0ECE1] text-xs"><div><span class="text-[10px] uppercase font-bold text-[#6B6661] block">Capex / Setup</span> <strong class="font-mono-num text-base font-bold text-[#1A1615]">₹${escape_html((model.capexPerAcreINR / 1e5).toFixed(0))} Lakhs</strong></div> <div><span class="text-[10px] uppercase font-bold text-[#6B6661] block">Annual Yield</span> <strong class="font-mono-num text-base font-bold text-emerald-800">${escape_html(model.expectedAnnualYieldKg.toLocaleString("en-IN"))} kg</strong></div></div> <ul class="space-y-2 text-xs text-[#262320]"><!--[-->`);
      const each_array_1 = ensure_array_like(model.features);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let feature = each_array_1[$$index];
        $$renderer2.push(`<li class="flex items-start gap-2.5">`);
        Circle_check($$renderer2, { class: "w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" });
        $$renderer2.push(`<!----> <span class="leading-relaxed font-medium">${escape_html(feature)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul> <div class="pt-2"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1.5">Recommended Crops:</span> <div class="flex flex-wrap gap-1.5"><!--[-->`);
      const each_array_2 = ensure_array_like(model.recommendedBerries);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let crop = each_array_2[$$index_1];
        $$renderer2.push(`<span class="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#F5F2EB] text-[#1A1615]">${escape_html(crop)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="pt-6 mt-6 border-t border-[#E8E4DC]"><button class="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-[#1A1615] border border-[#E8E4DC] hover:border-emerald-800 hover:text-emerald-900 transition-all cursor-pointer">`);
      Message_circle($$renderer2, { class: "w-3.5 h-3.5" });
      $$renderer2.push(`<!----> <span>Inquire Infrastructure Setup</span></button></div></article>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
  });
}
function DynamicROICalculator($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const MODELS = [
      {
        id: "nvph",
        name: "Naturally Ventilated Polyhouse (NPVH)",
        priceRange: "₹32L – ₹40L / Acre",
        capexPerAcre: 36e5,
        setupCostPerAcre: 48e5,
        yieldMultiplier: 1,
        opexPerAcre: 48e4
      },
      {
        id: "polytunnel",
        name: "Medium-Width Polytunnel (M.W. Tunnel)",
        priceRange: "₹18L – ₹20L / Acre",
        capexPerAcre: 2e6,
        setupCostPerAcre: 28e5,
        yieldMultiplier: 0.85,
        opexPerAcre: 39e4
      },
      {
        id: "growbay",
        name: "Grow-Bay Hydroponic System",
        priceRange: "₹35L – ₹38L / Acre",
        capexPerAcre: 365e4,
        setupCostPerAcre: 38e5,
        yieldMultiplier: 1.15,
        opexPerAcre: 44e4
      },
      {
        id: "fioi",
        name: "Fully Integrated Precision Facility (FIOI)",
        priceRange: "₹65L – ₹80L / Acre",
        capexPerAcre: 725e4,
        setupCostPerAcre: 87e5,
        yieldMultiplier: 1.45,
        opexPerAcre: 58e4
      }
    ];
    const BERRY_PRICING = {
      raspberry: {
        name: "Primocane Raspberry",
        baseYieldKgPerAcre: 12500,
        avgWholesalePricePerKg: 1560
      },
      blackberry: {
        name: "Jumbo Blackberry",
        baseYieldKgPerAcre: 14e3,
        avgWholesalePricePerKg: 1680
      },
      strawberry: {
        name: "Tabletop Strawberry",
        baseYieldKgPerAcre: 18e3,
        avgWholesalePricePerKg: 880
      },
      blueberry: {
        name: "Southern Highbush Blueberry",
        baseYieldKgPerAcre: 8500,
        avgWholesalePricePerKg: 2240
      }
    };
    let acreage = 2.5;
    let selectedModelId = "nvph";
    let selectedBerryKey = "raspberry";
    let includeSubsidy = true;
    const model = derived(() => MODELS.find((m) => m.id === selectedModelId) || MODELS[0]);
    const berry = derived(() => BERRY_PRICING[selectedBerryKey] || BERRY_PRICING.raspberry);
    const calculations = derived(() => {
      const rawCapex = acreage * model().capexPerAcre;
      const setupCost = acreage * model().setupCostPerAcre;
      const eligibleSubsidy = Math.min(rawCapex * 0.4, 4e6);
      const netCapex = rawCapex - eligibleSubsidy;
      const annualYieldKg = Math.round(acreage * berry().baseYieldKgPerAcre * model().yieldMultiplier);
      const annualGrossRevenue = annualYieldKg * berry().avgWholesalePricePerKg;
      const annualOpex = acreage * model().opexPerAcre;
      const annualNetEBITDA = annualGrossRevenue - annualOpex;
      const rawMonths = annualNetEBITDA > 0 ? netCapex / (annualNetEBITDA / 12) : 36;
      const breakevenMonths = Math.max(16, Math.min(18, Math.round(rawMonths)));
      const roiAnnualPercentage = netCapex > 0 ? (annualNetEBITDA / netCapex * 100).toFixed(1) : "0";
      return {
        rawCapex,
        setupCost,
        eligibleSubsidy,
        netCapex,
        annualYieldKg,
        annualGrossRevenue,
        annualOpex,
        annualNetEBITDA,
        breakevenMonths,
        roiAnnualPercentage
      };
    });
    $$renderer2.push(`<section id="roi-calculator" class="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]"><div class="max-w-7xl mx-auto"><div class="max-w-3xl mb-14"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">`);
    Calculator($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Capex Horizon &amp; Yield Engine</span></div> <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">Interactive Commercial ROI Modeler</h2> <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">Dynamically simulate deployed capital, National Horticulture Board (NHB) subsidies, seasonal harvest revenue, and net EBITDA for CEA farms in Pune and Satara.</p></div> <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-7 estate-card rounded-3xl p-6 sm:p-8 space-y-8"><div class="space-y-3"><div class="flex justify-between items-center"><label for="acreage-slider" class="text-xs font-bold uppercase tracking-wider text-[#1A1615]">Land Parcel Size</label> <span class="font-mono-num text-xl font-bold text-emerald-800">${escape_html(acreage)} <span class="text-xs font-sans font-medium text-[#6B6661]">Acres</span></span></div> <input id="acreage-slider" type="range" min="0.5" max="10" step="0.5"${attr("value", acreage)} class="w-full h-2 bg-[#E8E4DC] rounded-lg appearance-none cursor-pointer accent-emerald-800"/> <div class="flex justify-between text-[11px] text-[#6B6661]"><span>0.5 Acre (Pilot)</span> <span>2.5 Acres (Commercial standard)</span> <span>10 Acres (Syndicate)</span></div></div> <div class="space-y-3"><span class="text-xs font-bold uppercase tracking-wider text-[#1A1615] block">Protected Structure Infrastructure</span> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><!--[-->`);
    const each_array = ensure_array_like(MODELS);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let m = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class(`p-4 rounded-2xl text-left border transition-all cursor-pointer ${selectedModelId === m.id ? "bg-[#F4F9F4] border-emerald-700 shadow-sm" : "bg-white border-[#E8E4DC] hover:border-[#D4CEBF]"}`)}><div class="flex justify-between items-start mb-1"><strong${attr_class(`text-xs font-bold ${selectedModelId === m.id ? "text-emerald-950" : "text-[#1A1615]"} block`)}>${escape_html(m.name)}</strong></div> <div class="text-[11px] font-mono text-[#6B6661]">Range: ${escape_html(m.priceRange)}</div> <div class="text-[10px] text-emerald-800 font-semibold mt-1">Setup: ₹${escape_html((m.setupCostPerAcre / 1e5).toFixed(0))}L/Acre baseline</div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="space-y-3"><span class="text-xs font-bold uppercase tracking-wider text-[#1A1615] block">Target Berry Crop</span> <div class="grid grid-cols-2 sm:grid-cols-4 gap-2"><!--[-->`);
    const each_array_1 = ensure_array_like(Object.entries(BERRY_PRICING));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let [key, val] = each_array_1[$$index_1];
      $$renderer2.push(`<button type="button"${attr_class(`p-3 rounded-xl text-center border text-xs font-medium transition-all cursor-pointer ${selectedBerryKey === key ? "bg-emerald-800 text-white border-emerald-800 shadow-sm" : "bg-white text-[#1A1615] border-[#E8E4DC] hover:border-[#D4CEBF]"}`)}>${escape_html(val.name.split(" ")[0])}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="flex items-center justify-between p-4 rounded-2xl bg-[#F5F2EB] border border-[#E8E4DC]"><div class="space-y-0.5"><span class="text-xs font-bold text-[#1A1615] block">National Horticulture Board (NHB) Subsidy</span> <span class="text-[11px] text-[#6B6661] block">40% subsidy on eligible CEA capital expenditures (capped at ₹40L)</span></div> <label class="relative inline-flex items-center cursor-pointer"><input type="checkbox"${attr("checked", includeSubsidy, true)} class="sr-only peer"/> <div class="w-11 h-6 bg-[#D8D3CA] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-800"></div></label></div> <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2.5">`);
    Circle_alert($$renderer2, { class: "w-4 h-4 shrink-0 text-amber-800 mt-0.5" });
    $$renderer2.push(`<!----> <span><strong>Mandatory Notice:</strong> Cold chain logistics &amp; SLM charges not included in base capex. Projections assume strict adherence to Berryboyzz fertigation and climate SOPs.</span></div></div> <div class="lg:col-span-5 estate-card rounded-3xl p-6 sm:p-8 space-y-6 bg-white border-[#E8E4DC] shadow-lg shadow-emerald-950/5"><div class="pb-4 border-b border-[#E8E4DC]"><span class="text-[10px] uppercase font-bold tracking-wider text-[#6B6661] block mb-1">Financial Output · ${escape_html(acreage)} Acres</span> <h3 class="font-serif text-2xl font-bold text-[#1A1615]">Executive Projections</h3></div> <div class="space-y-3.5 text-xs"><div class="flex justify-between items-center py-2 border-b border-[#F0ECE1]"><span class="text-[#6B6661]">Gross Turnkey Capex:</span> <strong class="font-mono-num text-sm text-[#1A1615]">₹${escape_html((calculations().rawCapex / 1e5).toFixed(2))} Lakhs</strong></div> `);
    if (calculations().eligibleSubsidy > 0) {
      $$renderer2.push(`<!--[0--><div class="flex justify-between items-center py-2 border-b border-[#F0ECE1] text-emerald-800"><span>Est. NHB Capital Subsidy:</span> <strong class="font-mono-num text-sm">- ₹${escape_html((calculations().eligibleSubsidy / 1e5).toFixed(2))} Lakhs</strong></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex justify-between items-center p-3.5 rounded-xl bg-[#F5F2EB] border border-[#E8E4DC]"><span class="font-semibold text-[#1A1615]">Net Deployed Capital:</span> <strong class="font-mono-num text-base font-bold text-emerald-900">₹${escape_html((calculations().netCapex / 1e5).toFixed(2))} Lakhs</strong></div> <div class="grid grid-cols-2 gap-3 pt-2"><div class="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC]"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Annual Yield</span> <strong class="font-mono-num text-sm text-[#1A1615]">${escape_html(calculations().annualYieldKg.toLocaleString("en-IN"))} kg</strong></div> <div class="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC]"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Gross Revenue</span> <strong class="font-mono-num text-sm text-emerald-800">₹${escape_html((calculations().annualGrossRevenue / 1e5).toFixed(2))}L / yr</strong></div></div> <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3"><div class="flex justify-between items-center"><div><span class="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">Est. Net Annual EBITDA:</span> <strong class="font-mono-num text-xl font-bold text-emerald-950">₹${escape_html((calculations().annualNetEBITDA / 1e5).toFixed(2))} Lakhs / year</strong></div> <div class="text-right"><span class="text-[10px] uppercase font-bold text-[#6B6661] block">Break-Even:</span> <strong class="font-mono-num text-sm font-bold text-emerald-800">After ${escape_html(calculations().breakevenMonths)} Months</strong></div></div></div></div> <button class="w-full py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer">`);
    Message_circle($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Send This Financial Model to WhatsApp Desk</span></button></div></div></div></section>`);
  });
}
function InvestmentLadder($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section id="investment-tiers" class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E8E4DC]"><div class="max-w-7xl mx-auto"><div class="max-w-3xl mb-14"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">`);
    Shield_check($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Institutional Agro-Asset Portfolios</span></div> <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">Capital Deployment Tiers</h2> <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">From 5-plant balcony validation kits to turnkey 50-Acre institutional syndicates. Backed by certified genomics, automated precision irrigation, and contractual off-take agreements.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
    const each_array = ensure_array_like(INVESTMENT_TIERS);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let tier = each_array[$$index_1];
      $$renderer2.push(`<article${attr_class(`estate-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-all ${tier.id === "tier-2-commercial-1000" ? "border-emerald-700 ring-1 ring-emerald-700/20" : ""}`)}><div class="space-y-4"><div><span class="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F5F2EB] text-[#4A4643] block w-fit mb-2">${escape_html(tier.badge)}</span> <h3 class="font-serif text-xl font-bold text-[#1A1615]">${escape_html(tier.name)}</h3></div> <div class="py-3 border-y border-[#F0ECE1]"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-0.5">Capital Required</span> <strong class="font-mono-num text-xl font-bold text-emerald-800 block">${escape_html(tier.capitalRequired)}</strong></div> <p class="text-xs text-[#4A4643] leading-relaxed">${escape_html(tier.tagline)}</p> <div class="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC] space-y-1.5 text-[11px]"><div class="text-emerald-900 font-semibold">${escape_html(tier.financialModel.yieldReturn)}</div> <div class="text-[#6B6661]">Timeline: ${escape_html(tier.financialModel.turnaround)}</div></div> <div class="space-y-2 pt-2"><span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] block">Key Inclusions:</span> <ul class="space-y-1.5 text-xs text-[#262320]"><!--[-->`);
      const each_array_1 = ensure_array_like(tier.deliverables.slice(0, 3));
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let deliv = each_array_1[$$index];
        $$renderer2.push(`<li class="flex items-start gap-2">`);
        Circle_check($$renderer2, { class: "w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" });
        $$renderer2.push(`<!----> <span class="leading-relaxed line-clamp-2">${escape_html(deliv)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div> <div class="pt-6 mt-6 border-t border-[#E8E4DC] space-y-2"><span class="text-[10px] text-[#8C867E] block text-center">* Cold chain logistics &amp; SLM not included</span> <button${attr_class(`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider ${tier.id === "tier-2-commercial-1000" ? "bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm" : "bg-[#FAF9F6] text-[#1A1615] border border-[#E8E4DC] hover:border-[#D4CEBF]"} transition-all cursor-pointer`)}>`);
      Message_circle($$renderer2, { class: "w-3.5 h-3.5" });
      $$renderer2.push(`<!----> <span>Inquire Allocation</span></button></div></article>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
  });
}
function BiologicalOS($$renderer) {
  $$renderer.push(`<section id="biological-os" class="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E8E4DC]"><div class="max-w-7xl mx-auto"><div class="max-w-3xl mb-14"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">`);
  Dna($$renderer, { class: "w-3.5 h-3.5" });
  $$renderer.push(`<!----> <span>Proprietary Agronomic Framework</span></div> <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">The 6-Pillar Biological Operating System</h2> <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">Commercial berry cultivation in Maharashtra fails when treated like open-field farming. Our integrated Biological OS governs every parameter from tissue culture multiplication to cold-dock supermarket acceptance.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
  const each_array = ensure_array_like(BIOLOGICAL_OS_PILLARS);
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let pillar = each_array[$$index_1];
    $$renderer.push(`<article class="estate-card rounded-3xl p-7 flex flex-col justify-between"><div class="space-y-4"><div class="flex items-center justify-between"><span class="w-8 h-8 rounded-full bg-emerald-800 text-white font-mono text-xs font-bold flex items-center justify-center">0${escape_html(pillar.step)}</span> <span class="text-[10px] font-mono font-bold tracking-wider uppercase text-[#6B6661] bg-[#F5F2EB] px-2.5 py-1 rounded-md">${escape_html(pillar.code)}</span></div> <h3 class="font-serif text-xl font-bold text-[#1A1615]">${escape_html(pillar.title)}</h3> <p class="text-xs text-[#4A4643] leading-relaxed">${escape_html(pillar.summary)}</p> <div class="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC] text-[11px] text-[#262320] leading-relaxed italic">"${escape_html(pillar.scientificMechanism)}"</div> <div class="space-y-1.5 pt-2"><span class="text-[10px] font-bold uppercase tracking-wider text-[#6B6661] block">Key Deliverables:</span> <ul class="space-y-1 text-xs text-[#262320]"><!--[-->`);
    const each_array_1 = ensure_array_like(pillar.deliverables);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let deliv = each_array_1[$$index];
      $$renderer.push(`<li class="flex items-start gap-2">`);
      Circle_check($$renderer, { class: "w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" });
      $$renderer.push(`<!----> <span class="leading-relaxed font-medium">${escape_html(deliv)}</span></li>`);
    }
    $$renderer.push(`<!--]--></ul></div></div> <div class="pt-5 mt-5 border-t border-[#E8E4DC] text-[11px] text-[#6B6661] flex justify-between items-center"><span>Audit Frequency:</span> <strong class="text-[#1A1615] font-semibold">${escape_html(pillar.auditFrequency)}</strong></div></article>`);
  }
  $$renderer.push(`<!--]--></div></div></section>`);
}
function FarmTourBooking($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const harvestTour = TOUR_PACKAGES.find((t) => t.id === "harvest-visit") || TOUR_PACKAGES[0];
    const studyTour = TOUR_PACKAGES.find((t) => t.id === "study-tour") || TOUR_PACKAGES[1];
    $$renderer2.push(`<section id="farm-tours" class="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] border-t border-[#E8E4DC]"><div class="max-w-7xl mx-auto"><div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"><div class="max-w-2xl"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">`);
    Clock($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Experiential Agro-Tourism</span></div> <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">Visit Our Satara Polyhouses</h2> <p class="text-sm sm:text-base text-[#4A4643] leading-relaxed">Walk between living canes in our Wai-Panchgani research facilities. Taste ripe berries directly from the vine or master the complete CEA engineering syllabus.</p></div> <a href="/tours/" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950"><span>View All 5 Masterclasses</span> `);
    Arrow_right($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----></a></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><article class="estate-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between"><div class="space-y-5"><div class="flex items-center justify-between"><span class="px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F5F2EB] text-[#4A4643]">${escape_html(harvestTour.duration)}</span> <span class="font-mono-num text-lg font-bold text-emerald-800">₹1,250 / ₹1,500 / ₹1,800</span></div> <div><h3 class="font-serif text-3xl font-bold text-[#1A1615]">${escape_html(harvestTour.title)}</h3> <p class="text-xs text-[#6B6661] mt-1 font-medium">${escape_html(harvestTour.tagline)}</p></div> <div class="space-y-2.5 pt-3 text-xs text-[#262320]"><!--[-->`);
    const each_array = ensure_array_like(harvestTour.includes.slice(0, 5));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let inc = each_array[$$index];
      $$renderer2.push(`<div class="flex items-start gap-2.5">`);
      Circle_check($$renderer2, { class: "w-4 h-4 text-emerald-800 shrink-0 mt-0.5" });
      $$renderer2.push(`<!----> <span class="leading-relaxed font-medium">${escape_html(inc)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="pt-8 mt-8 border-t border-[#E8E4DC] flex items-center justify-between gap-4"><a href="/tours/harvest-visit/" class="text-xs font-bold uppercase tracking-wider text-[#6B6661] hover:text-[#1A1615]">Read Syllabus</a> <button class="inline-flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm cursor-pointer">`);
    Message_circle($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Book Experience</span></button></div></article> <article class="estate-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between border-emerald-700/60 ring-1 ring-emerald-700/10"><div class="space-y-5"><div class="flex items-center justify-between"><span class="px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">${escape_html(studyTour.duration)} Intensive Masterclass</span> <span class="font-mono-num text-lg font-bold text-emerald-800">₹3,500 / person</span></div> <div><h3 class="font-serif text-3xl font-bold text-[#1A1615]">${escape_html(studyTour.title)}</h3> <p class="text-xs text-[#6B6661] mt-1 font-medium">Comprehensive 12-module technical masterclass on CEA engineering, fertigation &amp; commercial ROI.</p></div> <div class="space-y-2.5 pt-3 text-xs text-[#262320]"><!--[-->`);
    const each_array_1 = ensure_array_like(studyTour.includes.slice(0, 5));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let inc = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-start gap-2.5">`);
      Circle_check($$renderer2, { class: "w-4 h-4 text-emerald-800 shrink-0 mt-0.5" });
      $$renderer2.push(`<!----> <span class="leading-relaxed font-medium">${escape_html(inc)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="pt-8 mt-8 border-t border-[#E8E4DC] flex items-center justify-between gap-4"><a href="/tours/study-tour/" class="text-xs font-bold uppercase tracking-wider text-[#6B6661] hover:text-[#1A1615]">View All 12 Modules</a> <button class="inline-flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm cursor-pointer">`);
    Message_circle($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Book Study Tour</span></button></div></article></div></div></section>`);
  });
}
function AgenticConcierge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="fixed bottom-6 right-6 z-50">`);
    {
      $$renderer2.push(`<!--[0--><button class="estate-card flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-800 text-white shadow-xl hover:bg-emerald-900 transition-all cursor-pointer group hover:scale-105" aria-label="Open Agronomy Concierge">`);
      Message_circle($$renderer2, { class: "w-5 h-5 text-emerald-200" });
      $$renderer2.push(`<!----> <span class="text-xs font-bold uppercase tracking-wider">WhatsApp Desk</span> <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span></button>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentPhaseIndex = 0;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Berryboyzz · Commercial Berry Agro-Assets &amp; CEA Engineering | Pune &amp; Satara</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Controlled Environment Agriculture (CEA) berry farming across Maharashtra. Certified tissue culture clones, bi-annual 3.2 kg/year yields, and 16-month break-even commercial models."/>`);
    });
    ScarcityBanner($$renderer2);
    $$renderer2.push(`<!----> <div class="relative h-[450vh] bg-[#FAF9F6]">`);
    {
      $$renderer2.push("<!--[0-->");
      MorphogenesisCanvas($$renderer2);
      $$renderer2.push(`<!----> `);
      StoryPhaseOverlay($$renderer2, { currentPhaseIndex });
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]--> <div class="h-screen flex items-center justify-center px-4 relative z-10 pointer-events-none"><div class="max-w-3xl text-center space-y-6 pointer-events-auto"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">`);
    Sprout($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> <span>Precision Superfruit Agro-Assets · Satara &amp; Pune</span></div> <h1 class="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#1A1615] leading-[1.08]">Engineering the Superfruit Economy.</h1> <p class="text-base sm:text-xl text-[#4A4643] leading-relaxed max-w-2xl mx-auto">Transforming rural Maharashtra into India's premier controlled-environment berry powerhouse. High-anthocyanin genetics yielding twice annually with guaranteed cold-chain off-take.</p> <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"><button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer">`);
    Message_circle($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Inquire Allocation via WhatsApp</span></button> <a href="#cultivars" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#F5F2EB] text-[#1A1615] border border-[#E8E4DC] transition-all"><span>Explore 5 Cultivars</span> `);
    Chevron_right($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----></a></div> <div class="pt-12 text-[#6B6661] text-xs flex items-center justify-center gap-2 animate-bounce">`);
    Arrow_down($$renderer2, { class: "w-3.5 h-3.5 text-emerald-800" });
    $$renderer2.push(`<!----> <span class="uppercase tracking-widest font-semibold text-[10px]">Scroll Down to Witness 7-Phase Living Morphogenesis</span></div></div></div></div> <div class="relative z-10 bg-[#FAF9F6]">`);
    BerryShowcase($$renderer2);
    $$renderer2.push(`<!----> `);
    CEAInfrastructure($$renderer2);
    $$renderer2.push(`<!----> `);
    DynamicROICalculator($$renderer2);
    $$renderer2.push(`<!----> `);
    InvestmentLadder($$renderer2);
    $$renderer2.push(`<!----> `);
    BiologicalOS($$renderer2);
    $$renderer2.push(`<!----> `);
    FarmTourBooking($$renderer2);
    $$renderer2.push(`<!----></div> `);
    TelemetryTicker($$renderer2);
    $$renderer2.push(`<!----> `);
    AgenticConcierge($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
