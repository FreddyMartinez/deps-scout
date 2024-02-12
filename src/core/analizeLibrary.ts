import { Library } from "../models/library";
import { getNpmData, getNpmDownloads } from "./getDataNpm";

export async function analyzeLibrary(lib: string) {
  const libInstance = await buildLibraryInstance(lib);
  
  if (!libInstance) return;
  console.log(libInstance);
}

export async function buildLibraryInstance(lib: string) {
  try {
    const [npmData, npmDownloads] = await Promise.all([
      getNpmData(lib),
      getNpmDownloads(lib),
    ]);

    return new Library(npmData, npmDownloads);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
