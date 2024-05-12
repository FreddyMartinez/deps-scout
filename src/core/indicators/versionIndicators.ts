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
  message =
    "The used version is not the latest released version of the library.";
}

class SameMajorVersionIndicator implements Indicator {
  name = IS_SAME_MAJOR_VERSION;
  parameters: Array<keyof Library> = ["lastVersion", "usedVersion"];
  preconditions = [
    { metricName: IS_LAST_VERSION, status: IndicatorStatus.WARNING },
  ];
  message = `The major version of the used library is different from the latest version.`;

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
      value: { score, message: this.message },
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
  message =
    "The minor version of the used library is different from the latest version.";

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
      value: { score, message: this.message },
    };
  }
}

export const isLastVersionIndicator = new SameVersionIndicator();
export const isSameMajorVersionIndicator = new SameMajorVersionIndicator();
export const isSameMinorVersionIndicator = new SameMinorVersion();
