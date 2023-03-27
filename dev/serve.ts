import Vue, { VNode } from "vue";
// @ts-ignore
import store from "./store";
import Dev from "./serve.vue";
import GlobalBackServices from "../src/entry.esm";

Vue.use(GlobalBackServices, {
  rootStore: store,
  baseURL: "https://list.dealer-car.ru/api/v1",
});

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
  store: store,
}).$mount("#app");
