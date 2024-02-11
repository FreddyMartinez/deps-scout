import { analyzeAllDeps, analyzeLibrary } from "./core";
import { argv } from "process";

async function scanDeps() {
  if(argv.length > 2) {
    const dependecy = argv[2];
    analyzeLibrary(dependecy);
    return;
  }
  analyzeAllDeps();
}

scanDeps();
