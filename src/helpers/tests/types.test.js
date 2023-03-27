import {
  getType,
  isObject,
  isString,
  isNotEmptyArray,
  isArray,
  isNumber,
  isFunction,
  isUndefined,
  isBoolean,
} from "../types";

describe("getType", () => {
  it("should return the type of the value", () => {
    expect(getType("hello")).toBe("string");
    expect(getType(42)).toBe("number");
    expect(getType(true)).toBe("boolean");
    expect(getType([])).toBe("object");
    expect(getType(null)).toBe("object");
    expect(getType(undefined)).toBe("undefined");
    expect(getType(() => {})).toBe("function");
  });
});

describe("isString", () => {
  it("should return true if the value is a string", () => {
    expect(isString("hello")).toBe(true);
    expect(isString(42)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(() => {})).toBe(false);
  });
});

describe("isNumber", () => {
  it("should return true if the value is a number", () => {
    expect(isNumber("hello")).toBe(false);
    expect(isNumber(42)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(() => {})).toBe(false);
  });
});

describe("isBoolean", () => {
  it("should return true if the value is a boolean", () => {
    expect(isBoolean("hello")).toBe(false);
    expect(isBoolean(42)).toBe(false);
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(() => {})).toBe(false);
  });
});

describe("isArray", () => {
  it("should return true if the value is an array", () => {
    expect(isArray("hello")).toBe(false);
    expect(isArray(42)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(() => {})).toBe(false);
  });
});

describe("isNotEmptyArray", () => {
  it("should return true if the value is a non-empty array", () => {
    expect(isNotEmptyArray("hello")).toBe(false);
    expect(isNotEmptyArray(42)).toBe(false);
    expect(isNotEmptyArray(true)).toBe(false);
    expect(isNotEmptyArray([])).toBe(false);
    expect(isNotEmptyArray([1, 2, 3])).toBe(true);
    expect(isNotEmptyArray({})).toBe(false);
    expect(isNotEmptyArray(null)).toBe(false);
    expect(isNotEmptyArray(undefined)).toBe(false);
    expect(isNotEmptyArray(() => {})).toBe(false);
  });
});

describe("isObject", () => {
  it("should return true if the value is an object but not an array or null", () => {
    expect(isObject("hello")).toBe(false);
    expect(isObject(42)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });
});
describe("isUndefined", () => {
  it("should return true if the value is undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined("hello")).toBe(false);
    expect(isUndefined(42)).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined(() => {})).toBe(false);
  });
});

describe("isFunction", () => {
  it("should return true if the value is a function", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(() => "hello")).toBe(true);
    expect(isFunction("hello")).toBe(false);
    expect(isFunction(42)).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
  });
});
