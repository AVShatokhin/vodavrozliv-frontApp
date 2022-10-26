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

        <anal-dayly-sell-filter-card
          @sendRequest="sendRequest"
        ></anal-dayly-sell-filter-card>
      </md-card>

      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>manage_history</md-icon>
          </div>
          <h4 class="title">Средние продажи</h4>
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
                <anal-terminal-card :item="item"></anal-terminal-card>
              </md-table-cell>
              <md-table-cell md-label="День">
                <div>{{ item.AVGDaylySell }}, л.</div>
              </md-table-cell>
              <md-table-cell md-label="Час">
                <div>{{ item.AVGHourlySell }}, л.</div>
              </md-table-cell>
              <md-table-cell md-label=""> </md-table-cell>
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
import AnalDaylySellFilterCard from "../components/AnalDaylySell/AnalDaylySellFilterCard.vue";
import AnalTerminalCard from "../components/AnalDaylySell/AnalTerminalCard.vue";

export default {
  components: {
    Pagination,
    AnalDaylySellFilterCard,
    AnalTerminalCard,
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

      requestData: { sortType: 0, apvs: [] },

      exportFileName: "",
      json_fields: {
        "#": "index",
        SN: "sn",
        Address: "address",
        Dayly: "dayly",
        Hourly: "hourly",
      },
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },
    async fetchData() {
      this.exportFileName = "avg_sells.xls";

      let __result = [];

      await this.ajax.getAnalMain(
        this,
        {
          perPage: -1,
          currentPage: 0,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            r.data.apvs.forEach((apv, index) => {
              __result.push({
                index: index + 1,
                sn: apv.sn,
                address: apv.address,
                dayly: new String(apv.AVGDaylySell).replace(".", ","),
                hourly: new String(apv.AVGHourlySell).replace(".", ","),
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
      this.ajax.getAnalMain(
        this,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            this.model = [];
            this.model = r.data.apvs;
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
