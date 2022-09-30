<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <sn-selector
        :resetFilter="resetFilterCmd"
        @snArrayChanged="snArrayChanged"
      ></sn-selector>
    </div>
    <div class="my-row-actions">
      <md-button class="md-default buttons" @click="resetFilter()">
        <span class="material-icons"> close </span>
        Сбросить фильтр
      </md-button>

      <md-button class="md-success buttons" @click="sendRequest()">
        <span class="material-icons"> refresh </span>
        Обновить
      </md-button>
    </div>
  </div>
</template>

<script>
import SnSelector from "../common/SnSelector.vue";

export default {
  name: "anal-dayly-sell-filter-card",
  components: { SnSelector },

  data() {
    return {
      json_data: [
        {
          index: 0,
          sn: "T0001",
          address: "jhvbjhbj",
          dayly: "11",
          horly: "12",
        },
        {
          index: 1,
          sn: "T0002",
          address: "jhvbjhbj",
          dayly: "11",
          hourly: "12",
        },
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      sortType: 0,
      sortTypeNames: [
        { value: 0, name: "по серийному номеру" },
        { value: 1, name: "по убыванию остатка" },
        { value: 2, name: "по возрастанию остатка" },
      ],

      data: {},

      requestData: { sortType: 0, queryRemain: 0, apvs: [] },
      resetFilterCmd: null,
    };
  },
  methods: {
    sendRequest() {
      this.requestData.sortType = this.sortType;
      this.$emit("sendRequest", this.requestData);
    },
    resetFilter() {
      this.sortType = 0;
      this.resetFilterCmd = !this.resetFilterCmd;
    },
    snArrayChanged(apvs) {
      this.requestData.apvs = apvs;
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.my-user-item-container {
  margin: 15px;
}

.my-row {
  display: flex;
  flex-direction: row;
  justify-content: begin;
}

.my-row-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
}

.my-row-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: baseline;
  padding-left: 25px;
}

.buttons {
  width: 230px;
  height: 41px;
  margin-right: 15px;
  margin-left: 15px;
}

.material-icons {
  margin-right: 15px;
  cursor: pointer;
}

.pointer {
  cursor: pointer;
}
</style>
