<script>
import modal from "../../store/modal";
export default {
  name: "GModal",
  props: {
    transition: {
      type: String,
      default: "fade",
    },
    overlayColor: {
      type: String,
      default: "rgba(52, 52, 52, 0.3)",
    },
    components: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    if (!this.$store.hasModule("modal")) {
      this.$store.registerModule("modal", modal);
    }
  },
  computed: {
    modalState() {
      return this.$store.state?.modal?.modal || {};
    },
    currentModalComponent() {
      return this.components[this.modalState.name];
    },
    currentModalParams() {
      return this.modalState.params || {};
    },
    isOpen() {
      return this.$store.state?.modal?.active;
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit("modal/closeModal");
    },
  },
};
</script>

<template>
  <transition :name="transition">
    <div class="g-modal" v-if="isOpen">
      <div
        class="g-modal__overlay"
        @click="closeDialog"
        :style="{ background: overlayColor }"
      />
      <component
        class="g-modal__content"
        :is="currentModalComponent"
        :params="currentModalParams"
        @close="closeDialog"
      />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modals-dialog {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__content {
    position: relative;
    z-index: 1;
  }
}
</style>
