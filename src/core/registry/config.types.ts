import { IndicatorThresholds } from "../indicators/indicators.types";

export type ThresholdsConfig = Record<string, IndicatorThresholds>

export type StopConditions = Partial<{
  mustBeOk: string[];
  shallNotAlert: string[];
  maxAlerts: number;
  maxWarnings: number;
}>;

export interface ScoutConfig {
  indicators: string[];
  thresholds?: ThresholdsConfig;
  conditions?: StopConditions;
}
