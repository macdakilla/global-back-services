import { PropType, Component } from "vue";
import { Modal, ModalParams } from "../../store/modal/types/state";
declare const _default: import("vue").DefineComponent<{
    transition: {
        type: PropType<string>;
        default: string;
    };
    overlayColor: {
        type: PropType<string>;
        default: string;
    };
    components: {
        type: PropType<Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        default(): {};
    };
}, {}, {}, {
    modalState(): Modal;
    currentModalComponent(): Component | undefined;
    currentModalParams(): ModalParams;
    isOpen(): boolean;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    transition: {
        type: PropType<string>;
        default: string;
    };
    overlayColor: {
        type: PropType<string>;
        default: string;
    };
    components: {
        type: PropType<Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        default(): {};
    };
}>>, {
    components: Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    transition: string;
    overlayColor: string;
}>;
export default _default;
