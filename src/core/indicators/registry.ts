import { printRed, printYellow } from "../../util/utilityFunctions";
import { ExecutionContext } from "../ctx/executionContext";
import { Indicator, IndicatorStatus } from "./indicator.types";
import { isReleasedFrequently, wasReleasedInLastThreeMonths, wasReleasedInLastYear } from "./releaseIndicators";
import {
  isLastVersionIndicator,
  isSameMajorVersionIndicator,
  isSameMinorVersionIndicator,
} from "./versionIndicators";

export class IndicatorsRegistry {
  private indicators = new Map<string, Indicator>();
  private ctx: ExecutionContext;

  constructor(ctx: ExecutionContext) {
    this.ctx = ctx;
  }

  register(indicator: Indicator) {
    this.indicators.set(indicator.name, indicator);
  }

  evaluateIndicator(name: string) {
    const indicator = this.indicators.get(name);
    if (!indicator) return;
    return indicator.evaluate(this.ctx.library);
  }

  printIndicatorMessage(name: string, result: IndicatorStatus) {
    const indicator = this.indicators.get(name);
    if (!indicator) return;
    if(result === IndicatorStatus.WARNING) {
      printYellow(indicator.message);
      return;
    }
    if(result === IndicatorStatus.ALERT) {
      printRed(indicator.message);
    }
  }
}


export function buildRegistry(ctx: ExecutionContext) {
  const registry = new IndicatorsRegistry(ctx);
  registry.register(isLastVersionIndicator);
  registry.register(isSameMajorVersionIndicator);
  registry.register(isSameMinorVersionIndicator);
  registry.register(wasReleasedInLastYear);
  registry.register(wasReleasedInLastThreeMonths);
  registry.register(isReleasedFrequently);
  return registry;
}
