#!/usr/bin/env node
import { analyzeAllDeps, analyzeOneLibrary } from "./core";
import { argv } from "process";
import { showHelp } from "./util/utilityFunctions";
import { questions } from "./util/constants";
import { version } from "../package.json";

async function scanDeps() {
  if (argv.includes("-h") || argv.includes("--help")) {
    showHelp();
    return;
  }
  if (argv.includes("-v") || argv.includes("--version")) {
    console.log(version);
    return;
  }

  const inquirer = await import("inquirer");
  const prompt = inquirer.createPromptModule();
  const { lang } = await prompt<{ lang: string }>([questions.language]);

  /**
   * @TODO: Add support for different languages
   * "javascript" | "python" | "java" | "ruby" | "php" | "other";
   */
  if (lang !== "javascript") {
    console.log(
      `Sorry, only javascript is supported at the moment \u2639 , ${lang} support is on the way.`
    );
    return;
  }

  const { context } = await prompt<{ context: string }>([questions.context]);

  if (argv.length > 2) {
    const dependecy = argv[2];
    const depVersion = argv[3];

    console.log(`Analyzing ${dependecy} with version ${depVersion}`);

    analyzeOneLibrary(lang, context, dependecy, depVersion);
    return;
  }
  console.log("Analyzing all dependencies in the project");
  analyzeAllDeps(lang, context);
}

scanDeps();
