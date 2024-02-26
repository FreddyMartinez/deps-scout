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
import { IndicatorResult } from "./indicators/indicator.types";
import { IS_LAST_VERSION, IS_RELEASED_FREQUENTLY, IS_SAME_MAJOR_VERSION, IS_SAME_MINOR_VERSION, WAS_RELEASED_IN_LAST_THREE_MONTHS, WAS_RELEASED_IN_LAST_YEAR } from "./indicators/indicatorsNames";
import { indicatorRegistry } from "./indicators/registry";

export async function analyzeOneLibrary(lib: string, version?: string) {
  const libInstance = await libraryBuilder.buildLibraryInstance(lib);

  if (!libInstance) return;
  analyzeLibrary(libInstance, version);
  console.log(libInstance);
}

export function analyzeLibrary(library: Library, usedVersion?: string) {
  printGreen(`Analyzing library: ${library.name}`);
  // is same version?
  if (usedVersion) {
    analyzeVersion(library.lastVersion, usedVersion);
  }

  // time since last release
  analizeTimeSinceLastRelease(library);
  // release frequency
  analyzeReleaseFrequency(library);
  // is it a popular library?
  analyzePopularity(library);
}

function analyzeVersion(latest: string, current: string) {
  const isLastVersion = indicatorRegistry.evaluateIndicator(IS_LAST_VERSION, latest, current);

  if (isLastVersion === IndicatorResult.OK) return;

  indicatorRegistry.printIndicatorMessage(IS_LAST_VERSION, isLastVersion);
  const isSameMajorVersion = indicatorRegistry.evaluateIndicator(IS_SAME_MAJOR_VERSION, latest, current);
  
  if (isSameMajorVersion !== IndicatorResult.OK) {
    indicatorRegistry.printIndicatorMessage(IS_SAME_MAJOR_VERSION, isSameMajorVersion);
    return;
  }

  const isSameMinorVersion = indicatorRegistry.evaluateIndicator(IS_SAME_MINOR_VERSION, latest, current);
  indicatorRegistry.printIndicatorMessage(IS_SAME_MINOR_VERSION, isSameMinorVersion);
}

function analizeTimeSinceLastRelease(library: Library) {
  const wasReleasedInLastThreeMonths = indicatorRegistry.evaluateIndicator(
    WAS_RELEASED_IN_LAST_THREE_MONTHS,
    library.lastVersionDate
  );

  if (wasReleasedInLastThreeMonths === IndicatorResult.OK) return;

  const wasReleasedInLastYear = indicatorRegistry.evaluateIndicator(
    WAS_RELEASED_IN_LAST_YEAR,
    library.lastVersionDate
  );

  if (wasReleasedInLastYear === IndicatorResult.OK) {
    indicatorRegistry.printIndicatorMessage(WAS_RELEASED_IN_LAST_THREE_MONTHS, wasReleasedInLastThreeMonths);
    return;
  }
  indicatorRegistry.printIndicatorMessage(WAS_RELEASED_IN_LAST_YEAR, wasReleasedInLastYear);
}

function analyzeReleaseFrequency(library: Library) {
  const isReleasedFrequently = indicatorRegistry.evaluateIndicator(IS_RELEASED_FREQUENTLY, library.releaseFrequency);
  if (isReleasedFrequently === IndicatorResult.OK) return;

  indicatorRegistry.printIndicatorMessage(IS_RELEASED_FREQUENTLY, isReleasedFrequently);
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
