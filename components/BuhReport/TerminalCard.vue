<template>
  <div class="my-user-item-container">
    <div class="my-user-item">
      <b>{{ item.sn }}</b>
    </div>
    <div class="my-user-item">
      <b>{{ item.address }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "terminal-card",
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
  display: flex;
  flex-direction: column;
  margin-top: 3px;
  margin-bottom: 3px;
}

.my-user-item {
  margin-bottom: 3px;
}
</style>
