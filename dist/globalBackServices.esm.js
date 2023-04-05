import Vue, { defineComponent } from 'vue';

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

let constants = {
  baseURL: "",
  filterPrimitiveParamNames: [],
  filterParamsDivider: "|",
  filterUpdateDataParams: {
    scrollTop: true,
    offLoading: false
  }
};
function setConstants(options) {
  constants = Object.assign({}, constants, options);
}
var constants$1 = constants;

class Request {
  static async post(url, body) {
    let headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const response = await fetch(`${constants$1.baseURL}${url}`, {
      method: "POST",
      headers: {
        ...headers
      },
      body
    });
    if ([204, 201].includes(response.status)) {
      // no content
      return Promise.resolve({
        status: "success",
        code: response.status
      });
    }
    if (response.ok) {
      return await response.json();
    }
    const errorResponse = await response.json();
    return Promise.reject(errorResponse);
  }
}
var Request$1 = Request;

const isClient = typeof window === "object";
// @ts-ignore
const isServer = typeof window === "undefined";
const isDev = "production" !== "production";
const isProd = "production" !== "production";

// Функция getType определяет тип переданного значения
const getType = value => {
  return typeof value;
};
// Функция isString возвращает true, если переданное значение является строкой
const isString = value => {
  return getType(value) === "string";
};
// Функция isNumber возвращает true, если переданное значение является числом
const isNumber = value => {
  return getType(value) === "number" && !isNaN(value) && isFinite(value);
};
// Функция isBoolean возвращает true, если переданное значение является логическим
const isBoolean = value => {
  return getType(value) === "boolean";
};
// Функция isArray возвращает true, если переданное значение является массивом
const isArray = value => {
  return Array.isArray(value);
};
// Функция isNotEmptyArray возвращает true, если переданное значение является непустым массивом
const isNotEmptyArray = value => {
  return isArray(value) && value.length > 0;
};
// Функция isObject возвращает true, если переданное значение является объектом, но не массивом и не null
const isObject = value => {
  return typeof value === "object" && !isArray(value) && value !== null;
};
// Функция isUndefined возвращает true, если переданное значение является undefined
const isUndefined = value => {
  return typeof value === "undefined";
};
// Функция isFunction возвращает true, если переданное значение является функцией
const isFunction = value => {
  return typeof value === "function";
};

const getQueryParam = (url, param) => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.has(param) ? searchParams.get(param) || "" : "";
};
const syncHash = query => {
  const {
    filterPrimitiveParamNames,
    filterParamsDivider
  } = constants$1;
  const params = {};
  for (const elem in query) {
    if (filterPrimitiveParamNames.includes(elem)) {
      params[elem] = isNumber(+query[elem]) ? Number(query[elem]) : String(query[elem]);
    } else {
      params[elem] = [...new Set(query[elem].split(filterParamsDivider).map(item => isNumber(+item) ? Number(item) : String(item).toLowerCase()))];
    }
  }
  return params;
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
      if (customModifiers && isFunction(customModifiers[mod])) updatedPart = customModifiers[mod](updatedPart);
    });
    return updatedPart;
  });
  return updatedStr.join("");
};
var applyModifiers$1 = applyModifiers;

