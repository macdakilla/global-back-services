import { PluginFunction } from "vue";
declare const install: PluginFunction<any>;
export default install;
export * from "./components";
export * from "./mixins";
export * from "./utils";
export * from "./helpers";
export { default as Api } from "./api";
export * as stores from "./store";
