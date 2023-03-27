declare const _default: {
    namespaced: boolean;
    state: import("./types/state").State;
    getters: import("vuex").GetterTree<import("./types/state").State, import("./types/state").State> & import("./types/getters").Getters;
    mutations: import("vuex").MutationTree<import("./types/state").State> & import("./types/mutations").Mutations<import("./types/state").State>;
    actions: import("vuex").ActionTree<import("./types/state").State, import("./types/state").State> & import("./types/actions").Actions;
};
export default _default;
