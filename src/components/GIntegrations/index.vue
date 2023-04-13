<script lang="ts">
import { PropType, defineComponent } from "vue";
import { saveUTM } from "../../utils";

export default defineComponent({
  name: "GIntegrations",
  props: {
    footerScripts: String,
    bodyScripts: String,
    styles: String,
    design: Object as PropType<{ [key: string]: string }>,
  },
  beforeMount() {
    saveUTM();
    this.initCustomStyles();
  },
  methods: {
    initCustomStyles() {
      if (this.styles) {
        const stylesBlock = document.createElement("style");
        stylesBlock.textContent = this.styles;
        document.head.appendChild(stylesBlock);
      }
    },
  },
});
</script>

<template>
  <div>
    <div class="g-body-scripts" v-if="bodyScripts" v-html="bodyScripts" />
    <slot />
    <div class="g-footer-scripts" v-if="footerScripts" v-html="footerScripts" />
  </div>
</template>
