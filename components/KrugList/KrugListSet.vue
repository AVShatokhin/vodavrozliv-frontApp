<template>
  <!-- <div class="my-user-item-container"> -->
  <div class="my-row">
    <div class="tooltip">
      <span class="tooltiptext">Удалить из кругов</span>
      <md-button
        class="md-just-icon md-danger md-simple my-button"
        @click="clearActiveKrug()"
      >
        <md-icon>close</md-icon>
      </md-button>
    </div>

    <md-field>
      <label for="pages">Для изменения выбери из списка</label>
      <md-select v-model="newActiveKrug" name="pages">
        <md-option
          v-for="item in Object.values(krugsModel)"
          :key="item.krug_id"
          :value="item.krug_id"
        >
          [ {{ item.krug_id }} ] {{ item.title }}
        </md-option>
      </md-select>
    </md-field>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  components: {},
  name: "edit-krug-list",
  props: {
    sn: {
      type: String,
      default: undefined,
    },
    brig_id: {
      type: Number,
      default: undefined,
    },
    activeKrug: {
      type: Number,
      default: undefined,
    },
    krugsModel: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      newActiveKrug: this.activeKrug,
      oldActiveKrug: this.activeKrug,
    };
  },
  methods: {
    clearActiveKrug() {
      this.newActiveKrug = 0;
    },
  },
  mounted() {},
  watch: {
    newActiveKrug() {
      this.$emit("activeKrugChanged", {
        newActiveKrug: this.newActiveKrug,
        sn: this.sn,
        brig_id: this.brig_id,
        oldActiveKrug: this.oldActiveKrug,
      });
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.my-button {
  padding-right: 40px;
}

.my-row {
  display: flex;
  flex-direction: row;
}
/* Tooltip text */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  background-color: rgb(55, 172, 80);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  width: 160px;
  top: 100%;
  left: 100%;
  margin-left: -120px;
  margin-top: -70px;
  z-index: 2;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
