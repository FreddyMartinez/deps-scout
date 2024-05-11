import { readFileAsync } from "../util/readFileAsync";

/**
 * Returns the dependencies and their versions
 * @TODO: add support for different languages
 * @returns a record with the dependencies of the project
 */
export async function getProjectDeps() {
  const packageJson = await readFileAsync("./package.json", "utf8");
  const parsedPackageJson = JSON.parse(packageJson);
  const allDeps = {
    ...parsedPackageJson.dependencies,
    ...parsedPackageJson.devDependencies,
  } as Record<string, string>;
  for (const dep in allDeps) {
    allDeps[dep] = allDeps[dep].replace("^", "").replace("~", "");
  }
  return allDeps;
}

