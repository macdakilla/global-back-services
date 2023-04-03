import { PropType } from "vue";
export type IndentSize = "x-large" | "large" | "default" | "small" | "x-small";
declare const _default: import("vue").DefineComponent<{
    top: {
        type: PropType<IndentSize>;
    };
    bottom: {
        type: PropType<IndentSize>;
    };
    tag: {
        type: PropType<string>;
        default: string;
    };
}, {}, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    top: {
        type: PropType<IndentSize>;
    };
    bottom: {
        type: PropType<IndentSize>;
    };
    tag: {
        type: PropType<string>;
        default: string;
    };
}>>, {
    tag: string;
}>;
export default _default;
