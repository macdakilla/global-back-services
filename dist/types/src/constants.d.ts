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
declare class Constants {
    static constants: Settings;
    static setConstants(options: Partial<Settings>): void;
}
export default Constants;
