<template>
  <div class="my-user-item-container">
    <span v-for="(n, i) in krugIdText" :key="i">
      <mark v-if="i % 2">{{ n }}</mark>
      <span v-else>{{ n }}</span>
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  name: "krug-list-id-block",
  props: {
    krug_id: {
      type: Number,
      default: 0,
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    highlightedTextArrays(text, search) {
      return search
        ? text.split(
            RegExp(`(${search.replace(/[\\^$|.*?+{}()[\]]/g, "\\$&")})`, "gi")
          )
        : [text];
    },
  },
  mounted() {},
  watch: {},
  computed: {
    krugIdText() {
      return this.highlightedTextArrays(this.krug_id, this.searchQuery);
    },
  },
};
</script>

<style lang="css" scoped></style>
