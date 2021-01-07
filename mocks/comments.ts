import { Comment } from '../types/comments';
import mockUsers from '../mocks/users';

export default [
  {
    id: 1,
    user: mockUsers[0],
    body: 'mock body',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user: mockUsers[1],
    body: 'mock body 2',
    created_at: new Date().toISOString(),
  },
] as Comment[];
