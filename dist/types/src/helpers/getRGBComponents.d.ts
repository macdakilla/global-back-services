type RGBComponents = {
    R: number;
    G: number;
    B: number;
};
declare const getRGBComponents: (color: string) => RGBComponents | null;
export default getRGBComponents;
