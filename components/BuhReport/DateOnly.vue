<template>
  <div class="my-date-row">
    <b>{{ day }} / {{ month }} / {{ year }}</b>
  </div>
</template>

<script>
export default {
  components: {},
  name: "date-time",
  props: {
    date: {
      type: Date,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    normalizeNumber(number) {
      if (number >= 10) return number;
      else {
        return "0" + number;
      }
    },
  },
  mounted() {},
  watch: {},
  computed: {
    hour() {
      return this.normalizeNumber(this.date.getHours());
    },
    minute() {
      return this.normalizeNumber(this.date.getMinutes());
    },
    second() {
      return this.normalizeNumber(this.date.getSeconds());
    },
    day() {
      return this.normalizeNumber(this.date.getDate());
    },
    month() {
      return this.normalizeNumber(this.date.getMonth() + 1);
    },
    year() {
      return this.date.getYear() + 1900;
    },
  },
};
</script>

<style lang="css" scoped>
.my-date-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
</style>
