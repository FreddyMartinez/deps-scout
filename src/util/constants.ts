export const npmDownloadsBaseUrl =
  "https://api.npmjs.org/downloads/point/last-week/";
export const githubReposUrl = "https://api.github.com/repos/";
export const githubUrlRegex = /github\.com\/([^\/]+)\/([^\/]+)\.git/;

export const messages = {
  noPackageJson:
    "Error reading package.json, make sure there is a valid package.json file in the current directory.",
};

const libNotFrequentlyUpdated = "Library not frequently updated:";
export const timeSinceLastReleaseMessage = (timeSinceLastRelease) =>
  `${libNotFrequentlyUpdated} last release was ${timeSinceLastRelease} days ago`;
export const timeBetweenReleasesMessage = (timeBetweenReleases) =>
  `${libNotFrequentlyUpdated} average time among releases is ${timeBetweenReleases} days`;