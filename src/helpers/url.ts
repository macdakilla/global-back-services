import { isNumber } from "./types";
import Constants from "../constants";
export const getQueryParam = (url: string, param: string): string => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.has(param) ? searchParams.get(param) || "" : "";
};

export const syncHash = (query: {
  [key: string]: string;
}): { [key: string]: any } => {
  const { filterPrimitiveParamNames, filterParamsDivider } =
    Constants.constants;
  const params: { [key: string]: any } = {};
  for (const elem in query) {
    if (filterPrimitiveParamNames.includes(elem)) {
      params[elem] = isNumber(+query[elem])
        ? Number(query[elem])
        : String(query[elem]);
    } else {
      params[elem] = [
        ...new Set(
          query[elem]
            .split(filterParamsDivider)
            .map((item) =>
              isNumber(+item) ? Number(item) : String(item).toLowerCase()
            )
        ),
      ];
    }
  }
  return params;
};
