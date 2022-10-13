/* eslint-disable */
import test from "@/app/pages/test.vue";
import APVList from "@/app/pages/APVList.vue";
import KRUGList from "@/app/pages/KRUGList.vue";
import BRIGList from "@/app/pages/BRIGList.vue";
import InkasJou from "@/app/pages/InkasJou.vue";
import MainJou from "@/app/pages/MainJou.vue";
import MessList from "@/app/pages/MessList.vue";
import CmdsPanel from "@/app/pages/CmdsPanel.vue";
import CmdsInkas from "@/app/pages/CmdsInkas.vue";
import DispatcherTable from "@/app/pages/DispatcherTable.vue";
import DispatcherTimeTable from "@/app/pages/DispatcherTimeTable.vue";
import AnalDaylySell from "@/app/pages/AnalDaylySell.vue";
import CashierInkass from "@/app/pages/CashierInkass.vue";
import CashierTotals from "@/app/pages/CashierTotals.vue";
import AnalErrors from "@/app/pages/AnalErrors.vue";

export default [
  {
    path: "/test",
    component: test,
    name: "Тест",
  },
  {
    path: "/APVList",
    component: APVList,
    name: 'Справочник "АПВ"',
  },
  {
    path: "/BRIGList",
    component: BRIGList,
    name: 'Справочник "Бригады"',
  },
  {
    path: "/KRUGList",
    component: KRUGList,
    name: 'Справочник "Круги"',
  },
  {
    path: "/InkasJou",
    component: InkasJou,
    name: "Журнал инкассаций",
  },
  {
    path: "/MainJou",
    component: MainJou,
    name: "Основной журнал АПВ",
  },
  {
    path: "/MessList",
    component: MessList,
    name: `Настройка оповещений`,
  },
  {
    path: "/CmdsPanel",
    component: CmdsPanel,
    name: `Панель управления`,
  },
  {
    path: "/CmdsInkas",
    component: CmdsInkas,
    name: `Запрос инкассаций`,
  },
  {
    path: "/DispatcherTable",
    component: DispatcherTable,
    name: `Сводная таблица`,
  },
  {
    path: "/DispatcherTimetable",
    component: DispatcherTimeTable,
    name: `Расписание моек`,
  },
  {
    path: "/AnalDaylySell",
    component: AnalDaylySell,
    name: `Средние продажи`,
  },
  {
    path: "/CashierInkass",
    component: CashierInkass,
    name: `Инкассации`,
  },
  {
    path: "/CashierTotals",
    component: CashierTotals,
    name: `Итоги`,
  },
  {
    path: "/AnalErrors",
    component: AnalErrors,
    name: `Неисправности`,
  },
];
