<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>toll</md-icon>
          </div>
          <h4 class="title">Круги</h4>
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
                    placeholder="Поиск круга"
                    v-model="searchQuery"
                  >
                  </md-input>
                </md-field>

                <md-button
                  style="width: 230px; height: 41px; margin-right: 15px"
                  class="md-success button__add_apv"
                  @click="showDialogKrugAdd = true"
                >
                  <span class="material-icons"> playlist_add_circle </span>
                  Добавить круг
                </md-button>
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="ID круга">
                <krug-list-id-block
                  :krug_id="item.krug_id"
                  :searchQuery="searchQuery"
                >
                </krug-list-id-block>
              </md-table-cell>
              <md-table-cell md-label="Название круга">
                <krug-list-edit-title
                  :title="item.title"
                  :krug_id="item.krug_id"
                  :searchQuery="searchQuery"
                  @krugChanged="krugChanged"
                >
                </krug-list-edit-title>
              </md-table-cell>
              <md-table-cell md-label="">
                <krug-list-delete-button
                  :krug_id="item.krug_id"
                  @krugDeleted="krugDeleted"
                ></krug-list-delete-button>
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

    <md-dialog :md-active.sync="showDialogKrugAdd">
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
    </md-dialog>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import KrugListEditTitle from "../components/KrugList/KrugListEditTitle.vue";
import KrugListIdBlock from "../components/KrugList/KrugListId.vue";
import KrugListDeleteButton from "../components/KrugList/KrugListDelButton.vue";

export default {
  components: {
    Pagination,
    KrugListDeleteButton,
    KrugListEditTitle,
    KrugListIdBlock,
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
      //showConfirmApvDelete: false,
      showDialogKrugAdd: false,
      title__: "",

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
    };
  },
  methods: {
    recomputeModel() {
      let __temp = [];
      for (let i in this.usersModel) {
        __temp.push(this.usersModel[i]);
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
    krugAdd() {
      if (this.title__.length == 0) {
        this.showErrorNotify({
          errorCode: "SN_ERROR",
          errorMessage: "Наименование круга не может быть пустой строкой",
        });
        return;
      }

      this.showDialogKrugAdd = false;

      this.ajax.addKrug(
        this,
        {
          title: this.title__,
        },
        (r) => {
          if (r.status == "ok") {
            this.loadKrug();
            this.showSuccessNotify({
              title: "OK",
              message: "Круг добавлен",
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
    loadKrug() {
      this.ajax.getKrug(
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
    krugDeleted() {
      this.loadKrug();
    },
    krugChanged() {
      this.loadKrug();
    },
    searchRequest() {
      if ((this.searchQuery.length >= 3) | (this.searchQuery.length == 0)) {
        this.loadKrug();
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
    this.loadKrug();
  },

  watch: {
    perPage() {
      this.loadKrug();
    },
    currentPage() {
      this.loadKrug();
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
