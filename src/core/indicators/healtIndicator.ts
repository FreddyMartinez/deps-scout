import { Library } from "../../models/library";
import { IndicatorWithThresholds } from "./baseIndicator";
import { REPO_HEALTH } from "./constants";
import { IndicatorStatus } from "./indicators.types";

/**
 * Indicator that checks the library health based on the community profile.
 */
class RepoHealthIndicator extends IndicatorWithThresholds {
  name = REPO_HEALTH;
  parameters: Array<keyof Library> = ["repoHealth"];
  protected warningThreshold = 80; // days between releases
  protected alertThreshold = 60;

  evaluate(library: Library) {
    const status =
      library.repoHealth > this.warningThreshold
        ? IndicatorStatus.OK
        : library.repoHealth < this.alertThreshold
        ? IndicatorStatus.ALERT
        : IndicatorStatus.WARNING;

    return {
      status,
      value: {
        score: library.repoHealth / 100,
        message: this.message(library.repoHealth),
      },
    };
  }

  message = (healt: number) => `Repos healt is ${healt}%.`;
}

export const isHealthyRepoIndicator = new RepoHealthIndicator();