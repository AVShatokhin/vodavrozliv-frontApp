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

        <filter-card @sendRequest="sendRequest"></filter-card>
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
  },
  data() {
    return {
      // модель данных
      model: [],
      queryLength: 0,
      // модель данных

      // pagination params
      currentPage: 1,
      perPage: 10,
      perPageOptions: [5, 10, 25, 50],
      // pagination params

      // searchQuery: "",
      requestData: {
        useDate: "creation",
        sortType: 0,
        dateCreationFrom: Math.round(new Date().getTime()),
        dateCreationTo: Math.round(new Date().getTime()),
        dateInkassFrom: 0,
        dateInkassTo: 0,
        apvs: [],
        cashierUid: -1,
      },

      podItog: {},
      apvs: [],

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
        "Сумма терминала": "terminalSumm",
        Разница: "delta",
        Безнал: "rd",

        Комментарий: "comment",
      },
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },
    dateInkassChanged(newValue) {
      this.dateInkass__ = Math.round(newValue.getTime() / 1000);
    },
    dateCreationChanged(newValue) {
      this.dateCreation__ = Math.round(newValue.getTime() / 1000);
    },
    async fetchData() {
      this.exportFileName = "inkass.xls";

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
        (err) => {
          //console.log(err);
        }
      );
      console.log(__result);

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
            this.queryLength = r.data.queryLength;
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
  },
  mounted() {
    this.load();
  },
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
  margin-right: 25px;
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
</style>
