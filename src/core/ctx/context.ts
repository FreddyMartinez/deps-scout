import { ResultsStore } from "../executor/resultsStore";

export interface ExecutionContext {
  showResults: (results: Map<string, ResultsStore>, indicators?: string[]) => void | Promise<void>;
  showError: (error: unknown) => void;
}

