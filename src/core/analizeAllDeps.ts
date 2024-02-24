import { libraryBuilder } from "./libraryBuilder";
import { getProjectDeps } from "../util/readDeps";

export async function analyzeAllDeps() {
  try {
    const dependencies = await getProjectDeps();
    const libNames = Object.keys(dependencies);
    const libInstances = await Promise.all(libNames.map(libraryBuilder.buildLibraryInstance));
    console.table(libInstances);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
