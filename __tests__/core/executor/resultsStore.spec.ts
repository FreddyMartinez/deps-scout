import { ResultsStore } from "../../../src/core/executor/resultsStore";
import { IndicatorStatus } from "../../../src/core/indicators/indicators.types";

const library = {
  name: "test",
  usedVersion: "1.0.0",
  sourceStatus: new Map(),
};

describe("ResultsStore", () => {
  it("should store the results of an indicator", () => {
    const resultsStore = new ResultsStore(library);
    const indicatorResult = {
      status: IndicatorStatus.OK,
      value: { message: "Indicator test", score: 1 },
    };
    resultsStore.setIndicatorResult("test", indicatorResult);
    expect(resultsStore.getIndicatorResult("test")).toEqual(indicatorResult);
  });
});
