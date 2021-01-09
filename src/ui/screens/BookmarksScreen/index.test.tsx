import React from 'react';
import IssuesScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../../data/redux';
import isDarkColor from 'is-dark-color';
import mockIssues from '../../../data/mocks/issues';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          <MockedNavigator component={IssuesScreen} />
        </ReduxProvider>
      );

    const tree = createFreshTree();

    await act(async () => jest.runAllTimers());

    expect(tree).toMatchSnapshot();
  });
});
