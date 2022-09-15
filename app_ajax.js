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
import InkasJou from "./ajaxes/InkasJou_ajax.js";
import MainJou from "./ajaxes/MainJou_ajax.js";
import MessList from "./ajaxes/MessList_ajax.js";
import CmdsPanel from "./ajaxes/CmdsPanel_ajax.js";
import CmdsInkas from "./ajaxes/CmdsInkas_ajax.js";
import DispatcherTable from "./ajaxes/DispatcherTable_ajax.js";

addExport(APVList);
addExport(KRUGList);
addExport(BRIGList);
addExport(InkasJou);
addExport(MainJou);
addExport(MessList);
addExport(CmdsPanel);
addExport(CmdsInkas);
addExport(DispatcherTable);

export { api_url };
export default exports;
