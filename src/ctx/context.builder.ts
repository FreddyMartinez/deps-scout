import { HTML_FILE } from "../util/constants";
import { ConsoleExecutionContext } from "./consoleContext";
import { HtmlFileExecutionContext } from "./htmlContext";

export function createContext(context: string) {

  if(context === HTML_FILE) {
    return new HtmlFileExecutionContext();
  }
  return new ConsoleExecutionContext();
}