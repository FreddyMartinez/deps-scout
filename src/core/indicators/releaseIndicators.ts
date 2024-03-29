import { Library } from "../../models/library";
import {
  MILLISECONDS_IN_DAY,
  timeBetweenReleasesMessage,
} from "../../util/constants";
import { Indicator, IndicatorStatus } from "./indicator.types";
import {
  IS_RELEASED_FREQUENTLY,
  WAS_RELEASED_IN_LAST_THREE_MONTHS,
  WAS_RELEASED_IN_LAST_YEAR,
} from "./indicatorsNames";

export const wasReleasedInLastYear: Indicator = {
  name: WAS_RELEASED_IN_LAST_YEAR,
  evaluate: function (library: Library) {
    const lastVersionDate: Date = library.lastVersionDate;
    const timeSinceLastRelease =
      (Date.now() - lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    const status =
      timeSinceLastRelease < 365 ? IndicatorStatus.OK : IndicatorStatus.ALERT;
    return {
      status,
      value: {
        score: timeSinceLastRelease,
        message: this.message(lastVersionDate),
      },
    };
  },
  message: (lastVersionDate: Date) =>
    `The library has not been updated in the last year. Last release was made on ${lastVersionDate.toDateString()}`,
};

class ReleasedRecentlyIndicator implements Indicator {
  name = WAS_RELEASED_IN_LAST_THREE_MONTHS;

  evaluate(library: Library) {
    const timeSinceLastRelease =
      (Date.now() - library.lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    const status =
      timeSinceLastRelease < 90 ? IndicatorStatus.OK : IndicatorStatus.WARNING;
    return {
      status,
      value: {
        score: timeSinceLastRelease,
        message: this.message(timeSinceLastRelease),
      },
    };
  }

  message(timeSinceLastRelease: number) {
    return `The library has not been updated in the last ${Math.round(timeSinceLastRelease)} days.`;
  }
}

export const wasReleasedInLastThreeMonths = new ReleasedRecentlyIndicator();

export const isReleasedFrequently: Indicator = {
  name: IS_RELEASED_FREQUENTLY,
  evaluate: function (library: Library) {
    const status =
      library.releaseFrequency > 0.3
        ? IndicatorStatus.OK
        : library.releaseFrequency < 0.1
        ? IndicatorStatus.ALERT
        : IndicatorStatus.WARNING;
    return {
      status,
      value: {
        score: library.releaseFrequency,
        message: this.message(library.releaseFrequency),
      },
    };
  },
  message: (frequency: number) =>
    timeBetweenReleasesMessage(Math.round(1 / frequency)),
};
