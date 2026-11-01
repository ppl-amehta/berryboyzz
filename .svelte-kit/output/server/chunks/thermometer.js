import { K as spread_props } from "./index2.js";
import { I as Icon } from "./Icon.js";
const __iconData$1 = {
  "name": "shield-check",
  "size": 24,
  "node": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ]
};
__iconData$1.node;
function Shield_check($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData$1 }]));
}
const __iconData = {
  "name": "thermometer",
  "size": 24,
  "node": [
    [
      "path",
      { "d": "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }
    ]
  ]
};
__iconData.node;
function Thermometer($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  Icon($$renderer, spread_props([props, { icon: __iconData }]));
}
export {
  Shield_check as S,
  Thermometer as T
};
