<template>
  <div class="my-user-item-container">
    <md-button
      @click.native="showDialog = true"
      class="md-primary my-md-button"
    >
      <span class="material-icons"> add </span>
      добавить
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Добавить запись</md-dialog-title>
        <div class="div__my-dialog-content">
          <div class="div__addwash_col">
            <simple-date-picker @dateChanged="dateChanged" :startDate="date__">
              <div class="div__datepicker_label">
                <div>Дата:</div>
              </div>
            </simple-date-picker>
            <br />
            <md-field>
              <label>Серийный терминала (пример: N001)</label>
              <md-input v-model="sn__" type="text"></md-input>
            </md-field>
            <md-field>
              <label>Комментарий</label>
              <md-input v-model="comment__" type="text"></md-input>
            </md-field>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-default" @click="showDialog = false"
            >Закрыть</md-button
          >
          <md-button class="md-primary" @click="add()">Добавить</md-button>
        </md-dialog-actions>
      </md-dialog>
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
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      showDialog: false,
      comment__: "",
      sn__: "",
      date__: new Date(this.item.date),
    };
  },
  methods: {
    dateChanged(newValue) {
      this.date__ = newValue;
    },
    add() {
      let data = {
        sn: this.sn__,
        comment: this.comment__,
        date: Math.round(this.date__.getTime() / 1000),
      };

      if (data.sn.length != 4) {
        this.showErrorNotify(this, {
          errorCode: "Ошибка заполнения",
          errorMessage: "Серийный номер должен содержать 4 символа",
        });
        return;
      }

      if (this.apvs?.[this.sn__] == null) {
        this.showErrorNotify(this, {
          errorCode: "Ошибка заполнения",
          errorMessage: "Аппарат с заданным серийным номером не найден",
        });
        return;
      }

      this.ajax.post(
        this,
        "addWashApv",
        {
          data,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify(this, {
              title: "Запись добавлена",
              message: "OK",
            });
            this.showDialog = false;
            this.$emit("itemAdded");
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

.div__addwash_col {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: column;
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
