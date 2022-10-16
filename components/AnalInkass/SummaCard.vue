<template>
  <div class="my-user-item-container">
    <div class="my-user-item" v-if="item.cashierInkass == true">
      Кассир: <b>{{ item.cashierSumm }}</b
      >, руб.<br />
    </div>
    <div class="my-user-item div__red" v-else><b>Нет данных от кассира</b></div>
    <div class="my-user-item" v-if="item.terminalInkass == true">
      Терминал: <b>{{ item.terminalSumm }}</b
      >, руб.
    </div>
    <div class="my-user-item div__red" v-else>
      <b>Нет данных от терминала</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "summa-card",
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

.div__red {
  color: red;
}
</style>
