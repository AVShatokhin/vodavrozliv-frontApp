<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <sn-selector
        :data="getData"
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

      requestData: { sortType: 0, queryRemain: 0, apvs: [] },
      resetFilterCmd: null,
    };
  },
  methods: {
    load() {
      this.ajax.getDispatcherFilterStructure(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.data = r.data;
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
  },
  mounted() {
    this.load();
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
