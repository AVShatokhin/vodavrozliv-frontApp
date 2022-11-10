<template>
  <div class="div__date_col">
    <div class="div__datetime">
      <date-card :date="new Date(item.date)"></date-card>
    </div>
  </div>
</template>

<script>
import DateCard from "./DateOnly.vue";

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
