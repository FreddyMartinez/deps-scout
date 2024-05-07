import { Library } from "../models/library";
import { analyzeLibraries } from "./analizeLibraries";

export async function analyzeOneLibrary(lib: string, version?: string) {
  const library: Library = {
    name: lib,
    usedVersion: version,
  };

  await analyzeLibraries([library]);
  console.log(library);
}

