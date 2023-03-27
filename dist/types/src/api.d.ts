import { RequestData } from "./store/filter/types/state";
import { FilterAPI } from "./types/filter";
declare class Api {
    static baseURL: string;
    static getFilterData(request: RequestData): Promise<FilterAPI | string>;
}
export default Api;
