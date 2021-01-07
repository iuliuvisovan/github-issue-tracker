import React from 'react';
import IssuesScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux';
import mockIssues from '../../mocks/issues';
import fetchMock from 'fetch-mock';
import isDarkColor from 'is-dark-color';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

describe('Issues Screen', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders correctly', async () => {
    let tree;

    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=all&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });

    await act(async () => {
      tree = create(
        <ReduxProvider store={store}>
          <MockedNavigator component={IssuesScreen} />
        </ReduxProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  it('toggles filter correctly', async () => {
    let tree: ReactTestRenderer;

    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=all&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });
    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=closed&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });

    await act(async () => {
      tree = create(
        <ReduxProvider store={store}>
          <MockedNavigator component={IssuesScreen} />
        </ReduxProvider>
      );
    });

    const openFilter = tree.root.findByProps({ testID: 'open' }).props;

    await act(async () => openFilter.onPress());

    expect(tree).toMatchSnapshot();
  });
});
