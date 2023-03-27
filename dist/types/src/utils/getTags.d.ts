import { Filter, FilterType } from "../store/filter/types/state";
interface Tags {
    type: FilterType;
    key?: string | number;
    name: string;
    title?: string;
    param: string;
    group_name?: string;
}
declare function getTags(filters: Filter[]): Tags[];
export default getTags;
