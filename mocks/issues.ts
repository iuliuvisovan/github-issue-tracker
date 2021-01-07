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
