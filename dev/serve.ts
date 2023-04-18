import Vue, { VNode } from "vue";
// @ts-ignore
import store from "./store";
import Dev from "./serve.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
  store: store,
}).$mount("#app");
