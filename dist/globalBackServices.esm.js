import Vue, { defineComponent } from 'vue';

var script = Vue.extend({
  name: "AsyncComponentLoader"
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm._v("213")]);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = undefined;
/* scoped */
const __vue_scope_id__ = undefined;
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);
var __vue_component__$1 = __vue_component__;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AsyncComponentLoader: __vue_component__$1
});

class Api {
  static async getFilterData(request) {
    try {
      const response = await fetch(`${Api.baseURL}/filter/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });
      if (response.ok) {
        return await response.json();
      }
      const errorResponse = await response.json();
      return Promise.resolve(errorResponse);
    } catch (error) {
      const errorResponse = "Unknown error occurred";
      return Promise.resolve(errorResponse);
    }
  }
}
var Api$1 = Api;

var block = {
  props: {
    fields: {
      type: Object
    },
    id: {
      type: Number,
      default: null
    },
    breadcrumbs: {
      type: Array
    }
  }
};

const getRGBComponents = color => {
  const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const match = color.match(regex);
  if (!match) {
    return null;
  }
  const [, r, g, b] = match;
  return {
    R: parseInt(r, 16),
    G: parseInt(g, 16),
    B: parseInt(b, 16)
  };
};
var getRGBComponents$1 = getRGBComponents;

const fallbackCopyToClipboard = text => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("Oops, unable to copy");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
  document.body.removeChild(textArea);
};
var fallbackCopyToClipboard$1 = fallbackCopyToClipboard;

// @ts-ignore
const isClient = typeof window === "object";
// @ts-ignore
const isServer = typeof window === undefined;
const isDev = "production" !== "production";
const isProd = "production" !== "production";

const getQueryParam = (url, param) => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.has(param) ? searchParams.get(param) || "" : "";
};

const applyModifiers = (str, customModifiers) => {
  if (!str) {
    return "";
  }
  const formattedStr = str.split(/[\]\\[]/g);
  const updatedStr = formattedStr.map(el => {
    const splitPart = el.split("|");
    let updatedPart = splitPart.shift();
    splitPart.forEach(mod => {
      switch (mod.toLowerCase()) {
        case "n":
          updatedPart = new Intl.NumberFormat("ru-RU").format(+updatedPart).replace(",", ".");
          break;
        case "l":
          updatedPart = updatedPart.toLowerCase();
          break;
        case "u":
          updatedPart = updatedPart.toUpperCase();
          break;
      }
      // CUSTOM MODIFIERS
      if (customModifiers && typeof customModifiers[mod] === "function") updatedPart = customModifiers[mod](updatedPart);
    });
    return updatedPart;
  });
  return updatedStr.join("");
};
var applyModifiers$1 = applyModifiers;

const idealTextColor = function (bgColor) {
  let whiteColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "var(--white-color)";
  let blackColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "var(--black-color)";
  if (typeof bgColor !== "string") {
    return blackColor;
  }
  if (bgColor.length === 4) {
    bgColor = "#" + bgColor[1] + bgColor[1] + bgColor[2] + bgColor[2] + bgColor[3] + bgColor;
  }
  const components = getRGBComponents$1(bgColor);
  if (!components) {
    return blackColor;
  }
  const nThreshold = 105;
  const bgDelta = components.R * 0.299 + components.G * 0.587 + components.B * 0.114;
  return 255 - bgDelta < nThreshold ? "var(--black-color)" : whiteColor;
};
var idealTextColor$1 = idealTextColor;

const copyToClipboard = async text => {
  try {
    if (!navigator.clipboard) {
      fallbackCopyToClipboard$1(text);
      return;
    }
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error copying to clipboard", error);
    fallbackCopyToClipboard$1(text);
  }
};
var copyToClipboard$1 = copyToClipboard;

function getFormat(val) {
  let format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "number";
  if (isNaN(+val)) return "";
  if (format === "number") {
    return new Intl.NumberFormat("ru-RU").format(+val);
  }
  return val.toString();
}
function getTags(filters) {
  const tags = [];
  filters.forEach(filter => {
    if (["checkbox", "color", "select"].includes(filter.type) && !filter.tags_ignore && !filter.disabled && Array.isArray(filter.values)) {
      filter.values.forEach(group => {
        if (!Array.isArray(group.values)) return;
        group.values.forEach(item => {
          if (item.checked) {
            tags.push({
              type: filter.type,
              key: typeof item.key === "string" ? item.key.toLowerCase() : item.key,
              name: item.name,
              title: item.name,
              param: filter.name,
              group_name: group.group_name
            });
          }
        });
      });
    }
    if (filter.type === "range" && !filter.tags_ignore && !filter.disabled && !Array.isArray(filter.values)) {
      const {
        values
      } = filter;
      const {
        format,
        postfix
      } = values;
      if (values.min !== values.range[0]) {
        const name = `от ${getFormat(values.range[0], format)} ${postfix}`;
        tags.push({
          type: filter.type,
          param: filter.name,
          changeMin: true,
          min: values.min,
          max: values.max,
          range: values.range,
          name
        });
      }
      if (values.max !== values.range[1]) {
        const name = `до ${getFormat(values.range[1], format)} ${postfix}`;
        tags.push({
          type: filter.type,
          param: filter.name,
          changeMin: false,
          min: values.min,
          max: values.max,
          range: values.range,
          id: filter.id,
          name
        });
      }
    }
  });
  return tags;
}

const SeoMixin = {
  head() {
    const {
      seo,
      favicon,
      scripts
    } = this;
    const headObj = {
      title: applyModifiers$1(seo.seo_title, this.customModifiers || {}),
      meta: [{
        name: "description",
        content: applyModifiers$1(seo.seo_description, this.customModifiers || {})
      }, {
        name: "keywords",
        content: applyModifiers$1(seo.seo_keywords, this.customModifiers || {})
      }, {
        name: "robots",
        content: seo.isNoindex ? "noindex,nofollow" : ""
      }],
      link: [{
        rel: "icon",
        type: "image/x-icon",
        href: favicon || "favicon.ico"
      }],
      script: [],
      __dangerouslyDisableSanitizers: ["script"]
    };
    {
      if (scripts) {
        headObj.script.push({
          innerHTML: scripts
        });
      }
    }
    return headObj;
  }
};
var SeoMixin$1 = SeoMixin;

var size = defineComponent({
  data() {
    return {
      isTablet: false,
      isNotebook: false,
      isDesktop: false
    };
  },
  mounted() {
    this.setWindowSizes();
    window.addEventListener("resize", this.setWindowSizes);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setWindowSizes);
  },
  methods: {
    setWindowSizes() {
      if (isClient) {
        const isTablet = window.matchMedia("(max-width: 768px)").matches;
        const isNotebook = window.matchMedia("(max-width: 1024px)").matches;
        this.isTablet = isTablet;
        this.isNotebook = !isTablet && isNotebook;
        this.isDesktop = !isTablet && !isNotebook;
      }
    }
  }
});

const state = {
  loading: false,
  requestData: {},
  filters: [],
  topFilter: null,
  sorting: [],
  info: null,
  items: null,
  page: 1
};
var state$1 = state;

const getters = {
  requestData: state => state.requestData,
  countItems: state => state.info ? state.info.cars_count : 0,
  sorting: state => state.sorting,
  items: state => state.items ? state.items.data : [],
  loading: state => state.loading,
  filters: state => state.filters,
  topFilter: state => state.topFilter,
  info: state => state.info,
  page: state => state.page,
  openedFilterNames: state => state.filters.filter(el => el.opened).map(el => el.name),
  tags(state) {
    return getTags(state.filters);
  }
};
var getters$1 = getters;

var MutationTypes;
(function (MutationTypes) {
  MutationTypes["SET_LOADING"] = "SET_LOADING";
  MutationTypes["SET_REQUEST_DATA"] = "SET_REQUEST_DATA";
  MutationTypes["RESET_REQUEST_DATA"] = "RESET_REQUEST_DATA";
  MutationTypes["REMOVE_KEY_FROM_REQUEST_DATA"] = "REMOVE_KEY_FROM_REQUEST_DATA";
  MutationTypes["UPDATE_FILTER_BY_INDEX"] = "UPDATE_FILTER_BY_INDEX";
  MutationTypes["SET_FILTERS"] = "SET_FILTERS";
  MutationTypes["SET_TOP_FILTER"] = "SET_TOP_FILTER";
  MutationTypes["SET_ITEMS"] = "SET_ITEMS";
  MutationTypes["SET_SORTING"] = "SET_SORTING";
  MutationTypes["SET_INFO"] = "SET_INFO";
  MutationTypes["SET_PAGE_URL"] = "SET_PAGE_URL";
  MutationTypes["SET_PAGE"] = "SET_PAGE";
})(MutationTypes || (MutationTypes = {}));

const mutations = {
  [MutationTypes.SET_LOADING](state, val) {
    state.loading = val;
  },
  [MutationTypes.SET_REQUEST_DATA](state, data) {
    state.requestData = {
      ...state.requestData,
      ...data
    };
  },
  [MutationTypes.RESET_REQUEST_DATA](state) {
    state.requestData = {
      view: state.requestData.view
    };
  },
  [MutationTypes.REMOVE_KEY_FROM_REQUEST_DATA](state, key) {
    delete state.requestData[key];
  },
  [MutationTypes.UPDATE_FILTER_BY_INDEX](state, _ref) {
    let {
      index,
      item
    } = _ref;
    state.filters.splice(index, 1, item);
  },
  [MutationTypes.SET_FILTERS](state, data) {
    state.filters = data;
  },
  [MutationTypes.SET_TOP_FILTER](state, data) {
    state.topFilter = data;
  },
  [MutationTypes.SET_ITEMS](state, items) {
    state.items = items;
  },
  [MutationTypes.SET_SORTING](state, data) {
    state.sorting = data;
  },
  [MutationTypes.SET_INFO](state, data) {
    state.info = data;
  },
  [MutationTypes.SET_PAGE_URL](_, url) {
    if (isClient) {
      history.pushState("", "data.seo.title", `${location.pathname}?${url || ""}`);
    }
  },
  [MutationTypes.SET_PAGE](state, page) {
    state.page = page;
  }
};
var mutations$1 = mutations;

var ActionTypes;
(function (ActionTypes) {
  ActionTypes["UPDATE_DATA"] = "updateData";
})(ActionTypes || (ActionTypes = {}));

const actions = {
  async [ActionTypes.UPDATE_DATA](_ref) {
    let {
      commit,
      getters
    } = _ref;
    let settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!settings.offLoading) {
      commit(MutationTypes.SET_LOADING, true);
    }
    const openedFilters = getters.openedFilterNames;
    const requestData = {
      type: "items",
      view: "model",
      ...getters.requestData
    };
    if (openedFilters.length) {
      requestData.opened = openedFilters;
    }
    const data = await Api$1.getFilterData(requestData);
    if (typeof data === "object") {
      commit(MutationTypes.SET_FILTERS, data.filters);
      commit(MutationTypes.SET_TOP_FILTER, data.top_filter);
      commit(MutationTypes.SET_ITEMS, data.cars);
      commit(MutationTypes.SET_SORTING, data.sorting);
      commit(MutationTypes.SET_INFO, data.info);
      commit(MutationTypes.SET_PAGE_URL, data.info.url);
      commit(MutationTypes.SET_PAGE, getQueryParam(`/url?${data.info.url || ""}`, "page"));
    }
    if (!settings.offLoading) {
      commit(MutationTypes.SET_LOADING, false);
    }
  }
};
var actions$1 = actions;

var index$1 = {
  namespaced: true,
  state: state$1,
  getters: getters$1,
  mutations: mutations$1,
  actions: actions$1
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  filter: index$1
});

const install = function installGlobalBackServices(Vue, settings) {
  if (settings.baseURL) Api$1.baseURL = settings.baseURL;
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
};

export { Api$1 as Api, __vue_component__$1 as AsyncComponentLoader, applyModifiers$1 as applyModifiers, block, copyToClipboard$1 as copyToClipboard, install as default, fallbackCopyToClipboard$1 as fallbackCopyToClipboard, getQueryParam, getRGBComponents$1 as getRGBComponents, getTags, idealTextColor$1 as idealTextColor, isClient, isDev, isProd, isServer, SeoMixin$1 as meta, size, index as stores };
