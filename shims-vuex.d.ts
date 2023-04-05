import { Store } from "vuex";

import { State as FilterState } from "./src/store/filter/types/state";
import { State as ModalState } from "./src/store/modal/types/state";

declare module "@vue/runtime-core" {
  interface State {
    filter: FilterState;
    modal: ModalState;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $scrollTo: any;
  }
}
