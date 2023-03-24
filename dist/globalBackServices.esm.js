import Vue, { defineComponent } from 'vue';

const favoriteStore = {
  state: () => ({
    items: []
  }),
  mutations: {
    addItem(state, item) {
      state.items.push(item);
    }
  }
};
var favoriteStore$1 = favoriteStore;

var stores = /*#__PURE__*/Object.freeze({
  __proto__: null,
  favoriteStore: favoriteStore$1
});

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

const install = function installGlobalBackServices(Vue, settings) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
  if (settings && settings.rootStore) {
    Object.entries(stores).forEach(_ref2 => {
      let [storeName, store] = _ref2;
      if (!settings.rootStore.hasModule(storeName)) {
        settings.rootStore.registerModule("test", store);
      }
    });
  }
};

export { __vue_component__$1 as AsyncComponentLoader, applyModifiers$1 as applyModifiers, block, copyToClipboard$1 as copyToClipboard, install as default, fallbackCopyToClipboard$1 as fallbackCopyToClipboard, getRGBComponents$1 as getRGBComponents, idealTextColor$1 as idealTextColor, isClient, isDev, isProd, isServer, SeoMixin$1 as meta, size };
