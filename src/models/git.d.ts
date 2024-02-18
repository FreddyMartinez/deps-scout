type RepoOwnerType = "User" | "Organization";

type RepoOwner = {
  type: RepoOwnerType;
} & Record<string, unknown>;

type GitData = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: RepoOwner;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  clone_url: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: unknown;
  is_template: boolean;
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  organization: Record<string, unknown>;
  network_count: number;
  subscribers_count: number;
};

type GitCommunityProfile = {
  health_percentage: number;
  description: string;
  documentation: string;
  files: {
    code_of_conduct: Record<string, unknown> | null;
    code_of_conduct_file: Record<string, unknown> | null;
    contributing: Record<string, unknown> | null;
    issue_template: unknown | null;
    pull_request_template: unknown | null;
    license: Record<string, unknown>;
    readme: Record<string, unknown>;
  };
  updated_at: string;
  content_reports_enabled: false;
};

type GithubExcededRateLimit = {
  message: string;
  documentation_url: string;
};
