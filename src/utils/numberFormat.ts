export const normalizePhoneNumber = (phoneNumber: string): string => {
  // удаляем все символы, кроме цифр
  let digits = phoneNumber.replace(/\D/g, "");
  if (!digits) return phoneNumber;
  // если номер начинается с "8", заменяем на "7"
  if (digits.startsWith("8")) {
    digits = digits.replace(/^8/, "7");
  }
  // если номер начинается с "9" и имеет длину 10 цифр, добавляем "7" в начало
  if (digits.startsWith("9") && digits.length === 10) {
    digits = `7${digits}`;
  }
  // если номер не удалось привести к одному формату, возвращаем исходное значение
  return digits;
};
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const getFileSize = (size: number): string => {
  if (!Number.isFinite(size) || size < 0) {
    throw new Error("Invalid file size");
  }

  const fSExt = ["Байт", "КБ", "МБ", "ГБ"];
  let i = 0;

  while (size > 900 && i < fSExt.length - 1) {
    size /= 1024;
    i++;
  }

  return `${Math.round(size * 100) / 100} ${fSExt[i]}`;
};

interface FormatOptions {
  precision?: number;
  prefix?: string;
  postfix?: string;
}

export const formatNumber = (
  number: number | string,
  options?: FormatOptions
): string | number => {
  if (isNaN(+number)) return number;
  const { precision, prefix = "", postfix = "" } = options || {};

  let formattedNumber = new Intl.NumberFormat(
    "ru-RU",
    precision
      ? {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        }
      : {}
  ).format(+number);

  return `${prefix}${formattedNumber.replace(",", ".")}${postfix}`;
};
