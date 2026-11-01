import { K as spread_props } from "./index2.js";
import { I as Icon } from "./Icon.js";
const __iconData = {
  "name": "clock",
  "size": 24,
  "node": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M12 6v6l4 2" }]
  ]
};
__iconData.node;
function Clock($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
export {
  Clock as C
};
