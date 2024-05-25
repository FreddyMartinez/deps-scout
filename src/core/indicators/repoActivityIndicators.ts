import { Library } from "../../models/library";
import { IndicatorWithThresholds } from "./baseIndicator";
import {
  REPO_HAS_OPEN_ISSUES,
  REPO_HAS_FORKS,
  REPO_HAS_ENOUGH_OBSERVERS,
  REPO_OWNER_TYPE,
} from "./constants";
import {
  Indicator,
  IndicatorStatus,
  IndicatorThresholds,
} from "./indicators.types";

// Checks the number of observers of a repository
class RepoObserversIndicator extends IndicatorWithThresholds {
  name = REPO_HAS_ENOUGH_OBSERVERS;
  parameters: Array<keyof Library> = ["repoObservers"];
  protected warningThreshold = 50;
  protected alertThreshold = 10;

  evaluate(library: Library) {
    const status =
      library.repoObservers > this.warningThreshold
        ? IndicatorStatus.OK
        : library.repoObservers > this.alertThreshold
        ? IndicatorStatus.WARNING
        : IndicatorStatus.ALERT;

    const score = Math.min(1, library.repoObservers / this.warningThreshold);
    return {
      status,
      value: {
        score,
        message: this.message(library.repoObservers),
      },
    };
  }

  message = (observers: number) =>
    `Projects repository has ${observers} observers.`;
}

// Checks if the number of forks of the repository
class RepoForksIndicator extends IndicatorWithThresholds {
  name = REPO_HAS_FORKS;
  parameters: Array<keyof Library> = ["repoForks"];
  protected warningThreshold = 10;
  protected alertThreshold = 5;

  evaluate(library: Library) {
    const status =
      library.repoForks > this.warningThreshold
        ? IndicatorStatus.OK
        : library.repoForks > this.alertThreshold
        ? IndicatorStatus.WARNING
        : IndicatorStatus.ALERT;

    const score = Math.min(1, library.repoForks / this.warningThreshold);
    return {
      status,
      value: {
        score,
        message: this.message(library.repoForks),
      },
    };
  }

  message = (forks: number) => `Projects repository has ${forks} forks.`;
}

// Checks the number of open issues of the repository
// @TODO: analyze the rate between open and closed issues
class RepoOpenIssuesIndicator extends IndicatorWithThresholds {
  name = REPO_HAS_OPEN_ISSUES;
  parameters: Array<keyof Library> = ["repoOpenIssues"];
  protected warningThreshold = 20; // days between releases
  protected alertThreshold = 100;

  evaluate(library: Library) {
    const status =
      library.repoOpenIssues < this.warningThreshold
        ? IndicatorStatus.OK
        : library.repoOpenIssues < this.alertThreshold
        ? IndicatorStatus.WARNING
        : IndicatorStatus.ALERT;

    const score = Math.min(1, library.repoOpenIssues / this.warningThreshold);
    return {
      status,
      value: {
        score,
        message: this.message(library.repoOpenIssues),
      },
    };
  }

  message = (repoOpenIssues: number) =>
    `Repository has ${repoOpenIssues} open issues.`;
}

// Check if the repository owner is the desired type, e.g. Organization
class RepoOwnerTypeIndicator implements Indicator {
  name = REPO_OWNER_TYPE;
  parameters: Array<keyof Library> = ["repoOwnerType"];
  desiredOwnerType: RepoOwnerType = "Organization";

  evaluate(library: Library) {
    const status =
      library.repoOwnerType === this.desiredOwnerType
        ? IndicatorStatus.OK
        : IndicatorStatus.WARNING;

    const score = library.repoOwnerType === this.desiredOwnerType ? 1 : 0;
    return {
      status,
      value: {
        score,
        message: this.message(library.repoOwnerType),
      },
    };
  }

  message = (repoOwner: string) => `Repo owner type is '${repoOwner}'.`;

  setThresholds(thresholds: IndicatorThresholds) {
    if (thresholds.requiredValue) {
      this.desiredOwnerType = thresholds.requiredValue as RepoOwnerType;
    }
  }
}

export const hasEnoughObservers = new RepoObserversIndicator();
export const hasForks = new RepoForksIndicator();
export const hasOpenIssues = new RepoOpenIssuesIndicator();
export const isOwnerType = new RepoOwnerTypeIndicator();
