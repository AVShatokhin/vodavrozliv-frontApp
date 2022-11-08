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

let dispatcher = {
  icon: "manage_history",
  name: "Диспетчерская",
  items: [
    {
      name: "Сводная таблица",
      path: "/DispatcherTable",
      roles: ["DISPATCHER"],
    },
    {
      name: "Расписание моек",
      path: "/DispatcherWash",
      roles: ["DISPATCHER"],
    },
  ],
};

let analyst = {
  icon: "analytics",
  name: "Аналитик",
  items: [
    {
      name: "Инкассации",
      path: "/AnalInkass",
      roles: ["ANALYST"],
    },
    {
      name: "Средние продажи",
      path: "/AnalDaylySell",
      roles: ["ANALYST"],
    },
    {
      name: "Неисправности",
      path: "/AnalErrors",
      roles: ["ANALYST"],
    },
    {
      name: "Раздача воды",
      path: "/AnalFreeWater",
      roles: ["ANALYST"],
    },
  ],
};

let cashier = {
  icon: "currency_ruble",
  name: "Кассир",
  items: [
    {
      name: "Инкассации",
      path: "/CashierInkass",
      roles: ["CASHIER"],
    },
    {
      name: "Итоги",
      path: "/CashierTotals",
      roles: ["CASHIER"],
    },
  ],
};

let dirs = [analyst, cashier, dispatcher, control, jou, lists, options];

let items = [];

export { items };
export { dirs };
