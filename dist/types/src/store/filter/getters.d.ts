import { GetterTree } from "vuex";
import { State } from "./types/state";
import { Getters } from "./types/getters";
declare const getters: GetterTree<State, State> & Getters;
export default getters;
