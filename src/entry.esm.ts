import _Vue, { PluginFunction } from "vue";
import * as stores from "./store";
import * as components from "./components";

const install: PluginFunction<any> = function installGlobalBackServices(
  Vue: typeof _Vue,
  settings
) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
  if (settings && settings.rootStore) {
    Object.entries(stores).forEach(([storeName, store]) => {
      if (!settings.rootStore.hasModule(storeName)) {
        settings.rootStore.registerModule("test", store);
      }
    });
  }
};

export default install;

export * from "./components";
export * from "./mixins";
export * from "./utils";
export * from "./helpers";
