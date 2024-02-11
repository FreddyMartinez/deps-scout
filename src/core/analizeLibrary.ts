import { getNpmData } from "./getDataNpm";

export async function analyzeLibrary(lib: string) {
  const npmData = await getNpmData(lib);
  console.log(npmData);
}