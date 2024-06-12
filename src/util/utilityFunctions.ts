export const logErrors = (error: unknown) => {
  if (error instanceof Error) console.error(error.message);
};

export function isTypeOf<T>(obj: unknown, ...properties: (keyof T)[]): obj is T {
  if (!obj) return false;
  return properties.every((prop) => obj[prop] !== undefined);
}

const printWithColor =
  (color: string, icon = "", tab = false) =>
  (message: string) => {
    console.log(`${tab ? "  " : ""}\x1b[${color}${icon} ${message}\x1b[0m`);
  };

export const printTitle = printWithColor("1m", "\n\u25ce");
export const printRed = printWithColor("31m", "\u26D2", true);
export const printGreen = printWithColor("32m", "\u2714");
export const printYellow = printWithColor("33m", "\u26A0", true);
export const printBlue = printWithColor("34m", "\u1367");
export const printPurple = printWithColor("35m", "\u29B8", true);
export const printCyan = printWithColor("36m", "\u2139");
export const printBgRed = printWithColor("41m");
export const printBgYellow = printWithColor("43m");
export const printBgWhite = printWithColor("47m");

export const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;
