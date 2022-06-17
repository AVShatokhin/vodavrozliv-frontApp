<template>
  <div class="my-row">
    <div class="tooltip">
      <span class="tooltiptext">Удалить</span>
      <md-button class="md-just-icon md-danger" @click="deleteEng()">
        <md-icon>close</md-icon>
      </md-button>
    </div>
    <div class="my-eng-item">
      {{ getName(engItem) }}
      {{ getSecondName(engItem) }}
      ( {{ engItem.email }} )
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "brig-eng-item",
  props: {
    brig_id: {
      tyme: Number,
      default: -1,
    },
    engItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    showErrorNotify(r) {
      this.$notify({
        message: `<h3>${r.errorCode}</h3>` + `<p>${r.errorMessage}</p>`,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "warning",
      });
    },
    showSuccessNotify(r) {
      this.$notify({
        message: `<h3>${r.title}</h3>` + `<p>${r.message}</p>`,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "success",
      });
    },
    deleteEng() {
      this.ajax.deleteEngFromBrig(
        this,
        { brig_id: this.brig_id, eng_uid: this.engItem.uid },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "ОК",
              message: "Инженер удалён из группы",
            });
            this.$emit("engDeleted");
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    getName(item) {
      return item?.extended?.name || "";
    },
    getSecondName(item) {
      return item?.extended?.secondName || "";
    },
  },
  watch: {},
};
</script>

<style lang="css" scoped>
/* .my-dialog-content {
  margin: 25px;
  width: 80%;
} */

.my-eng-item {
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-top: -60px;
  z-index: 2;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
