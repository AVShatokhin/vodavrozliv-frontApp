<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <sn-selector
        :resetFilter="resetFilterCmd"
        @snArrayChanged="snArrayChanged"
      ></sn-selector>
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

export default {
  name: "dispatcher-filter-card",
  components: { SnSelector },

  data() {
    return {
      sortType: 0,
      sortTypeNames: [
        { value: 0, name: "по серийному номеру" },
        { value: 1, name: "по убыванию остатка" },
        { value: 2, name: "по возрастанию остатка" },
      ],

      data: {},

      requestData: { sortType: 0, apvs: [] },
      resetFilterCmd: null,

      exportFileName: "",
      json_fields: {
        sn: "sn",
        Адрес: "address",
        "Метка времени": "lts",
        "Время заправки": "chargeInfo_lts",
        "Объем заправки": "chargeInfo_v1",
        "От датчика": "data_v1",
        Продано: "data_v2",
        "Нет воды": "data_dv1",
        "750л": "data_dv2",
        "1500л": "data_dv3",
        "3000л": "data_dv4",
        "4500л": "data_dv5",
        Остаток: "remain",
        "Будет пуст через": "elapsedTime",
        Расход: "AVGHourlySell",
        Ошибки: "errors",
      },
    };
  },
  methods: {
    renderError(item) {
      let __error = [];
      if (item.data.errorCode == 3) __error.push("нет воды");
      if (item.data.errorCode == 4) __error.push("засор");
      if (item.data.errorCode == 15) __error.push("АПВ замёрз");
      if (item.data.errorCode == 18) __error.push("нет 220В в АПВ");
      if (item.online == false) __error.push("нет связи с АПВ");
      return __error.join(",");
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

      this.exportFileName = FILE_NAME("disp_table");

      let __result = [];

      await this.ajax.getDispatcherMain_XML(
        this,
        {
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            r.data.apvs.forEach((item) => {
              __result.push({
                sn: item.sn,
                address: item.address,
                lts: this.formatTime(item.lts),
                chargeInfo_lts: this.formatTime(item.chargeInfo.lts),
                chargeInfo_v1: item.chargeInfo.v1,
                data_v1: item.data.v1,
                data_v2: item.data.v2,
                data_dv1: item.data.dv1,
                data_dv2: item.data.dv2,
                data_dv3: item.data.dv3,
                data_dv4: item.data.dv4,
                data_dv5: item.data.dv5,
                remain: item.remain,
                elapsedTime: item.elapsedTime,
                AVGHourlySell: `${item.AVGHourlySell}`.replace("\.", ","),
                errors: this.renderError(item),
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
