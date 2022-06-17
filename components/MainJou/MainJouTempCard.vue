<template>
  <div class="my-user-item-container">
    <div v-if="item.FLAG_c_off == 0">
      <b>{{ item.c }} C<sup>o</sup></b>
    </div>
    <div v-else>отключен</div>
  </div>
</template>

<script>
export default {
  name: "main-jou-temp-card",
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
