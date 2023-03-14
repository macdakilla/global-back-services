import Vue, { VNode } from "vue";
import Dev from "./serve.vue";
import GlobalBackServices from "../src/entry.esm";
Vue.use(GlobalBackServices);

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
}).$mount("#app");
