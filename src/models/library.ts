import { githubUrlRegex } from "../util/constants";

export class Library {
  // Properties from npm
  name: string;
  repoName: string;
  repoOwner: string;
  numberOfVersions: number;
  weeklyDownloads: number;
  lastVersion: string;
  usedVersion: string;
  lastVersionDate: Date;
  lifeSpan: number;
  releaseFrequency: number;
  // Properties from github
  repoOpenIssues: number;
  repoStars: number;
  repoForks: number;
  repoObservers: number;
  repoOwnerType: string;
  repoHealth: number;

  constructor(npmData: NpmData) {
    this.name = npmData.name;
    this.setOwnerAndRepo(npmData.repository.url);
    this.numberOfVersions = npmData.versions.length;
    this.setTimeRelatedAttributes(npmData.time);
    this.lastVersion = npmData.version;
  }

  private setOwnerAndRepo(url: string) {
    const match = githubUrlRegex.exec(url);
    if (!match) {
      console.log(`Error parsing url: ${url} for ${this.name}`);
      return;
    }
    this.repoOwner = match[1];
    this.repoName = match[2];
  }

  private setTimeRelatedAttributes(npmTime: NpmTime) {
    const createdDate = new Date(npmTime.created);
    this.lastVersionDate = new Date(npmTime.modified);
    this.lifeSpan =
      (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    this.releaseFrequency = this.numberOfVersions / this.lifeSpan;
  }

  setDownloadsData(npmDownloads: NpmDownloads) {
    this.weeklyDownloads = npmDownloads.downloads || 0;
  }

  setRepoData(repoData: GitData) {
    this.repoOpenIssues = repoData.open_issues_count || repoData.open_issues;
    this.repoStars = repoData.stargazers_count || 0;
    this.repoForks = repoData.forks_count || repoData.forks;
    this.repoObservers = repoData.subscribers_count;
    this.repoOwnerType = repoData.owner?.type;
  }

  setRepoProfile(repoProfile: GitCommunityProfile) {
    this.repoHealth = repoProfile.health_percentage;
  }
}
