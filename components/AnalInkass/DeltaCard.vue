<template>
  <div class="my-user-item-container">
    <div class="my-user-item">
      <b>{{ item.delta }}</b
      >, руб.
    </div>
  </div>
</template>

<script>
export default {
  name: "summa-card",
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
  justify-content: center;
  margin-right: 25px;
}

.my-user-item {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
