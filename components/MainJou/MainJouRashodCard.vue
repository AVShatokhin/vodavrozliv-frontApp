<template>
  <div class="my-user-item-container">
    <div>
      Продано воды: <b>{{ item.w }}</b>
    </div>
    <div>
      V1: <b>{{ item.v1 }}</b>
    </div>
    <div>
      V2: <b>{{ item.v2 }}</b>
    </div>
    <div>
      V3: <b>{{ item.v3 }}</b>
    </div>
    <div>
      V4: <b>{{ item.v4 }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "inkas-main-errors-card",
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
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
