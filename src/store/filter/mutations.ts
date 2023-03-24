import { isClient } from "../../helpers";
import { MutationTree } from "vuex";
import { State } from "./types/state";
import { Mutations, MutationTypes } from "./types/mutations";

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LOADING](state, val) {
    state.loading = val;
  },
  [MutationTypes.SET_REQUEST_DATA](state, data) {
    state.requestData = { ...state.requestData, ...data };
  },
  [MutationTypes.RESET_REQUEST_DATA](state) {
    state.requestData = { view: state.requestData.view };
  },
  [MutationTypes.REMOVE_KEY_FROM_REQUEST_DATA](state, key) {
    delete state.requestData[key];
  },
  [MutationTypes.UPDATE_FILTER_BY_INDEX](state, { index, item }) {
    state.filters.splice(index, 1, item);
  },
  [MutationTypes.SET_FILTERS](state, data) {
    state.filters = data;
  },
  [MutationTypes.SET_TOP_FILTER](state, data) {
    state.topFilter = data;
  },
  [MutationTypes.SET_ITEMS](state, items) {
    state.items = items;
  },
  [MutationTypes.SET_SORTING](state, data) {
    state.sorting = data;
  },
  [MutationTypes.SET_INFO](state, data) {
    state.info = data;
  },
  [MutationTypes.SET_PAGE_URL](_, url) {
    if (isClient) {
      history.pushState(
        "",
        "data.seo.title",
        `${location.pathname}?${url || ""}`
      );
    }
  },
  [MutationTypes.SET_PAGE](state, page) {
    state.page = page;
  },
};

export default mutations;
