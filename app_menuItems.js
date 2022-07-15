/* eslint-disable */

let control = {
  icon: "sports_esports",
  name: "Управление",
  items: [
    {
      name: "Панель управления",
      path: "/CmdsPanel",
      roles: ["ENGINEER"],
    },
    {
      name: "Запрос инкассаций",
      path: "/CmdsInkas",
      roles: ["ACCOUNTANT"],
    },
  ],
};

let lists = {
  icon: "list",
  name: "Справочники",
  items: [
    {
      name: "Аппараты",
      path: "/APVList",
      roles: ["HEAD_OP_DEP", "DEPUTY"],
    },
    {
      name: "Бригады",
      path: "/BRIGList",
      roles: ["HEAD_OP_DEP", "DEPUTY"],
    },
    {
      name: "Круги",
      path: "/KRUGList",
      roles: ["HEAD_OP_DEP", "DEPUTY"],
    },
  ],
};

let options = {
  icon: "settings",
  name: "Настройки",
  items: [
    {
      name: "Оповещения",
      path: "/MessList",
      roles: ["HEAD_OP_DEP", "DEPUTY", "PROGRAMMER"],
    },
  ],
};

let jou = {
  icon: "event_note",
  name: "Журналы",
  items: [
    {
      name: "Основной журнал",
      path: "/MainJou",
      roles: ["ANALYST", "ACCOUNTANT", "DEPUTY", "CASHIER"],
    },
    {
      name: "Журнал инкассаций",
      path: "/InkasJou",
      roles: ["ANALYST", "ACCOUNTANT", "DEPUTY", "CASHIER"],
    },
  ],
};

let dirs = [control, jou, lists, options];

let items = [];

export { items };
export { dirs };
