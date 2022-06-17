//let api_url = "http://127.0.0.1:3000/api/";
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

export { api_url, defaultCatch_CB };
