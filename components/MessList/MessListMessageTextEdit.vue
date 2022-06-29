<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <div class="tooltip" v-if="isProgrammer">
        <span class="tooltiptext">Редактировать</span>
        <md-button
          class="md-just-icon md-info md-simple my-button"
          @click="edit()"
        >
          <md-icon>edit</md-icon>
        </md-button>
      </div>
      <div>
        {{ messText }}
      </div>
    </div>

    <md-dialog :md-active.sync="showEditDialog">
      <md-dialog-title>Изменение данных</md-dialog-title>
      <div class="my-dialog-content">
        <md-field>
          <label>Текстовое описание сообщения</label>
          <md-input v-model="messText__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showEditDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="apply()"
          >Принять изменения</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  name: "mess-list-message-text-edit",
  props: {
    messCode: {
      type: Number,
      default: 0,
    },
    messText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showEditDialog: false,
      messText__: "",
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
    edit() {
      this.showEditDialog = true;
      this.messText__ = this.messText;
    },
    apply() {
      if (this.messText__.length == 0) {
        this.showErrorNotify({
          errorCode: "MESSAGETEXT_ERROR",
          errorMessage:
            "Текстовое описание сообщения не может быть пустой строкой",
        });
        return;
      }

      this.showEditDialog = false;
      this.ajax.changeMessage(
        this,
        {
          messCode: this.messCode,
          messText: this.messText__,
        },
        (r) => {
          if (r.status == "ok") {
            this.$emit("changed");
            this.showSuccessNotify({
              title: "OK",
              message: "Изменения приняты!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
  },
  mounted() {},
  watch: {},
  computed: {
    isProgrammer() {
      return JSON.parse(localStorage.getItem("userData")).roles.includes(
        "PROGRAMMER"
      );
    },
  },
};
</script>

<style lang="css" scoped>
.my-row {
  display: flex;
  flex-direction: row;
}

.my-user-item-container {
  margin-top: 15px;
  margin-bottom: 15px;
}

.my-button {
  margin: 0px;
  padding: 0px;
  height: 16px;
}

.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: rgb(55, 172, 80);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  width: 120px;
  top: 100%;
  left: 100%;
  margin-left: -100px;
  margin-top: -50px;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
