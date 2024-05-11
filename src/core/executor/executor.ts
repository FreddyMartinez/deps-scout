import { BuilderDirector } from "../../models/builderDirector";
import { Library } from "../../models/library";
import { logErrors } from "../../util/utilityFunctions";
import { ConsoleExecutionContext, ExecutionContext } from "../ctx/executionContext";
import { IndicatorsRegistry } from "../registry/registry";
import { ResultsStore } from "./resultsStore";

export enum ExecutionStatus {
  CONTINUE = "CONTINUE",
  STOP = "STOP",
}

export class EvaluationExecutor {
  ctx: ExecutionContext;
  registry: IndicatorsRegistry;
  builderDir: BuilderDirector;
  libraries: Library[];
  results = new Map<string, ResultsStore>();

  constructor(registry: IndicatorsRegistry, libraries: Library[], builderDir: BuilderDirector) {
    this.registry = registry;
    this.libraries = libraries;
    this.builderDir = builderDir;
    this.ctx = new ConsoleExecutionContext();
  }

  async analizeLibraries() {
    await Promise.all(
      this.libraries.map((lib) => this.evaluateIndicators(lib))
    );
  }

  showResults() {
    for (const result of this.results.values()) {
      this.ctx.showResults(result);
    }
  }

  async evaluateIndicators(library: Library) {
    const results = new ResultsStore(library);
    for (const indicator of this.registry.desiredIndicators) {
      const params = this.registry.getIndicatorParams(indicator);
      if (!params) continue;
      // check if library has required params, if not, use the builder/director to add them
      try {
        for(const param of params) {
          if (!library[param]) {
            await this.builderDir.buildLibrary(param, library);
          }
        }
      } catch (error) {
        logErrors(error);
        break;
      }
      const result = this.registry.evaluateIndicator(indicator, results);
      if (this.registry.meetsStopConditions(indicator, result.status, results)) break;
    }
    this.results.set(library.name, results);
  }
}
