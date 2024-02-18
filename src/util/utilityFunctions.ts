export const logErrors = (error: unknown) => {
  if (error instanceof Error) console.error(error.message);
}

export function isTypeOf<T>(obj: unknown, ...properties: (keyof T)[]): obj is T {
  if(!obj) return false;
  return properties.every(prop => obj[prop] !== undefined);
}

const printWithColor = (color) => (message) => {
  console.log(`\x1b[${color}${message}\x1b[0m`);
}

export const printRed = printWithColor('31m');
export const printGreen = printWithColor('32m');
export const printYellow = printWithColor('33m');
export const printHighlighted = printWithColor('7m');
