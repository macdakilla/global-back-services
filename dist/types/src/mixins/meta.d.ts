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
interface ThisObject {
    seo: {
        seo_title: string;
        seo_description: string;
        seo_keywords: string;
        isNoindex?: boolean;
    };
    favicon: string;
    scripts: string;
    head(): HeadObject;
    customModifiers?: CustomModifiersString;
}
declare const SeoMixin: ThisObject;
export default SeoMixin;
