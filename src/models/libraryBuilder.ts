import { Library } from "./library";
import { getNpmData, getNpmDownloads } from "../services/getDataNpm";
import {
  getRepoCommunityProfile,
  getRepoData,
} from "../services/getGithubData";
import { isTypeOf, logErrors } from "../util/utilityFunctions";
import { githubUrlRegex } from "../util/constants";

export interface LibraryBuilder {
  addLibraryParams(lib: Library): Promise<void>;
}

export class NpmBuilder implements LibraryBuilder {
  async addLibraryParams(library: Library) {
    try {
      const npmData = await getNpmData(library.name);

      library.numberOfVersions = npmData.versions.length;
      library.lastVersion = npmData.version;
      this.setOwnerAndRepo(library, npmData.repository.url);
      this.setTimeRelatedAttributes(library, npmData.time);
    } catch (error) {
      logErrors(error);
    }
  }

  private setOwnerAndRepo(library: Library, url: string) {
    const match = githubUrlRegex.exec(url);
    if (!match) {
      console.log(`Error parsing url: ${url} for ${library.name}`);
      return;
    }
    library.repoOwner = match[1];
    library.repoName = match[2];
  }

  private setTimeRelatedAttributes(library: Library, npmTime: NpmTime) {
    const createdDate = new Date(npmTime.created);
    library.lastVersionDate = new Date(npmTime.modified);
    library.lifeSpan =
      (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    library.releaseFrequency = library.numberOfVersions / library.lifeSpan;
  }
}

export class NpmDownloadsBuilder implements LibraryBuilder {
  async addLibraryParams(library: Library) {
    const npmDownloads = await getNpmDownloads(library.name);
    if (npmDownloads) library.weeklyDownloads = npmDownloads.downloads || 1;
  }
}

export class GithubBuilder implements LibraryBuilder {
  async addLibraryParams(library: Library) {
    const repoData = await getRepoData(library.repoOwner, library.name);

    if (isTypeOf<GithubExcededRateLimit>(repoData, "message")) {
      console.log(
        `Error getting GitHub data for ${library.name}: ${repoData.message}`
      );
      return;
    } else if (repoData) {
      library.repoOpenIssues =
        repoData.open_issues_count || repoData.open_issues;
      library.repoStars = repoData.stargazers_count || 1;
      library.repoForks = repoData.forks_count || repoData.forks;
      library.repoObservers = repoData.subscribers_count;
      library.repoOwnerType = repoData.owner?.type;
    }
  }
}

export class GithubCommunityBuilder implements LibraryBuilder {
  async addLibraryParams(library: Library) {
    const repoProfile = await getRepoCommunityProfile(
      library.repoOwner,
      library.name
    );
    if (repoProfile) {
      library.repoHealth = repoProfile.health_percentage;
    }
  }
}
