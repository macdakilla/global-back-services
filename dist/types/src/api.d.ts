import { RequestData } from "./store/filter/types/state";
import { FilterAPI } from "./types/filter";
import { Request } from "./helpers";
import { NoContentResponse } from "./helpers/request";
declare class Api extends Request {
    static getFilterData(request: RequestData): Promise<FilterAPI | string>;
    static sendTicket(request: FormData): Promise<NoContentResponse | string>;
}
export default Api;
