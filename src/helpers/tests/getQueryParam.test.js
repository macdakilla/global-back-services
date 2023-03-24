import { getQueryParam } from "../url";

describe("getQueryParam", () => {
  it("should return an empty string if the URL does not contain query parameters", () => {
    const url = "/test";
    const param = "name";
    const result = getQueryParam(url, param);
    expect(result).toBe("");
  });

  it("should return an empty string if the parameter is not found in the URL", () => {
    const url = "/test?age=25";
    const param = "name";
    const result = getQueryParam(url, param);
    expect(result).toBe("");
  });

  it("should return the value of the specified parameter if it exists in the URL", () => {
    const url = "/test?name=John&age=25";
    const param = "name";
    const result = getQueryParam(url, param);
    expect(result).toBe("John");
  });

  it("should handle parameter values containing special characters", () => {
    const url =
      "/test?name=%D0%B2%D0%B0%D1%81%D1%8F%20%D0%BF%D1%83%D0%BF%D0%BA%D0%B8%D0%BD";
    const param = "name";
    const result = getQueryParam(url, param);
    expect(result).toBe("вася пупкин");
  });

  it("should handle URLs with multiple parameters", () => {
    const url = "/test?name=John&age=25&gender=male";
    const param = "age";
    const result = getQueryParam(url, param);
    expect(result).toBe("25");
  });

  it("should handle URLs with repeated parameters", () => {
    const url = "/test?name=John&name=Jane&age=25";
    const param = "name";
    const result = getQueryParam(url, param);
    expect(result).toBe("John");
  });
});
