<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>departure_board</md-icon>
          </div>
          <h4 class="title">Настройка выборки</h4>
        </md-card-header>

        <filter-card @sendRequest="sendRequest"></filter-card>
      </md-card>

      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>departure_board</md-icon>
          </div>
          <h4 class="title">Расписание моек</h4>
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
              <md-table-cell md-label="Дата">
                <b>{{ item.date }}</b>
              </md-table-cell>
              <md-table-cell md-label="Терминалы">
                <div class="terminal_cards_container">
                  <wash-terminal-card
                    v-for="washObject in item.washObject"
                    :key="washObject.sn"
                    :item="washObject"
                    :date="item.date"
                    @itemDeleted="load()"
                  >
                  </wash-terminal-card>
                </div>
              </md-table-cell>
              <md-table-cell md-label="">
                <add-wash-button
                  :item="item"
                  :apvs="apvs"
                  @itemAdded="load()"
                ></add-wash-button>
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
import FilterCard from "../components/DispatcherWash/FilterCard.vue";
import { Pagination } from "@/components";
import AddWashButton from "../components/DispatcherWash/addWashButton.vue";
import WashTerminalCard from "../components/DispatcherWash/washTerminalCard.vue";

export default {
  components: { FilterCard, Pagination, AddWashButton, WashTerminalCard },
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
        dateFrom: 0,
        dateTo: 0,
      },

      apvs: {},

      exportFileName: "",
      json_fields: {
        Дата: "date",
        "Список АПВ": "sns",
      },
    };
  },
  methods: {
    sendRequest(data) {
      this.requestData.dateFrom = data.dateFrom;
      this.requestData.dateTo = data.dateTo;
      this.load();
    },
    async fetchData() {
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
        }-${norm(__date.getDate())}`;
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

      this.exportFileName = FILE_NAME("wash");

      let __result = [];

      console.log(this.requestData);

      await this.ajax.asyncGet(
        this,
        "getWash",
        {
          perPage: -1,
          currentPage: 0,
          loadXML: true,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            r.data.items.forEach((item) => {
              if (item?.washObject) {
                __result.push({
                  sns: Object.keys(item.washObject).join(", "),
                  date: FROM_DATE(item.date),
                });
              }
            });
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          console.log(err);
        }
      );

      return __result;
    },
    load() {
      this.ajax.get(
        this,
        "getWash",
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            this.model = [];
            this.model = r.data.items;
            this.apvs = r.data.apvs;
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
  margin-left: 10px;
  margin-right: 20px;
}

.terminal_cards_container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
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
