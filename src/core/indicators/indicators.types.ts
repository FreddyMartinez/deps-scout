import { Library } from "../../models/library";

export enum IndicatorStatus {
  OK = "OK",
  WARNING = "WARNING",
  ALERT = "ALERT",
  NOT_FOUND = "NOT_FOUND",
  NON_EVALUABLE = "NON_EVALUABLE",
}

export interface IndicatorResult {
  status: IndicatorStatus;
  value: { score: number; message: string } & Record<string, unknown>;
}

export type IndicatorPrecondition = {
  metricName: string;
  status: IndicatorStatus;
};

/**
 * Represents an indicator (metric) that can be evaluated for a library.
 */
export type Indicator = {
  name: string;
  evaluate: (lib: Library) => IndicatorResult;
  message: string | ((...data: unknown[]) => string);
  parameters: Array<keyof Library>;
  preconditions?: Array<IndicatorPrecondition>;
  setThresholds?: (thresholds: IndicatorThresholds) => void;
};

export type IndicatorThresholds = {
  warningThreshold: number;
  alertThreshold: number;
  requiredValue?: string;
};
