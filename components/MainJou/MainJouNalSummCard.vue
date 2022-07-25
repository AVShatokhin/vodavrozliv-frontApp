<template>
  <div class="my-user-item-container">
    <b>{{ item.m + item.k }}</b> руб.
  </div>
</template>

<script>
export default {
  name: "main-jou-nal-summ-card-card",
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
