/* eslint-disable */

import { api_url } from "./common.js";
import { defaultCatch_CB } from "./common.js";

let getAPV = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}getAPV/`,
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

let addAPV = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}addAPV/`,
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

let deleteAPV = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}deleteAPV/`,
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

let checkTelegram = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}checkTelegram/`,
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

let updateApvOptions = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}updateApvOptions/`,
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

let changeApvKrug = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}changeApvKrug/`,
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
  getAPV,
  addAPV,
  deleteAPV,
  updateApvOptions,
  changeApvKrug,
  checkTelegram,
};
