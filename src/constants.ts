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

let constants: Settings = {
  baseURL: "",
  filterPrimitiveParamNames: [],
  filterParamsDivider: "|",
  filterUpdateDataParams: {
    scrollTop: true,
    offLoading: false,
  },
  countItemsOnPage: 12,
  dictionary: {},
  notFoundPageSeo: {
    seo_title: "Страница не найдена",
    seo_description: "",
    seo_keywords: "",
  },
};
export function setConstants(options: Partial<Settings>) {
  Object.assign(constants, options);
}
export default constants;
