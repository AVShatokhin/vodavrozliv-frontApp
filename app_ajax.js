/* eslint-disable */

let exports = {};
let addExport = (methods) => {
  for (let method in methods) {
    exports[method] = methods[method];
  }
};

import { api_url } from "./ajaxes/common.js";

import APVList from "./ajaxes/APVList_ajax.js";

addExport(APVList);

export { api_url };
export default exports;
