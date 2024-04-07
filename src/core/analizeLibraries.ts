import { Library } from "../models/library";
import { buildRegistry } from "./registry/registryBuilder";
import { EvaluationExecutor } from "./executor/executor";

export async function analyzeLibraries(libraries: Library[]) {
  const indicatorRegistry = await buildRegistry();
  const executor = new EvaluationExecutor(indicatorRegistry);
  executor.setLibraries(libraries);
  executor.evaluate();
}
