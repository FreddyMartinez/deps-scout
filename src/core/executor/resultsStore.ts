import { Library } from "../../models/library";
import { IndicatorResult, IndicatorStatus } from "../indicators/indicators.types";

export class ResultsStore {
  private lib: Library;
  private results = new Map<string, IndicatorResult>();
  private counters = { alerts: 0, warnings: 0 };
  private evaluationStop?: string;

  constructor(library: Library) {
    this.lib = library;
    this.results = new Map();
  }

  get library() {
    return this.lib;
  }

  get keys() {
    return this.results.keys();
  }

  get alerts() {
    return this.counters.alerts;
  }

  get warnings() {
    return this.counters.warnings;
  }

  get evaluationStopReason() {
    return this.evaluationStop;
  }

  setIndicatorResult(name: string, result: IndicatorResult) {
    this.results.set(name, result);
    if (result.status === IndicatorStatus.ALERT) this.counters.alerts++;
    if (result.status === IndicatorStatus.WARNING) this.counters.warnings++;
  }

  getIndicatorResult(name: string) {
    return this.results.get(name);
  }

  setStopReason(reason: string) {
    this.evaluationStop = reason;
  }
}
