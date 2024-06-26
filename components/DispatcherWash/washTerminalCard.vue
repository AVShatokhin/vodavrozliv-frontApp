<template>
  <div :class="terminalCardStyle(item)">
    <md-button @click="showComment = true" class="md-simple md-just-icon"
      ><md-icon>search</md-icon>

      <md-dialog :md-active.sync="showComment">
        <md-dialog-title>Детали</md-dialog-title>
        <div class="div__my-dialog-content">
          Комментарий:<b> {{ item.comment || "Нет комментария" }}</b
          ><br />
          Ответственный: <b> {{ item.user || "Не назначен" }}</b>
        </div>
        <md-dialog-actions>
          <md-button class="md-default" @click="showComment = false"
            >Закрыть</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </md-button>
    <md-button @click="showEditDialog = true" class="md-simple md-just-icon"
      ><md-icon>edit</md-icon>

      <md-dialog :md-active.sync="showEditDialog">
        <md-dialog-title>Редактировать запись</md-dialog-title>
        <div class="div__my-dialog-content">
          <div class="div__addwash_col">
            <simple-date-picker
              @dateChanged="dateChanged"
              :startDate="newDate__"
            >
              <div class="div__datepicker_label">
                <div>Дата:</div>
              </div>
            </simple-date-picker>
            <br />
            <md-field>
              <label>Серийный номер терминала</label>
              <md-input v-model="newSn__" type="text"></md-input>
            </md-field>
            <md-field>
              <label>Комментарий</label>
              <md-input v-model="comment__" type="text"></md-input>
            </md-field>
            <md-field class="my-dialog-content">
              <label for="pages">Ответственный</label>
              <md-select v-model="user__" name="users">
                <md-option
                  v-for="item in Object.values(usersModel)"
                  :key="item.uid"
                  :value="item.uid"
                >
                  {{ getUserName(item) }}
                </md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-default" @click="showEditDialog = false"
            >Закрыть</md-button
          >
          <md-button
            class="md-primary"
            @click="
              edit();
              showEditDialog = false;
            "
            >Принять измения</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </md-button>

    <div class="terminal_sn">
      <b>{{ item.sn }}</b>
    </div>

    <md-button @click="showConfirmDialog = true" class="md-simple md-just-icon"
      ><md-icon>clear</md-icon>

      <md-dialog-confirm
        :md-active.sync="showConfirmDialog"
        md-title="Удалить запись?"
        md-content="Удалить запись о мойке терминала?"
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
  name: "wash-terminal-card",
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
    date: {
      type: String,
      default: "",
    },
    usersModel: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      showConfirmDialog: false,
      showComment: false,
      showEditDialog: false,
      user__: 0,
      newDate__: new Date(this.date),
      oldDate__: new Date(this.date),
      oldSn__: "",
      newSn__: "",
      comment__: "",
    };
  },
  methods: {
    dateChanged(date) {
      this.newDate__ = date;
    },
    edit() {
      let data = {
        oldSn: this.oldSn__,
        newSn: this.newSn__,
        user: this.getUserNameByUID(this.user__),
        comment: this.comment__,
        uid: this.user__,
        oldDate: Math.round(this.oldDate__.getTime() / 1000),
        newDate: Math.round(this.newDate__.getTime() / 1000),
      };

      // console.log(data);

      this.ajax.post(
        this,
        "editWashApv",
        data,
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify(this, {
              title: "Изменение записи",
              message: "OK",
            });
            this.$emit("itemChanged");
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (r) => {}
      );
    },
    getUserName(item) {
      let __name = item?.extended?.name || "";
      let __secondName = item?.extended?.scondName || "";

      return __name + __secondName + " (" + item.email + ")";
    },
    getUserNameByUID(uid) {
      let __name = "";
      let __secondName = "";
      let __email = "";

      this.usersModel.forEach((item) => {
        if (item.uid == uid) {
          __name = item?.extended?.name || "";
          __secondName = item?.extended?.scondName || "";
          __email = item?.email || "";
        }
      });

      return __name + __secondName + " (" + __email + ")";
    },
    terminalCardStyle(item) {
      let __baseStyle = "terminal_card ";
      if (item?.comment != "") __baseStyle += "is_comment";
      return __baseStyle;
    },
    deleteItem() {
      this.ajax.post(
        this,
        "delWashApv",
        {
          date: this.date,
          sn: this.item.sn,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify(this, {
              title: "Удаление записи о мойке",
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
  },
  mounted() {
    this.user__ = this.item.uid;
    this.comment__ = this.item.comment;
    this.oldSn__ = this.item.sn;
    this.newSn__ = this.item.sn;
    this.newDate__ = new Date(this.date);
  },
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.terminal_card {
  display: flex;
  margin: 2px;
  padding-right: 8px;
  padding-left: 8px;
  justify-content: space-between;
  flex-direction: row;
  width: 150px;
  background-color: paleturquoise;
  border-radius: 8px;
  border-width: 2px;
}

.is_comment {
  border-style: solid;
  border-color: brown;
}

.terminal_sn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
}

.div__my-dialog-content {
  margin: 15px;
  width: 400px;
}

.div__addwash_col {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  flex-direction: column;
}

.div__datepicker_label {
  display: flex;
  padding-right: 20px;
  flex-direction: column;
  justify-content: space-around;
  width: 250px;
}
</style>
