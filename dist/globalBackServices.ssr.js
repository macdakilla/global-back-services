'use strict';var Vue$1=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vue__default=/*#__PURE__*/_interopDefaultLegacy(Vue$1);function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}var getRGBComponents = function getRGBComponents(color) {
  var regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  var match = color.match(regex);
  if (!match) {
    return null;
  }
  var _match = _slicedToArray(match, 4),
    r = _match[1],
    g = _match[2],
    b = _match[3];
  return {
    R: parseInt(r, 16),
    G: parseInt(g, 16),
    B: parseInt(b, 16)
  };
};
var getRGBComponents$1 = getRGBComponents;var fallbackCopyToClipboard = function fallbackCopyToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    var successful = document.execCommand("copy");
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
var fallbackCopyToClipboard$1 = fallbackCopyToClipboard;var constants = {
  baseURL: "",
  filterPrimitiveParamNames: [],
  filterParamsDivider: "|",
  filterUpdateDataParams: {
    scrollTop: true,
    offLoading: false
  },
  countItemsOnPage: 12,
  dictionary: {},
  notFoundPageConfig: {
    name: "NotFoundPage",
    component_path: "",
    block_fields: {
      indent: {
        top: "",
        bottom: ""
      }
    }
  },
  notFoundPageSeo: {
    seo_title: "Страница не найдена",
    seo_description: "",
    seo_keywords: ""
  }
};
function setConstants(options) {
  Object.assign(constants, options);
}var Request = /*#__PURE__*/function () {
  function Request() {
    _classCallCheck(this, Request);
  }
  _createClass(Request, null, [{
    key: "post",
    value: function () {
      var _post = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, body) {
        var headers,
          response,
          errorResponse,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              headers = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              _context.next = 3;
              return fetch("".concat(constants.baseURL).concat(url), {
                method: "POST",
                headers: _objectSpread2({}, headers),
                body: body
              });
            case 3:
              response = _context.sent;
              if (![204, 201].includes(response.status)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", Promise.resolve({
                status: "success",
                code: response.status
              }));
            case 6:
              if (!response.ok) {
                _context.next = 10;
                break;
              }
              _context.next = 9;
              return response.json();
            case 9:
              return _context.abrupt("return", _context.sent);
            case 10:
              _context.next = 12;
              return response.json();
            case 12:
              errorResponse = _context.sent;
              return _context.abrupt("return", Promise.reject(errorResponse));
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function post(_x, _x2) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }]);
  return Request;
}();
var Request$1 = Request;var isClient = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";
// @ts-ignore
var isServer = typeof window === "undefined";
var isDev = "production" !== "production";
var isProd = "production" !== "production";// Функция getType определяет тип переданного значения
var getType = function getType(value) {
  return _typeof(value);
};

// Функция isString возвращает true, если переданное значение является строкой
var isString = function isString(value) {
  return getType(value) === "string";
};

// Функция isNumber возвращает true, если переданное значение является числом
var isNumber = function isNumber(value) {
  return getType(value) === "number" && !isNaN(value) && isFinite(value);
};

// Функция isBoolean возвращает true, если переданное значение является логическим
var isBoolean = function isBoolean(value) {
  return getType(value) === "boolean";
};

// Функция isArray возвращает true, если переданное значение является массивом
var isArray = function isArray(value) {
  return Array.isArray(value);
};

// Функция isNotEmptyArray возвращает true, если переданное значение является непустым массивом
var isNotEmptyArray = function isNotEmptyArray(value) {
  return isArray(value) && value.length > 0;
};

// Функция isObject возвращает true, если переданное значение является объектом, но не массивом и не null
var isObject$1 = function isObject(value) {
  return _typeof(value) === "object" && !isArray(value) && value !== null;
};

// Функция isUndefined возвращает true, если переданное значение является undefined
var isUndefined = function isUndefined(value) {
  return typeof value === "undefined";
};

