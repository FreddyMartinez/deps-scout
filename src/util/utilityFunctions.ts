export const logErrors = (error: unknown) => {
  if (error instanceof Error) console.error(error.message);
};

export function isTypeOf<T>(obj: unknown, ...properties: (keyof T)[]): obj is T {
  if (!obj) return false;
  return properties.every((prop) => obj[prop] !== undefined);
}

const printWithColor = (color: string) => (message: string) => {
  console.log(`\x1b[${color}${message}\x1b[0m`);
};

export const printRed = printWithColor("31m");
export const printGreen = printWithColor("32m");
export const printYellow = printWithColor("33m");
export const printBlue = printWithColor("34m");
export const printPurple = printWithColor("35m");
export const printCyan = printWithColor("36m");
export const printBgRed = printWithColor("41m");
export const printBgYellow = printWithColor("43m");
export const printBgWhite = printWithColor("47m");

export const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;
