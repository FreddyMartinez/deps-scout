export const logErrors = (error: unknown) => {
  if (error instanceof Error) console.error(error.message);
}

export function isTypeOf<T>(obj: unknown, ...properties: (keyof T)[]): obj is T {
  if(!obj) return false;
  return properties.every(prop => obj[prop] !== undefined);
}
