<template>
  <div :class="terminalCardStyle(item)">
    <md-button @click="showComment = true" class="md-simple md-just-icon"
      ><md-icon>exit_to_app</md-icon>

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
export default {
  name: "wash-terminal-card",
  components: {},

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
  },
  data() {
    return {
      showConfirmDialog: false,
      showComment: false,
    };
  },
  methods: {
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
  mounted() {},
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
  width: 110px;
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
</style>
