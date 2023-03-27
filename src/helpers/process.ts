// @ts-ignore
import { isObject, isUndefined } from "@/helpers/types";

export const isClient: boolean = isObject(window);
// @ts-ignore
export const isServer: boolean = isUndefined(window);
export const isDev: boolean = process.env.NODE_ENV !== "production";
export const isProd: boolean = process.env.NODE_ENV !== "production";
