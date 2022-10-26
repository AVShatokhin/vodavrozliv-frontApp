// let api_url = "http://127.0.0.1:3000/api/";
let api_url = "http://apv.yelka.ru/api/";

let defaultCatch_CB = (component, err) => {
  component.$notify({
    message: `<h3>Ошибка ${err?.code}!</h3>` + `<p>${err?.message}.</p>`,
    icon: "add_alert",
    horizontalAlign: "center",
    verticalAlign: "top",
    type: "warning",
  });
};

let getSnSelectorData = (component, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}getSnSelectorData/`,
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

let asyncGet = async (component, url, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  await component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}${url}/`,
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

let get = (component, url, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "GET",
      timeout: 15000,
      url: `${api_url}${url}/`,
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

let post = (component, url, data, when_CB, catch_CB) => {
  let token = JSON.parse(localStorage.getItem("userData"))?.token;
  data.token = token;

  component
    .axios({
      method: "POST",
      timeout: 15000,
      url: `${api_url}${url}/`,
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

export { api_url, defaultCatch_CB, getSnSelectorData, get, post, asyncGet };
