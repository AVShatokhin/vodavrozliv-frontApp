<template>
  <div>
    <div class="my-user-item-container">
      <div class="my-row">
        <div>Название бригады:</div>
        <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div>
      </div>

      <div class="my-row">
        <div>
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
        <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div>
      </div>

      <div class="my-row">
        <b>
          <span v-for="(n, i) in brigCarText" :key="i">
            <mark v-if="i % 2">{{ n }}</mark>
            <span v-else>{{ n }}</span>
          </span>
        </b>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Код ключа</div>
        <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div>
      </div>
      <div>
        <b>
          <span v-for="(n, i) in brigKey" :key="n">
            <mark v-if="i % 2">{{ n }}</mark>
            <span v-else>{{ n }}</span>
          </span>
        </b>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Телефон:</div>
        <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div>
      </div>
      <div class="my-row">
        <b>
          <span v-for="(n, i) in brigPhone" :key="i">
            <mark v-if="i % 2">{{ n }}</mark>
            <span v-else>{{ n }}</span>
          </span>
        </b>
      </div>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Параметры бригады</md-dialog-title>
      <div class="div__my-dialog-content">
        <md-field>
          <label>Имя бригады</label>
          <md-input v-model="brigName__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Гос. номер авто</label>
          <md-input v-model="brigCar__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Код ключа</label>
          <md-input v-model="brigKey__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Номер телефона</label>
          <md-input v-model="brigPhone__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="submitChanges()"
          >Принять изменения</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "brig-card",
  props: {
    brigItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showDialog: false,
      brigName__: null,
      brigCar__: null,
      brigKey__: null,
      brigPhone__: null,
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
      this.brigName__ = this.brigItem.brigName;
      this.brigCar__ = this.brigItem.brigCar;
      this.brigKey__ = this.brigItem.brigKey;
      this.brigPhone__ = this.brigItem.brigPhone;
      this.showDialog = true;
    },
    submitChanges() {
      this.ajax.updateBrig(
        this,
        {
          brig_id: this.brigItem.brig_id,
          brigName: this.brigName__,
          brigCar: this.brigCar__,
          brigKey: this.brigKey__,
          brigPhone: this.brigPhone__,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "OK",
              message: "Изменены данные бригады",
            });
            this.$emit("brigChanged");
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
    brigKey() {
      return this.highlightedTextArrays(
        this.brigItem.brigKey,
        this.searchQuery
      );
    },

    brigPhone() {
      return this.highlightedTextArrays(
        this.brigItem.brigPhone,
        this.searchQuery
      );
    },
    brigNameText() {
      return this.highlightedTextArrays(
        this.brigItem.brigName,
        this.searchQuery
      );
    },
    brigCarText() {
      return this.highlightedTextArrays(
        this.brigItem.brigCar,
        this.searchQuery
      );
    },
  },
};
</script>

<style lang="css" scoped>
.div__my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}

.my-row {
  display: flex;
  flex-direction: row;
}

.my-button {
  margin: 0px;
  padding: 0px;
  height: 16px;
}

.my-user-item-container {
  margin-top: 15px;
  margin-bottom: 15px;
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
  margin-top: -50px;
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
