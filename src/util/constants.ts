export const npmDownloadsBaseUrl =
  "https://api.npmjs.org/downloads/point/last-week/";
export const githubReposUrl = "https://api.github.com/repos/";
export const githubUrlRegex = /github\.com\/([^\/]+)\/([^\/]+)\.git/;

export const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

export const messages = {
  noPackageJson:
    "Error reading package.json, make sure there is a valid package.json file in the current directory.",
};

const libNotFrequentlyUpdated = "The library is not released frequently.";
export const timeBetweenReleasesMessage = (timeBetweenReleases: number) =>
  `${libNotFrequentlyUpdated} Average time between releases is ${timeBetweenReleases} days`;