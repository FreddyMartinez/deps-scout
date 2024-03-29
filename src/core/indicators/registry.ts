import { ExecutionContext } from "../ctx/executionContext";
import { Indicator, IndicatorStatus } from "./indicator.types";
import { isReleasedFrequently, wasReleasedRecently } from "./releaseIndicators";
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
    if (!indicator) return { status: IndicatorStatus.NOT_FOUND };
    const result = indicator.evaluate(this.ctx.library);
    this.ctx.setIndicatorResult(name, result);
    return result;
  }

  printIndicatorMessage(name: string) {
    this.ctx.printIndicatorResult(name);
  }
}


export function buildRegistry(ctx: ExecutionContext) {
  const registry = new IndicatorsRegistry(ctx);
  registry.register(isLastVersionIndicator);
  registry.register(isSameMajorVersionIndicator);
  registry.register(isSameMinorVersionIndicator);
  registry.register(wasReleasedRecently);
  registry.register(isReleasedFrequently);
  registry.register(isDowloadedFrecuentlyIndicator);
  registry.register(isStarredLibraryIndicator);
  return registry;
}
