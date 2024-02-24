import {
  Indicator, IndicatorResult
} from "./indicator.types";
import {
  IS_LAST_VERSION,
  IS_SAME_MAJOR_VERSION,
  IS_SAME_MINOR_VERSION,
} from "./indicatorsNames";

export const isLastVersionIndicator: Indicator = {
  name: IS_LAST_VERSION,
  expression: (lastVersion: string, usedVersion: string) => {
    return lastVersion === usedVersion ? IndicatorResult.OK : IndicatorResult.WARNING;
  },
  message:
    "The used version is not the latest released version of the library.",
} as const;

export const isSameMajorVersionIndicator: Indicator = {
  name: IS_SAME_MAJOR_VERSION,
  expression: (lastVersion: string, usedVersion: string) => {
    const latestSemVer = lastVersion.split(".");
    const currentSemVer = usedVersion.split(".");
    return latestSemVer[0] === currentSemVer[0]
      ? IndicatorResult.OK
      : IndicatorResult.ALERT;
  },
  message: `The major version of the used library is different from the latest version.`,
};

export const isSameMinorVersionIndicator: Indicator = {
  name: IS_SAME_MINOR_VERSION,
  expression: (lastVersion: string, usedVersion: string) => {
    const latestSemVer = lastVersion.split(".");
    const currentSemVer = usedVersion.split(".");
    return latestSemVer[1] === currentSemVer[1]
      ? IndicatorResult.OK
      : IndicatorResult.WARNING;
  },
  message:
    "The minor version of the used library is different from the latest version.",
};
