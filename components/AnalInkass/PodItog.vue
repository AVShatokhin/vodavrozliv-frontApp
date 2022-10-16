<template>
  <div class="hcontainer-bordered">
    <div class="vcontainer">
      <div class="item">Номинал</div>
      <div class="item">Сумма</div>
    </div>

    <div class="vcontainer">
      <div class="item">1 руб.</div>
      <div class="item">
        <b>{{ data.m1 }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">2 руб.</div>
      <div class="item">
        <b>{{ data.m2 }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">5 руб.</div>
      <div class="item">
        <b>{{ data.m5 }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">10 руб.</div>
      <div class="item">
        <b>{{ data.m10 }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Мелочь</div>
      <div class="item">
        <b>{{ nsumm() }} </b>, руб.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Купюры</div>
      <div class="item">
        <b>{{ data.k }}</b
        >, руб.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Итого</div>
      <div class="item">
        <b>{{ data.k + nsumm() }}</b
        >, руб.
      </div>
    </div>

    <div class="vcontainer">
      <slot></slot>
    </div>
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
  },
  data() {
    return {};
  },
  methods: {
    nsumm() {
      return (
        this.data.m1 + this.data.m2 * 2 + this.data.m5 * 5 + this.data.m10 * 10
      );
    },
  },
  mounted() {},
  watch: {},
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

/* .material-icons {
  margin-right: 10px;
} */

/* .negative {
  color: red;
}

.eq {
  color: green;
}


.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
} */
</style>
