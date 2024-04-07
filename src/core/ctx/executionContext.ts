import { printRed, printYellow } from "../../util/utilityFunctions";
import { ResultsStore } from "../executor/resultsStore";
import { IndicatorStatus } from "../indicators/indicators.types";

export interface ExecutionContext {
  showResults: (results: ResultsStore) => void;
}

export class ConsoleExecutionContext implements ExecutionContext {
  printConsoleIndicatorResult(results: ResultsStore, indicatorName: string) {
    const result = results.getIndicatorResult(indicatorName);
    if (result.status === IndicatorStatus.WARNING) {
      printYellow(result.value.message);
      return;
    }
    if (result.status === IndicatorStatus.ALERT) {
      printRed(result.value.message);
    }
  }

  showResults(results: ResultsStore) {
    for (const indicator of results.keys) {
      this.printConsoleIndicatorResult(results, indicator);
    }
  }
}
