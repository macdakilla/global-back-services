import {
  Filter,
  Info,
  Items,
  RequestData,
  Sort,
  State,
  TopFilter,
} from "./state";

export enum MutationTypes {
  SET_LOADING = "SET_LOADING",
  SET_REQUEST_DATA = "SET_REQUEST_DATA",
  RESET_REQUEST_DATA = "RESET_REQUEST_DATA",
  REMOVE_KEY_FROM_REQUEST_DATA = "REMOVE_KEY_FROM_REQUEST_DATA",
  UPDATE_FILTER_BY_INDEX = "UPDATE_FILTER_BY_INDEX",
  SET_FILTERS = "SET_FILTERS",
  SET_TOP_FILTER = "SET_TOP_FILTER",
  SET_ITEMS = "SET_ITEMS",
  SET_SORTING = "SET_SORTING",
  SET_INFO = "SET_INFO",
  SET_PAGE_URL = "SET_PAGE_URL",
  SET_PAGE = "SET_PAGE",
}
export interface Mutations<S = State> {
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
  [MutationTypes.SET_REQUEST_DATA](state: S, payload: RequestData): void;
  [MutationTypes.RESET_REQUEST_DATA](state: S): void;
  [MutationTypes.REMOVE_KEY_FROM_REQUEST_DATA](
    state: S,
    payload: number | string
  ): void;
  [MutationTypes.UPDATE_FILTER_BY_INDEX](
    state: S,
    payload: { index: number; item: Filter }
  ): void;
  [MutationTypes.SET_FILTERS](state: S, payload: Filter[]): void;
  [MutationTypes.SET_TOP_FILTER](state: S, payload: TopFilter): void;
  [MutationTypes.SET_ITEMS](state: S, payload: Items): void;
  [MutationTypes.SET_SORTING](state: S, payload: Sort[]): void;
  [MutationTypes.SET_INFO](state: S, payload: Info): void;
  [MutationTypes.SET_PAGE_URL](state: S, payload: string): void;
  [MutationTypes.SET_PAGE](state: S, payload: State["page"]): void;
}
