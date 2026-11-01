import { K as spread_props } from "./index2.js";
import { I as Icon } from "./Icon.js";
const __iconData = {
  "name": "arrow-left",
  "size": 24,
  "node": [
    ["path", { "d": "m12 19-7-7 7-7" }],
    ["path", { "d": "M19 12H5" }]
  ]
};
__iconData.node;
function Arrow_left($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
export {
  Arrow_left as A
};
