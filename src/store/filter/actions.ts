import { ActionTree } from "vuex";
import { State } from "./types/state";
import { Actions, ActionTypes } from "./types/actions";
import { MutationTypes } from "./types/mutations";
import { getQueryParam } from "../../helpers";
import Api from "../../api";
import { UpdateDataParams } from "../../constants";
import { removeTag, Tag } from "../../utils";

const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.REMOVE_TAG]({ commit, state }, tag: Tag) {
    commit(MutationTypes.SET_REQUEST_DATA, {
      [tag.param]: removeTag(tag, state.requestData),
    });
  },
  async [ActionTypes.UPDATE_DATA](
    { commit, getters },
    settings: UpdateDataParams = {}
  ) {
    if (!settings.offLoading) {
      commit(MutationTypes.SET_LOADING, true);
    }
    const openedFilters = getters.openedFilterNames;
    const requestData = {
      type: "items",
      view: "model",
      ...getters.requestData,
    };
    if (openedFilters.length) {
      requestData.opened = openedFilters;
    }
    console.log(requestData);
    const data = await Api.getFilterData(requestData);
    console.log(data);
    if (typeof data === "object") {
      commit(MutationTypes.SET_FILTERS, data.filters);
      commit(MutationTypes.SET_TOP_FILTER, data.top_filter);
      commit(MutationTypes.SET_ITEMS, data.cars);
      commit(MutationTypes.SET_SORTING, data.sorting);
      commit(MutationTypes.SET_INFO, data.info);
      commit(MutationTypes.SET_PAGE_URL, data.info.url);
      commit(
        MutationTypes.SET_PAGE,
        getQueryParam(`/url?${data.info.url || ""}`, "page")
      );
    }
    if (!settings.offLoading) {
      commit(MutationTypes.SET_LOADING, false);
    }
  },
};

export default actions;
