import { EvaluationExecutor } from "../../../src/core/executor/executor";
import { ResultsStore } from "../../../src/core/executor/resultsStore";
import { IndicatorsRegistry } from "../../../src/core/registry/registry";
import { BuilderDirector } from "../../../src/models/builderDirector";
import { Library } from "../../../src/models/library";

const libraries: Library[] = [
  {
    name: "test",
    usedVersion: "1.0.0",
    sourceStatus: new Map(),
  },
  {
    name: "test2",
    usedVersion: "2.0.0",
    sourceStatus: new Map(),
  },
];

describe("executor", () => {
  const createExecutor = () => {
    const registry = new IndicatorsRegistry();
    registry.setIndicatorsToEvaluate(["indicator-test"]);
    const builderDir = new BuilderDirector();
    const ctx = { showResults: jest.fn(), showError: jest.fn() };
    return new EvaluationExecutor(registry, libraries, builderDir, ctx);
  };

  it("should call the getter for desired indicators in the registry", async () => {
    const executor = createExecutor();
    const spy = jest.spyOn(executor.registry, "desiredIndicators", "get");
    await executor.analyzeLibraries();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should call the evaluateIndicators method once for each library", async () => {
    const executor = createExecutor();
    const spy = jest.spyOn(executor, "evaluateIndicators");
    await executor.analyzeLibraries();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should call the showResults method of the context once per result", () => {
    const executor = createExecutor();
    const results: ResultsStore = new ResultsStore(libraries[0]);
    executor.results.set("test", results);
    const spy = executor.ctx.showResults;
    executor.showResults();
    expect(spy).toHaveBeenCalled();
  });
});
