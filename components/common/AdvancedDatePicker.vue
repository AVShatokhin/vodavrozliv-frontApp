<template>
  <div class="my-row-item">
    <slot></slot>

    <date-picker :type="type" :lang="lang" v-model="range" range></date-picker>

    <md-button
      @click="showDateSelector = true"
      class="md-default md-simple md-just-icon"
      ><md-icon>settings</md-icon></md-button
    >
    <md-dialog :md-active.sync="showDateSelector">
      <md-dialog-title>Быстрый выбор даты</md-dialog-title>
      <div class="div__my-dialog-content">
        <div class="my-col">
          <md-button
            class="md-info w100"
            @click="
              setToday();
              showDateSelector = false;
            "
            >Сегодня</md-button
          >
          <md-button
            class="md-info w100"
            @click="
              setYesterday();
              showDateSelector = false;
            "
            >Вчера</md-button
          >
          <md-button
            class="md-info w100"
            @click="
              setThisWeek();
              showDateSelector = false;
            "
            >Текущая неделя</md-button
          >
          <md-button
            class="md-info w100"
            @click="
              setThisAndNextWeek();
              showDateSelector = false;
            "
            >Текущая и следующая неделя</md-button
          >
          <md-button
            class="md-info w100"
            @click="
              setThisMonth();
              showDateSelector = false;
            "
            >Текущий месяц</md-button
          >
          <md-button
            class="md-info w100"
            @click="
              setThisFullMonth();
              showDateSelector = false;
            "
            >Текущий месяц полностью</md-button
          >

          <md-button
            class="md-info w100"
            @click="
              setThisAndNextMonth();
              showDateSelector = false;
            "
            >Текущий и следующий месяц</md-button
          >
          <md-button
            class="md-info w100"
            @click="
              setLastMonth();
              showDateSelector = false;
            "
            >Прошлый месяц</md-button
          >
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDateSelector = false"
          >Закрыть</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import DatePicker from "../../../../node_modules/vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "advanced-date-picker",
  components: { DatePicker },
  props: {
    resetFilter: {
      type: Boolean,
      default: undefined,
    },
    type: {
      type: String,
      default: "datetime",
    },
  },
  data() {
    return {
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
      range: [new Date(), new Date()],
      //range: [],
    };
  },
  methods: {
    setToday() {
      let from = new Date();
      from.setHours(0, 0, 0);
      let to = new Date();
      to.setHours(23, 59, 59);
      this.range = [from, to];
    },
    setYesterday() {
      let from = new Date();
      from.setDate(from.getDate() - 1);
      from.setHours(0, 0, 0);

      let to = new Date();
      to.setDate(to.getDate() - 1);
      to.setHours(23, 59, 59);

      this.range = [from, to];
    },
    setThisWeek() {
      let from = new Date();
      from.setDate(from.getDate() - from.getDay() + 1);
      from.setHours(0, 0, 0);
      let to = new Date();
      to.setDate(from.getDate() + 7);
      to.setHours(23, 59, 59);
      this.range = [from, to];
    },
    setThisAndNextWeek() {
      let from = new Date();
      from.setDate(from.getDate() - from.getDay() + 1);
      from.setHours(0, 0, 0);
      let to = new Date();
      to.setDate(from.getDate() + 14);
      to.setHours(23, 59, 59);
      this.range = [from, to];
    },
    setThisMonth() {
      let from = new Date();
      from.setDate(1);
      from.setHours(0, 0, 0);
      let to = new Date();
      to.setHours(23, 59, 59);
      this.range = [from, to];
    },
    setThisFullMonth() {
      let from = new Date();
      from.setDate(1);
      from.setHours(0, 0, 0);
      let to = new Date();
      to.setMonth(from.getMonth() + 1);
      to.setDate(0);
      to.setHours(23, 59, 59);
      this.range = [from, to];
    },
    setLastMonth() {
      let from = new Date();
      from.setDate(1);
      from.setMonth(from.getMonth() - 1);
      from.setHours(0, 0, 0);
      let to = new Date();
      to.setDate(0);
      to.setMonth(to.getMonth());
      to.setHours(23, 59, 59);
      this.range = [from, to];
    },
    setThisAndNextMonth() {
      let from = new Date();
      from.setDate(1);
      from.setHours(0, 0, 0);
      let to = new Date();
      to.setMonth(from.getMonth() + 2);
      to.setDate(0);
      to.setHours(23, 59, 59);
      this.range = [from, to];
    },
  },
  mounted() {
    this.setThisMonth();

    let from = this.range[0].getTime();
    let to = this.range[1].getTime();

    this.$emit("dateChanged", [from, to]);
  },
  watch: {
    range() {
      if (this.range[0] == null) {
        this.setThisMonth();
      }
      let from = this.range[0].getTime();
      let to = this.range[1].getTime();

      this.$emit("dateChanged", [from, to]);
    },
    resetFilter() {
      this.setThisMonth();
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.my-col {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
}

.my-row-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: baseline;
}

.div__my-dialog-content {
  margin: 20px;
}

.w100 {
  width: 100%;
}
</style>
