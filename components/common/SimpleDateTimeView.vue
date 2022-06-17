<template>
  <div class="my-row">
    <div>
      <b>{{ hour }} : {{ minute }} : {{ second }}</b>
    </div>
    <div>
      <b>{{ day }} / {{ month }} / {{ year }}</b>
    </div>
    <div>
      <badge :type="latencyBageType">{{ latency }}</badge>
    </div>
  </div>
</template>

<script>
import { Badge } from "@/components/";

export default {
  components: {
    Badge,
  },
  name: "simple-date-time-view",
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
      if (number > 10) return number;
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
    latency() {
      let __currentTime = new Date().getTime() / 1000;
      let __time = this.date.getTime() / 1000;

      if (__currentTime - __time < 3600) {
        return Math.trunc((__currentTime - __time) / 60) + " мин.";
      }

      if (__currentTime - __time > 7 * 24 * 3600) {
        return Math.trunc((__currentTime - __time) / (7 * 24 * 3600)) + " нед.";
      }

      if (__currentTime - __time > 24 * 3600) {
        return Math.trunc((__currentTime - __time) / (24 * 3600)) + " д.";
      }

      if (__currentTime - __time >= 3600) {
        return Math.trunc((__currentTime - __time) / 3600) + " ч.";
      }

      return "";
    },
    latencyBageType() {
      let __currentTime = new Date().getTime() / 1000;
      let __time = this.date.getTime() / 1000;

      if (__currentTime - __time < 3600) {
        return "success";
      }
      if (__currentTime - __time < 24 * 3600) {
        return "warning";
      }
      return "danger";
    },
  },
};
</script>

<style lang="css" scoped>
.my-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
</style>
