import { Library } from "../../models/library";
import {
  Indicator, IndicatorStatus
} from "./indicator.types";
import {
  IS_LAST_VERSION,
  IS_SAME_MAJOR_VERSION,
  IS_SAME_MINOR_VERSION,
} from "./indicatorsNames";

export const isLastVersionIndicator: Indicator = {
  name: IS_LAST_VERSION,
  evaluate: function (library: Library) {
    const status = library.lastVersion === library.usedVersion ? IndicatorStatus.OK : IndicatorStatus.WARNING;
    return {
      status,
      value: { score: 1, message: this.message },
    };
  },
  message:
    "The used version is not the latest released version of the library.",
} as const;

export const isSameMajorVersionIndicator: Indicator = {
  name: IS_SAME_MAJOR_VERSION,
  evaluate: function (library: Library) {
    const latestSemVer = library.lastVersion.split(".");
    const currentSemVer = library.usedVersion.split(".");
    const status = latestSemVer[0] === currentSemVer[0]
      ? IndicatorStatus.OK
      : IndicatorStatus.ALERT;
    const score = status === IndicatorStatus.OK ? 1 : 0;
    return {
      status,
      value: { score, message: this.message },
    };
  },
  message: `The major version of the used library is different from the latest version.`,
};

export const isSameMinorVersionIndicator: Indicator = {
  name: IS_SAME_MINOR_VERSION,
  evaluate: function (library: Library) {
    const latestSemVer = library.lastVersion.split(".");
    const currentSemVer = library.usedVersion.split(".");
    const status = latestSemVer[1] === currentSemVer[1]
      ? IndicatorStatus.OK
      : IndicatorStatus.WARNING;
    const score = status === IndicatorStatus.OK ? 1 : 0.5;
    return {
      status,
      value: { score, message: this.message },
    };
  },
  message:
    "The minor version of the used library is different from the latest version.",
};
