import { Comment } from '../types/comments';
import methods from './methods';

export async function get(url: string): Promise<Comment[]> {
  const comments: Comment[] = await methods.get(url);

  return comments;
}
