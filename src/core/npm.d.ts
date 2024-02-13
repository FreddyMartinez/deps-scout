type NpmTime = {
  modified: string;
  created: string;
} & Record<string, string>;

type RepositoryType = "git";

type NpmDownloads = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

type NpmData = {
  _id: string;
  _rev: string;
  name: string;
  time: NpmTime;
  versions: Array<string>;
  maintainers: Array<string>;
  description: string;
  homepage: string;
  keywords: Array<string>;
  repository: {
    type: RepositoryType;
    url: string;
  };
  bugs: {
    url: string;
  };
  author: string;
  users: unknown;
  license: string;
  version: string;
  main: string;
  module: string;
  sideEffects: false;
  exports: unknown;
  gitHead: string;
  _nodeVersion: string;
  _npmVersion: string;
  dist: unknown;
};
