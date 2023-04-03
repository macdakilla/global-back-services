<script lang="ts">
import { defineComponent, PropType } from "vue";

export type IndentSize = "x-large" | "large" | "default" | "small" | "x-small";
export default defineComponent({
  name: "GIndent",
  props: {
    top: {
      type: String as PropType<IndentSize>,
    },
    bottom: {
      type: String as PropType<IndentSize>,
    },
    tag: {
      type: String as PropType<string>,
      default: "div",
    },
  },
});
</script>

<template>
  <component
    class="g-indent"
    :class="{
      [`g-indent__top-${top}`]: top,
      [`g-indent__bottom-${bottom}`]: bottom,
    }"
    :is="tag"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import "src/styles/main";
.g-indent {
  &:empty {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  &__top {
    &-x-large {
      padding-top: 150px;
      @include below($notebook) {
        padding-top: 110px;
      }
      @include below($tablet) {
        padding-top: 80px;
      }
      @include below($mobileDef) {
        padding-top: 60px;
      }
    }
    &-large {
      padding-top: 100px;
      @include below($notebook) {
        padding-top: 80px;
      }
      @include below($tablet) {
        padding-top: 60px;
      }
      @include below($mobileDef) {
        padding-top: 40px;
      }
    }
    &-default {
      padding-top: 50px;
      @include below($notebook) {
        padding-top: 40px;
      }
      @include below($tablet) {
        padding-top: 30px;
      }
      @include below($mobileDef) {
        padding-top: 20px;
      }
    }
    &-small {
      padding-top: 25px;
      @include below($notebook) {
        padding-top: 20px;
      }
      @include below($tablet) {
        padding-top: 15px;
      }
      @include below($mobileDef) {
        padding-top: 10px;
      }
    }
    &-x-small {
      padding-top: 10px;
      @include below($notebook) {
        padding-top: 8px;
      }
      @include below($tablet) {
        padding-top: 5px;
      }
      @include below($mobileDef) {
        padding-top: 2px;
      }
    }
  }
  &__bottom {
    &-x-large {
      padding-bottom: 150px;
      @include below($notebook) {
        padding-bottom: 110px;
      }
      @include below($tablet) {
        padding-bottom: 80px;
      }
      @include below($mobileDef) {
        padding-bottom: 60px;
      }
    }
    &-large {
      padding-bottom: 100px;
      @include below($notebook) {
        padding-bottom: 80px;
      }
      @include below($tablet) {
        padding-bottom: 60px;
      }
      @include below($mobileDef) {
        padding-bottom: 40px;
      }
    }
    &-default {
      padding-bottom: 50px;
      @include below($notebook) {
        padding-bottom: 40px;
      }
      @include below($tablet) {
        padding-bottom: 30px;
      }
      @include below($mobileDef) {
        padding-bottom: 20px;
      }
    }
    &-small {
      padding-bottom: 25px;
      @include below($notebook) {
        padding-bottom: 20px;
      }
      @include below($tablet) {
        padding-bottom: 15px;
      }
      @include below($mobileDef) {
        padding-bottom: 10px;
      }
    }
    &-x-small {
      padding-bottom: 10px;
      @include below($notebook) {
        padding-bottom: 8px;
      }
      @include below($tablet) {
        padding-bottom: 5px;
      }
      @include below($mobileDef) {
        padding-bottom: 2px;
      }
    }
  }
}
</style>
