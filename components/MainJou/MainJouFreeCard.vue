<template>
  <div class="my-user-item-container">
    <div v-if="item.FLAG_f_off == 1">отключена</div>
    <div>
      <b>{{ item.f }}</b> л.
    </div>
  </div>
</template>

<script>
export default {
  name: "main-jou-free-card",
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
