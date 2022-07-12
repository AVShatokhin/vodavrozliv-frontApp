<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <pattern-tooltip
        text="Редактировать"
        v-if="$store.getters.checkPermition(permition)"
      >
        <md-button
          class="md-just-icon md-info md-simple my-button"
          @click="edit()"
        >
          <md-icon>edit</md-icon>
        </md-button>
      </pattern-tooltip>

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
import PatternTooltip from "../../../pattern/components/PatternTooltip.vue";

export default {
  components: { PatternTooltip },
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
      permition: ["PROGRAMMER"],
    };
  },
  methods: {
    edit() {
      this.showEditDialog = true;
      this.messText__ = this.messText;
    },
    apply() {
      if (this.messText__.length == 0) {
        this.showErrorNotify(this, {
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
            this.showSuccessNotify(this, {
              title: "OK",
              message: "Изменения приняты!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(this, r);
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
  computed: {},
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

.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
