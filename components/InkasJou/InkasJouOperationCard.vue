<template>
  <div class="my-user-item-container">
    <div>
      Дата по аппарату: <b>{{ formatTime(item.date) }}</b>
    </div>
    <div>
      Номер по аппарату: <b>{{ item.inkas_number }}</b>
    </div>
    <div>
      Дата фиксации: <b>{{ formatTime(item.lts) }}</b>
    </div>
    <div>
      Номер в системе: <b>{{ item.inkas_id }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "inkas-jou-operation-card",
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
  methods: {
    formatTime(lts) {
      let norm = (i) => {
        if (i > 9) {
          return i;
        } else {
          return "0" + i;
        }
      };

      let __time = new Date(lts);
      return `${norm(__time.getHours())}:${norm(__time.getMinutes())}:${norm(
        __time.getSeconds()
      )} ${norm(__time.getDate())}-${norm(
        __time.getMonth() + 1
      )}-${__time.getFullYear()}`;
    },
  },
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
