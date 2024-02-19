import { analyzeAllDeps, analyzeOneLibrary } from "./core";
import { argv } from "process";

async function scanDeps() {
  if(argv.length > 2) {
    const dependecy = argv[2];
    const depVersion = argv[3];

    analyzeOneLibrary(dependecy, depVersion);
    return;
  }
  analyzeAllDeps();
}

scanDeps();
