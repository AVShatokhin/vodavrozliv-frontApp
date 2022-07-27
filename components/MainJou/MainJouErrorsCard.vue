<template>
  <div class="my-user-item-container">
    <div>
      Ошибка:<br />
      <b>{{ item.errorCode }} : {{ item.errorText }}</b>
    </div>
    <div>
      Устройство:<br />
      <b>{{ item.errorDevice }} : {{ item.deviceName }}</b>
    </div>
    <div>
      Сообщения:<br />
      <div v-for="m in item.messCode" :key="m">
        <b>{{ m }} : {{ item.messages[m] }}</b>
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
</style>
