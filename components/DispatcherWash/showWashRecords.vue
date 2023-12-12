<template>
  <div class="my-user-item-container">
    <md-button
      @click.native="showDialog = true"
      class="md-primary my-md-button"
    >
      <span class="material-icons"> description </span>
      развернуть
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Список на день</md-dialog-title>
        <div class="div__my-dialog-content">
          <md-table
            :value="Object.values(this.washObject)"
            class="paginated-table table-striped table-hover"
          >
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Терминал">
                {{ item.sn }}
              </md-table-cell>
              <md-table-cell md-label="Комментарий">
                {{ item.comment || "Не указан" }}
              </md-table-cell>
              <md-table-cell md-label="Ответственный">
                {{ item.user || "Не указан" }}
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
        <md-dialog-actions>
          <md-button class="md-default" @click="showDialog = false"
            >Закрыть</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </md-button>
  </div>
</template>

<script>
export default {
  name: "show-wash-records",
  components: {},

  props: {
    washObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    convertWashObject() {
      return Object.values(this.washObject);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.my-user-item-container {
  margin-top: 15px;
  margin-bottom: 15px;
}

.material-icons {
  margin-right: 15px;
}

.my-md-button {
  width: 200px;
  height: 41px;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.div__my-dialog-content {
  margin: 15px;
}

.div__datepicker_label {
  display: flex;
  padding-right: 20px;
  flex-direction: column;
  justify-content: space-around;
  width: 250px;
}
</style>
