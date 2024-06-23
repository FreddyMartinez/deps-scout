import { ResultsStore } from "../../../src/core/executor/resultsStore";
import {
  Indicator,
  IndicatorStatus,
  IndicatorThresholds,
} from "../../../src/core/indicators/indicators.types";
import { StopConditions } from "../../../src/core/registry/config.types";
import { IndicatorsRegistry } from "../../../src/core/registry/registry";

const indicatorResult = {
  status: IndicatorStatus.OK,
  value: { message: "Indicator test", score: 1 },
};

const mockIndicator: Indicator = {
  name: "test",
  evaluate: () => ({ ...indicatorResult }),
  message: "Indicator test",
  parameters: ["repoName"],
};

const library = { name: "test", usedVersion: "1.0.0", sourceStatus: new Map() };

describe("registry", () => {
  const buildRegistry = () => {
    const registry = new IndicatorsRegistry();
    registry.register(mockIndicator);
    return registry;
  };

  it("should allow the register and evaluation of indicators", () => {
    const registry = buildRegistry();
    const resultsStore = new ResultsStore(library);
    const result = registry.evaluateIndicator(mockIndicator.name, resultsStore);
    expect(result).toEqual(indicatorResult);
    expect(resultsStore.getIndicatorResult(mockIndicator.name)).toEqual(
      indicatorResult
    );

    const notFoundIndicator = registry.evaluateIndicator(
      "not-found",
      resultsStore
    );
    expect(notFoundIndicator.status).toBe(IndicatorStatus.NOT_FOUND);
  });

  it("should verify if an indicator is evaluable", () => {
    const registry = buildRegistry();
    const evaluableIndicator: Indicator = {
      ...mockIndicator,
      name: "evaluable",
      preconditions: [
        { metricName: "previousIndicator", status: IndicatorStatus.WARNING },
      ],
    };
    const nonEvaluableIndicator: Indicator = {
      ...mockIndicator,
      name: "nonEvaluable",
      preconditions: [
        { metricName: "previousIndicator", status: IndicatorStatus.OK },
      ],
    };
    registry.register(evaluableIndicator);
    registry.register(nonEvaluableIndicator);
    // previous indicator result is stored in the resultsStore
    const resultsStore = new ResultsStore(library);
    resultsStore.setIndicatorResult("previousIndicator", {
      ...indicatorResult,
      status: IndicatorStatus.WARNING,
    });

    const spyEvaluate = jest.spyOn(registry, "evaluateIndicator");
    let result = registry.evaluateIndicator(
      evaluableIndicator.name,
      resultsStore
    );
    expect(result).toEqual(indicatorResult);
    expect(spyEvaluate).toHaveBeenCalledTimes(1);

    result = registry.evaluateIndicator(
      nonEvaluableIndicator.name,
      resultsStore
    );
    expect(result).toEqual({ status: IndicatorStatus.NON_EVALUABLE });
    expect(spyEvaluate).toHaveBeenCalledTimes(2);
  });

  it("should set the list of indicators the user wants to evaluate", () => {
    const registry = buildRegistry();
    const desiredIndicators = [mockIndicator.name];
    registry.setIndicatorsToEvaluate(desiredIndicators);
    expect(registry.desiredIndicators).toEqual(desiredIndicators);
  });

  it("should set all the indicators as desiredIndicators if user does not specify", () => {
    const registry = buildRegistry();
    const secondIndicator = { ...mockIndicator, name: "second" };
    registry.register(secondIndicator);

    registry.setIndicatorsToEvaluate(undefined);
    expect(registry.desiredIndicators).toEqual([
      mockIndicator.name,
      secondIndicator.name,
    ]);

    registry.setIndicatorsToEvaluate([]);
    expect(registry.desiredIndicators).toEqual([
      mockIndicator.name,
      secondIndicator.name,
    ]);
  });

  it("should return the required parameters for each indicator", () => {
    const registry = buildRegistry();

    expect(registry.getIndicatorParams(mockIndicator.name)).toBe(
      mockIndicator.parameters
    );
    expect(registry.getIndicatorParams("not-found")).toBeUndefined();
  });

  it("should set the stop conditions for the evaluation", () => {
    const registry = buildRegistry();
    const stopConditions: StopConditions = { maxAlerts: 1 };
    registry.setStopConditions(stopConditions);
    expect(registry["stopConditions"]).toEqual(stopConditions);
  });

  it("should set the thresholds defined by the user for the indicators", () => {
    const registry = buildRegistry();
    const indicatorWithThresholds: Indicator = {
      ...mockIndicator,
      name: "indicatorWithThresholds",
      setThresholds: jest.fn(),
    };
    registry.register(indicatorWithThresholds);

    const thresholds: IndicatorThresholds = {
      alertThreshold: 1,
      warningThreshold: 2,
    };
    registry.setIndicatorThreshold(indicatorWithThresholds.name, thresholds);
    expect(indicatorWithThresholds.setThresholds).toHaveBeenCalledWith(
      thresholds
    );
  });

  it("should evaluate the stop conditions", () => {
    const registry = buildRegistry();
    let stopConditions: StopConditions = { maxAlerts: 1 };
    registry.setStopConditions(stopConditions);

    const resultsStore = new ResultsStore(library);
    const res = registry.meetsStopConditions(
      "indicatorName",
      IndicatorStatus.OK,
      resultsStore
    );
    expect(res.stop).toBe(false);

    const alertResult = {
      ...indicatorResult,
      status: IndicatorStatus.ALERT,
    };
    resultsStore.setIndicatorResult("indicatorName", alertResult);

    const result = registry.meetsStopConditions(
      "indicatorName",
      alertResult.status,
      resultsStore
    );
    expect(result.stop).toBe(true);
    expect(result.condition).toBe("maxAlerts");

    stopConditions = { shallNotAlert: ["indicatorName"] };
    registry.setStopConditions(stopConditions);
    const result2 = registry.meetsStopConditions(
      "indicatorName",
      IndicatorStatus.ALERT,
      resultsStore
    );
    expect(result2.stop).toBe(true);
    expect(result2.condition).toBe("shallNotAlert");

    stopConditions = { mustBeOk: ["indicatorName"] };
    registry.setStopConditions(stopConditions);
    const result3 = registry.meetsStopConditions(
      "indicatorName",
      IndicatorStatus.WARNING,
      resultsStore
    );
    expect(result3.stop).toBe(true);
    expect(result3.condition).toBe("Indicator indicatorName must be ok");
  });
});
