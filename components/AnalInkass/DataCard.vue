<template>
  <div>
    <div class="my-data-row" v-if="item.cashierInkass == true">
      <div class="my-user-item-container">
        <div class="my-user-item">
          <div>1 руб. :</div>
          <b>{{ item.m1 }}</b
          >, шт.
        </div>
        <div class="my-user-item">
          <div>2 руб. :</div>
          <b>{{ item.m2 }}</b
          >, шт.
        </div>
        <div class="my-user-item">
          <div>5 руб. :</div>
          <b>{{ item.m5 }}</b
          >, шт.
        </div>
        <div class="my-user-item">
          <div>10 руб. :</div>
          <b>{{ item.m10 }}</b
          >, шт.
        </div>
      </div>
      <div class="my-user-item-container">
        <div class="my-user-item">
          <div>Мелочь:</div>
          <b>{{ item.m1 + 2 * item.m2 + 5 * item.m5 + 10 * item.m10 }}</b
          >, руб.
        </div>

        <div class="my-user-item">
          <div>Купюрами:</div>
          <b>{{ item.k }}</b
          >, руб.
        </div>
      </div>
    </div>
    <div v-else class="div__red"><b>Нет данных</b></div>
  </div>
</template>

<script>
export default {
  name: "data-card",
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 25px;
}

.my-user-item {
  margin-top: 5px;
  margin-bottom: 5px;
}

.my-data-row {
  display: flex;
  flex-direction: row;
}

.div__red {
  color: red;
}
</style>
