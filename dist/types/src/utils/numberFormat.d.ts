export declare const normalizePhoneNumber: (phoneNumber: string) => string;
export declare const getRandomNumber: (min: number, max: number) => number;
export declare const getFileSize: (size: number) => string;
interface FormatOptions {
    precision?: number;
    prefix?: string;
    postfix?: string;
    fixed?: number;
}
export declare const formatNumber: (number: number | string, options?: FormatOptions) => string | number;
export {};
