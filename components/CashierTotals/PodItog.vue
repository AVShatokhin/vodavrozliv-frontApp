<template>
  <div class="hcontainer-bordered">
    <div class="vcontainer">
      <div class="item">Номинал</div>
      <div class="item">Сумма</div>
      <div class="item">Факт</div>
      <div class="item">Ошибка</div>
    </div>

    <div class="vcontainer">
      <div class="item">1 руб.</div>
      <div class="item">
        <b>{{ data.m1 }}</b
        >, шт.
      </div>
      <div class="item">
        <b>{{ fm1 }}</b
        >, шт.
      </div>
      <div class="item">
        <b :class="negativeClass(fm1 - data.m1)">{{ fm1 - data.m1 }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">2 руб.</div>
      <div class="item">
        <b>{{ data.m2 }}</b
        >, шт.
      </div>
      <div class="item">
        <b>{{ fm2 }}</b
        >, шт.
      </div>
      <div class="item">
        <b :class="negativeClass(fm2 - data.m2)">{{ fm2 - data.m2 }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">5 руб.</div>
      <div class="item">
        <b>{{ data.m5 }}</b
        >, шт.
      </div>
      <div class="item">
        <b>{{ fm5 }}</b
        >, шт.
      </div>
      <div class="item">
        <b :class="negativeClass(fm5 - data.m5)">{{ fm5 - data.m5 }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">10 руб.</div>
      <div class="item">
        <b>{{ data.m10 }}</b
        >, шт.
      </div>
      <div class="item">
        <b>{{ fm10 }}</b
        >, шт.
      </div>
      <div class="item">
        <b :class="negativeClass(fm10 - data.m10)">{{ fm10 - data.m10 }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Мелочь</div>
      <div class="item">
        <b>{{ msumm() }}</b
        >, руб.
      </div>
      <div class="item">
        <b>{{ fmsumm() }}</b
        >, руб.
      </div>
      <div class="item">
        <b :class="negativeClass(fmsumm() - msumm())">{{
          fmsumm() - msumm()
        }}</b
        >, руб.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Купюры</div>
      <div class="item">
        <b>{{ data.k }}</b
        >, руб.
      </div>
      <div class="item">
        <b>{{ fk }}</b
        >, руб.
      </div>
      <div class="item">
        <b :class="negativeClass(fk - data.k)">{{ fk - data.k }}</b
        >, руб.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Итого</div>
      <div class="item">
        <b>{{ data.k + msumm() }}</b
        >, руб.
      </div>
      <div class="item">
        <b>{{ fk + fmsumm() }}</b
        >, руб.
      </div>
      <div class="item">
        <b :class="negativeClass(fk + fmsumm() - data.k - msumm())">{{
          fk + fmsumm() - data.k - msumm()
        }}</b
        >, руб.
      </div>
    </div>

    <div class="vcontainer">
      <div class="row">
        <md-button
          style="width: 230px; height: 41px; margin-right: 15px"
          class="md-success button__refresh"
          @click="startEdit()"
        >
          <span class="material-icons"> draw </span>
          редактировать факт
        </md-button>
      </div>

      <div class="row">
        <div class="p__padding">XML</div>
        <div class="p__padding">
          <export-excel
            :fields="json_fields"
            :fetch="fetchData"
            worksheet="CRM.Vodavrozliv"
            :name="exportFileName"
          >
            <span class="material-icons pointer"> file_download </span>
          </export-excel>
        </div>
      </div>
    </div>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Редактирование факта</md-dialog-title>
      <div class="div__my-dialog-content">
        <div class="div__addinkass_row">
          <div class="div__addinkass_col">
            <md-field>
              <label>1 руб., шт.</label>
              <md-input v-model="rm1" type="text"></md-input>
            </md-field>
            <md-field>
              <label>2 руб., шт.</label>
              <md-input v-model="rm2" type="text"></md-input>
            </md-field>
            <md-field>
              <label>5 руб., шт.</label>
              <md-input v-model="rm5" type="text"></md-input>
            </md-field>
            <md-field>
              <label>10 руб., шт.</label>
              <md-input v-model="rm10" type="text"></md-input>
            </md-field>
            <md-field>
              <label>Сумма купюрами, руб.</label>
              <md-input v-model="rk" type="text"></md-input>
            </md-field>
          </div>
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="stopEdit()"
          >Принять изменения</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "pod-itog",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    from: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    to: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  data() {
    return {
      showDialog: false,
      fm1: 0,
      fm2: 0,
      fm5: 0,
      fm10: 0,
      fk: 0,
      rm1: 0,
      rm2: 0,
      rm5: 0,
      rm10: 0,
      rk: 0,

      requestData: { dateCreationFrom: 0, dateCreationTo: 0 },
      exportFileName: "",
      json_fields: {
        "#": "index",
        Time: "time",
        SN: "sn",
        M1: "m1",
        M2: "m2",
        M5: "m5",
        M10: "m10",
        M_SUMM: "m_summ",
        K: "k",
        SUMM: "summ",
      },
    };
  },
  methods: {
    normalizeNumber(number) {
      if (number >= 10) return number;
      else {
        return "0" + number;
      }
    },
    async fetchData() {
      let FILE_NAME = (name) => {
        let norm = (n) => {
          return n > 9 ? n : "0" + n;
        };

        let __date = new Date();

        return (
          name +
          `_${1900 + __date.getYear()}_${
            1 + __date.getMonth() > 9
              ? 1 + __date.getMonth()
              : "0" + (1 + __date.getMonth())
          }_${norm(__date.getDate())}_${norm(__date.getHours())}_${norm(
            __date.getMinutes()
          )}_${norm(__date.getSeconds())}.xls`
        );
      };

      this.exportFileName = FILE_NAME("itog");

      let __result = [];

      await this.ajax.asyncGet(
        this,
        "getCashierItog",
        {
          requestData: this.requestData,
        },
        (r) => {
          if (r.status == "ok") {
            let __m1 = 0;
            let __m2 = 0;
            let __m5 = 0;
            let __m10 = 0;
            let __m_summ = 0;
            let __k = 0;
            let __summ = 0;

            r.data.forEach((e, ind) => {
              let __dateInkass = new Date(e.dateInkass);

              let __date = `${this.normalizeNumber(
                __dateInkass.getDate()
              )} / ${this.normalizeNumber(__dateInkass.getMonth() + 1)} / ${
                __dateInkass.getYear() + 1900
              }`;

              __m1 += e.m1;
              __m2 += e.m2;
              __m5 += e.m5;
              __m10 += e.m10;
              __m_summ += e.m1 + e.m2 * 2 + e.m5 * 5 + e.m10 * 10;
              __k += e.k;
              __summ += e.m1 + e.m2 * 2 + e.m5 * 5 + e.m10 * 10 + e.k;

              __result.push({
                sn: e.sn,
                index: ind + 1,
                time: __date,
                m1: e.m1,
                m2: e.m2,
                m5: e.m5,
                m10: e.m10,
                m_summ: e.m1 + e.m2 * 2 + e.m5 * 5 + e.m10 * 10,
                k: e.k,
                summ: e.m1 + e.m2 * 2 + e.m5 * 5 + e.m10 * 10 + e.k,
              });
            });

            __result.push({
              index: "SUMM",
              sn: "",
              time: "",
              m1: __m1,
              m2: __m2,
              m5: __m5,
              m10: __m10,
              k: __k,
              m_summ: __m_summ,
              summ: __summ,
            });
            __result.push({
              index: "FACT",
              sn: "",
              time: "",
              m1: this.fm1,
              m2: this.fm2,
              m5: this.fm5,
              m10: this.fm10,
              k: this.fk,
              m_summ: this.fm1 + this.fm2 * 2 + this.fm5 * 5 + this.fm10 * 10,
              summ:
                this.fm1 +
                this.fm2 * 2 +
                this.fm5 * 5 +
                this.fm10 * 10 +
                this.fk,
            });
            __result.push({
              index: "ERROR",
              sn: "",
              time: "",
              m1: this.fm1 - __m1,
              m2: this.fm2 - __m2,
              m5: this.fm5 - __m5,
              m10: this.fm10 - __m10,
              k: this.fk - __k,
              m_summ:
                this.fm1 +
                this.fm2 * 2 +
                this.fm5 * 5 +
                this.fm10 * 10 -
                __m_summ,
              summ:
                this.fm1 +
                this.fm2 * 2 +
                this.fm5 * 5 +
                this.fm10 * 10 +
                this.fk -
                __summ,
            });
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {}
      );

      return __result;
    },
    startEdit() {
      this.rm1 = this.fm1;
      this.rm2 = this.fm2;
      this.rm5 = this.fm5;
      this.rm10 = this.fm10;
      this.rk = this.fk;
      this.showDialog = true;
    },
    stopEdit() {
      this.fm1 = Number(this.rm1);
      this.fm2 = Number(this.rm2);
      this.fm5 = Number(this.rm5);
      this.fm10 = Number(this.rm10);
      this.fk = Number(this.rk);
      this.showDialog = false;
    },

    msumm() {
      return (
        this.data.m1 + 2 * this.data.m2 + 5 * this.data.m5 + 10 * this.data.m10
      );
    },
    fmsumm() {
      return this.fm1 + 2 * this.fm2 + 5 * this.fm5 + 10 * this.fm10;
    },
    negativeClass(value) {
      return value == 0 ? "eq" : "negative";
    },
  },
  mounted() {},
  watch: {
    from(newValue) {
      this.requestData.dateCreationFrom = newValue;
    },
    to(newValue) {
      this.requestData.dateCreationTo = newValue;
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.vcontainer {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}

.item {
  margin-left: 10px;
  margin-right: 10px;
}

.hcontainer-bordered {
  display: flex;
  flex-direction: row;
  border: 2px solid green;
  padding: 10px;
}

.material-icons {
  margin-right: 10px;
}

.negative {
  color: red;
}

.eq {
  color: green;
}

.div__my-dialog-content {
  margin: 15px;
}

.pointer {
  cursor: pointer;
  padding-left: 5px;
  color: rgb(60, 73, 192);
}

.p__padding {
  font-weight: bold;
  color: rgb(60, 73, 192);
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
</style>
