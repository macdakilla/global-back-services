import { applyModifiers } from "../index";
describe("applyModifiers", () => {
  test("returns an empty string when input is null", () => {
    expect(applyModifiers(null)).toEqual("");
  });

  test("returns an empty string when input is undefined", () => {
    expect(applyModifiers(undefined)).toEqual("");
  });

  test("returns the original input when there are no modifiers", () => {
    expect(applyModifiers("Hello, world!")).toEqual("Hello, world!");
  });

  test("applies U modifier and not split '|' outside word", () => {
    expect(applyModifiers("[Hello|U] | My name maxim")).toEqual(
      "HELLO | My name maxim"
    );
  });

  test("applies U modifier to uppercase the content", () => {
    expect(applyModifiers("[Hello|U]")).toEqual("HELLO");
  });

  test("applies L modifier to lowercase the content", () => {
    expect(applyModifiers("[WORLD|L]")).toEqual("world");
  });

  test("applies N modifier to format the number with thousand separators", () => {
    expect(applyModifiers("[12345.6789|N]")).toEqual("12 345.679");
  });

  test("ignores unknown modifiers", () => {
    expect(applyModifiers("[Hello|X|Y|Z]")).toEqual("Hello");
  });

  test("handles multiple modifiers with the same effect", () => {
    expect(applyModifiers("[Hello|U|U]")).toEqual("HELLO");
    expect(applyModifiers("[world|L|L]")).toEqual("world");
  });

  test("handles multiple modifier groups in the same input", () => {
    expect(applyModifiers("[12345.6789|N] [hello|U] [world|L|N]")).toEqual(
      "12 345.679 HELLO не число"
    );
  });

  test("custom modifiers", () => {
    expect(
      applyModifiers("[12345.6789|N|A] [hello|U|B] [world|L|N]", {
        A: () => "modifier",
        B: (e) => e + "modifier",
      })
    ).toEqual("modifier HELLOmodifier не число");
  });
});
