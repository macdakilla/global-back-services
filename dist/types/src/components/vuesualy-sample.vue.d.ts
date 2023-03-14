import Vue from 'vue';
interface SampleData {
    counter: number;
    initCounter: number;
    message: {
        action: string | null;
        amount: number | null;
    };
}
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, SampleData, {
    increment(arg: Event | number): void;
    decrement(arg: Event | number): void;
    reset(): void;
}, {
    changedBy: string;
}, Record<never, any>, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default _default;
