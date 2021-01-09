import { Comment } from '../types/comments';
import methods from './methods';

export async function get(commentsUrl: string): Promise<Comment[]> {
  const comments: Comment[] = await methods.get(commentsUrl);

  return comments;
}
