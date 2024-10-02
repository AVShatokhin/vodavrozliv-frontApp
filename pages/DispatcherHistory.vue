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

        <dispatcher-filter-card
          @sendRequest="sendRequest"
        ></dispatcher-filter-card>
      </md-card>

      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>manage_history</md-icon>
          </div>
          <h4 class="title">История</h4>
        </md-card-header>

        <div class="my-row" md-alignment="space-between">
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
              <md-table-cell
                md-label="Реквизиты терминала"
                v-bind:class="{
                  red: redStyle(item),
                }"
              >
                <dispatcher-terminal-card
                  :item="item"
                ></dispatcher-terminal-card>
              </md-table-cell>
              <md-table-cell
                md-label="Метка времени"
                v-bind:class="{
                  red: redStyle(item),
                }"
              >
                <simple-item-lts-card :item="item"></simple-item-lts-card>
              </md-table-cell>
              <md-table-cell
                md-label="Заправка"
                v-bind:class="{
                  red: redStyle(item),
                }"
              >
                <div v-if="item.chargeObject.state != undefined">
                  <p v-if="item.chargeObject.state == `full`">
                    Завершена до полного
                  </p>
                  <p v-if="item.chargeObject.state == `start`">Начата</p>
                  <p v-if="item.chargeObject.state == `sale`">
                    Перешел к продаже
                  </p>
                  <p v-if="item.chargeObject.state == `error`">
                    Ошибка датчика
                  </p>

                  <p>{{ item.v1 }} л.</p>
                </div>
              </md-table-cell>
              <md-table-cell
                md-label="Продано от датчика"
                v-bind:class="{
                  red: redStyle(item),
                }"
              >
                <div>
                  <b>Датчик: {{ item.v1 }}, л.</b>
                </div>
                <div>
                  <b>Продано: {{ item.v2 }}, л.</b>
                </div>
              </md-table-cell>
              <md-table-cell
                md-label="Датчики"
                v-bind:class="{
                  red: redStyle(item),
                }"
              >
                <div>
                  <b>Нет воды: {{ item.dv1 }}</b>
                </div>
                <div>
                  <b>750 л.: {{ item.dv2 }}</b>
                </div>
                <div>
                  <b>1500 л.: {{ item.dv3 }}</b>
                </div>
                <div>
                  <b>3000 л.: {{ item.dv4 }}</b>
                </div>
                <div>
                  <b>4500 л.: {{ item.dv5 }}</b>
                </div>
              </md-table-cell>
              <md-table-cell
                md-label="Остаток"
                v-bind:class="{
                  red: redStyle(item),
                }"
              >
                <div>
                  <b>{{ item.remain }}, л.</b>
                </div>
              </md-table-cell>
              <md-table-cell
                md-label="Ошибки"
                v-bind:class="{
                  red: redStyle(item),
                }"
              >
                <div class="my-col">
                  <div v-if="item.errorCode == 3"><b>нет воды</b></div>
                  <div v-if="item.errorCode == 4"><b>засор</b></div>
                  <div v-if="item.errorCode == 15"><b>АПВ замёрз</b></div>
                  <div v-if="item.errorCode == 18">
                    <b>нет 220В в АПВ</b>
                  </div>
                  <div v-if="item.errorCode == 1001">
                    <b>нет связи с АПВ</b>
                  </div>
                  <div v-if="item.errorCode == 1002">
                    <b>восстановилась звязь с АПВ</b>
                  </div>
                </div>
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
import DispatcherFilterCard from "../components/DispatcherHistory/DispatcherFilterCard.vue";
import DispatcherTerminalCard from "../components/DispatcherTable/DispatcherTerminalCard.vue";
import SimpleItemLtsCard from "../components/common/SimpleItemLTSCardSplitted.vue";

export default {
  components: {
    Pagination,
    DispatcherFilterCard,
    DispatcherTerminalCard,
    SimpleItemLtsCard,
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
        dateFrom: Math.round(new Date().getTime()),
        dateTo: Math.round(new Date().getTime()),
        apvs: [],
      },
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },
    redStyle(item) {
      return (
        item.errorCode == 18 ||
        item.errorCode == 3 ||
        item.errorCode == 4 ||
        item.errorCode == 15 ||
        item.errorCode == 1001

        // item.data.errorCode == 18 ||
        // item.data.errorCode == 3 ||
        // item.data.errorCode == 4 ||
        // item.data.errorCode == 15 ||
        // item.online == false
      );
    },
    load() {
      this.ajax.getDispatcherHistory(
        this,
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
  margin-left: 20px;
  margin-right: 20px;
}

.red {
  background-color: red;
}

.my-col {
  display: flex;
  flex-direction: column;
}
</style>
