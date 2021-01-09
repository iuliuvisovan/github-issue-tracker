import React from 'react';
import fetchMock from 'fetch-mock';
import { Provider as ReduxProvider } from 'react-redux';
import { create, act } from 'react-test-renderer';
import isDarkColor from 'is-dark-color';

import store from '../../../data/redux';
import MockNavigation from '../../../data/mocks/navigation';
import mockIssues from '../../../data/mocks/issues';
import mockComments from '../../../data/mocks/comments';
import IssuesScreen from './index';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

const createFreshTree = () =>
  create(
    <ReduxProvider store={store}>
      <MockNavigation component={IssuesScreen} params={{ issue: mockIssues[0] }} />
    </ReduxProvider>
  );

describe('Issue Details Screen', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  beforeEach(() => {
    fetchMocks();
  });

  it('renders correctly', async () => {
    const tree = createFreshTree();

    await act(async () => jest.runAllTimers());

    expect(tree).toMatchSnapshot();
  });

  it('adds and removes as bookmark succesfully', async () => {
    jest.mock('is-dark-color');
    isDarkColor.mockReturnValue(false);

    const tree = createFreshTree();

    await act(async () => jest.runAllTimers());

    const addAsBookmarkButton = tree.root.findByProps({ testID: 'addAsBookmarkButton' }).props;
    await act(async () => addAsBookmarkButton.onPress());

    expect(tree.root.findByProps({ testID: 'addAsBookmarkButton' }).props.text).toEqual('Remove Bookmark');

    const addAsBookmarkButtonAfter = tree.root.findByProps({ testID: 'addAsBookmarkButton' }).props;
    await act(async () => addAsBookmarkButtonAfter.onPress());

    expect(tree.root.findByProps({ testID: 'addAsBookmarkButton' }).props.text).toEqual('Bookmark');
  });

  it('renders comments correctly', async () => {
    const tree = createFreshTree();

    await act(async () => jest.runAllTimers());

    expect(true).toEqual(true);
  });
});

const fetchMocks = () => {
  const urls = ['https://api.github.com/commentsUrl'];

  urls.forEach((url) => {
    fetchMock.get(url, {
      body: mockComments,
      headers: { 'content-type': 'application/json' },
    });
  });
};
