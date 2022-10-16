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
          @dateChanged="dateInkassChanged"
          type="date"
        >
          <div class="my-date-label">
            <div>Дата инкассации</div>
          </div>
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
import AdvancedDatePicker from "../common/AdvancedDatePicker.vue";
import SnSelector from "../common/SnSelector.vue";

export default {
  name: "filter-card",
  components: { AdvancedDatePicker, SnSelector },

  data() {
    return {
      data: {},

      requestData: {
        dateInkassFrom: 0,
        dateInkassTo: 0,
        apvs: [],
      },
      resetFilterCmd: null,
    };
  },
  methods: {
    dateInkassChanged(newValue) {
      this.requestData.dateInkassFrom = newValue[0];
      this.requestData.dateInkassTo = newValue[1];
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
}

.my-date-label {
  width: 200px;
}
</style>
