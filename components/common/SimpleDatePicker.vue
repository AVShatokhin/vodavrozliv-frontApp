<template>
  <div class="div__datepicker_row">
    <slot></slot>
    <date-picker type="date" :lang="lang" v-model="date"></date-picker>
  </div>
</template>

<script>
import DatePicker from "../../../../node_modules/vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "advanced-date-picker",
  components: { DatePicker },
  props: {
    startDate: {
      type: Date,
      default: () => {
        return new Date();
      },
    },
  },
  data() {
    return {
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
        yearFormat: "YYYY",
        monthFormat: "MMM",
        monthBeforeYear: false,
      },
      date: this.startDate,
    };
  },
  methods: {},
  mounted() {},
  watch: {
    date() {
      this.$emit("dateChanged", this.date);
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.div__datepicker_row {
  display: flex;
  flex-direction: row;
}
</style>
