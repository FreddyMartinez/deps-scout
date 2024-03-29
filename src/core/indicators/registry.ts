import { ExecutionContext } from "../ctx/executionContext";
import { Indicator, IndicatorPrecondition, IndicatorStatus } from "./indicator.types";
import { isDowloadedFrecuentlyIndicator, isStarredLibraryIndicator } from "./popularityIndicators";
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

    const shouldEvaluate = this.meetsPreconditions(indicator.preconditions);
    if (!shouldEvaluate) return; 

    const result = indicator.evaluate(this.ctx.library);
    this.ctx.setIndicatorResult(name, result);
    this.ctx.printIndicatorResult(name);
    return result;
  }

  private meetsPreconditions(preconditions: IndicatorPrecondition[]) {
    if(!preconditions) return true;

    for (const precondition of preconditions) {
      const result =
        this.ctx.getIndicatorResult(precondition.metricName) ||
        this.evaluateIndicator(precondition.metricName);
      if (result.status != precondition.status) {
        return false;
      }
    }
    return true;
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
