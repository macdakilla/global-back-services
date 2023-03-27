import {
  normalizePhoneNumber,
  getRandomNumber,
  getFileSize,
  formatNumber,
} from "../numberFormat";

describe("normalizePhoneNumber", () => {
  it("should remove non-digits", () => {
    expect(normalizePhoneNumber("+7 (912) 345 67-89")).toBe("79123456789");
  });

  it("should replace '8' with '+7'", () => {
    expect(normalizePhoneNumber("8 (912) 345 67-89")).toBe("79123456789");
  });

  it("should add '+7' if starts with '9' and has 10 digits", () => {
    expect(normalizePhoneNumber("9123456789")).toBe("79123456789");
  });

  it("should return the same number if already in the correct format", () => {
    expect(normalizePhoneNumber("+79123456789")).toBe("79123456789");
  });

  it("should return the original number if unable to normalize", () => {
    expect(normalizePhoneNumber("foo")).toBe("foo");
  });
});

describe("getRandomNumber", () => {
  it("should return a random number in the given range", () => {
    const min = 1;
    const max = 10;
    const result = getRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it("should return the min value if min and max are equal", () => {
    const min = 5;
    const max = 5;
    const result = getRandomNumber(min, max);
    expect(result).toBe(min);
  });

  it("should work with negative numbers", () => {
    const min = -10;
    const max = -1;
    const result = getRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it("should swap min and max if min is greater than max", () => {
    const min = 10;
    const max = 1;
    const result = getRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(max);
    expect(result).toBeLessThanOrEqual(min);
  });
});

describe("getFileSize", () => {
  it("should return the size in bytes", () => {
    const result = getFileSize(123);
    expect(result).toBe("123 Байт");
  });

  it("should return the size in KB", () => {
    const result = getFileSize(123456);
    expect(result).toBe("120.56 КБ");
  });

  it("should return the size in MB", () => {
    const result = getFileSize(123456789);
    expect(result).toBe("117.74 МБ");
  });

  it("should return the size in GB", () => {
    const result = getFileSize(123456789012);
    expect(result).toBe("114.98 ГБ");
  });

  it("should throw an error for negative size", () => {
    expect(() => {
      getFileSize(-1);
    }).toThrow("Invalid file size");
  });

  it("should throw an error for non-finite size", () => {
    expect(() => {
      getFileSize(NaN);
    }).toThrow("Invalid file size");
  });
});

describe("formatNumber", () => {
  it("should format number with default options", () => {
    expect(formatNumber(1234.567)).toBe("1 234,567");
  });

  it("should format number with custom prefix and postfix", () => {
    expect(formatNumber(1234.567, { prefix: "($", postfix: ")" })).toBe(
      "($1 234,567)"
    );
  });

  it("should format number with custom precision", () => {
    expect(formatNumber(1234.567, { precision: 2 })).toBe("1 234,57");
  });

  it("should format number with fixed decimal places", () => {
    expect(formatNumber(1234.567, { precision: 1 })).toBe("1 234,6");
  });

  it("should remove trailing zeros with no precision", () => {
    expect(formatNumber(1234.56)).toBe("1 234,56");
    expect(formatNumber(1234.5)).toBe("1 234,5");
    expect(formatNumber(1234.0)).toBe("1 234");
  });

  it("should not remove trailing zeros with precision", () => {
    expect(formatNumber(1234.56, { precision: 2 })).toBe("1 234,56");
    expect(formatNumber(1234.5, { precision: 2 })).toBe("1 234,50");
    expect(formatNumber(1234.0, { precision: 2 })).toBe("1 234,00");
  });

  it("should throw error for negative number", () => {
    expect(formatNumber(-1234.0)).toBe("-1 234");
  });
});
