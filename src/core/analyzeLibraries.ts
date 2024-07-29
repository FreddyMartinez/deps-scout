import { Library } from "../models/library";
import { buildRegistry } from "./registry/registryBuilder";
import { EvaluationExecutor } from "./executor/executor";
import { createBuilderDirector } from "../models/builderDirector.builder";
import { getProjectDeps } from "./getProjectDeps";
import { createContext } from "../ctx/context.builder";
import { spinner } from "../util/spinner";
import { printGreen } from "../util/utilityFunctions";

async function analyzeLibraries(libraries: Library[], language: string, context: string) {
  const timeout = spinner();
  const indicatorRegistry = await buildRegistry();
  const builderDir = createBuilderDirector(language);
  const ctx = createContext(context);
  const executor = new EvaluationExecutor(indicatorRegistry, libraries, builderDir, ctx);
  await executor.analyzeLibraries();
  clearInterval(timeout);
  await executor.showResults();
  printGreen("\nAnalysis completed \u2714");
}

export async function analyzeOneLibrary(language: string, context: string, lib: string, version?: string) {
  const library: Library = {
    name: lib,
    usedVersion: version,
    sourceStatus: new Map(),
  };

  await analyzeLibraries([library], language, context);
}

export async function analyzeAllDeps(language: string, context: string) {
  try {
    const dependencies = await getProjectDeps(language);
    const libNames = Object.keys(dependencies);
    const libInstances: Library[] = libNames.map((lib) => ({
      name: lib,
      usedVersion: dependencies[lib],
      sourceStatus: new Map(),
    }));

    await analyzeLibraries(libInstances, language, context);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}

