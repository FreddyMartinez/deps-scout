import { Library } from "../../models/library";
import { MILLISECONDS_IN_DAY } from "../../util/constants";
import { Indicator, IndicatorStatus } from "./indicator.types";
import {
  IS_RELEASED_FREQUENTLY,
  WAS_RELEASED_IN_LAST_THREE_MONTHS,
  WAS_RELEASED_IN_LAST_YEAR,
} from "./indicatorsNames";

export const wasReleasedInLastYear: Indicator = {
  name: WAS_RELEASED_IN_LAST_YEAR,
  evaluate: (library: Library) => {
    const lastVersionDate: Date = library.lastVersionDate;
    const timeSinceLastRelease =
      (Date.now() - lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    const status =
      timeSinceLastRelease < 365 ? IndicatorStatus.OK : IndicatorStatus.ALERT;
    return {
      status,
      value: { score: timeSinceLastRelease },
    };
  },
  message: "The library has not been updated in the last year.",
};

export const wasReleasedInLastThreeMonths: Indicator = {
  name: WAS_RELEASED_IN_LAST_THREE_MONTHS,
  evaluate: (library: Library) => {
    const timeSinceLastRelease =
      (Date.now() - library.lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    const status =
      timeSinceLastRelease < 90 ? IndicatorStatus.OK : IndicatorStatus.WARNING;
    return {
      status,
      value: { score: timeSinceLastRelease },
    };
  },
  message: "The library has not been updated in the last three months.",
};

export const isReleasedFrequently: Indicator = {
  name: IS_RELEASED_FREQUENTLY,
  evaluate: (library: Library) => {
    const status =
      library.releaseFrequency > 0.3
        ? IndicatorStatus.OK
        : library.releaseFrequency < 0.1
        ? IndicatorStatus.ALERT
        : IndicatorStatus.WARNING;
    return {
      status,
    };
  },
  message: "The library is not released frequently.",
};
