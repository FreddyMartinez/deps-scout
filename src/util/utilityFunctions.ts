export const logErrors = (error: unknown) => {
  if (error instanceof Error) console.error(error.message);
}