<template>
  <div>
    <add-wash-button
      :item="item"
      :apvs="apvs"
      :usersModel="usersModel"
      @itemAdded="itemAdded()"
    ></add-wash-button>
    <show-wash-records-button
      :washObject="washObject"
    ></show-wash-records-button>
  </div>
</template>

<script>
import AddWashButton from "./addWashButton.vue";
import ShowWashRecordsButton from "./showWashRecords.vue";

export default {
  name: "button-box",
  components: {
    AddWashButton,
    ShowWashRecordsButton,
  },

  props: {
    washObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    usersModel: {
      type: Array,
      default: () => {
        return [];
      },
    },
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
      user__: "",
      date__: new Date(this.item.date),
    };
  },
  methods: {
    itemAdded() {
      this.$emit("itemAdded");
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped></style>
