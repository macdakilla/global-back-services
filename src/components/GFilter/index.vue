<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapMutations } from "vuex";
import { isClient, syncHash } from "../../helpers";
import { ActionTypes } from "../../store/filter/types/actions";
import { MutationTypes } from "../../store/filter/types/mutations";
import constants, { UpdateDataParams } from "../../constants";

export default defineComponent({
  name: "GFilter",
  props: {
    currentRoute: {
      type: Object as PropType<{ [key: string]: string }>,
    },
  },
  async fetch() {
    // this.setRequestData(syncHash(this.$route.query as { [key: string]: string }));
    this.setRequestData(
      syncHash(this.currentRoute as { [key: string]: string })
    );
    await this.updateData();
  },
  // watch: {
  //   async $route() {
  //     this.resetRequestData();
  //     this.setRequestData(
  //       syncHash(this.$route.query as { [key: string]: string })
  //     );
  //     await this.updateData();
  //   },
  // },
  methods: {
    ...mapMutations({
      resetRequestData: `filter/${MutationTypes.RESET_REQUEST_DATA}`,
      setRequestData: `filter/${MutationTypes.SET_REQUEST_DATA}`,
    }),
    async updateData(
      settings: UpdateDataParams = constants.filterUpdateDataParams
    ) {
      await this.$store.dispatch(`filter/${ActionTypes.UPDATE_DATA}`, settings);
      if (settings.scrollTop && isClient) {
        this.$nextTick(() => {
          this.$scrollTo("body");
        });
      }
      if (settings.callback) {
        settings.callback();
      }
    },
  },
});
</script>

<template>
  <div class="g-filter">
    <slot :update="updateData" />
  </div>
</template>

<style scoped></style>
