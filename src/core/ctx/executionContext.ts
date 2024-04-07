import { Library } from "../../models/library";
import { printRed, printYellow } from "../../util/utilityFunctions";
import {
  IndicatorResult,
  IndicatorStatus,
} from "../indicators/indicators.types";

export enum ExecutionStatus {
  CONTINUE = "CONTINUE",
  STOP = "STOP",
}

export interface ExecutionContext {
  library: Library;
  executionStatus: ExecutionStatus;
  setIndicatorResult: (indicatorName: string, result: unknown) => void;
  getIndicatorResult: (indicatorName: string) => IndicatorResult | undefined;
  showResults: () => void;
}

export class ConsoleExecutionContext implements ExecutionContext {
  private lib: Library;
  private results = new Map<string, IndicatorResult>();
  executionStatus: ExecutionStatus;

  constructor(library: Library) {
    this.lib = library;
  }

  get library() {
    return this.lib;
  }

  setIndicatorResult(name: string, result: IndicatorResult) {
    this.results.set(name, result);
  }

  getIndicatorResult(name: string) {
    return this.results.get(name);
  }

  printIndicatorResult(indicatorName: string) {
    const result = this.results.get(indicatorName);
    if (result.status === IndicatorStatus.WARNING) {
      printYellow(result.value.message);
      return;
    }
    if (result.status === IndicatorStatus.ALERT) {
      printRed(result.value.message);
    }
  }

  showResults() {
    for (const indicator of this.results.keys()) {
      this.printIndicatorResult(indicator);
    }
  }
}
