import { PropType } from "vue";
import { Field, Breadcrumb } from "../types/page";
declare const _default: {
    props: {
        fields: {
            type: PropType<Field>;
        };
        id: {
            type: NumberConstructor;
            default: null;
        };
        breadcrumbs: {
            type: PropType<Breadcrumb[]>;
        };
    };
};
export default _default;
