import { getNpmData, getNpmDownloads } from "./getDataNpm";

export async function analyzeLibrary(lib: string) {
  const [npmData, npmDownloads] = await Promise.all([
    getNpmData(lib),
    getNpmDownloads(lib),
  ]);
  console.log(npmData);
  console.log(npmDownloads);
}
