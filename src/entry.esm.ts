import _Vue, { PluginFunction } from "vue";

import * as components from "./components";

const install: PluginFunction<any> = function installGlobalBackServices(
  Vue: typeof _Vue
) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

export default install;

export * from "./components";
export * from "./mixins";
export * from "./utils";
