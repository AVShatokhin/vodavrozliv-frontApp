<template>
  <div class="my-user-item-container">
    <div>
      <b>{{ item.sn }}</b>
    </div>
    <div>
      Адрес: <b>{{ item.address }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "dispatcher-terminal-card",
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
