import"./CDFQNSq5.js";import{s,r as n}from"./orRXP5gy.js";import{I as i}from"./Bm39_daW.js";const o={name:"message-circle",size:24,node:[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}]]};o.node;var c=new Set(["$$slots","$$events","$$legacy"]);function g(e,r){let t=n(r,c);i(e,s(()=>t,{get icon(){return o}}))}const l="918888681136";function m(e="BB"){const r=Date.now().toString(36).toUpperCase().slice(-4),t=Math.random().toString(36).substring(2,5).toUpperCase();return`${e}-${r}-${t}`}function u(e){const r=e.leadCode||m();let t=`Hello Berryboyzz,

`;switch(e.leadSource){case"hero":t+=`I am interested in learning more about your precision berry agro-ecosystem across Pune & Satara. Please share your current operational deck.

[Ref: ${r}]`;break;case"berry_modal":t+=`I am viewing the ${e.berryName||"exotic berry"} profile. I would like to inquire about commercial seedling availability, punnet supply, and farm setup specs.

[Ref: ${r}]`;break;case"roi_calculator":t+=`I ran your Commercial Berry ROI Calculator for ${e.acreage||1} Acre(s) (Est. Capex: ${e.capexCalculated||"₹32L"}). Please schedule a feasibility consultation with your Chief Agronomist.

[Ref: ${r}]`;break;case"syndicate_tier":t+=`I am exploring participation in the ${e.customMessage||"Commercial Berry Syndicate"}. Please provide the formal prospectus, legal term sheet, and off-take agreement details.

[Ref: ${r}]`;break;case"tour_booking":t+=`I wish to book a slot for the '${e.customMessage||"Farm Visit"}'. Please confirm upcoming weekend availability for our party.

[Ref: ${r}]`;break;case"concierge_handoff":t+=`I was consulting Dr. Berryboy on your site.
Summary: ${e.customMessage||"Inquiring regarding precision berry farm investments"}.
Please connect me with an on-duty agronomist.

[Ref: ${r}]`;break;default:t+=`I would like to speak to the Berryboyzz Agronomy & Investment Desk.

[Ref: ${r}]`;break}const a=encodeURIComponent(t.trim());return`https://wa.me/${l}?text=${a}`}function b(e){const r=u(e);window.open(r,"_blank","noopener,noreferrer")}export{g as M,b as o};
