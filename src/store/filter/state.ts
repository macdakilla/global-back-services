import { State } from "./types/state";

const state: State = {
  loading: false,
  requestData: {},
  filters: [],
  topFilter: null,
  sorting: [],
  info: null,
  items: null,
  page: 1,
};
export default state;
