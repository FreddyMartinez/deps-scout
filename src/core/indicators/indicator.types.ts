export enum IndicatorResult {
  OK = 'OK',
  WARNING = 'WARNING',
  ALERT = 'ALERT'
}

export type Indicator = {
  name: string;
  expression: (...params: unknown[]) => IndicatorResult;
  message: string;
}
