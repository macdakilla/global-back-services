import { Item, ItemGroup, State } from "./state";
export type Getters = {
    requestData(state: State): State["requestData"];
    countItems(state: State): number;
    countPages(state: State): number;
    watchedItems(state: State): number;
    sorting(state: State): State["sorting"];
    items(state: State): ItemGroup[];
    values(state: State): Item[];
    loading(state: State): State["loading"];
    filters(state: State): State["filters"];
    topFilter(state: State): State["topFilter"];
    info(state: State): State["info"];
    page(state: State): State["page"];
    openedFilterNames(state: State): string[];
};
