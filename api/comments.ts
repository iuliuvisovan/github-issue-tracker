import { GithubComment } from '../types/comments';
import methods from './methods';

export async function get(url: string): Promise<GithubComment[]> {
  const comments: GithubComment[] = await methods.get(url);

  return comments;
}
