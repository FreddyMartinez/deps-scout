import { readFileAsync } from "../../util/readFileAsync";
import {
  IS_DOWNLOADED_FREQUENTLY,
  IS_LAST_VERSION,
  IS_LONG_LIVING_PROJECT,
  IS_RELEASED_FREQUENTLY,
  REPO_HEALTH,
  WAS_RELEASED_RECENTLY,
} from "../indicators/constants";
import { ScoutConfig } from "./config.types";

const defaultConfig: ScoutConfig = {
  indicators: [
    IS_LAST_VERSION,
    WAS_RELEASED_RECENTLY,
    IS_RELEASED_FREQUENTLY,
    IS_DOWNLOADED_FREQUENTLY,
    IS_LONG_LIVING_PROJECT,
    REPO_HEALTH,
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