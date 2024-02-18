import { buildLibraryInstance } from ".";

export async function analyzeLibrary(lib: string) {
  const libInstance = await buildLibraryInstance(lib);
  
  if (!libInstance) return;
  console.log(libInstance);

}

