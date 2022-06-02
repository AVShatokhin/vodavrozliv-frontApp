/* eslint-disable */

import { api_url } from "./common.js";
import { defaultCatch_CB } from "./common.js";

let getAllKrugs = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}getAllKrugs/`,
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

let getKrug = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}getKrug/`,
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

let addKrug = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}addKrug/`,
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

let deleteKrug = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}deleteKrug/`,
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

let changeKrugTitle = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}changeKrugTitle/`,
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
export default { getKrug, addKrug, deleteKrug, changeKrugTitle, getAllKrugs };
