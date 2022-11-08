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
      <div class="my-row-item">
        <md-field>
          <label>по устройствам</label>
          <md-select v-model="requestData.devices" multiple>
            <md-option
              v-for="item in devicesModel"
              :key="item.errorDevice"
              :value="item.errorDevice"
              >{{ item.deviceName }} [ {{ item.errorDevice }} ]</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="my-row-item">
        <md-field>
          <label>по ошибкам</label>
          <md-select v-model="requestData.errors" multiple>
            <md-option
              v-for="item in errorsModel"
              :key="item.errorCode"
              :value="item.errorCode"
              >{{ item.errorText }} [ {{ item.errorCode }} ]</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="my-row-item">
        <md-field>
          <label>Cортировка</label>
          <md-select v-model="sortType">
            <md-option
              v-for="item in sortTypeNames"
              :key="item.value"
              :value="item.value"
              >{{ item.name }}
            </md-option>
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
      sortType: 0,
      sortTypeNames: [
        { value: 0, name: "по дате возникновения" },
        { value: 1, name: "по серийному номеру" },
        { value: 2, name: "по длительности" },
      ],

      data: {},

      errorsModel: [],
      devicesModel: [],

      requestData: {
        sortType: 0,
        apvs: [],
        errors: [],
        devices: [],
        errorDateFrom: 0,
        errorDateTo: 0,
      },
      resetFilterCmd: null,
    };
  },
  methods: {
    errorDateChanged(newValue) {
      this.requestData.errorDateFrom = newValue[0];
      this.requestData.errorDateTo = newValue[1];
    },

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

    load() {
      this.ajax.get(
        this,
        "getAllErrorsAndDevices",
        {},
        (r) => {
          this.errorsModel = r.data.errorsModel;
          this.devicesModel = r.data.devicesModel;
        },
        (err) => {
          this.showErrorNotify(this, err);
        }
      );
    },
  },
  mounted() {
    this.load();
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
