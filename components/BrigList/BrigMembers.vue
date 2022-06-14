<template>
  <div class="md-layout">
    <div
      v-for="item in brigMembers"
      :key="item.uid"
      class="md-layout-item md-size-100"
    >
      <brig-eng-item
        :brig_id="brig_id"
        :engItem="item"
        @engDeleted="engDeleted"
      >
      </brig-eng-item>
    </div>

    <md-button class="md-primary my-button" @click="showDialog = true">
      <span class="material-icons">switch_account</span>
      Добавить
    </md-button>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Инженеры</md-dialog-title>
      <div class="my-dialog-content">
        <brig-eng-list :engModel="engModel" @indexChanged="indexChanged">
        </brig-eng-list>
        <!-- <md-switch
            v-for="role in Object.keys(patternRoles)"
            :key="role"
            class="md-primary"
            v-model="rolesDialog"
            :value="role"
            ><div class="div__roles">
              {{ patternRoles[role] }}
              <badge type="info">{{ role }}</badge>
            </div></md-switch
          > -->
      </div>
      <md-dialog-actions>
        <md-button class="md-default" @click="showDialog = false"
          >Закрыть</md-button
        >
        <md-button class="md-primary" @click="apply">Добавить</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import BrigEngList from "./BrigEngList.vue";
import BrigEngItem from "./BrigEngItem.vue";

export default {
  components: {
    BrigEngList,
    BrigEngItem,
  },
  name: "brig-members",
  props: {
    brig_id: {
      type: Number,
      default: null,
    },
    brigMembers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    engModel: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      showDialog: false,
      current_eng_uid: undefined,
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
    indexChanged(data) {
      this.current_eng_uid = data.newIndex;
    },
    engDeleted() {
      this.$emit("brigMembersChanged");
    },
    apply() {
      this.showDialog = false;

      this.ajax.addEngToBrig(
        this,
        { brig_id: this.brig_id, eng_uid: this.current_eng_uid },
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "ОК",
              message: "Инженер добавлен в группу",
            });
            this.$emit("brigMembersChanged");
          } else {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style lang="css" scoped>
.material-icons {
  margin-right: 15px;
}

.my-button {
  width: 230px;
  height: 40px;
}

/* .my-row {
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 15px;
}

.badge {
  margin: 1px;
}


.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}

.div__roles {
  color: brown;
  margin: 0px;
  padding: 0px;
}

.md-switch {
  margin: 5px;
} */
</style>
