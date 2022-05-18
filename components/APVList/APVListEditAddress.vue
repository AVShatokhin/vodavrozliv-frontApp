<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <div class="tooltip">
        <span class="tooltiptext">Редактировать</span>
        <md-button
          class="md-just-icon md-info md-simple my-button"
          @click="editAddress()"
        >
          <md-icon>edit</md-icon>
        </md-button>
      </div>
      <div>
        <span v-for="(n, i) in addressText" :key="i">
          <mark v-if="i % 2">{{ n }}</mark>
          <span v-else>{{ n }}</span>
        </span>
      </div>
    </div>

    <md-dialog :md-active.sync="showNewAddressDialog">
      <md-dialog-title>Изменение адреса АПВ</md-dialog-title>
      <div class="my-dialog-content">
        <md-field>
          <label>Адрес</label>
          <md-input v-model="address__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showNewAddressDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="applyAddress()"
          >Принять изменения</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    sn: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showNewAddressDialog: false,
      address__: "",
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
    editAddress() {
      this.showNewAddressDialog = true;
      this.address__ = this.address;
    },
    applyAddress() {
      if (this.address__.length == 0) {
        this.showErrorNotify({
          errorCode: "ADDRESS_ERROR",
          errorMessage: "Адрес не может быть пустой строкой",
        });
        return;
      }

      this.showNewAddressDialog = false;
      this.ajax.changeAddress(
        this,
        {
          sn: this.sn,
          newAddress: this.address__,
        },
        (r) => {
          if (r.status == "ok") {
            this.$emit("apvChanged");
            this.showSuccessNotify({
              title: "OK",
              message: "Изменения приняты!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    highlightedTextArrays(text, search) {
      return search
        ? text.split(
            RegExp(`(${search.replace(/[\\^$|.*?+{}()[\]]/g, "\\$&")})`, "gi")
          )
        : [text];
    },
  },
  mounted() {},
  watch: {},
  computed: {
    addressText() {
      return this.highlightedTextArrays(this.address, this.searchQuery);
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

.my-button {
  margin: 0px;
  padding: 0px;
  height: 16px;
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
</style>
