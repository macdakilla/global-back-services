import { CustomModifiersString } from "../utils/applyModifiers";
interface HeadObject {
    title: string;
    meta: {
        hid: string;
        name: string;
        content: string;
    }[];
    link: {
        rel?: string;
        type?: string;
        href: string;
    }[];
    script: {
        innerHTML?: string;
    }[];
    __dangerouslyDisableSanitizers: string[];
}
export interface Seo {
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    isNoindex?: boolean;
}
interface SeoMixin {
    seo: Seo;
    favicon: string;
    scripts: string;
    head(): HeadObject;
    customModifiers?: CustomModifiersString;
}
declare const SeoMixin: SeoMixin;
export default SeoMixin;
