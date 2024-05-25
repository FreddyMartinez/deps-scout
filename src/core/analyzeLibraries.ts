import { Library } from "../models/library";
import { buildRegistry } from "./registry/registryBuilder";
import { EvaluationExecutor } from "./executor/executor";
import { createBuilderDirector } from "../models/builderDirector.builder";
import { getProjectDeps } from "./getProjectDeps";

async function analyzeLibraries(libraries: Library[], language: string = "javascript") {
  const indicatorRegistry = await buildRegistry();
  const builderDir = createBuilderDirector(language);
  const executor = new EvaluationExecutor(indicatorRegistry, libraries, builderDir);
  await executor.analyzeLibraries();
  executor.showResults();
}

export async function analyzeOneLibrary(language: string, lib: string, version?: string) {
  const library: Library = {
    name: lib,
    usedVersion: version,
    sourceStatus: new Map(),
  };

  await analyzeLibraries([library], language);
  console.log(library);
}

export async function analyzeAllDeps(language: string) {
  try {
    // refactor this to support different languages and registries
    const dependencies = await getProjectDeps();
    const libNames = Object.keys(dependencies);
    const libInstances: Library[] = libNames.map((lib) => ({
      name: lib,
      usedVersion: dependencies[lib],
      sourceStatus: new Map(),
    }));

    await analyzeLibraries(libInstances, language);

    for (const lib of libInstances) {
      delete lib.sourceStatus;
    }
    console.table(libInstances);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}

