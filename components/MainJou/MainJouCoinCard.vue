<template>
  <div class="my-user-item-container">
    <div v-if="item.FLAG_m_off == 0">
      <div>
        Сумма: <b>{{ item.m }}</b> руб.
      </div>
      <div>
        <div v-if="item.FLAG_error_m1 == 0">
          1Р : <b>{{ item.m1 }}</b> шт.
        </div>
        <div v-else>1Р : ошибка</div>
      </div>
      <div>
        <div v-if="item.FLAG_error_m2 == 0">
          2Р : <b>{{ item.m2 }}</b> шт.
        </div>
        <div v-else>2P : ошибка</div>
      </div>
      <div>
        <div v-if="item.FLAG_error_m5 == 0">
          5Р : <b>{{ item.m5 }}</b> шт.
        </div>
        <div v-else>5P : ошибка</div>
      </div>
      <div>
        <div v-if="item.FLAG_error_m10 == 0">
          10Р : <b>{{ item.m10 }}</b> шт.
        </div>
        <div v-else>10P : ошибка</div>
      </div>
    </div>
    <div v-else>отключен</div>
  </div>
</template>

<script>
export default {
  name: "main-jou-coin-card",
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
