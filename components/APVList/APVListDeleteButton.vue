<template>
  <md-button
    @click.native="showConfirmApvDelete = true"
    style="width: 230px; height: 41px; margin-right: 15px"
    class="md-danger"
  >
    <span class="material-icons"> highlight_off </span>
    Удалить [ {{ sn }} ]
    <md-dialog-confirm
      :md-active.sync="showConfirmApvDelete"
      md-title="Удалить АПВ?"
      md-content="После удаления отменить операцию нельзя"
      md-confirm-text="Удалить"
      md-cancel-text="Отмена"
      @md-cancel="showConfirmApvDelete = false"
      @md-confirm="deleteAPV()"
    />
  </md-button>
</template>

<script>
export default {
  components: {},
  name: "apv-list-delete-button",
  props: {
    sn: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showConfirmApvDelete: false,
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
    deleteAPV() {
      this.showConfirmApvDelete = false;
      this.ajax.deleteAPV(
        this,
        { sn: this.sn },
        (r) => {
          if (r.status == "ok") {
            this.$emit("apvDeleted");
            this.showSuccessNotify({
              title: "OK",
              message: "АПВ удалён!",
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
