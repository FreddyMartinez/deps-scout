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
  if (library.repoName && library.repoOwner) {
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

    const library = new Library(npmData);
    if (npmDownloads) library.setDownloadsData(npmDownloads);
    return library;
  } catch (error) {
    logErrors(error);
  }
}

export async function buildLibraryRepoData(library: Library) {
  const [repoData, repoProfile] = await Promise.all([
    getRepoData(library.repoOwner, library.name),
    getRepoCommunityProfile(library.repoOwner, library.name),
  ]);
  if (repoData) {
    library.setRepoData(repoData);
  }
  if (repoProfile) {
    library.setRepoProfile(repoProfile);
  }
}
