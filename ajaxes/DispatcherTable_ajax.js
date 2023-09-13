/* eslint-disable */

import { api_url } from "./common.js";
import { defaultCatch_CB } from "./common.js";

let getDispatcherMain = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}getDispatcherMain/`,
      data,
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

let getDispatcherMain_XML = async (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  await component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}getDispatcherMain_XML/`,
      data,
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

export default {
  getDispatcherMain,
  getDispatcherMain_XML,
};
