import { ExecutionContext } from "../ctx/executionContext";
import { Indicator, IndicatorPrecondition, IndicatorStatus } from "../indicators/indicator.types";

export class IndicatorsRegistry {
  private indicators = new Map<string, Indicator>();
  private ctx: ExecutionContext;
  private indicatorsToEvaluate: string[];

  constructor(ctx: ExecutionContext) {
    this.ctx = ctx;
  }

  register(indicator: Indicator) {
    this.indicators.set(indicator.name, indicator);
  }

  setIndicatorsToEvaluate(indicators: string[]) {
    this.indicatorsToEvaluate = indicators;
  }

  evaluateIndicators() {
    if (!this.indicatorsToEvaluate || this.indicatorsToEvaluate.length === 0)
      this.indicatorsToEvaluate = Array.from(this.indicators.keys());

    for (const name of this.indicatorsToEvaluate) {
      this.evaluateIndicator(name);
    }
  }

  private evaluateIndicator(name: string) {
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
