import { ResultsStore } from "../executor/resultsStore";
import {
  Indicator,
  IndicatorPrecondition,
  IndicatorStatus,
  IndicatorThresholds,
} from "../indicators/indicators.types";
import { StopConditions } from "./config.types";

export class IndicatorsRegistry {
  private indicators = new Map<string, Indicator>();
  private resultStore: ResultsStore;
  private indicatorsToEvaluate: string[];
  private stopConditions?: StopConditions;

  register(indicator: Indicator) {
    this.indicators.set(indicator.name, indicator);
  }

  setIndicatorsToEvaluate(indicators: string[]) {
    if (!indicators || indicators.length === 0) {
      this.indicatorsToEvaluate = Array.from(this.indicators.keys());
      return;
    }

    this.indicatorsToEvaluate = indicators;
  }

  get desiredIndicators() {
    return this.indicatorsToEvaluate;
  }

  setStopConditions(conditions: StopConditions) {
    this.stopConditions = conditions;
  }

  setIndicatorThreshold(indicatorName: string, thresholds: IndicatorThresholds) {
    const indicator = this.indicators.get(indicatorName);
    if (!indicator) return;

    indicator.setThresholds?.(thresholds);
  }

  setResultsStore(results: ResultsStore) {
    this.resultStore = results;
  }

  evaluateIndicator(name: string) {
    const indicator = this.indicators.get(name);
    if (!indicator) return { status: IndicatorStatus.NOT_FOUND };

    const shouldEvaluate = this.meetsPreconditions(indicator.preconditions);
    if (!shouldEvaluate) return; 

    const result = indicator.evaluate(this.resultStore.library);
    this.resultStore.setIndicatorResult(name, result);
    return result;
  }

  private meetsPreconditions(preconditions: IndicatorPrecondition[]) {
    if(!preconditions) return true;

    for (const precondition of preconditions) {
      const result =
        this.resultStore.getIndicatorResult(precondition.metricName) ||
        this.evaluateIndicator(precondition.metricName);
      if (result.status != precondition.status) {
        return false;
      }
    }
    return true;
  }

  meetsStopConditions(indicator: string, status: IndicatorStatus) {
    if (!this.stopConditions) return false;

    if (
      typeof this.stopConditions.maxAlerts === "number" &&
      this.resultStore.alerts > this.stopConditions.maxAlerts
    ) {
      return true;
    }

    if (
      !!this.stopConditions.shallNotAlert &&
      this.stopConditions.shallNotAlert.includes(indicator) &&
      status === IndicatorStatus.ALERT
    ) {
      return true;
    }

    if (
      !!this.stopConditions.mustBeOk &&
      this.stopConditions.mustBeOk.includes(indicator) &&
      status !== IndicatorStatus.OK
    ) {
      return true;
    }

    return false;
  }
}
