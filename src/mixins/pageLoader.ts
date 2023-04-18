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
  async fetch() {
    await this.getPageConfig();
  },
  watch: {
    async "$route.path"() {
      await this.getPageConfig();
    },
  },
  methods: {
    async getPageConfig() {
      this.components = [];
      const data: Page | string = await Api.getPage(
        removeLastSymbol(this.$route.path, "/")
      );
      console.log(data);
      if (typeof data === "object" && isNotEmptyArray(data.blocks)) {
        this.components = [...data.blocks];
        this.seo = data.seo;
        this.id = data.model_id;
        this.breadcrumbs = data.breadcrumbs;
        this.hasBreadcrumbs =
          data.is_breadcrumbs && isNotEmptyArray(data.breadcrumbs);
      } else {
        this.components = [constants.notFoundPageConfig];
        this.seo = constants.notFoundPageSeo;
        this.hasBreadcrumbs = false;
      }
    },
  },
});
