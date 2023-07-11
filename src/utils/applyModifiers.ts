import { isFunction } from "../helpers";

export type CustomModifiersString = { [key: string]: (e: string) => string };

const applyModifiers = (
  str: string | null | undefined,
  customModifiers?: CustomModifiersString
): string => {
  if (!str) {
    return "";
  }

  let updatedStr = str;

  const regex = /\[([^\]]+)\]/g;
  let match = regex.exec(str);

  while (match !== null) {
    const [contentWithBrackets, content] = match;
    const splitPart: string[] = content.split("|");
    let updatedPart: string = splitPart.shift() as string;

    splitPart.forEach((mod: string) => {
      switch (mod.toLowerCase()) {
        case "n":
          updatedPart = new Intl.NumberFormat("ru-RU")
            .format(+updatedPart)
            .replace(",", ".");
          break;
        case "l":
          updatedPart = updatedPart.toLowerCase();
          break;
        case "u":
          updatedPart = updatedPart.toUpperCase();
          break;
      }
      // CUSTOM MODIFIERS
      if (customModifiers && isFunction(customModifiers[mod]))
        updatedPart = customModifiers[mod](updatedPart);
    });

    updatedStr = updatedStr.replace(contentWithBrackets, updatedPart);
    match = regex.exec(str);
  }

  return updatedStr;
};
export default applyModifiers;
