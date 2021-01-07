import React from 'react';
import IssueDetailsScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux';
import isDarkColor from 'is-dark-color';
import mockIssues from '../../mocks/issues';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

test('snapshot', async () => {
  let tree;

  await act(async () => {
    tree = create(
      <ReduxProvider store={store}>
        <MockedNavigator component={IssueDetailsScreen} params={{ issue: mockIssues[0] }} />
      </ReduxProvider>
    );
  });

  expect(tree).toMatchSnapshot();
});
