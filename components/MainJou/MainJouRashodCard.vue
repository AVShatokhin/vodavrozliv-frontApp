<template>
  <div class="my-user-item-container">
    <div>
      Продано воды: <b>{{ item.w }}</b>
    </div>

    <div class="row">
      <div class="col">
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
      <div class="col">
        <div>
          DV1: <b>{{ item.dv1 }}</b>
        </div>
        <div>
          DV2: <b>{{ item.dv2 }}</b>
        </div>
        <div>
          DV3: <b>{{ item.dv3 }}</b>
        </div>
        <div>
          DV4: <b>{{ item.dv4 }}</b>
        </div>
        <div>
          DV5: <b>{{ item.dv5 }}</b>
        </div>
      </div>
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

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

.col {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
