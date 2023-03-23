import Vue from 'vue';

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

// @ts-ignore
process.client;
// @ts-ignore
!process.client;
const isDev = "production" !== "production";

function applyModifiers(string) {
  if (string === null || string === undefined) {
    return "";
  }
  const modifiers = {
    U: str => str.toUpperCase(),
    L: str => str.toLowerCase(),
    N: function (str) {
      let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ru-RU";
      const number = Number(str);
      return new Intl.NumberFormat(locale).format(number);
    },
    D: (str, format) => {
      const date = new Date(str);
      const YYYY = date.getFullYear();
      const MM = String(date.getMonth() + 1).padStart(2, "0");
      const DD = String(date.getDate()).padStart(2, "0");
      const h = String(date.getHours()).padStart(2, "0");
      const m = String(date.getMinutes()).padStart(2, "0");
      const s = String(date.getSeconds()).padStart(2, "0");
      return format.replace(/YYYY/g, YYYY.toString()).replace(/MM/g, MM).replace(/DD/g, DD).replace(/h/g, h).replace(/m/g, m).replace(/s/g, s);
    }
  };
  let result = string;
  const matches = string.match(/\[(.*?)\]/g) || [];
  for (const modifier of matches) {
    const mods = modifier.slice(1, -1).split("|");
    let modFunc = modifiers[mods[1]];
    if (modFunc) {
      let text = mods[0];
      for (let i = 2; i < mods.length; i++) {
        if (i === 2 && mods[1] === "N") {
          modFunc = function (str) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            return modifiers.N(str, ...args);
          };
        } else {
          modFunc = modifiers[mods[i]];
        }
        if (modFunc) {
          text = modFunc(text);
        }
      }
      result = result.replace(modifier, text);
    }
  }
  return result;
}

const SeoMixin = {
  head() {
    const {
      seo,
      favicon,
      scripts
    } = this;
    const headObj = {
      title: applyModifiers(seo.seo_title),
      meta: [{
        name: "description",
        content: applyModifiers(seo.seo_description)
      }, {
        name: "keywords",
        content: applyModifiers(seo.seo_keywords)
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
    if (!isDev) {
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

const install = function installGlobalBackServices(Vue) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
};

export { __vue_component__$1 as AsyncComponentLoader, applyModifiers, block, install as default, SeoMixin$1 as meta };
