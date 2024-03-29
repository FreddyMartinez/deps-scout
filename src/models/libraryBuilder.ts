import { Library } from "./library";
import { getNpmData, getNpmDownloads } from "../services/getDataNpm";
import {
  getRepoCommunityProfile,
  getRepoData,
} from "../services/getGithubData";
import { isTypeOf, logErrors } from "../util/utilityFunctions";

class LibraryBuilder {
  async buildLibraryInstance(lib: string, version?: string) {
    try {
      const [npmData, npmDownloads] = await Promise.all([
        getNpmData(lib),
        getNpmDownloads(lib),
      ]);
  
      const library = new Library(npmData);
      library.setUsedVersion(version);
      if (npmDownloads) library.setDownloadsData(npmDownloads);
      return library;
    } catch (error) {
      logErrors(error);
    }
  }

  async buildLibraryRepoData(library: Library) {
    const [repoData, repoProfile] = await Promise.all([
      getRepoData(library.repoOwner, library.name),
      getRepoCommunityProfile(library.repoOwner, library.name),
    ]);
  
    if (isTypeOf<GithubExcededRateLimit>(repoData, "message")) {
      console.log(`Error getting GitHub data: ${repoData.message}`);
      return;
    } else if (repoData) {
      library.setRepoData(repoData);
    }
    if (repoProfile) {
      library.setRepoProfile(repoProfile);
    }
  }
}

export const libraryBuilder = new LibraryBuilder();
