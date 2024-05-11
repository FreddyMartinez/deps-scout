import { BuilderDirector } from "./builderDirector";
import { GITHUB, GITHUB_COMUNITY, NPM, NPM_DOWNLOADS } from "./libParam";
import {
  GithubBuilder,
  GithubCommunityBuilder,
  NpmBuilder,
  NpmDownloadsBuilder,
} from "./libraryBuilder";

function createJavascriptBuilder() {
  const jsbuilder = new BuilderDirector();
  jsbuilder.addBuilder(NPM, new NpmBuilder());
  jsbuilder.addBuilder(NPM_DOWNLOADS, new NpmDownloadsBuilder());
  jsbuilder.addBuilder(GITHUB, new GithubBuilder());
  jsbuilder.addBuilder(GITHUB_COMUNITY, new GithubCommunityBuilder());
  jsbuilder.addParam("repoName", { source: NPM, status: "MISSING" });
  jsbuilder.addParam("repoOwner", { source: NPM, status: "MISSING" });
  jsbuilder.addParam("numberOfVersions", { source: NPM, status: "MISSING" });
  jsbuilder.addParam("weeklyDownloads", {
    source: NPM_DOWNLOADS,
    status: "MISSING",
  });
  jsbuilder.addParam("lastVersion", { source: NPM, status: "MISSING" });
  jsbuilder.addParam("lastVersionDate", { source: NPM, status: "MISSING" });
  jsbuilder.addParam("lifeSpan", { source: NPM, status: "MISSING" });
  jsbuilder.addParam("releaseFrequency", { source: NPM, status: "MISSING" });
  jsbuilder.addParam("repoOpenIssues", { source: GITHUB, status: "MISSING" });
  jsbuilder.addParam("repoStars", { source: GITHUB, status: "MISSING" });
  jsbuilder.addParam("repoForks", { source: GITHUB, status: "MISSING" });
  jsbuilder.addParam("repoObservers", { source: GITHUB, status: "MISSING" });
  jsbuilder.addParam("repoOwnerType", { source: GITHUB, status: "MISSING" });
  jsbuilder.addParam("repoHealth", {
    source: GITHUB_COMUNITY,
    status: "MISSING",
  });
  return jsbuilder;
}

export function createBuilderDirector(language: string) {
  if (language === "javascript") {
    return createJavascriptBuilder();
  }
  if (language === "java") {
    /* @TODO: Implement Java builder */
    return new BuilderDirector();
  }
  throw new Error(`Language ${language} not supported`);
}
