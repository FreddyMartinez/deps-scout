import { printRed, printYellow } from "../../util/utilityFunctions";
import { Indicator, IndicatorResult } from "./indicator.types";
import { isReleasedFrequently, wasReleasedInLastThreeMonths, wasReleasedInLastYear } from "./releaseIndicators";
import {
  isLastVersionIndicator,
  isSameMajorVersionIndicator,
  isSameMinorVersionIndicator,
} from "./versionIndicators";

class IndicatorsRegistry {
  private indicators = new Map<string, Indicator>();

  register(indicator: Indicator) {
    this.indicators.set(indicator.name, indicator);
  }

  evaluateIndicator(name: string, ...params: unknown[]) {
    const indicator = this.indicators.get(name);
    if (!indicator) return;
    return indicator.expression(...params);
  }

  printIndicatorMessage(name: string, result: IndicatorResult) {
    const indicator = this.indicators.get(name);
    if (!indicator) return;
    if(result === IndicatorResult.WARNING) {
      printYellow(indicator.message);
      return;
    }
    if(result === IndicatorResult.ALERT) {
      printRed(indicator.message);
    }
  }
}

const registry = new IndicatorsRegistry();
registry.register(isLastVersionIndicator);
registry.register(isSameMajorVersionIndicator);
registry.register(isSameMinorVersionIndicator);
registry.register(wasReleasedInLastYear);
registry.register(wasReleasedInLastThreeMonths);
registry.register(isReleasedFrequently);

export { registry as indicatorRegistry };
