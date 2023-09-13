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

      exportFileName: "",
      json_fields: {
        sn: "sn",
        Адрес: "address",
        Бригада: "brig",
        Круг: "krug",
        "Версия ПО": "version",
        "Уникальный DATE": "dateUnique",
        "Дата по аппарату": "date",
        "Дата фиксации": "lts",
        "Номер по аппарату": "inkas_number",
        "Номер в системе": "inkas_id",
        Сумма: "inkas",
        "Сумма купюрами": "kup",
        "Сумма монетами": "box",
        Эквайринг: "rd",
        "Код ключа": "op",
        "Статус идентификации": "op_state",
      },
    };
  },
  methods: {
    dateInkassChanged(newValue) {
      this.requestData.dateInkassFrom = newValue[0];
      this.requestData.dateInkassTo = newValue[1];
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

      this.exportFileName = FILE_NAME("inkas_jou");

      let __result = [];

      await this.ajax.getInkas_XML(
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
                dateUnique: item.dateUnique + ".",
                date: this.formatTime(item.date),
                lts: this.formatTime(item.lts),
                inkas_number: item.inkas_number,
                inkas_id: item.inkas_id,
                inkas: item.inkas,
                kup: item.kup,
                box: item.box,
                rd: item.rd,
                op: item.op + ".",
                op_state: item.op_state,
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

.my-date-label {
  width: 200px;
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
