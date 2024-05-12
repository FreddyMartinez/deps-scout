import { Library } from "../../models/library";
import { IndicatorStatus } from "./indicators.types";
import {
  IS_DOWNLOADED_FREQUENTLY,
  IS_STARRED_REPO,
} from "./constants";
import { IndicatorWithThresholds } from "./baseIndicator";

class DownloadsIndicator extends IndicatorWithThresholds {
  name = IS_DOWNLOADED_FREQUENTLY;
  parameters: Array<keyof Library> = ["weeklyDownloads"];
  protected warningThreshold = 10000;
  protected alertThreshold = 100;

  evaluate(library: Library) {
    const downloads = library.weeklyDownloads;
    const status =
      downloads >= this.warningThreshold
        ? IndicatorStatus.OK
        : downloads < this.alertThreshold
        ? IndicatorStatus.ALERT
        : IndicatorStatus.WARNING;

    return {
      status,
      value: {
        score: Math.log10(downloads),
        message: this.message(library.weeklyDownloads),
      },
    };
  }

  message = (weeklyDownloads: number) => {
    return `Library not widely used: ${weeklyDownloads} weekly downloads`;
  };
}

class StarsIndicator extends IndicatorWithThresholds {
  name = IS_STARRED_REPO;
  parameters: Array<keyof Library> = ["repoStars"];
  protected warningThreshold = 500;
  protected alertThreshold = 100;

  evaluate(library: Library) {
    const status =
      library.repoStars > this.warningThreshold
        ? IndicatorStatus.OK
        : library.repoStars < this.alertThreshold
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

  message = (stars: number) => {
    return `Repo not widely starred: ${stars} stars in Github`;
  };
}

export const isDowloadedFrecuentlyIndicator = new DownloadsIndicator();
export const isStarredLibraryIndicator = new StarsIndicator();
