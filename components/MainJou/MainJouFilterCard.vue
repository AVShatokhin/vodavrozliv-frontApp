<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <sn-selector
        :resetFilter="resetFilterCmd"
        @snArrayChanged="snArrayChanged"
      ></sn-selector>
      <advanced-date-picker
        :resetFilter="resetFilterCmd"
        @dateChanged="dateChanged"
      ></advanced-date-picker>
      <div class="my-row-item">
        <md-field>
          <label>Устройство</label>
          <md-select v-model="selectedDevices" multiple>
            <md-option
              v-for="item in devicesModel"
              :key="item.errorDevice"
              :value="item.errorDevice"
              >{{ item.deviceName }}</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="my-row-item">
        <md-field>
          <label>Ошибка</label>
          <md-select v-model="selectedErrors" multiple>
            <md-option
              v-for="item in errorsModel"
              :key="item.errorCode"
              :value="item.errorCode"
              >{{ item.errorText }}</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="my-row-item">
        <md-field>
          <label>Сообщение</label>
          <md-select v-model="selectedMessages" multiple>
            <md-option
              v-for="item in messagesModel"
              :key="item.messCode"
              :value="item.messCode"
              >{{ item.messText }}</md-option
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
  name: "main-jou-filter-card",
  components: { SnSelector, AdvancedDatePicker },

  data() {
    return {
      showSelectorFilterApv: false,
      showDateSelector: false,
      lang: {
        // the locale of formatting and parsing function
        formatLocale: {
          // MMMM
          months: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
          ],
          // MMM
          monthsShort: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
          ],
          // dddd
          weekdays: [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
          ],
          // ddd
          weekdaysShort: ["Вск", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
          // dd
          weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          // first day of week
          firstDayOfWeek: 1,
          // first week contains January 1st.
          firstWeekContainsDate: 1,
          // format 'a', 'A'
          meridiem: (h, _, isLowercase) => {
            const word = h < 12 ? "AM" : "PM";
            return isLowercase ? word.toLocaleLowerCase() : word;
          },
          // parse ampm
          meridiemParse: /[ap]\.?m?\.?/i,
          // parse ampm
          isPM: (input) => {
            return `${input}`.toLowerCase().charAt(0) === "p";
          },
        },
        // the calendar header, default formatLocale.weekdaysMin
        //days: [],
        // the calendar months, default formatLocale.monthsShort
        //months: [],
        // the calendar title of year
        yearFormat: "YYYY",
        // the calendar title of month
        monthFormat: "MMM",
        // the calendar title of month before year
        monthBeforeYear: false,
      },
      time: null,

      selectedDevices: [],
      devicesModel: [],

      selectedErrors: [],
      errorsModel: [],

      selectedMessages: [],
      messagesModel: [],

      data: {},

      requestData: {},
      resetFilterCmd: null,
    };
  },
  methods: {
    calcModels() {
      this.devicesModel = Object.values(this.data.devices);
      this.errorsModel = Object.values(this.data.errors);
      this.messagesModel = Object.values(this.data.messages);
    },
    load() {
      this.ajax.getMainJouFilterStructure(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.data = r.data;
            this.calcModels();
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    sendRequest() {
      this.requestData.devices = this.selectedDevices;
      this.requestData.errors = this.selectedErrors;
      this.requestData.messages = this.selectedMessages;

      this.$emit("sendRequest", this.requestData);
    },
    resetFilter() {
      this.selectedDevices = [];
      this.selectedErrors = [];
      this.selectedMessages = [];
      this.resetFilterCmd = !this.resetFilterCmd;
    },
    snArrayChanged(apvs) {
      this.requestData.apvs = apvs;
    },
    dateChanged(range) {
      this.requestData.range = range;
    },
  },
  mounted() {
    this.load();
    this.$emit("sendRequest", this.requestData);
  },
  watch: {},
  computed: {
    getData() {
      return this.data;
    },
  },
};
</script>

<style lang="css" scoped>
.my-user-item-container {
  margin: 15px;
}

.my-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.my-row-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
}

.my-col {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.my-row-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: baseline;
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
