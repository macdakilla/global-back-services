import { ModalParams } from "../store/modal/types/state";
import { MutationTypes } from "../store/modal/types/mutations";
import { defineComponent } from "vue";
export default defineComponent({
  methods: {
    modalShow(name: string, params: ModalParams = {}) {
      this.$store.commit(`modal/${MutationTypes.OPEN_DIALOG}`, {
        name,
        params,
      });
      const html = document.querySelector("html");
      if (html) {
        html.classList.remove("locked");
      }
    },

    modalHide() {
      this.$store.commit(`modal/${MutationTypes.CLOSE_MODAL}`);
      const html = document.querySelector("html");
      if (html) {
        html.classList.remove("locked");
      }
    },
  },
});