const idealTextColor = function (bgColor) {
  let whiteColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "var(--white-color)";
  let blackColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "var(--black-color)";
  if (!isString(bgColor)) {
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
              key: isString(item.key) ? item.key.toLowerCase() : item.key,
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

const saveUTM = () => {
  if (isClient) {
    const location = window.location.href;
    const utm = {
      utm_source: getQueryParam(location, "utm_source") || undefined,
      utm_medium: getQueryParam(location, "utm_medium") || undefined,
      utm_campaign: getQueryParam(location, "utm_campaign") || undefined,
      utm_content: getQueryParam(location, "utm_content") || undefined,
      utm_term: getQueryParam(location, "utm_term") || undefined
    };
    for (const utmKey in utm) {
      if (utm[utmKey]) {
        sessionStorage.setItem(utmKey, utm[utmKey]);
      }
    }
  }
};
const getUTM = () => {
  if (isClient) {
    return {
      utm_source: sessionStorage.getItem("utm_source") || undefined,
      utm_medium: sessionStorage.getItem("utm_medium") || undefined,
      utm_campaign: sessionStorage.getItem("utm_campaign") || undefined,
      utm_content: sessionStorage.getItem("utm_content") || undefined,
      utm_term: sessionStorage.getItem("utm_term") || undefined
    };
  }
  return {};
};

const normalizePhoneNumber = phoneNumber => {
  // удаляем все символы, кроме цифр
  let digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return phoneNumber;
  // если номер начинается с "8", заменяем на "7"
  if (digits.startsWith("8")) {
    digits = digits.replace(/^8/, "7");
  }
  // если номер начинается с "9" и имеет длину 10 цифр, добавляем "7" в начало
  if (digits.startsWith("9") && digits.length === 10) {
    digits = `7${digits}`;
  }
  // если номер не удалось привести к одному формату, возвращаем исходное значение
  return digits;
};
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getFileSize = size => {
  if (!Number.isFinite(size) || size < 0) {
    throw new Error("Invalid file size");
  }
  const fSExt = ["Байт", "КБ", "МБ", "ГБ"];
  let i = 0;
  while (size > 900 && i < fSExt.length - 1) {
    size /= 1024;
    i++;
  }
  return `${Math.round(size * 100) / 100} ${fSExt[i]}`;
};
const formatNumber = (number, options) => {
  if (isNaN(+number)) return number;
  const {
    precision,
    prefix = "",
    postfix = ""
  } = options || {};
  let formattedNumber = new Intl.NumberFormat("ru-RU", precision ? {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  } : {}).format(+number);
  return `${prefix}${formattedNumber.replace(",", ".")}${postfix}`;
};

var script$2 = defineComponent({
  name: "GIntegrations",
  props: {
    footerScripts: String,
    bodyScripts: String,
    styles: String,
    design: Object
  },
  beforeMount() {
    if (this.styles) {
      const stylesBlock = document.createElement("style");
      stylesBlock.textContent = this.styles;
      document.head.appendChild(stylesBlock);
    }
    saveUTM();
    if (isObject(this.design)) {
      for (const varsKey in this.design) {
        if (!isString(this.design[varsKey])) {
          document.documentElement.style.setProperty(`--${varsKey}`, this.design[varsKey]);
        }
      }
    }
  }
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm.bodyScripts ? _c('div', {
    staticClass: "g-body-scripts",
    domProps: {
      "innerHTML": _vm._s(_vm.bodyScripts)
    }
  }) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.footerScripts ? _c('div', {
    staticClass: "g-footer-scripts",
    domProps: {
      "innerHTML": _vm._s(_vm.footerScripts)
    }
  }) : _vm._e()], 2);
};
var __vue_staticRenderFns__$2 = [];

/* style */
const __vue_inject_styles__$2 = undefined;
/* scoped */
const __vue_scope_id__$2 = undefined;
/* module identifier */
const __vue_module_identifier__$2 = undefined;
/* functional template */
const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);
var __vue_component__$5 = __vue_component__$4;

var script$1 = defineComponent({
  name: "GModal",
  props: {
    transition: {
      type: String,
      default: "fade"
    },
    overlayColor: {
      type: String,
      default: "rgba(52, 52, 52, 0.3)"
    },
    components: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    modalState() {
      return this.$store.state.modal.modal || {};
    },
    currentModalComponent() {
      return this.components[this.modalState.name];
    },
    currentModalParams() {
      return this.modalState.params || {};
    },
    isOpen() {
      return this.$store.state.modal.active;
    }
  }
});

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('transition', {
    attrs: {
      "name": _vm.transition
    }
  }, [_vm.isOpen ? _c('div', {
    staticClass: "g-modal"
  }, [_c('div', {
    staticClass: "g-modal__overlay",
    style: {
      background: _vm.overlayColor
    },
    on: {
      "click": _vm.modalHide
    }
  }), _vm._v(" "), _c(_vm.currentModalComponent, {
    tag: "component",
    staticClass: "g-modal__content",
    attrs: {
      "params": _vm.currentModalParams
    },
    on: {
      "close": _vm.modalHide
    }
  })], 1) : _vm._e()]);
};
var __vue_staticRenderFns__$1 = [];

