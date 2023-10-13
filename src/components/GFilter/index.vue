<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import { isClient, syncHash } from "../../helpers";
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
  fetchOnServer: false,
  methods: {
    ...mapMutations({
      resetRequestData: `filter/RESET_REQUEST_DATA`,
      setRequestData: `filter/SET_REQUEST_DATA`,
    }),
    async updateData(
      settings: UpdateDataParams = constants.filterUpdateDataParams
    ) {
      await this.$store.dispatch(`filter/updateData`, settings);
      await this.$store.dispatch(`filter/updatePromo`);
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
