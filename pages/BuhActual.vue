<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>account_balance</md-icon>
          </div>
          <h4 class="title">Настройки выборки</h4>
        </md-card-header>

        <filter-card @sendRequest="sendRequest"></filter-card>
      </md-card>

      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>account_balance</md-icon>
          </div>
          <h4 class="title">Актуальные данные</h4>
        </md-card-header>

        <div class="my-row" md-alignment="space-between">
          <div class="my-row">
            <p class="card-category">
              Показано с {{ from + 1 }} по {{ to }} из {{ queryLength }} записей
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

        <md-card-content>
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
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Реквизиты терминала">
                <terminal-card :item="item"></terminal-card>
              </md-table-cell>
              <md-table-cell md-label="Эквайринг">
                <b>{{ calcEq(item) }}</b>
              </md-table-cell>
              <md-table-cell md-label="Наличные"
                ><b>{{ calcNal(item) }}</b></md-table-cell
              >
              <md-table-cell md-label="Отсечки">
                <date-card :item="item"></date-card>
              </md-table-cell>

              <md-table-cell md-label=""></md-table-cell>
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
import FilterCard from "../components/BuhActual/FilterCard.vue";
import TerminalCard from "../components/BuhActual/TerminalCard.vue";
import DateCard from "../components/BuhActual/DateCard.vue";

export default {
  components: {
    Pagination,
    FilterCard,
    TerminalCard,
    DateCard,
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
      perPage: 100,
      perPageOptions: [25, 50, 100, 300],
      // pagination params

      requestData: {
        apvs: [],
        dateFrom: 0,
        dateTo: 0,
        sortType: 0,
      },

      exportFileName: "",
      json_fields: {
        "#": "index",
        SN: "sn",
        Address: "address",
        "Последнее обновление данных": "lts",
        "Дата инкассации": "inkassLts",
        Наличные: "nal",
        Эквайринг: "eq",
      },
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },
    async fetchData() {
      // let latency = (__time) => {
      //   let __days = Math.trunc(__time / (24 * 3600));
      //   let __hours = Math.trunc((__time - __days * 24 * 3600) / 3600);
      //   let __mins = Math.trunc(
      //     (__time - __days * 24 * 3600 - __hours * 3600) / 60
      //   );

      //   if (__time == 0) {
      //     return "Актуально!";
      //   }

      //   if (__time < 3600) {
      //     return Math.trunc(__time / 60) + " мин.";
      //   }

      //   if (__time > 7 * 24 * 3600) {
      //     return Math.trunc(__time / (7 * 24 * 3600)) + " нед.";
      //   }

      //   if (__time > 24 * 3600) {
      //     return `${__days} д. ${__hours} ч. ${__mins} мин.`;
      //   }

      //   if (__time >= 3600) {
      //     return `${__hours} ч. ${__mins} мин.`;
      //   }

      //   return "";
      // };

      let norm = (n) => {
        return n > 9 ? n : "0" + n;
      };

      let FROM_DATE = (date) => {
        if (date == null) return;

        let __date = new Date(date);

        return `${1900 + __date.getYear()}-${
          1 + __date.getMonth() > 9
            ? 1 + __date.getMonth()
            : "0" + (1 + __date.getMonth())
        }-${norm(__date.getDate())} ${norm(__date.getHours())}:${norm(
          __date.getMinutes()
        )}:${norm(__date.getSeconds())}`;
      };

      let FILE_NAME = (name) => {
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

      this.exportFileName = FILE_NAME("actual");

      let __result = [];

      await this.ajax.asyncGet(
        this,
        "getBuhActual",
        {
          perPage: -1,
          currentPage: 0,
          loadXML: true,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            r.data.items.forEach((item, index) => {
              __result.push({
                index: index + 1,
                sn: item.sn,
                address: item.address,
                nal: this.calcNal(item),
                eq: this.calcEq(item),
                lts: FROM_DATE(item.lts),
                inkassLts: FROM_DATE(item.inkassLts),
              });
            });
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );

      return __result;
    },
    load() {
      this.ajax.get(
        this,
        "getBuhActual",
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            this.model = [];
            this.model = r.data.items;
            this.queryLength = r.data.queryLength;
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {}
      );
    },
    calcNal(item) {
      if (item?.value == null) return 0;
      return Number(item.value?.k || 0) + Number(item.value?.m || 0);
    },
    calcEq(item) {
      return item?.value?.r || 0;
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
  margin-left: 10px;
  margin-right: 20px;
}

.my-col {
  display: flex;
  flex-direction: column;
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
