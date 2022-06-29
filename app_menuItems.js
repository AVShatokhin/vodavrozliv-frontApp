/* eslint-disable */

export default [
  {
    name: "Оповещения",
    icon: "feedback",
    path: "/MessList",
    roles: ["HEAD_OP_DEP", "DEPUTY", "PROGRAMMER"],
  },
  {
    name: "Бригады",
    icon: "assignment_ind",
    path: "/BRIGList",
    roles: ["HEAD_OP_DEP", "DEPUTY"],
  },
  {
    name: "Список АПВ",
    icon: "view_list",
    path: "/APVList",
    roles: ["HEAD_OP_DEP", "DEPUTY"],
  },
  {
    name: "Круги",
    icon: "toll",
    path: "/KRUGList",
    roles: ["HEAD_OP_DEP", "DEPUTY"],
  },

  {
    name: "Запрос инкассаций",
    icon: "currency_exchange",
    path: "/CmdsInkas",
    roles: ["ACCOUNTANT"],
  },
  {
    name: "Журнал инкассаций",
    icon: "attach_money",
    path: "/InkasJou",
    roles: ["ANALYST", "ACCOUNTANT", "DEPUTY", "CASHIER"],
  },
  {
    name: "Основной журнал",
    icon: "event_note",
    path: "/MainJou",
    roles: ["ANALYST", "ACCOUNTANT", "DEPUTY", "CASHIER"],
  },
  {
    name: "Управление",
    icon: "sports_esports",
    path: "/CmdsPanel",
    roles: ["ENGINEER"],
  },
];
