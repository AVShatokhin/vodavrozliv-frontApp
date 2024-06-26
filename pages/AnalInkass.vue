<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>currency_ruble</md-icon>
          </div>
          <h4 class="title">Настройки выборки</h4>
        </md-card-header>

        <filter-card
          @sendRequest="sendRequest"
          @changedUseDate="changedUseDate"
        ></filter-card>
      </md-card>

      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>currency_ruble</md-icon>
          </div>
          <h4 class="title">Инкассации</h4>
        </md-card-header>

        <md-card-content>
          <!-- <pod-itog :data="podItog"> </pod-itog> -->
          <div class="my-row" md-alignment="space-between">
            <div class="my-row">
              <p class="card-category">
                Показано с {{ from + 1 }} по {{ to }} из
                {{ queryLength }} записей
              </p>
              <md-button
                class="md-success buttons"
                @click="prihodAllDialog = true"
              >
                <span class="material-icons"> done_all </span>
                Оприходовать все
                <md-dialog-confirm
                  :md-active.sync="prihodAllDialog"
                  md-title="Подтвердите операцию"
                  md-content="Оприходовать все инкассации, соответствующие выборке?"
                  md-confirm-text="Оприходовать"
                  md-cancel-text="Отмена"
                  @md-cancel="prihodAllDialog = false"
                  @md-confirm="prihodAll()"
                />
              </md-button>

              <p class="card-category p__padding">XML</p>
              <p class="card-category">
                <export-excel
                  :fields="json_fields"
                  :fetch="fetchData"
                  worksheet="CRM.Vodavrozliv"
                  :name="exportFileName"
                >
                  <span class="material-icons pointer"> file_download </span>
                </export-excel>
              </p>
              <p class="card-category p__padding" v-if="checkUseDate">
                XML с группировкой
              </p>
              <p class="card-category" v-if="checkUseDate">
                <export-excel
                  :fields="json_fields_group"
                  :fetch="fetchDataGroup"
                  worksheet="CRM.Vodavrozliv"
                  :name="exportFileName"
                >
                  <span class="material-icons pointer"> file_download </span>
                </export-excel>
              </p>
            </div>
            <pagination
              class="pagination-no-border pagination-success"
              v-model="currentPage"
              :per-page="perPage"
              :total="queryLength"
            >
            </pagination>
          </div>

          <md-table
            :value="model"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <label for="pages">Количество на странице</label>
                <md-select v-model="perPage" name="pages">
                  <md-option
                    v-for="item in perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    {{ item }}
                  </md-option>
                </md-select>
              </md-field>
              <div class="div__toolbar_right">
                <md-field> </md-field>
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Реквизиты">
                <terminal-card :item="item"></terminal-card>
              </md-table-cell>
              <md-table-cell md-label="Отсечки">
                <inkass-date-card :item="item"></inkass-date-card>
              </md-table-cell>
              <md-table-cell md-label="Данные кассира">
                <data-card :item="item"></data-card>
              </md-table-cell>
              <md-table-cell md-label="Данные терминала">
                <terminal-data-card :item="item"></terminal-data-card>
              </md-table-cell>
              <md-table-cell md-label="Суммы">
                <summa-card :item="item"></summa-card>
              </md-table-cell>
              <md-table-cell md-label="Разница"
                ><delta-card :item="item"></delta-card
              ></md-table-cell>
              <md-table-cell md-label="Кассир">
                <cashier-card :item="item"></cashier-card>
              </md-table-cell>

              <md-table-cell md-label="">
                <command-card
                  :item="item"
                  @itemDeleted="load()"
                  @itemChanged="load()"
                  :apvs="apvs"
                ></command-card>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>

        <md-card-actions md-alignment="space-between">
          <div>
            <p class="card-category">
              Показано с {{ from + 1 }} по {{ to }} из {{ queryLength }} записей
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-success"
            v-model="currentPage"
            :per-page="perPage"
            :total="queryLength"
          >
          </pagination>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";

