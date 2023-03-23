const applyModifiers = (
  str: string | null | undefined,
  customModifiers: { [key: string]: (e: string) => string }
): string => {
  if (!str) {
    return "";
  }

  const formattedStr: string[] = str.split(/[\]\\[]/g);

  const updatedStr: string[] = formattedStr.map((el: string) => {
    const splitPart: string[] = el.split("|");
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
      if (customModifiers && typeof customModifiers[mod] === "function")
        updatedPart = customModifiers[mod](updatedPart);
    });

    return updatedPart;
  });

  return updatedStr.join("");
};

export default applyModifiers;
