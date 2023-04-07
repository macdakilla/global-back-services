import { Filter, FilterType, RequestData, RequestItem } from "../store/filter/types/state";
export interface Tag {
    type: FilterType;
    key?: string | number;
    name: string;
    title?: string;
    param: string;
    group_name?: string;
}
export interface RangeTag extends Omit<Tag, "name"> {
    name: string;
    changeMin: boolean;
    min: number;
    max: number;
    range: [number, number];
}
export declare function getTags(filters: Filter[]): Tag[];
export declare function removeTag(tag: Tag | RangeTag, requestData: RequestData): RequestItem;
