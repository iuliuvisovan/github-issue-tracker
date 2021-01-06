import { GetIssuesParams, GithubIssue } from '../types/issues';
import methods from './methods';

export async function get(queryParams: GetIssuesParams): Promise<GithubIssue[]> {
  const { organizationId, repoId, filter, sort, page } = queryParams;

  const issues: GithubIssue[] = await methods.get(
    `repos/${organizationId}/${repoId}/issues?state=${filter}&sort=${sort}&page=${page}`
  );

  return issues.filter((x) => !x.pull_request);
}
