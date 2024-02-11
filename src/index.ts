import { asyncExec } from "./util/asyncExec";

async function getOutdatedPackages() {
  try {
    const packages = await asyncExec("npm outdated -l --depth=0 --json");
    const outdatedPackages = JSON.parse(packages);
    const packagesToUpdate = Object.keys(outdatedPackages);
    console.log(packagesToUpdate);
  } catch (error) {
    console.log(error);
  }
}

getOutdatedPackages();