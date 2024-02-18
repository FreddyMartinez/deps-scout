import { githubReposUrl } from "../util/constants";
import { httpGet } from "../util/httpGet";
import { logErrors } from "../util/utilityFunctions";

const githubHeaders = {
  "User-Agent": "deps-scout/1.0",
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28"
};

const repoUrl = (owner: string, repo: string) =>
  `${githubReposUrl}${owner}/${repo}`;

export async function getRepoData(owner: string, repo: string) {
  try {
    const gitData = await httpGet(repoUrl(owner, repo), githubHeaders);
    return JSON.parse(gitData) as GitData | GithubExcededRateLimit;
  } catch (error) {
    logErrors(error);
  }
}

const communityProfileUrl = (owner: string, repo: string) =>
  `${repoUrl(owner, repo)}/community/profile`;

export async function getRepoCommunityProfile(owner: string, repo: string) {
  try {
    const gitData = await httpGet(communityProfileUrl(owner, repo), githubHeaders);
    return JSON.parse(gitData) as GitCommunityProfile;
  } catch (error) {
    logErrors(error);
  }
}
