import { GetIssuesParams, Issue } from '../types/issues';
import methods from './methods';

export async function get(queryParams: GetIssuesParams): Promise<Issue[]> {
  const { organizationId, repoId, filter, sort, page } = queryParams;

  const issues: Issue[] = await methods.get(`repos/${organizationId}/${repoId}/issues?state=${filter}&sort=${sort}&page=${page}`);

  return issues.filter((x) => !x.pull_request);
}
