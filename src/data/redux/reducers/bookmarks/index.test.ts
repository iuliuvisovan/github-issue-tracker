import bookmarksReducer from './index';
import mockIssues from '../../../mocks/issues';

import { BookmarkAction, BookmarkActionType, BookmarkState } from '../../../types/bookmarks';

const initialState: BookmarkState = {
  bookmarks: [],
  loading: false,
};

describe('Bookmarks Reducer', () => {
  it('handles ADD_BOOKMARK_PENDING', () => {
    const action: BookmarkAction = {
      type: BookmarkActionType.ADD_BOOKMARK_PENDING,
      payload: undefined,
    };

    const newState = bookmarksReducer(initialState, action);

    expect(newState).toEqual({
      bookmarks: [],
      loading: true,
    });
  });
  it('handles REMOVE_BOOKMARK_PENDING', () => {
    const action: BookmarkAction = {
      type: BookmarkActionType.REMOVE_BOOKMARK_PENDING,
      payload: undefined,
    };

    const newState = bookmarksReducer(initialState, action);

    expect(newState).toEqual({
      bookmarks: [],
      loading: true,
    });
  });

  it('handles GET_BOOKMARKS_SUCCESS', () => {
    const action: BookmarkAction = {
      type: BookmarkActionType.GET_BOOKMARKS_SUCCESS,
      payload: mockIssues,
    };

    const newState = bookmarksReducer(initialState, action);

    expect(newState).toEqual({
      bookmarks: mockIssues,
      loading: false,
    });
  });

  it('handles ADD_BOOKMARK_SUCCESS', () => {
    const action: BookmarkAction = {
      type: BookmarkActionType.ADD_BOOKMARK_SUCCESS,
      payload: mockIssues[0],
    };

    const newState = bookmarksReducer(initialState, action);

    expect(newState.loading).toEqual(false);
    expect(newState.bookmarks.some((x) => x.id === mockIssues[0].id)).toEqual(true);
  });

  it('handles REMOVE_BOOKMARK_SUCCESS', () => {
    const action: BookmarkAction = {
      type: BookmarkActionType.REMOVE_BOOKMARK_SUCCESS,
      payload: mockIssues[0].id,
    };

    const newState = bookmarksReducer(
      {
        bookmarks: mockIssues,
        loading: false,
      },
      action
    );

    expect(newState.loading).toEqual(false);
    expect(newState.bookmarks.some((x) => x.id === mockIssues[0].id)).toEqual(false);
  });

  it('handles GET_BOOKMARKS_ERROR', () => {
    const action: BookmarkAction = {
      type: BookmarkActionType.GET_BOOKMARKS_ERROR,
      payload: Error('test error'),
    };

    const newState = bookmarksReducer(initialState, action);

    expect(newState).toEqual({
      bookmarks: [],
      loading: false,
      error: Error('test error'),
    });
  });
  it('handles ADD_BOOKMARK_ERROR', () => {
    const action: BookmarkAction = {
      type: BookmarkActionType.ADD_BOOKMARK_ERROR,
      payload: Error('test error'),
    };

    const newState = bookmarksReducer(initialState, action);

    expect(newState).toEqual({
      bookmarks: [],
      loading: false,
      error: Error('test error'),
    });
  });
  it('handles REMOVE_BOOKMARK_ERROR', () => {
    const action: BookmarkAction = {
      type: BookmarkActionType.REMOVE_BOOKMARK_ERROR,
      payload: Error('test error'),
    };

    const newState = bookmarksReducer(initialState, action);

    expect(newState).toEqual({
      bookmarks: [],
      loading: false,
      error: Error('test error'),
    });
  });
});
