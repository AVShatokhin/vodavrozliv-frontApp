<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <sn-selector
        :resetFilter="resetFilterCmd"
        @snArrayChanged="snArrayChanged"
      ></sn-selector>

      <div>
        <advanced-date-picker
          :resetFilter="resetFilterCmd"
          @dateChanged="errorDateChanged"
          type="date"
        >
        </advanced-date-picker>
      </div>
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
import AdvancedDatePicker from "../common/AdvancedDatePicker.vue";

export default {
  name: "filter-card",
  components: { SnSelector, AdvancedDatePicker },

  data() {
    return {
      requestData: {
        apvs: [],
        dateFrom: 0,
        dateTo: 0,
      },
      resetFilterCmd: null,
    };
  },
  methods: {
    errorDateChanged(newValue) {
      this.requestData.dateFrom = newValue[0];
      this.requestData.dateTo = newValue[1];
    },

    sendRequest() {
      this.$emit("sendRequest", this.requestData);
    },
    resetFilter() {
      this.resetFilterCmd = !this.resetFilterCmd;
    },
    snArrayChanged(apvs) {
      this.requestData.apvs = apvs;
    },
  },
  mounted() {
    this.$emit("sendRequest", this.requestData);
  },
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
}
</style>
