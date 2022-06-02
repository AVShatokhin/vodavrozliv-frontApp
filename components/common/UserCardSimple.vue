<template>
  <div>
    <div class="my-user-item-container">
      <div class="my-row">
        <div>Имя:</div>
        <div class="my-item">
          <b>
            <span v-for="(n, i) in secondNameText" :key="n">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
            {{ " " }}
            <span v-for="(n, i) in nameText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
          </b>
        </div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>E-mail:</div>
        <div class="my-item">
          <b>
            <span v-for="(n, i) in emailText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
          </b>
        </div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Должность:</div>
        <div class="my-item">
          <b>
            <span v-for="(n, i) in positionText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
          </b>
        </div>
      </div>
    </div>

    <div class="my-user-item-container">
      <div class="my-row">
        <div>Телефон:</div>
        <div class="my-item">
          <b>
            <span v-for="(n, i) in phoneText" :key="i">
              <mark v-if="i % 2">{{ n }}</mark>
              <span v-else>{{ n }}</span>
            </span>
          </b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-card-simple",
  props: {
    uid: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    secondName: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showDialog: false,
      email_: null,
      position_: null,
      name_: null,
      secondName_: null,
      phone_: null,

      email__: null,
      position__: null,
      name__: null,
      secondName__: null,
      phone__: null,
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
    editData() {
      this.email__ = this.email_;
      this.postion__ = this.position_;
      this.name__ = this.name_;
      this.secondName__ = this.secondName_;
      this.position__ = this.position_;
      this.phone__ = this.phone_;
      this.showDialog = true;
    },
    submitChanges() {
      let data = {
        uid: this.uid,
        email: this.email__,
        extended: {
          name: this.name__,
          position: this.position__,
          phone: this.phone__,
          secondName: this.secondName__,
        },
      };

      this.ajax.adminUpdateUserInfo(
        this,
        data,
        (r) => {
          if (r.status == "ok") {
            this.showSuccessNotify({
              title: "OK",
              message: "Изменены данные пользователя",
            });
            this.email_ = this.email__;
            this.postion_ = this.position__;
            this.name_ = this.name__;
            this.secondName_ = this.secondName__;
            this.position_ = this.position__;
            this.phone_ = this.phone__;

            this.$emit("userInfoChanged", data);
            this.showDialog = false;
          } else if (r.status == "failed") {
            this.showErrorNotify(r);
          }
        },
        (err) => {}
      );
    },
    highlightedTextArrays(text, search) {
      if (text == null) return [];

      return search
        ? text.split(
            RegExp(`(${search.replace(/[\\^$|.*?+{}()[\]]/g, "\\$&")})`, "gi")
          )
        : [text];
    },
  },
  mounted() {
    this.email_ = this.email;
    this.postion_ = this.position;
    this.name_ = this.name;
    this.secondName_ = this.secondName;
    this.position_ = this.position;
    this.phone_ = this.phone;
  },
  watch: {},
  computed: {
    emailText() {
      return this.highlightedTextArrays(this.email, this.searchQuery);
    },
    phoneText() {
      return this.highlightedTextArrays(this.phone, this.searchQuery);
    },
    positionText() {
      return this.highlightedTextArrays(this.position, this.searchQuery);
    },
    nameText() {
      return this.highlightedTextArrays(this.name, this.searchQuery);
    },
    secondNameText() {
      return this.highlightedTextArrays(this.secondName, this.searchQuery);
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

.my-item {
  padding-left: 15px;
}

.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: rgb(55, 172, 80);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  width: 120px;
  top: 100%;
  left: 100%;
  margin-left: -60px;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.my-dialog-content {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 15px;
}

.span__no_mark {
  color: red;
  /* margin-left: 0px;
  margin-right: 0px;
  padding-left: 0px;
  padding-right: 0px; */
}
</style>
