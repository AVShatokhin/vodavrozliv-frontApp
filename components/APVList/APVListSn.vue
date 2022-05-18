<template>
  <div class="my-user-item-container">
    <span v-for="(n, i) in snText" :key="i">
      <mark v-if="i % 2">{{ n }}</mark>
      <span v-else>{{ n }}</span>
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    sn: {
      type: String,
      default: "",
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
    snText() {
      return this.highlightedTextArrays(this.sn, this.searchQuery);
    },
  },
};
</script>

<style lang="css" scoped></style>
