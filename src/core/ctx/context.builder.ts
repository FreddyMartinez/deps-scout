import { ConsoleExecutionContext } from "./executionContext";

export function createContext(context: string) {
  console.log(`Results will be displayed in ${context}`);
  return new ConsoleExecutionContext();
}