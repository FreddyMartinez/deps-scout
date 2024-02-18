import { buildLibraryInstance } from ".";
import { getProjectDeps } from "../util/readDeps";

export async function analyzeAllDeps() {
  try {
    const dependencies = await getProjectDeps();
    const libNames = Object.keys(dependencies);
    const libInstances = await Promise.all(libNames.map(buildLibraryInstance));
    console.table(libInstances);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
