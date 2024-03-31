import { readFileAsync } from "../../util/readFileAsync";

const defaultConfig = {
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
    return JSON.parse(configStr);
  } catch (error) {
    return defaultConfig;
  }
}