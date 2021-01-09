import { Issue } from '../types/issues';
import mockUsers from './users';

export default [
  {
    id: 1,
    title: 'Mock',
    body: 'mock body',
    labels: [
      {
        id: '2',
        name: 'mock label',
        color: '#000',
        url: 'mock_url',
        default: false,
        description: 'mock description',
      },
    ],
    state: 'open',
    isBookmarked: false,
    user: mockUsers[0],
    comments_url: 'https://api.github.com/commentsUrl',
  } as Issue,
  {
    id: 2,
    title: 'Mock',
    body: 'mock body',
    labels: [
      {
        id: '2',
        name: 'mock label',
        color: '#000',
        url: 'mock_url',
        default: false,
        description: 'mock description',
      },
    ],
    state: 'closed',
    isBookmarked: true,
    user: mockUsers[1],
    comments_url: 'https://api.github.com/commentsUrl',
  } as Issue,
];

export const mockFilters = [
  { id: 'open', label: 'Open', isActive: true },
  { id: 'closed', label: 'Closed', isActive: true },
];

export const mockSortCriteria = [
  {
    id: 'created',
    label: 'Created Date',
    isActive: true,
  },
  {
    id: 'updated',
    label: 'Updated Date',
    isActive: false,
  },
  {
    id: 'comments',
    label: 'Number Of Comments',
    isActive: false,
  },
];
