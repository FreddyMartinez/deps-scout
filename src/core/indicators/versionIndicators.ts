import { Library } from "../../models/library";
import { Indicator, IndicatorStatus } from "./indicators.types";
import {
  IS_LAST_VERSION,
  IS_SAME_MAJOR_VERSION,
  IS_SAME_MINOR_VERSION,
} from "./constants";

class SameVersionIndicator implements Indicator {
  name = IS_LAST_VERSION;
  parameters: Array<keyof Library> = ["lastVersion", "usedVersion"];

  evaluate(library: Library) {
    const status =
      library.lastVersion === library.usedVersion
        ? IndicatorStatus.OK
        : IndicatorStatus.WARNING;
    return {
      status,
      value: { score: 1, message: this.message },
    };
  }
  message = "The used version is not the latest.";
}

class SameMajorVersionIndicator implements Indicator {
  name = IS_SAME_MAJOR_VERSION;
  parameters: Array<keyof Library> = ["lastVersion", "usedVersion"];
  preconditions = [
    { metricName: IS_LAST_VERSION, status: IndicatorStatus.WARNING },
  ];
  message = (used: string, latest: string) =>
    `The used major version is ${used}, but the latest version of the library is ${latest}.`;

  evaluate(library: Library) {
    const latestSemVer = library.lastVersion.split(".");
    const currentSemVer = library.usedVersion.split(".");
    const status =
      latestSemVer[0] === currentSemVer[0]
        ? IndicatorStatus.OK
        : IndicatorStatus.ALERT;
    const score = status === IndicatorStatus.OK ? 1 : 0;
    return {
      status,
      value: {
        score,
        message: this.message(currentSemVer[0], latestSemVer[0]),
      },
    };
  }
}

class SameMinorVersion implements Indicator {
  name = IS_SAME_MINOR_VERSION;
  parameters: Array<keyof Library> = ["lastVersion", "usedVersion"];
  preconditions = [
    { metricName: IS_LAST_VERSION, status: IndicatorStatus.WARNING },
    { metricName: IS_SAME_MAJOR_VERSION, status: IndicatorStatus.OK },
  ];
  message = (used: string, latest: string) =>
    `Used minor version is ${used}, but latest version is ${latest}.`;

  evaluate(library: Library) {
    const latestSemVer = library.lastVersion.split(".");
    const currentSemVer = library.usedVersion.split(".");
    const status =
      latestSemVer[1] === currentSemVer[1]
        ? IndicatorStatus.OK
        : IndicatorStatus.WARNING;
    const score = status === IndicatorStatus.OK ? 1 : 0.5;
    return {
      status,
      value: { score, message: this.message(currentSemVer[1], latestSemVer[1]) },
    };
  }
}

export const isLastVersionIndicator = new SameVersionIndicator();
export const isSameMajorVersionIndicator = new SameMajorVersionIndicator();
export const isSameMinorVersionIndicator = new SameMinorVersion();
