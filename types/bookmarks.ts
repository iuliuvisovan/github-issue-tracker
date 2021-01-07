import { Issue } from './issues';

export interface BookmarkState {
  bookmarks: Issue[];
  loading: boolean;
  error?: Error;
}

export interface BookmarkAction {
  type: BookmarkActionType;
  payload?: Issue[] | Issue | number | Error;
}

export enum BookmarkActionType {
  GET_BOOKMARKS_PENDING = 'GET_BOOKMARKS_PENDING',
  GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS',
  GET_BOOKMARKS_ERROR = 'GET_BOOKMARKS_ERROR',

  ADD_BOOKMARK_PENDING = 'ADD_BOOKMARK_PENDING',
  ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS',
  ADD_BOOKMARK_ERROR = 'ADD_BOOKMARK_ERROR',

  REMOVE_BOOKMARK_PENDING = 'REMOVE_BOOKMARK_PENDING',
  REMOVE_BOOKMARK_SUCCESS = 'REMOVE_BOOKMARK_SUCCESS',
  REMOVE_BOOKMARK_ERROR = 'REMOVE_BOOKMARK_ERROR',
}

export interface useBookmarksReturnValue {
  data: {
    bookmarks: Issue[];
    loading: boolean;
  };
  actions: {
    getBookmarks: () => void;
  };
}
