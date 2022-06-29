<template>
  <div class="md-layout">
    <div class="md-layout-item">
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
              <div class="div__toolbar_right">
                <md-field>
                  <!-- <md-input
                    @keyup.enter="searchRequest()"
                    type="search"
                    class="mb-3"
                    clearable
                    style="width: 200px"
                    placeholder="Поиск круга"
                    v-model="searchQuery"
                  >
                  </md-input> -->
                </md-field>

                <md-button
                  style="width: 230px; height: 41px; margin-right: 15px"
                  class="md-success button__refresh"
                  @click="load()"
                >
                  <span class="material-icons"> refresh </span>
                  Обновить
                </md-button>
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Реквизиты терминала">
                <simple-terminal-card :item="item"></simple-terminal-card>
              </md-table-cell>
              <md-table-cell md-label="Метка времени">
                <main-jou-time-card :item="item"></main-jou-time-card>
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

    <!-- <md-dialog :md-active.sync="showDialogKrugAdd">
      <md-dialog-title>Добавление круга</md-dialog-title>
      <div class="div__my-dialog-content">
        <md-field>
          <label>Название круга</label>
          <md-input v-model="title__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialogKrugAdd = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="krugAdd()"
          >Добавить круг</md-button
        >
      </md-dialog-actions>
    </md-dialog> -->
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
      //showConfirmApvDelete: false,
      // showDialogKrugAdd: false,
      // title__: "",

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
    };
  },
  methods: {
    showErrorNotify(r) {
      this.$notify({
        message: `<h3>${r.errorCode}</h3>` + `<p>${r.errorMessage}</p>`,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "warning",
      });
    },
    showSuccessNotify(r) {
      this.$notify({
        message: `<h3>${r.title}</h3>` + `<p>${r.message}</p>`,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "success",
      });
    },
    load() {
      this.ajax.getMain(
        this,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          // searchQuery: this.searchQuery,
        },
        (r) => {
          if (r.status == "ok") {
            this.model = r.data.items;
            this.queryLength = r.data.queryLength;
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    // searchRequest() {
    //   if ((this.searchQuery.length >= 3) | (this.searchQuery.length == 0)) {
    //     this.loadKrug();
    //   }
    // },
    // highlightedTextArrays(text, search) {
    //   if (text == null) return [];

    //   return search
    //     ? text.split(
    //         RegExp(`(${search.replace(/[\\^$|.*?+{}()[\]]/g, "\\$&")})`, "gi")
    //       )
    //     : [text];
    // },
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

.material-icons {
  margin-right: 15px;
}

.div__toolbar_right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.button__refresh {
  margin-left: 15px;
}

/* 
.div__my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
} */
</style>
