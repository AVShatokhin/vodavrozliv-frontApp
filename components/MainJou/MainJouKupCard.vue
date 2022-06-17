<template>
  <div class="my-user-item-container">
    <div v-if="item.FLAG_k_off == 0">
      <b>{{ item.k }}</b> руб.
    </div>
    <div v-else>отключен</div>
  </div>
</template>

<script>
export default {
  name: "main-jou-kup-card",
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
