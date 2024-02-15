import { Library } from "../models/library";
import { getNpmData, getNpmDownloads } from "./getDataNpm";
import { getRepoData } from "./getGithubData";

export async function analyzeLibrary(lib: string) {
  const libInstance = await buildLibraryInstance(lib);
  
  if (!libInstance) return;
  console.log(libInstance);
  const repoData = await getRepoData(libInstance.owner, libInstance.name);
  console.log(repoData);
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
