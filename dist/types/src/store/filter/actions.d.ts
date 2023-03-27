import { ActionTree } from "vuex";
import { State } from "./types/state";
import { Actions } from "./types/actions";
declare const actions: ActionTree<State, State> & Actions;
export default actions;
