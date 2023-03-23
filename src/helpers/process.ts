// @ts-ignore
export const isClient: boolean = process.client;
// @ts-ignore
export const isServer: boolean = !process.client;
export const isDev: boolean = process.env.NODE_ENV !== "production";
export const isProd: boolean = process.env.NODE_ENV !== "production";
