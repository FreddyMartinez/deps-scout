import { libraryBuilder } from "../models/libraryBuilder";
import { Library } from "../models/library";
import { printGreen, printRed, printYellow } from "../util/utilityFunctions";
import { IndicatorStatus } from "./indicators/indicator.types";
import {
  IS_LAST_VERSION,
  IS_RELEASED_FREQUENTLY,
  IS_SAME_MAJOR_VERSION,
  IS_SAME_MINOR_VERSION,
  WAS_RELEASED_RECENTLY,
} from "./indicators/indicatorsNames";
import { IndicatorsRegistry, buildRegistry } from "./indicators/registry";
import { ConsoleExecutionContext } from "./ctx/executionContext";

export async function analyzeOneLibrary(lib: string, version?: string) {
  const libInstance = await libraryBuilder.buildLibraryInstance(lib);

  if (!libInstance) return;
  analyzeLibrary(libInstance, version);
  console.log(libInstance);
}

export function analyzeLibrary(library: Library, usedVersion?: string) {
  printGreen(`Analyzing library: ${library.name}`);

  const executionContext = new ConsoleExecutionContext(library);
  const indicatorRegistry = buildRegistry(executionContext);

  // is same version?
  if (usedVersion) {
    analyzeVersion(indicatorRegistry);
  }

  // time since last release
  analizeTimeSinceLastRelease(indicatorRegistry);
  // release frequency
  analyzeReleaseFrequency(indicatorRegistry);
  // is it a popular library?
  analyzePopularity(library);
}

function analyzeVersion(indicatorRegistry: IndicatorsRegistry) {
  const isLastVersion =
    indicatorRegistry.evaluateIndicator(IS_LAST_VERSION).status;

  if (isLastVersion === IndicatorStatus.OK) return;

  indicatorRegistry.printIndicatorMessage(IS_LAST_VERSION);

  const isSameMajorVersion = indicatorRegistry.evaluateIndicator(
    IS_SAME_MAJOR_VERSION
  ).status;

  if (isSameMajorVersion !== IndicatorStatus.OK) {
    indicatorRegistry.printIndicatorMessage(IS_SAME_MAJOR_VERSION);
    return;
  }

  indicatorRegistry.evaluateIndicator(IS_SAME_MINOR_VERSION);
  indicatorRegistry.printIndicatorMessage(IS_SAME_MINOR_VERSION);
}

function analizeTimeSinceLastRelease(indicatorRegistry: IndicatorsRegistry) {
  indicatorRegistry.evaluateIndicator(WAS_RELEASED_RECENTLY).status;
  indicatorRegistry.printIndicatorMessage(WAS_RELEASED_RECENTLY);
}

function analyzeReleaseFrequency(indicatorRegistry: IndicatorsRegistry) {
  indicatorRegistry.evaluateIndicator(IS_RELEASED_FREQUENTLY);
  indicatorRegistry.printIndicatorMessage(IS_RELEASED_FREQUENTLY);
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
