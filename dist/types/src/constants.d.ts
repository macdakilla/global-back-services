export interface UpdateDataParams {
    callback?: Function;
    scrollTop?: boolean;
    offLoading?: boolean;
}
export interface Settings {
    baseURL: string;
    filterPrimitiveParamNames: string[];
    filterParamsDivider: string;
    filterUpdateDataParams: UpdateDataParams;
}
declare let constants: Settings;
export declare function setConstants(options: Partial<Settings>): void;
export default constants;
