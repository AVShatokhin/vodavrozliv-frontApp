<template>
  <div class="my-user-item-container">
    <div class="my-row">
      <div>Последнее обновление данных:</div>
    </div>
    <!-- <div class="my-row"> -->
    <simple-date-time-view :date="apvItem.lts"></simple-date-time-view>
    <!-- </div> -->

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Версия ПО:</div>
      </div>
      <div class="my-row">
        <div>
          <b>
            {{ apvItem.version }}
          </b>
        </div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Тип аппарата:</div>
      </div>
      <div class="my-row">
        <div>
          <b>
            {{ apvType[apvItem.a] }}
          </b>
        </div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Стоимость:</div>
        <!-- <div class="tooltip">
          <span class="tooltiptext">Редактировать</span>
          <md-button
            class="md-just-icon md-info md-simple my-button"
            @click="editData()"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </div> -->
      </div>
      <div class="my-row">
        <div>
          <b>
            {{ apvItem.cost }}
          </b>
        </div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Связь:</div>
      </div>
      <div class="my-row">
        <div>
          <b>
            <span v-for="(n, i) in phoneText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span> </b
          >,
          <b>
            <span v-for="(n, i) in operText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span> </b
          >, [<b> {{ apvItem.linkState }} / 31 </b>]
        </div>
      </div>
    </div>

    <!-- <div class="my-user-item-container">
      <div class="my-row">
        <div>Качество связи</div>
      </div>
      <div class="my-row">
        <div></div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Оператор</div>
      </div>
      <div class="my-row">
        <div></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import SimpleDateTimeView from "../common/SimpleDateTimeView.vue";

export default {
  components: {
    SimpleDateTimeView,
  },
  name: "apv-list-incomes",

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
      apvType: {
        0: "Стандартный",
        1: "Киров",
        2: "С бутылочником",
      },
    };
  },
  methods: {
    // showErrorNotify(r) {
    //   this.$notify({
    //     message: `<h3>${r.errorCode}</h3>` + `<p>${r.errorMessage}</p>`,
    //     icon: "add_alert",
    //     horizontalAlign: "center",
    //     verticalAlign: "top",
    //     type: "warning",
    //   });
    // },
    // showSuccessNotify(r) {
    //   this.$notify({
    //     message: `<h3>${r.title}</h3>` + `<p>${r.message}</p>`,
    //     icon: "add_alert",
    //     horizontalAlign: "center",
    //     verticalAlign: "top",
    //     type: "success",
    //   });
    // },
    // editData() {
    //   this.showDialog = true;
    //   this.address__ = this.apvItem.address;
    //   this.tgLink__ = this.apvItem.tgLink;
    //   this.snEQ__ = this.apvItem.snEQ;
    // },
    // apply() {
    //   if (this.address__.length == 0) {
    //     this.showErrorNotify({
    //       errorCode: "ADDRESS_ERROR",
    //       errorMessage: "Адрес не может быть пустой строкой",
    //     });
    //     return;
    //   }

    //   this.showDialog = false;
    //   this.ajax.updateApvOptions(
    //     this,
    //     {
    //       sn: this.apvItem.sn,
    //       address: this.address__,
    //       snEQ: this.snEQ__,
    //       tgLink: this.tgLink__,
    //     },
    //     (r) => {
    //       if (r.status == "ok") {
    //         this.$emit("apvChanged");
    //         this.showSuccessNotify({
    //           title: "OK",
    //           message: "Изменения приняты!",
    //         });
    //       } else if (r.status == "failed") {
    //         this.showErrorNotify(r);
    //       }
    //     },
    //     (err) => {
    //       //console.log(err);
    //     }
    //   );
    // },
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
    phoneText() {
      return this.highlightedTextArrays(this.apvItem.phone, this.searchQuery);
    },
    operText() {
      return this.highlightedTextArrays(this.apvItem.oper, this.searchQuery);
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
</style>
