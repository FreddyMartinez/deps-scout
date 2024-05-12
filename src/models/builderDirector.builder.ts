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
  jsbuilder.addParam("repoName", NPM);
  jsbuilder.addParam("repoOwner", NPM);
  jsbuilder.addParam("numberOfVersions", NPM);
  jsbuilder.addParam("weeklyDownloads", NPM_DOWNLOADS);
  jsbuilder.addParam("lastVersion", NPM);
  jsbuilder.addParam("lastVersionDate", NPM);
  jsbuilder.addParam("lifeSpan", NPM);
  jsbuilder.addParam("releaseFrequency", NPM);
  jsbuilder.addParam("repoOpenIssues", GITHUB);
  jsbuilder.addParam("repoStars", GITHUB);
  jsbuilder.addParam("repoForks", GITHUB);
  jsbuilder.addParam("repoObservers", GITHUB);
  jsbuilder.addParam("repoOwnerType", GITHUB);
  jsbuilder.addParam("repoHealth", GITHUB_COMUNITY);
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
