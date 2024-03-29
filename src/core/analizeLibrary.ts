import { libraryBuilder } from "../models/libraryBuilder";
import { Library } from "../models/library";
import { printGreen } from "../util/utilityFunctions";
import {
  IS_DOWNLOADED_FREQUENTLY,
  IS_LAST_VERSION,
  IS_RELEASED_FREQUENTLY,
  IS_SAME_MAJOR_VERSION,
  IS_SAME_MINOR_VERSION,
  IS_STARRED_REPO,
  WAS_RELEASED_RECENTLY,
} from "./indicators/indicatorsNames";
import { buildRegistry } from "./indicators/registry";
import { ConsoleExecutionContext } from "./ctx/executionContext";

export async function analyzeOneLibrary(lib: string, version?: string) {
  const libInstance = await libraryBuilder.buildLibraryInstance(lib, version);

  if (!libInstance) return;
  analyzeLibrary(libInstance);
  console.log(libInstance);
}

export function analyzeLibrary(library: Library) {
  printGreen(`Analyzing library: ${library.name}`);

  const executionContext = new ConsoleExecutionContext(library);
  const indicatorRegistry = buildRegistry(executionContext);

  // is same version?
  indicatorRegistry.evaluateIndicator(IS_LAST_VERSION);
  indicatorRegistry.evaluateIndicator(IS_SAME_MAJOR_VERSION);
  indicatorRegistry.evaluateIndicator(IS_SAME_MINOR_VERSION);
  // time since last release
  indicatorRegistry.evaluateIndicator(WAS_RELEASED_RECENTLY);
  // release frequency
  indicatorRegistry.evaluateIndicator(IS_RELEASED_FREQUENTLY);
  // is it a popular library?
  indicatorRegistry.evaluateIndicator(IS_DOWNLOADED_FREQUENTLY);
  indicatorRegistry.evaluateIndicator(IS_STARRED_REPO);
}
