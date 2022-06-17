<template>
  <div class="my-user-item-container">
    <div>
      Код ключа: <b>{{ item.op }}</b>
    </div>
    <div>
      Данные бригады: <b>{{ item.op_extanded }}</b>
    </div>
    <div>
      Статус идентификации: <b>{{ item.op_state }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "inkas-jou-brig-card",
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
