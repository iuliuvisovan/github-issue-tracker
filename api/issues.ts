import { IGetIssuesParams, IGithubIssue } from '../types/issues';
import methods from './methods';

export async function get(queryParams: IGetIssuesParams): Promise<IGithubIssue[]> {
  const { organizationSlug, repoSlug, filter, sort } = queryParams;

  const issues: IGithubIssue[] = await methods.get(
    `repos/${organizationSlug}/${repoSlug}/issues?state=${filter}&sort=${sort}`
  );

  return issues.filter((x) => !x.pull_request);
}

export async function getComments(queryParams: IGetIssuesParams): Promise<IGithubIssue[]> {
  const { organizationSlug, repoSlug, filter, sort } = queryParams;

  const issues: IGithubIssue[] = await methods.get(
    `repos/${organizationSlug}/${repoSlug}/issues?state=${filter}&sort=${sort}`
  );

  return issues.filter((x) => !x.pull_request);
}
