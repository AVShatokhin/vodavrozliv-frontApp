<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>view_list</md-icon>
          </div>
          <h4 class="title">Список АПВ</h4>
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

        <div class="my-row" md-alignment="space-between">
          <div class="my-row">
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
        </div>
        <md-card-content>
          <md-table
            :value="apvModelArray"
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
                  <md-input
                    @keyup.enter="searchRequest()"
                    type="search"
                    class="mb-3"
                    clearable
                    style="width: 200px"
                    placeholder="Поиск АПВ"
                    v-model="searchQuery"
                  >
                  </md-input>
                </md-field>

                <md-button
                  style="width: 230px; height: 41px; margin-right: 15px"
                  class="md-success button__add_apv"
                  @click="showDialogAPVAdd = true"
                >
                  <span class="material-icons"> playlist_add_circle </span>
                  Добавить АПВ
                </md-button>
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Серийный номер">
                <apv-list-sn-block :sn="item.sn" :searchQuery="searchQuery">
                </apv-list-sn-block>
              </md-table-cell>
              <md-table-cell md-label="Настройки">
                <apv-list-options
                  :apvItem="item"
                  :searchQuery="searchQuery"
                  @apvChanged="apvChanged"
                >
                </apv-list-options>
              </md-table-cell>
              <md-table-cell md-label="Внутренние данные">
                <apv-list-incomes :apvItem="item" :searchQuery="searchQuery">
                </apv-list-incomes>
              </md-table-cell>
              <md-table-cell md-label="Круг">
                <krug-list-set
                  :krugsModel="krugsModel"
                  :activeKrug="item.activeKrug"
                  :sn="item.sn"
                  :searchQuery="searchQuery"
                  @activeKrugChanged="activeKrugChanged"
                >
                </krug-list-set>
              </md-table-cell>
              <md-table-cell md-label="">
                <apv-list-delete-button
                  :sn="item.sn"
                  @apvDeleted="apvDeleted"
                ></apv-list-delete-button>
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

    <md-dialog :md-active.sync="showDialogAPVAdd">
      <md-dialog-title>Добавление АПВ</md-dialog-title>
      <div class="div__my-dialog-content">
        <md-field>
          <label>Серйиный номер</label>
          <md-input v-model="sn__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Адрес</label>
          <md-input v-model="address__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>ТГ-ссылка</label>
          <md-input v-model="tgLink__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Сейриний номер эквайринга</label>
          <md-input v-model="snEQ__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialogAPVAdd = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="apvAdd()">Добавить АПВ</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import ApvListDeleteButton from "../../app/components/APVList/APVListDeleteButton.vue";

import ApvListSnBlock from "../../app/components/APVList/APVListSn.vue";
import KrugListSet from "../../app/components/KrugList/KrugListSet.vue";
import ApvListOptions from "../../app/components/APVList/APVListOptions.vue";
import ApvListIncomes from "../../app/components/APVList/APVListIncomes.vue";

