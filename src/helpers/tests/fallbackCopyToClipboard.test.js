import fallbackCopyToClipboard from "../fallbackCopyToClipboard";
import jsdom from "jsdom-global";
describe("fallbackCopyToClipboard", () => {
  let cleanup;

  beforeAll(() => {
    // Initialize jsdom
    cleanup = jsdom();
  });

  afterAll(() => {
    // Cleanup jsdom
    cleanup();
  });

  test("copies text to clipboard successfully", () => {
    document.execCommand = jest.fn(() => true); // mock document.execCommand to always return true
    const text = "test";
    fallbackCopyToClipboard(text);
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });

  test("throws an error when copy to clipboard fails", () => {
    document.execCommand = jest.fn(() => false); // mock document.execCommand to always return false
    console.error = jest.fn(); // suppress console.error output
    const text = "test";
    fallbackCopyToClipboard(text);
    expect(console.error).toHaveBeenCalledWith("Oops, unable to copy");
  });
});
