<template>
  <div class="hcontainer-bordered">
    <div class="vcontainer">
      <div class="item">Наличные</div>
      <div class="item">
        <b>{{ data.nal }}</b
        >, руб.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Эквайринг</div>
      <div class="item">
        <b>{{ data.eq }}</b
        >, руб.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Тара</div>
      <div class="item">
        <b>{{ data.tSOLD }}</b
        >, шт.
      </div>
    </div>

    <div class="vcontainer">
      <div class="item">Вода</div>
      <div class="item">
        <b>{{ data.w }}</b
        >, л.
      </div>
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
  methods: {},
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
