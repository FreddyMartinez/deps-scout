export const GITHUB = "github";
export const GITHUB_COMUNITY = "githubComunity";
export const NPM = "npm";
export const MAVEN = "maven";

export type Source =
  | typeof GITHUB
  | typeof GITHUB_COMUNITY
  | typeof NPM
  | typeof MAVEN;

export type ParamStatus = "OK" | "ERROR" | "MISSING";

export type LibParam = {
  status: ParamStatus;
  source: Source;
}
