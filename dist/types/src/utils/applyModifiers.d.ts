export type CustomModifiersString = {
    [key: string]: (e: string) => string;
};
declare const applyModifiers: (str: string | null | undefined, customModifiers?: CustomModifiersString) => string;
export default applyModifiers;
