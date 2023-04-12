<script lang="ts">
import { defineComponent, PropType, Component } from "vue";
import { Modal, ModalParams } from "../../store/modal/types/state";
export default defineComponent({
  name: "GModal",
  props: {
    transition: {
      type: String as PropType<string>,
      default: "fade",
    },
    overlayColor: {
      type: String as PropType<string>,
      default: "rgba(52, 52, 52, 0.3)",
    },
    components: {
      type: Object as PropType<Record<string, Component>>,
      default() {
        return {};
      },
    },
  },
  computed: {
    modalState(): Modal {
      return this.$store.state.modal.modal || {};
    },
    currentModalComponent(): Component | undefined {
      return this.components[this.modalState.name];
    },
    currentModalParams(): ModalParams {
      return this.modalState.params || {};
    },
    isOpen(): boolean {
      return this.$store.state.modal.active;
    },
  },
  watch: {
    "$route.path"() {
      if (this.$store.state.modal?.active) {
        // @ts-ignore
        this.modalHide();
      }
    },
  },
});
</script>

<template>
  <transition :name="transition">
    <div class="g-modal" v-if="isOpen">
      <div
        class="g-modal__overlay"
        @click="modalHide"
        :style="{ background: overlayColor }"
      />
      <component
        class="g-modal__content"
        :is="currentModalComponent"
        :params="currentModalParams"
        @close="modalHide"
      />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.g-modal {
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
<style lang="scss">
html.locked {
  overflow: hidden;
  @media only screen and (min-width: 1025px) {
    padding-right: 15px;
  }
}
</style>
