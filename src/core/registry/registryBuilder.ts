import { readScoutConfig } from "./readConfig";
import { isDowloadedFrecuentlyIndicator, isStarredLibraryIndicator } from "../indicators/popularityIndicators";
import { isReleasedFrequently, wasReleasedRecently } from "../indicators/releaseIndicators";
import {
  isLastVersionIndicator,
  isSameMajorVersionIndicator,
  isSameMinorVersionIndicator,
} from "../indicators/versionIndicators";
import { IndicatorsRegistry } from "./registry";
import { ThresholdsConfig } from "./config.types";

function applyThresholds(thresholds: ThresholdsConfig, registry: IndicatorsRegistry) {
  Object.keys(thresholds).forEach((indicatorName) => {
    const threshold = thresholds[indicatorName];
    registry.setIndicatorThreshold(indicatorName, threshold);
  });
}

export async function buildRegistry() {
  const config = await readScoutConfig();
  const registry = new IndicatorsRegistry();
  registry.setIndicatorsToEvaluate(config.indicators);
  registry.register(isLastVersionIndicator);
  registry.register(isSameMajorVersionIndicator);
  registry.register(isSameMinorVersionIndicator);
  registry.register(wasReleasedRecently);
  registry.register(isReleasedFrequently);
  registry.register(isDowloadedFrecuentlyIndicator);
  registry.register(isStarredLibraryIndicator);
  config.thresholds && applyThresholds(config.thresholds, registry);
  return registry;
}
