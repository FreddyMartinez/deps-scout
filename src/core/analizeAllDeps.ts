import { libraryBuilder } from "../models/libraryBuilder";
import { readFileAsync } from "../util/readFileAsync";
import { analyzeLibraries } from "./analizeLibraries";

async function getProjectDeps() {
  const packageJson = await readFileAsync("./package.json", "utf8");
  const parsedPackageJson = JSON.parse(packageJson);
  const dependencies = parsedPackageJson.dependencies;
  const devDependencies = parsedPackageJson.devDependencies;
  return { ...dependencies, ...devDependencies } as Record<string, string>;
}

export async function analyzeAllDeps() {
  try {
    const dependencies = await getProjectDeps();
    const libNames = Object.keys(dependencies);
    const libInstances = await Promise.all(
      libNames.map((lib) => libraryBuilder.buildLibraryInstance(lib))
    );
    await analyzeLibraries(libInstances);
    console.table(libInstances);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
