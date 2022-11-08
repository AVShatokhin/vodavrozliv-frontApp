<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>manage_history</md-icon>
          </div>
          <h4 class="title">Настройки выборки</h4>
        </md-card-header>

        <filter-card @sendRequest="sendRequest"></filter-card>
      </md-card>

      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>manage_history</md-icon>
          </div>
          <h4 class="title">Бесплатные раздачи</h4>
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
              <md-table-cell md-label="Отсечки"
                ><free-date-card :item="item"></free-date-card
              ></md-table-cell>
              <md-table-cell md-label="Длительность"
                ><long-card :item="item"></long-card
              ></md-table-cell>

              <md-table-cell md-label="Объём">
                <value-card :item="item"></value-card>
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
import FilterCard from "../components/AnalFreeWater/FilterCard.vue";
import TerminalCard from "../components/AnalFreeWater/TerminalCard.vue";
import FreeDateCard from "../components/AnalFreeWater/FreeDateCard.vue";
import ValueCard from "../components/AnalFreeWater/ValueCard.vue";
import LongCard from "../components/AnalFreeWater/LongCard.vue";

export default {
  components: {
    Pagination,
    FilterCard,
    TerminalCard,
    FreeDateCard,
    ValueCard,
    LongCard,
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
      perPage: 50,
      perPageOptions: [25, 50, 100],
      // pagination params

      requestData: {
        apvs: [],
        freeDateFrom: Math.round(new Date().getTime()),
        freeDateTo: Math.round(new Date().getTime()),
      },

      exportFileName: "",
      json_fields: {
        "#": "index",
        SN: "sn",
        Адрес: "address",
        "Начало периода": "startLts",
        "Окончание периода": "stopLts",
        "Длительность периода": "long",
        Объём: "f",
      },
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },
    async fetchData() {
      let latency = (__time) => {
        let __days = Math.trunc(__time / (24 * 3600));
        let __hours = Math.trunc((__time - __days * 24 * 3600) / 3600);
        let __mins = Math.trunc(
          (__time - __days * 24 * 3600 - __hours * 3600) / 60
        );

        if (__time == 0) {
          return "Актуально!";
        }

        if (__time < 3600) {
          return Math.trunc(__time / 60) + " мин.";
        }

        if (__time > 7 * 24 * 3600) {
          return Math.trunc(__time / (7 * 24 * 3600)) + " нед.";
        }

        if (__time > 24 * 3600) {
          return `${__days} д. ${__hours} ч. ${__mins} мин.`;
        }

        if (__time >= 3600) {
          return `${__hours} ч. ${__mins} мин.`;
        }

        return "";
      };

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

      this.exportFileName = "free_water.xls";

      let __result = [];

      await this.ajax.asyncGet(
        this,
        "getFreeWater",
        {
          perPage: -1,
          currentPage: 0,
          requestData: this.requestData,
          loadXML: true,
        },
        (r) => {
          if (r.status == "ok") {
            r.data.items.forEach((item, index) => {
              __result.push({
                index: index + 1,
                sn: item.sn,
                address: item.address,
                startLts:
                  item.startLts != item.startLts
                    ? "Актуально"
                    : FROM_DATE(item.startLts),
                stopLts:
                  item.startLts == item.stopLts
                    ? "Актуально"
                    : FROM_DATE(item.stopLts),
                long:
                  item.startLts == item.stopLts
                    ? "Актуально"
                    : latency(item.long),
                f: item.f,
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
        "getFreeWater",
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
        (err) => {
          //console.log(err);
        }
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
