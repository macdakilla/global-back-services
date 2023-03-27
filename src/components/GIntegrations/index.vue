<script lang="ts">
import Vue from "vue";
import { saveUTM } from "../../utils";

export default Vue.extend({
  name: "GIntegrations",
  props: {
    footerScripts: String,
    bodyScripts: String,
    styles: String,
  },
  beforeMount() {
    if (this.styles) {
      const stylesBlock = document.createElement("style");
      stylesBlock.textContent = this.styles;
      document.head.appendChild(stylesBlock);
    }
    saveUTM();
  },
});
</script>

<template>
  <div>
    <div class="body-scripts" v-if="bodyScripts" v-html="bodyScripts" />
    <slot />
    <div class="footer-scripts" v-if="footerScripts" v-html="footerScripts" />
  </div>
</template>
