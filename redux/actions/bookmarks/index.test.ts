import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getBookmarks } from './index';
import { BookmarkActionType } from '../../../types/bookmarks';

import mockIssues from '../../../mocks/issues';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Bookmark actions', () => {
  it('creates GET_BOOKMARKS_SUCCESS when bookmark fetching has succeeded', () => {
    const expectedActions = [
      { type: BookmarkActionType.GET_BOOKMARKS_PENDING },
      { type: BookmarkActionType.GET_BOOKMARKS_SUCCESS, payload: mockIssues },
    ];
    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(getBookmarks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
