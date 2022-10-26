<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>event_note</md-icon>
          </div>
          <h4 class="title">Настройки выборки</h4>
        </md-card-header>

        <main-jou-filter-card @sendRequest="sendRequest"></main-jou-filter-card>
      </md-card>

      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>event_note</md-icon>
          </div>
          <h4 class="title">Основной журнал АПВ</h4>
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
              <md-table-cell md-label="Реквизиты терминала">
                <simple-terminal-card :item="item"></simple-terminal-card>
              </md-table-cell>
              <md-table-cell md-label="Метка времени">
                <main-jou-time-card :item="item"></main-jou-time-card>
              </md-table-cell>
              <md-table-cell md-label="Сумма наличная">
                <main-jou-nal-summ-card :item="item"></main-jou-nal-summ-card>
              </md-table-cell>
              <md-table-cell md-label="Купюры">
                <main-jou-kup-card :item="item"></main-jou-kup-card>
              </md-table-cell>
              <md-table-cell md-label="Монеты">
                <main-jou-coin-card :item="item"></main-jou-coin-card>
              </md-table-cell>
              <md-table-cell md-label="Эквайринг">
                <main-jou-eq-card :item="item"></main-jou-eq-card>
              </md-table-cell>
              <md-table-cell md-label="Температура">
                <main-jou-temp-card :item="item"></main-jou-temp-card>
              </md-table-cell>
              <md-table-cell md-label="Датчики воды">
                <main-jou-rashod-card :item="item"></main-jou-rashod-card>
              </md-table-cell>
              <md-table-cell md-label="Бесплатная раздача">
                <main-jou-free-card :item="item"></main-jou-free-card>
              </md-table-cell>
              <md-table-cell md-label="Тара">
                <main-jou-tara-card :item="item"></main-jou-tara-card>
              </md-table-cell>

              <md-table-cell md-label="Ошибки">
                <main-jou-errors-card :item="item"></main-jou-errors-card>
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
import SimpleTerminalCard from "../components/common/SimpleTerminalCard.vue";
import MainJouErrorsCard from "../components/MainJou/MainJouErrorsCard.vue";
import MainJouKupCard from "../components/MainJou/MainJouKupCard.vue";
import MainJouCoinCard from "../components/MainJou/MainJouCoinCard.vue";
import MainJouTempCard from "../components/MainJou/MainJouTempCard.vue";
import MainJouEqCard from "../components/MainJou/MainJouEqCard.vue";
import MainJouRashodCard from "../components/MainJou/MainJouRashodCard.vue";
import MainJouTimeCard from "../components/MainJou/MainJouTimeCard.vue";
import MainJouTaraCard from "../components/MainJou/MainJouTaraCard.vue";
import MainJouFilterCard from "../components/MainJou/MainJouFilterCard.vue";
import MainJouNalSummCard from "../components/MainJou/MainJouNalSummCard.vue";
import MainJouFreeCard from "../components/MainJou/MainJouFreeCard.vue";

export default {
  components: {
    Pagination,
    SimpleTerminalCard,
    MainJouErrorsCard,
    MainJouKupCard,
    MainJouCoinCard,
    MainJouTempCard,
    MainJouRashodCard,
    MainJouEqCard,
    MainJouTimeCard,
    MainJouTaraCard,
    MainJouFilterCard,
    MainJouNalSummCard,
    MainJouFreeCard,
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

      requestData: {},
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },
    load() {
      this.ajax.getMain(
        this,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
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
</style>