// Функция isFunction возвращает true, если переданное значение является функцией
var isFunction = function isFunction(value) {
  return typeof value === "function";
};var getQueryParam = function getQueryParam(url, param) {
  var searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.has(param) ? searchParams.get(param) || "" : "";
};
var syncHash = function syncHash(query) {
  var filterPrimitiveParamNames = constants.filterPrimitiveParamNames,
    filterParamsDivider = constants.filterParamsDivider;
  var params = {};
  for (var elem in query) {
    if (filterPrimitiveParamNames.includes(elem)) {
      params[elem] = isNumber(+query[elem]) ? Number(query[elem]) : String(query[elem]);
    } else {
      params[elem] = _toConsumableArray(new Set(query[elem].split(filterParamsDivider).map(function (item) {
        return isNumber(+item) ? Number(item) : String(item).toLowerCase();
      })));
    }
  }
  return params;
};
var removeLastSymbol = function removeLastSymbol(string, symbol) {
  if (string[string.length - 1] === symbol && string.length > 1) {
    return string.slice(0, -1);
  }
  return string;
};var applyModifiers = function applyModifiers(str, customModifiers) {
  if (!str) {
    return "";
  }
  var formattedStr = str.split(/[\]\\[]/g);
  var updatedStr = formattedStr.map(function (el) {
    var splitPart = el.split("|");
    var updatedPart = splitPart.shift();
    splitPart.forEach(function (mod) {
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
var applyModifiers$1 = applyModifiers;var idealTextColor = function idealTextColor(bgColor) {
  var whiteColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "var(--white-color)";
  var blackColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "var(--black-color)";
  if (!isString(bgColor)) {
    return blackColor;
  }
  if (bgColor.length === 4) {
    bgColor = "#" + bgColor[1] + bgColor[1] + bgColor[2] + bgColor[2] + bgColor[3] + bgColor;
  }
  var components = getRGBComponents$1(bgColor);
  if (!components) {
    return blackColor;
  }
  var nThreshold = 105;
  var bgDelta = components.R * 0.299 + components.G * 0.587 + components.B * 0.114;
  return 255 - bgDelta < nThreshold ? "var(--black-color)" : whiteColor;
};
var idealTextColor$1 = idealTextColor;var copyToClipboard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(text) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (navigator.clipboard) {
            _context.next = 4;
            break;
          }
          fallbackCopyToClipboard$1(text);
          return _context.abrupt("return");
        case 4:
          _context.next = 6;
          return navigator.clipboard.writeText(text);
        case 6:
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("Error copying to clipboard", _context.t0);
          fallbackCopyToClipboard$1(text);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function copyToClipboard(_x) {
    return _ref.apply(this, arguments);
  };
}();
var copyToClipboard$1 = copyToClipboard;var FilterType;
(function (FilterType) {
  FilterType["CHECKBOX"] = "checkbox";
  FilterType["COLOR"] = "color";
  FilterType["SELECT"] = "select";
  FilterType["RANGE"] = "range";
})(FilterType || (FilterType = {}));function createDefaultTag(filter, group, item) {
  if (!item.checked) return undefined;
  return {
    type: filter.type,
    key: isString(item.key) ? item.key.toLowerCase() : item.key,
    name: item.name,
    title: item.name,
    param: filter.name,
    group_name: group.group_name
  };
}
function createRangeTags(filter) {
  if (Array.isArray(filter.values)) return undefined;
  var tags = [];
  var _filter$values = filter.values,
    format = _filter$values.format,
    postfix = _filter$values.postfix,
    min = _filter$values.min,
    max = _filter$values.max,
    range = _filter$values.range,
    type = filter.type,
    param = filter.name;
  if (min !== range[0]) {
    var name = "\u043E\u0442 ".concat(getFormat(range[0], format), " ").concat(postfix);
    tags.push({
      changeMin: true,
      type: type,
      param: param,
      min: min,
      max: max,
      range: range,
      name: name
    });
  }
  if (max !== range[1]) {
    var _name = "\u0434\u043E ".concat(getFormat(range[1], format), " ").concat(postfix);
    tags.push({
      changeMin: false,
      type: type,
      param: param,
      min: min,
      max: max,
      range: range,
      name: _name
    });
  }
  return tags;
}
function getTags(filters) {
  var tags = [];
  filters.forEach(function (filter) {
    if (filter.tags_ignore || filter.disabled) return;
    if ([FilterType.CHECKBOX, FilterType.COLOR, FilterType.SELECT].includes(filter.type) && Array.isArray(filter.values)) {
      filter.values.forEach(function (group) {
        if (!Array.isArray(group.values)) return;
        group.values.forEach(function (item) {
          var tag = createDefaultTag(filter, group, item);
          if (tag) tags.push(tag);
        });
      });
    }
    if (filter.type === FilterType.RANGE) {
      var rangeTags = createRangeTags(filter);
      if (rangeTags && rangeTags.length) tags.push.apply(tags, _toConsumableArray(rangeTags));
    }
  });
  return tags;
}
function createDataForRemoveTag(tag, requestData) {
  if (!isNotEmptyArray(requestData[tag.param])) return requestData[tag.param];
  // @ts-ignore
  var newParamData = _toConsumableArray(requestData[tag.param]);
  newParamData.splice(newParamData.indexOf(isNumber(tag.key) ? +tag.key : tag.key), 1);
  return newParamData;
}
function createDataForRemoveRangeTag(tag, requestData) {
  return tag.changeMin ?
  // @ts-ignore
  [tag.min, requestData[tag.param][1]] :
  // @ts-ignore
  [requestData[tag.param][0], tag.max];
}
function removeTag(tag, requestData) {
  if ([FilterType.CHECKBOX, FilterType.COLOR, FilterType.SELECT].includes(tag.type)) {
    return createDataForRemoveTag(tag, requestData);
  } else if (tag.type === FilterType.RANGE) {
    return createDataForRemoveRangeTag(tag, requestData);
  }
  return requestData[tag.param];
}var saveUTM = function saveUTM() {
  if (isClient) {
    var location = window.location.href;
    var utm = {
      utm_source: getQueryParam(location, "utm_source") || undefined,
      utm_medium: getQueryParam(location, "utm_medium") || undefined,
      utm_campaign: getQueryParam(location, "utm_campaign") || undefined,
      utm_content: getQueryParam(location, "utm_content") || undefined,
      utm_term: getQueryParam(location, "utm_term") || undefined
    };
    for (var utmKey in utm) {
      if (utm[utmKey]) {
        sessionStorage.setItem(utmKey, utm[utmKey]);
      }
    }
  }
};
var getUTM = function getUTM() {
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
};var normalizePhoneNumber = function normalizePhoneNumber(phoneNumber) {
  // удаляем все символы, кроме цифр
  var digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return phoneNumber;
  // если номер начинается с "8", заменяем на "7"
  if (digits.startsWith("8")) {
    digits = digits.replace(/^8/, "7");
  }
  // если номер начинается с "9" и имеет длину 10 цифр, добавляем "7" в начало
  if (digits.startsWith("9") && digits.length === 10) {
    digits = "7".concat(digits);
  }
  // если номер не удалось привести к одному формату, возвращаем исходное значение
  return digits;
};
var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getFileSize = function getFileSize(size) {
  if (!Number.isFinite(size) || size < 0) {
    throw new Error("Invalid file size");
  }
  var fSExt = ["Байт", "КБ", "МБ", "ГБ"];
  var i = 0;
  while (size > 900 && i < fSExt.length - 1) {
    size /= 1024;
    i++;
  }
  return "".concat(Math.round(size * 100) / 100, " ").concat(fSExt[i]);
};
var formatNumber = function formatNumber(number, options) {
  if (isNaN(+number)) return number;
  var _ref = options || {},
    precision = _ref.precision,
    _ref$prefix = _ref.prefix,
    prefix = _ref$prefix === void 0 ? "" : _ref$prefix,
    _ref$postfix = _ref.postfix,
    postfix = _ref$postfix === void 0 ? "" : _ref$postfix;
  var formattedNumber = new Intl.NumberFormat("ru-RU", precision ? {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  } : {}).format(+number);
  return "".concat(prefix).concat(formattedNumber.replace(",", ".")).concat(postfix);
};
var declension = function declension(number, key) {
  try {
    var forms = constants.dictionary[key];
    if (!forms) {
      throw new Error("Unknown key \"".concat(key, "\" in dictionary"));
    }
    if (!isNumber(number)) {
      throw new TypeError("Number must be a number");
    }
    if (!Number.isInteger(number)) {
      throw new Error("Number must be an integer");
    }
    if (number < 0) {
      throw new Error("Number must be positive");
    }
    var index;
    if (number % 100 >= 11 && number % 100 <= 19) {
      index = 2;
    } else if (number % 10 === 1) {
      index = 0;
    } else if (number % 10 >= 2 && number % 10 <= 4) {
      index = 1;
    } else {
      index = 2;
    }
    return forms[index];
  } catch (error) {
    console.error(error.message);
    return "";
  }
};
function getFormat(val) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "number";
  if (!isNumber(+val)) return "";
  switch (format) {
    case "number":
      return new Intl.NumberFormat("ru-RU").format(+val);
    default:
      return val.toString();
  }
}// @ts-nocheck
var YA_GOALS_LS_KEY = "yaGoals";
function getGoalsYm() {
  if (!isClient) return [];
  var localStorageGoals = localStorage.getItem(YA_GOALS_LS_KEY);
  // если есть коды в localStorage, то берём оттуда
  if (localStorageGoals) return JSON.parse(localStorageGoals);
  // Получаем все ключи объекта, начинающиеся с префикса "yaCounter"
  var keys = Object.keys(window).filter(function (key) {
    return key.startsWith("yaCounter");
  });
  // Извлекаем цифры из ключей
  var numbers = keys.map(function (key) {
    return parseInt(key.replace("yaCounter", ""));
  });
  // Сохраняем в localStorage
  localStorage.setItem(YA_GOALS_LS_KEY, JSON.stringify(numbers));
  return numbers;
}
var ymGoal = function ymGoal(code) {
  if (!code) return;
  if (typeof ym === "function") {
    var goals = getGoalsYm();
    goals.forEach(function (goal) {
      return ym(goal, "reachGoal", code);
    });
  }
};
var gtmGoal = function gtmGoal(code) {
  if (!code) return;
  if (typeof gtag == "function") {
    gtag("event", code + "_form", {
      event_category: code,
      event_action: "send"
    });
  }
  if (typeof dataLayer == "function") {
    dataLayer.push({
      event: "event-to-ga",
      eventCategory: code,
      eventAction: "send"
    });
  }
};
var facebookPixelGoal = function facebookPixelGoal() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "SubmitApplication";
  if (window["_fbq"] !== undefined) {
    fbq("track", code);
  }
};var script$3 = Vue$1.defineComponent({
  name: "GIntegrations",
  props: {
    footerScripts: String,
    bodyScripts: String,
    styles: String,
    design: Object
  },
  beforeMount: function beforeMount() {
    saveUTM();
    this.initCustomStyles();
  },
  methods: {
    initCustomStyles: function initCustomStyles() {
      if (this.styles) {
        var stylesBlock = document.createElement("style");
        stylesBlock.textContent = this.styles;
        document.head.appendChild(stylesBlock);
      }
    }
  }
});function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm._ssrNode((_vm.bodyScripts ? "<div class=\"g-body-scripts\">" + _vm._s(_vm.bodyScripts) + "</div>" : "<!---->") + " "), _vm._t("default"), _vm._ssrNode(" " + (_vm.footerScripts ? "<div class=\"g-footer-scripts\">" + _vm._s(_vm.footerScripts) + "</div>" : "<!---->"))], 2);
};
var __vue_staticRenderFns__$3 = [];

