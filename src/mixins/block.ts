import { PropType } from "vue";

export interface Breadcrumb {
  url: string;
  name: string;
}
export interface Field {
  block_fields: {
    [key: string]: any;
  };
  component_path: string;
  name: string;
}

export default {
  props: {
    fields: {
      type: Object as PropType<Field>,
    },
    id: {
      type: Number,
      default: null,
    },
    breadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
    },
  },
};
