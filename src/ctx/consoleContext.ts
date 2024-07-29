import {
  printBgRed,
  printTitle,
  printPurple,
  printRed,
  printYellow,
} from "../util/utilityFunctions";
import { ResultsStore } from "../core/executor/resultsStore";
import { IndicatorStatus } from "../core/indicators/indicators.types";
import { ExecutionContext } from "./context";

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

  showResults(results: Map<string, ResultsStore>) {
    for (const result of results.values()) {
      this.showIndicatorResults(result);
    }
  }

  private showIndicatorResults(results: ResultsStore) {
    printTitle(`Analysis result for library: ${results.library.name}`);
    for (const indicator of results.keys) {
      this.printConsoleIndicatorResult(results, indicator);
    }
    if (results.evaluationStopReason) {
      printPurple(`Evaluation was stopped: ${results.evaluationStopReason}`);
    }
  }

  showError(error: unknown) {
    if (error instanceof Error) printBgRed(error.message);
  }
}
