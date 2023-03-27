// Функция getType определяет тип переданного значения
export const getType = (value: unknown): string => {
  return typeof value;
};

// Функция isString возвращает true, если переданное значение является строкой
export const isString = (value: unknown): value is string => {
  return getType(value) === "string";
};

// Функция isNumber возвращает true, если переданное значение является числом
export const isNumber = (value: unknown): value is number => {
  return (
    getType(value) === "number" &&
    !isNaN(value as number) &&
    isFinite(value as number)
  );
};

// Функция isBoolean возвращает true, если переданное значение является логическим
export const isBoolean = (value: unknown): value is boolean => {
  return getType(value) === "boolean";
};

// Функция isArray возвращает true, если переданное значение является массивом
export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

// Функция isNotEmptyArray возвращает true, если переданное значение является непустым массивом
export const isNotEmptyArray = <T>(value: unknown): value is T[] => {
  return isArray(value) && value.length > 0;
};

// Функция isObject возвращает true, если переданное значение является объектом, но не массивом и не null
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && !isArray(value) && value !== null;
};

// Функция isUndefined возвращает true, если переданное значение является undefined
export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === "undefined";
};

// Функция isFunction возвращает true, если переданное значение является функцией
export const isFunction = (value: unknown): value is Function => {
  return typeof value === "function";
};
