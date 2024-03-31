import { readScoutConfig } from "./readConfig";
import { ExecutionContext } from "../ctx/executionContext";
import { isDowloadedFrecuentlyIndicator, isStarredLibraryIndicator } from "../indicators/popularityIndicators";
import { isReleasedFrequently, wasReleasedRecently } from "../indicators/releaseIndicators";
import {
  isLastVersionIndicator,
  isSameMajorVersionIndicator,
  isSameMinorVersionIndicator,
} from "../indicators/versionIndicators";
import { IndicatorsRegistry } from "./registry";

export async function buildRegistry(ctx: ExecutionContext) {
  const config = await readScoutConfig();
  const registry = new IndicatorsRegistry(ctx);
  registry.setIndicatorsToEvaluate(config.indicators);
  registry.register(isLastVersionIndicator);
  registry.register(isSameMajorVersionIndicator);
  registry.register(isSameMinorVersionIndicator);
  registry.register(wasReleasedRecently);
  registry.register(isReleasedFrequently);
  registry.register(isDowloadedFrecuentlyIndicator);
  registry.register(isStarredLibraryIndicator);
  return registry;
}
