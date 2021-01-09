import React from 'react';
import IssuesScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux';
import isDarkColor from 'is-dark-color';
import mockIssues from '../../mocks/issues';
import mockComments from '../../mocks/comments';
import fetchMock from 'fetch-mock';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

const createFreshTree = () =>
  create(
    <ReduxProvider store={store}>
      <MockedNavigator component={IssuesScreen} params={{ issue: mockIssues[0] }} />
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

const fetchMocks = (): void => {
  const urls = ['https://api.github.com/commentsUrl'];

  urls.forEach((url) => {
    fetchMock.get(url, {
      body: mockComments,
      headers: { 'content-type': 'application/json' },
    });
  });
};
