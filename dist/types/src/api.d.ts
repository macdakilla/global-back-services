import { Promo, RequestData } from "./store/filter/types/state";
import { FilterAPI } from "./types/filter";
import { Request } from "./helpers";
import { NoContentResponse } from "./helpers/request";
import { Page } from "./types/page";
declare class Api extends Request {
    static getFilterData(request: RequestData): Promise<FilterAPI | string>;
    static getRandomPromo(): Promise<Promo | string>;
    static sendTicket(request: FormData): Promise<NoContentResponse | string>;
    static getPage(url: string): Promise<Page | string>;
}
export default Api;
