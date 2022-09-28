<template>
  <div class="my-user-item-container">
    <div>
      <b>{{ formatTime(item.lts) }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "item-lts-card",
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
