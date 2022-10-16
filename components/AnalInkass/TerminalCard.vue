<template>
  <div class="my-user-item-container">
    <div class="my-user-item">
      <div>Серийный номер :</div>
      <b>{{ item.sn }}</b>
    </div>
    <div class="my-user-item">
      <div>Адрес :</div>
      <b>{{ item.address }}</b>
    </div>

    <div class="my-user-item">
      <div v-if="item.terminalInkass == true">
        Автофиксаций: <b>{{ item.terminalInkassCount }}</b
        >, шт.
      </div>
      <div v-else class="div__red"><b>Нет автофиксаций на эту дату</b></div>
    </div>

    <div class="my-user-item" v-if="item.cashierInkass == false">
      <b class="div__red">Нет данных кассира на эту дату</b>
    </div>

    <div class="my-user-item" v-if="item.cashierInkass == true">
      <div class="div__green" v-if="item.isPrihod == true">
        <b>Оприходовано</b>
      </div>
      <div class="div__red" v-else><b>Не оприходовано</b></div>
    </div>

    <div class="my-user-item" v-if="item.cashierInkass == true">
      <div v-if="item.comment != ''">Комментарий :</div>
      <div class="div__comment" v-if="item.comment != ''">
        <b>{{ item.comment }}</b>
      </div>
      <div v-if="item.dontUseSn" class="div__comment">
        <b>Внесено без указания серийного номера терминала</b>
      </div>
      <div v-if="item.isDuplikate">
        <b>{{ item.duplikateSn }}</b> : Дублированная запись об инкассации
      </div>
    </div>
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

<style lang="css" scoped>
.my-user-item-container {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
}

.my-user-item {
  margin-bottom: 15px;
}

.div__comment {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 200px;
}

.div__red {
  color: red;
}

.div__green {
  color: green;
}
</style>
