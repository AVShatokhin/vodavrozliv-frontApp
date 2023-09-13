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
          <pod-itog
            :data="podItog"
            :from="requestData.dateCreationFrom"
            :to="requestData.dateCreationTo"
          ></pod-itog>

          <div class="my-row" md-alignment="space-between">
            <div>
              <p class="card-category">
                Показано с {{ from + 1 }} по {{ to }} из
                {{ queryLength }} записей
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
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Реквизиты терминала">
                <terminal-card :item="item"></terminal-card>
              </md-table-cell>
              <md-table-cell md-label="Отсечки">
                <div class="div__date_col">
                  <div class="div__date_label">Дата инкассации :</div>
                  <date-card
                    v-if="item.dateInkass"
                    :date="new Date(item.dateInkass)"
                  ></date-card>
                  <div v-else><b>нет</b></div>
                </div>
                <div class="div__date_col">
                  <div class="div__date_label">Дата создания :</div>
                  <date-card
                    v-if="item.dateCreation"
                    :date="new Date(item.dateCreation)"
                  ></date-card>
                  <div v-else><b>нет</b></div>
                </div>
                <div class="div__date_col">
                  <div class="div__date_label">Дата оприходования :</div>
                  <date-card
                    v-if="item.datePrihod"
                    :date="new Date(item.datePrihod)"
                  ></date-card>
                  <div v-else><b>нет</b></div>
                </div>
              </md-table-cell>
              <md-table-cell md-label="Данные">
                <data-card :item="item"></data-card>
              </md-table-cell>
              <md-table-cell md-label="Сумма">
                <b>{{ item.summ }}</b
                >, руб.
              </md-table-cell>
              <md-table-cell md-label="Комментарий">
                <div>{{ item.comment }}</div>
                <div v-if="item.dontUseSn">
                  Внесено без указания серийного номера терминала
                </div>
                <div v-if="item.isDuplikate">
                  <b>{{ item.duplikateSn }}</b> : Дублированная запись об
                  инкассации
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
import DateCard from "../components/common/SimpleDateView.vue";

import FilterCard from "../components/CashierTotals/FilterCard.vue";

import TerminalCard from "../components/CashierTotals/TerminalCard.vue";
import DataCard from "../components/CashierTotals/DataCard.vue";

import PodItog from "../components/CashierTotals/PodItog.vue";

export default {
  components: {
    DateCard,
    TerminalCard,
    Pagination,
    FilterCard,
    DataCard,
    PodItog,
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

      // searchQuery: "",
      requestData: {
        sortType: 0,
        useInkassDate: false,
        useCreationDate: true,
        dateCreationFrom: 0,
        dateCreationTo: 0,
        dateInkassFrom: 0,
        dateInkassTo: 0,
        apvs: [],
      },

      podItog: {},
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData.dateCreationFrom = requestData.dateCreationFrom;
      this.requestData.dateCreationTo = requestData.dateCreationTo;
      this.load();
    },

    load() {
      this.ajax.get(
        this,
        "getCashierInkass",
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            this.model = r.data.items;
            this.podItog = r.podItog;
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
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}

.my-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
}

.div__date_col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
}
</style>
