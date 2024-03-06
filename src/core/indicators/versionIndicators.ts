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
  evaluate: (library: Library) => {
    const status = library.lastVersion === library.usedVersion ? IndicatorStatus.OK : IndicatorStatus.WARNING;
    return {
      status,
    };
  },
  message:
    "The used version is not the latest released version of the library.",
} as const;

export const isSameMajorVersionIndicator: Indicator = {
  name: IS_SAME_MAJOR_VERSION,
  evaluate: (library: Library) => {
    const latestSemVer = library.lastVersion.split(".");
    const currentSemVer = library.usedVersion.split(".");
    const status = latestSemVer[0] === currentSemVer[0]
      ? IndicatorStatus.OK
      : IndicatorStatus.ALERT;
    return {
      status,
    };
  },
  message: `The major version of the used library is different from the latest version.`,
};

export const isSameMinorVersionIndicator: Indicator = {
  name: IS_SAME_MINOR_VERSION,
  evaluate: (library: Library) => {
    const latestSemVer = library.lastVersion.split(".");
    const currentSemVer = library.usedVersion.split(".");
    const status = latestSemVer[1] === currentSemVer[1]
      ? IndicatorStatus.OK
      : IndicatorStatus.WARNING;
    return {
      status,
    };
  },
  message:
    "The minor version of the used library is different from the latest version.",
};
