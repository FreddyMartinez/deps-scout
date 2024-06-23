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
  private indicatorsToEvaluate: string[];
  private stopConditions?: StopConditions;

  register(indicator: Indicator) {
    this.indicators.set(indicator.name, indicator);
  }

  setIndicatorsToEvaluate(indicators?: string[]) {
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

  setIndicatorThreshold(
    indicatorName: string,
    thresholds: IndicatorThresholds
  ) {
    const indicator = this.indicators.get(indicatorName);
    if (!indicator) return;

    indicator.setThresholds?.(thresholds);
  }

  getIndicatorParams(name: string) {
    const indicator = this.indicators.get(name);
    if (!indicator) return;
    return indicator.parameters;
  }

  evaluateIndicator(name: string, resultStore: ResultsStore) {
    const indicator = this.indicators.get(name);
    if (!indicator) return { status: IndicatorStatus.NOT_FOUND };

    const shouldEvaluate = this.meetsPreconditions(
      indicator.preconditions,
      resultStore
    );
    if (!shouldEvaluate) return { status: IndicatorStatus.NON_EVALUABLE };

    const result = indicator.evaluate(resultStore.library);
    resultStore.setIndicatorResult(name, result);
    return result;
  }

  private meetsPreconditions(
    preconditions: IndicatorPrecondition[],
    resultStore: ResultsStore
  ) {
    if (!preconditions) return true;

    for (const precondition of preconditions) {
      const result =
        resultStore.getIndicatorResult(precondition.metricName) ||
        this.evaluateIndicator(precondition.metricName, resultStore);
      if (result.status != precondition.status) {
        return false;
      }
    }
    return true;
  }

  meetsStopConditions(
    indicator: string,
    status: IndicatorStatus,
    resultStore: ResultsStore
  ) {
    if (!this.stopConditions) return { stop: false };

    if (
      typeof this.stopConditions.maxAlerts === "number" &&
      resultStore.alerts >= this.stopConditions.maxAlerts
    ) {
      return { stop: true, condition: "maxAlerts" };
    }

    if (
      !!this.stopConditions.shallNotAlert &&
      this.stopConditions.shallNotAlert.includes(indicator) &&
      status === IndicatorStatus.ALERT
    ) {
      return { stop: true, condition: "shallNotAlert" };
    }

    if (
      !!this.stopConditions.mustBeOk &&
      this.stopConditions.mustBeOk.includes(indicator) &&
      status !== IndicatorStatus.OK
    ) {
      return { stop: true, condition: `Indicator ${indicator} must be ok` };
    }

    if (
      typeof this.stopConditions.maxWarnings === "number" &&
      resultStore.warnings >= this.stopConditions.maxWarnings
    ) {
      return { stop: true, condition: "maxWarnings" };
    }

    return { stop: false };
  }
}
