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
