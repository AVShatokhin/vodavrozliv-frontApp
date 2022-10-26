<template>
  <div class="my-error-col">
    <div>{{ item.deviceName }} [{{ item.errorDevice }}]</div>
    <div>{{ item.errorText }} [{{ item.errorCode }}]</div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "error-card",
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
.my-date-col {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
}
</style>
