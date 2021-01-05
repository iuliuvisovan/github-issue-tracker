import { IGithubComment } from '../types/comments';
import methods from './methods';

export async function get(url: string): Promise<IGithubComment[]> {
  const comments: IGithubComment[] = await methods.get(url);

  return comments;
}
