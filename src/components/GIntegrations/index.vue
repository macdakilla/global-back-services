<script lang="ts">
import { PropType, defineComponent } from "vue";
import { saveUTM } from "../../utils";
import { isObject, isString } from "../../helpers";

export default defineComponent({
  name: "GIntegrations",
  props: {
    footerScripts: String,
    bodyScripts: String,
    styles: String,
    design: Object as PropType<{ [key: string]: string }>,
  },
  beforeMount() {
    if (this.styles) {
      const stylesBlock = document.createElement("style");
      stylesBlock.textContent = this.styles;
      document.head.appendChild(stylesBlock);
    }
    saveUTM();
    if (isObject(this.design)) {
      for (const varsKey in this.design) {
        if (!isString(this.design[varsKey])) {
          document.documentElement.style.setProperty(
            `--${varsKey}`,
            this.design[varsKey]
          );
        }
      }
    }
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