/* style */
var __vue_inject_styles__$3 = undefined;
/* scoped */
var __vue_scope_id__$3 = undefined;
/* module identifier */
var __vue_module_identifier__$3 = "data-v-7712b4ac";
/* functional template */
var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);
var __vue_component__$7 = __vue_component__$6;var script$2 = Vue$1.defineComponent({
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
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    modalState: function modalState() {
      return this.$store.state.modal.modal || {};
    },
    currentModalComponent: function currentModalComponent() {
      return this.components[this.modalState.name];
    },
    currentModalParams: function currentModalParams() {
      return this.modalState.params || {};
    },
    isOpen: function isOpen() {
      return this.$store.state.modal.active;
    }
  },
  watch: {
    "$route.path": function $routePath() {
      if (this.isOpen) {
        // @ts-ignore
        this.modalHide();
      }
    }
  }
});function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
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
var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-2a19c6fa_0", {
    source: ".g-modal[data-v-2a19c6fa]{position:fixed;bottom:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:100}.g-modal__overlay[data-v-2a19c6fa]{position:absolute;top:0;left:0;width:100%;height:100%}.g-modal__content[data-v-2a19c6fa]{position:relative;z-index:1}",
    map: undefined,
    media: undefined
  }), inject("data-v-2a19c6fa_1", {
    source: "html.locked{overflow:hidden}@media only screen and (min-width:1025px){html.locked{padding-right:15px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$2 = "data-v-2a19c6fa";
/* module identifier */
var __vue_module_identifier__$2 = "data-v-2a19c6fa";
/* functional template */
var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);
var __vue_component__$5 = __vue_component__$4;var script$1 = Vue$1.defineComponent({
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
});/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
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
var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-668df2e8_0", {
    source: "*[data-v-668df2e8],[data-v-668df2e8]:after,[data-v-668df2e8]:before{box-sizing:border-box}[data-v-668df2e8]:root{--var-projection-display:block}a[data-v-668df2e8]{color:inherit;text-decoration:none}a[data-v-668df2e8],abbr[data-v-668df2e8],acronym[data-v-668df2e8],address[data-v-668df2e8],applet[data-v-668df2e8],article[data-v-668df2e8],aside[data-v-668df2e8],audio[data-v-668df2e8],b[data-v-668df2e8],big[data-v-668df2e8],blockquote[data-v-668df2e8],body[data-v-668df2e8],canvas[data-v-668df2e8],caption[data-v-668df2e8],center[data-v-668df2e8],cite[data-v-668df2e8],code[data-v-668df2e8],dd[data-v-668df2e8],del[data-v-668df2e8],details[data-v-668df2e8],dfn[data-v-668df2e8],div[data-v-668df2e8],dl[data-v-668df2e8],dt[data-v-668df2e8],em[data-v-668df2e8],embed[data-v-668df2e8],fieldset[data-v-668df2e8],figcaption[data-v-668df2e8],figure[data-v-668df2e8],footer[data-v-668df2e8],form[data-v-668df2e8],h1[data-v-668df2e8],h2[data-v-668df2e8],h3[data-v-668df2e8],h4[data-v-668df2e8],h5[data-v-668df2e8],h6[data-v-668df2e8],header[data-v-668df2e8],hgroup[data-v-668df2e8],html[data-v-668df2e8],i[data-v-668df2e8],iframe[data-v-668df2e8],img[data-v-668df2e8],ins[data-v-668df2e8],kbd[data-v-668df2e8],label[data-v-668df2e8],legend[data-v-668df2e8],li[data-v-668df2e8],mark[data-v-668df2e8],menu[data-v-668df2e8],nav[data-v-668df2e8],object[data-v-668df2e8],ol[data-v-668df2e8],output[data-v-668df2e8],p[data-v-668df2e8],pre[data-v-668df2e8],q[data-v-668df2e8],ruby[data-v-668df2e8],s[data-v-668df2e8],samp[data-v-668df2e8],section[data-v-668df2e8],small[data-v-668df2e8],span[data-v-668df2e8],strike[data-v-668df2e8],strong[data-v-668df2e8],sub[data-v-668df2e8],summary[data-v-668df2e8],sup[data-v-668df2e8],table[data-v-668df2e8],tbody[data-v-668df2e8],td[data-v-668df2e8],tfoot[data-v-668df2e8],th[data-v-668df2e8],thead[data-v-668df2e8],time[data-v-668df2e8],tr[data-v-668df2e8],tt[data-v-668df2e8],u[data-v-668df2e8],ul[data-v-668df2e8],var[data-v-668df2e8],video[data-v-668df2e8]{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article[data-v-668df2e8],aside[data-v-668df2e8],details[data-v-668df2e8],figcaption[data-v-668df2e8],figure[data-v-668df2e8],footer[data-v-668df2e8],header[data-v-668df2e8],hgroup[data-v-668df2e8],menu[data-v-668df2e8],nav[data-v-668df2e8],section[data-v-668df2e8]{display:block}body[data-v-668df2e8]{line-height:1}ol[data-v-668df2e8],ul[data-v-668df2e8]{list-style:none}blockquote[data-v-668df2e8],q[data-v-668df2e8]{quotes:none}blockquote[data-v-668df2e8]:after,blockquote[data-v-668df2e8]:before,q[data-v-668df2e8]:after,q[data-v-668df2e8]:before{content:\"\";content:none}table[data-v-668df2e8]{border-collapse:collapse;border-spacing:0}.g-indent[data-v-668df2e8]:empty{padding-top:0!important;padding-bottom:0!important}.g-indent__top-x-large[data-v-668df2e8]{padding-top:150px}@media screen and (max-width:1024px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:110px}}@media screen and (max-width:768px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:80px}}@media screen and (max-width:480px){.g-indent__top-x-large[data-v-668df2e8]{padding-top:60px}}.g-indent__top-large[data-v-668df2e8]{padding-top:100px}@media screen and (max-width:1024px){.g-indent__top-large[data-v-668df2e8]{padding-top:80px}}@media screen and (max-width:768px){.g-indent__top-large[data-v-668df2e8]{padding-top:60px}}@media screen and (max-width:480px){.g-indent__top-large[data-v-668df2e8]{padding-top:40px}}.g-indent__top-default[data-v-668df2e8]{padding-top:50px}@media screen and (max-width:1024px){.g-indent__top-default[data-v-668df2e8]{padding-top:40px}}@media screen and (max-width:768px){.g-indent__top-default[data-v-668df2e8]{padding-top:30px}}@media screen and (max-width:480px){.g-indent__top-default[data-v-668df2e8]{padding-top:20px}}.g-indent__top-small[data-v-668df2e8]{padding-top:25px}@media screen and (max-width:1024px){.g-indent__top-small[data-v-668df2e8]{padding-top:20px}}@media screen and (max-width:768px){.g-indent__top-small[data-v-668df2e8]{padding-top:15px}}@media screen and (max-width:480px){.g-indent__top-small[data-v-668df2e8]{padding-top:10px}}.g-indent__top-x-small[data-v-668df2e8]{padding-top:10px}@media screen and (max-width:1024px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:8px}}@media screen and (max-width:768px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:5px}}@media screen and (max-width:480px){.g-indent__top-x-small[data-v-668df2e8]{padding-top:2px}}.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:150px}@media screen and (max-width:1024px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:110px}}@media screen and (max-width:768px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:80px}}@media screen and (max-width:480px){.g-indent__bottom-x-large[data-v-668df2e8]{padding-bottom:60px}}.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:100px}@media screen and (max-width:1024px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:80px}}@media screen and (max-width:768px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:60px}}@media screen and (max-width:480px){.g-indent__bottom-large[data-v-668df2e8]{padding-bottom:40px}}.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:50px}@media screen and (max-width:1024px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:40px}}@media screen and (max-width:768px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:30px}}@media screen and (max-width:480px){.g-indent__bottom-default[data-v-668df2e8]{padding-bottom:20px}}.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:25px}@media screen and (max-width:1024px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:20px}}@media screen and (max-width:768px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:15px}}@media screen and (max-width:480px){.g-indent__bottom-small[data-v-668df2e8]{padding-bottom:10px}}.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:10px}@media screen and (max-width:1024px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:8px}}@media screen and (max-width:768px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:5px}}@media screen and (max-width:480px){.g-indent__bottom-x-small[data-v-668df2e8]{padding-bottom:2px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$1 = "data-v-668df2e8";
/* module identifier */
var __vue_module_identifier__$1 = "data-v-668df2e8";
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);
var __vue_component__$3 = __vue_component__$2;/*!
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
}var ActionTypes;
(function (ActionTypes) {
  ActionTypes["UPDATE_DATA"] = "updateData";
  ActionTypes["REMOVE_TAG"] = "removeTag";
})(ActionTypes || (ActionTypes = {}));var MutationTypes$1;
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
})(MutationTypes$1 || (MutationTypes$1 = {}));var script = Vue$1.defineComponent({
  name: "GFilter",
  props: {
    currentRoute: {
      type: Object
    }
  },
  fetch: function fetch() {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            console.log(_this.currentRoute, _this.$route.query, _this.$route);
            // this.setRequestData(syncHash(this.$route.query as { [key: string]: string }));
            _this.setRequestData(syncHash(_this.currentRoute));
            _context.next = 4;
            return _this.updateData();
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  // watch: {
  //   async $route() {
  //     this.resetRequestData();
  //     this.setRequestData(
  //       syncHash(this.$route.query as { [key: string]: string })
  //     );
  //     await this.updateData();
  //   },
  // },
  methods: _objectSpread2(_objectSpread2({}, mapMutations({
    resetRequestData: "filter/".concat(MutationTypes$1.RESET_REQUEST_DATA),
    setRequestData: "filter/".concat(MutationTypes$1.SET_REQUEST_DATA)
  })), {}, {
    updateData: function updateData() {
      var _arguments = arguments,
        _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var settings;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              settings = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : constants.filterUpdateDataParams;
              _context2.next = 3;
              return _this2.$store.dispatch("filter/".concat(ActionTypes.UPDATE_DATA), settings);
            case 3:
              if (settings.scrollTop && isClient) {
                _this2.$nextTick(function () {
                  _this2.$scrollTo("body");
                });
              }
              if (settings.callback) {
                settings.callback();
              }
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  })
});/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
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
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = "data-v-2c3344c1";
/* module identifier */
var __vue_module_identifier__ = "data-v-2c3344c1";
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);
var __vue_component__$1 = __vue_component__;var components$1=/*#__PURE__*/Object.freeze({__proto__:null,GIntegrations:__vue_component__$7,GModal:__vue_component__$5,GIndent:__vue_component__$3,GFilter:__vue_component__$1});var block = {
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
};var SeoMixin = {
  head: function head() {
    var seo = this.seo,
      favicon = this.favicon,
      scripts = this.scripts,
      design = this.design;
    var headObj = {
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
      style: [{
        cssText: isObject$1(design) ? "\n            :root {\n              ".concat(Object.entries(design).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          return "--".concat(key, ": ").concat(value);
        }).join("; "), "\n            }\n          ") : "",
        type: "text/css"
      }],
      script: [],
      __dangerouslyDisableSanitizers: ["script"]
    };
    if (scripts) {
      headObj.script.push({
        innerHTML: scripts
      });
    }
    return headObj;
  }
};
var SeoMixin$1 = SeoMixin;var size = Vue$1.defineComponent({
  data: function data() {
    return {
      isTablet: false,
      isNotebook: false,
      isDesktop: false
    };
  },
  mounted: function mounted() {
    this.setWindowSizes();
    window.addEventListener("resize", this.setWindowSizes);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("resize", this.setWindowSizes);
  },
  methods: {
    setWindowSizes: function setWindowSizes() {
      if (isClient) {
        var isTablet = window.matchMedia("(max-width: 768px)").matches;
        var isNotebook = window.matchMedia("(max-width: 1024px)").matches;
        this.isTablet = isTablet;
        this.isNotebook = !isTablet && isNotebook;
        this.isDesktop = !isTablet && !isNotebook;
      }
    }
  }
});var Api = /*#__PURE__*/function (_Request) {
  _inherits(Api, _Request);
  var _super = _createSuper(Api);
  function Api() {
    _classCallCheck(this, Api);
    return _super.apply(this, arguments);
  }
  _createClass(Api, null, [{
    key: "getFilterData",
    value: function () {
      var _getFilterData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(request) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this.post("/filter/", JSON.stringify(request), {
                "Content-Type": "application/json"
              });
            case 3:
              return _context.abrupt("return", _context.sent);
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", Promise.resolve("Unknown error occurred"));
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 6]]);
      }));
      function getFilterData(_x) {
        return _getFilterData.apply(this, arguments);
      }
      return getFilterData;
    }()
  }, {
    key: "sendTicket",
    value: function () {
      var _sendTicket = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(request) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this.post("/ticket/", request);
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", Promise.resolve("Unknown error occurred"));
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 6]]);
      }));
      function sendTicket(_x2) {
        return _sendTicket.apply(this, arguments);
      }
      return sendTicket;
    }()
  }, {
    key: "getPage",
    value: function () {
      var _getPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return this.post("/constructor/pages/info/", JSON.stringify({
                url: url
              }), {
                "Content-Type": "application/json"
              });
            case 3:
              return _context3.abrupt("return", _context3.sent);
            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", Promise.resolve("Unknown error occurred"));
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 6]]);
      }));
      function getPage(_x3) {
        return _getPage.apply(this, arguments);
      }
      return getPage;
    }()
  }]);
  return Api;
}(Request$1);
var Api$1 = Api;var ticket = Vue__default["default"].extend({
  methods: {
    goals: function goals(form) {
      ymGoal(form.code);
      gtmGoal(form.code);
      facebookPixelGoal();
    },
    sendTicket: function sendTicket(ticketData, successCallback, errorCallback) {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var form, formData, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              form = _objectSpread2(_objectSpread2({
                page: window.location.href
              }, ticketData), getUTM());
              formData = new FormData(); // преобразовываем объект в FormData
              Object.keys(form).forEach(function (key) {
                if (isUndefined(form[key])) return;
                formData.append(key, form[key]);
              });

              // отправляем заявку на сервер, используя метод sendTicket из класса Api
              _context.next = 5;
              return Api$1.sendTicket(formData);
            case 5:
              response = _context.sent;
              if (isObject$1(response) && response.status === "success") {
                // метрика
                _this.goals(form);
                // колбек успешного выполнения
                if (successCallback && isFunction(successCallback)) successCallback();
              } else {
                // колбек ошибочного выполнения
                if (errorCallback && isFunction(errorCallback)) errorCallback();
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }
});var MutationTypes;
(function (MutationTypes) {
  MutationTypes["OPEN_DIALOG"] = "openModal";
  MutationTypes["CLOSE_MODAL"] = "closeModal";
})(MutationTypes || (MutationTypes = {}));var dialog = Vue$1.defineComponent({
  methods: {
    modalShow: function modalShow(name) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.$store.commit("modal/".concat(MutationTypes.OPEN_DIALOG), {
        name: name,
        params: params
      });
      var html = document.querySelector("html");
      if (html) {
        html.classList.add("locked");
      }
    },
    modalHide: function modalHide() {
      this.$store.commit("modal/".concat(MutationTypes.CLOSE_MODAL));
      var html = document.querySelector("html");
      if (html) {
        html.classList.remove("locked");
      }
    }
  }
});var pageLoader = Vue$1.defineComponent({
  data: function data() {
    return {
      components: [],
      seo: {
        seo_title: "",
        seo_description: "",
        seo_keywords: ""
      },
      breadcrumbs: [],
      hasBreadcrumbs: false,
      id: null
    };
  },
  fetch: function fetch() {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.getPageConfig();
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  watch: {
    "$route.path": function $routePath() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2.getPageConfig();
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  },
  methods: {
    getPageConfig: function getPageConfig() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this3.components = [];
              _context3.next = 3;
              return Api$1.getPage(removeLastSymbol(_this3.$route.path, "/"));
            case 3:
              data = _context3.sent;
              if (_typeof(data) === "object" && isNotEmptyArray(data.blocks)) {
                _this3.components = _toConsumableArray(data.blocks);
                _this3.seo = data.seo;
                _this3.id = data.model_id;
                _this3.breadcrumbs = data.breadcrumbs;
                _this3.hasBreadcrumbs = data.is_breadcrumbs && isNotEmptyArray(data.breadcrumbs);
              } else {
                _this3.components = [constants.notFoundPageConfig];
                _this3.seo = constants.notFoundPageSeo;
                _this3.hasBreadcrumbs = false;
              }
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    }
  }
});var state$2 = {
  loading: false,
  requestData: {},
  filters: [],
  topFilter: null,
  sorting: [],
  info: null,
  items: null,
  page: 1
};
var state$3 = state$2;var getters = {
  requestData: function requestData(state) {
    return state.requestData;
  },
  countItems: function countItems(state) {
    return state.info ? state.info.cars_count : 0;
  },
  watchedItems: function watchedItems(state) {
    return +state.page * constants.countItemsOnPage;
  },
  countPages: function countPages(state) {
    return state.info ? Math.ceil(state.info.cars_count / constants.countItemsOnPage) : 0;
  },
  sorting: function sorting(state) {
    return state.sorting;
  },
  items: function items(state) {
    return state.items ? state.items.data : [];
  },
  values: function values(state) {
    var groupsItems = state.items ? state.items.data : [];
    if (isNotEmptyArray(groupsItems) && isNotEmptyArray(groupsItems[0].values)) return groupsItems[0].values;
    return [];
  },
  loading: function loading(state) {
    return state.loading;
  },
  filters: function filters(state) {
    return state.filters;
  },
  topFilter: function topFilter(state) {
    return state.topFilter;
  },
  info: function info(state) {
    return state.info;
  },
  page: function page(state) {
    return state.page;
  },
  openedFilterNames: function openedFilterNames(state) {
    return state.filters.filter(function (el) {
      return el.opened;
    }).map(function (el) {
      return el.name;
    });
  },
  tags: function tags(state) {
    return getTags(state.filters);
  }
};
var getters$1 = getters;var _mutations$1;
var mutations$2 = (_mutations$1 = {}, _defineProperty(_mutations$1, MutationTypes$1.SET_LOADING, function (state, val) {
  state.loading = val;
}), _defineProperty(_mutations$1, MutationTypes$1.SET_REQUEST_DATA, function (state, data) {
  state.requestData = _objectSpread2(_objectSpread2({}, state.requestData), data);
}), _defineProperty(_mutations$1, MutationTypes$1.RESET_REQUEST_DATA, function (state) {
  state.requestData = {
    view: state.requestData.view
  };
}), _defineProperty(_mutations$1, MutationTypes$1.REMOVE_KEY_FROM_REQUEST_DATA, function (state, key) {
  delete state.requestData[key];
}), _defineProperty(_mutations$1, MutationTypes$1.UPDATE_FILTER_BY_INDEX, function (state, _ref) {
  var index = _ref.index,
    item = _ref.item;
  state.filters.splice(index, 1, item);
}), _defineProperty(_mutations$1, MutationTypes$1.SET_FILTERS, function (state, data) {
  state.filters = data;
}), _defineProperty(_mutations$1, MutationTypes$1.SET_TOP_FILTER, function (state, data) {
  state.topFilter = data;
}), _defineProperty(_mutations$1, MutationTypes$1.SET_ITEMS, function (state, items) {
  state.items = items;
}), _defineProperty(_mutations$1, MutationTypes$1.SET_SORTING, function (state, data) {
  state.sorting = data;
}), _defineProperty(_mutations$1, MutationTypes$1.SET_INFO, function (state, data) {
  state.info = data;
}), _defineProperty(_mutations$1, MutationTypes$1.SET_PAGE_URL, function (_, url) {
  if (isClient) {
    history.pushState("", "data.seo.title", "".concat(location.pathname, "?").concat(url || ""));
  }
}), _defineProperty(_mutations$1, MutationTypes$1.SET_PAGE, function (state, page) {
  state.page = page;
}), _mutations$1);
var mutations$3 = mutations$2;var _actions;
var actions = (_actions = {}, _defineProperty(_actions, ActionTypes.REMOVE_TAG, function (_ref, tag) {
  var commit = _ref.commit,
    state = _ref.state;
  commit(MutationTypes$1.SET_REQUEST_DATA, _defineProperty({}, tag.param, removeTag(tag, state.requestData)));
}), _defineProperty(_actions, ActionTypes.UPDATE_DATA, function (_ref2) {
  var _arguments = arguments;
  return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var commit, getters, settings, openedFilters, requestData, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          commit = _ref2.commit, getters = _ref2.getters;
          settings = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
          if (!settings.offLoading) {
            commit(MutationTypes$1.SET_LOADING, true);
          }
          openedFilters = getters.openedFilterNames;
          requestData = _objectSpread2({
            type: "items",
            view: "model"
          }, getters.requestData);
          if (openedFilters.length) {
            requestData.opened = openedFilters;
          }
          _context.next = 8;
          return Api$1.getFilterData(requestData);
        case 8:
          data = _context.sent;
          if (_typeof(data) === "object") {
            commit(MutationTypes$1.SET_FILTERS, data.filters);
            commit(MutationTypes$1.SET_TOP_FILTER, data.top_filter);
            commit(MutationTypes$1.SET_ITEMS, data.cars);
            commit(MutationTypes$1.SET_SORTING, data.sorting);
            commit(MutationTypes$1.SET_INFO, data.info);
            commit(MutationTypes$1.SET_PAGE_URL, data.info.url);
            commit(MutationTypes$1.SET_PAGE, getQueryParam("/url?".concat(data.info.url || ""), "page"));
          }
          if (!settings.offLoading) {
            commit(MutationTypes$1.SET_LOADING, false);
          }
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }))();
}), _actions);
var actions$1 = actions;var index$2 = {
  namespaced: true,
  state: state$3,
  getters: getters$1,
  mutations: mutations$3,
  actions: actions$1
};var state = {
  active: false,
  modal: null
};
var state$1 = state;var _mutations;
var mutations = (_mutations = {}, _defineProperty(_mutations, MutationTypes.OPEN_DIALOG, function (state, modal) {
  state.active = true;
  state.modal = modal;
}), _defineProperty(_mutations, MutationTypes.CLOSE_MODAL, function (state) {
  state.active = false;
  state.modal = null;
}), _mutations);
var mutations$1 = mutations;var index$1 = {
  namespaced: true,
  state: state$1,
  mutations: mutations$1
};var index=/*#__PURE__*/Object.freeze({__proto__:null,filter:index$2,modal:index$1});var install = function installGlobalBackServices(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];
    Vue.component(componentName, component);
  });
};var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,stores:index,Api:Api$1,setConstants:setConstants,GIntegrations:__vue_component__$7,GModal:__vue_component__$5,GIndent:__vue_component__$3,GFilter:__vue_component__$1,block:block,meta:SeoMixin$1,size:size,ticket:ticket,dialog:dialog,pageLoader:pageLoader,applyModifiers:applyModifiers$1,idealTextColor:idealTextColor$1,copyToClipboard:copyToClipboard$1,getTags:getTags,removeTag:removeTag,saveUTM:saveUTM,getUTM:getUTM,normalizePhoneNumber:normalizePhoneNumber,getRandomNumber:getRandomNumber,getFileSize:getFileSize,formatNumber:formatNumber,declension:declension,getFormat:getFormat,ymGoal:ymGoal,gtmGoal:gtmGoal,facebookPixelGoal:facebookPixelGoal,getRGBComponents:getRGBComponents$1,fallbackCopyToClipboard:fallbackCopyToClipboard$1,Request:Request$1,isClient:isClient,isServer:isServer,isDev:isDev,isProd:isProd,getQueryParam:getQueryParam,syncHash:syncHash,removeLastSymbol:removeLastSymbol,getType:getType,isString:isString,isNumber:isNumber,isBoolean:isBoolean,isArray:isArray,isNotEmptyArray:isNotEmptyArray,isObject:isObject$1,isUndefined:isUndefined,isFunction:isFunction});// Attach named exports directly to plugin. IIFE/CJS will
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    componentName = _ref2[0],
    component = _ref2[1];
  if (componentName !== "default") {
    var key = componentName;
    install[key] = component;
  }
});module.exports=install;