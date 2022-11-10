<template>
  <div class="div__date_col">
    <div class="div__datetime">
      <div>Обновление данных :</div>
      <date-card v-if="item.lts" :date="new Date(item.lts)"></date-card>
      <div v-else><b>нет</b></div>
    </div>
    <div class="div__datetime">
      <div>Инкассация :</div>
      <date-card
        v-if="item.inkassLts"
        :date="new Date(item.inkassLts)"
      ></date-card>
      <div v-else>
        <b>нет</b>
      </div>
    </div>
  </div>
</template>

<script>
import DateCard from "./DateTime.vue";

export default {
  name: "data-card",
  components: { DateCard },
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
.div__date_col {
  display: flex;
  flex-direction: column;
  margin-bottom: 2px;
  margin-right: 15px;
}

.div__datetime {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
