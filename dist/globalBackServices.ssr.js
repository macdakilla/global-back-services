'use strict';var Vue=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vue__default=/*#__PURE__*/_interopDefaultLegacy(Vue);function _iterableToArrayLimit(arr, i) {
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
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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
var fallbackCopyToClipboard$1 = fallbackCopyToClipboard;var Request = /*#__PURE__*/function () {
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
              return fetch("".concat(Request.baseURL).concat(url), {
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
var isProd = "production" !== "production";var getQueryParam = function getQueryParam(url, param) {
  var searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.has(param) ? searchParams.get(param) || "" : "";
};// Функция getType определяет тип переданного значения
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
var isObject = function isObject(value) {
  return _typeof(value) === "object" && !isArray(value) && value !== null;
};

// Функция isUndefined возвращает true, если переданное значение является undefined
var isUndefined = function isUndefined(value) {
  return typeof value === "undefined";
};

// Функция isFunction возвращает true, если переданное значение является функцией
var isFunction = function isFunction(value) {
  return typeof value === "function";
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
var copyToClipboard$1 = copyToClipboard;function getFormat(val) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "number";
  if (isNaN(+val)) return "";
  if (format === "number") {
    return new Intl.NumberFormat("ru-RU").format(+val);
  }
  return val.toString();
}
function getTags(filters) {
  var tags = [];
  filters.forEach(function (filter) {
    if (["checkbox", "color", "select"].includes(filter.type) && !filter.tags_ignore && !filter.disabled && Array.isArray(filter.values)) {
      filter.values.forEach(function (group) {
        if (!Array.isArray(group.values)) return;
        group.values.forEach(function (item) {
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
      var values = filter.values;
      var format = values.format,
        postfix = values.postfix;
      if (values.min !== values.range[0]) {
        var name = "\u043E\u0442 ".concat(getFormat(values.range[0], format), " ").concat(postfix);
        tags.push({
          type: filter.type,
          param: filter.name,
          changeMin: true,
          min: values.min,
          max: values.max,
          range: values.range,
          name: name
        });
      }
      if (values.max !== values.range[1]) {
        var _name = "\u0434\u043E ".concat(getFormat(values.range[1], format), " ").concat(postfix);
        tags.push({
          type: filter.type,
          param: filter.name,
          changeMin: false,
          min: values.min,
          max: values.max,
          range: values.range,
          id: filter.id,
          name: _name
        });
      }
    }
  });
  return tags;
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
};var script$1 = Vue__default["default"].extend({
  name: "GIntegrations",
  props: {
    footerScripts: String,
    bodyScripts: String,
    styles: String,
    design: Object
  },
  beforeMount: function beforeMount() {
    if (this.styles) {
      var stylesBlock = document.createElement("style");
      stylesBlock.textContent = this.styles;
      document.head.appendChild(stylesBlock);
    }
    saveUTM();
    if (isObject(this.design)) {
      for (var varsKey in this.design) {
        if (!isString(this.design[varsKey])) {
          document.documentElement.style.setProperty("--".concat(varsKey), this.design[varsKey]);
        }
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
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm._ssrNode((_vm.bodyScripts ? "<div class=\"body-scripts\">" + _vm._s(_vm.bodyScripts) + "</div>" : "<!---->") + " "), _vm._t("default"), _vm._ssrNode(" " + (_vm.footerScripts ? "<div class=\"footer-scripts\">" + _vm._s(_vm.footerScripts) + "</div>" : "<!---->"))], 2);
};
var __vue_staticRenderFns__$1 = [];

/* style */
var __vue_inject_styles__$1 = undefined;
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = "data-v-67f69c5a";
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);
var __vue_component__$3 = __vue_component__$2;var state$2 = {
  active: false,
  modal: null
};
var state$3 = state$2;var MutationTypes$1;
(function (MutationTypes) {
  MutationTypes["OPEN_DIALOG"] = "openModal";
  MutationTypes["CLOSE_MODAL"] = "closeModal";
})(MutationTypes$1 || (MutationTypes$1 = {}));var _mutations$1;
var mutations$2 = (_mutations$1 = {}, _defineProperty(_mutations$1, MutationTypes$1.OPEN_DIALOG, function (state, modal) {
  state.active = true;
  state.modal = modal;
}), _defineProperty(_mutations$1, MutationTypes$1.CLOSE_MODAL, function (state) {
  state.active = false;
  state.modal = null;
}), _mutations$1);
var mutations$3 = mutations$2;var modal = {
  namespaced: true,
  state: state$3,
  mutations: mutations$3
};var script = Vue.defineComponent({
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
  created: function created() {
    if (!this.$store.hasModule("modal")) {
      this.$store.registerModule("modal", modal);
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
  methods: {
    closeDialog: function closeDialog() {
      this.$store.commit("modal/closeModal");
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
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
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
      "click": _vm.closeDialog
    }
  }), _vm._v(" "), _c(_vm.currentModalComponent, {
    tag: "component",
    staticClass: "g-modal__content",
    attrs: {
      "params": _vm.currentModalParams
    },
    on: {
      "close": _vm.closeDialog
    }
  })], 1) : _vm._e()]);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-31d995ae_0", {
    source: ".g-modal[data-v-31d995ae]{position:fixed;bottom:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:100}.g-modal__overlay[data-v-31d995ae]{position:absolute;top:0;left:0;width:100%;height:100%}.g-modal__content[data-v-31d995ae]{position:relative;z-index:1}",
    map: undefined,
    media: undefined
  }), inject("data-v-31d995ae_1", {
    source: "html.locked{overflow:hidden}@media only screen and (min-width:1025px){html.locked{padding-right:15px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = "data-v-31d995ae";
/* module identifier */
var __vue_module_identifier__ = "data-v-31d995ae";
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);
var __vue_component__$1 = __vue_component__;var components$1=/*#__PURE__*/Object.freeze({__proto__:null,GIntegrations:__vue_component__$3,GModal:__vue_component__$1});var block = {
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
      scripts = this.scripts;
    var headObj = {
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
var SeoMixin$1 = SeoMixin;var size = Vue.defineComponent({
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
  }]);
  return Api;
}(Request$1);
var Api$1 = Api;var ticket = Vue__default["default"].extend({
  methods: {
    sendTicket: function sendTicket(ticketData, successCallback, errorCallback) {
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
                formData.append(key, form[key]);
              });

              // отправляем заявку на сервер, используя метод sendTicket из класса Api
              _context.next = 5;
              return Api$1.sendTicket(formData);
            case 5:
              response = _context.sent;
              if (isObject(response) && response.status === "success") {
                if (successCallback && isFunction(successCallback)) successCallback();
              } else {
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
});var dialog = Vue.defineComponent({
  methods: {
    modalShow: function modalShow(name) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.$store.commit("modal/".concat(MutationTypes$1.OPEN_DIALOG), {
        name: name,
        params: params
      });
      var html = document.querySelector("html");
      if (html) {
        html.classList.add("locked");
      }
    },
    modalHide: function modalHide() {
      this.$store.commit("modal/".concat(MutationTypes$1.CLOSE_MODAL));
      var html = document.querySelector("html");
      if (html) {
        html.classList.remove("locked");
      }
    }
  }
});var state = {
  loading: false,
  requestData: {},
  filters: [],
  topFilter: null,
  sorting: [],
  info: null,
  items: null,
  page: 1
};
var state$1 = state;var getters = {
  requestData: function requestData(state) {
    return state.requestData;
  },
  countItems: function countItems(state) {
    return state.info ? state.info.cars_count : 0;
  },
  sorting: function sorting(state) {
    return state.sorting;
  },
  items: function items(state) {
    return state.items ? state.items.data : [];
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
var getters$1 = getters;var MutationTypes;
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
})(MutationTypes || (MutationTypes = {}));var _mutations;
var mutations = (_mutations = {}, _defineProperty(_mutations, MutationTypes.SET_LOADING, function (state, val) {
  state.loading = val;
}), _defineProperty(_mutations, MutationTypes.SET_REQUEST_DATA, function (state, data) {
  state.requestData = _objectSpread2(_objectSpread2({}, state.requestData), data);
}), _defineProperty(_mutations, MutationTypes.RESET_REQUEST_DATA, function (state) {
  state.requestData = {
    view: state.requestData.view
  };
}), _defineProperty(_mutations, MutationTypes.REMOVE_KEY_FROM_REQUEST_DATA, function (state, key) {
  delete state.requestData[key];
}), _defineProperty(_mutations, MutationTypes.UPDATE_FILTER_BY_INDEX, function (state, _ref) {
  var index = _ref.index,
    item = _ref.item;
  state.filters.splice(index, 1, item);
}), _defineProperty(_mutations, MutationTypes.SET_FILTERS, function (state, data) {
  state.filters = data;
}), _defineProperty(_mutations, MutationTypes.SET_TOP_FILTER, function (state, data) {
  state.topFilter = data;
}), _defineProperty(_mutations, MutationTypes.SET_ITEMS, function (state, items) {
  state.items = items;
}), _defineProperty(_mutations, MutationTypes.SET_SORTING, function (state, data) {
  state.sorting = data;
}), _defineProperty(_mutations, MutationTypes.SET_INFO, function (state, data) {
  state.info = data;
}), _defineProperty(_mutations, MutationTypes.SET_PAGE_URL, function (_, url) {
  if (isClient) {
    history.pushState("", "data.seo.title", "".concat(location.pathname, "?").concat(url || ""));
  }
}), _defineProperty(_mutations, MutationTypes.SET_PAGE, function (state, page) {
  state.page = page;
}), _mutations);
var mutations$1 = mutations;var ActionTypes;
(function (ActionTypes) {
  ActionTypes["UPDATE_DATA"] = "updateData";
})(ActionTypes || (ActionTypes = {}));var actions = _defineProperty({}, ActionTypes.UPDATE_DATA, function (_ref) {
  var _arguments = arguments;
  return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var commit, getters, settings, openedFilters, requestData, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          commit = _ref.commit, getters = _ref.getters;
          settings = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
          if (!settings.offLoading) {
            commit(MutationTypes.SET_LOADING, true);
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
            commit(MutationTypes.SET_FILTERS, data.filters);
            commit(MutationTypes.SET_TOP_FILTER, data.top_filter);
            commit(MutationTypes.SET_ITEMS, data.cars);
            commit(MutationTypes.SET_SORTING, data.sorting);
            commit(MutationTypes.SET_INFO, data.info);
            commit(MutationTypes.SET_PAGE_URL, data.info.url);
            commit(MutationTypes.SET_PAGE, getQueryParam("/url?".concat(data.info.url || ""), "page"));
          }
          if (!settings.offLoading) {
            commit(MutationTypes.SET_LOADING, false);
          }
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }))();
});
var actions$1 = actions;var index$1 = {
  namespaced: true,
  state: state$1,
  getters: getters$1,
  mutations: mutations$1,
  actions: actions$1
};var index=/*#__PURE__*/Object.freeze({__proto__:null,filter:index$1});var install = function installGlobalBackServices(Vue, settings) {
  if (settings.baseURL) Request$1.baseURL = settings.baseURL;
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];
    Vue.component(componentName, component);
  });
};var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,stores:index,Api:Api$1,GIntegrations:__vue_component__$3,GModal:__vue_component__$1,block:block,meta:SeoMixin$1,size:size,ticket:ticket,dialog:dialog,applyModifiers:applyModifiers$1,idealTextColor:idealTextColor$1,copyToClipboard:copyToClipboard$1,getTags:getTags,saveUTM:saveUTM,getUTM:getUTM,normalizePhoneNumber:normalizePhoneNumber,getRandomNumber:getRandomNumber,getFileSize:getFileSize,formatNumber:formatNumber,getRGBComponents:getRGBComponents$1,fallbackCopyToClipboard:fallbackCopyToClipboard$1,Request:Request$1,isClient:isClient,isServer:isServer,isDev:isDev,isProd:isProd,getQueryParam:getQueryParam,getType:getType,isString:isString,isNumber:isNumber,isBoolean:isBoolean,isArray:isArray,isNotEmptyArray:isNotEmptyArray,isObject:isObject,isUndefined:isUndefined,isFunction:isFunction});// Attach named exports directly to plugin. IIFE/CJS will
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