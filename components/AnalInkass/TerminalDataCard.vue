<template>
  <div>
    <div class="my-user-item-container" v-if="item.terminalInkass == true">
      <div class="my-user-item">
        <div>Мелочь :</div>
        <b>{{ item.box }}</b
        >, руб.
      </div>
      <div class="my-user-item">
        <div>Купюры :</div>
        <b>{{ item.kup }}</b
        >, руб.
      </div>
      <div class="my-user-item">
        <div>Безнал :</div>
        <b>{{ item.rd }}</b
        >, руб.
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

.div__red {
  color: red;
}
</style>
