<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <div>Адрес</div>
      <pattern-tooltip text="Редактировать">
        <md-button
          class="md-just-icon md-info md-simple my-button"
          @click="editData()"
        >
          <md-icon>edit</md-icon>
        </md-button>
      </pattern-tooltip>
    </div>
    <div class="my-row">
      <div>
        <b>
          <span v-for="(n, i) in addressText" :key="i">
            <mark v-if="i % 2">{{ n }}</mark>
            <span v-else>{{ n }}</span>
          </span>
        </b>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>ТГ-ссылка</div>
        <pattern-tooltip text="Редактировать">
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </pattern-tooltip>

        <md-button @click="checkTelegram()" class="md-info my-button-tg-check">
          Проверка
        </md-button>
      </div>
      <div class="my-row">
        <div>
          <b>
            <span v-for="(n, i) in tgLinkText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
          </b>
        </div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Серийный номер эквайринга</div>
        <pattern-tooltip text="Редактировать">
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </pattern-tooltip>
      </div>
      <div class="my-row">
        <div>
          <b>
            <span v-for="(n, i) in snEQText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
          </b>
        </div>
      </div>
    </div>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Настройки АПВ</md-dialog-title>
      <div class="my-dialog-content">
        <md-field>
          <label>Адрес</label>
          <md-input v-model="address__" type="text"></md-input>
        </md-field>

        <md-field>
          <label>ТГ-ссылка</label>
          <md-input v-model="tgLink__" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Серийний номер эквайринга</label>
          <md-input v-model="snEQ__" type="text"></md-input>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="apply()"
          >Принять изменения</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import PatternTooltip from "../../../pattern/components/PatternTooltip.vue";

export default {
  name: "apv-list-options",
  components: {
    PatternTooltip,
  },
  props: {
    apvItem: {
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
      address__: "",
      tgLink__: "",
      snEQ__: "",
    };
  },
  methods: {
    editData() {
      this.showDialog = true;
      this.address__ = this.apvItem.address;
      this.tgLink__ = this.apvItem.tgLink;
      this.snEQ__ = this.apvItem.snEQ;
    },
    checkTelegram() {
      this.ajax.checkTelegram(
        this,
        {
          sn: this.apvItem.sn,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify(this, {
              title: "OK",
              message: "Проверка прошла успешно!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    apply() {
      if (this.address__.length == 0) {
        this.showErrorNotify(this, {
          errorCode: "ADDRESS_ERROR",
          errorMessage: "Адрес не может быть пустой строкой",
        });
        return;
      }

      this.showDialog = false;
      this.ajax.updateApvOptions(
        this,
        {
          sn: this.apvItem.sn,
          address: this.address__,
          snEQ: this.snEQ__,
          tgLink: this.tgLink__,
        },
        (r) => {
          if (r.status == "ok") {
            this.$emit("apvChanged");
            this.showSuccessNotify(this, {
              title: "OK",
              message: "Изменения приняты!",
            });
          } else if (r.status == "failed") {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
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
  mounted() {},
  watch: {},
  computed: {
    addressText() {
      return this.highlightedTextArrays(this.apvItem.address, this.searchQuery);
    },
    tgLinkText() {
      return this.highlightedTextArrays(this.apvItem.tgLink, this.searchQuery);
    },
    snEQText() {
      return this.highlightedTextArrays(this.apvItem.snEQ, this.searchQuery);
    },
  },
};
</script>

<style lang="css" scoped>
.my-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.my-button-tg-check {
  width: 80px;
  height: 27px;
  padding-top: 2px;
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

.material-icons {
  margin-right: 10px;
}

.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
