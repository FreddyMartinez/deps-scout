import { libraryBuilder } from "../models/libraryBuilder";
import { Library } from "../models/library";
import { buildRegistry } from "./registry/registryBuilder";
import { EvaluationExecutor } from "./executor/executor";

export async function analyzeOneLibrary(lib: string, version?: string) {
  const libInstance = await libraryBuilder.buildLibraryInstance(lib, version);

  if (!libInstance) return;
  await analyzeLibraries([libInstance]);
  console.log(libInstance);
}

export async function analyzeLibraries(libraries: Library[]) {
  const indicatorRegistry = await buildRegistry();
  const executor = new EvaluationExecutor(indicatorRegistry);
  executor.setLibraries(libraries);
  executor.evaluate();
}
