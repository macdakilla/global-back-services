import { Seo } from "./meta";
import { Breadcrumb, Field } from "../types/page";
interface PageLoaderState {
    components: Field[];
    seo: Seo;
    breadcrumbs: Breadcrumb[];
    hasBreadcrumbs: boolean;
    id: null | number;
}
declare const _default: import("vue").DefineComponent<{}, unknown, PageLoaderState, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _default;
