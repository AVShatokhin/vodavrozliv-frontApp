<template>
  <div class="my-user-item-container">
    <div>
      Сумма: <b>{{ item.inkas }}</b>
    </div>
    <div>
      Сумма купюрами: <b>{{ item.kup }}</b>
    </div>
    <div>
      Сумма монетами: <b>{{ item.box }}</b>
    </div>
    <div>
      Безнал: <b>{{ item.rd }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "inkas-jou-income-card",
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