import TerminalCard from "../components/AnalInkass/TerminalCard.vue";
import FilterCard from "../components/AnalInkass/FilterCard.vue";

import DataCard from "../components/AnalInkass/DataCard.vue";
import TerminalDataCard from "../components/AnalInkass/TerminalDataCard.vue";
import CommandCard from "../components/AnalInkass/CommandCard.vue";
import InkassDateCard from "../components/AnalInkass/InkassDateCard.vue";
import SummaCard from "../components/AnalInkass/SummaCard.vue";
import CashierCard from "../components/AnalInkass/CashierCard.vue";
import DeltaCard from "../components/AnalInkass/DeltaCard.vue";

export default {
  components: {
    CommandCard,
    CashierCard,
    InkassDateCard,
    TerminalDataCard,
    TerminalCard,
    Pagination,
    FilterCard,
    DataCard,
    SummaCard,
    DeltaCard,
  },
  computed: {
    to() {
      let highBound = this.from + this.perPage;
      if (this.queryLength < highBound) {
        highBound = this.queryLength;
      }
      return highBound;
    },
    from() {
      return this.perPage * (this.currentPage - 1);
    },
    checkUseDate() {
      return this.requestData?.useDate == "creation";
    },
  },
  data() {
    return {
      prihodAllDialog: false,

      // модель данных
      model: [],
      queryLength: 0,
      // модель данных

      // pagination params
      currentPage: 1,
      perPage: 100,
      perPageOptions: [25, 50, 100, 300],
      // pagination params

      // searchQuery: "",
      requestData: {
        useDate: "creation",
        sortType: 0,
        dateCreationFrom: 0,
        dateCreationTo: 0,
        dateInkassFrom: 0,
        dateInkassTo: 0,
        apvs: [],
        cashierUid: -1,
      },

      podItog: {},
      apvs: [],
      cinkass_ids: [],

      //XML export
      exportFileName: "",
      json_fields: {
        "#": "index",
        Оприходование: "isPrihod",
        "Дата инкассации": "dateInkass",
        "Дата создания": "dateCreation",
        "Дата оприходования": "datePrihod",
        Кассир: "cashierSign.email",
        SN: "sn",
        Адрес: "address",
        "Мелочь кассира": "m_summ",
        "Купюры кассира": "k",
        "Сумма кассира": "cashierSumm",
        "Мелочь терминала": "box",
        "Купюры терминала": "kup",
        "Сумма терминала": "terminalSumm",
        Разница: "delta",
        Безнал: "rd",
        Комментарий: "comment",
      },
      json_fields_group: {
        SN: "sn",
        Адрес: "address",
        "Мелочь кассира": "m_summ",
        "Купюры кассира": "k",
        "Сумма кассира": "cashierSumm",
        "Сумма терминала": "terminalSumm",
        Разница: "delta",
        Безнал: "rd",
      },
    };
  },
  methods: {
    changedUseDate(value) {
      this.requestData.useDate = value;
    },
    prihodAll() {
      this.ajax.post(
        this,
        "setPrihodAll",
        {
          cinkass_ids: this.cinkass_ids,
        },
        (r) => {
          if (r.status == "ok") {
            this.load();
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {}
      );
    },
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },

    async fetchDataGroup() {
      let FILE_NAME = (name) => {
        let norm = (n) => {
          return n > 9 ? n : "0" + n;
        };

        let __date = new Date();

        return (
          name +
          `_${1900 + __date.getYear()}_${
            1 + __date.getMonth() > 9
              ? 1 + __date.getMonth()
              : "0" + (1 + __date.getMonth())
          }_${norm(__date.getDate())}_${norm(__date.getHours())}_${norm(
            __date.getMinutes()
          )}_${norm(__date.getSeconds())}.xls`
        );
      };

      this.exportFileName = FILE_NAME("inkass_group");

      let __result = {};

      await this.ajax.asyncGet(
        this,
        "getAnalByCreation",
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          requestData: this.requestData,
          loadXML: true,
        },
        (r) => {
          if (r.status == "ok") {
            r.data.items.forEach((e) => {
              if (!e.isPrihod) return;
              if (__result?.[e.sn] == null) {
                __result[e.sn] = {
                  sn: e.sn,
                  address: e.address,
                  m_summ: e.m1 + 2 * e.m2 + 5 * e.m5 + 10 * e.m10,
                  k: e.k,
                  cashierSumm: e.cashierSumm || 0,
                  terminalSumm: e?.terminalSumm || 0,
                  delta: e.delta,
                  rd: e.rd || 0,
                };
              } else {
                __result[e.sn].m_summ +=
                  e.m1 + 2 * e.m2 + 5 * e.m5 + 10 * e.m10;
                __result[e.sn].k += e.k;
                __result[e.sn].cashierSumm += e.cashierSumm;
                __result[e.sn].terminalSumm += e?.terminalSumm || 0;
                __result[e.sn].delta += e.delta;
                __result[e.sn].rd += e?.rd || 0;
              }
            });
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {}
      );

      return Object.values(__result);
    },

    async fetchData() {
      let FILE_NAME = (name) => {
        let norm = (n) => {
          return n > 9 ? n : "0" + n;
        };

        let __date = new Date();

        return (
          name +
          `_${1900 + __date.getYear()}_${
            1 + __date.getMonth() > 9
              ? 1 + __date.getMonth()
              : "0" + (1 + __date.getMonth())
          }_${norm(__date.getDate())}_${norm(__date.getHours())}_${norm(
            __date.getMinutes()
          )}_${norm(__date.getSeconds())}.xls`
        );
      };

      this.exportFileName = FILE_NAME("inkass");

      let __url =
        this.requestData.useDate == "creation"
          ? "getAnalByCreation"
          : "getAnalByInkass";

      let __result = [];

      await this.ajax.asyncGet(
        this,
        __url,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          requestData: this.requestData,
          loadXML: true,
        },
        (r) => {
          let FROM_DATE = (date) => {
            if (date == null) return;

            let __date = new Date(date);

            return `${1900 + __date.getYear()}-${
              1 + __date.getMonth() > 9
                ? 1 + __date.getMonth()
                : "0" + (1 + __date.getMonth())
            }-${
              __date.getDate() > 9 ? __date.getDate() : "0" + __date.getDate()
            }`;
          };

          if (r.status == "ok") {
            __result = r.data.items;
            let __index = 0;
            __result.forEach((e) => {
              __index++;
              e.index = __index;
              e.dateInkass = FROM_DATE(e.dateInkass);
              e.dateCreation = FROM_DATE(e.dateCreation);
              e.datePrihod = FROM_DATE(e.datePrihod);
              e.m_summ = e.m1 + 2 * e.m2 + 5 * e.m5 + 10 * e.m10;
              if (e?.isPrihod != null)
                e.isPrihod = e.isPrihod == true ? "Да" : "Нет";
            });
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {}
      );

      return __result;
    },
    load() {
      let __url =
        this.requestData.useDate == "creation"
          ? "getAnalByCreation"
          : "getAnalByInkass";

      this.ajax.get(
        this,
        __url,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            this.model = r.data.items;
            this.podItog = r.podItog;
            this.apvs = r.apvs;
            this.cinkass_ids = r.cinkass_ids;
            this.queryLength = r.data.queryLength;
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {}
      );
    },
  },
  mounted() {},
  watch: {
    perPage() {
      this.load();
    },
    currentPage() {
      this.load();
    },
  },
};
</script>

<style lang="css" scoped>
.my-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 0px;
  margin-right: 0px;
}

.material-icons {
  margin-right: 15px;
}

.p__padding {
  padding-left: 30px;
  font-weight: bold;
  color: rgb(60, 73, 192);
}

.pointer {
  cursor: pointer;
  padding-left: 5px;
  color: rgb(60, 73, 192);
}

.buttons {
  width: 230px;
  height: 41px;
  margin-right: 15px;
  margin-left: 15px;
}
</style>
