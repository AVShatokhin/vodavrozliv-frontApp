<template>
  <div>
    <div class="my-user-item-container">
      <div class="my-row">
        <div>Название бригады:</div>
        <div class="my-item">
          <b>
            <span v-for="(n, i) in brigNameText" :key="n">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
          </b>
        </div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Гос. номер авто:</div>
        <div class="my-item">
          <b>
            <span v-for="(n, i) in brigCarText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
          </b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "brig-card",
  props: {
    brig_id: {
      type: Number,
      default: null,
    },
    brigName: {
      type: String,
      default: null,
    },
    brigCar: {
      type: String,
      default: null,
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showDialog: false,
      brigName_: null,
      brigCar_: null,

      brigName__: null,
      brigCar__: null,
    };
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

    editData() {
      this.brigName__ = this.email_;
      this.brigCar__ = this.position_;
      this.showDialog = true;
    },
    submitChanges() {
      let data = {
        brig_id: this.brig_id,
        brigName: this.brigName__,
        brigCar: this.brigCar__,
      };

      this.ajax.brigUpdate(
        this,
        data,
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "OK",
              message: "Изменены данные бригады",
            });
            this.brigName_ = this.brigName__;
            this.brigCar_ = this.brigCar__;
            this.$emit("dataChanged", data);
            this.showDialog = false;
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    highlightedTextArrays(text, search) {
      if (text == null) return [];

      return search
        ? text.split(
            RegExp(`(${search.replace(/[\\^$|.*?+{}()[\]]/g, "\\$&")})`, "gi")
          )
        : [text];
    },
  },
  mounted() {
    this.brigName_ = this.brigName;
    this.brigCar_ = this.brigCar;
  },
  watch: {},
  computed: {
    brigNameText() {
      return this.highlightedTextArrays(this.brigName, this.searchQuery);
    },
    brigCarText() {
      return this.highlightedTextArrays(this.brigCar, this.searchQuery);
    },
  },
};
</script>

<style lang="css" scoped>
.my-row {
  display: flex;
  flex-direction: row;
}

.my-user-item-container {
  margin-top: 15px;
  margin-bottom: 15px;
}

.my-item {
  padding-left: 15px;
}

.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: rgb(55, 172, 80);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  width: 120px;
  top: 100%;
  left: 100%;
  margin-left: -60px;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}

.span__no_mark {
  color: red;
  /* margin-left: 0px;
  margin-right: 0px;
  padding-left: 0px;
  padding-right: 0px; */
}
</style>
