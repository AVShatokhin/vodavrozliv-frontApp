/* eslint-disable */

import { api_url } from "./common.js";
import { defaultCatch_CB } from "./common.js";

let getDispatcherMain = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}getDispatcherMain/`,
      params: data,
    })
    .then((response) => {
      when_CB(response.data);
    })
    .catch((error) => {
      if (error) {
        let errorObject = error.toJSON();
        defaultCatch_CB(component, errorObject);
        catch_CB(errorObject);
      }
    });
};

// let getMainJouFilterStructure = (component, data, when_CB, catch_CB) => {
//   let token = JSON.parse(localStorage.getItem("userData"))?.token;
//   data.token = token;

//   component
//     .axios({
//       method: "GET",
//       timeout: 15000,
//       url: `${api_url}getMainJouFilterStructure/`,
//       params: data,
//     })
//     .then((response) => {
//       when_CB(response.data);
//     })
//     .catch((error) => {
//       if (error) {
//         let errorObject = error.toJSON();
//         defaultCatch_CB(component, errorObject);
//         catch_CB(errorObject);
//       }
//     });
// };

export default {
  getDispatcherMain,
  //getMainJouFilterStructure,
};
