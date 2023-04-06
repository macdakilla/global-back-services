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

let constants: Settings = {
  baseURL: "",
  filterPrimitiveParamNames: [],
  filterParamsDivider: "|",
  filterUpdateDataParams: {
    scrollTop: true,
    offLoading: false,
  },
  dictionary: {},
};
export function setConstants(options: Partial<Settings>) {
  Object.assign(constants, options);
}
export default constants;
