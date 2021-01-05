import { IGithubIssueComment } from '../types/issues';
import methods from './methods';

export async function get(url: string): Promise<IGithubIssueComment[]> {
  const comments: IGithubIssueComment[] = await methods.get(url);

  return comments;
}
