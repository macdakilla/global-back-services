import { GetterTree } from "vuex";
import { State } from "./types/state";
import { Getters } from "./types/getters";
import { getTags } from "../../utils";

const getters: GetterTree<State, State> & Getters = {
  requestData: (state: State) => state.requestData,
  countItems: (state: State) => (state.info ? state.info.cars_count : 0),
  sorting: (state: State) => state.sorting,
  items: (state: State) => (state.items ? state.items.data : []),
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
