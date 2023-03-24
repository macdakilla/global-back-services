import copyToClipboard from "../copyToClipboard";
import { JSDOM } from "jsdom";

const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
  clipboard: {
    writeText: jest.fn(),
  },
};
describe("copyToClipboard", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should copy text to clipboard using Clipboard API", async () => {
    const writeTextMock = jest.fn().mockReturnValue(Promise.resolve());
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    const text = "Hello, world!";
    await copyToClipboard(text);

    expect(writeTextMock).toHaveBeenCalledWith(text);
  });

  it("should log error if Clipboard API writeText fails", async () => {
    const error = new Error("oops");
    const writeTextMock = jest.fn().mockRejectedValue(error);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    const text = "Hello, world!";
    console.error = jest.fn();

    await copyToClipboard(text);

    expect(writeTextMock).toHaveBeenCalledWith(text);
    expect(console.error).toHaveBeenCalledWith(
      "Error copying to clipboard",
      error
    );
  });
});
