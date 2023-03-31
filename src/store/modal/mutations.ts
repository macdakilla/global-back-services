import { MutationTree } from "vuex";
import { State } from "./types/state";
import { Mutations, MutationTypes } from "./types/mutations";

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.OPEN_DIALOG](state, modal) {
    state.active = true;
    state.modal = modal;
  },
  [MutationTypes.CLOSE_MODAL](state) {
    state.active = false;
    state.modal = null;
  },
};

export default mutations;
