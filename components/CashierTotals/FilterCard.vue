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
            <md-checkbox v-model="useInkassDate">Дата инкассации</md-checkbox>
          </div>
        </advanced-date-picker>
        <advanced-date-picker
          :resetFilter="resetFilterCmd"
          @dateChanged="dateCreationChanged"
          type="date"
        >
          <div class="my-date-label">
            <md-checkbox v-model="useCreationDate">Дата создания</md-checkbox>
          </div>
        </advanced-date-picker>
      </div>
      <div class="my-row-item">
        <md-field>
          <label>Сортировка</label>
          <md-select v-model="sortType">
            <md-option
              v-for="item in sortTypeNames"
              :key="item.value"
              :value="item.value"
              >{{ item.name }}</md-option
            >
          </md-select>
        </md-field>
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
      useInkassDate: false,
      useCreationDate: true,
      sortType: 0,
      sortTypeNames: [
        { value: 0, name: "по дате создания" },
        { value: 1, name: "по дате инкассации" },
        { value: 2, name: "по серийному номеру и дате инкассации" },
        { value: 3, name: "по возрастанию суммы" },
        { value: 4, name: "по убыванию суммы" },
      ],

      data: {},

      requestData: {
        sortType: 0,
        apvs: [],
        useInkassDate: false,
        useCreationDate: true,
        dateCreationFrom: 0,
        dateCreationTo: 0,
        dateInkassFrom: 0,
        dateInkassTo: 0,
      },
      resetFilterCmd: null,
    };
  },
  methods: {
    dateCreationChanged(newValue) {
      this.requestData.dateCreationFrom = newValue[0];
      this.requestData.dateCreationTo = newValue[1];
    },
    dateInkassChanged(newValue) {
      this.requestData.dateInkassFrom = newValue[0];
      this.requestData.dateInkassTo = newValue[1];
    },

    sendRequest() {
      this.requestData.sortType = this.sortType;
      this.requestData.useInkassDate = this.useInkassDate;
      this.requestData.useCreationDate = this.useCreationDate;
      this.$emit("sendRequest", this.requestData);
    },
    resetFilter() {
      this.sortType = 0;
      this.useCreationDate = true;
      this.useInkassDate = false;
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
