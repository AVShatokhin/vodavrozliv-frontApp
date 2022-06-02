<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>view_list</md-icon>
          </div>
          <h4 class="title">Список инженеров</h4>
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
            :value="myModel"
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
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Данные инженера">
                <user-card-simple
                  :uid="item.uid"
                  :name="item.extended.name"
                  :secondName="item.extended.secondName"
                  :position="item.extended.position"
                  :phone="item.extended.phone"
                  :email="item.email"
                  :searchQuery="searchQuery"
                >
                </user-card-simple>
              </md-table-cell>
              <md-table-cell md-label="Круг">
                <krug-list-set
                  :krugsModel="krugsModel"
                  :activeKrug="item.activeKrug"
                  :eng_uid="item.uid"
                  :searchQuery="searchQuery"
                  @activeKrugChanged="activeKrugChanged"
                >
                </krug-list-set>
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
import KrugListSet from "../components/KrugList/KrugListSet.vue";
import UserCardSimple from "../components/common/UserCardSimple.vue";

export default {
  components: {
    Pagination,
    KrugListSet,
    UserCardSimple,
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

      // модель данных
      usersModel: {},
      myModel: [],
      queryLength: 0,
      // модель данных

      // pagination params
      currentPage: 1,
      perPage: 10,
      perPageOptions: [5, 10, 25, 50],
      // pagination params

      searchQuery: "",

      krugsModel: [],
      krugsHash: {},
    };
  },
  methods: {
    recomputeModel() {
      let __temp = [];
      for (let sn in this.usersModel) {
        __temp.push(this.usersModel[sn]);
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
            this.krugsHash = {};
            r.data.forEach((e) => {
              this.krugsHash[`${e.krug_id}`] = e;
              if (e?.eng_uid > 0) {
                if (this.usersModel[e.eng_uid]) {
                  this.usersModel[e.eng_uid].activeKrug = e.krug_id;
                }
              }
            });
            this.myModel = this.recomputeModel();
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
      this.ajax.getEng(
        this,
        {
          perPage: this.perPage,
          currentPage: this.currentPage - 1,
          searchQuery: this.searchQuery,
        },
        (r) => {
          if (r.status == "ok") {
            this.usersModel = r.data.items;
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
      this.ajax.changeEngKrug(
        this,
        {
          eng_uid: data.eng_uid,
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

.button__add_apv {
  margin-left: 15px;
}

.div__my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
