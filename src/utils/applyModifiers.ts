function applyModifiers(string: string | null | undefined): string {
  if (string === null || string === undefined) {
    return "";
  }
  const modifiers: Record<string, (str: string, ...args: any[]) => string> = {
    U: (str: string) => str.toUpperCase(),
    L: (str: string) => str.toLowerCase(),
    N: (str: string, locale = "ru-RU") => {
      const number = Number(str);
      return new Intl.NumberFormat(locale).format(number);
    },
    D: (str: string, format: string) => {
      const date = new Date(str);
      const YYYY = date.getFullYear();
      const MM = String(date.getMonth() + 1).padStart(2, "0");
      const DD = String(date.getDate()).padStart(2, "0");
      const h = String(date.getHours()).padStart(2, "0");
      const m = String(date.getMinutes()).padStart(2, "0");
      const s = String(date.getSeconds()).padStart(2, "0");
      return format
        .replace(/YYYY/g, YYYY.toString())
        .replace(/MM/g, MM)
        .replace(/DD/g, DD)
        .replace(/h/g, h)
        .replace(/m/g, m)
        .replace(/s/g, s);
    },
  };
  let result = string;
  const matches = string.match(/\[(.*?)\]/g) || [];
  for (const modifier of matches) {
    const mods = modifier.slice(1, -1).split("|");
    let modFunc = modifiers[mods[1]];
    if (modFunc) {
      let text = mods[0];
      for (let i = 2; i < mods.length; i++) {
        if (i === 2 && mods[1] === "N") {
          modFunc = (str, ...args) => modifiers.N(str, ...args);
        } else {
          modFunc = modifiers[mods[i]];
        }
        if (modFunc) {
          text = modFunc(text);
        }
      }
      result = result.replace(modifier, text);
    }
  }
  return result;
}
export default applyModifiers;
