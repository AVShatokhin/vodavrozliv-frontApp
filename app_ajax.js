/* eslint-disable */

let exports = {};
let addExport = (methods) => {
  for (let method in methods) {
    exports[method] = methods[method];
  }
};

import { api_url } from "./ajaxes/common.js";

import APVList from "./ajaxes/APVList_ajax.js";
import KRUGList from "./ajaxes/KRUGList_ajax.js";
import BRIGList from "./ajaxes/BrigList_ajax.js";

addExport(APVList);
addExport(KRUGList);
addExport(BRIGList);

export { api_url };
export default exports;
