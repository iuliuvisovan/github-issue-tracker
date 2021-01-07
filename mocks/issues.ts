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
    isBookmarked: true,
    user: mockUsers[0],
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
    state: 'open',
    isBookmarked: true,
    user: mockUsers[1],
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
