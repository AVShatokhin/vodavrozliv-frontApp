<template>
  <md-button
    @click.native="showConfirmDelete = true"
    style="width: 230px; height: 41px; margin-right: 15px"
    class="md-danger"
  >
    <span class="material-icons"> highlight_off </span>
    Удалить [ {{ krug_id }} ]
    <md-dialog-confirm
      :md-active.sync="showConfirmDelete"
      md-title="Удалить круг?"
      md-content="После удаления отменить операцию нельзя"
      md-confirm-text="Удалить"
      md-cancel-text="Отмена"
      @md-cancel="showConfirmDelete = false"
      @md-confirm="deleteKrug()"
    />
  </md-button>
</template>

<script>
export default {
  components: {},
  name: "krug-list-delete-button",
  props: {
    krug_id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showConfirmDelete: false,
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
    deleteKrug() {
      this.showConfirmApvDelete = false;
      this.ajax.deleteKrug(
        this,
        { krug_id: this.krug_id },
        (r) => {
          if (r.status == "ok") {
            this.$emit("krugDeleted");
            this.showSuccessNotify({
              title: "OK",
              message: "Круг удалён!",
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
  computed: {},
};
</script>

<style lang="css" scoped>
.material-icons {
  margin-right: 15px;
}
</style>
