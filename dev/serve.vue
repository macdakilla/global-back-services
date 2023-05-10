<script>
import { filter } from "../src/store";
import { ActionTypes } from "../src/store/filter/types/actions";

export default {
  name: "ServeDev",
  methods: {
    async onClick() {
      await this.$store.dispatch(`filter/${ActionTypes.UPDATE_DATA}`);
      await this.$store.dispatch(`filter/${ActionTypes.UPDATE_PROMO}`);
      console.log(this.$store.getters["filter/items"]);
    },
  },
  mounted() {
    if (!this.$store.hasModule("filter")) {
      this.$store.registerModule("filter", filter);
    }
  },
};
</script>

<template>
  <div id="app">
    <button @click="onClick">Нажми меня блеать</button>
  </div>
</template>
