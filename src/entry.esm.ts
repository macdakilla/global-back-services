import _Vue, { PluginFunction } from "vue";
import * as components from "./components";
import { Request } from "./helpers";

export interface Settings {
  baseURL?: string;
}
const install: PluginFunction<any> = function installGlobalBackServices(
  Vue: typeof _Vue,
  settings: Settings
) {
  if (settings.baseURL) Request.baseURL = settings.baseURL;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

export default install;

export * from "./components";
export * from "./mixins";
export * from "./utils";
export * from "./helpers";
export { default as Api } from "./api";
export * as stores from "./store";
