import { CustomModifiersString } from "../utils/applyModifiers";
import { applyModifiers } from "../utils";
import { isNotEmptyArray, isObject } from "../helpers";
interface HeadObject {
  title: string;
  meta: { hid: string; name: string; content: string }[];
  link: { rel?: string; type?: string; href: string }[];
  script: { innerHTML?: string }[];
  style?: { cssText: string; type: "text/css" }[];
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
  design: { [key: string]: string };
  head(): HeadObject;
  customModifiers?: CustomModifiersString;
  meta: { name: string; content: string }[];
}
const SeoMixin = {
  head(): HeadObject {
    const { seo, favicon, scripts, design, customModifiers, meta } = this;
    const metaHead = [
      {
        name: "description",
        hid: "description",
        content: applyModifiers(seo.seo_description, customModifiers || {}),
      },
      {
        name: "keywords",
        hid: "keywords",
        content: applyModifiers(seo.seo_keywords, customModifiers || {}),
      },
    ];
    if (isNotEmptyArray(meta)) {
      meta.forEach((el) => {
        metaHead.push({
          name: el.name,
          hid: el.name,
          content: el.content,
        });
      });
    }
    const headObj: HeadObject = {
      title: applyModifiers(seo.seo_title, customModifiers || {}),
      meta: metaHead,
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: favicon || "favicon.ico",
        },
      ],
      style: [
        {
          cssText: isObject(design)
            ? `
            :root {
              ${Object.entries(design)
                .map(([key, value]) => `--${key}: ${value}`)
                .join("; ")}
            }
          `
            : ``,
          type: "text/css",
        },
      ],
      script: [],
      __dangerouslyDisableSanitizers: ["script"],
    };
    if (scripts) {
      headObj.script.push({ innerHTML: scripts });
    }
    return headObj;
  },
} as SeoMixin;
export default SeoMixin;
