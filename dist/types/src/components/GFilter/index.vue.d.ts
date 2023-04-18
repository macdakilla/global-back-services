import { PropType } from "vue";
import { UpdateDataParams } from "../../constants";
declare const _default: import("vue").DefineComponent<{
    currentRoute: {
        type: PropType<{
            [key: string]: string;
        }>;
    };
}, {}, {}, {}, {
    updateData(settings?: UpdateDataParams): Promise<void>;
    resetRequestData: import("vuex").MutationMethod;
    setRequestData: import("vuex").MutationMethod;
}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    currentRoute: {
        type: PropType<{
            [key: string]: string;
        }>;
    };
}>>, {}>;
export default _default;
