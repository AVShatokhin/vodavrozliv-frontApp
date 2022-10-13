<template>
  <b>{{ day }} / {{ month }} / {{ year }}</b>
</template>

<script>
export default {
  components: {},
  name: "simple-date-view",
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
