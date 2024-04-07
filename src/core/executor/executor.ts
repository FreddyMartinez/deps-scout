import { Library } from "../../models/library";
import { printGreen } from "../../util/utilityFunctions";
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
  libraries: Library[];
  executionStatus: ExecutionStatus;

  constructor(registry: IndicatorsRegistry) {
    this.registry = registry;
  }

  setLibraries(libraries: Library[]) {
    this.libraries = libraries;
  }

  evaluate() {
    this.ctx = new ConsoleExecutionContext();
    for (const library of this.libraries) {
      printGreen(`Analyzing library: ${library.name}`);  
      const result = new ResultsStore(library);
      this.registry.setResultsStore(result);
      this.registry.evaluateIndicators();
      this.ctx.showResults(result);
    }
  }
}
