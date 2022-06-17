<template>
  <div class="my-user-item-container">
    <div v-if="item.FLAG_r_off == 0">
      <b>{{ item.r }}</b> руб.
    </div>
    <div v-else>отключен</div>
  </div>
</template>

<script>
export default {
  name: "main-jou-eq-card",
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
  mounted() {
    console.log(this.item);
  },
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
