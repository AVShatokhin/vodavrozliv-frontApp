<template>
  <div class="my-row-item">
    <md-field>
      <label>SN:</label>
      <md-select v-model="selectedApvs" multiple>
        <md-option v-for="item in apvsModel" :key="item.sn" :value="item.sn"
          >{{ item.sn }} : {{ item.address }}
        </md-option>
      </md-select>
    </md-field>

    <md-button @click="checkAll(true)" class="md-default md-simple md-just-icon"
      ><md-icon>done_all</md-icon></md-button
    >

    <md-button
      @click="checkAll(false)"
      class="md-default md-simple md-just-icon"
      ><md-icon>remove_done</md-icon></md-button
    >

    <md-button
      @click="showSelectorFilterApv = true"
      class="md-default md-simple md-just-icon"
      ><md-icon>settings</md-icon></md-button
    >

    <md-dialog :md-active.sync="showSelectorFilterApv">
      <md-dialog-title>Фильтр селектора АПВ</md-dialog-title>
      <div class="div__my-dialog-content">
        <pattern-tab
          :tabNames="['Тип АПВ', 'Адрес', 'Инженер', 'Бригада', 'Круг']"
        >
          <template slot="tab-0">
            <div class="my-field">
              <md-field>
                <label>Тип АПВ</label>
                <md-select v-model="selectedTypes" multiple>
                  <md-option
                    v-for="item in apvTypes"
                    :key="item"
                    :value="item"
                    >{{ apvTypeNames[item] }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </template>
          <template slot="tab-1">
            <div class="my-field">
              <md-field>
                <label>Адрес АПВ</label>
                <md-input v-model="searchAddress"></md-input>
              </md-field>
            </div>
          </template>
          <template slot="tab-2">
            <div class="my-field">
              <md-field>
                <label>Инженер</label>
                <md-select v-model="selectedEngs" multiple>
                  <md-option
                    v-for="item in engsModel"
                    :key="item.uid"
                    :value="item.uid"
                    >{{ item.extended.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </template>
          <template slot="tab-3">
            <div class="my-field">
              <md-field>
                <label>Бригада</label>
                <md-select v-model="selectedBrigs" multiple>
                  <md-option
                    v-for="item in brigsModel"
                    :key="item.brig_id"
                    :value="item.brig_id"
                    >{{ item.brigName }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </template>
          <template slot="tab-4">
            <div class="my-field">
              <md-field>
                <label>Круг</label>
                <md-select v-model="selectedKrugs" multiple>
                  <md-option
                    v-for="item in krugsModel"
                    :key="item.krug_id"
                    :value="item.krug_id"
                    >{{ item.title }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </template>
          <template slot="header">
            <div>
              <p>
                Фильтром выбрано
                <b>{{ filterApvsModel.length || 0 }}</b> серийных номеров из
                <b>{{ Object.keys(this.data.apvs || {}).length || 0 }}</b>
                доступных
              </p>
              <p>Если фильтр не указан, то он не влияет на выборку</p>
            </div>
          </template>
        </pattern-tab>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showSelectorFilterApv = false"
          >Закрыть</md-button
        >
        <md-button class="md-default" @click="reset()">Сброс фильтра</md-button>
        <md-button
          class="md-primary"
          @click="
            showSelectorFilterApv = false;
            apply();
          "
          >Применить</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import PatternTab from "../../../pattern/components/PatternTab.vue";

export default {
  name: "sn-selector",
  components: { PatternTab },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    resetFilter: {
      type: Boolean,
      default: undefined,
    },
  },
  data() {
    return {
      showSelectorFilterApv: false,

      searchAddress: "",
      selectedTypes: [],
      selectedEngs: [],
      selectedBrigs: [],
      selectedKrugs: [],

      apvTypes: [0, 1, 2],
      apvTypeNames: ["Стандартный", "Киров", "С бутылочником"],

      engsModel: [],

      brigsModel: [],

      krugsModel: [],

      selectedApvs: [],
      apvsModel: [],
      filterApvsModel: [],
    };
  },
  methods: {
    calcModels() {
      this.engsModel = Object.values(this.data.engs);
      this.apvsModel = Object.values(this.data.apvs);
      this.brigsModel = Object.values(this.data.brigs);
      this.krugsModel = Object.values(this.data.krugs);
      this.filterApvsModel = Object.values(this.data.apvs);
    },
    apply() {
      this.apvsModel = Array.from(this.filterApvsModel);
    },
    reset() {
      this.searchAddress = "";
      this.selectedTypes = [];
      this.selectedEngs = [];
      this.selectedBrigs = [];
      this.selectedKrugs = [];
    },

    filterTypes(income) {
      let __out = [];

      if (this.selectedTypes.length == 0) {
        __out = income;
      } else {
        income.forEach((apv) => {
          if (this.selectedTypes.includes(apv.a)) {
            __out.push(apv);
          }
        });
      }
      return __out;
    },
    filterKrugs(income) {
      let __out = [];

      if (this.selectedKrugs.length == 0) {
        __out = income;
      } else {
        income.forEach((apv) => {
          if (this.selectedKrugs.includes(apv.activeKrug)) {
            __out.push(apv);
          }
        });
      }
      return __out;
    },
    filterBrigs(income) {
      let __out = [];

      if (this.selectedBrigs.length == 0) {
        __out = income;
      } else {
        income.forEach((apv) => {
          let __activeKrug = apv?.activeKrug || 0;
          let __brig_id = this.data.krugs?.[__activeKrug]?.brig_id || 0;
          if (this.selectedBrigs.includes(__brig_id)) {
            __out.push(apv);
          }
        });
      }
      return __out;
    },

    filterEngs(income) {
      let __out = [];

      if (this.selectedEngs.length == 0) {
        __out = income;
      } else {
        income.forEach((apv) => {
          let __activeKrug = apv.activeKrug || 0;
          let __brig_id = this.data.krugs?.[__activeKrug]?.brig_id || 0;
          let __brigMembers = this.data.brigs?.[__brig_id]?.brigMembers || [];
          let __needToPush = false;
          __brigMembers.forEach((m) => {
            if (this.selectedEngs.includes(m)) {
              __needToPush = true;
            }
          });

          if (__needToPush) __out.push(apv);
        });
      }
      return __out;
    },

    filterAddress(income) {
      let __out = [];

      if (this.searchAddress.length < 3) {
        __out = income;
      } else {
        income.forEach((apv) => {
          if (apv.address.indexOf(this.searchAddress) >= 0) {
            __out.push(apv);
          }
        });
      }
      return __out;
    },
    filter() {
      this.filterApvsModel = this.filterEngs(
        this.filterBrigs(
          this.filterKrugs(
            this.filterAddress(this.filterTypes(Object.values(this.data.apvs)))
          )
        )
      );
    },
    checkAll(type) {
      this.selectedApvs = [];
      if (type) {
        Object.values(this.apvsModel).forEach((e) => {
          this.selectedApvs.push(e.sn);
        });
      }
    },
  },
  mounted() {},
  watch: {
    selectedApvs() {
      this.$emit("snArrayChanged", this.selectedApvs);
    },
    resetFilter() {
      this.reset();
      this.calcModels();
      this.selectedApvs = [];
    },
    data() {
      this.calcModels();
    },
    selectedTypes() {
      this.filter();
    },
    searchAddress() {
      this.filter();
    },
    selectedTypes() {
      this.filter();
    },
    selectedEngs() {
      this.filter();
    },
    selectedBrigs() {
      this.filter();
    },
    selectedKrugs() {
      this.filter();
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
/* .my-user-item-container {
  margin: 15px;
} */

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

.my-field {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
