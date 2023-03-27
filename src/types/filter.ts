import {
  Info,
  Items,
  Sort,
  TopFilter,
  Filter,
} from "../store/filter/types/state";

export interface FilterAPI {
  cars: Items;
  filters: Filter[];
  info: Info;
  sorting: Sort[];
  top_filter: TopFilter;
}
