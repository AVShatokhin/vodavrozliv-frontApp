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
      roles: ["ANALYST"],
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
      roles: ["HEAD_OP_DEP", "ANALYST"],
    },
    {
      name: "Бригады",
      path: "/BRIGList",
      roles: ["HEAD_OP_DEP", "ANALYST"],
    },
    {
      name: "Круги",
      path: "/KRUGList",
      roles: ["HEAD_OP_DEP", "ANALYST"],
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
      roles: ["ANALYST", "HEAD_OP_DEP"],
    },
    {
      name: "Журнал инкассаций",
      path: "/InkasJou",
      roles: ["ANALYST"],
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
      roles: ["DISPATCHER", "HEAD_OP_DEP"],
    },
    {
      name: "Расписание моек",
      path: "/DispatcherWash",
      roles: ["DISPATCHER", "HEAD_OP_DEP"],
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
      roles: ["ANALYST", "DISPATCHER", "ACCOUNTANT"],
    },
    {
      name: "Неисправности",
      path: "/AnalErrors",
      roles: ["ANALYST", "HEAD_OP_DEP"],
    },
    {
      name: "Раздача воды",
      path: "/AnalFreeWater",
      roles: ["ANALYST", "DISPATCHER", "ACCOUNTANT", "HEAD_OP_DEP"],
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

let accountant = {
  icon: "account_balance",
  name: "Бухгалтерия",
  items: [
    {
      name: "Отчет",
      path: "/BuhReport",
      roles: ["ACCOUNTANT"],
    },
    {
      name: "Актуальные данные",
      path: "/BuhActual",
      roles: ["ACCOUNTANT"],
    },
  ],
};

let dirs = [
  analyst,
  accountant,
  cashier,
  dispatcher,
  control,
  jou,
  lists,
  options,
];

let items = [];

export { items };
export { dirs };
