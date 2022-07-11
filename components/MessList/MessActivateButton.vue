<template>
  <md-button
    @click.native="showConfirmDialog = true"
    class="my-md-button"
    :class="classByValue"
  >
    <!-- <span class="material-icons"> plus </span> -->
    {{ buttonText }}
    <md-dialog-confirm
      :md-active.sync="showConfirmDialog"
      md-title="Изменить параметры рассылки"
      :md-content="dialogTitle"
      md-confirm-text="Да"
      md-cancel-text="Отмена"
      @md-cancel="showConfirmDialog = false"
      @md-confirm="activate()"
    />
  </md-button>
</template>

<script>
export default {
  components: {},
  name: "mess-activate-button",
  props: {
    itemKey: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showConfirmDialog: false,
    };
  },
  methods: {
    activate() {
      this.showConfirmDialog = false;
      this.$emit("changeIsActive", {
        itemKey: this.itemKey,
        isActive: !this.isActive,
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {
    buttonText() {
      if (this.isActive) {
        return "Удалить из рассылки";
      } else {
        return "Добавить в рассылку";
      }
    },
    dialogTitle() {
      if (this.isActive) {
        return "Удалить из рассылки ?";
      } else {
        return "Добавить в рассылку ?";
      }
    },
    classByValue() {
      if (this.isActive) {
        return "md-success";
      } else {
        return "md-default";
      }
    },
  },
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
