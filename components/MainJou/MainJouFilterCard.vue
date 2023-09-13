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
    </div>
    <div class="my-row">
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
      <div class="my-row" md-alignment="space-between">
        <div class="my-row">
          <p class="card-category p__padding">XML</p>
          <p class="card-category">
            <export-excel
              :fields="json_fields"
              :fetch="fetchData"
              worksheet="CRM.Vodavrozliv"
              :name="exportFileName"
            >
              <span class="material-icons pointer"> file_download </span>
            </export-excel>
          </p>
        </div>
      </div>
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

      exportFileName: "",
      json_fields: {
        sn: "sn",
        Адрес: "address",
        Бригада: "brig",
        Круг: "krug",
        "Версия ПО": "version",
        "Метка времени": "lts",
        "Сумма наличная": "summ",
        Купюры: "k",
        "Монеты сумма": "m",
        "Монеты 1Р": "m1",
        "Монеты 2Р": "m2",
        "Монеты 5Р": "m5",
        "Монеты 10Р": "m10",
        Эквайринг: "r",
        Температура: "c",
        "Продано воды": "w",
        v1: "v1",
        v2: "v2",
        v3: "v3",
        v4: "v4",
        dv1: "dv1",
        dv2: "dv2",
        dv3: "dv3",
        dv4: "dv4",
        dv5: "dv5",
        "Бесплатаная раздача выкл": "FLAG_f_off",
        "Бесплатная вода": "f",
        "Тара отключена": "FLAG_t_off",
        "Тара продано": "tSOLD",
        "Тара осталось": "tREMAIN",
        Ошибка: "errorCode",
        Устройство: "errorDevice",
        Сообщения: "messCodes",
      },
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
    async fetchData() {
      let FILE_NAME = (name) => {
        let norm = (n) => {
          return n > 9 ? n : "0" + n;
        };

        let __date = new Date();

        return (
          name +
          `_${1900 + __date.getYear()}_${
            1 + __date.getMonth() > 9
              ? 1 + __date.getMonth()
              : "0" + (1 + __date.getMonth())
          }_${norm(__date.getDate())}_${norm(__date.getHours())}_${norm(
            __date.getMinutes()
          )}_${norm(__date.getSeconds())}.xls`
        );
      };

      this.exportFileName = FILE_NAME("main_jou");

      let __result = [];
      //__result.push({});

      await this.ajax.getMain_XML(
        this,
        {
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            r.data.items.forEach((item) => {
              __result.push({
                sn: item.sn,
                address: item.address,
                brig: item.brigName,
                krug: item.krug_name,
                version: item.version,
                lts: this.formatTime(item.lts),
                summ: item.k + item.m,
                k: item.k,
                m: item.m,
                m1: item.m1,
                m2: item.m2,
                m5: item.m5,
                m10: item.m10,
                r: item.r,
                c: item.c,
                w: item.w,
                v1: item.v1,
                v2: item.v2,
                v3: item.v3,
                v4: item.v4,
                dv1: item.dv1,
                dv2: item.dv2,
                dv3: item.dv3,
                dv4: item.dv4,
                dv5: item.dv5,
                FLAG_f_off: item.FLAG_f_off,
                f: item.f,
                FLAG_t_off: item.FLAG_t_off,
                tSOLD: item.tSOLD,
                tREMAIN: item.tREMAIN,
                errorCode: item.errorText,
                errorDevice: item.deviceName,
                messCodes: item.messCode.join(","),
              });
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          console.log(err);
        }
      );
      return __result;
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
  justify-content: flex-start;
  /* justify-content: space-evenly; */
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
  padding-left: 15px;
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

.pointer {
  cursor: pointer;
  padding-left: 5px;
  color: rgb(60, 73, 192);
}

.p__padding {
  padding-left: 30px;
  font-weight: bold;
  color: rgb(60, 73, 192);
}
</style>
