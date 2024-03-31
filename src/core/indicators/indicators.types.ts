import { Library } from "../../models/library";

export enum IndicatorStatus {
  OK = "OK",
  WARNING = "WARNING",
  ALERT = "ALERT",
  NOT_FOUND = "NOT_FOUND",
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
  preconditions?: Array<IndicatorPrecondition>;
};
