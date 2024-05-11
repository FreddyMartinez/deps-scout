import { analyzeAllDeps, analyzeOneLibrary } from "./core";
import { argv } from "process";

async function scanDeps() {
  /**
   * @TODO: Add support for different languages
   * "javascript" | "python" | "java" | "ruby" | "php" | "other";
   */
  const lang = "javascript"; 

  if (argv.length > 2) {
    const dependecy = argv[2];
    const depVersion = argv[3];

    analyzeOneLibrary(lang, dependecy, depVersion);
    return;
  }
  analyzeAllDeps(lang);
}

scanDeps();
