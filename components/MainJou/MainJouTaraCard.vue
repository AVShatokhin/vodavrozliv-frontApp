<template>
  <div class="my-user-item-container">
    <div v-if="item.FLAG_t_off == 1">Отключено</div>
    <div v-else>
      <div>
        Продано: <b>{{ item.tSOLD }}</b>
      </div>
      <div>
        Осталось: <b>{{ item.tREMAIN }}</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-jou-tara-card",
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
