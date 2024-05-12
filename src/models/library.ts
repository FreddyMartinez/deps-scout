import { LibSourceStatus } from "./libParam";

export type Library = {
  name: string;
  usedVersion: string;
  sourceStatus: Map<string, LibSourceStatus>;
} & Partial<{
  // Properties from npm
  repoName: string;
  repoOwner: string;
  numberOfVersions: number;
  weeklyDownloads: number;
  lastVersion: string;
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
}>;
