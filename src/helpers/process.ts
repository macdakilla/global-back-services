export const isClient: boolean = typeof window === "object";
// @ts-ignore
export const isServer: boolean = typeof window === "undefined";
export const isDev: boolean = process.env.NODE_ENV !== "production";
export const isProd: boolean = process.env.NODE_ENV !== "production";
