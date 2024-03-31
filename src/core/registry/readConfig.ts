import { readFileAsync } from "../../util/readFileAsync";
import { ScoutConfig } from "./config.types";

const defaultConfig: ScoutConfig = {
  indicators: [
    "is-last-version",
    "is-same-major-version",
    "is-same-minor-version",
    "was-released-recently",
    "is-released-frequently",
    "is-downloaded-frequently",
    "is-starred-repo",
  ],
};

export async function readScoutConfig() {
  try {
    const configStr = await readFileAsync("./scout.config.json", "utf8");
    return JSON.parse(configStr) as ScoutConfig;
  } catch (error) {
    console.log("No scout.config.json found, using default config.");
    return defaultConfig;
  }
}