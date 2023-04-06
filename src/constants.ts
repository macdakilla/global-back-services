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

class Constants {
  static constants: Settings = {
    baseURL: "",
    filterPrimitiveParamNames: [],
    filterParamsDivider: "|",
    filterUpdateDataParams: {
      scrollTop: true,
      offLoading: false,
    },
  };
  static setConstants(options: Partial<Settings>) {
    Constants.constants = Object.assign({}, Constants.constants, options);
  }
}
export default Constants;
