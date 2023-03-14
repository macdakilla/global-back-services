<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ServeDev",
});
</script>

<template>
  <div id="app">
    <async-component-loader path="'123'" />
  </div>
</template>
