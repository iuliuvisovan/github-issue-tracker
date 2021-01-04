import methods from './methods';

export async function get({ organizationSlug, repoSlug, filter, sort }: IGetIssuesParams): Promise<IGithubIssue[]> {
  const issues: IGithubIssue[] = await methods.get(
    `repos/${organizationSlug}/${repoSlug}/issues?state=${filter}&sort=${sort}`
  );

  return issues.filter((x) => !x.pull_request);
}

export interface IGetIssuesParams {
  organizationSlug: string;
  repoSlug: string;
  filter: string;
  sort: string;
}

export interface IGithubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
}

export interface IGithubIssueLabel {
  id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface IGithubIssue {
  url: string;
  id: string;
  number: string;
  title: string;
  user: IGithubUser;
  labels: IGithubIssueLabel[];
  created_at: string;
  pull_request?: any;
}
