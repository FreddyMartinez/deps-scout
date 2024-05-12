export const GITHUB = "github";
export const GITHUB_COMUNITY = "githubComunity";
export const NPM = "npm";
export const NPM_DOWNLOADS = "npmDownloads";
export const MAVEN = "maven";

export type Source =
  | typeof GITHUB
  | typeof GITHUB_COMUNITY
  | typeof NPM
  | typeof NPM_DOWNLOADS
  | typeof MAVEN;

export type LibSourceStatus = "OK" | "ERROR" | "MISSING";
