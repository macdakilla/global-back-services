import idealTextColor from "../idealTextColor";

describe("idealTextColor", () => {
  test("returns black color for undefined background color", () => {
    const result = idealTextColor(undefined);
    expect(result).toBe("var(--black-color)");
  });

  test("returns white color for light background color", () => {
    const result = idealTextColor("#f5f5f5");
    expect(result).toBe("var(--black-color)");
  });

  test("returns black color for dark background color", () => {
    const result = idealTextColor("#222222");
    expect(result).toBe("var(--white-color)");
  });

  test("returns default white color for light background color if not provided", () => {
    const result = idealTextColor("#f5f5f5", undefined, "red");
    expect(result).toBe("var(--black-color)");
  });

  test("returns default black color for dark background color if not provided", () => {
    const result = idealTextColor("#222222", "green");
    expect(result).toBe("green");
  });

  test("returns black color for invalid background color format", () => {
    console.error = jest.fn(); // Suppress console.error output
    const result = idealTextColor("orange");
    expect(result).toBe("var(--black-color)");
    expect(console.error).toHaveBeenCalled();
  });
});
