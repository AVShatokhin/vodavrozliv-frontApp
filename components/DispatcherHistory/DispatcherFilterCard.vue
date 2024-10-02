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
        type="date"
      >
      </advanced-date-picker>
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
  name: "dispatcher-filter-card",
  components: { SnSelector, AdvancedDatePicker },

  data() {
    return {
      data: {},

      requestData: { apvs: [], dateFrom: 0, dateTo: 0 },
      resetFilterCmd: null,

      exportFileName: "",
      json_fields: {
        sn: "sn",
        Адрес: "address",
        "Метка времени": "lts",
        Заправка: "chargeObject",
        Датчик: "chargeObjectV1",
        Продано: "data_v2",
        "Нет воды": "data_dv1",
        "750л": "data_dv2",
        "1500л": "data_dv3",
        "3000л": "data_dv4",
        "4500л": "data_dv5",
        Остаток: "remain",
        Ошибки: "errors",
      },
    };
  },
  methods: {
    renderError(item) {
      let __error = [];
      if (item.errorCode == 3) __error.push("нет воды");
      if (item.errorCode == 4) __error.push("засор");
      if (item.errorCode == 15) __error.push("АПВ замёрз");
      if (item.errorCode == 18) __error.push("нет 220В в АПВ");
      if (item.errorCode == 1001) __error.push("нет связи с АПВ");
      if (item.errorCode == 1002) __error.push("восстановилась связь с АПВ");
      return __error.join(",");
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
    dateChanged(date) {
      this.requestData.dateFrom = date[0];
      this.requestData.dateTo = date[1];
    },
    renderState(state) {
      let __result;
      if (state == "full") {
        __result = "До полного";
      } else if (state == "start") {
        __result = "Начата";
      } else if (state == "sale") {
        __result = "Перешёл к продажам";
      } else if (state == "error") {
        __result = "Ошибка датчика";
      }

      return __result;
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

      this.exportFileName = FILE_NAME("disp_history_table");

      let __result = [];

      await this.ajax.getDispatcherHistory_XML(
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
                lts: this.formatTime(item.lts),
                chargeObject: this.renderState(item.chargeObject.state),
                chargeObjectV1: item.chargeObject.v1,
                data_v1: item.v1,
                data_v2: item.v2,
                data_dv1: item.dv1,
                data_dv2: item.dv2,
                data_dv3: item.dv3,
                data_dv4: item.dv4,
                data_dv5: item.dv5,
                remain: item.remain,
                errors: this.renderError(item),
              });
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          // console.log(err);
        }
      );

      return __result;
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
