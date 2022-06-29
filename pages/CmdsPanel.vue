<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green my-row">
          <div class="card-icon">
            <md-icon>sports_esports</md-icon>
          </div>
          <h4 class="title">Доступные аппараты</h4>

          <md-button class="my-md-button md-success" @click.native="load()">
            <span class="material-icons"> refresh </span>
            Обновить
          </md-button>
        </md-card-header>
        <md-card-content v-if="isApvs">
          <div>Нет аппаратов доступных для управления</div>
        </md-card-content>
        <md-card-content v-else>
          <cmd-card
            v-for="item in model"
            :key="item.sn"
            :item="item"
            @needToRefresh="load()"
          ></cmd-card>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import CmdCard from "../components/CmdsPanel/CmdCard.vue";

export default {
  components: { CmdCard },
  computed: {
    isApvs() {
      if (this.model.length == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      model: [],
    };
  },
  methods: {
    load() {
      this.ajax.getApvByEng(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.model = r.data;
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
  },
  mounted() {
    this.load();
  },
  watch: {},
};
</script>

<style lang="css" scoped>
.md-tabs {
  margin-bottom: 24px;
}

.material-icons {
  margin-right: 15px;
}

.my-md-button {
  width: 200px;
  height: 41px;
  margin-top: 10px;
  margin-left: 30px;
}

.my-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
