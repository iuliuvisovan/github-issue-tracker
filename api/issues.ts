import { IGetIssuesParams, IGithubIssue } from '../types/issues';
import methods from './methods';

export async function get(queryParams: IGetIssuesParams): Promise<IGithubIssue[]> {
  const { organizationSlug, repoSlug, filter, sort, page } = queryParams;

  const issues: IGithubIssue[] = await methods.get(
    `repos/${organizationSlug}/${repoSlug}/issues?state=${filter}&sort=${sort}&page=${page}`
  );

  return issues.filter((x) => !x.pull_request);
}
