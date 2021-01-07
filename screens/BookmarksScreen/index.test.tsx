import React from 'react';
import BookmarksScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux';
import isDarkColor from 'is-dark-color';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

test('snapshot', async () => {
  let tree;

  await act(async () => {
    tree = create(
      <ReduxProvider store={store}>
        <MockedNavigator component={BookmarksScreen} />
      </ReduxProvider>
    );
  });

  expect(tree).toMatchSnapshot();
});
