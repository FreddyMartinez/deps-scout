import { asyncExec } from "../util/asyncExec";

export async function getNpmData(libName: string) {
  const depData = await asyncExec(`npm show ${libName} --json`);
  return JSON.parse(depData) as npmData;
}
