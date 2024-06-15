import { writeFile } from "fs/promises";
import { printRed } from "../../util/utilityFunctions";
import { ResultsStore } from "../executor/resultsStore";
import { IndicatorStatus } from "../indicators/indicators.types";
import { ExecutionContext } from "./context";
import { baseHtml } from "../../util/baseHtml";

export class HtmlFileExecutionContext implements ExecutionContext {
  evaluatedIndicators: Array<string>;

  async showResults(results: Map<string, ResultsStore>, indicators: string[]) {
    this.evaluatedIndicators = indicators;
    const resultsHtml = [];
    for (const result of results.values()) {
      const row = this.createLibraryResultsHtml(result);
      resultsHtml.push(`<tr>
        ${row}
      </tr>`);
    }

    await this.createHtmlFile(resultsHtml.join(""));
  }

  showError(error: unknown) {
    if (error instanceof Error) printRed(error.message);
  }

  private createLibraryResultsHtml(results: ResultsStore) {
    let row = `<td>${results.library.name}</td>`;
    for (const indicator of this.evaluatedIndicators) {
      row += this.createIndicatorCell(results, indicator);
    }
    row += `<td>${results.evaluationStopReason || " - "}</td>`;

    return row;
  }

  private createIndicatorCell(results: ResultsStore, indicatorName: string) {
    const result = results.getIndicatorResult(indicatorName);
    if (!result) {
      return `<td class="not-evaluated"> - </td>`;
    }
    if (result.status === IndicatorStatus.WARNING) {
      return `<td class="warning">${result.value.message}</td>`;
    }
    if (result.status === IndicatorStatus.ALERT) {
      return `<td class="alert">${result.value.message}</td>`;
    }
    return `<td class="ok">Ok</td>`;
  }

  private async createHtmlFile(results: string) {
    const indicators = this.evaluatedIndicators
      .map((indicator) => `<th>${indicator}</th>`)
      .join("");
    const html = baseHtml(indicators.concat("<th>Stop reason</th>"), results);
    await writeFile("scout-results.html", html);
  }
}
