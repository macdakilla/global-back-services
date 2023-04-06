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

let constants: Settings = {
  baseURL: "",
  filterPrimitiveParamNames: [],
  filterParamsDivider: "|",
  filterUpdateDataParams: {
    scrollTop: true,
    offLoading: false,
  },
};
export function setConstants(options: Partial<Settings>) {
  Object.assign(constants, options);
}
export default constants;
