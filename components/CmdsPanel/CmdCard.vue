<template>
  <div class="my-user-item-container">
    <div class="my-col">
      <div class="my-row">
        <div class="my-div">
          SN: <b>{{ item.sn }}</b>
        </div>
        <div class="my-div">
          Круг: <b>{{ item.krugName }}</b>
        </div>
        <div class="my-div">
          Адрес: <b>{{ item.address }}</b>
        </div>
        <div class="my-grow"></div>
        <div class="my-div">
          <cmd-dialog-button
            :item="item"
            @needToRefresh="needToRefresh()"
          ></cmd-dialog-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CmdDialogButton from "./CmdDialogButton.vue";

export default {
  name: "cmd-card",
  components: {
    CmdDialogButton,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    needToRefresh() {
      this.$emit("needToRefresh");
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

.my-col {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: solid 1px green;
  border-radius: 5px;
  justify-content: flex-start;
}

.my-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.my-div {
  margin-right: 20px;
}

.my-grow {
  flex-grow: 1;
}

.my-button {
  margin: 0px;
  padding: 0px;
  height: 24px;
}
/* .material-icons {
  margin-right: 15px;
}

.div__toolbar_right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.button__refresh {
  margin-left: 15px;
} */
</style>
