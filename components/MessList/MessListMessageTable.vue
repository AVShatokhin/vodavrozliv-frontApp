<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>chat_bubble_outline</md-icon>
          </div>
          <h4 class="title">Сообщения</h4>
        </md-card-header>
        <md-card-content>
          <md-table
            :value="modelArray"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <div></div>
              <div
                class="div__toolbar_right"
                v-if="$store.getters.checkPermition(permition)"
              >
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
              <md-table-cell md-label="Идентификатор сообщения">
                {{ item.messCode }}
              </md-table-cell>
              <md-table-cell md-label="Текстовое описание сообщения">
                <mess-list-message-text-edit
                  :messCode="item.messCode"
                  :messText="item.messText"
                  @changed="changed"
                ></mess-list-message-text-edit>
              </md-table-cell>
              <md-table-cell md-label="Рассылка">
                <mess-activate-button
                  :itemKey="item.messCode"
                  :isActive="item.isActive"
                  @changeIsActive="changeIsActive"
                >
                </mess-activate-button>
              </md-table-cell>
              <md-table-cell md-label="">
                <simple-delete-button
                  v-if="$store.getters.checkPermition(permition)"
                  :itemKey="item.messCode"
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
          <label>Идентификатор сообщения</label>
          <md-input v-model="messCode__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Текстовое описание сообщения</label>
          <md-input v-model="messText__" type="text"></md-input>
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
import MessListMessageTextEdit from "./MessListMessageTextEdit.vue";
import MessActivateButton from "./MessActivateButton.vue";

export default {
  name: "mess-list-message-table",
  components: {
    SimpleDeleteButton,
    MessListMessageTextEdit,
    MessActivateButton,
  },
  data() {
    return {
      showAddDialog: false,
      messCode__: "",
      messText__: "",
      permition: ["PROGRAMMER"],

      // модель данных
      modelArray: [],
      // модель данных
    };
  },
  methods: {
    addItem() {
      if (this.messCode__.length == 0) {
        this.showErrorNotify(this, {
          errorCode: "MESSAGE_ID_ERROR",
          errorMessage: "Идентификатор сообщения не может быть пустой строкой",
        });
        return;
      }

      if (this.messText__.length == 0) {
        this.showErrorNotify(this, {
          errorCode: "MESSAGETEXT_ERROR",
          errorMessage:
            "Текстовое описание сообщения не может быть пустой строкой",
        });
        return;
      }

      this.showAddDialog = false;

      this.ajax.addMessage(
        this,
        {
          messCode: this.messCode__,
          messText: this.messText__,
        },
        (r) => {
          if (r.status == "ok") {
            this.load();
            this.showSuccessNotify(this, {
              title: "OK",
              message: "Запись добавлена",
            });
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
      this.ajax.getMessages(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.modelArray = r.data.items;
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },

    deleteItem(data) {
      this.ajax.deleteMessage(
        this,
        { messCode: data.itemKey },
        (r) => {
          if (r.status == "ok") {
            this.load();
            this.showSuccessNotify(this, {
              title: "OK",
              message: "Запись удалена!",
            });
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    changeIsActive(data) {
      this.ajax.changeIsActiveMessage(
        this,
        { messCode: data.itemKey, isActive: data.isActive },
        (r) => {
          if (r.status == "ok") {
            this.load();
            this.showSuccessNotify(this, {
              title: "OK",
              message: "Список рассылки изменён!",
            });
          } else {
            this.showErrorNotify(this, r);
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
  computed: {},
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
