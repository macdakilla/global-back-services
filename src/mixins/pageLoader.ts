import { defineComponent } from "vue";
import { Breadcrumb, Field, Page } from "../types/page";
import { isNotEmptyArray, removeLastSymbol } from "../helpers";
import { Seo } from "./meta";
import constants from "../constants";
import Api from "../api";

interface PageLoaderState {
  components: Field[];
  seo: Seo;
  breadcrumbs: Breadcrumb[];
  hasBreadcrumbs: boolean;
  id: null | number;
}
export default defineComponent({
  async asyncData({ route, redirect }: any) {
    const pageData: PageLoaderState = {
      components: [],
      seo: {
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
      },
      breadcrumbs: [],
      hasBreadcrumbs: false,
      id: null,
    };
    const data: Page | string = await Api.getPage(
      removeLastSymbol(route.path, "/")
    );
    if (typeof data === "object" && isNotEmptyArray(data.blocks)) {
      if (data.redirect) redirect(data.redirect);
      pageData.components = [...data.blocks];
      pageData.seo = data.seo;
      pageData.id = data.model_id;
      pageData.breadcrumbs = data.breadcrumbs;
      pageData.hasBreadcrumbs =
        data.is_breadcrumbs && isNotEmptyArray(data.breadcrumbs);
    } else {
      pageData.components = [constants.notFoundPageConfig];
      pageData.seo = constants.notFoundPageSeo;
      pageData.hasBreadcrumbs = false;
    }
    return pageData;
  },
});
