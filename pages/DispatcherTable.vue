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
          <h4 class="title">Сводная таблица</h4>
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
                <dispatcher-terminal-card
                  :item="item"
                ></dispatcher-terminal-card>
              </md-table-cell>
              <md-table-cell md-label="Метка времени">
                <simple-item-lts-card :item="item"></simple-item-lts-card>
              </md-table-cell>
              <md-table-cell md-label="Заправка">
                <div v-if="item.chargeInfo.lts != undefined">
                  <div>
                    <b>{{ item.chargeInfo.v1 }}, л.</b>
                  </div>
                  <simple-item-lts-card
                    :item="item.chargeInfo"
                  ></simple-item-lts-card>
                </div>
                <div v-else>-</div>
              </md-table-cell>
              <md-table-cell md-label="Продано от датчика">
                <div>Датчик: {{ item.data.v1 }}, л.</div>
                <div>Продано: {{ item.data.v2 }}, л.</div>
              </md-table-cell>
              <md-table-cell md-label="Остаток">
                <div>{{ item.remain }}, л.</div>
              </md-table-cell>
              <md-table-cell md-label="Будет пуст через">
                <div v-if="item.elapsedTime > 0">
                  {{ item.elapsedTime }}, ч. (~ {{ item.AVGHourlySell }}, л./ч.)
                </div>
                <div v-else>Ошибка</div>
              </md-table-cell>
              <md-table-cell md-label="Ошибки">
                <div class="my-col">
                  <div v-if="item.data.errorCode == 3">нет воды</div>
                  <div v-if="item.data.errorCode == 4">засор</div>
                  <div v-if="item.data.errorCode == 15">АПВ замёрз</div>
                  <div v-if="item.data.errorCode == 18">нет 220В в АПВ</div>
                  <div v-if="item.online == false">нет связи с АПВ</div>
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
import DispatcherFilterCard from "../components/DispatcherTable/DispatcherFilterCard.vue";
import DispatcherTerminalCard from "../components/DispatcherTable/DispatcherTerminalCard.vue";
import SimpleItemLtsCard from "../components/common/SimpleItemLTSCard.vue";

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
      perPage: 10,
      perPageOptions: [5, 10, 25, 50],
      // pagination params

      requestData: { sortType: 0, queryRemain: 0, apvs: [] },
    };
  },
  methods: {
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },

    load() {
      this.ajax.getDispatcherMain(
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
  margin-left: 20px;
  margin-right: 20px;
}

.my-col {
  display: flex;
  flex-direction: column;
}
</style>
