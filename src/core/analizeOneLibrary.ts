import { libraryBuilder } from "../models/libraryBuilder";
import { analyzeLibraries } from "./analizeLibraries";

export async function analyzeOneLibrary(lib: string, version?: string) {
  const libInstance = await libraryBuilder.buildLibraryInstance(lib, version);

  if (!libInstance) return;
  await analyzeLibraries([libInstance]);
  console.log(libInstance);
}

