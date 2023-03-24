<script lang="ts">
import Vue from "vue";
import size from "../src/mixins/size";

export default Vue.extend({
  name: "ServeDev",
  mixins: [size]
});
</script>

<template>
  <div id="app" v-if="isDesktop">
    {{ isTablet }}
  </div>
</template>
