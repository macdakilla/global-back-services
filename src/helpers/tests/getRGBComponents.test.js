import getRGBComponents from "../getRGBComponents";
describe("getRGBComponents", () => {
  test("returns null for an invalid color format", () => {
    expect(getRGBComponents("yellow")).toBeNull();
  });

  test("returns RGB components for a valid color with hash (#) symbol", () => {
    const rgb = getRGBComponents("#FFA500");
    expect(rgb).toEqual({ R: 255, G: 165, B: 0 });
  });

  test("returns RGB components for a valid color without hash (#) symbol", () => {
    const rgb = getRGBComponents("00FF7F");
    expect(rgb).toEqual({ R: 0, G: 255, B: 127 });
  });

  test("returns RGB components for a valid color with lowercase letters", () => {
    const rgb = getRGBComponents("#bada55");
    expect(rgb).toEqual({ R: 186, G: 218, B: 85 });
  });

  test("returns RGB components for a valid color with uppercase letters", () => {
    const rgb = getRGBComponents("#ABCDEF");
    expect(rgb).toEqual({ R: 171, G: 205, B: 239 });
  });
});
