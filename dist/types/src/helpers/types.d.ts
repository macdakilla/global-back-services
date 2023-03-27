export declare const getType: (value: unknown) => string;
export declare const isString: (value: unknown) => value is string;
export declare const isNumber: (value: unknown) => value is number;
export declare const isBoolean: (value: unknown) => value is boolean;
export declare const isArray: <T>(value: unknown) => value is T[];
export declare const isNotEmptyArray: <T>(value: unknown) => value is T[];
export declare const isObject: (value: unknown) => value is Record<string, unknown>;
export declare const isUndefined: (value: unknown) => value is undefined;
