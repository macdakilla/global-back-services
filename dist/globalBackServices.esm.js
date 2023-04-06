import Vue$1, { defineComponent } from 'vue';

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

class Constants {
  static constants = {
    baseURL: "",
    filterPrimitiveParamNames: [],
    filterParamsDivider: "|",
    filterUpdateDataParams: {
      scrollTop: true,
      offLoading: false
    }
  };
  static setConstants(options) {
    Constants.constants = Object.assign({}, Constants.constants, options);
  }
}
var Constants$1 = Constants;

class Request {
  static async post(url, body) {
    let headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const response = await fetch(`${Constants$1.constants.baseURL}${url}`, {
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
const isObject$1 = value => {
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
  } = Constants$1.constants;
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

var script$3 = defineComponent({
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
    if (isObject$1(this.design)) {
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
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {
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
var __vue_staticRenderFns__$3 = [];

/* style */
const __vue_inject_styles__$3 = undefined;
/* scoped */
const __vue_scope_id__$3 = undefined;
/* module identifier */
const __vue_module_identifier__$3 = undefined;
/* functional template */
const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);
var __vue_component__$7 = __vue_component__$6;

var script$2 = defineComponent({
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
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
var __vue_staticRenderFns__$2 = [];

/* style */
const __vue_inject_styles__$2 = function (inject) {
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
const __vue_scope_id__$2 = "data-v-72af58cb";
/* module identifier */
const __vue_module_identifier__$2 = undefined;
/* functional template */
const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);
var __vue_component__$5 = __vue_component__$4;

var script$1 = defineComponent({
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
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
var __vue_staticRenderFns__$1 = [];

/* style */
const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-668df2e8_0", {
    source: ".g-indent[data-v-668df2e8]:empty{padding-top:0!important;padding-bottom:0!important}.g-indent__top-x-large[data-v-668df2e8]{padding-top:150px}@media screen and (max-width:1024px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:110px}}@media screen and (max-width:768px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:80px}}@media screen and (max-width:480px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:60px}}.g-indent__top-large[data-v-668df2e8]{padding-top:100px}@media screen and (max-width:1024px){.g-indent__top-large[data-v-668df2e8]{padding-top:80px}}@media screen and (max-width:768px){.g-indent__top-large[data-v-668df2e8]{padding-top:60px}}@media screen and (max-width:480px){.g-indent__top-large[data-v-668df2e8]{padding-top:40px}}.g-indent__top-default[data-v-668df2e8]{padding-top:50px}@media screen and (max-width:1024px){.g-indent__top-default[data-v-668df2e8]{padding-top:40px}}@media screen and (max-width:768px){.g-indent__top-default[data-v-668df2e8]{padding-top:30px}}@media screen and (max-width:480px){.g-indent__top-default[data-v-668df2e8]{padding-top:20px}}.g-indent__top-small[data-v-668df2e8]{padding-top:25px}@media screen and (max-width:1024px){.g-indent__top-small[data-v-668df2e8]{padding-top:20px}}@media screen and (max-width:768px){.g-indent__top-small[data-v-668df2e8]{padding-top:15px}}@media screen and (max-width:480px){.g-indent__top-small[data-v-668df2e8]{padding-top:10px}}.g-indent__top-x-small[data-v-668df2e8]{padding-top:10px}@media screen and (max-width:1024px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:8px}}@media screen and (max-width:768px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:5px}}@media screen and (max-width:480px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:2px}}.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:150px}@media screen and (max-width:1024px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:110px}}@media screen and (max-width:768px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:80px}}@media screen and (max-width:480px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:60px}}.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:100px}@media screen and (max-width:1024px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:80px}}@media screen and (max-width:768px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:60px}}@media screen and (max-width:480px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:40px}}.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:50px}@media screen and (max-width:1024px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:40px}}@media screen and (max-width:768px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:30px}}@media screen and (max-width:480px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:20px}}.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:25px}@media screen and (max-width:1024px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:20px}}@media screen and (max-width:768px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:15px}}@media screen and (max-width:480px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:10px}}.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:10px}@media screen and (max-width:1024px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:8px}}@media screen and (max-width:768px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:5px}}@media screen and (max-width:480px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:2px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$1 = "data-v-668df2e8";
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

/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install$1(window.Vue);
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1$1.state); });
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1$1.state); });
  } catch (e) {
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1$1.state); });
      } catch (e) {
      }
      resolve(res);
    }, function (error) {
      try {
        this$1$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1$1.state, error); });
      } catch (e) {
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1$1 = this;
  return this._watcherVM.$watch(function () { return getter(this$1$1.state, this$1$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1$1 = this;

  this._withCommit(function () {
    this$1$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1$1 = this;

  if (typeof path === 'string') { path = [path]; }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("production" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  return { type: type, payload: payload, options: options }
}

function install$1 (_Vue) {
  if (Vue && _Vue === Vue) {
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  return module
}

var ActionTypes;
(function (ActionTypes) {
  ActionTypes["UPDATE_DATA"] = "updateData";
})(ActionTypes || (ActionTypes = {}));

var MutationTypes$1;
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
})(MutationTypes$1 || (MutationTypes$1 = {}));

var script = defineComponent({
  name: "GFilter",
  async fetch() {
    this.setRequestData(syncHash(this.$route.query));
    await this.updateData();
  },
  watch: {
    async $route() {
      this.resetRequestData();
      this.setRequestData(syncHash(this.$route.query));
      await this.updateData();
    }
  },
  methods: {
    ...mapMutations({
      resetRequestData: `filter/${MutationTypes$1.RESET_REQUEST_DATA}`,
      setRequestData: `filter/${MutationTypes$1.SET_REQUEST_DATA}`
    }),
    async updateData() {
      let settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Constants$1.constants.filterUpdateDataParams;
      await this.$store.dispatch(`filter/${ActionTypes.UPDATE_DATA}`, settings);
      if (settings.scrollTop && isClient) {
        this.$nextTick(() => {
          this.$scrollTo("body");
        });
      }
      if (settings.callback) {
        settings.callback();
      }
    }
  }
});

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "g-filter"
  }, [_vm._t("default", null, {
    "update": _vm.updateData
  })], 2);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = undefined;
/* scoped */
const __vue_scope_id__ = "data-v-6f17a817";
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
  GIntegrations: __vue_component__$7,
  GModal: __vue_component__$5,
  GIndent: __vue_component__$3,
  GFilter: __vue_component__$1
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

var ticket = Vue$1.extend({
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
      if (isObject$1(response) && response.status === "success") {
        if (successCallback && isFunction(successCallback)) successCallback();
      } else {
        if (errorCallback && isFunction(errorCallback)) errorCallback();
      }
    }
  }
});

var MutationTypes;
(function (MutationTypes) {
  MutationTypes["OPEN_DIALOG"] = "openModal";
  MutationTypes["CLOSE_MODAL"] = "closeModal";
})(MutationTypes || (MutationTypes = {}));

var dialog = defineComponent({
  methods: {
    modalShow(name) {
      let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.$store.commit(`modal/${MutationTypes.OPEN_DIALOG}`, {
        name,
        params
      });
      const html = document.querySelector("html");
      if (html) {
        html.classList.add("locked");
      }
    },
    modalHide() {
      this.$store.commit(`modal/${MutationTypes.CLOSE_MODAL}`);
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

const mutations$2 = {
  [MutationTypes$1.SET_LOADING](state, val) {
    state.loading = val;
  },
  [MutationTypes$1.SET_REQUEST_DATA](state, data) {
    state.requestData = {
      ...state.requestData,
      ...data
    };
  },
  [MutationTypes$1.RESET_REQUEST_DATA](state) {
    state.requestData = {
      view: state.requestData.view
    };
  },
  [MutationTypes$1.REMOVE_KEY_FROM_REQUEST_DATA](state, key) {
    delete state.requestData[key];
  },
  [MutationTypes$1.UPDATE_FILTER_BY_INDEX](state, _ref) {
    let {
      index,
      item
    } = _ref;
    state.filters.splice(index, 1, item);
  },
  [MutationTypes$1.SET_FILTERS](state, data) {
    state.filters = data;
  },
  [MutationTypes$1.SET_TOP_FILTER](state, data) {
    state.topFilter = data;
  },
  [MutationTypes$1.SET_ITEMS](state, items) {
    state.items = items;
  },
  [MutationTypes$1.SET_SORTING](state, data) {
    state.sorting = data;
  },
  [MutationTypes$1.SET_INFO](state, data) {
    state.info = data;
  },
  [MutationTypes$1.SET_PAGE_URL](_, url) {
    if (isClient) {
      history.pushState("", "data.seo.title", `${location.pathname}?${url || ""}`);
    }
  },
  [MutationTypes$1.SET_PAGE](state, page) {
    state.page = page;
  }
};
var mutations$3 = mutations$2;

const actions = {
  async [ActionTypes.UPDATE_DATA](_ref) {
    let {
      commit,
      getters
    } = _ref;
    let settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!settings.offLoading) {
      commit(MutationTypes$1.SET_LOADING, true);
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
      commit(MutationTypes$1.SET_FILTERS, data.filters);
      commit(MutationTypes$1.SET_TOP_FILTER, data.top_filter);
      commit(MutationTypes$1.SET_ITEMS, data.cars);
      commit(MutationTypes$1.SET_SORTING, data.sorting);
      commit(MutationTypes$1.SET_INFO, data.info);
      commit(MutationTypes$1.SET_PAGE_URL, data.info.url);
      commit(MutationTypes$1.SET_PAGE, getQueryParam(`/url?${data.info.url || ""}`, "page"));
    }
    if (!settings.offLoading) {
      commit(MutationTypes$1.SET_LOADING, false);
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
  [MutationTypes.OPEN_DIALOG](state, modal) {
    state.active = true;
    state.modal = modal;
  },
  [MutationTypes.CLOSE_MODAL](state) {
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
  Constants$1.setConstants(settings);
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
};

export { Api$1 as Api, __vue_component__$1 as GFilter, __vue_component__$3 as GIndent, __vue_component__$7 as GIntegrations, __vue_component__$5 as GModal, Request$1 as Request, applyModifiers$1 as applyModifiers, block, copyToClipboard$1 as copyToClipboard, install as default, dialog, fallbackCopyToClipboard$1 as fallbackCopyToClipboard, formatNumber, getFileSize, getQueryParam, getRGBComponents$1 as getRGBComponents, getRandomNumber, getTags, getType, getUTM, idealTextColor$1 as idealTextColor, isArray, isBoolean, isClient, isDev, isFunction, isNotEmptyArray, isNumber, isObject$1 as isObject, isProd, isServer, isString, isUndefined, SeoMixin$1 as meta, normalizePhoneNumber, saveUTM, size, index as stores, syncHash, ticket };
