import { asyncExec } from "../util/asyncExec";
import { npmDownloadsBaseUrl } from "../util/constants";
import { httpGet } from "../util/httpGet";
import { logErrors } from "../util/utilityFunctions";

export async function getNpmData(libName: string) {
  try {
    const depData = await asyncExec(`npm show ${libName} --json`);
    return JSON.parse(depData) as NpmData;
  } catch (e) { 
    throw new Error(`Error getting npm data for ${libName}`);
  }
}

const npmDownloadsUrl = (libName: string) => `${npmDownloadsBaseUrl}${libName}`;

export async function getNpmDownloads(libName: string) {
  try {
    const downloads = await httpGet(npmDownloadsUrl(libName));
    return JSON.parse(downloads) as NpmDownloads;
  } catch (e) {
    logErrors(e);
  }
}
