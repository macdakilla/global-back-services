import { PropType } from "vue";
import { Field, Breadcrumb } from "../types/page";

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
