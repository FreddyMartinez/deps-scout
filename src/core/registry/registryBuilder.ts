import { readScoutConfig } from "./readConfig";
import {
  isDowloadedFrecuentlyIndicator,
  isStarredLibraryIndicator,
} from "../indicators/popularityIndicators";
import {
  isLongLivingProject,
  isReleasedFrequently,
  wasReleasedRecently,
} from "../indicators/releaseIndicators";
import {
  isLastVersionIndicator,
  isSameMajorVersionIndicator,
  isSameMinorVersionIndicator,
} from "../indicators/versionIndicators";
import { IndicatorsRegistry } from "./registry";
import { ThresholdsConfig } from "./config.types";
import { isHealthyRepoIndicator } from "../indicators/healtIndicator";
import {
  hasEnoughObservers,
  hasForks,
  hasOpenIssues,
  isOwnerType,
} from "../indicators/repoActivityIndicators";

function applyThresholds(
  thresholds: ThresholdsConfig,
  registry: IndicatorsRegistry
) {
  Object.keys(thresholds).forEach((indicatorName) => {
    const threshold = thresholds[indicatorName];
    registry.setIndicatorThreshold(indicatorName, threshold);
  });
}

export async function buildRegistry() {
  const config = await readScoutConfig();
  const registry = new IndicatorsRegistry();
  registry.register(isLastVersionIndicator);
  registry.register(isSameMajorVersionIndicator);
  registry.register(isSameMinorVersionIndicator);
  registry.register(wasReleasedRecently);
  registry.register(isReleasedFrequently);
  registry.register(isDowloadedFrecuentlyIndicator);
  registry.register(isLongLivingProject);
  registry.register(isStarredLibraryIndicator);
  registry.register(hasEnoughObservers);
  registry.register(hasForks);
  registry.register(hasOpenIssues);
  registry.register(isOwnerType);
  registry.register(isHealthyRepoIndicator);
  registry.setIndicatorsToEvaluate(config.indicators);
  registry.setStopConditions(config.conditions);
  config.thresholds && applyThresholds(config.thresholds, registry);
  return registry;
}
