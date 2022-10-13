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
          <div class="my-row" md-alignment="space-between">
            <div>
              <p class="card-category">
                Показано с {{ from + 1 }} по {{ to }} из
                {{ queryLength }} записей
              </p>
            </div>
            <pod-itog :data="podItog"></pod-itog>
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
              <div class="div__toolbar_right">
                <md-field> </md-field>

                <md-button
                  style="width: 230px; height: 41px; margin-right: 15px"
                  class="md-success button__refresh"
                  @click="
                    showAddDialog = true;
                    dontUseSn__ = false;
                  "
                >
                  <span class="material-icons"> add_circle_outline </span>
                  добавить инкассацию
                </md-button>
              </div>
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

      <md-dialog :md-active.sync="showAddDialog">
        <md-dialog-title>Добавление инкассации</md-dialog-title>
        <div class="div__my-dialog-content">
          <div class="div__addinkass_row">
            <div class="div__addinkass_col">
              <simple-date-picker @dateChanged="dateInkassChanged">
                <div class="div__datepicker_label">
                  <div>Дата инкассации:</div>
                </div>
              </simple-date-picker>
              <br />
              <simple-date-picker @dateChanged="dateCreationChanged">
                <div class="div__datepicker_label">
                  <div>Дата создания:</div>
                </div>
              </simple-date-picker>
              <br />
              <md-field>
                <label>Серийный терминала (пример: N001)</label>
                <md-input v-model="sn__" type="text"></md-input>
              </md-field>
              <md-checkbox v-model="dontUseSn__"
                >Внести без контроля серийного номера</md-checkbox
              >

              <md-field>
                <label>Комментарий</label>
                <md-input v-model="comment__" type="text"></md-input>
              </md-field>
            </div>
            <div class="div__addinkass_col">
              <md-field>
                <label>1 руб., шт.</label>
                <md-input v-model="m1__" type="text"></md-input>
              </md-field>
              <md-field>
                <label>2 руб., шт.</label>
                <md-input v-model="m2__" type="text"></md-input>
              </md-field>
              <md-field>
                <label>5 руб., шт.</label>
                <md-input v-model="m5__" type="text"></md-input>
              </md-field>
              <md-field>
                <label>10 руб., шт.</label>
                <md-input v-model="m10__" type="text"></md-input>
              </md-field>
              <md-field>
                <label>Сумма купюрами, руб.</label>
                <md-input v-model="k__" type="text"></md-input>
              </md-field>
            </div>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-default" @click="showAddDialog = false"
            >Закрыть</md-button
          >
          <md-button class="md-default" @click="clearAddInkassDialog()"
            >Очистить</md-button
          >
          <md-button class="md-primary" @click="addInkass()"
            >Добавить инкассацию</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import DateCard from "../components/common/SimpleDateView.vue";
import SimpleDatePicker from "../components/common/SimpleDatePicker.vue";

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
    SimpleDatePicker,
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
      showAddDialog: false,
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
      requestData: {
        sortType: 0,
        useInkassDate: false,
        useCreationDate: true,
        dateCreationFrom: Math.round(new Date().getTime()),
        dateCreationTo: Math.round(new Date().getTime()),
        dateInkassFrom: 0,
        dateInkassTo: 0,
        apvs: [],
      },

      podItog: {},
      apvs: [],

      // создание инкассации
      dontUseSn__: false,
      m1__: 0,
      m2__: 0,
      m5__: 0,
      m10__: 0,
      k__: 0,
      sn__: "",
      comment__: "",
      dateInkass__: Math.round(new Date().getTime() / 1000),
      dateCreation__: Math.round(new Date().getTime() / 1000),
    };
  },
  methods: {
    clearAddInkassDialog() {
      this.dontUseSn__ = false;
      this.m1__ = 0;
      this.m2__ = 0;
      this.m5__ = 0;
      this.m10__ = 0;
      this.k__ = 0;
      this.sn__ = "";
      this.comment__ = "";
      this.dateInkass__ = Math.round(new Date().getTime() / 1000);
      this.dateCreation__ = Math.round(new Date().getTime() / 1000);
    },
    sendRequest(requestData) {
      this.requestData = requestData;
      this.load();
    },
    dateInkassChanged(newValue) {
      this.dateInkass__ = Math.round(newValue.getTime() / 1000);
    },
    dateCreationChanged(newValue) {
      this.dateCreation__ = Math.round(newValue.getTime() / 1000);
    },
    addInkass() {
      let data = {
        dontUseSn: this.dontUseSn__,
        sn: this.sn__,
        m1: this.m1__,
        m2: this.m2__,
        m5: this.m5__,
        m10: this.m10__,
        k: this.k__,
        comment: this.comment__,
        dateInkass: this.dateInkass__,
        dateCreation: this.dateCreation__,
      };

      if (!data.dontUseSn) {
        if (data.sn.length != 4) {
          this.showErrorNotify(this, {
            errorCode: "Ошибка заполнения",
            errorMessage: "Серийный номер должен содержать 4 символа",
          });
          return;
        }

        if (
          this.apvs.find((el) => {
            return el.sn == data.sn;
          }) == undefined
        ) {
          this.showErrorNotify(this, {
            errorCode: "Ошибка заполнения",
            errorMessage: "Аппарат с заданным серийным номером не найден",
          });
          return;
        }
      } else {
        data.sn = "";
      }

      this.ajax.post(
        this,
        "addCashierInkass",
        {
          data,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify(this, {
              title: "Добавление инкассации",
              message: "OK",
            });
            this.showAddDialog = false;
            this.load();
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
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
            this.apvs = r.apvs;
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

.material-icons {
  margin-right: 25px;
}

.div__toolbar_right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.div__my-dialog-content {
  margin: 15px;
}

.div__datepicker_label {
  display: flex;
  padding-right: 20px;
  flex-direction: column;
  justify-content: space-around;
  width: 250px;
}

.div__addinkass_row {
  display: flex;
  flex-direction: row;
}

.div__addinkass_col {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: column;
  width: 50%;
}

.div__date_label {
  padding-right: 5px;
}
</style>
