import _Vue, { PluginFunction } from "vue";
import * as stores from "./store";
import * as components from "./components";
import Api from "./api";

export interface Settings {
  baseURL?: string;
  rootStore?: any;
}
const install: PluginFunction<any> = function installGlobalBackServices(
  Vue: typeof _Vue,
  settings: Settings
) {
  if (settings.baseURL) Api.baseURL = settings.baseURL;
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
