<template>
  <div class="my-user-item-container">
    <div>
      Уникальный DATE: <b>{{ item.dateUnique }}</b>
    </div>
    <div>
      Дата по аппарату: <b>{{ formatTime(item.date) }}</b>
    </div>
    <div>
      Дата фиксации в системе: <b>{{ formatTime(item.lts) }}</b>
    </div>
    <div>
      Номер инкассации по аппарату: <b>{{ item.inkas_number }}</b>
    </div>
    <div>
      Номер инкассации в системе: <b>{{ item.inkas_id }}</b>
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