/* style */
const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-72af58cb_0", {
    source: ".g-modal[data-v-72af58cb]{position:fixed;bottom:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:100}.g-modal__overlay[data-v-72af58cb]{position:absolute;top:0;left:0;width:100%;height:100%}.g-modal__content[data-v-72af58cb]{position:relative;z-index:1}",
    map: undefined,
    media: undefined
  }), inject("data-v-72af58cb_1", {
    source: "html.locked{overflow:hidden}@media only screen and (min-width:1025px){html.locked{padding-right:15px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$1 = "data-v-72af58cb";
/* module identifier */
const __vue_module_identifier__$1 = undefined;
/* functional template */
const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);
var __vue_component__$3 = __vue_component__$2;

var script = defineComponent({
  name: "GIndent",
  props: {
    top: {
      type: String
    },
    bottom: {
      type: String
    },
    tag: {
      type: String,
      default: "div"
    }
  }
});

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _obj;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(_vm.tag, {
    tag: "component",
    staticClass: "g-indent",
    class: (_obj = {}, _obj["g-indent__top-" + _vm.top] = _vm.top, _obj["g-indent__bottom-" + _vm.bottom] = _vm.bottom, _obj)
  }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-668df2e8_0", {
    source: ".g-indent[data-v-668df2e8]:empty{padding-top:0!important;padding-bottom:0!important}.g-indent__top-x-large[data-v-668df2e8]{padding-top:150px}@media screen and (max-width:1024px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:110px}}@media screen and (max-width:768px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:80px}}@media screen and (max-width:480px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:60px}}.g-indent__top-large[data-v-668df2e8]{padding-top:100px}@media screen and (max-width:1024px){.g-indent__top-large[data-v-668df2e8]{padding-top:80px}}@media screen and (max-width:768px){.g-indent__top-large[data-v-668df2e8]{padding-top:60px}}@media screen and (max-width:480px){.g-indent__top-large[data-v-668df2e8]{padding-top:40px}}.g-indent__top-default[data-v-668df2e8]{padding-top:50px}@media screen and (max-width:1024px){.g-indent__top-default[data-v-668df2e8]{padding-top:40px}}@media screen and (max-width:768px){.g-indent__top-default[data-v-668df2e8]{padding-top:30px}}@media screen and (max-width:480px){.g-indent__top-default[data-v-668df2e8]{padding-top:20px}}.g-indent__top-small[data-v-668df2e8]{padding-top:25px}@media screen and (max-width:1024px){.g-indent__top-small[data-v-668df2e8]{padding-top:20px}}@media screen and (max-width:768px){.g-indent__top-small[data-v-668df2e8]{padding-top:15px}}@media screen and (max-width:480px){.g-indent__top-small[data-v-668df2e8]{padding-top:10px}}.g-indent__top-x-small[data-v-668df2e8]{padding-top:10px}@media screen and (max-width:1024px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:8px}}@media screen and (max-width:768px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:5px}}@media screen and (max-width:480px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:2px}}.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:150px}@media screen and (max-width:1024px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:110px}}@media screen and (max-width:768px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:80px}}@media screen and (max-width:480px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:60px}}.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:100px}@media screen and (max-width:1024px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:80px}}@media screen and (max-width:768px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:60px}}@media screen and (max-width:480px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:40px}}.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:50px}@media screen and (max-width:1024px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:40px}}@media screen and (max-width:768px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:30px}}@media screen and (max-width:480px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:20px}}.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:25px}@media screen and (max-width:1024px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:20px}}@media screen and (max-width:768px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:15px}}@media screen and (max-width:480px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:10px}}.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:10px}@media screen and (max-width:1024px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:8px}}@media screen and (max-width:768px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:5px}}@media screen and (max-width:480px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:2px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__ = "data-v-668df2e8";
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);
var __vue_component__$1 = __vue_component__;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GIntegrations: __vue_component__$5,
  GModal: __vue_component__$3,
  GIndent: __vue_component__$1
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
        hid: "description",
        content: applyModifiers$1(seo.seo_description, this.customModifiers || {})
      }, {
        name: "keywords",
        hid: "keywords",
        content: applyModifiers$1(seo.seo_keywords, this.customModifiers || {})
      }, {
        name: "robots",
        hid: "robots",
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

class Api extends Request$1 {
  static async getFilterData(request) {
    try {
      return await this.post("/filter/", JSON.stringify(request), {
        "Content-Type": "application/json"
      });
    } catch (error) {
      return Promise.resolve("Unknown error occurred");
    }
  }
  static async sendTicket(request) {
    try {
      return await this.post("/ticket/", request);
    } catch (error) {
      return Promise.resolve("Unknown error occurred");
    }
  }
}
var Api$1 = Api;

var ticket = Vue.extend({
  methods: {
    async sendTicket(ticketData, successCallback, errorCallback) {
      const form = {
        page: window.location.href,
        ...ticketData,
        ...getUTM()
      };
      const formData = new FormData();
      // преобразовываем объект в FormData
      Object.keys(form).forEach(key => {
        if (isUndefined(form[key])) return;
        formData.append(key, form[key]);
      });
      // отправляем заявку на сервер, используя метод sendTicket из класса Api
      const response = await Api$1.sendTicket(formData);
      if (isObject(response) && response.status === "success") {
        if (successCallback && isFunction(successCallback)) successCallback();
      } else {
        if (errorCallback && isFunction(errorCallback)) errorCallback();
      }
    }
  }
});

var MutationTypes$1;
(function (MutationTypes) {
  MutationTypes["OPEN_DIALOG"] = "openModal";
  MutationTypes["CLOSE_MODAL"] = "closeModal";
})(MutationTypes$1 || (MutationTypes$1 = {}));

var dialog = defineComponent({
  methods: {
    modalShow(name) {
      let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.$store.commit(`modal/${MutationTypes$1.OPEN_DIALOG}`, {
        name,
        params
      });
      const html = document.querySelector("html");
      if (html) {
        html.classList.add("locked");
      }
    },
    modalHide() {
      this.$store.commit(`modal/${MutationTypes$1.CLOSE_MODAL}`);
      const html = document.querySelector("html");
      if (html) {
        html.classList.remove("locked");
      }
    }
  }
});

const state$2 = {
  loading: false,
  requestData: {},
  filters: [],
  topFilter: null,
  sorting: [],
  info: null,
  items: null,
  page: 1
};
var state$3 = state$2;

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

const mutations$2 = {
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
var mutations$3 = mutations$2;

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

var index$2 = {
  namespaced: true,
  state: state$3,
  getters: getters$1,
  mutations: mutations$3,
  actions: actions$1
};

const state = {
  active: false,
  modal: null
};
var state$1 = state;

const mutations = {
  [MutationTypes$1.OPEN_DIALOG](state, modal) {
    state.active = true;
    state.modal = modal;
  },
  [MutationTypes$1.CLOSE_MODAL](state) {
    state.active = false;
    state.modal = null;
  }
};
var mutations$1 = mutations;

var index$1 = {
  namespaced: true,
  state: state$1,
  mutations: mutations$1
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  filter: index$2,
  modal: index$1
});

const install = function installGlobalBackServices(Vue, settings) {
  setConstants(settings);
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
};

export { Api$1 as Api, __vue_component__$1 as GIndent, __vue_component__$5 as GIntegrations, __vue_component__$3 as GModal, Request$1 as Request, applyModifiers$1 as applyModifiers, block, copyToClipboard$1 as copyToClipboard, install as default, dialog, fallbackCopyToClipboard$1 as fallbackCopyToClipboard, formatNumber, getFileSize, getQueryParam, getRGBComponents$1 as getRGBComponents, getRandomNumber, getTags, getType, getUTM, idealTextColor$1 as idealTextColor, isArray, isBoolean, isClient, isDev, isFunction, isNotEmptyArray, isNumber, isObject, isProd, isServer, isString, isUndefined, SeoMixin$1 as meta, normalizePhoneNumber, saveUTM, size, index as stores, syncHash, ticket };
