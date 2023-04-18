import { Field } from "./types/page";
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
  notFoundPageConfig: Field;
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
  notFoundPageConfig: {
    name: "NotFoundPage",
    component_path: "",
    block_fields: {
      indent: {
        top: "",
        bottom: "",
      },
    },
  },
  notFoundPageSeo: {
    seo_title: "Страница не найдена",
    seo_description: "",
    seo_keywords: "",
  },
};
export function setConstants(options: Partial<Settings>) {
  console.log(constants, options);
  Object.assign(constants, options);
  console.log(constants);
}
export default constants;