export default {
  components: {
    Pagination,
    ApvListDeleteButton,
    ApvListSnBlock,
    KrugListSet,
    ApvListOptions,
    ApvListIncomes,
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
      showConfirmApvDelete: false,
      showDialogAPVAdd: false,
      sn__: "",
      address__: "",
      tgLink__: "",
      snEQ__: "",

      // модель данных
      apvModelHash: {},
      apvModelArray: [],
      queryLength: 0,
      // модель данных

      // pagination params
      currentPage: 1,
      perPage: 100,
      perPageOptions: [25, 50, 100, 300],
      // pagination params

      searchQuery: "",

      krugsModel: [],
      krugsHash: {},

      //requestData: { sortType: 0, apvs: [] },

      exportFileName: "",
      json_fields: {
        sn: "sn",
        Адрес: "address",
        "TГ-ссылка": "tgLink",
        "Последнеее обновление": "lts",
        "Версия ПО": "version",
        Оператор: "oper",
        "Состояние соединения": "linkState",
        Круг: "krug",
        "Серийный номер эквайринга": "snEQ",
      },
    };
  },
  methods: {
    recomputeModel() {
      let __temp = [];
      for (let sn in this.apvModelHash) {
        this.apvModelHash[sn].lts = new Date(this.apvModelHash[sn].lts);
        __temp.push(this.apvModelHash[sn]);
      }
      return __temp;
    },
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
    apvAdd() {
      if (this.sn__.length != 4) {
        this.showErrorNotify({
          errorCode: "SN_ERROR",
          errorMessage:
            "Серийный номер должен содержать 4 символа. Рекомендуемый формат: N000",
        });
        return;
      }

      if (this.address__.length == 0) {
        this.showErrorNotify({
          errorCode: "ADDRESS_ERROR",
          errorMessage: "Адрес не может быть пустой строкой",
        });
        return;
      }

      this.showDialogAPVAdd = false;

      this.ajax.addAPV(
        this,
        {
          sn: this.sn__,
          address: this.address__,
          snEQ: this.snEQ__,
          tgLink: this.tgLink__,
        },
        (r) => {
          if (r.status == "ok") {
            this.loadAPV();
            this.showSuccessNotify({
              title: "OK",
              message: "АПВ добавлен",
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    loadAllKrugs() {
      this.ajax.getAllKrugs(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.krugsModel = r.data;
            this.krugsHash = {};
            r.data.forEach((e) => {
              this.krugsHash[`${e.krug_id}`] = e;
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    loadAPV() {
      this.ajax.getAPV(
        this,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          searchQuery: this.searchQuery,
        },
        (r) => {
          if (r.status == "ok") {
            this.apvModelHash = r.data.items;
            this.queryLength = r.data.queryLength;
            this.apvModelArray = this.recomputeModel();
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    apvDeleted() {
      this.loadAPV();
    },
    apvChanged() {
      this.loadAPV();
    },
    activeKrugChanged(data) {
      this.ajax.changeApvKrug(
        this,
        {
          sn: data.sn,
          newActiveKrug: data.newActiveKrug,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "Изменение круга",
              message: "Изменение круга выполнено успешно",
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    searchRequest() {
      if ((this.searchQuery.length >= 3) | (this.searchQuery.length == 0)) {
        this.loadAPV();
      }
    },
    highlightedTextArrays(text, search) {
      if (text == null) return [];

      return search
        ? text.split(
            RegExp(`(${search.replace(/[\\^$|.*?+{}()[\]]/g, "\\$&")})`, "gi")
          )
        : [text];
    },
    async fetchData() {
      let FILE_NAME = (name) => {
        let norm = (n) => {
          return n > 9 ? n : "0" + n;
        };

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

      this.exportFileName = FILE_NAME("apv_list");

      let __result = [];

      await this.ajax.getAPV_XML(
        this,
        {
          searchQuery: this.searchQuery,
        },
        (r) => {
          if (r.status == "ok") {
            Object.keys(r.data.items).forEach((sn) => {
              let __apv = r.data.items[sn];

              let __krug;
              if (__apv?.activeKrug == null) {
                __krug = "не задан";
              } else {
                __krug = this.krugsHash[__apv?.activeKrug]?.title || "не задан";
              }

              __result.push({
                sn: __apv.sn,
                address: __apv.address,
                tgLink: __apv.tgLink + ".",
                snEQ: __apv.snEQ,
                lts: this.formatTime(__apv.lts),
                version: __apv.version,
                oper: __apv.oper,
                linkState: __apv.linkState,
                krug: __krug,
              });
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          // console.log(err);
        }
      );
      return __result;
    },
  },
  mounted() {
    this.loadAPV();
    this.loadAllKrugs();
  },

  watch: {
    perPage() {
      this.loadAPV();
    },
    currentPage() {
      this.loadAPV();
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

.material-icons {
  margin-right: 15px;
}

.div__toolbar_right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.button__add_apv {
  margin-left: 15px;
}

.p__padding {
  padding-left: 30px;
  font-weight: bold;
  color: rgb(60, 73, 192);
}

.div__my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}

.pointer {
  cursor: pointer;
  padding-left: 5px;
  color: rgb(60, 73, 192);
}
</style>
