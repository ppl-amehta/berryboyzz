import { K as spread_props } from "./index2.js";
import { I as Icon } from "./Icon.js";
const __iconData = {
  "name": "arrow-right",
  "size": 24,
  "node": [
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "m12 5 7 7-7 7" }]
  ]
};
__iconData.node;
function Arrow_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
export {
  Arrow_right as A
};
