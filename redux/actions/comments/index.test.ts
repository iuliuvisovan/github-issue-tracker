import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getComments } from './index';
import { CommentActionType } from '../../../types/comments';

import fetchMock from 'fetch-mock';
import mockComments from '../../../mocks/comments';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Comment actions', () => {
  afterEach(() => {
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

    return store.dispatch<any>(getComments('mockUrl')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
