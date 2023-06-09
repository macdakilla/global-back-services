import { FormatFilter } from "../store/filter/types/state";
export declare const normalizePhoneNumber: (phoneNumber: string) => string;
export declare const getRandomNumber: (min: number, max: number) => number;
export declare const getFileSize: (size: number) => string;
interface FormatOptions {
    precision?: number;
    prefix?: string;
    postfix?: string;
}
export declare const formatNumber: (number: number | string, options?: FormatOptions) => string | number;
export declare const declension: (number: number, key: string) => string;
export declare function getFormat(val: number | string, format?: FormatFilter): string;
export {};
