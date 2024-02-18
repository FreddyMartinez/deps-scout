import { githubUrlRegex } from "../util/constants";

export class Library {
  // Atributes from npm
  name: string;
  owner: string;
  repo: string;
  numberOfVersions: number;
  weeklyDownloads: number;
  lastReleaseDate: Date;
  lifeSpan: number;
  releaseFrequency: number;
  // Atributes from github
  repoOpenIssues: number;
  repoStars: number;
  repoForks: number;
  repoObservers: number;
  repoOwnerType: string;
  repoHealth: number;

  constructor(npmData: NpmData, npmDownloads: NpmDownloads) {
    this.name = npmData.name;
    this.weeklyDownloads = npmDownloads.downloads || 0;
    this.setOwnerAndRepo(npmData.repository.url);
    this.numberOfVersions = npmData.versions.length;
    this.setTimeRelatedAttributes(npmData.time);
  }

  private setOwnerAndRepo(url: string) {
    const match = githubUrlRegex.exec(url);
    if (!match) {
      console.log(`Error parsing url: ${url} for ${this.name}`);
      return;
    }
    this.owner = match[1];
    this.repo = match[2];
  }

  private setTimeRelatedAttributes(npmTime: NpmTime) {
    const createdDate = new Date(npmTime.created);
    this.lastReleaseDate = new Date(npmTime.modified);
    this.lifeSpan =
      (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    this.releaseFrequency = this.lifeSpan / this.numberOfVersions;
  }

  setRepoData(repoData: GitData) {
    this.repoOpenIssues = repoData.open_issues_count || repoData.open_issues;
    this.repoStars = repoData.stargazers_count || 0;
    this.repoForks = repoData.forks_count || repoData.forks;
    this.repoObservers = repoData.subscribers_count;
    this.repoOwnerType = repoData.owner.type;
  }

  setRepoProfile(repoProfile: GitCommunityProfile) {
    this.repoHealth = repoProfile.health_percentage;
  }
}
