import { Library } from "../models/library";
import { getNpmData, getNpmDownloads } from "../services/getDataNpm";
import {
  getRepoCommunityProfile,
  getRepoData,
} from "../services/getGithubData";
import { logErrors } from "../util/utilityFunctions";

export async function buildLibraryInstance(lib: string) {
  const library = await builLibraryNpmData(lib);
  if (!library) return;
  if (library.repo && library.owner) {
    await buildLibraryRepoData(library);
  }
  return library;
}

export async function builLibraryNpmData(lib: string) {
  try {
    const [npmData, npmDownloads] = await Promise.all([
      getNpmData(lib),
      getNpmDownloads(lib),
    ]);

    return new Library(npmData, npmDownloads);
  } catch (error) {
    logErrors(error);
  }
}

export async function buildLibraryRepoData(library: Library) {
  const [repoData, repoProfile] = await Promise.all([
    getRepoData(library.owner, library.name),
    getRepoCommunityProfile(library.owner, library.name),
  ]);
  if (repoData) {
    library.setRepoData(repoData);
  }
  if (repoProfile) {
    library.setRepoProfile(repoProfile);
  }
}
