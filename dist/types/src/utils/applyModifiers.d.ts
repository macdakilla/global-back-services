declare const applyModifiers: (str: string | null | undefined, customModifiers: {
    [key: string]: (e: string) => string;
}) => string;
export default applyModifiers;
