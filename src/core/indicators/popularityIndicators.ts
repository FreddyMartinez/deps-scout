import { Library } from "../../models/library";
import { Indicator, IndicatorStatus } from "./indicators.types";
import {
  IS_DOWNLOADED_FREQUENTLY,
  IS_STARRED_REPO,
} from "./indicators.constants";

class DownloadsIndicator implements Indicator {
  name = IS_DOWNLOADED_FREQUENTLY;

  evaluate(library: Library) {
    const logDownloads = Math.log10(library.weeklyDownloads);
    const status =
      logDownloads >= 5
        ? IndicatorStatus.OK
        : logDownloads < 2
        ? IndicatorStatus.ALERT
        : IndicatorStatus.WARNING;

    return {
      status,
      value: {
        score: logDownloads,
        message: this.message(library.weeklyDownloads),
      },
    };
  }

  message(weeklyDownloads: number) {
    return `Library not widely used: ${weeklyDownloads} weekly downloads`;
  }
}

class StarsIndicator implements Indicator {
  name = IS_STARRED_REPO;

  evaluate(library: Library) {
    if (!library.repoStars) {
      library.repoStars = 1;
    }

    const status =
      library.repoStars > 500
        ? IndicatorStatus.OK
        : library.repoStars < 100
        ? IndicatorStatus.ALERT
        : IndicatorStatus.WARNING;

    return {
      status,
      value: {
        score: Math.log10(library.repoStars),
        message: this.message(library.repoStars),
      },
    };
  }

  message(stars: number) {
    return `Repo not widely starred: ${stars} stars in Github`;
  }
}

export const isDowloadedFrecuentlyIndicator = new DownloadsIndicator();
export const isStarredLibraryIndicator = new StarsIndicator();
