<template>
  <!-- <div class="my-user-item-container"> -->
  <div class="my-row">
    <!-- <div class="tooltip">
      <span class="tooltiptext">Удалить из кругов</span>
      <md-button
        class="md-just-icon md-danger md-simple my-button"
        @click="clearActiveKrug()"
      >
        <md-icon>close</md-icon>
      </md-button>
    </div> -->

    <md-field class="my-dialog-content">
      <label for="pages">Выбери из списка</label>
      <md-select v-model="eng_uid" name="pages">
        <md-option
          v-for="item in Object.values(engModel)"
          :key="item.uid"
          :value="item.uid"
        >
          {{ getName(item) }} {{ getSecondName(item) }} ({{ item.email }})
        </md-option>
      </md-select>
    </md-field>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  components: {},
  name: "brig-eng-list",
  props: {
    engModel: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      eng_uid: undefined,
    };
  },
  methods: {
    getName(item) {
      return item?.extended?.name || "";
    },
    getSecondName(item) {
      return item?.extended?.scondName || "";
    },
  },
  watch: {
    eng_uid() {
      this.$emit("indexChanged", { newIndex: this.eng_uid });
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.my-dialog-content {
  margin: 25px;
  width: 80%;
}

/* .my-button {
  padding-right: 40px;
}

.my-row {
  display: flex;
  flex-direction: row;
} */
/* Tooltip text */
/* .tooltip {
  position: relative;
  display: inline-block;
} */

/* .tooltip .tooltiptext {
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
} */

/* Show the tooltip text when you mouse over the tooltip container */
/* .tooltip:hover .tooltiptext {
  visibility: visible;
} */
</style>
