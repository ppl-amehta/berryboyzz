import { K as spread_props } from "./index2.js";
import { I as Icon } from "./Icon.js";
const __iconData = {
  "name": "circle-check",
  "size": 24,
  "node": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "m16 9-5.5 5.5L8 12" }]
  ],
  "aliases": ["check-circle-2"]
};
__iconData.node;
function Circle_check($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
export {
  Circle_check as C
};
