import { GetterTree } from "vuex";
import { State } from "./types/state";
import { Getters } from "./types/getters";
import { getTags } from "../../utils";
import constants from "../../constants";
import { isNotEmptyArray } from "../../helpers";

const getters: GetterTree<State, State> & Getters = {
  requestData: (state: State) => state.requestData,
  countItems: (state: State) => (state.info ? state.info.cars_count : 0),
  watchedItems: (state: State) =>
    +state.page *
    ((state.info || {}).watchedItems || constants.countItemsOnPage),
  countPages: (state: State) =>
    state.info
      ? Math.ceil(
          state.info.cars_count /
            (state.info.watchedItems || constants.countItemsOnPage)
        )
      : 0,
  sorting: (state: State) => state.sorting,
  items: (state: State) => (state.items ? state.items.data : []),
  values: (state: State) => {
    const groupsItems = state.items ? state.items.data : [];
    if (isNotEmptyArray(groupsItems) && isNotEmptyArray(groupsItems[0].values))
      return groupsItems[0].values;
    return [];
  },
  loading: (state: State) => state.loading,
  filters: (state: State) => state.filters,
  topFilter: (state: State) => state.topFilter,
  info: (state: State) => state.info,
  page: (state: State) => state.page,
  openedFilterNames: (state: State) =>
    state.filters.filter((el) => el.opened).map((el) => el.name),
  tags(state: State) {
    return getTags(state.filters);
  },
};

export default getters;
