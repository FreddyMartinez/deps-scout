import { Library } from "../../models/library";
import {
  MILLISECONDS_IN_DAY,
  timeBetweenReleasesMessage,
} from "../../util/constants";
import { IndicatorStatus } from "./indicators.types";
import {
  IS_RELEASED_FREQUENTLY,
  WAS_RELEASED_RECENTLY,
} from "./indicators.constants";
import { IndicatorWithThresholds } from "./baseIndicator";

/**
 * Indicator that checks if the library was released recently.
 * @param warningThreshold - The number of days since the last release to trigger a warning.
 * @param alertThreshold - The number of days since the last release to trigger an alert.
 */
class ReleasedRecentlyIndicator extends IndicatorWithThresholds {
  name = WAS_RELEASED_RECENTLY;
  protected warningThreshold = 90; // days since last release
  protected alertThreshold = 365;

  evaluate(library: Library) {
    const timeSinceLastRelease =
      (Date.now() - library.lastVersionDate.getTime()) / MILLISECONDS_IN_DAY;
    const status =
      timeSinceLastRelease < this.warningThreshold
        ? IndicatorStatus.OK
        : timeSinceLastRelease < this.alertThreshold
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

  message = (timeSinceLastRelease: number) => {
    return `The library has not been updated in the last ${Math.round(
      timeSinceLastRelease
    )} days.`;
  };
}

/**
 * Indicator that checks the average time between releases.
 * @param warningThreshold - The number of days between releases to trigger a warning.
 * @param alertThreshold - The number of days between releases to trigger an alert.
 */
class ReleaseFrequencyIndicator extends IndicatorWithThresholds {
  name = IS_RELEASED_FREQUENTLY;
  protected warningThreshold = 10; // days between releases
  protected alertThreshold = 30;

  evaluate(library: Library) {
    const status =
      library.releaseFrequency > 1 / this.warningThreshold
        ? IndicatorStatus.OK
        : library.releaseFrequency < 1 / this.alertThreshold
        ? IndicatorStatus.ALERT
        : IndicatorStatus.WARNING;
    return {
      status,
      value: {
        score: library.releaseFrequency,
        message: this.message(library.releaseFrequency),
      },
    };
  }

  message = (frequency: number) =>
    timeBetweenReleasesMessage(Math.round(1 / frequency));
}

export const wasReleasedRecently = new ReleasedRecentlyIndicator();
export const isReleasedFrequently = new ReleaseFrequencyIndicator();
