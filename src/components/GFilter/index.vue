<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { isClient, syncHash } from "../../helpers";
import { ActionTypes } from "../../store/filter/types/actions";
import { MutationTypes } from "../../store/filter/types/mutations";
import constants, { UpdateDataParams } from "../../constants";

export default defineComponent({
  name: "GFilter",
  async fetch() {
    this.resetRequestData();
    this.setRequestData(
      syncHash(this.$route.query as { [key: string]: string })
    );
    await this.updateData();
  },
  methods: {
    ...mapMutations({
      resetRequestData: `filter/${MutationTypes.RESET_REQUEST_DATA}`,
      setRequestData: `filter/${MutationTypes.SET_REQUEST_DATA}`,
    }),
    async updateData(
      settings: UpdateDataParams = constants.filterUpdateDataParams
    ) {
      await this.$store.dispatch(`filter/${ActionTypes.UPDATE_DATA}`, settings);
      await this.$store.dispatch(`filter/${ActionTypes.UPDATE_PROMO}`);
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
