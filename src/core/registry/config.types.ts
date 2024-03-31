import { IndicatorThresholds } from "../indicators/indicators.types";

export type ThresholdsConfig = Record<string, IndicatorThresholds>

export interface ScoutConfig {
  indicators: string[];
  thresholds?: ThresholdsConfig;
}
