<script lang="ts">
import Vue, { PropType } from "vue";
import modal from "../../store/modal";
export default Vue.extend({
  name: "GModal",
  props: {
    overlayColor: String as PropType<string>,
  },
  created() {
    if (!this.$store.hasModule("modal")) {
      this.$store.registerModule("modal", modal);
    }
  },
});
</script>

<template>
  <div class="g-modal">
    <slot />
  </div>
</template>

<style scoped></style>
