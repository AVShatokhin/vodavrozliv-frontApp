<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>schedule</md-icon>
          </div>
          <h4 class="title">Напоминания</h4>
        </md-card-header>
        <md-card-content>
          <div class="my-col">
            <div class="grid__options">
              <md-field>
                <label
                  >Периодичность дублирования информации о состоянии АПВ в
                  ТГ-канал</label
                >
                <md-select v-model="apvRemindPeriodValue">
                  <md-option
                    v-for="item in apvRemindPeriodModel"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.text }}</md-option
                  >
                </md-select>
              </md-field>
              <md-switch
                class="md-primary div__control"
                v-model="daylyReminder"
              >
                <div class="text__black">
                  Ежедневные ТГ-напоминания об отсутствии связи с АПВ
                </div>
              </md-switch>
            </div>

            <div class="action-row">
              <div></div>
              <div>
                <md-button class="md-success button__add" @click="apply()">
                  <span class="material-icons"> done </span>
                  Принять
                </md-button>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "mess-list-reminder-table",
  components: {},
  data() {
    return {
      daylyReminder: true,
      apvRemindPeriodValue: 0,
      apvRemindPeriodModel: [
        { value: "0", text: "Отключено" },
        { value: "1", text: "Каждый час" },
        { value: "2", text: "Каждые два часа" },
        { value: "3", text: "Каждые три часа" },
      ],
    };
  },
  methods: {
    apply() {
      this.ajax.applyReminder(
        this,
        {
          daylyReminder: this.daylyReminder,
          apvRemindPeriodValue: this.apvRemindPeriodValue,
        },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify(this, {
              title: "OK",
              message: "Настройки применены",
            });
          } else {
            this.showErrorNotify(this, r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },

    load() {
      this.ajax.getReminder(
        this,
        {},
        (r) => {
          if (r.status == "ok") {
            this.apvRemindPeriodValue = r.data.apvRemindPeriodValue;
            this.daylyReminder = r.data.daylyReminder;
          } else {
            this.showErrorNotify(this, r);
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
  computed: {},
  watch: {},
};
</script>

<style lang="css" scoped>
.my-col {
  width: 100%;
}

.action-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.grid__options {
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
  display: grid;
  gap: 50px;
  grid-template-columns: 100%;
}

.text__black {
  color: black;
}

.material-icons {
  margin-right: 15px;
}

.button__add {
  margin-left: 15px;
  width: 230px;
  height: 41px;
  margin-right: 15px;
}

.md-switch {
  margin: 5px;
}
</style>
