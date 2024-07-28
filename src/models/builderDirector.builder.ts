import { BuilderDirector } from "./builderDirector";
import { GITHUB, GITHUB_COMUNITY, NPM, NPM_DOWNLOADS, Source } from "./libParam";
import { Library } from "./library";
import {
  GithubBuilder,
  GithubCommunityBuilder,
  LibraryBuilder,
  NpmBuilder,
  NpmDownloadsBuilder,
} from "./libraryBuilder";

function createJavascriptBuilder() {
  const jsParams = new Map<keyof Library, Source>();
  jsParams.set("repoName", NPM);
  jsParams.set("repoOwner", NPM);
  jsParams.set("numberOfVersions", NPM);
  jsParams.set("weeklyDownloads", NPM_DOWNLOADS);
  jsParams.set("lastVersion", NPM);
  jsParams.set("lastVersionDate", NPM);
  jsParams.set("lifeSpan", NPM);
  jsParams.set("releaseFrequency", NPM);
  jsParams.set("repoOpenIssues", GITHUB);
  jsParams.set("repoStars", GITHUB);
  jsParams.set("repoForks", GITHUB);
  jsParams.set("repoObservers", GITHUB);
  jsParams.set("repoOwnerType", GITHUB);
  jsParams.set("repoHealth", GITHUB_COMUNITY);
  const jsBuilders = new Map<Source, LibraryBuilder>();
  jsBuilders.set(NPM, new NpmBuilder());
  jsBuilders.set(NPM_DOWNLOADS, new NpmDownloadsBuilder());
  jsBuilders.set(GITHUB, new GithubBuilder());
  jsBuilders.set(GITHUB_COMUNITY, new GithubCommunityBuilder());

  return new BuilderDirector(jsParams, jsBuilders);
}

function createJavaBuilder() {
  const javaParams = new Map<keyof Library, Source>();
  /* @TODO: Map labrary attributes to data sources */
  const javaBuilders = new Map<Source, LibraryBuilder>();
  /* @TODO: Implement Java builders and add to map */
  return new BuilderDirector(javaParams, javaBuilders);
}

export function createBuilderDirector(language: string) {
  if (language === "javascript") {
    return createJavascriptBuilder();
  }
  if (language === "java") {
    return createJavaBuilder();
  }
  throw new Error(`Language ${language} not supported`);
}
