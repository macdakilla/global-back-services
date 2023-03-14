import Vue from "vue";
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, unknown, unknown, {
    componentLoader: () => {
        component: Promise<unknown>;
        delay: number | undefined;
        timeout: number | undefined;
    };
}, {
    path: string;
    delay: number;
    timeout: number;
}, {}, {
    props: {
        fields: {
            type: import("vue").PropType<import("../../mixins/block").Field>;
        };
        id: {
            type: NumberConstructor;
            default: null;
        };
        breadcrumbs: {
            type: import("vue").PropType<import("../../mixins/block").Breadcrumb[]>;
        };
    };
}, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default _default;
