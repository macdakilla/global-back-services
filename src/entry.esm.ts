import _Vue, { PluginFunction } from "vue";
import * as components from "./components";
import Constants, { Settings } from "./constants";

const install: PluginFunction<any> = function installGlobalBackServices(
  Vue: typeof _Vue,
  settings: Settings
) {
  Constants.setConstants(settings);
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
