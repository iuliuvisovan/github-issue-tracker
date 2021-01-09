import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { addBookmark, getBookmarks, removeBookmark } from './index';
import mockIssues from '../../../mocks/issues';

import { BookmarkActionType } from '../../../types/bookmarks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Bookmark actions', () => {
  it('creates GET_BOOKMARKS_SUCCESS when bookmark fetching has succeeded', () => {
    mockNonEmptyStorage();

    const expectedActions = [
      { type: BookmarkActionType.GET_BOOKMARKS_PENDING },
      { type: BookmarkActionType.GET_BOOKMARKS_SUCCESS, payload: mockIssues },
    ];
    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(getBookmarks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates GET_BOOKMARKS_SUCCESS when storage is empty', () => {
    mockEmptyStorage();

    const expectedActions = [
      { type: BookmarkActionType.GET_BOOKMARKS_PENDING },
      { type: BookmarkActionType.GET_BOOKMARKS_SUCCESS, payload: [] },
    ];
    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(getBookmarks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates GET_BOOKMARKS_ERROR when crashed', () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => {
      throw 'An error occured';
    });

    const expectedActions = [
      { type: BookmarkActionType.GET_BOOKMARKS_PENDING },
      { type: BookmarkActionType.GET_BOOKMARKS_ERROR, payload: 'An error occured' },
    ];
    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(getBookmarks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_BOOKMARK_SUCCESS when bookmark has been succesfully added', () => {
    mockNonEmptyStorage();

    const addedIssue = mockIssues[0];

    const expectedActions = [
      { type: BookmarkActionType.ADD_BOOKMARK_PENDING },
      { type: BookmarkActionType.ADD_BOOKMARK_SUCCESS, payload: addedIssue },
    ];

    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(addBookmark(addedIssue)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_BOOKMARK_SUCCESS when storage is empty', () => {
    mockEmptyStorage();

    const addedIssue = mockIssues[0];

    const expectedActions = [
      { type: BookmarkActionType.ADD_BOOKMARK_PENDING },
      { type: BookmarkActionType.ADD_BOOKMARK_SUCCESS, payload: addedIssue },
    ];
    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(addBookmark(addedIssue)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_BOOKMARK_ERROR when bookmark has crashed', () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => {
      throw 'An error occured';
    });

    const addedIssue = mockIssues[0];

    const expectedActions = [
      { type: BookmarkActionType.ADD_BOOKMARK_PENDING },
      { type: BookmarkActionType.ADD_BOOKMARK_SUCCESS, payload: addedIssue },
      { type: BookmarkActionType.ADD_BOOKMARK_ERROR, payload: 'An error occured' },
    ];

    const store = mockStore({ bookmarks: [], loading: false });

    store.dispatch<any>(addBookmark(addedIssue)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve(null);
        })
    );

    store.dispatch<any>(getBookmarks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates REMOVE_BOOKMARK_SUCCESS when bookmark has been succesfully removed', () => {
    mockNonEmptyStorage();
    const removedIssueId = mockIssues[0].id;

    const expectedActions = [
      { type: BookmarkActionType.REMOVE_BOOKMARK_PENDING },
      { type: BookmarkActionType.REMOVE_BOOKMARK_SUCCESS, payload: removedIssueId },
    ];

    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(removeBookmark(removedIssueId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates REMOVE_BOOKMARK_SUCCESS when storage is empty', () => {
    mockEmptyStorage();
    const removedIssueId = mockIssues[0].id;

    const expectedActions = [
      { type: BookmarkActionType.REMOVE_BOOKMARK_PENDING },
      { type: BookmarkActionType.REMOVE_BOOKMARK_SUCCESS, payload: removedIssueId },
    ];

    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(removeBookmark(removedIssueId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates REMOVE_BOOKMARK_ERROR when bookmark has crashed', () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => {
      throw 'An error occured';
    });

    const removedIssueId = mockIssues[0].id;

    const expectedActions = [
      { type: BookmarkActionType.REMOVE_BOOKMARK_PENDING },
      { type: BookmarkActionType.REMOVE_BOOKMARK_SUCCESS, payload: removedIssueId },
      { type: BookmarkActionType.REMOVE_BOOKMARK_ERROR, payload: 'An error occured' },
    ];

    const store = mockStore({ bookmarks: [], loading: false });

    return store.dispatch<any>(removeBookmark(removedIssueId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

const mockNonEmptyStorage = (): void => {
  jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
    () =>
      new Promise((resolve) => {
        resolve(JSON.stringify(mockIssues));
      })
  );
};
const mockEmptyStorage = (): void => {
  jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
    () =>
      new Promise((resolve) => {
        resolve(null);
      })
  );
};
