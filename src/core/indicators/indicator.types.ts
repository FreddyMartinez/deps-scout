import { Library } from "../../models/library";

export enum IndicatorStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  ALERT = 'ALERT'
}

export interface IndicatorResult {
  status: IndicatorStatus;
  value?: { score: number} & Record<string, unknown>;
}

export type Indicator = {
  name: string;
  evaluate: (lib: Library) => IndicatorResult;
  message: string;
}
