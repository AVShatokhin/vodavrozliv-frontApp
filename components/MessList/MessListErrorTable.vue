<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>error</md-icon>
          </div>
          <h4 class="title">Ошибки</h4>
        </md-card-header>
        <md-card-content>
          <md-table
            :value="modelArray"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <div></div>
              <div class="div__toolbar_right" v-if="isProgrammer">
                <md-button
                  class="md-success button__add"
                  @click="showAddDialog = true"
                >
                  <span class="material-icons"> playlist_add_circle </span>
                  Добавить
                </md-button>
              </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Идентификатор ошибки">
                {{ item.errorCode }}
              </md-table-cell>
              <md-table-cell md-label="Текстовое описание ошибки">
                <mess-list-error-text-edit
                  :errorCode="item.errorCode"
                  :errorText="item.errorText"
                  @changed="changed"
                ></mess-list-error-text-edit>
              </md-table-cell>
              <md-table-cell md-label="Рассылка">
                <mess-activate-button
                  :itemKey="item.errorCode"
                  :isActive="item.isActive"
                  @changeIsActive="changeIsActive"
                >
                </mess-activate-button>
              </md-table-cell>
              <md-table-cell md-label="">
                <simple-delete-button
                  v-if="isProgrammer"
                  :itemKey="item.errorCode"
                  @deleteItem="deleteItem"
                ></simple-delete-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>

    <md-dialog :md-active.sync="showAddDialog">
      <md-dialog-title>Добавить запись</md-dialog-title>
      <div class="div__my-dialog-content">
        <md-field>
          <label>Идентификатор ошибки</label>
          <md-input v-model="errorCode__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Текстовое описание ошибки</label>
          <md-input v-model="errorText__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showAddDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="addItem()">Добавить</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import SimpleDeleteButton from "../common/SimpleDeleteButton.vue";
import MessListErrorTextEdit from "./MessListErrorTextEdit.vue";
import MessActivateButton from "./MessActivateButton.vue";

export default {
  name: "mess-list-error-table",
  components: { SimpleDeleteButton, MessListErrorTextEdit, MessActivateButton },
  computed: {
    isProgrammer() {
      return JSON.parse(localStorage.getItem("userData")).roles.includes(
        "PROGRAMMER"
      );
    },
  },
  data() {
    return {
      showAddDialog: false,
      errorCode__: "",
      errorText__: "",

      // модель данных
      modelArray: [],
      // модель данных
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
    addItem() {
      if (this.errorCode__.length == 0) {
        this.showErrorNotify({
          errorCode: "ERROR_ID_ERROR",
          errorMessage: "Идентификатор ошибки не может быть пустой строкой",
        });
        return;
      }

      if (this.errorText__.length == 0) {
        this.showErrorNotify({
          errorCode: "ERRORTEXT_ERROR",
          errorMessage:
            "Текстовое описание ошибки не может быть пустой строкой",
        });
        return;
      }

      this.showAddDialog = false;

      this.ajax.addError(
        this,
        {
          errorCode: this.errorCode__,
          errorText: this.errorText__,
        },
        (r) => {
          if (r.status == "ok") {
            this.load();
            this.showSuccessNotify({
              title: "OK",
              message: "Запись добавлена",
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

    load() {
      this.ajax.getErrors(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.modelArray = r.data.items;
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    deleteItem(data) {
      this.ajax.deleteError(
        this,
        { errorCode: data.itemKey },
        (r) => {
          if (r.status == "ok") {
            this.load();
            this.showSuccessNotify({
              title: "OK",
              message: "Запись удалена!",
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
    changeIsActive(data) {
      this.ajax.changeIsActiveError(
        this,
        { errorCode: data.itemKey, isActive: data.isActive },
        (r) => {
          if (r.status == "ok") {
            this.load();
            this.showSuccessNotify({
              title: "OK",
              message: "Список рассылки изменён!",
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
    changed() {
      this.load();
    },
  },
  mounted() {
    this.load();
  },

  watch: {},
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

.button__add {
  margin-left: 15px;
  width: 230px;
  height: 41px;
  margin-right: 15px;
}

.div__my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
