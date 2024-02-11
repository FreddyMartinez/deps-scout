type npmTime = {
  modified: string;
  created: string;
} & Record<string, string>;

type repositoryType = "git";

type npmData = {
  _id: string;
  _rev: string;
  name: string;
  time: npmTime;
  versions: Array<string>;
  maintainers: Array<string>;
  description: string;
  homepage: string;
  keywords: Array<string>;
  repository: {
    type: repositoryType;
    url: string;
  };
  bugs: {
    url: string;
  };
  author: string;
  users: unknown;
  license: string;
  _cached: true;
  _contentLength: number;
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
