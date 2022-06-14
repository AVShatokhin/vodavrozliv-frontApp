/* eslint-disable */

import { api_url } from "./common.js";
import { defaultCatch_CB } from "./common.js";

let getAllEngs = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}getAllEngs/`,
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

let getBrig = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}getBrig/`,
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

let addBrig = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}addBrig/`,
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

let changeBrigKrug = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}changeBrigKrug/`,
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

let updateBrig = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}updateBrig/`,
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

let deleteBrig = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}deleteBrig/`,
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

let addEngToBrig = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}addEngToBrig/`,
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

let deleteEngFromBrig = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}deleteEngFromBrig/`,
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
  getAllEngs,
  changeBrigKrug,
  addBrig,
  getBrig,
  updateBrig,
  deleteBrig,
  addEngToBrig,
  deleteEngFromBrig,
};
