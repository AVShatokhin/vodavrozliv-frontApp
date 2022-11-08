<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>attach_money</md-icon>
          </div>
          <h4 class="title">Настройки выборки</h4>
        </md-card-header>

        <filter-card @sendRequest="sendRequest"></filter-card>
      </md-card>

      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>attach_money</md-icon>
          </div>
          <h4 class="title">Инкассации</h4>
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
              <div class="div__toolbar_right"></div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Реквизиты терминала">
                <simple-terminal-card :item="item"></simple-terminal-card>
              </md-table-cell>
              <md-table-cell md-label="Реквизиты операции">
                <inkas-jou-operation-card
                  :item="item"
                ></inkas-jou-operation-card>
              </md-table-cell>
              <md-table-cell md-label="Приход">
                <inkas-jou-income-card :item="item"></inkas-jou-income-card>
              </md-table-cell>
              <md-table-cell md-label="Бригада">
                <inkas-jou-brig-card :item="item"></inkas-jou-brig-card>
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
import InkasJouIncomeCard from "../components/InkasJou/InkasJouIncomeCard.vue";
import SimpleTerminalCard from "../components/common/SimpleTerminalCard.vue";
import InkasJouOperationCard from "../components/InkasJou/InkasJouOperationCard.vue";
import InkasJouBrigCard from "../components/InkasJou/InkasJouBrigCard.vue";
import FilterCard from "../components/InkasJou/FilterCard.vue";

export default {
  components: {
    Pagination,
    SimpleTerminalCard,
    InkasJouOperationCard,
    InkasJouIncomeCard,
    InkasJouBrigCard,
    FilterCard,
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
    snText() {
      return this.highlightedTextArrays(this.sn__, this.searchQuery);
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

      // searchQuery: "",
      requestData: {
        dateInkassFrom: Math.round(new Date().getTime()),
        dateInkassTo: Math.round(new Date().getTime()),
        apvs: [],
      },
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },
    load() {
      this.ajax.getInkas(
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
