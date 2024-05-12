import { Library } from "./library";
import { getNpmData, getNpmDownloads } from "../services/getDataNpm";
import {
  getRepoCommunityProfile,
  getRepoData,
} from "../services/getGithubData";
import { isTypeOf } from "../util/utilityFunctions";
import { githubUrlRegex } from "../util/constants";

export interface LibraryBuilder {
  addLibraryParams(lib: Library): Promise<void>;
}

export class NpmBuilder implements LibraryBuilder {
  async addLibraryParams(library: Library) {
    const npmData = await getNpmData(library.name);

    library.numberOfVersions = npmData.versions.length;
    library.lastVersion = npmData.version;
    this.setOwnerAndRepo(library, npmData.repository.url);
    this.setTimeRelatedAttributes(library, npmData.time);
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
    const repoData = await getRepoData(library.repoOwner, library.repoName);

    if (isTypeOf<GithubExcededRateLimit>(repoData, "message")) {
      throw new Error(`Error getting GitHub data for ${library.name}: ${repoData.message}`);
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
      library.repoName
    );
    if (repoProfile) {
      library.repoHealth = repoProfile.health_percentage;
    }
  }
}
