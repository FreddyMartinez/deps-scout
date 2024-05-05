import { Library } from "../../models/library";
import { IndicatorResult, IndicatorStatus } from "../indicators/indicators.types";

export class ResultsStore {
  private lib: Library;
  private results = new Map<string, IndicatorResult>();

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
    return [...this.results.values()].reduce((acc, result) => {
      if (result.status === IndicatorStatus.ALERT) acc++;
      return acc;
    }, 0);
  }

  setIndicatorResult(name: string, result: IndicatorResult) {
    this.results.set(name, result);
  }

  getIndicatorResult(name: string) {
    return this.results.get(name);
  }
}
