<template>
  <div class="my-user-item-container">
    <div>
      Серийный номер: <b>{{ item.sn }}</b>
    </div>
    <div>
      Адрес: <b>{{ item.address }}</b>
    </div>
    <div>
      Круг: <b>{{ item.krug_name }}</b>
    </div>
    <div>
      Версия ПО: <b>{{ item.version }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "simple-terminal-card",
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
