<template>
  <div>
    <div v-if="item.cmdProfile.cmd" class="my-row">
      <div class="my-div">
        Ожидает выполнения: <b>{{ commands[item.cmdProfile.cmd] }}</b>
      </div>
      <md-button
        @click.native="showCancelDialog = true"
        class="md-danger my-md-button"
      >
        <span class="material-icons"> disabled_by_default </span>
        Отменить команду

        <md-dialog-confirm
          :md-active.sync="showCancelDialog"
          md-title="Оменить команду?"
          md-content="Подтвердите операцию"
          md-confirm-text="Отменить команду"
          md-cancel-text="Закрыть"
          @md-cancel="showCancelDialog = false"
          @md-confirm="dropCmd()"
        />
      </md-button>
    </div>
    <md-button
      v-else
      @click.native="showDialog = true"
      class="md-success my-md-button"
    >
      <span class="material-icons"> sports_esports </span>
      Выполнить команду
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Список команд</md-dialog-title>
        <div class="my-dialog-content">
          <!-- Установить новый пароль -->
          <div
            v-for="row in commandsLocation"
            :key="row[0].cmd"
            class="my-button-row"
          >
            <div v-for="item in row" :key="item.cmd" class="my-grow">
              <md-button
                class="md-info my-button"
                @click="item.showDialog = true"
              >
                {{ commands[item.cmd] }}
                <md-dialog-confirm
                  :md-active.sync="item.showDialog"
                  md-title="Подтвердите операцию"
                  :md-content="confirmText(commands[item.cmd])"
                  md-confirm-text="Подтверждаю"
                  md-cancel-text="Отмена"
                  @md-cancel="showConfirmDialog = false"
                  @md-confirm="action(item)"
                />
              </md-button>
            </div>
          </div>
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
  components: {},
  name: "cmd-dialog-button",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      showDialog: false,
      // showConfirmDialog: "",
      showCancelDialog: false,
      commands: {
        "app:on": "Включить аппарат",
        "app:off": "Выключить аппарат",
        "app:reset": "Перегрузить аппарат",
        "tara:off": "Выключить продажу тары",
        "tara:on": "Включить продажу тары",
        "tara:pop": "Пополнить тару",
        "temp:off": "Выключить обогреватель",
        "temp:on": "Включить обогреватель",
        "kup:off": "Выключить купюроприёмникник",
        "kup:on": "Включить купюроприёмник",
        "mon:off": "Выключить монетоприёмник",
        "mon:on": "Выключить монетоприёмник",
        "rd:off": "Выключить модуль б/н оплаты",
        "rd:on": "Включить модуль б/н оплаты",
        "alarm:off": "Выключить сигнализацию",
        "san:on": "Вкл. Санитарную обработку",
        "san:off": "Выкл. Санитарную обработку",
        info: "Запросить состояние",
        inkas1: "Cлот #1",
        inkas2: "Слот #2",
        inkas3: "Слот #3",
        inkas4: "Слот #4",
        inkas5: "Слот #5",
        inkas6: "Слот #6",
        inkas7: "Слот #7",
      },

      commandsLocation: [
        [
          { cmd: "app:on", showDialog: false },
          { cmd: "app:off", showDialog: false },
          { cmd: "app:reset", showDialog: false },
        ],
        [
          { cmd: "tara:off", showDialog: false },
          { cmd: "tara:on", showDialog: false },
          { cmd: "tara:pop", showDialog: false },
        ],
        [
          { cmd: "temp:off", showDialog: false },
          { cmd: "temp:on", showDialog: false },
        ],
        [
          { cmd: "kup:off", showDialog: false },
          { cmd: "kup:on", showDialog: false },
        ],
        [
          { cmd: "mon:off", showDialog: false },
          { cmd: "mon:on", showDialog: false },
        ],
        [
          { cmd: "rd:off", showDialog: false },
          { cmd: "rd:on", showDialog: false },
        ],
        [
          { cmd: "san:on", showDialog: false },
          { cmd: "san:off", showDialog: false },
        ],
        [{ cmd: "alarm:off", showDialog: false }],
        [{ cmd: "info", showDialog: false }],
      ],
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
    action(cmd) {
      this.showDialog = false;

      this.ajax.setCmdByEng(
        this,
        {
          sn: this.item.sn,
          cmd: cmd.cmd,
        },
        (r) => {
          if (r.status == "ok") {
            this.$emit("needToRefresh");

            this.showSuccessNotify({
              title: "OK",
              message: "Команда принята на обработку",
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    dropCmd() {
      this.showCencelDialog = false;

      this.ajax.dropCmdByEng(
        this,
        {
          sn: this.item.sn,
        },
        (r) => {
          if (r.status == "ok") {
            this.$emit("needToRefresh");

            this.showSuccessNotify({
              title: "OK",
              message: "Команда отменена",
            });
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    },
    confirmText(cmdTitle) {
      return `Подтверждаете операцию "${cmdTitle}" ?`;
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.my-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.my-div {
  margin-right: 10px;
}

.my-button-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
}

.my-grow {
  flex-grow: 1;
  margin: 3px;
}

.material-icons {
  margin-right: 15px;
}

.my-md-button {
  width: 200px;
  height: 41px;
  margin-right: 15px;
}

.my-button {
  height: 41px;
  width: 100%;
}

.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}
</style>
