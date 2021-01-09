import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

import { getComments } from './index';
import mockComments from '../../../mocks/comments';

import { CommentActionType } from '../../../types/comments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Comment actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  afterAll(() => {
    fetchMock.restore();
  });

  it('creates GET_COMMENTS_SUCCESS when comment fetching has succeeded', () => {
    fetchMock.getOnce('https://api.github.com/mockUrl', {
      body: { comments: mockComments },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: CommentActionType.GET_COMMENTS_PENDING },
      { type: CommentActionType.GET_COMMENTS_SUCCESS, payload: { comments: mockComments } },
    ];
    const store = mockStore({ comments: [], loading: false });

    return store.dispatch<any>(getComments('https://api.github.com/mockUrl')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_COMMENTS_ERROR when comment fetching has failed', () => {
    fetchMock.getOnce('https://api.github.com/commentsUrl', {
      body: {},
      headers: { 'content-type': 'application/json' },
      status: 400,
    });

    const expectedActions = [
      { type: CommentActionType.GET_COMMENTS_PENDING },
      { type: CommentActionType.GET_COMMENTS_ERROR, payload: Error('An error occured') },
    ];
    const store = mockStore({ comments: [], loading: false });

    return store.dispatch<any>(getComments('https://api.github.com/commentsUrl')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
