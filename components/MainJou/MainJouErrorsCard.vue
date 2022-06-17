<template>
  <div class="my-user-item-container">
    <div>
      Ошибка: <b>{{ item.errorCode }}</b>
    </div>
    <div>
      Устройство: <b>{{ item.errorDevice }}</b>
    </div>
    <div>
      Сообщение: <b>{{ item.messCode }}</b>
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
