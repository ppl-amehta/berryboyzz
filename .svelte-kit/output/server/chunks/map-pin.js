import { K as spread_props } from "./index2.js";
import { I as Icon } from "./Icon.js";
const __iconData = {
  "name": "map-pin",
  "size": 24,
  "node": [
    [
      "path",
      {
        "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["circle", { "cx": "12", "cy": "10", "r": "3" }]
  ]
};
__iconData.node;
function Map_pin($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
export {
  Map_pin as M
};
