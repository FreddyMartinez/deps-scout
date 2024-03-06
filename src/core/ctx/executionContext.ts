import { Library } from "../../models/library";

export enum ExecutionStatus {
  CONTINUE = "CONTINUE",
  STOP = "STOP",
}

export interface ExecutionContext {
  library: Library;
  executionStatus: ExecutionStatus;
  setIndicatorResult: (indicatorName: string, result: unknown) => void;
  showResults: () => void;
}

export class ConsoleExecutionContext implements ExecutionContext {
  private lib: Library;
  private results = new Map<string, unknown>();
  executionStatus: ExecutionStatus;

  constructor(library: Library) {
    this.lib = library;
  }

  get library() {
    return this.lib;
  }

  setIndicatorResult(name: string, result: unknown) {
    this.results.set(name, result);
  }

  showResults() {
    // @TODO: implement
  }
}
