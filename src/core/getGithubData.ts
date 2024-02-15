import { githubReposUrl } from "../util/constants";
import { httpGet } from "../util/httpGet";

const githubHeaders = {
  "User-Agent": "deps-scout/1.0",
  Accept: "application/vnd.github+json",
};

const repoUrl = (owner: string, repo: string) =>
  `${githubReposUrl}${owner}/${repo}`;

export async function getRepoData(owner: string, repo: string) {
  const gitData = await httpGet(repoUrl(owner, repo), githubHeaders);
  return JSON.parse(gitData) as GitData;
}

const communityProfileUrl = (owner: string, repo: string) =>
  `${repoUrl(owner, repo)}/community/profile`;

export async function getRepoCommunityProfile(owner: string, repo: string) {
  const gitData = await httpGet(communityProfileUrl(owner, repo));
  return JSON.parse(gitData) as NpmData;
}
