<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ServeDev",
  mounted() {
    console.log(this.$store.dispatch('test/updateData'))
  }
});
</script>

<template>
  <div id="app">
    354
  </div>
</template>
