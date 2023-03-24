type RGBComponents = { R: number; G: number; B: number };

const getRGBComponents = (color: string): RGBComponents | null => {
  const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const match = color.match(regex);
  if (!match) {
    return null;
  }
  const [, r, g, b] = match;
  return {
    R: parseInt(r, 16),
    G: parseInt(g, 16),
    B: parseInt(b, 16),
  };
};
export default getRGBComponents;
