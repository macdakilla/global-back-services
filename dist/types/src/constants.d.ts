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
    filterUpdateDataParams: UpdateDataParams;
    dictionary: Dictionary;
}
declare let constants: Settings;
export declare function setConstants(options: Partial<Settings>): void;
export default constants;
