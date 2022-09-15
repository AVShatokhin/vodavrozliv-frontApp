<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <tabs
        :tab-name="['Устройства', 'Ошибки', 'Сообщения', 'Напоминания']"
        :tab-icon="[
          'devices_other',
          'error',
          'chat_bubble_outline',
          'schedule',
        ]"
        flex-row
        nav-pills-icons
        color-button="success"
      >
        <template slot="tab-pane-1"
          ><mess-list-device-table></mess-list-device-table
        ></template>
        <template slot="tab-pane-2"
          ><mess-list-error-table></mess-list-error-table
        ></template>
        <template slot="tab-pane-3"
          ><mess-list-message-table></mess-list-message-table
        ></template>
        <template slot="tab-pane-4"
          ><mess-list-reminder-table></mess-list-reminder-table
        ></template>
      </tabs>
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";

import MessListDeviceTable from "../components/MessList/MessListDeviceTable.vue";
import MessListErrorTable from "../components/MessList/MessListErrorTable.vue";
import MessListMessageTable from "../components/MessList/MessListMessageTable.vue";
import MessListReminderTable from "../components/MessList/MessListReminderTable.vue";

export default {
  components: {
    Tabs,
    MessListDeviceTable,
    MessListErrorTable,
    MessListMessageTable,
    MessListReminderTable,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>

<style lang="css" scoped>
.md-tabs {
  margin-bottom: 24px;
}
</style>
