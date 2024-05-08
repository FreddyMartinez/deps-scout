import { Library } from "../../models/library";
import { Indicator, IndicatorResult, IndicatorThresholds } from "./indicators.types";

export abstract class IndicatorWithThresholds implements Indicator {
  abstract name: string;
  abstract parameters: Array<keyof Library>;
  protected warningThreshold: number;
  protected alertThreshold: number;

  abstract message: string | ((...data: unknown[]) => string);
  abstract evaluate(lib: Library): IndicatorResult;

  setThresholds(thresholds: IndicatorThresholds) {
    if (typeof thresholds !== "object") {
      return;
    }

    if (thresholds.warningThreshold) {
      this.warningThreshold = thresholds.warningThreshold;
    }
    if (thresholds.alertThreshold) {
      this.alertThreshold = thresholds.alertThreshold;
    }
  }
}
