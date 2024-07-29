import { readFileAsync } from "../util/readFileAsync";

/**
 * Returns the dependencies and their versions
 * @returns a record with the dependencies of the project
 */
export async function getProjectDeps(language: string) {
  if (language === "javascript") {
    return await getJavascritDeps();
  }
  if (language === "java") {
    /** @TODO: add function to read Java deps */
  }
  throw new Error(`Language ${language} not supported`);
}

async function getJavascritDeps() {
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
