/* eslint-disable */
import test from "@/app/pages/test.vue";
import APVList from "@/app/pages/APVList.vue";
import KRUGList from "@/app/pages/KRUGList.vue";
import ENGList from "@/app/pages/ENGList.vue";

export default [
  {
    path: "/test",
    component: test,
    name: "Тест",
  },
  {
    path: "/APVList",
    component: APVList,
    name: "Список АПВ",
  },
  {
    path: "/ENGList",
    component: ENGList,
    name: "Список инженеров",
  },
  {
    path: "/KRUGList",
    component: KRUGList,
    name: "Круги",
  },
];
