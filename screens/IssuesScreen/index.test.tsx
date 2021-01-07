import React from 'react';
import IssuesScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux';
import mockIssues from '../../mocks/issues';

jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

test('snapshot', async () => {
  let tree;

  mockedFetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockIssues))));

  await act(async () => {
    tree = create(
      <ReduxProvider store={store}>
        <MockedNavigator component={IssuesScreen} />
      </ReduxProvider>
    );
  });

  expect(tree).toMatchSnapshot();
});
