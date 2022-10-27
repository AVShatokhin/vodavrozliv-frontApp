<template>
  <div class="my-user-item-container">
    <div class="my-user-item">
      <div>Серийный номер :</div>
      <b>{{ item.sn }}</b>
    </div>
    <div class="my-user-item">
      <div>Адрес :</div>
      <b>{{ item.address }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "terminal-card",
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
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
}

.my-user-item {
  margin-bottom: 15px;
}

.div__comment {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 200px;
}

.div__red {
  color: red;
}

.div__green {
  color: green;
}
</style>
