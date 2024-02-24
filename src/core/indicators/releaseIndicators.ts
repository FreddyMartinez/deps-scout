import { MILLISECONDS_IN_DAY } from "../../util/constants";
import { Indicator, IndicatorResult } from "./indicator.types";
import { IS_RELEASED_FREQUENTLY, WAS_RELEASED_IN_LAST_THREE_MONTHS, WAS_RELEASED_IN_LAST_YEAR } from "./indicatorsNames";

export const wasReleasedInLastYear: Indicator = {
  name: WAS_RELEASED_IN_LAST_YEAR,
  expression: (lastVersionDate: Date) => {
    const timeSinceLastRelease =
    (Date.now() - lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    return timeSinceLastRelease < 365 ? IndicatorResult.OK : IndicatorResult.ALERT;
  },
  message: "The library has not been updated in the last year."
}

export const wasReleasedInLastThreeMonths: Indicator = {
  name: WAS_RELEASED_IN_LAST_THREE_MONTHS,
  expression: (lastVersionDate: Date) => {
    const timeSinceLastRelease =
    (Date.now() - lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    return timeSinceLastRelease < 90 ? IndicatorResult.OK : IndicatorResult.WARNING;
  },
  message: "The library has not been updated in the last three months."
}

export const isReleasedFrequently: Indicator = {
  name: IS_RELEASED_FREQUENTLY,
  expression: (lastVersionDate: Date) => {
    const timeSinceLastRelease =
    (Date.now() - lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    return timeSinceLastRelease < 30 ? IndicatorResult.OK : IndicatorResult.WARNING;
  },
  message: "The lirary is not released frequently.",
}
