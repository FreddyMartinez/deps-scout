import { libraryBuilder } from "../models/libraryBuilder";
import { Library } from "../models/library";
import { printGreen } from "../util/utilityFunctions";
import { buildRegistry } from "./registry/registryBuilder";
import { ConsoleExecutionContext } from "./ctx/executionContext";

export async function analyzeOneLibrary(lib: string, version?: string) {
  const libInstance = await libraryBuilder.buildLibraryInstance(lib, version);

  if (!libInstance) return;
  await analyzeLibrary(libInstance);
  console.log(libInstance);
}

export async function analyzeLibrary(library: Library) {
  printGreen(`Analyzing library: ${library.name}`);

  const executionContext = new ConsoleExecutionContext(library);
  const indicatorRegistry = await buildRegistry(executionContext);

  indicatorRegistry.evaluateIndicators();
}
