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

  constructor(registry: IndicatorsRegistry, libraries: Library[]) {
    this.registry = registry;
    this.libraries = libraries;
  }

  analizeLibraries() {
    this.ctx = new ConsoleExecutionContext();
    for (const library of this.libraries) {
      printGreen(`Analyzing library: ${library.name}`);  
      const result = new ResultsStore(library);
      this.registry.setResultsStore(result);
      this.evaluateIndicators();
      this.ctx.showResults(result);
    }
  }

  evaluateIndicators() {
    for (const indicator of this.registry.desiredIndicators) {
      // get indicator properties and check if available
      const result = this.registry.evaluateIndicator(indicator);
      if (this.registry.meetsStopConditions(indicator, result.status)) break;
    }
  }
}
