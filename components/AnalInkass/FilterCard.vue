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
            <md-radio v-model="useDate" value="inkass"
              >Дата инкассации</md-radio
            >
          </div>
        </advanced-date-picker>
        <advanced-date-picker
          :resetFilter="resetFilterCmd"
          @dateChanged="dateCreationChanged"
          type="date"
        >
          <div class="my-date-label">
            <md-radio v-model="useDate" value="creation"
              >Дата создания</md-radio
            >
          </div>
        </advanced-date-picker>
      </div>
      <div class="my-row-item">
        <div>
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
          <md-field>
            <label>Кассир</label>
            <md-select
              v-model="cashierUid"
              :disabled="!(useDate == 'creation')"
            >
              <md-option
                v-for="item in cashiers"
                :key="item.uid"
                :value="item.uid"
                >{{ item.email }}</md-option
              >
            </md-select>
          </md-field>
        </div>
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
      useDate: "creation",
      sortType: 0,
      sortTypeNames: [
        { value: 0, name: "по дате инкассации" },
        { value: 1, name: "по серийному номеру и дате инкассации" },
        { value: 2, name: "по возрастанию суммы кассира" },
        { value: 3, name: "по убыванию суммы кассира" },
        { value: 4, name: "по возрастанию разницы" },
        { value: 5, name: "по убыванию разницы" },
      ],

      data: {},

      cashierUid: -1,
      cashiers: [],

      requestData: {
        sortType: 0,
        apvs: [],
        useDate: "creation",
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
      this.requestData.useDate = this.useDate;
      this.requestData.cashierUid = this.cashierUid;
      this.$emit("sendRequest", this.requestData);
    },
    resetFilter() {
      this.sortType = 0;
      this.useDate = "creation";
      this.cashierUid = -1;
      this.resetFilterCmd = !this.resetFilterCmd;
    },
    snArrayChanged(apvs) {
      this.requestData.apvs = apvs;
    },
    load() {
      this.ajax.get(
        this,
        "getAllCashiers",
        {},
        (r) => {
          this.cashiers = r.data;
          this.cashiers.unshift({ uid: -1, email: "все" });
        },
        (err) => {}
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

.my-date-label {
  width: 200px;
}
</style>
