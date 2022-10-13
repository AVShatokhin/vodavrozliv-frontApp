<template>
  <div class="my-user-item-container">
    <div class="my-user-item">
      Инкассаций:<br /><b>{{ data.count }}</b
      >, шт.
    </div>
    <div class="my-user-item">
      1 руб.:<br /><b>{{ data.m1 || 0 }}</b
      >, шт.
    </div>
    <div class="my-user-item">
      2 руб.:<br /><b>{{ data.m2 || 0 }}</b
      >, шт.
    </div>
    <div class="my-user-item">
      5 руб.:<br /><b>{{ data.m5 || 0 }}</b
      >, шт.
    </div>
    <div class="my-user-item">
      10 руб.:<br /><b>{{ data.m10 || 0 }}</b
      >, шт.
    </div>
    <div class="my-user-item">
      Мелочь:<br /><b>{{
        data.m1 + data.m2 * 2 + 5 * data.m5 + 10 * data.m10
      }}</b
      >, руб.
    </div>
    <div class="my-user-item">
      Купюры:<br /><b>{{ data.k || 0 }}</b
      >, руб.
    </div>
    <div class="my-user-item">
      Сумма:<br /><b>{{
        data.m1 + data.m2 * 2 + 5 * data.m5 + 10 * data.m10 + data.k
      }}</b
      >, руб.
    </div>
  </div>
</template>

<script>
export default {
  name: "pod-itog",
  props: {
    data: {
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
  flex-direction: row;
  border: 2px solid green;
  padding: 10px;
}

.my-user-item {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
