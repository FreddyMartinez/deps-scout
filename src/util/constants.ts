export const npmDownloadsBaseUrl =
  "https://api.npmjs.org/downloads/point/last-week/";
export const githubReposUrl = "https://api.github.com/repos/";
export const githubUrlRegex = /github\.com\/([^/]+)\/([^/]+)\.git/;

export const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

export const messages = {
  fileNotFound: (file: string) =>
    `Error reading ${file}, make sure there is a valid ${file} file in the current directory.`,
};

const libNotFrequentlyUpdated = "The library is not released frequently.";
export const timeBetweenReleasesMessage = (timeBetweenReleases: number) =>
  `${libNotFrequentlyUpdated} Average time between releases is ${timeBetweenReleases} days`;

export const CONSOLE = "console";
export const HTML_FILE = "html";

export const questions = {
  language: {
    type: "list",
    name: "lang",
    message: "Select the language of your project",
    choices: ["javascript", "python", "java"],
  },
  context: {
    type: "list",
    name: "context",
    message: "How would you like to get the results?",
    choices: [CONSOLE, HTML_FILE],
  },
};
