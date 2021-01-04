import methods from './methods';

export async function get(organizationSlug: string, repoSlug: string): Promise<IGithubIssue[]> {
  const issues: IGithubIssue[] = await methods.get(`repos/${organizationSlug}/${repoSlug}`);
  return issues;
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
}
