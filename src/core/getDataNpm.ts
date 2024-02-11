import { asyncExec } from "../util/asyncExec";
import { httpGet } from "../util/httpGet";

export async function getNpmData(libName: string) {
  const depData = await asyncExec(`npm show ${libName} --json`);
  return JSON.parse(depData) as npmData;
}

const npmDownloadsUrl = (libName: string) =>
  `https://api.npmjs.org/downloads/point/last-week/${libName}`;

export async function getNpmDownloads(libName: string) {
  try {
    const downloads = await httpGet(npmDownloadsUrl(libName));
    return JSON.parse(downloads) as npmDownloads;
  } catch (e) {
    return { downloads: 0, start: "", end: "", package: libName };
  }
}
