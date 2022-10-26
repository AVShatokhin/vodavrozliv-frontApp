<template>
  <div class="div__date_col">
    <div class="div__datetime">
      <div>Начало :</div>
      <date-card
        v-if="item.startLts"
        :date="new Date(item.startLts)"
      ></date-card>
      <div v-else><b>нет</b></div>
    </div>
    <div class="div__datetime">
      <div>Окончание :</div>
      <date-card
        v-if="item.startLts != item.stopLts"
        :date="new Date(item.stopLts)"
      ></date-card>
      <div v-else><b>нет</b></div>
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
  margin-bottom: 5px;
  margin-right: 15px;
}

.div__datetime {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
