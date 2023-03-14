<script lang="ts">
import Vue from "vue";
import { block } from "../../mixins";
import { componentPromise } from "../../utils";

export default Vue.extend({
  name: "AsyncComponentLoader",
  mixins: [block],
  props: {
    path: {
      type: String,
    },
    delay: {
      type: Number,
      default: 100,
    },
    timeout: {
      type: Number,
      default: 6000,
    },
  },
  computed: {
    componentLoader(): () => {
      component: Promise<unknown>;
      delay: number | undefined;
      timeout: number | undefined;
    } {
      return () => {
        return {
          component: componentPromise(this.path),
          delay: this.delay,
          timeout: this.timeout,
        };
      };
    },
  },
});
</script>

<template>
  <component
    v-if="path"
    :fields="fields"
    :breadcrumbs="breadcrumbs"
    :id="id"
    :is="componentLoader"
  />
</template>
