import { Seo } from "./mixins/meta";
export interface UpdateDataParams {
    callback?: Function;
    scrollTop?: boolean;
    offLoading?: boolean;
}
type Dictionary = {
    [key: string]: [string, string, string];
};
export interface Settings {
    baseURL: string;
    filterPrimitiveParamNames: string[];
    filterParamsDivider: string;
    countItemsOnPage: number;
    filterUpdateDataParams: UpdateDataParams;
    dictionary: Dictionary;
    notFoundPageSeo: Seo;
}
declare let constants: Settings;
export declare function setConstants(options: Partial<Settings>): void;
export default constants;
