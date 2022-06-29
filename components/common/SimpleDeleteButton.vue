<template>
  <md-button
    @click.native="showConfirmDialog = true"
    class="md-danger my-md-button"
  >
    <span class="material-icons"> highlight_off </span>
    Удалить
    <md-dialog-confirm
      :md-active.sync="showConfirmDialog"
      md-title="Удалить запись?"
      md-content="После удаления отменить операцию нельзя"
      md-confirm-text="Удалить"
      md-cancel-text="Отмена"
      @md-cancel="showConfirmDialog = false"
      @md-confirm="deleteItem()"
    />
  </md-button>
</template>

<script>
export default {
  components: {},
  name: "simple-delete-button",
  props: {
    itemKey: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showConfirmDialog: false,
    };
  },
  methods: {
    // showErrorNotify(r) {
    //   this.$notify({
    //     message: `<h3>${r.errorCode}</h3>` + `<p>${r.errorMessage}</p>`,
    //     icon: "add_alert",
    //     horizontalAlign: "center",
    //     verticalAlign: "top",
    //     type: "warning",
    //   });
    // },
    // showSuccessNotify(r) {
    //   this.$notify({
    //     message: `<h3>${r.title}</h3>` + `<p>${r.message}</p>`,
    //     icon: "add_alert",
    //     horizontalAlign: "center",
    //     verticalAlign: "top",
    //     type: "success",
    //   });
    // },
    deleteItem() {
      this.showConfirmDialog = false;
      this.$emit("deleteItem", { itemKey: this.itemKey });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.material-icons {
  margin-right: 15px;
}

.my-md-button {
  width: 200px;
  height: 41px;
  margin-right: 15px;
}
</style>
