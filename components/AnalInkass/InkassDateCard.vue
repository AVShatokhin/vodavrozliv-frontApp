<template>
  <div class="div__date_col">
    <div class="div__datetime">
      <div>Дата инкассации :</div>
      <date-card
        v-if="item.dateInkass"
        :date="new Date(item.dateInkass)"
      ></date-card>
      <div v-else><b>нет</b></div>
    </div>
    <div class="div__datetime">
      <div>Дата создания :</div>
      <date-card
        v-if="item.dateCreation"
        :date="new Date(item.dateCreation)"
      ></date-card>
      <div v-else><b>нет</b></div>
    </div>
    <div class="div__datetime">
      <div>Дата оприходования :</div>
      <date-card
        v-if="item.isPrihod == true"
        :date="new Date(item.datePrihod)"
      ></date-card>
      <div v-else><b>нет</b></div>
    </div>
  </div>
</template>

<script>
import DateCard from "../common/SimpleDateView.vue";

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
  margin-bottom: 15px;
}

.div__datetime {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
