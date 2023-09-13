<template>
  <div class="my-user-item-container">
    <div>
      <b>{{ formatTimeSplitted(item.lts)["time"] }}</b>
      <br />
      <b>{{ formatTimeSplitted(item.lts)["date"] }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "item-lts-card-splitted",
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
  methods: {},
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
</style>
