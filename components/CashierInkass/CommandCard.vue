<template>
  <div class="my-user-item-container">
    <md-button
      @click.native="showEditDialog = true"
      class="md-primary my-md-button"
    >
      <span class="material-icons"> edit_note </span>
      Редактировать
      <md-dialog :md-active.sync="showEditDialog">
        <md-dialog-title>Редактирование инкассации</md-dialog-title>
        <div class="div__my-dialog-content">
          <div class="div__addinkass_row">
            <div class="div__addinkass_col">
              <simple-date-picker
                @dateChanged="dateInkassChanged"
                :startDate="dateInkass__"
              >
                <div class="div__datepicker_label">
                  <div>Дата инкассации:</div>
                </div>
              </simple-date-picker>
              <br />
              <simple-date-picker
                @dateChanged="dateCreationChanged"
                :startDate="dateCreation__"
              >
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
          <md-button class="md-default" @click="showEditDialog = false"
            >Закрыть</md-button
          >
          <md-button class="md-primary" @click="editInkassCompleted()"
            >Принять изменения</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </md-button>
    <md-button
      @click.native="showConfirmDialog = true"
      class="md-danger my-md-button"
    >
      <span class="material-icons"> highlight_off </span>
      Удалить
      <md-dialog-confirm
        :md-active.sync="showConfirmDialog"
        md-title="Удалить инкассацию?"
        md-content="После удаления инкассации восстановить даннные будет нельзя"
        md-confirm-text="Удалить"
        md-cancel-text="Отмена"
        @md-cancel="showConfirmDialog = false"
        @md-confirm="deleteItem()"
      />
    </md-button>
  </div>
</template>

<script>
import SimpleDatePicker from "../../components/common/SimpleDatePicker.vue";

export default {
  name: "command-card",
  components: {
    SimpleDatePicker,
  },

  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    apvs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      showConfirmDialog: false,
      showEditDialog: false,
      dontUseSn__: this.item.dontUseSn,
      m1__: this.item.m1,
      m2__: this.item.m2,
      m5__: this.item.m5,
      m10__: this.item.m10,
      k__: this.item.k,
      comment__: this.item.comment,
      sn__: this.item.sn,
      dateInkass__: new Date(this.item.dateInkass),
      dateCreation__: new Date(this.item.dateCreation),
    };
  },
  methods: {
    deleteItem() {
      this.ajax.post(
        this,
        "delCashierInkass",
        {
          cinkass_id: this.item.cinkass_id,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify(this, {
              title: "Удаление инкассации",
              message: "OK",
            });
            this.$emit("itemDeleted");
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (r) => {}
      );
    },
    dateInkassChanged(newValue) {
      this.dateInkass__ = newValue;
    },
    dateCreationChanged(newValue) {
      this.dateCreation__ = newValue;
    },
    editInkassCompleted() {
      let data = {
        dontUseSn: this.dontUseSn__,
        m1: this.m1__,
        m2: this.m2__,
        m5: this.m5__,
        m10: this.m10__,
        k: this.k__,
        sn: this.sn__,
        comment: this.comment__,
        cinkass_id: this.item.cinkass_id,
        dateInkass: Math.round(this.dateInkass__.getTime() / 1000),
        dateCreation: Math.round(this.dateCreation__.getTime() / 1000),
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
        "updateCashierInkass",
        {
          data,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify(this, {
              title: "Изменения приняты",
              message: "OK",
            });
            this.showEditDialog = false;
            this.$emit("itemChanged");
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {}
      );
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.my-user-item-container {
  margin-top: 15px;
  margin-bottom: 15px;
}

.material-icons {
  margin-right: 15px;
}

.my-md-button {
  width: 200px;
  height: 41px;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
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
</style>
