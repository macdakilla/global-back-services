export type RequestItem = string[] | number[] | number | string;
export interface RequestData {
    [key: string]: RequestItem;
}
export type Item = {
    [key: string]: any;
};
export interface ItemGroup {
    count: string;
    count_visible: number;
    group_name: string;
    id: number;
    page: number;
    url: string;
    values: Item[];
}
export interface Items {
    data: ItemGroup[];
    type: string;
}
export interface BreadcrumbsItem {
    name: string;
    url: string;
}
export interface Info {
    breadcrumbs: BreadcrumbsItem[];
    description: string;
    h1: string;
    isNoindex: boolean;
    keywords: string;
    title: string;
    url: string;
    cars_count: number;
    page_next: boolean;
}
export interface SortItem {
    sort_id: number;
    name: string;
    value: string;
}
export interface Sort {
    id: number;
    name: string;
    title: string;
    value: any;
    values: SortItem[];
}
export interface TopFilter {
    name: string;
    type: string;
    label: string;
    checked: boolean;
    id: number;
}
export interface FilterItem {
    checked: boolean;
    count: number;
    disabled: boolean;
    hidden: boolean;
    key: string | number;
    name: string;
}
export type FormatFilter = "number";
export interface RangeItem {
    format: FormatFilter;
    interval: number;
    max: number;
    min: number;
    postfix: string;
    range: [number, number];
}
export interface FilterGroup {
    group_name: string;
    values: FilterItem[];
}
export declare enum FilterType {
    CHECKBOX = "checkbox",
    COLOR = "color",
    SELECT = "select",
    RANGE = "range"
}
export interface Filter {
    disabled: boolean;
    error_message: null | string;
    placeholder: string;
    id: number;
    name: string;
    opened: boolean;
    related: string;
    second_column: boolean;
    column: number;
    tags_ignore: boolean;
    title: string;
    type: FilterType;
    values: FilterGroup[] | RangeItem;
}
export interface State {
    loading: boolean;
    requestData: RequestData;
    filters: Filter[];
    topFilter: TopFilter | null;
    sorting: Sort[];
    info: Info | null;
    items: Items | null;
    page: number | string;
}
