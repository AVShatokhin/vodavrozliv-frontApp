<template>
  <div>
    <div v-if="item.f">
      <b>{{ item.f }}, л.</b>
    </div>
    <div v-else><b>нет данных</b></div>
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

<style lang="css" scoped></style>
