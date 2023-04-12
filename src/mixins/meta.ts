import { isDev } from "../helpers";
import { CustomModifiersString } from "../utils/applyModifiers";
import { applyModifiers } from "../utils";
interface HeadObject {
  title: string;
  meta: { hid: string; name: string; content: string }[];
  link: { rel?: string; type?: string; href: string }[];
  script: { innerHTML?: string }[];
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
const SeoMixin = {
  head(): HeadObject {
    const { seo, favicon, scripts } = this;
    const headObj: HeadObject = {
      title: applyModifiers(seo.seo_title, this.customModifiers || {}),
      meta: [
        {
          name: "description",
          hid: "description",
          content: applyModifiers(
            seo.seo_description,
            this.customModifiers || {}
          ),
        },
        {
          name: "keywords",
          hid: "keywords",
          content: applyModifiers(seo.seo_keywords, this.customModifiers || {}),
        },
        {
          name: "robots",
          hid: "robots",
          content: seo.isNoindex ? "noindex,nofollow" : "",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: favicon || "favicon.ico",
        },
      ],
      script: [],
      __dangerouslyDisableSanitizers: ["script"],
    };
    if (!isDev) {
      if (scripts) {
        headObj.script.push({ innerHTML: scripts });
      }
    }
    return headObj;
  },
} as SeoMixin;
export default SeoMixin;
