<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <div>
        <advanced-date-picker
          :resetFilter="resetFilterCmd"
          @dateChanged="dateCreationChanged"
          type="date"
        >
          <div class="my-date-label">
            <div>Дата создания</div>
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

export default {
  name: "filter-card",
  components: { AdvancedDatePicker },

  data() {
    return {
      data: {},

      requestData: {
        dateCreationFrom: 0,
        dateCreationTo: 0,
      },
      resetFilterCmd: null,
    };
  },
  methods: {
    dateCreationChanged(newValue) {
      this.requestData.dateCreationFrom = newValue[0];
      this.requestData.dateCreationTo = newValue[1];
    },

    sendRequest() {
      this.$emit("sendRequest", this.requestData);
    },
    resetFilter() {
      this.resetFilterCmd = !this.resetFilterCmd;
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

.my-date-label {
  width: 200px;
}
</style>
