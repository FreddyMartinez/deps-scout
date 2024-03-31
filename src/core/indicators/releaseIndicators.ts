import { Library } from "../../models/library";
import {
  MILLISECONDS_IN_DAY,
  timeBetweenReleasesMessage,
} from "../../util/constants";
import { Indicator, IndicatorStatus } from "./indicators.types";
import {
  IS_RELEASED_FREQUENTLY,
  WAS_RELEASED_RECENTLY,
} from "./indicators.constants";

class ReleasedRecentlyIndicator implements Indicator {
  name = WAS_RELEASED_RECENTLY;

  evaluate(library: Library) {
    const timeSinceLastRelease =
      (Date.now() - library.lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    const status =
      timeSinceLastRelease < 90
        ? IndicatorStatus.OK
        : timeSinceLastRelease < 365
        ? IndicatorStatus.WARNING
        : IndicatorStatus.ALERT;
    return {
      status,
      value: {
        score: 1 / timeSinceLastRelease,
        message: this.message(timeSinceLastRelease),
      },
    };
  }

  message(timeSinceLastRelease: number) {
    return `The library has not been updated in the last ${Math.round(
      timeSinceLastRelease
    )} days.`;
  }
}

export const wasReleasedRecently = new ReleasedRecentlyIndicator();

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
