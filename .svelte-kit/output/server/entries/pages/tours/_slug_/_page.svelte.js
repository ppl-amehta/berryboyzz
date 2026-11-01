import { W as head, N as ensure_array_like, J as derived, Q as attr, V as stringify } from "../../../../chunks/index2.js";
import { A as Arrow_left } from "../../../../chunks/arrow-left.js";
import { M as Map_pin } from "../../../../chunks/map-pin.js";
import { C as Circle_check } from "../../../../chunks/circle-check.js";
import { M as Message_circle } from "../../../../chunks/message-circle.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const tour = derived(() => data.tour);
    head("11km7fi", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(tour().title)} (${escape_html(tour().duration)}) · Experiential Agronomy | Berryboyzz</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", `${stringify(tour().tagline)} Hosted at Berryboyzz Flagship Farm, Wai-Panchgani Foothills, Satara.`)}/>`);
    });
    $$renderer2.push(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"><div class="mb-8"><a href="/tours/" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B6661] hover:text-emerald-800 transition-colors">`);
    Arrow_left($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Back to Farm Visits &amp; Masterclasses</span></a></div> <header class="pb-8 border-b border-[#E8E4DC] mb-10"><div class="flex flex-wrap items-center gap-3 mb-4"><span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200">Experiential Agri-Tourism</span> <span class="text-xs font-mono text-[#6B6661]">Code: ${escape_html(tour().whatsappCode)}</span></div> <h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1615] mb-4">${escape_html(tour().title)}</h1> <p class="text-base sm:text-lg text-[#262320] leading-relaxed max-w-2xl mb-8">${escape_html(tour().tagline)}</p> <div class="grid grid-cols-2 sm:grid-cols-4 gap-4"><div class="estate-card p-4 rounded-2xl"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Duration</span> <strong class="font-mono-num text-lg font-bold text-[#1A1615]">${escape_html(tour().duration)}</strong></div> <div class="estate-card p-4 rounded-2xl"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Per Person Fee</span> <strong class="font-mono-num text-lg font-bold text-emerald-800">`);
    if (tour().id === "harvest-visit") {
      $$renderer2.push(`<!--[0-->₹1,250 – ₹1,800`);
    } else {
      $$renderer2.push(`<!--[-1-->₹${escape_html(tour().feePerPersonINR.toLocaleString("en-IN"))}`);
    }
    $$renderer2.push(`<!--]--></strong></div> <div class="estate-card p-4 rounded-2xl"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Group Size</span> <strong class="font-mono-num text-lg font-bold text-[#1A1615]">Max ${escape_html(tour().maxGroupSize)} Guests</strong></div> <div class="estate-card p-4 rounded-2xl"><span class="text-[10px] uppercase font-bold text-[#6B6661] block mb-1">Schedule</span> <strong class="text-xs font-semibold text-[#1A1615] block truncate">${escape_html(tour().timing.split("(")[0])}</strong></div></div></header> <div class="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E8E4DC] mb-10 text-xs text-[#4A4643]">`);
    Map_pin($$renderer2, { class: "w-4 h-4 text-emerald-800 shrink-0" });
    $$renderer2.push(`<!----> <span><strong>Location:</strong> ${escape_html(tour().location)}</span></div> <section class="estate-card p-8 rounded-3xl mb-10 space-y-6"><h3 class="font-serif text-2xl font-bold text-[#1A1615] pb-3 border-b border-[#E8E4DC]">Curriculum &amp; Experience Highlights</h3> <ul class="grid grid-cols-1 gap-3.5 text-xs text-[#262320]"><!--[-->`);
    const each_array = ensure_array_like(tour().includes);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<li class="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F5F2EB]/60 transition-colors">`);
      Circle_check($$renderer2, { class: "w-4 h-4 text-emerald-800 shrink-0 mt-0.5" });
      $$renderer2.push(`<!----> <span class="leading-relaxed font-medium">${escape_html(item)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul></section> <section class="estate-card p-8 rounded-3xl mb-10 space-y-6"><h3 class="font-serif text-2xl font-bold text-[#1A1615] pb-3 border-b border-[#E8E4DC]">Schedule &amp; Hour-by-Hour Itinerary</h3> <div class="space-y-4"><!--[-->`);
    const each_array_1 = ensure_array_like(tour().itinerary);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let step = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-start gap-4 text-xs"><span class="w-2.5 h-2.5 rounded-full bg-emerald-800 shrink-0 mt-1"></span> <p class="text-[#262320] font-medium leading-relaxed">${escape_html(step)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="estate-card p-8 rounded-3xl bg-white border-[#E8E4DC] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-emerald-950/5"><div><h3 class="font-serif text-2xl font-bold text-[#1A1615]">Reserve Your Attendance</h3> <p class="text-xs text-[#6B6661] mt-1">Limited to ${escape_html(tour().maxGroupSize)} participants per session for personalized master grower guidance.</p></div> <button class="shrink-0 inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md shadow-emerald-950/20 transition-all cursor-pointer">`);
    Message_circle($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> <span>Book via WhatsApp Desk</span></button></section></div>`);
  });
}
export {
  _page as default
};
