import React from 'react';
import IssueDetailsScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux';
import isDarkColor from 'is-dark-color';

const mockIssue = {
  id: 1,
  title: 'Mock',
  body: 'mock body',
  labels: [
    {
      id: 2,
      name: 'mock label',
      color: '#000',
    },
  ],
  state: 'open',
  isBookmarked: true,
  user: {
    login: 'mock_login',
    avatar_url: 'mock_url',
  },
};

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

test('snapshot', async () => {
  let tree;

  await act(async () => {
    tree = create(
      <ReduxProvider store={store}>
        <MockedNavigator component={IssueDetailsScreen} params={{ issue: mockIssue }} />
      </ReduxProvider>
    );
  });

  expect(tree).toMatchSnapshot();
});
