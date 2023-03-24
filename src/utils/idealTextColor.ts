import { getRGBComponents } from "../helpers";

const idealTextColor = (
  bgColor: string | undefined,
  whiteColor: string = "var(--white-color)",
  blackColor: string = "var(--black-color)"
): string => {
  if (typeof bgColor !== "string") {
    return blackColor;
  }
  if (bgColor.length === 4) {
    bgColor =
      "#" +
      bgColor[1] +
      bgColor[1] +
      bgColor[2] +
      bgColor[2] +
      bgColor[3] +
      bgColor;
  }
  const components = getRGBComponents(bgColor);
  if (!components) {
    console.error("Invalid color format");
    return blackColor;
  }
  const nThreshold = 105;
  const bgDelta =
    components.R * 0.299 + components.G * 0.587 + components.B * 0.114;
  return 255 - bgDelta < nThreshold ? "var(--black-color)" : whiteColor;
};
export default idealTextColor;
