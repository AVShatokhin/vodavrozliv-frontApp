<template>
  <div class="my-date-row">
    <badge :type="latencyBageType">{{ latency }}</badge>
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
  computed: {
    latency() {
      let __time = this.item.long;
      let __days = Math.trunc(__time / (24 * 3600));
      let __hours = Math.trunc((__time - __days * 24 * 3600) / 3600);
      let __mins = Math.trunc(
        (__time - __days * 24 * 3600 - __hours * 3600) / 60
      );

      if (__time == 0) {
        return "Актуально!";
      }

      if (__time < 3600) {
        return Math.trunc(__time / 60) + " мин.";
      }

      if (__time > 7 * 24 * 3600) {
        return Math.trunc(__time / (7 * 24 * 3600)) + " нед.";
      }

      if (__time > 24 * 3600) {
        return `${__days} д. ${__hours} ч. ${__mins} мин.`;
      }

      if (__time >= 3600) {
        return `${__hours} ч. ${__mins} мин.`;
      }

      return "";
    },
    latencyBageType() {
      let __time = this.item.long;

      if (__time == 0) {
        return "danger";
      }

      if (__time < 3600) {
        return "success";
      }
      if (__time < 24 * 3600) {
        return "warning";
      }

      return "danger";
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
