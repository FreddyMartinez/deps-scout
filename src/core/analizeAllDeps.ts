import { Library } from "../models/library";
import { readFileAsync } from "../util/readFileAsync";
import { analyzeLibraries } from "./analizeLibraries";

/**
 * Returns the dependencies and their versions
 * @returns a record with the dependencies of the project
 */
async function getProjectDeps() {
  const packageJson = await readFileAsync("./package.json", "utf8");
  const parsedPackageJson = JSON.parse(packageJson);
  const dependencies = parsedPackageJson.dependencies;
  const devDependencies = parsedPackageJson.devDependencies;
  return { ...dependencies, ...devDependencies } as Record<string, string>;
}

export async function analyzeAllDeps() {
  try {
    // refactor this to support different languages and registries
    const dependencies = await getProjectDeps();
    const libNames = Object.keys(dependencies);
    const libInstances = libNames.map((lib) => ({
      name: lib,
      usedVersion: dependencies[lib],
    } as Library));

    await analyzeLibraries(libInstances);
    console.table(libInstances);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
