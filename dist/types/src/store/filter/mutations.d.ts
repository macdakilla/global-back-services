import { MutationTree } from "vuex";
import { State } from "./types/state";
import { Mutations } from "./types/mutations";
declare const mutations: MutationTree<State> & Mutations;
export default mutations;
