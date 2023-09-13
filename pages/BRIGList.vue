<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>view_list</md-icon>
          </div>
          <h4 class="title">Список бригад</h4>
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
            :value="brigModelArray"
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
                    placeholder="Поиск"
                    v-model="searchQuery"
                  >
                  </md-input>
                </md-field>
                <md-button
                  style="width: 230px; height: 41px; margin-right: 15px"
                  class="md-success button__add"
                  @click="showDialogAdd = true"
                >
                  <span class="material-icons"> playlist_add_circle </span>
                  Добавить бригаду
                </md-button>
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Параметры бригады">
                <brig-card
                  :brigItem="item"
                  :searchQuery="searchQuery"
                  @brigChanged="brigChanged"
                >
                </brig-card>
              </md-table-cell>
              <md-table-cell md-label="Состав бригады">
                <brig-members
                  :engModel="engModel"
                  :brigMembers="item.brigMembers"
                  :brig_id="item.brig_id"
                  @brigMembersChanged="brigMembersChanged"
                >
                </brig-members>
              </md-table-cell>
              <md-table-cell md-label="Круг">
                <krug-list-set
                  :krugsModel="krugsModel"
                  :activeKrug="item.activeKrug"
                  :brig_id="item.brig_id"
                  :searchQuery="searchQuery"
                  @activeKrugChanged="activeKrugChanged"
                >
                </krug-list-set>
              </md-table-cell>
              <md-table-cell md-label="">
                <brig-list-delete-button
                  :brig_id="item.brig_id"
                  @itemDeleted="itemDeleted"
                ></brig-list-delete-button>
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

    <md-dialog :md-active.sync="showDialogAdd">
      <md-dialog-title>Добавление бригады</md-dialog-title>
      <div class="div__my-dialog-content">
        <md-field>
          <label>Имя бригады</label>
          <md-input v-model="brigName__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Гос. номер авто</label>
          <md-input v-model="brigCar__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Код ключа</label>
          <md-input v-model="brigKey__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Номер телефона</label>
          <md-input v-model="brigPhone__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialogAdd = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="add()"
          >Добавить бригаду</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import KrugListSet from "../components/KrugList/KrugListSet.vue";
import BrigCard from "../components/BrigList/BrigCard.vue";
import BrigListDeleteButton from "../components/BrigList/BrigListDelButton.vue";
import BrigMembers from "../components/BrigList/BrigMembers.vue";

export default {
  components: {
    Pagination,
    KrugListSet,
    BrigCard,
    BrigListDeleteButton,
    BrigMembers,
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
      showDialogAdd: false,
      showDialogDelete: false,
      brigName__: "",
      brigCar__: "",
      brigKey__: "",
      brigPhone__: "",

      // модель данных бригад
      brigModelHash: {},
      brigModelArray: [],
      queryLength: 0,
      // модель данных

      // модель данных инженеров
      engModel: [],

      // pagination params
      currentPage: 1,
      perPage: 100,
      perPageOptions: [25, 50, 100, 300],
      // pagination params

      searchQuery: "",

      krugsModel: [],
      krugsHash: {},
    };
  },
  methods: {
    recomputeModel() {
      let __temp = [];
      for (let _it in this.brigModelHash) {
        __temp.push(this.brigModelHash[_it]);
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
    loadAllKrugs() {
      this.ajax.getAllKrugs(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.krugsModel = r.data;
            this.krugsModelHash = {};
            r.data.forEach((e) => {
              this.krugsHash[`${e.krug_id}`] = e;
              if (e?.brig_id > 0) {
                if (this.brigModelHash[e.brig_id]) {
                  this.brigModelHash[e.brig_id].activeKrug = e.krug_id;
                }
              }
            });
            this.loadAllEngs();
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    loadAllEngs() {
      this.ajax.getAllEngs(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.engModel = r.data;

            for (let __brig_id in this.brigModelHash) {
              let __tmpArray = [];
              this.brigModelHash[__brig_id].brigMembers.forEach((uid) => {
                let __item = this.engModel.find((e) => e.uid == uid);

                if (__item == undefined) {
                  __item = {
                    uid,
                    name: "USER DELETED",
                    secondName: "",
                    email: "",
                  };
                }

                __tmpArray.push(__item);
              });
              this.brigModelHash[__brig_id].brigMembers = __tmpArray;

              this.brigModelArray = this.recomputeModel();
            }
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    load() {
      this.ajax.getBrig(
        this,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          searchQuery: this.searchQuery,
        },
        (r) => {
          if (r.status == "ok") {
            this.brigModelHash = {};
            this.brigModelArray = [];
            this.queryLength = 0;

            this.brigModelHash = r.data.items;
            this.queryLength = r.data.queryLength;
            this.loadAllKrugs();
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    activeKrugChanged(data) {
      this.ajax.changeBrigKrug(
        this,
        {
          brig_id: data.brig_id,
          newActiveKrug: data.newActiveKrug,
          oldActiveKrug: data.oldActiveKrug,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "Изменение круга",
              message: "Изменение круга выполнено успешно",
            });
            this.load();
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    searchRequest() {
      if ((this.searchQuery.length >= 3) | (this.searchQuery.length == 0)) {
        this.load();
      }
    },
    highlightedTextArrays(text, search) {
      return search
        ? text.split(
            RegExp(`(${search.replace(/[\\^$|.*?+{}()[\]]/g, "\\$&")})`, "gi")
          )
        : [text];
    },
    add() {
      this.showDialogAdd = false;
      this.ajax.addBrig(
        this,
        {
          brigName: this.brigName__,
          brigCar: this.brigCar__,
          brigKey: this.brigKey__,
          brigPhone: this.brigPhone__,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "OK",
              message: "Бригада добавлена!",
            });
            this.load();
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    brigMembersChanged() {
      this.load();
    },
    itemDeleted() {
      this.load();
    },
    brigChanged() {
      this.load();
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
/* .md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
} */

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

.button__add {
  margin-left: 15px;
}

.div__my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
