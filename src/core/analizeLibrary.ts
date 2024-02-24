import { libraryBuilder } from "./libraryBuilder";
import { Library } from "../models/library";
import {
  timeBetweenReleasesMessage,
  timeSinceLastReleaseMessage,
} from "../util/constants";
import {
  printGreen,
  printBgYellow,
  printRed,
  printYellow,
  roundToTwoDecimals,
} from "../util/utilityFunctions";

export async function analyzeOneLibrary(lib: string, version?: string) {
  const libInstance = await libraryBuilder.buildLibraryInstance(lib);

  if (!libInstance) return;
  analyzeLibrary(libInstance, version);
  console.log(libInstance);
}

export function analyzeLibrary(library: Library, usedVersion?: string) {
  printGreen(`Analyzing library: ${library.name}`);
  // is same version?
  if (usedVersion && library.lastVersion !== usedVersion) {
    analyzeVersion(library.lastVersion, usedVersion);
  }

  // release frequency
  analyzeReleaseFrequency(library);
  // is it a popular library?
  analyzePopularity(library);
}

function analyzeVersion(latest: string, current: string) {
  const latestSemVer = latest.split(".");
  const currentSemVer = current.split(".");
  printBgYellow(
    `There are new library versions: current ${currentSemVer} - latest ${latestSemVer}`
  );
  if (latestSemVer[0] !== currentSemVer[0]) {
    printRed("Major version is different: possible breaking changes");
  } else if (latestSemVer[1] !== currentSemVer[1]) {
    printYellow(
      "Minor version is different: possible bug fixes in newer version"
    );
  }
}

function analyzeReleaseFrequency(library: Library) {
  const timeSinceLastRelease =
    (Date.now() - library.lastVersionDate.getTime()) / (1000 * 60 * 60 * 24);
  if (timeSinceLastRelease > 365) {
    printRed(
      timeSinceLastReleaseMessage(roundToTwoDecimals(timeSinceLastRelease))
    );
  } else if (timeSinceLastRelease > 180) {
    printYellow(
      timeSinceLastReleaseMessage(roundToTwoDecimals(timeSinceLastRelease))
    );
  }

  if (library.releaseFrequency < 0.1) {
    printRed(
      timeBetweenReleasesMessage(
        roundToTwoDecimals(1 / library.releaseFrequency)
      )
    );
  } else if (library.releaseFrequency < 0.3) {
    printYellow(
      timeBetweenReleasesMessage(
        roundToTwoDecimals(1 / library.releaseFrequency)
      )
    );
  }
}

function analyzePopularity(library: Library) {
  const logDownloads = Math.log10(library.weeklyDownloads);
  if (logDownloads < 2) {
    printRed(
      `Library not widely used: ${library.weeklyDownloads} weekly downloads`
    );
  } else if (logDownloads < 5) {
    printYellow(
      `Library not widely used: ${library.weeklyDownloads} weekly downloads`
    );
  }

  if (library.repoStars === undefined) {
    return;
  }

  if (library.repoStars < 100) {
    printRed(`Repo not widely starred: ${library.repoStars} stars`);
  } else if (library.repoStars < 500) {
    printYellow(`Repo not widely starred: ${library.repoStars} stars`);
  }
}
