import { readFile } from "fs";
import { messages } from "./constants";

function readPackageJsonFile() {
  return new Promise<string>((resolve, reject) => {
    readFile("./package.json", "utf8", (err, data) => {
      if (err) {
        reject(Error(messages.noPackageJson));
      } else {
        resolve(data);
      }
    });
  });
}

export async function getProjectDeps() {
  const packageJson = await readPackageJsonFile();
  const parsedPackageJson = JSON.parse(packageJson);
  const dependencies = parsedPackageJson.dependencies;
  const devDependencies = parsedPackageJson.devDependencies;
  return { ...dependencies, ...devDependencies } as Record<string, string>;
}
