import { defineComponent } from "vue";
import { isNotEmptyArray, removeLastSymbol } from "../helpers";
import { Seo } from "./meta";
import constants from "../constants";
import { Breadcrumb, Field, Page } from "../types/page";
import Api from "../api";

interface PageLoaderState {
  components: Field[];
  seo: Seo;
  breadcrumbs: Breadcrumb[];
  hasBreadcrumbs: boolean;
  id: null | number;
}
export default defineComponent({
  data(): PageLoaderState {
    return {
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
  },
  async asyncData({ route, error }: any) {
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
      return error({ statusCode: 404, message: "Page not found" });
    }

    return pageData;
  },
});
