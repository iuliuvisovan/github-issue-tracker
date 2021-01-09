import React from 'react';
import isDarkColor from 'is-dark-color';
import { create, act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as ReduxProvider } from 'react-redux';

import store from '../../../data/redux';
import MockNavigation from '../../../data/mocks/navigation';
import mockIssues from '../../../data/mocks/issues';
import IssuesScreen from './index';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

describe('Bookmarks Screen', () => {
  it('renders correctly', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve(JSON.stringify(mockIssues));
        })
    );

    const createFreshTree = () =>
      create(
        <ReduxProvider store={store}>
          <MockNavigation component={IssuesScreen} />
        </ReduxProvider>
      );

    const tree = createFreshTree();

    await act(async () => jest.runAllTimers());

    expect(tree).toMatchSnapshot();
  });
});
